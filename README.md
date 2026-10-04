# Injected page routes return 404 with `prefixDefaultLocale: true`

An integration injects a page route (`/_admin/[...path]`) and an endpoint (`/_admin/api/ping`). The site enables i18n with `routing: { prefixDefaultLocale: true }`.

```sh
npm install
npm run build
PORT=4321 node dist/server/entry.mjs
```

| URL                | Expected | Actual |
| ------------------ | -------- | ------ |
| `/_admin/settings` | 200      | 404    |
| `/_admin/api/ping` | 200      | 200    |
| `/en/`             | 200      | 200    |

The page route renders, then the i18n step replaces the response with a 404 because the path has no locale segment. The integration owns this URL space and cannot add a locale prefix to it.
