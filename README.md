# Europeana Fashion redirects

Europeana Fashion redirects as an OpenWhisk web action.

## Dependencies

fashion_redirect.js will query a Redis service, using the HTTP request path as
the key, and expecting a full URL to redirect the client to as the response.

## Build

```
npm install --production
zip fashion_redirects.zip fashion_redirects.js node_modules package*.json
```

## Deploy

```
wsk action create redirect fashion_redirects.zip --web true --kind nodejs:8
```

Optionally include Redis URL and Base64-encoded CA certificate:
```
wsk action create redirect fashion_redirects.zip --web true --kind nodejs:8 \
  --param redisUrl "redis://admin:password@example.org/0" \
  --param redisCaCertificateBase64 "..."
```

## Configure

## License

Licensed under the EUPL V.1.1.

For full details, see [LICENSE.md](LICENSE.md).
