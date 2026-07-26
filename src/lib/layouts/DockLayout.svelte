<script>
  // DockLayout — a macOS-style floating dock: a centered, rounded bar of icons
  // floating over the content near the bottom. Minimal brand/actions in the
  // corners. One bindable `menu` drives the dock items.
  //
  //   <DockLayout bind:menu>{content}</DockLayout>
  //
  // Menu contract (shared):
  //   { brand?, sections: [{ items: [{ id, label, icon?, href?, children? }] }], active? }
  import ThemeToggle from '../components/ThemeToggle.svelte';

  let {
    menu    = $bindable({ brand: {}, sections: [], active: undefined }),
    actions,          // snippet: top-right actions (defaults to ThemeToggle)
    children,
    ...rest
  } = $props();

  let brand = $derived(menu?.brand ?? {});
  let items = $derived((menu?.sections ?? []).flatMap((s) => s.items ?? []));

  // Flyout for dock items that have children (opens upward).
  let openId = $state(null);
  function toggle(id) { openId = openId === id ? null : id; }
  $effect(() => {
    if (openId == null) return;
    function onDoc(e) { if (!e.target.closest?.('.dk-flywrap')) openId = null; }
    document.addEventListener('pointerdown', onDoc);
    return () => document.removeEventListener('pointerdown', onDoc);
  });
</script>

<div class="dk" {...rest}>
  {#if brand?.label}
    <div class="dk-corner dk-corner-left">
      {#if brand.icon}<span class="material-symbols-outlined dk-brand-icon">{brand.icon}</span>{/if}
      <span class="dk-brand-name">{brand.label}</span>
    </div>
  {/if}
  <div class="dk-corner dk-corner-right">
    {#if actions}{@render actions()}{:else}<ThemeToggle />{/if}
  </div>

  <main class="dk-main">
    <div class="dk-inner">{@render children?.()}</div>
  </main>

  <nav class="dk-dock" aria-label="Primary">
    {#each items as item}
      {#if item.children}
        <div class="dk-flywrap">
          {#if openId === item.id}
            <div class="dk-flyout">
              {#each item.children as child}
                <a href={child.href} class="dk-flyout-item" onclick={() => (openId = null)}>
                  {#if child.icon}<span class="material-symbols-outlined">{child.icon}</span>{/if}
                  {child.label}
                </a>
              {/each}
            </div>
          {/if}
          <button
            class="dk-item"
            class:active={item.id === menu.active}
            title={item.label}
            aria-label={item.label}
            onclick={() => toggle(item.id)}
          >
            {#if item.icon}<span class="material-symbols-outlined">{item.icon}</span>{/if}
            <span class="dk-label">{item.label}</span>
          </button>
        </div>
      {:else}
        <a href={item.href} class="dk-item" class:active={item.id === menu.active} title={item.label}>
          {#if item.icon}<span class="material-symbols-outlined">{item.icon}</span>{/if}
          <span class="dk-label">{item.label}</span>
        </a>
      {/if}
    {/each}
  </nav>
</div>
