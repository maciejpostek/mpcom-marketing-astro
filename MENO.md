# Meno Project Contract

This repository is prepared as a Meno-compatible Astro project. GitHub is the
source used to clone the project into Meno, while the `.astro` files remain the
round-trippable source of truth.

## Required Structure

```text
.
├── project.config.json
├── colors.json
├── variables.json
├── enums.json
├── astro.config.mjs
├── package.json
├── public/
│   └── .assetsignore
└── src/
    ├── cmsComponents.ts
    ├── components/
    ├── pages/
    └── styles/
        ├── theme.css
        └── global.css
```

## Runtime Contract

- `package.json` includes `meno-astro` in `dependencies`.
- `astro.config.mjs` registers `meno()` from `meno-astro/integration`.
- Every page is stored in `src/pages`.
- Editable reusable components are stored in `src/components`.
- Pages use `BaseLayout` from `meno-astro/components`.
- Component props are declared through `resolveProps`.
- Astro templates must remain compatible with the Meno dialect parser.

## Tokens

- `colors.json` defines color themes available to Meno.
- `variables.json` defines reusable layout, typography and motion values.
- `enums.json` defines option sets used by editable component props.
- `src/styles/theme.css` exposes the same values to the rendered website.
- Component and layout styling lives in Meno `style()` calls.
- `src/styles/theme.css` is limited to shared tokens, font faces and global
  document foundations.

When tokens change, update the JSON source and `theme.css` together until this
project gains an automated token-generation step.

## Validation

Before pushing a repository that will be cloned by Meno, run:

```bash
npm install
npm run meno:check
npm run build
```

`npm run meno:check` verifies the required files, JSON configuration, Meno
runtime integration and every page/component through a full
`parse -> emit -> parse` round trip. It also rejects raw class attributes and
Meno conflict-copy filenames such as `process 2.astro`.

## Local Meno Workflow

Meno uses its own internal `staging` and `production` branches. Do not connect
that history directly to GitHub. Treat this repository as the canonical source
and use file-level synchronization:

```bash
npm run meno:push
npm run meno:pull
```

The default editor path is
`/Users/maciejpostek/Documents/Meno/local/mpcom-marketing-astro`. Override it
with `MENO_PROJECT_PATH` when another Meno project copy is active.

After exporting from Meno:

```bash
npm run meno:pull
git diff
npm run meno:check
npm run build
```

## GitHub Import

1. Push the validated project to a public GitHub repository.
2. In Meno, choose **Create New Project → Clone**.
3. Paste the complete repository URL.
4. Use a new local project name.

Meno's Clone flow expects an existing Meno project, not an arbitrary Astro
repository. A regular Astro project without `project.config.json`, token JSON
files and Meno-compatible pages will be rejected.
