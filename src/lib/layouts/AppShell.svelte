<script>
  // AppShell — one app layout driven by two independent, bindable menu props:
  //
  //   topMenu   → renders a top bar   (omit for no top bar)
  //   sideMenu  → renders a sidebar   (omit for no sidebar)
  //
  //   both  → hybrid (top bar + sidebar)
  //   one   → top-only or side-only
  //   none  → just content
  //
  // Each menu is its own bindable prop, so users wire and update them
  // independently:
  //   <AppShell bind:topMenu bind:sideMenu>{content}</AppShell>
  //
  // Menu contract (same for both regions):
  //   { brand?, sections: [{ label?, items: [{ id, label, icon?, href?, badge?, children? }] }], active? }
  import TopBar from './TopBar.svelte';
  import SideBar from './SideBar.svelte';

  let {
    topMenu   = $bindable(undefined),
    sideMenu  = $bindable(undefined),
    sideRight = false,       // place the sidebar on the right
    actions,                 // snippet: top bar right-side actions
    footer,                  // snippet: sidebar footer (e.g. profile)
    children,
    ...rest
  } = $props();

  let hasTop  = $derived(!!topMenu);
  let hasSide = $derived(!!sideMenu);

  // Flatten the top menu's sections into a horizontal item list.
  let topItems = $derived(hasTop ? (topMenu.sections ?? []).flatMap((s) => s.items ?? []) : []);
</script>

<div class="lyt lyt-col" {...rest}>
  {#if hasTop}
    <TopBar
      brand={topMenu.brand}
      items={topItems}
      active={topMenu.active}
      {actions}
    />
  {/if}

  {#if hasSide}
    <div class="lyt-row lyt-fill" class:lyt-side-right={sideRight}>
      <SideBar
        brand={hasTop ? undefined : sideMenu.brand}
        sections={sideMenu.sections}
        active={sideMenu.active}
        {footer}
      />
      <main class="lyt-main"><div class="lyt-inner">{@render children?.()}</div></main>
    </div>
  {:else}
    <main class="lyt-main"><div class="lyt-inner">{@render children?.()}</div></main>
  {/if}
</div>
