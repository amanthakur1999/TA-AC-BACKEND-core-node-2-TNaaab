let http = require('http');
let qs = require('querystring');
let server = http.createServer((req, res) => {
  console.log(req.method, req.url);
  let store = '';
  let dataFormat = req.headers['content-type'];
  console.log(req.headers);
  req.on('data', (chunk) => {
    store += chunk;
  });
  req.on('end', () => {
    if (dataFormat === 'application/json') {
      let parsedData = qs.parse(store);
      res.setHeader('content-type', 'text/html');
      res.end(`<h1>${parsedData.name}</h1><p>${parsedData.emial}</p>`);
    }
  });
});

server.listen(9000, () => {
  console.log('server is runnning on port 9000');
});