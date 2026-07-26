<script>
  import Spinner from './Spinner.svelte';

  /**
   * @typedef {'primary'|'secondary'|'ghost'|'danger'|'danger-outline'} Variant
   * @typedef {'sm'|'md'|'lg'} Size
   */

  let {
    variant  = 'primary',
    size     = 'md',
    full     = false,
    icon     = false,
    disabled = false,
    loading  = false,
    href     = undefined,
    children,
    ...restProps
  } = $props();

  const sizeClass = { sm: 'btn-sm', md: '', lg: 'btn-lg' };

  let classes = $derived([
    'btn',
    `btn-${variant}`,
    sizeClass[size],
    full ? 'btn-full' : '',
    icon ? 'btn-icon' : '',
    loading ? 'btn-loading' : '',
  ].filter(Boolean).join(' '));
</script>

{#if href}
  <a {href} class={classes} aria-busy={loading} {...restProps}>
    {#if loading}<Spinner />{/if}
    {@render children?.()}
  </a>
{:else}
  <button class={classes} disabled={disabled || loading} aria-busy={loading} {...restProps}>
    {#if loading}<Spinner />{/if}
    {@render children?.()}
  </button>
{/if}
