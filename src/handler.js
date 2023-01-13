import redis from 'redis';
import { promisify } from 'util';
import config from './config.js';

let redisClient;

export default async(req, res) => {
  if (!redisClient) {
    redisClient = redis.createClient(config.redis);
    redisClient.getAsync = promisify(redisClient.get).bind(redisClient);
  }

  const path = req.url;

  try {
    const response = await redisClient.getAsync(path);
    if (response) {
      res.redirect(301, response);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    res.sendStatus(500);
  }
};
