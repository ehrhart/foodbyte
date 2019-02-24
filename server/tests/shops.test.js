process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
const should = chai.should();
const expect = chai.expect;

chai.use(chaiHttp);

describe('Shops', () => {
  let shop = null;

  describe('GET /shops', () => {
    it('it should GET all the shops', done => {
      chai.request(server)
      .get('/api/shops')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        shop = res.body[0];
        done();
      });
    });
  });

  describe('GET /shops/:id', () => {
    it('it should GET the shop given an id', done => {
      chai.request(server)
      .get(`/api/shops/${shop._id}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        expect(res.body).to.deep.equal(shop);
        done();
      });
    });
  });
});
