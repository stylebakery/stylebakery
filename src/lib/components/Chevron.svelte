<script>
  // Chevron — a small clickable chevron that toggles a bindable `expanded`
  // state. Use it to drive show/hide of anything yourself:
  //
  //   <script> let open = $state(false); <\/script>
  //   <Chevron bind:expanded={open} /> {#if open}…{/if}
  //
  // Purely presentational + the boolean; it doesn't hide anything itself.
  let {
    expanded  = $bindable(false),
    size      = undefined,        // e.g. '1.25rem'; defaults to 1.25em
    direction = 'right',          // collapsed-state direction: 'right' | 'down'
    disabled  = false,
    onToggle,
    ...restProps
  } = $props();

  function toggle() {
    if (disabled) return;
    expanded = !expanded;
    onToggle?.(expanded);
  }
</script>

<button
  type="button"
  class="chevron chevron-from-{direction}"
  class:expanded
  {disabled}
  aria-expanded={expanded}
  onclick={toggle}
  style:font-size={size}
  {...restProps}
>
  <span class="material-symbols-outlined">chevron_right</span>
</button>
