const cluster = require('cluster');
const io = require('socket.io')();
const sticky = require('sticky-session');
const http = require('http');
const redis = require('socket.io-redis');
const url = require('url');

const config = require('./config.js');

// HTTP Server
const server = http.createServer((req, res) => {

  var urlData = url.parse(req.url);

  // FOR INTERNAL API USE ONLY
  if (req.method == 'POST' &&
    urlData.pathname == config.get("pubPath")
  ) {
    var body = '';
    req.on('data', function (data) {
      body += data;
    });
    req.on('end', function () {

      var param = JSON.parse(body)

      if (param.key && param.token == config.get("pubToken")) {
        console.log("PUB------");
        console.log(param.message);
        console.log(param.key);
        console.log(param.token);
        io.to(param.key).emit('message', param.message);
      }
      res.end('worker: ' + cluster.worker.id);
    });
  } else {
    res.end('worker: ' + cluster.worker.id);
  }

});

// WS Handling
io.adapter(redis({ host: config.get("redis").host, port: config.get("redis").port }));
io.attach(server);
isWorker = sticky.listen(server, 3000);

var store = {};
if (isWorker) {
  io.on('connection', (socket) => {

    socket.on('join', function (key) {
      socket.join(key);
    });
    socket.on('disconnect', () => {

    });
  });
}
