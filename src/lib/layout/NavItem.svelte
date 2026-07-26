<script>
  let {
    href     = undefined,
    icon     = undefined,
    badge    = undefined,
    active   = false,
    children,          // snippet: the label content
    subItems = undefined,  // optional array of { href, icon, label }
    isActive = undefined,  // (href) => boolean, used to mark active sub-items
    initialOpen = false,
    ...restProps
  } = $props();

  const hasSub = $derived(Array.isArray(subItems) && subItems.length > 0);

  // Expansion state for the second level (vertical, inline).
  let open = $state(initialOpen);

  // Auto-open if a child is active.
  $effect(() => {
    if (hasSub && isActive && subItems.some((s) => isActive(s.href))) {
      open = true;
    }
  });

  function toggle(e) {
    e.preventDefault();
    e.stopPropagation();
    open = !open;
  }
</script>

<div class="nav-item-wrap">
  {#if href}
    <a {href} class="nav-item" class:active {...restProps}>
      {#if icon}<span class="material-symbols-outlined nav-icon">{icon}</span>{/if}
      <span class="nav-label">{@render children?.()}</span>
      {#if badge !== undefined}<span class="nav-badge">{badge}</span>{/if}
      {#if hasSub}
        <button
          type="button"
          class="nav-chevron"
          class:open
          aria-label={open ? 'Collapse' : 'Expand'}
          aria-expanded={open}
          onclick={toggle}
        >
          <span class="material-symbols-outlined">chevron_right</span>
        </button>
      {/if}
    </a>
  {:else}
    <button
      class="nav-item"
      class:active
      onclick={hasSub ? (() => (open = !open)) : restProps.onclick}
      {...restProps}
    >
      {#if icon}<span class="material-symbols-outlined nav-icon">{icon}</span>{/if}
      <span class="nav-label">{@render children?.()}</span>
      {#if badge !== undefined}<span class="nav-badge">{badge}</span>{/if}
      {#if hasSub}
        <span class="nav-chevron" class:open aria-hidden="true">
          <span class="material-symbols-outlined">chevron_right</span>
        </span>
      {/if}
    </button>
  {/if}

  {#if hasSub && open}
    <div class="nav-subitems">
      {#each subItems as sub}
        <a
          href={sub.href}
          class="nav-subitem"
          class:active={isActive ? isActive(sub.href) : false}
        >
          {#if sub.icon}<span class="material-symbols-outlined nav-subicon">{sub.icon}</span>{/if}
          <span>{sub.label}</span>
        </a>
      {/each}
    </div>
  {/if}
</div>
