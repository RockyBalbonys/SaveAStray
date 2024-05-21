const mongoose = require('mongoose');

const agendaSchema = new mongoose.Schema({
  date: Date,
  time: String,
  petName: String,
  pawrentName: String,
  shelterName: String,
  pawrentId: String,
  shelterId: String,
});

const Agenda = mongoose.model('Agenda', agendaSchema);

module.exports = Agenda;