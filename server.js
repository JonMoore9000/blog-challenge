const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();
const app = express();

// log
app.use(morgan('common'));

const blogPostsRouter = require('./blogPostsRouter');

//Redirecting requests
app.use('/blog-posts', blogPostsRouter);

app.listen(process.env.PORT || 8080, () => {
  console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});