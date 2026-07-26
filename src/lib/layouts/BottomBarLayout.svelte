<script>
  // BottomBarLayout — a fillable content area + a single bottom bar region.
  // Bottom bar is a horizontal menu pinned to the bottom. Nestable.
  import TopBar from './TopBar.svelte';

  let {
    menu = $bindable(undefined),
    actions,
    children,
    ...rest
  } = $props();

  let items = $derived(menu ? (menu.sections ?? []).flatMap((s) => s.items ?? []) : []);
</script>

<div class="nl nl-col" {...rest}>
  <div class="nl-fill nl-scroll">{@render children?.()}</div>
  {#if menu}
    <div class="nl-bottom">
      <TopBar brand={menu.brand} {items} active={menu.active} {actions} />
    </div>
  {/if}
</div>
