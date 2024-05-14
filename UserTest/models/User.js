const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  affiliation: {
    type: String,
    required: true
  },
  bio: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['student', 'instructor' , 'admin'],
    required: true
  },
  yearsOfExperience: {
    type: Number, // Only for instructors
    required: function() {
      return this.role === 'instructor'; // Only required for instructors
    }
  }
});

module.exports = mongoose.model('User', userSchema);