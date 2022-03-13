const Role = require('../../src/model/role');

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
  await Role.deleteMany({slug: 'admin'});
  await Role.deleteMany({slug: 'author'});
  await p.save((err, result) => {
    if (index === roles.length - 1) {
      console.log('Role Seed Done');
      // mongoose.disconnect();
    }
  });
});
