<script>
  // Spinner — an inline loading indicator. Sizes to the surrounding text
  // by default (1em) and uses currentColor, so it works inside a button,
  // next to text, or standalone. Not a full-screen overlay.
  let {
    size  = undefined,     // e.g. '1rem', '20px'; defaults to 1em (matches text)
    label = 'Loading',     // accessible label
    ...restProps
  } = $props();
</script>

<span
  class="spinner"
  role="status"
  aria-label={label}
  style:width={size}
  style:height={size}
  {...restProps}
>
  <svg class="spinner-svg" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle class="spinner-track" cx="12" cy="12" r="9" stroke-width="3" />
    <path class="spinner-head" d="M21 12a9 9 0 0 0-9-9" stroke-width="3" stroke-linecap="round" />
  </svg>
</span>
