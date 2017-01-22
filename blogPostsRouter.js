const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();
const app = express();

//modularized BlogPosts requests
const {BlogPosts} =	require('./models');

//Dummy content to start
BlogPosts.create('Save The World', 'The Earth is dying and we need to save it', 'Dany');
BlogPosts.create('Need More Cats', 'The world needs more cats. there is not enough cats.' , 'Brom');

//GET Request
router.get('/', (req, res) => {
	res.json(BlogPosts.get());
});