const mongoose = require('mongoose');
const Chat = mongoose.model('chat');


const save = (date, chatName, message) => {
    console.log(message);
    let chatEntity = new Chat({
        chatDate: date,
        roomName: chatName,
        chatMessage: message
    });
    chatEntity.save((err, result) => {
        if (err) {
            res.send({
                data: err
            });
            return;
        }        
    });
}

module.exports = {
        save
}