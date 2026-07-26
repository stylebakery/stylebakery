<script>
  let {
    value       = $bindable(''),
    placeholder = undefined,
    rows        = 4,
    disabled    = false,
    readonly    = false,
    error       = false,
    success     = false,
    resize      = 'vertical',   // 'none' | 'vertical' | 'horizontal' | 'both'
    ...restProps
  } = $props();

  let classes = $derived([
    'textarea',
    error   ? 'textarea-error'   : '',
    success ? 'textarea-success' : '',
  ].filter(Boolean).join(' '));
</script>

<textarea
  class={classes}
  bind:value
  {placeholder}
  {rows}
  {disabled}
  {readonly}
  style:resize
  {...restProps}
></textarea>
