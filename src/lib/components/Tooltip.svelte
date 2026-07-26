<script>
  // Tooltip — wraps a trigger and shows a small label on hover/focus.
  // Pure CSS positioning (no floating-lib dependency); good for short hints.
  //
  // Usage:
  //   <Tooltip text="Delete" position="top">
  //     <button>…</button>
  //   </Tooltip>
  let {
    text,
    position = 'top',          // 'top' | 'bottom' | 'left' | 'right'
    children,
    ...restProps
  } = $props();

  let open = $state(false);
  let id = `tt-${Math.random().toString(36).slice(2, 9)}`;

  function show() { open = true; }
  function hide() { open = false; }
</script>

<span
  class="tooltip-wrap"
  onmouseenter={show}
  onmouseleave={hide}
  onfocusin={show}
  onfocusout={hide}
  aria-describedby={open ? id : undefined}
  {...restProps}
>
  {@render children?.()}

  {#if text}
    <span
      {id}
      role="tooltip"
      class="tooltip tooltip-{position}"
      class:open
      aria-hidden={!open}
    >
      {text}
    </span>
  {/if}
</span>
