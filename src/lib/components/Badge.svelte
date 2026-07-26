<script>
  let {
    variant  = 'default',
    dot      = false,
    children,
    ...restProps
  } = $props();

  let classes = $derived(
    ['badge', `badge-${variant}`, dot ? 'badge-dot' : ''].filter(Boolean).join(' ')
  );
</script>

<span class={classes} {...restProps}>
  {@render children?.()}
</span>
