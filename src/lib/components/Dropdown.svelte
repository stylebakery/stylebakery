<script>
  // Dropdown — a menu of actions triggered by a button/element.
  // Distinct from Select (which is a form field). Use for row actions,
  // overflow "⋯" menus, etc.
  //
  // items: [{ label, icon?, onclick?, href?, danger?, disabled?, divider? }]
  // Or use the `trigger` and `menu` snippets for full control.

  let {
    items      = [],
    align      = 'start',      // 'start' | 'end'
    label      = 'Options',
    disabled   = false,
    trigger,                   // optional snippet(open) for a custom trigger
    menu,                      // optional snippet(close) for custom menu content
    ...restProps
  } = $props();

  let open = $state(false);
  let root;

  function toggle() { if (!disabled) open = !open; }
  function close() { open = false; }

  function runItem(item) {
    if (item.disabled) return;
    close();
    item.onclick?.();
  }

  $effect(() => {
    if (!open) return;
    function onDoc(e) { if (root && !root.contains(e.target)) close(); }
    function onKey(e) { if (e.key === 'Escape') close(); }
    document.addEventListener('pointerdown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  });
</script>

<div class="dropdown" bind:this={root}>
  {#if trigger}
    <div class="dropdown-trigger-wrap" onclick={toggle} role="button" tabindex="0">
      {@render trigger(open)}
    </div>
  {:else}
    <button
      type="button"
      class="btn btn-secondary dropdown-trigger"
      aria-haspopup="menu"
      aria-expanded={open}
      {disabled}
      onclick={toggle}
      {...restProps}
    >
      {label}
      <span class="material-symbols-outlined dropdown-caret" class:open>expand_more</span>
    </button>
  {/if}

  {#if open}
    <div class="dropdown-menu" class:dropdown-menu-end={align === 'end'} role="menu">
      {#if menu}
        {@render menu(close)}
      {:else}
        {#each items as item}
          {#if item.divider}
            <div class="dropdown-divider"></div>
          {:else if item.href}
            <a
              class="dropdown-item"
              class:dropdown-item-danger={item.danger}
              href={item.href}
              role="menuitem"
              onclick={close}
            >
              {#if item.icon}<span class="material-symbols-outlined">{item.icon}</span>{/if}
              <span class="dropdown-item-label">{item.label}</span>
            </a>
          {:else}
            <button
              type="button"
              class="dropdown-item"
              class:dropdown-item-danger={item.danger}
              disabled={item.disabled}
              role="menuitem"
              onclick={() => runItem(item)}
            >
              {#if item.icon}<span class="material-symbols-outlined">{item.icon}</span>{/if}
              <span class="dropdown-item-label">{item.label}</span>
            </button>
          {/if}
        {/each}
      {/if}
    </div>
  {/if}
</div>
