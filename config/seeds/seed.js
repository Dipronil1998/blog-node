const path = require('path');
require('dotenv').config({path: path.resolve(__dirname, '../.env')});
const db = require('../../src/db/conn');
const role = require('./SeedRole');
db.dbConnect();
try {
  require('./SeedUser');
  require('./SeedRole');
  role.run();
  setTimeout(()=>{
    console.log('Seeding Complete');
    db.dbDisconnect();
  }, 5000);
} catch (error) {
  console.log(error);
}
