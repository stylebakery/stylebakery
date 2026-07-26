<script>
  // TopBar — a horizontal top navigation region. A shared building block used
  // by several layouts (topbar, hybrid, drawer, right, bottom…). Renders brand +
  // an optional horizontal menu + an actions area. When `items` is empty it's
  // just a bar (brand + actions), which is how "bar with no menu" layouts work.
  import ThemeToggle from '../components/ThemeToggle.svelte';

  let {
    brand    = {},
    items    = [],        // flat list of menu items (already flattened by the layout)
    active   = undefined, // active item id
    variant  = 'default', // 'default' | 'tabs'  (visual style of the links)
    actions,              // optional snippet; defaults to a ThemeToggle
    onmenu,               // optional: show a hamburger button, called on click
    ...restProps
  } = $props();

  let openId = $state(null);
  function toggle(id) { openId = openId === id ? null : id; }
  $effect(() => {
    if (openId == null) return;
    function onDoc(e) { if (!e.target.closest?.('.tb-flywrap')) openId = null; }
    document.addEventListener('pointerdown', onDoc);
    return () => document.removeEventListener('pointerdown', onDoc);
  });
</script>

<header class="tb" {...restProps}>
  {#if onmenu}
    <button class="tb-hamburger" aria-label="Open menu" onclick={onmenu}>
      <span class="material-symbols-outlined">menu</span>
    </button>
  {/if}

  {#if brand?.href}
    <a href={brand.href} class="tb-brand">
      {#if brand.icon}<span class="material-symbols-outlined tb-brand-icon">{brand.icon}</span>{/if}
      {brand.label}
    </a>
  {:else if brand?.label}
    <div class="tb-brand">
      {#if brand.icon}<span class="material-symbols-outlined tb-brand-icon">{brand.icon}</span>{/if}
      {brand.label}
    </div>
  {/if}

  {#if items.length}
    <nav class="tb-nav" class:tb-nav-tabs={variant === 'tabs'}>
      {#each items as item}
        {#if item.children}
          <div class="tb-flywrap">
            <button
              type="button"
              class="tb-link tb-parent"
              class:active={item.id === active || item.children.some((c) => c.id === active)}
              aria-expanded={openId === item.id}
              aria-haspopup="menu"
              onclick={() => toggle(item.id)}
            >
              {#if item.icon}<span class="material-symbols-outlined">{item.icon}</span>{/if}
              {item.label}
              <span class="material-symbols-outlined tb-caret" class:open={openId === item.id}>expand_more</span>
            </button>
            {#if openId === item.id}
              <div class="tb-flyout">
                {#each item.children as child}
                  <a href={child.href} class="tb-flyout-item" class:active={child.id === active} onclick={() => (openId = null)}>
                    {#if child.icon}<span class="material-symbols-outlined">{child.icon}</span>{/if}
                    {child.label}
                  </a>
                {/each}
              </div>
            {/if}
          </div>
        {:else}
          <a href={item.href} class="tb-link" class:active={item.id === active}>
            {#if item.icon}<span class="material-symbols-outlined">{item.icon}</span>{/if}
            {item.label}
          </a>
        {/if}
      {/each}
    </nav>
  {:else}
    <div class="tb-spacer"></div>
  {/if}

  <div class="tb-actions">
    {#if actions}{@render actions()}{:else}<ThemeToggle />{/if}
  </div>
</header>
