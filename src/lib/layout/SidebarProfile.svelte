<script>
  let {
    name      = '',
    role      = '',
    initials  = '',
    avatarSrc = undefined,
    children,
    ...restProps
  } = $props();

  let display = $derived(initials || name.slice(0, 2).toUpperCase());
</script>

<div class="sidebar-profile" {...restProps}>
  <div class="sidebar-avatar">
    {#if avatarSrc}
      <img src={avatarSrc} alt={name} />
    {:else}
      {display}
    {/if}
  </div>
  <div class="sidebar-profile-info">
    <div class="sidebar-profile-name">{name}</div>
    <div class="sidebar-profile-role">{role}</div>
  </div>
  {#if children}
    {@render children()}
  {:else}
    <span class="material-symbols-outlined sidebar-profile-action">more_vert</span>
  {/if}
</div>
