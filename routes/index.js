var path = require("path");
var twit = require('twit');
var wordList = [];
var oldWordList = [];
//var config = require("config.js")

// establish the twitter config (grab your keys at dev.twitter.com)
var twitter = new twit({
	consumer_key: 'UYbvKeulY30ohy4eozz32cUxE',
	consumer_secret: 'IZqvvLRoctjPWnpnOwwl31sf39Wq0pcrfy4VnnTjbbATeJkiOr',
	access_token: '2426354677-JeSqmxSLSWASBUXQpYYTpOJlJk1HrRjR82VTIFG',
	access_token_secret: 'Izq6qdwY9rlf1a0EgszxWjbd5WkQuoAYW9U1leE1IJ8aK'
});

exports.index = function(req, res){
  res.render('index', { title: "~~~~~~THE~LYREBIRD~~~~~~"});
};

exports.ping = function(req, res){
  res.send("pong!", 200);
};

exports.search = function(req, res) {
	//console.log("we got: " + req.body.lastWord);

	var dayRange = function(m){
		var today = new Date();
		return('' + today.getFullYear() + '-' + (today.getMonth() - m) + '-' + (today.getDate()));
	}

	// grab the request from the client
	var word = JSON.parse(req.body.lastWord);
	var Tlength = JSON.parse(req.body.Tlength);
	//console.log(length);

	twitter.get('search/tweets', {q: '%22' + word.toLowerCase().replace(/[\.,-\/#!"?$%\^&\*;:{}=\-_`~()]/g,"") + '%22', lang: 'en', /*result_type: 'popular',*/ /*since: dayRange(1), */count: 100}, function(err, data) {
			//console.log(data.statuses.text);
			if (err) {
				console.log('twit error: ' + err);
			}
			if (data) {
			//clear wordList
			oldWordList = wordList;
			wordList = [];
			console.log('@@@@@: ' + wordList);

				//var fnd = new RegExp(word,'i');

			// find next word
			console.log(data.statuses.length);
			for (var i = 0; i < data.statuses.length; i++) {
				if (wordList.length < 4) {
	        		var status = data.statuses[i].text.split(' ');
        			var index = -1;
        			for (var ii = 0; ii < status.length-1; ii++) {
        				if (word.toLowerCase().replace(/[\.,-\/#!"?$%\^&\*;:{}=\-_`~()]/g,"") == status[ii].toLowerCase().replace(/[\.,-\/#!"?$%\^&\*;:{}=\-_`~()]/g,"")) {
        					index = ii;
        				}
        			}

				//var word2 = fnd.exec(data.statuses[i].text.replace(/([.?*+^$[\]\\(){}|-])/g, ""));
	        	//var index = status.indexOf(word2);

	        	//console.log(i + ' --------------------');
	        	//console.log('status: ' + data.statuses[i].text);
	        	//console.log('index: ' + index);
	        	//console.log('words: ' + status[index] + ' ' + status[index+1]);

	        		if (index > -1 && index < status.length /*- 1 necissary? */) {
	            	//var newWord = status[index+1]
	            	//console.log(Tlength + status[index+1].length);
	            		if (check(status[index+1]) != '' && Tlength + status[index+1].length < 140) {
	            			wordList.push(status[index+1].replace(/\r?\n|\r/g,""));
	            		}
	        		}
	        	}
	    	}
	    	//var oldWordList = wordList
	    	if (wordList == oldWordList){
	    		console.log('it found the same words!');
	    	}
	  		// send choices to client
			//if (wordList.length >= 4) {
				console.log('^^|' + wordList + '|^^');
				res.end(JSON.stringify({
	  				'choice1': wordList[0],
	  				'choice2': wordList[1],
	  				'choice3': wordList[2],
	  				'choice4': wordList[3]
  				}))
			//} else {
				//console.log('too short: ' + wordList.length);
			//}
		} else {
			console.log('WHAT???? THERE WAS NO DATA!!!');
		}
	})
};

exports.search0 = function(req, res) {
	//console.log(wordList);
	wordList = [];
	var rs = startWords[Math.floor((Math.random() * startWords.length))];
	//console.log(rs);
	twitter.get('search/tweets', {q:rs, lang:'en', result_type:'popular', count:10}, function(err, data) {
		if (err){
			console.log('twit error: ' + err);
		}
		// find first word
		for (var i = 0; i < data.statuses.length; i++) {
        	var status = data.statuses[i].text.split(' ');
        	if (check(status[0]) != '') {
	            wordList.push(status[0].replace(/\r?\n|\r/g,""));
        	}
    	}
  		// send choices to client
  		res.send(JSON.stringify({
  			'choice1': wordList[0],
  			'choice2': wordList[1],
  			'choice3': wordList[2],
  			'choice4': wordList[3]
  		}));
	})
};

exports.postTweet = function(req, res) {
	console.log('postpostpost1!!!')

	// grab the tweet from the client
	var tweet = JSON.parse(req.body.status);

	twitter.post('statuses/update', { status: tweet }, function(err, data){
		console.log(data);
		console.log(err);
	})
};

var startWords = [
'sun',
'wonder',
'mac',
'ago',
'luck',
'o',
'rock',
'sick',
'black',
'real',
'yet',
'which',
'obama',
'awesome',
'little',
'haha',
'having',
'thank',
'pretty',
'game',
'someone',
'school',
'those',
'snow',
'twurl.nl',
'gonna',
'hey',
'7',
'many',
'start',
'wait',
'while',
'google',
'finally',
'everyone',
'try',
'30',
'god',
'weekend',
'most',
'iphone',
'stuff',
'around',
'music',
'looks',
'may',
'thought',
'keep',
'yet',
'reading',
'must',
'which',
'same',
'real',
'follow',
'bit',
'hours',
'might',
'actually',
'online',
'job'
];

var badWords = [' '];

var check = function(newWord) {
	//console.log("what?" + ' ' + twt +' ' + wordList);
	if (badWords.indexOf(newWord) == -1 && wordList.indexOf(newWord) == -1) {
		//console.log('hi'+ wordList.indexOf(twt));
		return newWord;
	} else {
		//console.log('bye');
		return "";
	}
}























