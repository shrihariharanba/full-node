const mongoose = require('mongoose');
const chatModel = require('./chat.model.js');
const chat = chatModel.chatSchema;

mongoose.model('chat', chat);
