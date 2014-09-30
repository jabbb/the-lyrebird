var path = require("path");
var twit = require('twit');
var wordList = [];
var clean = /[\.,-\/\\!"'\[\]?$%\^&\*;:{}=\-_`~()…\r\n\t\f\v]/g
var config = require("config.js");
var twitter = new twit(config);
var wordCount = 4;



exports.index = function(req, res) {
    res.render('index', {
        title: "~~~~~~THE~LYREBIRD~~~~~~"
    });
};

exports.ping = function(req, res) {
    res.send("pong!", 200);
};

exports.search = function(req, res) {
	console.log("hello");
    var word = JSON.parse(req.body.lastWord);
    var encodedWord = encodeURIComponent(word.replace(clean, ''));
    console.log('encoded word: ' + encodedWord);
    var twtLength = JSON.parse(req.body.twtLength);

    // grab the request from the client
    twitter.get('search/tweets', {
        q: '%22' + encodedWord + '%22',
        lang: 'en',
        /*result_type: 'popular',*/
        /*since: dayRange(1), */
        count: 100
    }, function(err, data) {
        //console.log(data);
        if (err) {
            console.log('twit error: ' + err);
            res.send(JSON.stringify({
                'error': 2
            }));
        }
        if (data) {
            wordList = [];

            // find next word
            var index0 = Math.floor(Math.random() * data.statuses.length);
            for (var i = 0; i < data.statuses.length; i++) {
                var ii = (index0 + i) % data.statuses.length; // randomize starting tweet
                if (wordList.length < wordCount) {
                    console.log('-->  ' + data.statuses[ii].text);
                    var status = data.statuses[ii].text.split(/[\s]/); // split tweet into array of words
                    //var index = -1;
                    var newWord;

                    // find word in tweet
                    for (var iii = 0; iii < status.length - 1; iii++) {
                        if (word.toLowerCase().replace(clean, '') == status[iii].toLowerCase().replace(clean, '')) {
                            //var index = iii;
                            newWord = status[iii + 1];
                            //console.log(status);
                            console.log(iii + ' -- ' + status[iii] + ' -- ' + status[iii + 1]);
                        }
                    }
                    //var newWord = status[index + 1];

                    // check if word is a repeat
                    var hasWord = function() {
                            for (var iii = 0; iii < wordList.length; iii++) {
                                //console.log(wordList[iii].word);
                                if (wordList[iii].word == newWord) {
                                    return true;
                                }
                            }
                            return false;
                        }
                        //if not adds to wordList[]
                    if (newWord && newWord.replace(clean, '') != '' && !hasWord() && twtLength + newWord.length <= 140) {
                        wordList.push({
                            word: newWord,
                            user: data.statuses[ii].user.screen_name
                        });
                    }
                }
            }

            if (wordList.length == 0) {
                console.log('HUH? THERE WERE NO RESULTS!!!');
                res.send(JSON.stringify({
                    'error': 1
                }));
            }

            // send choices to client
            console.log(JSON.stringify(wordList));
            res.send(JSON.stringify(wordList));
        } else {
            console.log('WHAT???? THERE WAS NO DATA!!!');
            res.send(JSON.stringify({
                'error': 2
            }));
        }
    })
};

exports.search0 = function(req, res) {
    console.log('hi');
    wordList = [];
    twitter.get('search/tweets', {
        q: '%22%22',
        lang: 'en',
        count: 100
    }, function(err, data) {
        if (err) {
            console.log('twit error: ' + err);
            res.send(JSON.stringify({
                'error': 2
            }));
        }
        if (data) {
            // find first word
            var index0 = Math.floor(Math.random() * data.statuses.length); // randomize starting tweet
            for (var i = 0; wordList.length < wordCount /*i < data.statuses.length*/ ; i++) {
                var ii = (index0 + i) % data.statuses.length;
                //if (wordList.length <= 4) {
                var status = data.statuses[ii].text.split(' ');
                var newWord = status[0].replace(/\r?\n|\r/g, "")
                console.log(newWord);

                // check if word is a repeat
                var hasWord = function() {
                        for (var iii = 0; iii < wordList.length; iii++) {
                            console.log(wordList[iii].word);
                            if (wordList[iii].word == newWord) {
                                return true;
                            }
                        }
                        return false;
                    }
                    //if not adds to wordList[]
                if (!hasWord()) {
                	//console.log(data.statuses[ii].entities);
                    wordList.push({
                        word: newWord,
                        user: data.statuses[ii].user.screen_name
                    });
                    //nameList.push(data.statuses[ii].user.name);
                    //userList.push(data.statuses[ii].user.screen_name);
                }
                //}
            }
        }
        // send choices to client
        console.log("wordList JSON: " + JSON.stringify(wordList));
        res.send(JSON.stringify(wordList));
    })
};

exports.postTweet = function(req, res) {
    // grab the tweet from the client
    var tweet = JSON.parse(req.body.status);
    twitter.post('statuses/update', {
        status: tweet
    }, function(err, data) {})
};
