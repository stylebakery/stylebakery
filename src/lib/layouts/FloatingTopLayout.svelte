<script>
  // FloatingTopLayout — a detached, rounded top menu card floating over the
  // content. Nestable single-region layout. Items with children open a flyout.
  import ThemeToggle from '../components/ThemeToggle.svelte';

  let { menu = $bindable(undefined), actions, children, ...rest } = $props();
  let items = $derived(menu ? (menu.sections ?? []).flatMap((s) => s.items ?? []) : []);
  let brand = $derived(menu?.brand ?? {});

  let openId = $state(null);
  const toggle = (id) => { openId = openId === id ? null : id; };
  $effect(() => {
    if (openId == null) return;
    const onDoc = (e) => { if (!e.target.closest?.('.nlf-flywrap')) openId = null; };
    document.addEventListener('pointerdown', onDoc);
    return () => document.removeEventListener('pointerdown', onDoc);
  });
</script>

<div class="nl nl-col nlf-pad" {...rest}>
  {#if menu}
    <div class="nlf-topcard">
      {#if brand.label}
        <div class="nlf-brand">
          {#if brand.icon}<span class="material-symbols-outlined nlf-brand-icon">{brand.icon}</span>{/if}
          {brand.label}
        </div>
      {/if}
      <nav class="nlf-topnav">
        {#each items as item}
          {#if item.children?.length}
            <div class="nlf-flywrap">
              <button
                type="button"
                class="nlf-toplink nlf-parent"
                class:active={item.id === menu.active || item.children.some((c) => c.id === menu.active)}
                aria-expanded={openId === item.id}
                aria-haspopup="menu"
                onclick={() => toggle(item.id)}
              >
                {#if item.icon}<span class="material-symbols-outlined">{item.icon}</span>{/if}
                {item.label}
                <span class="material-symbols-outlined nlf-caret" class:open={openId === item.id}>expand_more</span>
              </button>
              {#if openId === item.id}
                <div class="nlf-flyout">
                  {#each item.children as child}
                    <a href={child.href} class="nlf-flyout-item" class:active={child.id === menu.active} onclick={() => (openId = null)}>
                      {#if child.icon}<span class="material-symbols-outlined">{child.icon}</span>{/if}
                      {child.label}
                    </a>
                  {/each}
                </div>
              {/if}
            </div>
          {:else}
            <a href={item.href} class="nlf-toplink" class:active={item.id === menu.active}>
              {#if item.icon}<span class="material-symbols-outlined">{item.icon}</span>{/if}
              {item.label}
            </a>
          {/if}
        {/each}
      </nav>
      <div class="nlf-actions">{#if actions}{@render actions()}{:else}<ThemeToggle />{/if}</div>
    </div>
  {/if}
  <div class="nl-fill nl-scroll nlf-content">{@render children?.()}</div>
</div>
