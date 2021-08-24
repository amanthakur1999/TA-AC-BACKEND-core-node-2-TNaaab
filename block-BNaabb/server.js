var http = require('http');
var server = http.createServer(handleServer);

function handleServer(req, res) {
  if (req.method === 'POST' && req.url === '/') {
    var store = '';
    req.on('data', (chunk) => {
      store = store + chunk;
    });
    req.on;
    'end',
      () => {
        console.log(store);
      };
  }
}
server.listen(3456, () => {
  console.log('server listening in port 3456');
});
