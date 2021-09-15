const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const LogSchema = new mongoose.Schema({
  message: {
    type: String,
  },
  attention: {
    type: Boolean,
  },
  tech: {
    type: String,
  },
  tech_id: {
    type: Schema.Types.ObjectId,
    ref: 'techs',
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('log', LogSchema);
