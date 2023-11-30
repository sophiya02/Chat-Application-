const mongoose = require("mongoose");
const User = require('./user')
const Channel = require('./channel')

const ChatSchema = new mongoose.Schema({
  msg: {
    type: String,
    required: [true, "Empty Message Can Not be Sent"],
  },
  sendBy:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, "Please provide sender info"],
  },
  SendByUserEmail:{
    type:String
  },
  sendToReferenceType: {
    type: String,
    enum: ['user', 'channel'],
    default: 'channel',
    required: [true, "Please tell where should the msg be sent"],
  },
  sendTo:{
    type: mongoose.Schema.Types.ObjectId,
    ref: this.sendToReferenceType === "channel"? 'Channel' : 'User',
    required: [true, "Please provide the reciever details"],
  },
}, {
  timestamps: true
});

module.exports = mongoose.model('Chat', ChatSchema);
