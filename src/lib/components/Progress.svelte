<script>
  // Progress — a linear progress bar. Determinate when `value` is set
  // (0–max); indeterminate when `indeterminate` is true.
  let {
    value        = 0,
    max          = 100,
    indeterminate = false,
    variant      = 'primary',   // 'primary' | 'success' | 'warning' | 'error'
    size         = 'md',        // 'sm' | 'md' | 'lg'
    showLabel    = false,
    ...restProps
  } = $props();

  let pct = $derived(Math.max(0, Math.min(100, (value / max) * 100)));
</script>

<div class="progress-container" {...restProps}>
  <div
    class="progress progress-{size}"
    role="progressbar"
    aria-valuenow={indeterminate ? undefined : value}
    aria-valuemin="0"
    aria-valuemax={max}
  >
    <div
      class="progress-bar progress-{variant}"
      class:progress-indeterminate={indeterminate}
      style:width={indeterminate ? undefined : `${pct}%`}
    ></div>
  </div>
  {#if showLabel && !indeterminate}
    <span class="progress-label">{Math.round(pct)}%</span>
  {/if}
</div>
