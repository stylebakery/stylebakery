<script>
  import Radio from './Radio.svelte';

  let {
    value    = $bindable(undefined),
    options  = [],          // [{ value, label, disabled? }] or string[]
    name     = undefined,
    disabled = false,
    inline   = false,       // lay out horizontally
  } = $props();

  // Normalize string options to { value, label }
  let normalized = $derived(
    options.map((o) => (typeof o === 'string' ? { value: o, label: o } : o))
  );
</script>

<div class="radio-group" class:radio-group-inline={inline} role="radiogroup">
  {#each normalized as opt}
    <Radio
      bind:group={value}
      value={opt.value}
      label={opt.label}
      disabled={disabled || opt.disabled}
      {name}
    />
  {/each}
</div>
