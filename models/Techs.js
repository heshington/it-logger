const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TechSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },

  lastName: {
    type: String,
  },
});

module.exports = mongoose.model('tech', TechSchema);
