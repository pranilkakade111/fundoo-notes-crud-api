const express = require('express');
const swaggerUi = require('swagger-ui-express');
const passport = require('passport');
const session = require('express-session');
const logger = require('./Logger/logger');
const swaggerDoc = require('./swagger.json');
const dbConnection = require('./config/DBconfig');
require('dotenv').config();

const port = process.env.PORT || 5000;
const app = express();

// app.use(cookieSession({
//   name: 'fundoonote-session',
//   keys: ['key1', 'key2'],
// }));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

require('./redisConfig');

app.get('/', (_req, res) => {
  res.send('Welcome To FundooNote Note Keeping App Like Google Keep..');
});

app.get('/failed', (_req, res) => {
  res.send('You Have Failed To Login...!!!');
});

require('./app/routes/user')(app);

app.listen(port, () => {
  logger.log('info', `Server Started Successully ${port}`);
});

new dbConnection(process.env.MONGODB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
}).connect().then((uri) => console.log(`connected To ${uri} Successfully....!!!!!!`))
  .catch((err) => console.log('Could Not connected To Database', err));

module.exports = app;
