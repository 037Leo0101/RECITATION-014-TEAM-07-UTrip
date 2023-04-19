// Imports the index.js file to be tested.
const server = require('../index'); //TO-DO Make sure the path to your index.js is correctly added
// Importing libraries

// Chai HTTP provides an interface for live integration testing of the API's.
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.should();
chai.use(chaiHttp);
const {assert, expect} = chai;

describe('Server!', () => {
  // Sample test case given to test / endpoint.
  it('Returns the default welcome message', done => {
    chai
      .request(server)
      .get('/welcome')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.equals('success');
        assert.strictEqual(res.body.message, 'Welcome!');
        done();
      });
  });

  // ===========================================================================
  // TO-DO: Part A Login unit test case
  describe('POST /login', () => {
    it('should login successfully and return a 200 status', (done) => {
      const user = {
        username: 'testuser', // Replace with a valid registered username
        password: 'testpassword' // Replace with the corresponding valid password
      };

      chai.request(server)
        .post('/login')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.html;
          done();
        });
    });
  });
});
