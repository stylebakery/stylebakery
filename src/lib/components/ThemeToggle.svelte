<script>
  import { theme } from '../theme/theme.svelte.js';

  let {
    class: className = '',
    ...restProps
  } = $props();
</script>

<button
  class="btn btn-ghost btn-icon theme-toggle {className}"
  onclick={() => theme.toggle()}
  aria-label={theme.isDark ? 'Switch to light mode' : 'Switch to dark mode'}
  title={theme.isDark ? 'Switch to light mode' : 'Switch to dark mode'}
  {...restProps}
>
  {#if theme.isDark}
    <span class="material-symbols-outlined">light_mode</span>
  {:else}
    <span class="material-symbols-outlined">dark_mode</span>
  {/if}
</button>
