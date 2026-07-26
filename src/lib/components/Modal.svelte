<script>
  let {
    open            = $bindable(false),
    size            = 'md',
    drawer          = false,
    closeOnBackdrop = true,
    title           = undefined,
    subtitle        = undefined,
    header,
    footer,
    children,
  } = $props();

  const sizeClass = {
    sm: 'modal-sm', md: '', lg: 'modal-lg', xl: 'modal-xl', full: 'modal-full'
  };

  let closing = $state(false);

  function close() {
    closing = true;
    setTimeout(() => { closing = false; open = false; }, 200);
  }

  function onbackdrop() {
    if (closeOnBackdrop) close();
  }

  function onkeydown(e) {
    if (open && e.key === 'Escape') close();
  }

  let modalClass = $derived(
    ['modal', sizeClass[size], drawer ? 'modal-drawer' : ''].filter(Boolean).join(' ')
  );

  let backdropClass = $derived(
    ['modal-backdrop', closing ? 'closing' : '', drawer ? 'modal-backdrop-drawer' : '']
      .filter(Boolean).join(' ')
  );
</script>

<svelte:window onkeydown={onkeydown} />

{#if open || closing}
  <!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
  <div class={backdropClass} onclick={onbackdrop} role="dialog" aria-modal="true">
    <!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
    <div class={modalClass} onclick={(e) => e.stopPropagation()}>

      <div class="modal-header">
        {#if header}
          {@render header()}
        {:else if title}
          <div>
            <h2 class="modal-title">{title}</h2>
            {#if subtitle}<p class="modal-subtitle">{subtitle}</p>{/if}
          </div>
        {/if}
        <button class="btn btn-ghost btn-icon modal-close" onclick={close} aria-label="Close">
          <span class="material-symbols-outlined">close</span>
        </button>
      </div>

      <div class="modal-body">
        {@render children?.()}
      </div>

      {#if footer}
        <div class="modal-footer">
          {@render footer()}
        </div>
      {/if}

    </div>
  </div>
{/if}
