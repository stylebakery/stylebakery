<script>
  let {
    open          = $bindable(false),
    variant       = 'danger',
    title         = 'Are you sure?',
    message       = '',
    confirmLabel  = 'Confirm',
    cancelLabel   = 'Cancel',
    onconfirm     = () => {},
    oncancel      = () => {},
    children,
  } = $props();

  const icons = { danger: 'delete', warning: 'warning', info: 'info' };

  let closing = $state(false);

  function close() {
    closing = true;
    setTimeout(() => { closing = false; open = false; }, 200);
  }

  function confirm() {
    onconfirm();
    close();
  }

  function cancel() {
    oncancel();
    close();
  }

  let backdropClass = $derived(
    ['modal-backdrop', closing ? 'closing' : ''].filter(Boolean).join(' ')
  );

  let confirmClass = $derived(
    ['btn',
      variant === 'danger'  ? 'btn-danger'  : '',
      variant === 'warning' ? 'btn-primary' : '',
      variant === 'info'    ? 'btn-primary' : '',
    ].filter(Boolean).join(' ')
  );
</script>

{#if open || closing}
  <!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
  <div class={backdropClass} onclick={cancel} role="dialog" aria-modal="true">
    <!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
    <div class="modal modal-sm modal-confirm" onclick={(e) => e.stopPropagation()}>

      <div class="modal-body">
        <div class="modal-confirm-icon modal-confirm-icon-{variant}">
          <span class="material-symbols-outlined">{icons[variant]}</span>
        </div>
        <div>
          <p class="modal-confirm-title">{title}</p>
          {#if message}<p class="modal-confirm-message">{message}</p>{/if}
          {@render children?.()}
        </div>
      </div>

      <div class="modal-footer modal-footer-split">
        <button class="btn btn-secondary" onclick={cancel}>{cancelLabel}</button>
        <button class={confirmClass} onclick={confirm}>{confirmLabel}</button>
      </div>

    </div>
  </div>
{/if}
