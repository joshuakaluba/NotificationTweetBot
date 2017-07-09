var express = require('express');
var router = express.Router();
var TwitterPackage = require('twitter');

var apiAuthSecret = process.env.TWITTER_BOT_AUTH_SECRET;
var twitterHandle = process.env.TWITTER_BOT_ADMIN_HANDLE;

var Twitter = new TwitterPackage({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_TOKEN_SECRET
});


router.get('/', function(req, res, next) {
    res.sendStatus(200);
});

router.post('/', function(req, res, next) {

    var content = req.body.content;
    var secret = req.body.secret;

    if ((!content) || (!secret) || (secret !== apiAuthSecret)) {
        res.status(422).json([{ "data": "missing" }]);
        return;
    }

    sendTweet(content);

    res.sendStatus(200);
});

var sendTweet = function(content) {

    //with the twitter api, the 'D' before the tweet and the content denotes a direct message
    
    Twitter.post('statuses/update', { status: `D @${twitterHandle} ${content}` },
        function(error, tweet, response) {
            if (error) {
                console.log(error);
            }
        });
};


module.exports = router;