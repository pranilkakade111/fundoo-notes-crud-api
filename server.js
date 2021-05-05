/**
 * @description Dependencies require to be installed before its execution
 */
const express = require('express');
const bodyparser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const logger = require('./Logger/logger');
const swaggerDoc = require('./swagger.json');
require('dotenv').config();

const port = process.env.PORT;

/**
 * @description create express apps
 */

const app = express();

/**
 * @description  parse requests of content-type - application/x-www-form-urlencoded
 */

app.use(bodyparser.urlencoded({ extended: true }));

/**
 * @description  parse requests of content-type - application/json
 */

app.use(bodyparser.json());

require('./config/databaseConfig')(app);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

/**
 * @description  define a simple route
 */

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
