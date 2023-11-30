const ConflictError = require("../error/conflict");
const BadRequestError = require("../error/bad-request");
const Channel = require("../model/channel");
const User = require("../model/user");
const { StatusCodes } = require("http-status-codes");
const NotFoundError = require("../error/not-found");



const GetAllChannels = async(req, res, next)=>{
  try{
    console.log("Gett all channel")
    let userId = req.user.userId;
    let user = await User.findById(userId);
    if(!user)
      throw new NotFoundError(`No User Found for userId: ${userId}`);
    // console.log("user",user)
    let channels = user.channels;
    // console.log("channels: ",channels);
    res.status(StatusCodes.OK).json({channels: channels});
  }
  catch(error){
    console.log(error)
    next(error)
  }

};

const CreateChannel = async (req, res, next) => {
  try{
    // console.log("create channels")
    // console.log("req.body",req.body);
    // console.log("req.headers",req.headers);
    // console.log("req.user", req.user)
    const {name, description, image_url} = req.body
    const userId = req.user.userId;
    if(!name){
      throw new BadRequestError("Name is a required field");
    }
    let isChannelPresent = await Channel.findOne({name: name});
    if(isChannelPresent){
      console.log("isChannelPresent",isChannelPresent)
      throw new ConflictError("Conflicting Channel Present");
    }
    let channel = {
      name: name,
      description: description,
      image_url: image_url,
      users: [
        {
          userId: userId,
          role:'admin',
        }
      ]
    }
    let createdChannel = await Channel.create(channel);
    let user = await User.findById(userId);
    if(!user){
      throw new NotFoundError(`No Channel Found for the given id: ${userId}`)
    }
    console.log("user: ", user);
    user.channels.push({
      channelId: createdChannel._id,
      role:'admin'
    })
    console.log("user channels: ", user.channels)
    await user.save()

    res.status(StatusCodes.CREATED).json({ channelCreated: createdChannel });
} catch (error) {
  console.log(error);
  // res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
  next(error)
}

};

const DeleteChannel = async(req, res, next)=>{
  try{
    let channelId= req.params.id;
    let channel= await Channel.findByIdAndDelete(channelId);
    console.log("deleteReq",channel);
    if(!channel){
      throw new NotFoundError(`No Channel Found for the given id: ${channelId}`)
    }

    res.status(StatusCodes.OK).json({msg: "Channel Deleted Successfully"});
  }
  catch(error){
    console.log(error)
    next(error)
  }

};

const GetChannelDetails = async(req, res, next)=>{
  try{
    let channelId= req.params.id;
    let channelDetails= await Channel.findById(channelId);
    if(!channelDetails){
      throw new NotFoundError(`No Channel Found for the given id: ${channelId}`)
    }
    res.status(StatusCodes.OK).json({channelDetail: channelDetails});
  }
  catch(error){
    console.log(error);
    next(error)
  }

};

const JoinChannel = async(req, res, next)=>{
  try{
    let channelId = req.params.id;
    let userId = req.user.userId;
    if(!channelId || !userId){
      throw new BadRequestError(`Channel Id and User Id is required for joing a channel`)
    }
    console.log(`channel: ${channelId} user: ${userId}`)

    let channel = await Channel.findById(channelId);
    if(!channel){
      throw new NotFoundError(`No Channel Found for the given id: ${channelId}`)
    }
    let isUserPresent = false;
    for (u in channel.users) {
      if(u.userId.toString() === userId)
      {
        isUserPresent=true;
        break;
      }
    }
    if(isUserPresent){
      throw new ConflictError("user is already a member of this channel.")
    }
    else{
      channel.users.push({
        userId: userId,
        role:'user'
      })
      let user = await User.findById(userId);
      if(!user){
        throw new NotFoundError(`No Channel Found for the given id: ${userId}`)
      }
      user.channels.push({
        channelId: channelId,
        role:'user'
      })
      await user.save();
      await channel.save();
      res.status(StatusCodes.OK).json({msg: "Channel Joined"});
    }
  }
  catch(error){
    console.log(error);
    next(error)
  }

};

const LeaveChannel = async(req, res, next)=>{
  try{
    let channelId = req.params.id;
    let userId = req.user.userId;
    if(!channelId || !userId){
      throw new BadRequestError(`Channel Id and User Id is required for joing a channel`)
    }
    console.log(`channel: ${channelId} user: ${userId}`)

    let channel = await Channel.findById(channelId);
    if(!channel){
      throw new NotFoundError(`No Channel Found for the given id: ${channelId}`)
    }

    let user = await User.findById(userId);
    if(!user){
      throw new NotFoundError(`No Channel Found for the given id: ${userId}`)
    }
    channel.users = channel.users.filter((u) => {
      if(u.role === "admin"){
        throw new BadRequestError("admin can't leave the channel")
      }
      return u.userId.toString() !== user._id.toString()
    });
    user.channels = user.channels.filter((c) => {
      if(c.role === "admin"){
        throw new BadRequestError("admin can't leave the channel")
      }
      return c.channelId.toString() !== channel._id.toString()
    });

    // Save changes
    // console.log("user.channels",user.channels)
    // console.log("channel.users",channel.users)
    await channel.save();
    await user.save();
    res.status(StatusCodes.OK).json({msg: "Channel Left"});
  }
  catch(error){
    console.log(error);
    next(error)
  }

};

module.exports = {
  GetAllChannels,
  CreateChannel,
  DeleteChannel,
  GetChannelDetails,
  JoinChannel,
  LeaveChannel
};
