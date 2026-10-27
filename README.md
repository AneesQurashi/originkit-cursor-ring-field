# Cursor Ring Field · Originkit

A minimal **React 19 + Vite 7 + TypeScript** starter built to host the authentic [Originkit Cursor Ring Field](https://www.originkit.dev/components/cursor-ring-field) component.

> **Installation status:** Starter project only. The Originkit component is **not included**. Run the official CLI to install it. The project shell displays an installation message until it is added.

## Quick start

Requires Node.js 20.19+ and npm.

```bash
npm install
npm run dev
```

## Install the official component

Keep authentication in your shell, **never** commit it to GitHub.

```bash
read -rsp "Originkit API key: " ORIGINKIT_API_KEY
printf '\n'
export ORIGINKIT_API_KEY
npm run install:component
npm run dev
```

The install script runs:

```bash
npx originkit@latest add cursor-ring-field --prompt
```

The starter looks for `src/components/originkit/ui/cursor-ring-field.tsx`, loading its default or `CursorRingField` export when present. If the CLI installs elsewhere, update `src/App.tsx`.

## Source structure

```text
src/App.tsx                   # Showcase and lazy component discovery
src/styles.css                # Styling
src/main.tsx                  # React entrypoint
scripts/install-component.sh  # Authenticated CLI command
components.json               # Originkit configuration
.github/workflows/install-originkit.yml # Manual GitHub Action
```

## Production build

```bash
npm run build
npm run preview
```

## Android-friendly GitHub Actions install

1. In **Settings → Secrets and variables → Actions**, add a new repository secret named `ORIGINKIT_API_KEY` with your **rotated** key.
2. Open **Actions → Install Originkit Cursor Ring Field → Run workflow**.
3. The workflow installs dependencies, calls the Originkit CLI and tries to commit installed files. It requires GitHub Actions write access; any interactive prompt in the CLI may require running locally instead.
4. If the CLI uses a different path or export, adjust `src/App.tsx` accordingly.

**Security:** Never commit `ORIGINKIT_API_KEY`, `.env`, local credentials, or `node_modules`. Since the original key was shared in chat, rotate it before use.

**Attribution:** Cursor Ring Field is credited to its Originkit creator(s). Review Originkit's license and terms before redistribution.
