const redis = require('redis');
const { promisify } = require('util');

/**
  *
  * @param Cloud Functions actions accept a single parameter, which must be a JSON object.
  *
  * @return The output of this action, which must be a JSON object.
  *
  */
function redirectFashion(params) {
  if (params.__ow_path === undefined) {
    return { statusCode: 400, body: 'Bad Request' };
  }

  const redisClient = createRedisClient(params);
  const redisGetAsync = promisify(redisClient.get).bind(redisClient);

  return redisGetAsync(params.__ow_path).then(function(res) {
    if (res === null) {
      throw new Error;
    }
    redisClient.quit();
    return { statusCode: 301, headers: { location: res } };
  }).catch(function() {
    redisClient.quit();
    return { statusCode: 404, body: 'Not Found' };
  });
}

function createRedisClient(params) {
  var redisOptions = {};
  if (params.redisUrl !== undefined) {
    redisOptions.url = params.redisUrl;
  }
  if (params.redisCaCertificateBase64 !== undefined) {
    redisOptions.tls = {
      ca: [Buffer.from(params.redisCaCertificateBase64, 'base64')]
    };
  }

  return redis.createClient(redisOptions);
}

exports.main = redirectFashion;
