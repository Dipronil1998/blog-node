const path = require('path');
require('dotenv').config({path: path.resolve(__dirname, '../.env')});
const db = require('../../src/db/conn');
db.dbConnect();
try {
  require('./SeedUser');
  require('./SeedRole');
} catch (error) {
  console.log(error);
}
