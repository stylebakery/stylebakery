<script>
  // HybridLayout — global top bar + contextual side rail + content.
  // The clearest demonstration of composition: it's just TopBar + SideBar.
  import TopBar from './TopBar.svelte';
  import SideBar from './SideBar.svelte';

  let { menu = { brand: {}, sections: [], active: undefined }, actions, footer, children, ...rest } = $props();
  // top bar shows the section groups as top-level tabs; sidebar shows items
  let topItems = $derived((menu.sections ?? []).map((s, i) => ({
    id: `sec-${i}`, label: s.label ?? 'Menu', href: '#'
  })));
</script>

<div class="lyt lyt-col" {...rest}>
  <TopBar brand={menu.brand} items={topItems} variant="tabs" {actions} />
  <div class="lyt-row lyt-fill">
    <SideBar sections={menu.sections} active={menu.active} {footer} />
    <main class="lyt-main"><div class="lyt-inner">{@render children?.()}</div></main>
  </div>
</div>
