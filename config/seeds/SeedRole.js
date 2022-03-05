const path = require('path');
require('dotenv').config({path: path.resolve(__dirname, '../.env')});
const Role = require('../../src/model/role');
// const mongoose = require('mongoose');
require('../../src/db/conn');
const roles = [
  new Role({
    role_id: 1,
    name: 'Admin',
    slug: 'admin',
  }),
  new Role({
    role_id: 2,
    name: 'Author',
    slug: 'author',
  }),
];


roles.map(async (p, index) => {
  await Role.deleteMany();
  await p.save((err, result) => {
    if (index === roles.length - 1) {
      console.log('Role Seed Done');
      // mongoose.disconnect();
    }
  });
});
