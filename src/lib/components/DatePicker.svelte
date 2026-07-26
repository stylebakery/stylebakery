<script>
  import Calendar from './Calendar.svelte';

  // DatePicker — a field that opens a Calendar popover to pick a date.
  // Simple: no keyboard nav, no min/max, no time.
  let {
    value       = $bindable(null),   // JS Date or null
    placeholder = 'Select a date',
    disabled    = false,
    format      = defaultFormat,      // (date) => string
    ...restProps
  } = $props();

  let open = $state(false);
  let root;

  function defaultFormat(d) {
    if (!d) return '';
    return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  }

  let display = $derived(value ? format(value) : '');

  function toggle() { if (!disabled) open = !open; }
  function onSelect() { open = false; }

  $effect(() => {
    if (!open) return;
    function onDoc(e) { if (root && !root.contains(e.target)) open = false; }
    function onKey(e) { if (e.key === 'Escape') open = false; }
    document.addEventListener('pointerdown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  });
</script>

<div class="datepicker" bind:this={root}>
  <button
    type="button"
    class="input datepicker-trigger"
    class:datepicker-placeholder={!value}
    {disabled}
    onclick={toggle}
    aria-haspopup="dialog"
    aria-expanded={open}
    {...restProps}
  >
    <span class="material-symbols-outlined datepicker-icon">calendar_today</span>
    <span class="datepicker-value">{display || placeholder}</span>
  </button>

  {#if open}
    <div class="datepicker-popover">
      <Calendar bind:value onselect={onSelect} />
    </div>
  {/if}
</div>
