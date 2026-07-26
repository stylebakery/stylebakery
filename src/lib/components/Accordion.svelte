<script>
  import { setContext } from 'svelte';

  let {
    variant  = 'default',
    multiple = false,
    children,
  } = $props();

  const variantClass = {
    default:   '',
    separated: 'accordion-separated',
    minimal:   'accordion-minimal',
    flush:     'accordion-flush',
  };

  let openItems = $state(new Set());

  setContext('accordion', {
    get openItems() { return openItems; },
    toggle(id) {
      const next = multiple ? new Set(openItems) : new Set();
      if (openItems.has(id)) next.delete(id);
      else next.add(id);
      openItems = next;
    }
  });

  let classes = $derived(
    ['accordion', variantClass[variant]].filter(Boolean).join(' ')
  );
</script>

<div class={classes}>
  {@render children?.()}
</div>
