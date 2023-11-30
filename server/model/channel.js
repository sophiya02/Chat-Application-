const mongoose = require("mongoose");
const User = require('./user')

const ChannelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide an name of room"],
  },
  description: {
    type: String,
  },
  image_url: {
    type: String
  },
  users: [
    {
      userId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required:  [true, "User Should be present"],
      },
      role:{
        type:String,
        enum:['admin', 'user'],
        defualt:['admin']
      },
      user_email:{
        type: String
      }

    }
  ]
}, {
  timestamps: true
});

module.exports = mongoose.model('Channel', ChannelSchema);
