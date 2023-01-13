# Assimilated Traffic Control: Europeana Fashion

Express app to redirect from Europeana Fashion website URLs to equivalents on
other Europeana websites.

The handler will query a Redis service, using the HTTP request path as the key,
and expect as the response a full URL to which the client will be redirected.

## Dependencies

* Node.js 16
* Redis

## Install

```
npm ci
```

## Run for production (without .env support)

```
npm run start
```

## Run for development (with .env support)

```
npm run start:dev
```

## License

Licensed under the EUPL v1.2.

For full details, see [LICENSE.md](LICENSE.md).
