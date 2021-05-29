const redis = require('redis');

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
