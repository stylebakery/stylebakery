<script>
  let {
    checked      = $bindable(false),
    indeterminate = false,
    label        = undefined,
    disabled     = false,
    children,
    ...restProps
  } = $props();

  let inputEl = $state();

  // Reflect the indeterminate prop onto the DOM node (not an HTML attribute).
  $effect(() => {
    if (inputEl) inputEl.indeterminate = indeterminate;
  });
</script>

<label class="checkbox" class:checkbox-disabled={disabled}>
  <input
    bind:this={inputEl}
    type="checkbox"
    bind:checked
    {disabled}
    {...restProps}
  />
  <span class="checkbox-box">
    <span class="material-symbols-outlined checkbox-icon">
      {indeterminate ? 'remove' : 'check'}
    </span>
  </span>
  {#if label}
    <span class="checkbox-label">{label}</span>
  {:else if children}
    <span class="checkbox-label">{@render children()}</span>
  {/if}
</label>
