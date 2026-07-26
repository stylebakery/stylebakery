<script>
  // Collapsible — a chevron + trigger row that shows/hides child content.
  // Batteries-included version of Chevron: manages its own open state.
  //
  //   <Collapsible title="Details">
  //     …content…
  //   </Collapsible>
  let {
    open     = $bindable(false),
    title    = undefined,        // simple text trigger
    disabled = false,
    trigger,                     // optional snippet(open) for custom trigger content
    children,
    ...restProps
  } = $props();

  function toggle() {
    if (disabled) return;
    open = !open;
  }
</script>

<div class="collapsible" {...restProps}>
  <button
    type="button"
    class="collapsible-trigger"
    {disabled}
    aria-expanded={open}
    onclick={toggle}
  >
    <span class="chevron collapsible-chevron" class:expanded={open} aria-hidden="true">
      <span class="material-symbols-outlined">chevron_right</span>
    </span>
    {#if trigger}
      {@render trigger(open)}
    {:else}
      <span class="collapsible-title">{title}</span>
    {/if}
  </button>

  {#if open}
    <div class="collapsible-content">
      {@render children?.()}
    </div>
  {/if}
</div>
