const mongoose = require('mongoose');
const logger= require('../utils/logger');

mongoose.connect(process.env.url, {
  // useCreateIndex:true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useFindAndModify:false,
}).then(()=>{
  console.log('Connection Successfully');
  logger.info('Connection Successfully');
}).catch((e)=>{
  console.log('connection error');
  logger.error('connection error');
  process.exit(1);
});
