process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const bcrypt = require('bcrypt');
const server = require('../index');
const authCtrl = require('../controllers/auth.controller');
const User = require('../models/user.model');
const should = chai.should();
const expect = chai.expect;

chai.use(chaiHttp);

describe('Products', () => {
  let testUser = null;
  let product = null;
  let token = '';

  before(done => {
    User.findOneAndRemove({ email: 'test@foodbyte.io' }, () => {
      User.create({
        fullname: 'John Doe',
        email: 'test@foodbyte.io',
        hashedPassword: bcrypt.hashSync('test', 10)
      }, (err, user) => {
        testUser = user;
        token = authCtrl.generateToken(testUser);
        done();
      });
    });
  });

  after(done => {
    User.findOneAndRemove({ email: 'test@foodbyte.io' }, done);
  });

  describe('GET /products', () => {
    it('it should GET all the products', done => {
      chai.request(server)
      .get('/api/products')
      .end((err, res) => {
        res.should.have.status(200);
        expect(res.body.results).to.be.a('array');
        product = res.body.results[0];
        done();
      });
    });
  });

  describe('GET /products/:id', () => {
    it('it should GET the product given an id', done => {
      chai.request(server)
      .get(`/api/products/${product._id}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        expect(res.body).to.deep.equal(product);
        done();
      });
    });
  });

  describe('POST /products/:id/price',() =>{
    it('it should post the new price of the product', done =>{
      chai.request(server)
      .post(`/api/products/${product._id}/price`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        shop: '5c652a4230c132bd156cffab',
        date: '2019-02-07T19:44:45.037Z',
        price: 3
      })
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
    });
  });

  describe('POST /products/:id/price not allowed because of date',()=>{
    it('it should post the new price of the product', done =>{
      chai.request(server)
      .post(`/api/products/${product._id}/price`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        shop: '5c652a4230c132bd156cffab',
        date: '2019-02-04T19:44:45.037Z',
        price: 5
      })
      .end((err, res) => {
        res.should.have.status(304);
        done();
      });
    });
  });
  
});
