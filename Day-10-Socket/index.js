const express = require('express');
const app = express();
const http = require('http');
const server = http.Server(app);
const port = 7002;
const io = require('socket.io')(server);


app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', function (socket){
  console.log('a user connected');

  socket.on('chat message', function(msg) {
    io.emit('chat message', msg);
  });

  socket.on('disconnect', function() {
    console.log('User Disconnected');
  });
}); 

server.listen(port, () => {
  console.log(`Server started on port ${port}`)
});