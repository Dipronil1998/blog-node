const express = require('express');
const db = require('../src/db/conn');
// require('../src/db/conn'); // database connection
db.dbConnect();  // database connection

const app = express();
app.use(express.json({}));

port = process.env.PORT || 3001;

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

// Router
const UserRouter=require('../src/router/authRoute');
app.use('/auth/', UserRouter);

const categoryRouter=require('../src/router/categoryRoute');
app.use('/category/', categoryRouter);

const tagRouter=require('../src/router/tagRoute');
app.use('/tag/', tagRouter);

// var blogRouter=require("./router/blog");
// app.use(blogRouter);


module.exports=app;
