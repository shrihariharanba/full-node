const socketFunc = (io) => {
  const news = io.of('/news');

  news.on('connection', function (socket){
    console.log('gajga a user connected');

    socket.on('chat message', function(msg) {
      news.emit('chat message', msg);
    });

    socket.on('disconnect', function() {
      console.log('User Disconnected');
    });
  }); 

}

module.exports = {
  socketFunc
}

