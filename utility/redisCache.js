const { func } = require('@hapi/joi');
const redis = require('redis');

const client = redis.createClient();

function setRedis(KEY, data) {
  client.setex(KEY, 3600, JSON.stringify(data));
}

function cache(req, res, next) {
  client.get('notes', (err, notes) => {
    if (err) throw err;

    if (notes !== null) {
      console.log('Fetching Notes');
      res.send({
        success: true,
        message: 'Data Fetching From Redis...!!!',
        data: JSON.parse(notes),
      });
    } else {
      next();
    }
  });
}

module.exports = { cache, setRedis };
