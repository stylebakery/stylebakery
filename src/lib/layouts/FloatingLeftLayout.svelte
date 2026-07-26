<script>
  // FloatingLeftLayout — a detached, rounded left menu card floating over the
  // content. Nestable single-region layout. Supports 2-level submenus.
  let { menu = $bindable(undefined), footer, children, ...rest } = $props();
  let brand = $derived(menu?.brand ?? {});

  let toggled = $state({});
  const isChildActive = (item) => item.children?.some((c) => c.id === menu?.active);
  const isOpen = (item) => toggled[item.id] ?? isChildActive(item);
  const toggle = (item) => { toggled = { ...toggled, [item.id]: !isOpen(item) }; };
</script>

<div class="nl nl-row nlf-pad" {...rest}>
  {#if menu}
    <aside class="nlf-sidecard">
      {#if brand.label}
        <div class="nlf-brand nlf-side-brand">
          {#if brand.icon}<span class="material-symbols-outlined nlf-brand-icon">{brand.icon}</span>{/if}
          {brand.label}
        </div>
      {/if}
      <nav class="nlf-sidenav">
        {#each (menu.sections ?? []) as section}
          {#if section.label}<div class="nlf-side-label">{section.label}</div>{/if}
          {#each section.items as item}
            {#if item.children?.length}
              <button type="button" class="nlf-sidelink nlf-parent"
                class:active={item.id === menu.active || isChildActive(item)}
                aria-expanded={isOpen(item)} onclick={() => toggle(item)}>
                {#if item.icon}<span class="material-symbols-outlined">{item.icon}</span>{/if}
                <span class="nlf-sidelabel">{item.label}</span>
                {#if item.badge != null}<span class="nlf-badge">{item.badge}</span>{/if}
                <span class="material-symbols-outlined nlf-chevron" class:open={isOpen(item)}>chevron_right</span>
              </button>
              {#if isOpen(item)}
                <div class="nlf-subnav">
                  {#each item.children as child}
                    <a href={child.href} class="nlf-sublink" class:active={child.id === menu.active}>
                      {#if child.icon}<span class="material-symbols-outlined">{child.icon}</span>{/if}
                      <span class="nlf-sidelabel">{child.label}</span>
                    </a>
                  {/each}
                </div>
              {/if}
            {:else}
              <a href={item.href} class="nlf-sidelink" class:active={item.id === menu.active}>
                {#if item.icon}<span class="material-symbols-outlined">{item.icon}</span>{/if}
                <span class="nlf-sidelabel">{item.label}</span>
                {#if item.badge != null}<span class="nlf-badge">{item.badge}</span>{/if}
              </a>
            {/if}
          {/each}
        {/each}
      </nav>
      {#if footer}<div class="nlf-side-foot">{@render footer()}</div>{/if}
    </aside>
  {/if}
  <div class="nl-fill nl-scroll nlf-content">{@render children?.()}</div>
</div>
