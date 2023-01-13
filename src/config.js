const redisConfig = () => {
  const redisOptions = {};

  if (process.env.REDIS_URL) {
    redisOptions.url = process.env.REDIS_URL;

    if (process.env.REDIS_TLS_CA) {
      redisOptions.tls = {
        ca: [Buffer.from(process.env.REDIS_TLS_CA, 'base64')]
      };
    }
  }

  return redisOptions;
};

export default {
  elasticApm: {
    environment: process.env['ELASTIC_APM_ENVIRONMENT'] || 'development',
    logLevel: process.env['ELASTIC_APM_LOG_LEVEL'] || 'info',
    serverUrl: process.env['ELASTIC_APM_SERVER_URL']
  },
  port: process.env.PORT || 3000,
  redis: redisConfig()
};
