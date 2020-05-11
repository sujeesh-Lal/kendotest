// https://marksandspencer-dev.apigee.net/

let config = require('./config/config.local');
config.type = process.env.NODE_ENV;
console.log(config);
module.exports = config;
