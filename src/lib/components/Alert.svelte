<script>
  let {
    variant  = 'info',
    title    = undefined,
    children,
    ...restProps
  } = $props();

  const icons = {
    info:    'info',
    success: 'check_circle',
    warning: 'warning',
    error:   'error',
  };
</script>

<div class="alert alert-{variant}" {...restProps}>
  <span class="material-symbols-outlined alert-icon">{icons[variant]}</span>
  <div class="alert-content">
    {#if title}<div class="alert-title">{title}</div>{/if}
    {@render children?.()}
  </div>
</div>
