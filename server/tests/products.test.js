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
});
