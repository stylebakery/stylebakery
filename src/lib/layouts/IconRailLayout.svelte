<script>
  // IconRailLayout — a narrow, icon-only vertical rail + fillable content.
  // Icons show a tooltip label on hover. Nestable like the other bar layouts.
  import ThemeToggle from '../components/ThemeToggle.svelte';

  let {
    menu = $bindable(undefined),   // { brand?, sections, active? } — labels used as tooltips
    footer,
    children,
    ...rest
  } = $props();

  let items = $derived(menu ? (menu.sections ?? []).flatMap((s) => s.items ?? []) : []);
  let brand = $derived(menu?.brand ?? {});

  let openId = $state(null);
  const toggle = (id) => { openId = openId === id ? null : id; };
  $effect(() => {
    if (openId == null) return;
    const onDoc = (e) => { if (!e.target.closest?.('.ir-flywrap')) openId = null; };
    document.addEventListener('pointerdown', onDoc);
    return () => document.removeEventListener('pointerdown', onDoc);
  });
</script>

<div class="nl nl-row" {...rest}>
  {#if menu}
    <div class="ir">
      {#if brand.icon}
        <a href={brand.href ?? '#'} class="ir-brand" aria-label={brand.label}>
          <span class="material-symbols-outlined">{brand.icon}</span>
        </a>
      {/if}
      <nav class="ir-nav">
        {#each items as item}
          {#if item.children?.length}
            <div class="ir-flywrap">
              <button
                class="ir-item"
                class:active={item.id === menu.active || item.children.some((c) => c.id === menu.active)}
                aria-label={item.label}
                onclick={() => toggle(item.id)}
              >
                {#if item.icon}<span class="material-symbols-outlined">{item.icon}</span>{/if}
                <span class="ir-tip">{item.label}</span>
                {#if item.badge != null}<span class="ir-dot"></span>{/if}
              </button>
              {#if openId === item.id}
                <div class="ir-flyout">
                  <div class="ir-flyout-head">{item.label}</div>
                  {#each item.children as child}
                    <a href={child.href} class="ir-flyout-item" class:active={child.id === menu.active} onclick={() => (openId = null)}>
                      {#if child.icon}<span class="material-symbols-outlined">{child.icon}</span>{/if}
                      {child.label}
                    </a>
                  {/each}
                </div>
              {/if}
            </div>
          {:else}
            <a href={item.href} class="ir-item" class:active={item.id === menu.active} aria-label={item.label}>
              {#if item.icon}<span class="material-symbols-outlined">{item.icon}</span>{/if}
              <span class="ir-tip">{item.label}</span>
              {#if item.badge != null}<span class="ir-dot"></span>{/if}
            </a>
          {/if}
        {/each}
      </nav>
      <div class="ir-foot">
        {#if footer}{@render footer()}{:else}<ThemeToggle />{/if}
      </div>
    </div>
  {/if}
  <div class="nl-fill nl-scroll">{@render children?.()}</div>
</div>
