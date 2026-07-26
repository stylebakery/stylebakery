<script>
  // LeftBarLayout — a single left sidebar region + a fillable content area.
  // Nestable: children fill the content area completely.
  import SideBar from './SideBar.svelte';

  let {
    menu = $bindable(undefined),   // { brand?, sections, active? }
    footer,
    children,
    ...rest
  } = $props();
</script>

<div class="nl nl-row" {...rest}>
  {#if menu}
    <SideBar brand={menu.brand} sections={menu.sections} active={menu.active} {footer} />
  {/if}
  <div class="nl-fill nl-scroll">{@render children?.()}</div>
</div>
