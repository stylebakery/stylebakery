<script>
  let {
    group    = $bindable(undefined),
    value,
    label    = undefined,
    disabled = false,
    children,
    ...restProps
  } = $props();
</script>

<label class="radio" class:radio-disabled={disabled}>
  <input
    type="radio"
    bind:group
    {value}
    {disabled}
    {...restProps}
  />
  <span class="radio-circle">
    <span class="radio-dot"></span>
  </span>
  {#if label}
    <span class="radio-label">{label}</span>
  {:else if children}
    <span class="radio-label">{@render children()}</span>
  {/if}
</label>
