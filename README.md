# Musha

A client-side app built with Vite, React, TypeScript, and TanStack Router. The landing page is at `/`, and the internal app is under `/app`.

## Scripts

- `npm run dev` starts the Vite dev server.
- `npm run build` type-checks and builds to `dist/`.
- `npm run preview` serves the built `dist/` locally.
- `npm run typecheck` runs `tsc --noEmit`.

## Deploying

This is a single-page app, so the host must serve `index.html` for any path that is not a file. Deep links such as `/app/about` fail without this. The rewrite rule looks like this:

```
/*  /index.html  200
```

The hosting provider is not chosen yet. Set this rule up on whichever host is picked.
