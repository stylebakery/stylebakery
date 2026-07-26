<script>
  // RightBarLayout — a single right-side sidebar region + fillable content.
  // Content comes first, bar on the right. Nestable.
  import SideBar from './SideBar.svelte';

  let {
    menu = $bindable(undefined),
    footer,
    children,
    ...rest
  } = $props();
</script>

<div class="nl nl-row" {...rest}>
  <div class="nl-fill nl-scroll">{@render children?.()}</div>
  {#if menu}
    <div class="nl-right">
      <SideBar brand={menu.brand} sections={menu.sections} active={menu.active} {footer} />
    </div>
  {/if}
</div>
