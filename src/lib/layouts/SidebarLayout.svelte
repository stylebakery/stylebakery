<script>
  // SidebarLayout — classic left rail + content. Composed from SideBar.
  import SideBar from './SideBar.svelte';

  let { menu = { brand: {}, sections: [], active: undefined }, footer, children, ...rest } = $props();
</script>

<div class="lyt lyt-row" {...rest}>
  <SideBar brand={menu.brand} sections={menu.sections} active={menu.active} {footer} />
  <main class="lyt-main"><div class="lyt-inner">{@render children?.()}</div></main>
</div>
