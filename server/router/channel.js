const router = require('express').Router();
const {GetAllChannels, CreateChannel, DeleteChannel, GetChannelDetails, JoinChannel, LeaveChannel} = require('../controller/channel')
const {GetAllChats} = require('../controller/chat');
router.route('/').get(GetAllChannels).post(CreateChannel)
router.route('/:id').get(GetChannelDetails).delete(DeleteChannel)
router.route('/:id/chats').get(GetAllChats)
router.route('/:id/join-channel').patch(JoinChannel)
router.route('/:id/leave-channel').patch(LeaveChannel)



module.exports = router;
