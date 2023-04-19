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
  
  describe('POST /register', () => {
    it('should register a new user successfully and return a 200 status', (done) => {
      const newUser = {
        username: 'user',
        password: 'password'
      };

      chai.request(server)
        .post('/register')
        .send(newUser)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.html;
          done();
        });
    });
  });

  it('should fail to register a user with an existing username', done => {
    // Register the test user for the first time
    chai
      .request(server)
      .post('/register')
      .send({ username: 'testuser', password: 'testpassword' })
      .end((err, res) => {
        chai
          .request(server)
          .post('/register')
          .send({ username: 'testuser', password: 'testpassword' })
          .end((err, res) => {
            expect(res).to.have.status(400);
            expect(res.text).to.include('Something went wrong. Please try again');
            done();
          });
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

describe('POST /login', () => {
  // ...

  // Add this test case to the same 'describe' block as the positive test case
  it('should fail to login with an incorrect password', done => {
    chai
      .request(server)
      .post('/login')
      .send({ username: 'testuser', password: 'wrongpassword' })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.text).to.include('Incorrect username or password.');
        done();
      });
  });
});
  

 


