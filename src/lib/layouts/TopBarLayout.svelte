<script>
  // TopBarLayout — a single top bar region + a content area that a child fills.
  // Designed to nest: put another *Layout inside as children and it fills the
  // content area completely.
  //
  //   <TopBarLayout menu={topMenu}>
  //     ...content, or another layout...
  //   </TopBarLayout>
  import TopBar from './TopBar.svelte';

  let {
    menu = $bindable(undefined),   // { brand?, sections, active? }
    actions,
    children,
    ...rest
  } = $props();

  let items = $derived(menu ? (menu.sections ?? []).flatMap((s) => s.items ?? []) : []);
</script>

<div class="nl nl-col" {...rest}>
  {#if menu}
    <TopBar brand={menu.brand} {items} active={menu.active} {actions} />
  {/if}
  <div class="nl-fill">{@render children?.()}</div>
</div>
