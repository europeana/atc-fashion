const redis = require('redis');
const { promisify } = require('util');

/**
 * @param {Object} params - OpenWhisk parameters
 * @return {Promise} OpenWhisk web action response promise
 */
function main(params = {}) {
  if (params.__ow_path === undefined) {
    return new Promise((resolve, reject) => {
      resolve({ statusCode: 400, body: 'Bad Request' });
    });
  }

  const redisClient = createRedisClient(params);
  const redisGet = promisify(redisClient.get).bind(redisClient);

  return redisGet(params.__ow_path).then((res) => {
    if (res === null) {
      throw new Error;
    }
    redisClient.quit();
    return { statusCode: 301, headers: { location: res } };
  }).catch(() => {
    redisClient.quit();
    return { statusCode: 404, body: 'Not Found' };
  });
}

/**
 * @param {Object} params - OpenWhisk parameters
 * @return {RedisClient} Redis client
 */
function createRedisClient(params) {
  let redisOptions = {};
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

exports.main = main;
exports.createRedisClient = createRedisClient;
