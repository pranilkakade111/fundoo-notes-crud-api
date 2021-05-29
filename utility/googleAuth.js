class AuthMiddleware {
    tokenAuthentication = (req, res, next) => {
      if (req.user.token) {
          
        next()
      } else {
          let response = {};
          response.status = false
          response.message = 'Failed To Set Google Token...!'
          return res.status(400).send(response)
      }
    };
  }
  module.exports = new AuthMiddleware();