/**
 * @description Dependencies require to be installed before its execution
 */
const express = require('express');
const bodyparser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const redis = require('redis');
const responseTime = require('response-time');
const logger = require('./Logger/logger');
const swaggerDoc = require('./swagger.json');
const dbConnection = require('./config/DBconfig');
require('dotenv').config();

const port = process.env.PORT;

/**
 * @description create express apps
 */

const app = express();
app.use(responseTime());
/**
 * @description  parse requests of content-type - application/x-www-form-urlencoded
 */

app.use(bodyparser.urlencoded({ extended: true }));

/**
 * @description  parse requests of content-type - application/json
 */

app.use(bodyparser.json());

// require('./config/databaseConfig')(app);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

/**
 * @description  define a simple route
 */

const client = redis.createClient();
client.on('error', (error) => {
  console.log('Error Has Occured...!!!');
});
client.on('connect', () => {
  console.log('Redis Server Connected Successfully...!!!!');
});

app.get('/', (req, res) => {
  res.json({ message: 'Creating FundooNote App ...Note Keeping App Like Google Keep' });
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
