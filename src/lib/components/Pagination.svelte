<script>
  // Pagination — page navigation with ellipsis truncation.
  // `page` is 1-based and bindable. Emits onchange(page) too.
  let {
    page      = $bindable(1),
    total     = 1,            // total number of pages
    siblings  = 1,            // pages shown on each side of current
    onchange,
    ...restProps
  } = $props();

  // Build the list of page items, inserting '…' where truncated.
  function range(start, end) {
    const out = [];
    for (let i = start; i <= end; i++) out.push(i);
    return out;
  }

  let items = $derived.by(() => {
    const totalNumbers = siblings * 2 + 5; // first, last, current, 2 ellipsis slots
    if (total <= totalNumbers) return range(1, total);

    const left  = Math.max(page - siblings, 1);
    const right = Math.min(page + siblings, total);
    const showLeftDots  = left > 2;
    const showRightDots = right < total - 1;

    if (!showLeftDots && showRightDots) {
      return [...range(1, siblings * 2 + 3), '…', total];
    }
    if (showLeftDots && !showRightDots) {
      return [1, '…', ...range(total - (siblings * 2 + 2), total)];
    }
    return [1, '…', ...range(left, right), '…', total];
  });

  function go(p) {
    if (p < 1 || p > total || p === page) return;
    page = p;
    onchange?.(p);
  }
</script>

<nav class="pagination" aria-label="Pagination" {...restProps}>
  <button
    class="pagination-btn pagination-arrow"
    disabled={page <= 1}
    onclick={() => go(page - 1)}
    aria-label="Previous page"
  >
    <span class="material-symbols-outlined">chevron_left</span>
  </button>

  {#each items as item}
    {#if item === '…'}
      <span class="pagination-ellipsis">…</span>
    {:else}
      <button
        class="pagination-btn"
        class:active={item === page}
        aria-current={item === page ? 'page' : undefined}
        onclick={() => go(item)}
      >
        {item}
      </button>
    {/if}
  {/each}

  <button
    class="pagination-btn pagination-arrow"
    disabled={page >= total}
    onclick={() => go(page + 1)}
    aria-label="Next page"
  >
    <span class="material-symbols-outlined">chevron_right</span>
  </button>
</nav>
