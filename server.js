const express = require('express');
const swaggerUi = require('swagger-ui-express');
const passport = require('passport');
const redis = require('redis');
const cookieSession = require('cookie-session');
const logger = require('./Logger/logger');
const swaggerDoc = require('./swagger.json');
const dbConnection = require('./config/DBconfig');
require('dotenv').config();
// require('./passport-setup');

const port = process.env.PORT || 5000;

/**
 * @description create express apps
 */

const app = express();

app.use(cookieSession({
  name: 'fundoonote-session',
  keys: ['key1', 'key2'],
}));

const isLoggedin = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
};
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.set('view engine', 'ejs');

/**
 * @description Creating Redis Connection..!
 */

const client = redis.createClient();

client.on('connect', () => {
  console.log('Redis Server Connected Successfully...!!!!');
});
client.on('ready', () => {
  console.log('Client Connected To Redis And Ready To Use...!!!');
});
client.on('error', (error) => {
  console.log('Error Has Occured...!!!');
});
client.on('end', () => {
  console.log('client Disconnected From Redis..!!!');
});

app.get('/', (req, res) => {
  res.send('You Have Logout...');
});

app.get('/failed', isLoggedin, (req, res) => {
  res.send('You Have Failed To Login...');
});

app.get('/success', (req, res) => {
  res.send('Welcome !');
});

app.get('/logout', (req, res) => {
  req.session = null;
  req.logOut();
  res.send('You have Logout..!');
});

require('./app/routes/user')(app);

/**
 * @description  listen for requests
 */
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
