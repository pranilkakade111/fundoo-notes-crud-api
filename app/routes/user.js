const user = require('../controllers/user');

module.exports = (app) => {
  app.post('/user', user.createUser);

  app.post('/login', user.loginUser);

  app.post('/forgotPassword', user.forgotPassword);
};
