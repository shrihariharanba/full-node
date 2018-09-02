const events = require('events');
const eventEmitter = new events.EventEmitter();
const schema = require('./../model/schema.model');
const chatRepo = require('./../repo/chatRepo');
const moment = require('moment');

const socketFunc = (io) => {
  const chat = io.of('/chat');
  let onlineUsers = [];
  let global = 'broadcast';

  eventEmitter.on('update online users', function(onlineUsers) {
    chat.emit('online users', onlineUsers);
  });

  chat.on('connection', function (socket){
    console.log('a user connected');
    socket.on('user', function(user) {
      console.log('Connected user', user);
      socket.join(global);

      onlineUsers.push(user);
      socket.user = user;
      socket.room = global;
      socket.broadcast.to(global).emit('send status', socket.user+" came online");
      eventEmitter.emit('update online users', onlineUsers);
    });   

    socket.on('chat message', function(msg) {
      chat.to(socket.room).emit('chat message', msg, socket.user);
      let chatDate = moment().format('yyyy-dd-MM');
      let chatName = socket.room;
      let chatMessage = [{
        userName: socket.user,
        message: msg
      }]
      chatRepo.save(chatDate, chatName, chatMessage);
    });

    socket.on('typing', function(data) {
      if(!data){
         socket.to(socket.room).broadcast.emit('message', '');
      }else{
       socket.to(socket.room).broadcast.emit('message', socket.user+" is typing..");
      } 
    });

    socket.on('privateChat', function(item, user){
      let room;
      if(!item || !user){
        room = 'broadcast';
      }else{
      let user1 = item.toLowerCase();
      let user2 = user.toLowerCase();
      let name;
      if(user1<user2){
          name = user1+user2; 
      }else{
        name = user2 + user1;
      }
      room = name;
      }
      socket.leave(socket.room);
      socket.room = room;
      socket.join(socket.room);
      
    });

    socket.on('disconnect', function() {
      console.log('User Disconnected');
      if (socket.user) {
        let index = onlineUsers.indexOf(socket.user);
        onlineUsers.splice(index, 1);
        socket.broadcast.emit('send status', socket.user+" left the chat");
        eventEmitter.emit('update online users', onlineUsers);
      }
    });
  }); 

}

module.exports = {
  socketFunc
}

