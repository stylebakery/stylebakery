<script>
  // Divider — a horizontal or vertical separator, optionally with a
  // centered label. Uses the existing divider tokens.
  let {
    vertical = false,
    strong   = false,
    label    = undefined,
    children,
    ...restProps
  } = $props();

  const hasLabel = $derived(!!(label || children));
</script>

{#if vertical}
  <span class="divider-vertical" class:divider-strong={strong} role="separator" aria-orientation="vertical" {...restProps}></span>
{:else if hasLabel}
  <div class="divider-labeled" role="separator" {...restProps}>
    <span class="divider-line" class:divider-strong={strong}></span>
    <span class="divider-text">{#if label}{label}{:else}{@render children?.()}{/if}</span>
    <span class="divider-line" class:divider-strong={strong}></span>
  </div>
{:else}
  <hr class="divider" class:divider-strong={strong} {...restProps} />
{/if}
