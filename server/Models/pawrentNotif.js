const mongoose = require('mongoose');

const pawrentNotifSchema = new mongoose.Schema({
    to: String,
    from: String,
    approvalStatus: String,
    timestamp: Date
})

const PawrentNotif = mongoose.model('PawrentNotif', pawrentNotifSchema);

module.exports = PawrentNotif;