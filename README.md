# Europeana Fashion redirects

Europeana Fashion redirects as an OpenWhisk web action.

## Dependencies

[fashion_redirect.js](fashion_redirect.js) will query a Redis service, using the
HTTP request path as the key, and expecting as the response a full URL to which
the client will be redirected.

## Deploy to OpenWhisk

```
wsk action create redirect fashion_redirects.js --web true --kind nodejs:10
```

Optionally include Redis URL and Base64-encoded CA certificate:
```
wsk action create redirect fashion_redirects.js --web true --kind nodejs:10 \
  --param redisUrl "redis://admin:password@example.org/0" \
  --param redisCaCertificateBase64 "..."
```

## Build for local use

```
npm install
```

## License

Licensed under the EUPL V.1.1.

For full details, see [LICENSE.md](LICENSE.md).
