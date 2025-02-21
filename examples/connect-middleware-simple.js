var connect = require('connect');
var http = require('http');
var app = connect();
var os = require('os');


// require request-ip and register it as middleware
var requestIp = require('request-ip');
app.use(requestIp.mw())

app.use(function(req, res) {
    
    console.log('------------------------------------------------------------------------------------');
    console.log(req.headers);
    try{console.log("req.connection.remoteAddress",req.connection.remoteAddress);}catch(ex){console.log('error-req.connection.remoteAddress');}
    try{console.log("req.socket.remoteAddress",req.socket.remoteAddress);}catch(ex){console.log('error-req.socket.remoteAddress');}
    try{console.log("req.connection.socket.remoteAddress",req.connection.socket.remoteAddress);}catch(ex){console.log('error-req.connection.socket.remoteAddress');}
    try{console.log("req.info.remoteAddress",req.info.remoteAddress);}catch(ex){console.log('error-req.info.remoteAddress');}
    
    
    var networkInterfaces = os.networkInterfaces();
    var newip = networkInterfaces['eth0'][0]['address'];
    console.log("networkInterfaces",networkInterfaces);
    console.log('newip',newip);
    
    console.log('------------------------------------------------------------------------------------');
    
    // by default, the ip address will be set on the `clientIp` attribute
    var ip = req.clientIp;
    res.end(ip + '\n');
});

//create node.js http server and listen on port
http.createServer(app).listen(3000);

// test it locally from the command line
// > curl -X GET localhost:3000 # Hello, your ip address is ::1 and is of type IPv6
