var path = require("path");
var twit = require('twit');
var wordList = [];
//var oldWordList = [];
var nameList = [];
var dateList = [];
var userList = [];
var clean = /[\.,-\/\\!"'\[\]?$%\^&\*;:{}=\-_`~()…\r\n\t\f\v]/g
var config = require("config.js");
var twitter = new twit(config);
var emoji = require('emoji');

console.log('hi😎', emoji.unifiedToHTML('hi😎'));

exports.index = function(req, res) {
    res.render('index', {
        title: "~~~~~~THE~LYREBIRD~~~~~~"
    });
};

exports.ping = function(req, res) {
    res.send("pong!", 200);
};

exports.search = function(req, res) {
    //console.log("we got: " + req.body.lastWord);

    // grab the request from the client
    var word = JSON.parse(req.body.lastWord);
    //var word = '';
    //var encodedWord = encodeURIComponent(word.toLowerCase().replace(/[\.,-\/#!"\[\]?$%\^&\*;:{}=\-_`~()\r?\n|\r]/g, ""));
    var encodedWord = encodeURIComponent(word.replace(clean, ''));
    console.log('encoded word: ' + encodedWord)
    var Tlength = JSON.parse(req.body.Tlength);
    //console.log(length);
    var finished = false;

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
            //clear wordList
            //oldWordList = wordList;
            wordList = [];
            nameList = [];
            userList = [];
            //console.log('@@@@@: ' + wordList);

            //var fnd = new RegExp(word,'i');

            // find next word
            //console.log(data.statuses.length);
            var index0 = Math.floor(Math.random() * data.statuses.length);
            for (var i = 0; i < data.statuses.length; i++) {
                var ii = (index0 + i) % data.statuses.length;
                if (wordList.length < 4) {
                    console.log('-->  ' + data.statuses[ii].text);


                    var status = data.statuses[i].text.split(' ');
                    var index = -1;
                    index == status.indexOf(word);
                    for (var iii = 0; iii < status.length - 1; iii++) {
                        if (word.toLowerCase().replace(clean, '') == status[iii].toLowerCase().replace(clean, '')) {
                            index = iii;
                            console.log(index + ' -- ' + status[index] + ' -- ' + status[index+1]);
                        }
                    }

                    if (index > -1 && index < status.length && wordList.indexOf(status[index + 1]) == -1 /*- 1 necissary? */ ) {
                        //var newWord = status[index+1]
                        //console.log(Tlength + status[index+1].length);
                        if (Tlength + status[index + 1].length < 140) {
                            wordList.push(status[index + 1].replace(/\r?\n|\r/g, ""));
                            nameList.push(data.statuses[ii].user.name);
                            userList.push(data.statuses[ii].user.screen_name);
                            //dateList.push(data.statuses[i].created_at);
                        }
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
            res.send(JSON.stringify({
                'choice1': wordList[0],
                'choice2': wordList[1],
                'choice3': wordList[2],
                'choice4': wordList[3],
                'user1': userList[0],
                'user2': userList[1],
                'user3': userList[2],
                'user4': userList[3]
            }));
        } else {
            console.log('WHAT???? THERE WAS NO DATA!!!');
            res.send(JSON.stringify({
                'error': 2
            }));
        }
    })
};

exports.search0 = function(req, res) {
    //console.log(wordList);
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
                var index0 = Math.floor(Math.random() * data.statuses.length);
                for (var i = 0; i < data.statuses.length; i++) {
                    var ii = (index0 + i) % data.statuses.length;
                    if (wordList.length <= 4) {
                        var status = data.statuses[ii].text.split(' ');
                        console.log(status[0]);
                        if (wordList.indexOf(status[0]) == -1) {
                                wordList.push(status[0].replace(/\r?\n|\r/g, ""));
                                nameList.push(data.statuses[ii].user.name);
                                userList.push(data.statuses[ii].user.screen_name);
                            }
                        }
                    }
                }
                // send choices to client
                res.send(JSON.stringify({
                    'choice1': wordList[0],
                    'choice2': wordList[1],
                    'choice3': wordList[2],
                    'choice4': wordList[3],
                    'user1': userList[0],
                    'user2': userList[1],
                    'user3': userList[2],
                    'user4': userList[3]
                }));
            })
    };

    exports.postTweet = function(req, res) {
        // grab the tweet from the client
        var tweet = JSON.parse(req.body.status);
        twitter.post('statuses/update', {
            status: tweet
        }, function(err, data) {
            //console.log(data);
            //console.log(err);
        })
    };
