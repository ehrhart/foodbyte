process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
const should = chai.should();
const expect = chai.expect;

chai.use(chaiHttp);

describe('Recipes', () => {
  let recipe = null;

  describe('GET /recipes', () => {
    it('it should GET all the recipes', done => {
      chai.request(server)
      .get('/api/recipes')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        recipe = res.body[0];
        done();
      });
    });
  });

  describe('GET /recipes/:id', () => {
    it('it should GET the recipe given an id', done => {
      chai.request(server)
      .get(`/api/recipes/${recipe._id}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        expect(res.body).to.deep.equal(recipe);
        done();
      });
    });
  });
});
