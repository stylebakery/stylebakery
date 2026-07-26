// theme.svelte.js
// Usage: import { theme } from '@stylebakery/stylebakery/theme'; theme.init(); theme.toggle();

const STORAGE_KEY = 'theme';

function createTheme() {
  let current = $state('light');

  function apply(value) {
    current = value;
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', value);
    }
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, value);
    }
  }

  function init() {
    if (typeof localStorage === 'undefined') return;
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      apply(stored);
    } else {
      // Respect OS preference on first visit
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      apply(prefersDark ? 'dark' : 'light');
    }
  }

  function toggle() {
    apply(current === 'light' ? 'dark' : 'light');
  }

  function set(value) {
    apply(value);
  }

  return {
    get current() { return current; },
    get isDark()  { return current === 'dark'; },
    init,
    toggle,
    set,
  };
}

export const theme = createTheme();
