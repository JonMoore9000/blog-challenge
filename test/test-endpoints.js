const chai = require('chai');
const chaiHttp = require('chai-http');

const {app, runServer, closeServer} = require('../server');

const should = chai.should();

chai.use(chaiHttp);

describe('Blog Posts', function() {
  before(function() {
    return runServer();
  });

  after(function() {
    return closeServer();
  });

// GET TEST
  it('should list items on GET', function() {
    return chai.request(app)
      .get('/blog-posts')
      .then(function(res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        // because we create three items on app load
        res.body.length.should.be.at.least(1);
        // each item should be an object with key/value pairs
        // for `id`, `name` and `checked`.
        const expectedKeys = ['title', 'content', 'author'];
        res.body.forEach(function(item) {
          item.should.be.a('object');
          item.should.include.keys(expectedKeys);
        });
      });
  });

 //POST TEST
  it('should add an item on POST', function() {
    const newItem = {title: 'Stuff', content: 'Just a sample', author: 'Matt'};
    return chai.request(app)
      .post('/blog-posts')
      .send(newItem)
      .then(function(res) {
        res.should.have.status(201);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.include.keys('title', 'content', 'author', 'publishDate');
        res.body.id.should.not.be.null;
        //res.body.should.deep.equal(Object.assign(newItem, {id: res.body.id}));
      });
  });

  //PUT TEST
  it('should update items on PUT', function() {
    const updateData = {
      title: 'foo',
      content: 'is foo bar',
      author: 'Bizz'
    };

    return chai.request(app)
      // first have to get so we have an idea of object to update
      .get('/blog-posts/')
      .then(function(res) {
        updateData.id = res.body[0].id;
        return chai.request(app)
          .put(`/blog-posts/${updateData.id}`)
          .send(updateData);
      })

      .then(function(res) {
        res.should.have.status(204);
        //res.should.be.json;
        res.body.should.be.a('object');
        //res.body.should.deep.equal(updateData);
      });
  });

//DELETE TEST
  it('should delete items on DELETE', function() {
    return chai.request(app)
      .get('/blog-posts')
      .then(function(res) {
        return chai.request(app)
          .delete(`/blog-posts/${res.body[0].id}`);
      })
      .then(function(res) {
        res.should.have.status(204);
      });
  });
});