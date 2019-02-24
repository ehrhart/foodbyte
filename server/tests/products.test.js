process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
const should = chai.should();
const expect = chai.expect;

chai.use(chaiHttp);

describe('Products', () => {
  let product = null;

  describe('GET /products', () => {
    it('it should GET all the products', done => {
      chai.request(server)
      .get('/api/products')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        product = res.body[0];
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

  let token = '';
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
        token = res.body.token;
        done();
      });
    });
  });

  
  describe('POST /products/:id/price',()=>{
    it('it should post the new price of the product', done =>{
      chai.request(server)
      .post(`/api/products/5c6eaaf953c03d0e7d2b12d4/price`)
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
