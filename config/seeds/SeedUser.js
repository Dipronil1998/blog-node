const User = require('../../src/model/user');

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
  await User.deleteMany({name:'Mr. Admin'});
  await User.deleteMany({name:'Mr. Author'});
  await p.save((err, result) => {
    if (index === users.length - 1) {
      console.log('User Seed Done');
      // mongoose.disconnect();
    }
  });
});
