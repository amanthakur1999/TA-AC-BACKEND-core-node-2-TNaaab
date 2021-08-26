var http = require('http');
var fs = require('fs')
var qs = require('querystring');
var url = require("url");
const { parse } = require('path');
var userspath = __dirname + "/users/"

var server = http.createServer(handleServer);
// function handleServer(req,res){
// let formatData = req.headers['content-type']
// var store = '';
// req.on('data',(chunk)=>{
//     store += chunk 
// })
// req.on('end' ,()=>{
// if(req.method ==="GET"){
//     let parsedUrl = qs.parse(req.url);
//     fs.readFile(`./user/${parsedUrl['users?username']}.json`,(err,content)=>{
//         if(err){
//             console.log(err);
//         }
//         let strData = JSON.parse(content);
//         console.log(strData[`name`]);
//         res.end(`<h2>${server['name']}</h2>`)
//     })
// }
// if(req.method==="DELETE"){
//     let parsedUrl = qs.parse(req.url);
//     fs.unlink(`./users/${parsedUrl['/users?username']}.json`,(err)=>{
//         if(err){
//             console.log(err);
//         }else{
//             console.log(`n/Deteled file: ${parsedUrl['/users?username']}.json`);
//         }
//     })    
// }
// if(req.method === "POST" && req.url ==="./users"){
//     res.writeHead(201,{'content-type':'text/html'});
//     let parsData = JSON.parse(store);
//     console.log(parseData["username"]);
//     if(fs.existsSync(`./users/${parsData['username']}.json`)){
//         res.end('user existed! , With the same name , Try again with unique name')
//     }fs.open(`./users/${parData[username]}.json`,'wx',(err,fd)=>{
//         if(err){
//             return err;
//         }
//         console.log(fd);
//         console.log("file Open");
//     })

// }




// })

// }



function handleServer(req,res){
    var parsedUrl = url.parse(req.url , true);
    var store = "";
    req.on('data',(chunk)=>{
        store += chunk
    });

    req.on('end',()=>{
        if(req.method ==="POST" && req.url ==="/users"){
            var username = JSON.parse(store).username;
            fs.open(userspath + username + ".json" , "wx" ,(err ,fd) =>{
                if(err)return console.log(err);
                fs.writeFile(fd,store ,(err)=>{
                    if(err)return console.log(err);
                    fs.close(fd ,()=>{
                        res.end(`${username} created successfully`)
                    })
                })
            })
        }
        if(req.method === "GET" && parsedUrl.pathname ==="/users"){
            var username = parsedUrl.query.username;
fs.readFile(userspath + username + ".json" ,(err ,content)=>{
    console.log( err ,content);
    if(err) console.log(err);
    res.setHeader('content-type' ,'application/json')
   return res.end(content)
})
        }
        if(parsedUrl.pathname === '/users' && req.method === "PUT"){
            var username =parsedUrl.query.username;
            fs.open(userspath+ username + ".json" ,"r+", (err ,fd)=>{
                if(err)return console.log(err);
                fs.truncate(fd,(err)=>{
                  if(err)return console.log(err);
                  fs.writeFile(fd ,store ,(err)=>{
                      if(err) return console.log(err);
                      fs.close(fd,()=>{
                       return   res.end(`${username} updated Successfully`);
                      })
                  })
                })
            })
        }
        if(parsedUrl.pathname === "./users" && req.method === "DELETE"){
            var username =parsedUrl.query.username;
            fs.unlink(userspath +username + ".json", (err)=>{
                if(err) return console.log(err);
             return   res.end(`${username} is deleted`);
            })
        }
        res.statusCode =  404;
        res.end(`page is not found`)

    })
    
}


server.listen(3000,()=>{
    console.log("sever listner in port 3000");
})