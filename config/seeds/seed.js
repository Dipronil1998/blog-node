const path = require('path');
require('dotenv').config({path: path.resolve(__dirname, '../.env')});
require('../../src/db/conn');
const mongoose = require('mongoose');
try {
  require("./SeedUser");
  require("./SeedRole");
} catch (error) {
  console.log(error);
}