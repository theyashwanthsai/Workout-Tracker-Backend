const mongoose = require('mongoose');

const { Schema } = mongoose;

const exerciseSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: false,
  },
});

module.exports = mongoose.model('exercise', exerciseSchema);