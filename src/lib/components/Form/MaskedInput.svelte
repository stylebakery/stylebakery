<script>
  // MaskedInput — format-as-you-type using a simple mask pattern.
  //
  // Mask tokens:
  //   9  → digit        (0-9)
  //   A  → letter       (a-z, A-Z)
  //   *  → alphanumeric
  // Any other character in the mask is a literal (shown as-is, auto-inserted).
  //
  // Two display modes:
  //   showMask = false (default) — the value grows as you type: "(555) 123-"
  //   showMask = true            — the full template is always shown with
  //                                unfilled slots as `maskChar`: "(555) 12_-____"
  //
  // `value` is always the RAW (unmasked) characters, regardless of mode.

  let {
    value       = $bindable(''),
    mask        = '',
    showMask    = false,
    maskChar    = '_',
    placeholder = undefined,
    disabled    = false,
    error       = false,
    success     = false,
    ...restProps
  } = $props();

  const tokens = { '9': /[0-9]/, 'A': /[a-zA-Z]/, '*': /[a-zA-Z0-9]/ };
  const isToken = (ch) => Object.prototype.hasOwnProperty.call(tokens, ch);

  let inputEl = $state();

  // ─── Growing mode: format only as far as the user has typed ───
  function applyMask(raw, mask) {
    let out = '', ri = 0, mi = 0;
    for (; mi < mask.length && ri < raw.length; mi++) {
      const mch = mask[mi];
      if (isToken(mch)) {
        while (ri < raw.length) {
          const rch = raw[ri++];
          if (tokens[mch].test(rch)) { out += rch; break; }
        }
      } else {
        out += mch;
        if (raw[ri] === mch) ri++;
      }
    }
    // auto-advance trailing literals so the next slot is exposed
    if (raw.length > 0) {
      while (mi < mask.length && !isToken(mask[mi])) { out += mask[mi]; mi++; }
    }
    return out;
  }

  // ─── Template mode: always render the full skeleton ───
  function renderTemplate(raw, mask) {
    let out = '', ri = 0;
    for (let mi = 0; mi < mask.length; mi++) {
      const mch = mask[mi];
      out += isToken(mch) ? (ri < raw.length ? raw[ri++] : maskChar) : mch;
    }
    return out;
  }

  // Where the caret belongs given N filled raw chars: the first unfilled token
  // slot, or end of string when full.
  function caretForRaw(n, mask) {
    let filled = 0;
    for (let mi = 0; mi < mask.length; mi++) {
      if (isToken(mask[mi])) {
        if (filled === n) return mi;
        filled++;
      }
    }
    return mask.length;
  }

  // Validate raw chars against their token slots, walking slots and input
  // chars in lockstep: each slot takes the next char that fits; chars that
  // don't fit the current slot are dropped (they can't jump ahead). Caps at
  // the number of token slots. (Verified against phone and plate masks.)
  function sanitizeRaw(input, mask) {
    const chars = [...input].filter((c) => /[a-zA-Z0-9]/.test(c));
    const slots = [...mask].filter(isToken).map((ch) => tokens[ch]);
    let raw = '', ci = 0, si = 0;
    while (si < slots.length && ci < chars.length) {
      const ch = chars[ci];
      if (slots[si].test(ch)) { raw += ch; si++; ci++; }
      else { ci++; }
    }
    return raw;
  }

  let display = $derived(
    showMask ? renderTemplate(value ?? '', mask) : applyMask(value ?? '', mask)
  );

  function onInput(e) {
    const isDelete = e.inputType && e.inputType.startsWith('delete');
    const prevRaw = value ?? '';
    let raw = sanitizeRaw(e.target.value, mask);

    // Deletion that only removed literals leaves raw unchanged — drop one real
    // char so backspace makes progress instead of sticking on a literal.
    if (isDelete && raw.length === prevRaw.length && raw.length > 0) {
      raw = raw.slice(0, -1);
    }

    value = raw;

    if (showMask) {
      const text = renderTemplate(raw, mask);
      e.target.value = text;
      const pos = caretForRaw(raw.length, mask);
      // restore caret after the value write
      requestAnimationFrame(() => {
        try { e.target.setSelectionRange(pos, pos); } catch {}
      });
    } else {
      e.target.value = applyMask(raw, mask);
    }
  }

  // In template mode, clicking into the field should drop the caret at the next
  // empty slot rather than wherever the click landed in the skeleton.
  function onFocus(e) {
    if (!showMask) return;
    const pos = caretForRaw((value ?? '').length, mask);
    requestAnimationFrame(() => {
      try { e.target.setSelectionRange(pos, pos); } catch {}
    });
  }

  let classes = $derived([
    'input', 'masked-input',
    error   ? 'input-error'   : '',
    success ? 'input-success' : '',
  ].filter(Boolean).join(' '));
</script>

<input
  bind:this={inputEl}
  class={classes}
  type="text"
  value={display}
  placeholder={showMask ? undefined : (placeholder ?? mask)}
  {disabled}
  oninput={onInput}
  onfocus={onFocus}
  {...restProps}
/>
