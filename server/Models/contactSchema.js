const mongoose = require('mongoose');


    const contactSchema = new mongoose.Schema({
        shelter: String, 
        pawrent: String,
        timestamp: Date, // most recent message
        chatId: String,
        online: Boolean,
        seen: Boolean,
        receiverName: String,
        dp: String,
        conversation: [
            {   
                timestamp: {
                    type: Date,
                    default: null},
                messageSender: String,
                content: String,
                seen: Boolean
            }
        ]
    });

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;