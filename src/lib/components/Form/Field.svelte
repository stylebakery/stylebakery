<script>
  let {
    label    = undefined,
    required = false,
    optional = false,
    hint     = undefined,
    error    = undefined,
    children,
    ...restProps
  } = $props();
</script>

<div class="field" {...restProps}>
  {#if label}
    <label class="label" class:label-required={required} class:label-optional={optional}>
      {label}
    </label>
  {/if}
  {@render children?.()}
  {#if error}
    <span class="field-error">
      <span class="material-symbols-outlined" style="font-size:0.9rem">error</span>
      {error}
    </span>
  {:else if hint}
    <span class="field-hint">{hint}</span>
  {/if}
</div>
