const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = new Schema({
    chatDate: {
        type: Date,
        required: true
    },
    roomName: {
        type: String,
        required: true
    },
    chatMessage: [{
        userName: {
            type: String,
            required: true,
            unique: true
        },
        message: {
            type: String,
            required: true,
            unique: true
        }
    }]
});

module.exports = {
    chatSchema
}