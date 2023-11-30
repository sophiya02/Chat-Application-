const ConflictError = require("../error/conflict");
const BadRequestError = require("../error/bad-request");
const Channel = require("../model/channel");
const User = require("../model/user");
const Chat = require("../model/chat");
const { StatusCodes } = require("http-status-codes");
const NotFoundError = require("../error/not-found");



const GetAllChats = async(req, res, next)=>{
  try{
    console.log("Get all chats")
    let channelId = req.params.id;
    let chats = await Chat.find({sendTo: channelId});
    res.status(StatusCodes.OK).json({chats: chats});
  }
  catch(error){
    console.log(error)
    next(error)
  }

};

const CreateChat = async (req, res, next) => {
  try{
    const channelId = req.params.id;
    let chat = {
      msg: req.body.msg,
      sendBy:req.user.userId,
      SendByUserEmail: req.user.email,
      sendTo: channelId,
    }

    let createdChat = await Chat.create(chat);
    res.status(StatusCodes.CREATED).json({ chat: chat });
} catch (error) {
  console.log(error);
  next(error)
}

};

module.exports = {
  GetAllChats,
  CreateChat
};
