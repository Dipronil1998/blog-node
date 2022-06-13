const logger= require('./utils/logger');
const app = require('../config/app');
port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server is run: ${port}`);
  logger.info(`Server is run: ${port}`);
});
