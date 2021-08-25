var http = require('http');
var qs = require('querystring');

var server = http.createServer(handleSever);
function handleSever(req, res) {
  var dataFormat = req.headers['content-type'];
  var store = '';
  req.on('data', (chunk) => {
    store += chunk;
  });
  req.on('end', () => {
    if (dataFormat === 'application/json') {
      var parsedData = JSON.parse(store);
      res.end(store);
    }
    if (dataFormat === 'application/x-www-form-urlencoded') {
      var parsedData = qs.parse(store);
      res.end(JSON.stringify(parsedData));
    }
  });
}

server.listen(7000, () => {
  console.log('server listener on port 7000');
});
