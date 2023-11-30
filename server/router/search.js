const router = require("express").Router();
const {GetChannels} = require('../controller/search')

router.route('/channels').get(GetChannels);

module.exports = router;
