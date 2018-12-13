const fashion_redirects = require('../fashion_redirects');
const expect = require('chai').expect;

describe('main()', () => {
  it('should return statusCode 400 if no path is passed', () => {
    let response = fashion_redirects.main();
    expect(response.statusCode).to.equal(400);
  });
});
