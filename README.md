# vuedemo

Vue 3 + Vite demo project with a reusable cross-project engineering baseline.

## Local Development

```bash
npm install
npm run dev
```

## Quality Gate Commands

```bash
npm run lint
npm run test:unit
npm run build
```

These three checks are the required merge gate in CI.

## Cross-Project Standard

The full plugin strategy and delivery rules are documented here:

- `docs/engineering/cross-project-plugin-standard.md`

Key baseline files in this repository:

- `.github/workflows/quality-gate.yml`
- `.github/pull_request_template.md`
- `tests/quality-gate.test.js`

Copy these into new repositories to bootstrap the same governance model.
