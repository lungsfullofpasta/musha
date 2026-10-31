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

## API

The API is a Go server (`cmd/musha-api`) that speaks [Connect](https://connectrpc.com). Its contract lives in `proto/`, and [Buf](https://buf.build) generates both sides from it.

- `proto/musha/v1/app.proto` is the source of truth. Add RPCs there.
- `npm run lint:proto` runs `buf lint`.
- `npm run generate` runs `buf generate`. It writes Go code to `gen/go/` and TypeScript code to `src/gen/`, including the TanStack Query hooks (`*_connectquery.ts`). Commit the output with the proto change.
- Go tests: `go test ./...`.

### Run it locally

Start the API in one terminal and the web app in another:

```
go run ./cmd/musha-api          # API on :8080 (set ADDR to change it)
npm run dev                     # Vite on :5173, proxies /musha.v1.* to :8080
```

Components call the API through the generated hooks, for example `useQuery(getStatus)` from `src/gen/musha/v1/app-AppService_connectquery.ts`.

### Build the server

```
go build -o bin/musha-api -ldflags "-X github.com/lungsfullofpasta/musha/internal/api.Version=$(git rev-parse --short HEAD)" ./cmd/musha-api
```

Go 1.26 is required (connect-go v2 needs it).
