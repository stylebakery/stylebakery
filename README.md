# StyleBakery

A themeable **Svelte 5** component library with a bundled CSS design system, a
light/dark theme engine, and ready-made application layouts.

- **Docs & live examples:** https://stylebakery.net
- **Package:** [`@stylebakery/stylebakery`](https://www.npmjs.com/package/@stylebakery/stylebakery)

Everything is built on runes (`$props`, `$state`, `$derived`, `$bindable`) and
plain CSS custom properties — no Tailwind, no Sass, no CSS-in-JS.

> **Svelte 5 only.** This is a native Svelte component library — it is not a
> React, Vue, or web-components package, and there are no plans to port it.
> The one exception is the stylesheet: the bundled CSS design system is
> framework-agnostic and can be used on its own in any project.

## Install

```bash
npm install @stylebakery/stylebakery
```

`svelte@^5` is a peer dependency.

## Usage

Load the CSS **once**, globally (in your root layout or app entry):

```js
import '@stylebakery/stylebakery/css';
```

Then import components anywhere:

```svelte
<script>
  import { Button, Card, Field, Input } from '@stylebakery/stylebakery';

  let email = $state('');
</script>

<Card title="Welcome" subtitle="Sign in to continue">
  <Field label="Email" required>
    <Input bind:value={email} type="email" iconLeft="mail" />
  </Field>

  {#snippet footer()}
    <Button variant="primary" full>Continue</Button>
  {/snippet}
</Card>
```

### Theming (light / dark)

The package ships a tiny reactive theme store. It respects the OS preference on
first visit and persists the choice to `localStorage`:

```svelte
<script>
  import { theme, ThemeToggle } from '@stylebakery/stylebakery';
  import { onMount } from 'svelte';

  onMount(() => theme.init());
</script>

<ThemeToggle />

<!-- or drive it yourself -->
<button onclick={() => theme.toggle()}>
  {theme.isDark ? 'Light' : 'Dark'} mode
</button>
```

Icons use [Material Symbols Outlined](https://fonts.google.com/icons); the docs
site loads them (and the Inter font) via a `<link>` in `app.html`.

## What's inside

- **~30 UI components** — Button, Card, Modal, ConfirmDialog, Alert, Badge,
  Accordion, Dropdown, Table, Pagination, Progress, Spinner, Tooltip, Divider,
  Collapsible, Calendar, DatePicker, and more.
- **9 form controls** — Field, Input, Select, Toggle, Checkbox, Radio,
  RadioGroup, Textarea, MaskedInput.
- **Layout primitives** — `Shell`, `NavItem`, `SidebarProfile` for building an
  app chrome, plus **10 importable app-shell layouts** (top bar, sidebar, icon
  rail, floating dock, and variants).
- **A bundled CSS design system** — resets, layout utilities, component styles,
  and a full set of design tokens.

## CSS architecture — base + overlay

The stylesheet is split into two layers:

```
css/
  overlay/default.css   → CUSTOMIZABLE: every token *value* (colors, type,
                          spacing, radius, shadow) for light + dark mode.
  base.css              → STRUCTURAL: resets, layout, component styles.
                          Consumes tokens via var(); defines none.
```

`css/index.css` imports the overlay first (so tokens exist), then the base. To
ship a custom theme you either replace `overlay/default.css`, or load
`index.css` and then your own `theme.css` after it:

```js
import '@stylebakery/stylebakery/css';   // structure + default tokens
import './my-theme.css';                 // overrides token values only
```

Because structural CSS only ever reads tokens through `var()`, re-skinning the
whole system is a matter of overriding custom properties — no component changes.

### Package exports

| Import | What it is |
|--------|-----------|
| `@stylebakery/stylebakery` | All components + the `theme` store (Svelte). |
| `@stylebakery/stylebakery/css` | The full stylesheet (base + default overlay). |
| `@stylebakery/stylebakery/css/*` | Individual CSS files, if you want to cherry-pick. |
| `@stylebakery/stylebakery/theme` | The theme store on its own. |

## Develop

The library is consumed **from source** by the [docs site](https://github.com/stylebakery/designsystem),
which gives you instant hot-reload while iterating. Clone both repos side by
side and run the docs site — see its README for details.

Build the distributable package locally:

```bash
npm install
npm run package     # svelte-package: src/lib → dist/
```

## License

MIT
