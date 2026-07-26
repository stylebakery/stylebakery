<script>
  import { getContext, onMount } from 'svelte';

  let {
    title       = '',
    subtitle    = undefined,
    icon        = undefined,
    badge       = undefined,
    initialOpen = false,
    children,
  } = $props();

  const id  = Math.random().toString(36).slice(2);
  const ctx = getContext('accordion');

  // standalone (no accordion context) falls back to local state
  let localOpen = $state(initialOpen);

  let isOpen = $derived(ctx ? ctx.openItems.has(id) : localOpen);

  function toggle() {
    if (ctx) ctx.toggle(id);
    else localOpen = !localOpen;
  }

  // height animation
  let bodyEl       = $state(null);
  let bodyInnerEl  = $state(null);

  $effect(() => {
    if (!bodyEl || !bodyInnerEl) return;
    if (isOpen) {
      bodyEl.style.height = bodyInnerEl.scrollHeight + 'px';
      const onend = () => { if (isOpen) bodyEl.style.height = 'auto'; };
      bodyEl.addEventListener('transitionend', onend, { once: true });
    } else {
      if (bodyEl.style.height === 'auto') {
        bodyEl.style.height = bodyInnerEl.scrollHeight + 'px';
      }
      requestAnimationFrame(() => { bodyEl.style.height = '0'; });
    }
  });

  onMount(() => {
    if (initialOpen && ctx) ctx.toggle(id);
  });
</script>

<div class="accordion-item" class:open={isOpen}>

  <button class="accordion-trigger" onclick={toggle} aria-expanded={isOpen}>
    <div class="accordion-trigger-content">
      {#if icon}
        <span class="material-symbols-outlined accordion-icon">{icon}</span>
      {/if}
      <div>
        <div class="accordion-title">{title}</div>
        {#if subtitle}<div class="accordion-subtitle">{subtitle}</div>{/if}
      </div>
    </div>
    {#if badge !== undefined}
      <span class="accordion-badge">{badge}</span>
    {/if}
    <span class="material-symbols-outlined accordion-chevron">expand_more</span>
  </button>

  <div class="accordion-body" style="height:{initialOpen ? 'auto' : '0'}" bind:this={bodyEl}>
    <div class="accordion-body-inner" bind:this={bodyInnerEl}>
      {@render children?.()}
    </div>
  </div>

</div>
