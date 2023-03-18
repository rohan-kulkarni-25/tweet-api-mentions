const express = require('express');
const { getTweets } = require('../controllers/tweetController');
const router = express.Router();

router.route('/tweets').get(getTweets)


module.exports = router;