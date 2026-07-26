<script>
  // SideBar — a vertical navigation region. Shared building block used by
  // the sidebar-style layouts. Renders an optional brand and the grouped
  // `sections` as a vertical menu. Items may carry `children` for a second
  // level, which expands/collapses (and auto-expands when a child is active).
  let {
    brand    = undefined,
    sections = [],
    active   = undefined,
    footer,
    ...restProps
  } = $props();

  // Track which parent items are expanded. An item is open if the user toggled
  // it, or (by default) if one of its children is the active item.
  let toggled = $state({});

  function isChildActive(item) {
    return item.children?.some((c) => c.id === active);
  }
  function isOpen(item) {
    return toggled[item.id] ?? isChildActive(item);
  }
  function toggle(item) {
    toggled = { ...toggled, [item.id]: !isOpen(item) };
  }
</script>

<aside class="sb" {...restProps}>
  {#if brand?.label}
    {#if brand.href}
      <a href={brand.href} class="sb-brand">
        {#if brand.icon}<span class="material-symbols-outlined sb-brand-icon">{brand.icon}</span>{/if}
        {brand.label}
      </a>
    {:else}
      <div class="sb-brand">
        {#if brand.icon}<span class="material-symbols-outlined sb-brand-icon">{brand.icon}</span>{/if}
        {brand.label}
      </div>
    {/if}
  {/if}

  <nav class="sb-nav">
    {#each sections as section}
      {#if section.label}<div class="sb-section-label">{section.label}</div>{/if}
      {#each section.items as item}
        {#if item.children?.length}
          <button
            type="button"
            class="sb-link sb-parent"
            class:active={item.id === active || isChildActive(item)}
            aria-expanded={isOpen(item)}
            onclick={() => toggle(item)}
          >
            {#if item.icon}<span class="material-symbols-outlined">{item.icon}</span>{/if}
            <span class="sb-link-label">{item.label}</span>
            {#if item.badge != null}<span class="sb-badge">{item.badge}</span>{/if}
            <span class="material-symbols-outlined sb-chevron" class:open={isOpen(item)}>chevron_right</span>
          </button>
          {#if isOpen(item)}
            <div class="sb-subnav">
              {#each item.children as child}
                <a href={child.href} class="sb-sublink" class:active={child.id === active}>
                  {#if child.icon}<span class="material-symbols-outlined">{child.icon}</span>{/if}
                  <span class="sb-link-label">{child.label}</span>
                  {#if child.badge != null}<span class="sb-badge">{child.badge}</span>{/if}
                </a>
              {/each}
            </div>
          {/if}
        {:else}
          <a href={item.href} class="sb-link" class:active={item.id === active}>
            {#if item.icon}<span class="material-symbols-outlined">{item.icon}</span>{/if}
            <span class="sb-link-label">{item.label}</span>
            {#if item.badge != null}<span class="sb-badge">{item.badge}</span>{/if}
          </a>
        {/if}
      {/each}
    {/each}
  </nav>

  {#if footer}
    <div class="sb-footer">{@render footer()}</div>
  {/if}
</aside>
