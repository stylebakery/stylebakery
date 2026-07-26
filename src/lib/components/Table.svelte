<script>
  // Table — a data table with optional column sorting, custom cell
  // rendering, and an empty state.
  //
  // columns: [{ key, label, sortable?, align?, width? }]
  // rows:    array of objects keyed by column.key
  // cell:    optional snippet(row, column) for custom cell content
  // Sorting is client-side and non-destructive (does not mutate `rows`).

  let {
    columns   = [],
    rows      = [],
    cell,                       // snippet(row, column)
    sortable  = false,          // enable sorting globally (per-column overrides)
    emptyText = 'No data',
    striped   = false,
    ...restProps
  } = $props();

  let sortKey = $state(null);
  let sortDir = $state('asc');  // 'asc' | 'desc'

  function canSort(col) {
    return col.sortable ?? sortable;
  }

  function toggleSort(col) {
    if (!canSort(col)) return;
    if (sortKey === col.key) {
      sortDir = sortDir === 'asc' ? 'desc' : 'asc';
    } else {
      sortKey = col.key;
      sortDir = 'asc';
    }
  }

  let sortedRows = $derived.by(() => {
    if (!sortKey) return rows;
    const copy = [...rows];
    copy.sort((a, b) => {
      const av = a[sortKey], bv = b[sortKey];
      if (av == null) return 1;
      if (bv == null) return -1;
      let cmp;
      if (typeof av === 'number' && typeof bv === 'number') cmp = av - bv;
      else cmp = String(av).localeCompare(String(bv), undefined, { numeric: true });
      return sortDir === 'asc' ? cmp : -cmp;
    });
    return copy;
  });
</script>

<div class="table-wrapper" {...restProps}>
  <table class="table" class:table-striped={striped}>
    <thead>
      <tr>
        {#each columns as col}
          <th
            style:text-align={col.align ?? 'left'}
            style:width={col.width}
            class:table-th-sortable={canSort(col)}
            aria-sort={sortKey === col.key ? (sortDir === 'asc' ? 'ascending' : 'descending') : undefined}
          >
            {#if canSort(col)}
              <button type="button" class="table-sort-btn" onclick={() => toggleSort(col)}>
                {col.label}
                <span class="material-symbols-outlined table-sort-icon" class:active={sortKey === col.key}>
                  {sortKey === col.key ? (sortDir === 'asc' ? 'arrow_upward' : 'arrow_downward') : 'unfold_more'}
                </span>
              </button>
            {:else}
              {col.label}
            {/if}
          </th>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#if sortedRows.length === 0}
        <tr>
          <td class="table-empty" colspan={columns.length}>{emptyText}</td>
        </tr>
      {:else}
        {#each sortedRows as row}
          <tr>
            {#each columns as col}
              <td style:text-align={col.align ?? 'left'}>
                {#if cell}
                  {@render cell(row, col)}
                {:else}
                  {row[col.key]}
                {/if}
              </td>
            {/each}
          </tr>
        {/each}
      {/if}
    </tbody>
  </table>
</div>
