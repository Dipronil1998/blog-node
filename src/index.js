const {dbPort} = require('../config/bootstrap');
const app = require('../config/app');
const RemoveUnuseOtp = require("./scheduler/RemoveUnuseOtp")
port = dbPort || 3001;

RemoveUnuseOtp.otpCron;
app.listen(port, () => {
  console.log(`Server is run: ${port}`);
});
