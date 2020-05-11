const express = require('express');
const path = require('path');
const app = express();
const compression = require('compression')
var bodyParser = require('body-parser');
app.use(compression())

// Constants
const PORT = 8000;
const HOST = '0.0.0.0';
console.log(process.env.NODE_ENV);
// App
const apis = require('./server/routes/api');

app.all('/*', function (req, res, next) {
  // res.header('Access-Control-Allow-Headers', 'Content-Type,storeid,X-Requested-With');
  res.header('Access-Control-Allow-Origin', '*');
  res.header('X-XSS-Protection', '1;mode=block');
  res.header('X-Frame-Options', 'DENY');
  res.header('X-Content-Type-Options', 'nosniff');
  res.header('Cache-Control', 'no-cache,no-store,max-age=0,must-revalidate');
  res.header('Pragma', 'no-cache');
  res.header('Expires', '-1');
  next();
});

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(express.json());       // to support JSON-encoded bodies

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));
app.use('/apis', apis);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);