<script>
  let {
    variant  = 'default',
    padding  = 'md',
    title    = undefined,
    subtitle = undefined,
    header,
    actions,
    footer,
    children,
    ...restProps
  } = $props();

  const variantClass = {
    default:     '',
    flat:        'card-flat',
    raised:      'card-raised',
    interactive: 'card-interactive',
    selected:    'card-selected',
    subtle:      'card-subtle',
    info:        'card-info',
    success:     'card-success',
    warning:     'card-warning',
    error:       'card-error',
  };

  const paddingClass = {
    sm:   'card-body-sm',
    md:   '',
    lg:   'card-body-lg',
    none: 'card-body-none',
  };

  let cardClass = $derived(['card', variantClass[variant]].filter(Boolean).join(' '));
  let bodyClass = $derived(['card-body', paddingClass[padding]].filter(Boolean).join(' '));
</script>

<div class={cardClass} {...restProps}>

  {#if header || title}
    <div class="card-header">
      {#if header}
        {@render header()}
      {:else}
        <div>
          <h3 class="card-title">{title}</h3>
          {#if subtitle}<p class="card-subtitle">{subtitle}</p>{/if}
        </div>
      {/if}
      {#if actions}
        <div class="card-header-actions">
          {@render actions()}
        </div>
      {/if}
    </div>
  {/if}

  <div class={bodyClass}>
    {@render children?.()}
  </div>

  {#if footer}
    <div class="card-footer">
      {@render footer()}
    </div>
  {/if}

</div>
