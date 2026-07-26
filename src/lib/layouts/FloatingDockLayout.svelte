<script>
  // FloatingDockLayout — content with a centered floating dock of icons near
  // the bottom (macOS-style). Nestable single-region layout. Items with
  // children open an upward flyout.
  let { menu = $bindable(undefined), children, ...rest } = $props();
  let items = $derived(menu ? (menu.sections ?? []).flatMap((s) => s.items ?? []) : []);

  let openId = $state(null);
  const toggle = (id) => { openId = openId === id ? null : id; };
  $effect(() => {
    if (openId == null) return;
    const onDoc = (e) => { if (!e.target.closest?.('.nldk-flywrap')) openId = null; };
    document.addEventListener('pointerdown', onDoc);
    return () => document.removeEventListener('pointerdown', onDoc);
  });
</script>

<div class="nl nl-col nldk" {...rest}>
  <div class="nl-fill nl-scroll nldk-content">{@render children?.()}</div>
  {#if menu}
    <div class="nldk-dockwrap">
      <nav class="nldk-dock" aria-label="Primary">
        {#each items as item}
          {#if item.children?.length}
            <div class="nldk-flywrap">
              {#if openId === item.id}
                <div class="nldk-flyout">
                  {#each item.children as child}
                    <a href={child.href} class="nldk-flyout-item" onclick={() => (openId = null)}>
                      {#if child.icon}<span class="material-symbols-outlined">{child.icon}</span>{/if}
                      {child.label}
                    </a>
                  {/each}
                </div>
              {/if}
              <button
                class="nldk-item"
                class:active={item.id === menu.active || item.children.some((c) => c.id === menu.active)}
                title={item.label} aria-label={item.label}
                onclick={() => toggle(item.id)}
              >
                {#if item.icon}<span class="material-symbols-outlined">{item.icon}</span>{/if}
                <span class="nldk-label">{item.label}</span>
              </button>
            </div>
          {:else}
            <a href={item.href} class="nldk-item" class:active={item.id === menu.active} title={item.label} aria-label={item.label}>
              {#if item.icon}<span class="material-symbols-outlined">{item.icon}</span>{/if}
              <span class="nldk-label">{item.label}</span>
            </a>
          {/if}
        {/each}
      </nav>
    </div>
  {/if}
</div>
