const mongoose = require('mongoose');


    const chatMessageSchema = new mongoose.Schema({ // Replace with your Mongoose model name
        senderId: String, // Get user ID from connection (e.g., stored during authentication)
        receiverId: String,
        content: String,
        timestamp: Date,
    });

const ChatMessage = mongoose.model('ChatMessage', chatMessageSchema);

module.exports = ChatMessage;