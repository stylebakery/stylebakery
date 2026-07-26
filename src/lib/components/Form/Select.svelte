<script>
  let {
    value    = $bindable(''),
    disabled = false,
    error    = false,
    size     = 'md',
    children,
    ...restProps
  } = $props();

  const sizeClass = { sm: 'select-sm', md: '', lg: 'select-lg' };

  let classes = $derived(
    ['select', sizeClass[size], error ? 'select-error' : ''].filter(Boolean).join(' ')
  );
</script>

<select class={classes} {disabled} bind:value {...restProps}>
  {@render children?.()}
</select>
