const action = require('../src/action');
const expect = require('chai').expect;
const { promisify } = require('util');
const redisUrl = 'redis://localhost:16379';
const redisClient = action.createRedisClient({ redisUrl: redisUrl });
const redisSet = promisify(redisClient.set).bind(redisClient);

describe('main()', () => {
  before(() => {
    redisSet('/', 'http://example.org/');
  });

  after(() => {
    redisClient.quit();
  });

  it('should return statusCode 400 if no path is passed', (done) => {
    let mainPromise = action.main();

    mainPromise.then((response) => {
      expect(response.statusCode).to.equal(400);
    }).finally(done);
  });

  it('should return a redirect if valid path is passed', (done) => {
    let mainPromise = action.main({
      redisUrl: redisUrl,
      __ow_path: '/'
    });

    mainPromise.then((response) => {
      expect(response.statusCode).to.equal(301);
      expect(response.headers.location).to.equal('http://example.org/');
    }).finally(done);
  });

  it('should return statusCode 404 if invalid path is passed', (done) => {
    let mainPromise = action.main({
      redisUrl: redisUrl,
      __ow_path: '/invalid'
    });

    mainPromise.then((response) => {
      expect(response.statusCode).to.equal(404);
    }).finally(done);
  });
});
