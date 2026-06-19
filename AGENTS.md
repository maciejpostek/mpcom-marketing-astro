# MPCOM Marketing Astro

This repository is the canonical GitHub source for the public MPCOM portfolio.
Meno is the visual editing surface and keeps its own internal `staging` and
`production` Git history. Synchronize source files through the scripts in this
repository instead of trying to merge Meno's internal Git history with GitHub.

## Priorities

1. Keep the portfolio usable as a real MPCOM proof asset.
2. Keep every page and component round-trippable through the Meno Astro dialect.
3. Preserve the existing restrained visual system: Inter, white and light gray
   surfaces, black text and blue only for primary actions and active states.
4. Prefer reusable product-system components over one-off page markup.

## Meno Authoring Rules

- Read `MENO.md` before changing `.astro` files.
- Use `style({ base, tablet, mobile })`; do not add raw `class="..."` values.
- Pages use `BaseLayout` from `meno-astro/components`.
- Reusable components declare editable props with `resolveProps`.
- Links use `Link` from `meno-astro/components`.
- Do not add package imports that are unavailable in the bundled Meno runtime.
  Prefer self-hosted assets and native HTML.
- Do not create conflict copies such as `process 2.astro`. Edit the canonical
  existing route or component.
- Keep route filenames lowercase and unique.

## Validation

Run before handing work back or syncing to GitHub:

```bash
npm run meno:check
npm run build
```

## Local Meno Sync

The default Meno project path is:

```text
/Users/maciejpostek/Documents/Meno/local/mpcom-marketing-astro
```

From the canonical repository:

```bash
npm run meno:push
npm run meno:pull
```

- `meno:push` copies the canonical repository UI into Meno.
- `meno:pull` exports Meno UI changes back into this repository.
- Set `MENO_PROJECT_PATH` to override the default local Meno directory.

After `meno:pull`, always inspect `git diff`, run validation, then commit and
push from this canonical repository.
