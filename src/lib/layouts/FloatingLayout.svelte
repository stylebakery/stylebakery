<script>
  // FloatingLayout — a layout where the menus float as detached, rounded cards
  // over the content, rather than attached bars.
  //
  //   topMenu   → a floating card along the top    (horizontal)
  //   sideMenu  → a floating card on the left       (vertical)
  //
  // Each is its own bindable prop, using the shared menu contract:
  //   { brand?, sections: [{ label?, items: [{ id, label, icon?, href?, badge?, children? }] }], active? }
  //
  //   <FloatingLayout bind:topMenu bind:sideMenu>{content}</FloatingShell>
  import ThemeToggle from '../components/ThemeToggle.svelte';

  let {
    topMenu   = $bindable(undefined),
    sideMenu  = $bindable(undefined),
    actions,                 // snippet: top card right-side actions
    footer,                  // snippet: side card footer
    children,
    ...rest
  } = $props();

  let hasTop  = $derived(!!topMenu);
  let hasSide = $derived(!!sideMenu);
  let topItems = $derived(hasTop ? (topMenu.sections ?? []).flatMap((s) => s.items ?? []) : []);
</script>

<div class="fl-root" {...rest}>
  {#if hasTop}
    <div class="fl-topcard">
      {#if topMenu.brand?.label}
        <div class="fl-brand">
          {#if topMenu.brand.icon}<span class="material-symbols-outlined fl-brand-icon">{topMenu.brand.icon}</span>{/if}
          {topMenu.brand.label}
        </div>
      {/if}
      <nav class="fl-topnav">
        {#each topItems as item}
          <a href={item.href} class="fl-toplink" class:active={item.id === topMenu.active}>
            {#if item.icon}<span class="material-symbols-outlined">{item.icon}</span>{/if}
            {item.label}
          </a>
        {/each}
      </nav>
      <div class="fl-actions">
        {#if actions}{@render actions()}{:else}<ThemeToggle />{/if}
      </div>
    </div>
  {/if}

  <div class="fl-body">
    {#if hasSide}
      <aside class="fl-sidecard">
        {#if sideMenu.brand?.label && !hasTop}
          <div class="fl-brand fl-side-brand">
            {#if sideMenu.brand.icon}<span class="material-symbols-outlined fl-brand-icon">{sideMenu.brand.icon}</span>{/if}
            {sideMenu.brand.label}
          </div>
        {/if}
        <nav class="fl-sidenav">
          {#each sideMenu.sections as section}
            {#if section.label}<div class="fl-side-label">{section.label}</div>{/if}
            {#each section.items as item}
              <a href={item.href} class="fl-sidelink" class:active={item.id === sideMenu.active}>
                {#if item.icon}<span class="material-symbols-outlined">{item.icon}</span>{/if}
                <span class="fl-sidelabel">{item.label}</span>
                {#if item.badge != null}<span class="fl-badge">{item.badge}</span>{/if}
              </a>
            {/each}
          {/each}
        </nav>
        {#if footer}<div class="fl-side-foot">{@render footer()}</div>{/if}
      </aside>
    {/if}

    <main class="fl-content">
      <div class="fl-inner">{@render children?.()}</div>
    </main>
  </div>
</div>
