const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  proof: String,
  greencoinsEarned: Number
});

module.exports = mongoose.model('Task', taskSchema);
