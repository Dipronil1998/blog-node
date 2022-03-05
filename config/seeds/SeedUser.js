const path = require('path');
require('dotenv').config({path: path.resolve(__dirname, '../.env')});
const User = require('../../src/model/user');
// const mongoose = require('mongoose');
require('../../src/db/conn');
const users = [
  new User({
    role_id: 1,
    name: 'Mr. Admin',
    email: 'admin@gmail.com',
    password: '1234',
  }),
  new User({
    role_id: 2,
    name: 'Mr. Author',
    email: 'author@gmail.com',
    password: '1234',
  }),
];


users.map(async (p, index) => {
  await User.deleteMany();
  await p.save((err, result) => {
    if (index === users.length - 1) {
      console.log('User Seed Done');
      // mongoose.disconnect();
    }
  });
});
