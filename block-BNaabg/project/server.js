var http = require('http');
var fs = require('fs')
var qs = require('querystring');
const { parse } = require('path');

var server = http.createServer(handleServer);
function handleServer(req,res){
let formatData = req.headers['content-type']
var store = '';
req.on('data',(chunk)=>{
    store += chunk 
})
req.on('end' ,()=>{
if(req.method ==="GET"){
    let parsedUrl = qs.parse(req.url);
    fs.readFile(`./user/${parsedUrl['users?username']}.json`,(err,content)=>{
        if(err){
            console.log(err);
        }
        let strData = JSON.parse(content);
        console.log(strData[`name`]);
        res.end(`<h2>${server['name']}</h2>`)
    })
}
if(req.method==="DELETE"){
    let parsedUrl = qs.parse(req.url);
    fs.unlink(`./users/${parsedUrl['/users?username']}.json`,(err)=>{
        if(err){
            console.log(err);
        }else{
            console.log(`n/Deteled file: ${parsedUrl['/users?username']}.json`);
        }
    })    
}
if(req.method === "POST" && req.url ==="./user"){
    res.writeHead(201,{'content-type':'text/html'});
    let parsData = JSON.parse(store);
    console.log(parseData["username"]);
    if(fs.existsSync(`./users/${parsData['username']}.json`)){
        res.end('user existed! , With the same name , Try again with unique name')
    }fs.open(`./users/${parData[username]}.json`,'wx',(err,fd)=>{
        if(err){
            return err;
        }
        console.log(fd);
        console.log("file Open");
    })

}




})

}


server.listen(3000,()=>{
    console.log("sever listner in port 3000");
})