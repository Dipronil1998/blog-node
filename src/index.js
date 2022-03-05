require('dotenv').config({path: './config/.env'});
const express = require('express');

require('./db/conn'); // database connection


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
const UserRouter=require('./router/authRoute');
app.use('/auth/', UserRouter);

const categoryRouter=require('./router/categoryRoute');
app.use('/category/', categoryRouter);

const tagRouter=require('./router/tagRoute');
app.use('/tag/', tagRouter);

// var blogRouter=require("./router/blog");
// app.use(blogRouter);


app.listen(port, () => {
  console.log(`Server is run: ${port}`);
});
