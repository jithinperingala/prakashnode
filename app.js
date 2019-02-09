var express = require('express')
  , app = express()
  , bodyParser = require('body-parser')
  , port = process.env.PORT || 49999,
  httpsPort = 30000
const fs = require('fs');
const https = require('https');
const http = require('http');

// Certificate
const privateKey = fs.readFileSync(__dirname + '/ssl/keys/a7ff0_0ab2f_5e63130be0e028bff3c18952be720379.key', 'utf8');
const certificate = fs.readFileSync(__dirname + '/ssl/certs/api_nmpc_co_in_a7ff0_0ab2f_1547885701_b39419d44549d71acde561630a556d71.crt', 'utf8');
const credentials = {
  key: privateKey,
  cert: certificate
};
app.set('views', __dirname + '/views')
app.engine('jade', require('jade').__express)
app.set('view engine', 'jade')
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type,loggedUser, Accept");
  next();
});
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(require('./controllers'))
process
  .on('unhandledRejection', (reason, p) => {
    console.error(reason, 'Unhandled Rejection at Promise', p);
  })
  .on('uncaughtException', err => {
    console.error(err, 'Uncaught Exception thrown');
    process.exit(1);
  });
// app.listen(port, function() {
//   console.log('Listening on port ' + port)
// })
const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

httpServer.listen(port, () => {
  console.log('HTTP Server running on port ' + port);
});

httpsServer.listen(httpsPort, () => {
  console.log('HTTPS Server running on port' + httpsPort);
});

