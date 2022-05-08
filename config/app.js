const express = require('express');
const db = require('../src/db/conn');
// require('../src/db/conn'); // database connection
db.dbConnect(); // database connection

const app = express();
app.use(express.json({}));

port = process.env.PORT || 3001;
const {pageNotFound} = require('../src/middleware/PageNotFound');
const {errorHandler} = require('../src/middleware/ErrorHandler')
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

// Router
const UserRouter=require('../src/router/authRoute');
const categoryRouter=require('../src/router/categoryRoute');
const tagRouter=require('../src/router/tagRoute');
const postRoute = require('../src/router/postRoute');
const subscribersRoute=require('../src/router/subscribersRoute');

app.use('/auth/', UserRouter);
app.use('/category/', categoryRouter); 
app.use('/tag/', tagRouter);
app.use('/post/', postRoute);
app.use('/subscribers/', subscribersRoute);
app.use(pageNotFound);
app.use(errorHandler);

module.exports=app;
