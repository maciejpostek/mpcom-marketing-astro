# MPCOM Token System

First code-first implementation of the MPCOM variable architecture.

## Integration Status

The token system is integrated with the Astro prototype.

- `tokens.css` is imported before `src/styles/global.css` in `BaseLayout.astro`.
- Global colors, typography, spacing, radii and borders consume design tokens.
- Light and dark themes use the same semantic and component contracts.
- Shared controls select geometry through `data-component-size`.
- Product-specific widths and composition decisions remain local to the
  prototype instead of expanding the global design-system foundations.

## Import Order

```css
@import "./color-primitives.css";
@import "./size-primitives.css";

@import "./color-semantic.css";
@import "./size-semantic.css";
@import "./typography-foundations.css";
@import "./typography-semantic.css";
@import "./layout-foundations.css";
@import "./layout-semantic.css";

@import "./color-components.css";
@import "./component-sizes.css";
```

## Layers

```text
Reference primitives
        ↓
Global semantics and foundations
        ↓
Component tokens
        ↓
Component CSS
```

Component CSS should consume component tokens. A component token can alias:

- a global semantic token when the role is shared,
- a primitive when the decision belongs only to that component.

## File Map

### Colors

- `color-primitives.css`: neutral, accent and status ramps in OKLCH.
- `color-semantic.css`: light and dark themes, surfaces, text, borders,
  icons, statuses, focus and disabled.
- `color-components.css`: button, input, tab, link, tag and card contracts.

### Sizes

- `size-primitives.css`: fixed dimension scale.
- `size-semantic.css`: section spacing, component padding, gaps, radius,
  and border widths.
- `component-sizes.css`: shared `tiny`, `small`, `medium` and `large`
  geometry profiles exposed through `data-component-size`.

### Typography

- `typography-foundations.css`: heading and body font families, weight roles,
  responsive font sizes, line heights and letter spacing.
- `typography-semantic.css`: complete display, heading, body, label and
  caption contracts.

### Layout

- `layout-foundations.css`: fluid viewport, breakpoints, container limits and
  site padding limits.
- `layout-semantic.css`: responsive site padding, containers and the 12/8/4
  composition grid.

Component-specific layout decisions stay next to the component implementation.
They are promoted into shared tokens only after a repeated cross-component role
is confirmed.

## Shared Component Sizes

Compact controls share one geometry contract:

```html
<button data-component-size="small">Action</button>
<input data-component-size="medium" />
```

Component CSS consumes:

```css
min-height: var(--component-min-height);
padding: var(--component-padding-block) var(--component-padding-inline);
gap: var(--component-gap);
font-size: var(--component-font-size);
line-height: var(--component-line-height);
```

Not every component must support every profile. Form inputs should normally use
`medium` or `large`; `tiny` is intended for labels, tags and metadata controls.

## Responsive Strategy

Each semantic or component token uses one explicit behavior:

```text
fixed           → stable value
clamp()         → fluid interpolation
media query     → viewport-dependent step
container query → component-width-dependent step
```

There is no separate fluid-token namespace.

## Typography Baseline

The current exploration baseline is Inter:

```css
--font-family-heading: "Inter", Arial, sans-serif;
--font-family-body: "Inter", Arial, sans-serif;
```

The variables remain separate so heading and body fonts can be explored
independently on future branches.

## Values To Review

- Final neutral and accent OKLCH calibration.
- Final status color calibration.
- Primitive size scale density.
- Section and component clamp ranges.
- Font family explorations.
- Mapping of `normal`, `emphasis` and `strong` font weights.
- Heading and body type scale.
- Container maximum widths.
- Breakpoints and the 12/8/4 grid behavior.
- Component-specific color contracts.

## Validation

The integrated iteration has been checked for:

- valid CSS parsing,
- unresolved `var()` references,
- import ordering,
- Astro type and production builds,
- light and dark theme switching,
- desktop and mobile horizontal overflow,
- process drawer and service-tab interactions.
