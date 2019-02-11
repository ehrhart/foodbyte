process.env.NODE_ENV = 'test';

const User = require('../models/user.model');

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
const should = chai.should();
const expect = chai.expect;

chai.use(chaiHttp);

describe('Auth', () => {
  before(done => {
    User.findOneAndRemove({ email: 'test@foodbyte.io' }, done);
  });

  after(done => {
    User.findOneAndRemove({ email: 'test@foodbyte.io' }, done);
  });

  describe('POST /auth/register', () => {
    it('it should create a new user account', done => {
      chai.request(server)
      .post('/api/auth/register')
      .send({
        fullname: 'John Doe',
        email: 'test@foodbyte.io',
        password: 'test',
        repeatPassword: 'test'
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('user');
        done();
      });
    });
  });

  let token = '';

  describe('POST /auth/login', () => {
    it('it should login and return user informations', done => {
      chai.request(server)
      .post('/api/auth/login')
      .send({
        email: 'test@foodbyte.io',
        password: 'test'
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('token');
        token = res.body.token;
        done();
      });
    });
  });

  describe('GET /auth/me', () => {
    it('it should return user informations', done => {
      chai.request(server)
      .get('/api/auth/me')
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('user');
        expect(res.body.user.email).to.be.equal('test@foodbyte.io');
        done();
      });
    });
  });
});
