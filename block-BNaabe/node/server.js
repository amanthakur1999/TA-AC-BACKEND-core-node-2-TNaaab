var path = require('path');

var qs = require('querystring')
var http = require('http')
//absolute path
let pathapp = path.join(__dirname + "/app.js");
console.log(pathapp);

//relative path
let relative = "./index.html";
console.log(relative);

//absolute path

indexpath = path.join(__dirname,"index.html");
console.log(indexpath);



var server = http.createServer(handleSever)
function handleSever(req,res){
    console.log(req.method, req.url);
    var store = '';
    req.on('data', (chunk) => {
      store += chunk;
    });


    req.on('end',()=>{
        if (dataFormat === 'application/x-www-form-urlencoded') {
            var parsedData = qs.parse(store);
            res.statusCode = 201;
            res.end(JSON.stringify(parsedData));
          }
    })
}

server.listen(3000,()=>{
    console.log('server listner port 3000');
})


// server listener on port 9000

// let http = require('http');
// let qs = require('querystring');
var server = http.createServer((req, res) => {
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
