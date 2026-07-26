<script>
  let { collapsed = false, children } = $props();
</script>

<div class="shell" class:shell-collapsed={collapsed}>
  {@render children?.()}
</div>
