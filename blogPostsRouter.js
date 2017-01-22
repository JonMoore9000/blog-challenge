const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const router = express.Router();

const jsonParser = bodyParser.json();
const app = express();

//modularized BlogPosts requests
const {BlogPosts} =	require('./models');

//Dummy content to start
BlogPosts.create('Save The World', 'The Earth is dying and we need to save it', 'Dany');
BlogPosts.create('Need More Cats', 'The world needs more cats. there is not enough cats.' , 'Brom');

//GET BLOGS
router.get('/', (req, res) => {
	res.json(BlogPosts.get());
});

//CREATE BLOG
router.post('/', jsonParser, (req, res)  => {
	// require title, content, and author
	const requiredFields = ['title', 'content', 'author']
	for (let i=0; i<requiredFields.length; i++) {
		const field = requiredFields[i];
		if (!(field in req.body)) {
			const message = 'Missing \'{field}\' n request body'
			console.error(message);
			return res.status(400).send(message);
		}
	}
	const item = BlogPosts.create(req.body.title, req.body.content, req.body.author);
	res.status(201).json(item);
});

//DELETE BLOG
router.delete('/:id', (req, res) => {
  BlogPosts.delete(req.params.id);
  console.log(`Deleted shopping list item \`${req.params.ID}\``);
  res.status(204).end();
});

//UPDATE BLOG
router.put('/:id', jsonParser, (req, res) => {
  const requiredFields = ['id', 'title', 'content', 'author'];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }
  if (req.params.id !== req.body.id) {
    const message = (
      `Request path id (${req.params.id}) and request body id `
      `(${req.body.id}) must match`);
    console.error(message);
    return res.status(400).send(message);
  }
  console.log(`Updating shopping list item \`${req.params.id}\``);
  const updatedItem = BlogPosts.update({
    id: req.params.id,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author
  });
  res.status(204).json(updatedItem);
});


module.exports = router;









