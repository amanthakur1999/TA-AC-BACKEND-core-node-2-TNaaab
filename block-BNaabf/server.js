let relative = './index.html';
console.log(relative);

//absolute
var path = require('path');
indexpath = path.join(__dirname, 'index.html');
console.log(indexpath);

let http = require('http');
let file = require('fs');
let qs = require('querystring');

let server = http.createServer((req, res) => {
  console.log(req.method, res.url);
  let dataFormate = req.headers['content-type'];
  let store = '';
  req.on('data', (chunk) => {
    store += chunk;
  });
  req.on('end', () => {
    if (req.method === 'GET' && req.url === '/form') {
      res.setHeader('Content-Type', 'text/html');
      file.createReadStream('./form.html').pipe(res);
    } else if (req.method === 'POST' && req.url === '/form') {
      let parsedData = qs.parse(store);
      res.setHeader('Content-Type', 'text/html');
      res.end(
        `</h1>${parsedData.name}</h1><p>${parsedData.age}</p><p>${parsedData.emial}</p>`
      );
    }
  });
});

server.listen(5678, () => {
  console.log('sever is running on port 5678');
});
