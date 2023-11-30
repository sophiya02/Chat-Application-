const { StatusCodes } = require('http-status-codes');
const Channel = require('../model/channel')

const GetChannels = async (req, res, next) => {
  try {
    const query = req.query;
    let channels;
    console.log("query", query);
    if (!query) {
      channels = await Channel.find();
    }
    else{
      channels = await Channel.find({ name: { $regex: new RegExp(query.name, 'i') } });
    }
    if (!channels) throw new NotFoundError("No channels found");
      console.log("channels: ", channels);
      res.status(StatusCodes.OK).json({ channels: channels });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  GetChannels,
};
