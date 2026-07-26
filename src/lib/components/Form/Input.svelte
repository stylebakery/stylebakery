<script>
  let {
    value     = $bindable(''),
    type      = 'text',
    placeholder = '',
    disabled  = false,
    readonly  = false,
    error     = false,
    success   = false,
    iconLeft  = undefined,
    iconRight = undefined,
    size      = 'md',
    ...restProps
  } = $props();

  const sizeClass = { sm: 'input-sm', md: '', lg: 'input-lg' };

  let inputClass = $derived([
    'input',
    sizeClass[size],
    error   ? 'input-error'   : '',
    success ? 'input-success' : '',
    iconLeft  ? 'input-has-icon-left'  : '',
    iconRight ? 'input-has-icon-right' : '',
  ].filter(Boolean).join(' '));
</script>

{#if iconLeft || iconRight}
  <div class="input-wrapper">
    {#if iconLeft}
      <span class="material-symbols-outlined input-icon-left">{iconLeft}</span>
    {/if}
    <input
      class={inputClass}
      {type}
      {placeholder}
      {disabled}
      {readonly}
      bind:value
      {...restProps}
    />
    {#if iconRight}
      <span class="material-symbols-outlined input-icon-right">{iconRight}</span>
    {/if}
  </div>
{:else}
  <input
    class={inputClass}
    {type}
    {placeholder}
    {disabled}
    {readonly}
    bind:value
    {...restProps}
  />
{/if}
