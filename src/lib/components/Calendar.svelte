<script>
  // Calendar — an inline month grid. Click a day to select it.
  // Simple by design: no keyboard nav, no min/max, no time — just a date.
  //
  // `value` is a JS Date (or null), bindable.
  let {
    value = $bindable(null),
    onselect,
    ...restProps
  } = $props();

  const MONTHS = ['January','February','March','April','May','June',
                  'July','August','September','October','November','December'];
  const DOW = ['Su','Mo','Tu','We','Th','Fr','Sa'];

  // The month currently being viewed (defaults to value's month, or today).
  let view = $state(startOfMonth(value ?? new Date()));

  function startOfMonth(d) { return new Date(d.getFullYear(), d.getMonth(), 1); }
  function sameDay(a, b) {
    return a && b &&
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate();
  }

  const today = new Date();

  let cells = $derived.by(() => {
    const year = view.getFullYear();
    const month = view.getMonth();
    const startDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const prevDays = new Date(year, month, 0).getDate();
    const out = [];
    for (let i = startDay - 1; i >= 0; i--) {
      out.push({ date: new Date(year, month - 1, prevDays - i), outside: true });
    }
    for (let d = 1; d <= daysInMonth; d++) {
      out.push({ date: new Date(year, month, d), outside: false });
    }
    let next = 1;
    while (out.length < 42) {
      out.push({ date: new Date(year, month + 1, next++), outside: true });
    }
    return out;
  });

  function prevMonth() { view = new Date(view.getFullYear(), view.getMonth() - 1, 1); }
  function nextMonth() { view = new Date(view.getFullYear(), view.getMonth() + 1, 1); }

  function pick(date) {
    value = date;
    // if they clicked an outside day, follow to that month
    if (date.getMonth() !== view.getMonth()) view = startOfMonth(date);
    onselect?.(date);
  }
</script>

<div class="calendar" {...restProps}>
  <div class="calendar-header">
    <button type="button" class="calendar-nav" onclick={prevMonth} aria-label="Previous month">
      <span class="material-symbols-outlined">chevron_left</span>
    </button>
    <div class="calendar-title">{MONTHS[view.getMonth()]} {view.getFullYear()}</div>
    <button type="button" class="calendar-nav" onclick={nextMonth} aria-label="Next month">
      <span class="material-symbols-outlined">chevron_right</span>
    </button>
  </div>

  <div class="calendar-grid">
    {#each DOW as d}
      <div class="calendar-dow">{d}</div>
    {/each}
    {#each cells as cell}
      <button
        type="button"
        class="calendar-day"
        class:outside={cell.outside}
        class:selected={sameDay(cell.date, value)}
        class:today={sameDay(cell.date, today)}
        onclick={() => pick(cell.date)}
      >
        {cell.date.getDate()}
      </button>
    {/each}
  </div>
</div>
