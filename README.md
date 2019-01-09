# Assimilation Traffic Control: Europeana Fashion

Redirects from Europeana Fashion website URLs to equivalents on other
Europeana websites, as an OpenWhisk web action.

[action.js](action.js) will query a Redis service, using the
HTTP request path as the key, and expect as the response a full URL to which
the client will be redirected.

## Dependencies

* Node.js 10
* Redis

## Deploy to OpenWhisk

```
wsk action create atc/fashion src/action.js --web true --kind nodejs:10
```

Optionally include Redis URL and Base64-encoded CA certificate:
```
wsk action create atc/fashion src/action.js --web true --kind nodejs:10 -m 128 \
  --param redisUrl "redis://admin:password@example.org/0" \
  --param redisCaCertificateBase64 "..."
```

## Build for local use

```
npm install
```

## Tests

Tests require Docker Compose to run Redis.

```
npm test
```

## License

Licensed under the EUPL V.1.1.

For full details, see [LICENSE.md](LICENSE.md).
