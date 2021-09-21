const app = require('./app');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

app.listen(process.env.PORT || 8000, () => {
  console.log(
    `App is running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`
  );
});
