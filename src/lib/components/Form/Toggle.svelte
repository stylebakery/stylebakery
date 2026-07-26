<script>
  let {
    checked  = $bindable(false),
    label    = undefined,
    disabled = false,
    children,
    ...restProps
  } = $props();
</script>

<label class="toggle" class:toggle-disabled={disabled}>
  <input type="checkbox" bind:checked {disabled} {...restProps} />
  <div class="toggle-track">
    <div class="toggle-thumb"></div>
  </div>
  {#if label}
    <span class="toggle-label">{label}</span>
  {:else if children}
    <span class="toggle-label">{@render children()}</span>
  {/if}
</label>
