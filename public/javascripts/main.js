$(function() {

    var lastWord;
    var tweet;
    var choices;
    var names;
    var dates;

    function initialize() {
        lastWord = '';
        tweet = '';
        choices = ['', '', '', ''];
        $("#choice1").hide();
        $("#choice2").hide();
        $("#choice3").hide();
        $("#choice4").hide();
        $("#tweet").html('<br><br>(pick a word to start your tweet)');
        $("#tweet").css({
            "color": "grey"
        });
        $("#count").text("0/140");
        $("#loading").text('loading...');

        $.get('/search0', function(data) {
            data = JSON.parse(data);

            $("#loading").hide();
            // append data to the DOM
            for (var i = 1; i < 5; i++) {
                choices[i - 1] = data['choice' + i];
                $("#choice" + i).html(choices[i - 1]);
                $("#choice" + i).attr('title', '@' + data['user' + i]);
                $("#choice" + i).minEmoji();
                $("#choice" + i).fadeIn();
            }
        });
    }

    function searchTweets(n) {
        var attempt = 1;
        $("#choice1").hide();
        $("#choice2").hide();
        $("#choice3").hide();
        $("#choice4").hide();
        $("#loading").fadeIn();
        $("#tweet").css({
            "color": "black"
        });

        if (attempt = 1) {
            lastWord = choices[n];
            tweet = (tweet + lastWord + ' ');
            $("#tweet").html(tweet);
            $("#tweet").minEmoji();
            $("#count").text((tweet.length - 1) + '/140');
        }

        $.post('/search', {
            'lastWord': JSON.stringify(lastWord),
            'Tlength': JSON.stringify(tweet.length)
        }, function(data) {
            data = JSON.parse(data);

            if (data['error'] == 1) {
                $("#loading").html('Bummer, no results :(<br><br><br>(You can still post what you\'ve got though.)');
            } else if (data['error'] == 2) {
                $("#loading").html('Uh oh, something messed up!');
            } else {
                $("#loading").hide();
                // append data to the DOM
                for (var i = 1; i < 5; i++) {
                    if (data['choice' + i]) {
                        choices[i - 1] = data['choice' + i];
                        $("#choice" + i).html(choices[i - 1]);
                        $("#choice" + i).attr('title', '@' + data['user' + i]);
                        $("#choice" + i).minEmoji();
                        $("#choice" + i).fadeIn();
                    }
                }
                /*var now = new Date();
        var date = Date.parse(data['date' + i]);
        var timeSince = (now - date)/100;
        var minSince = Math.floor(timeSince/60);
        var SecSince = timeSince - (minSince * 60);
        $("#choice" + i).attr('title', 'Contributed by \'' + data['name' + i] + '\' ' + minSince + 'minutes and ' + SecSince + ' seconds ago');*/
            }
        });
    }

    initialize();
    $("#choice1").tooltip();
    $("#choice2").tooltip();
    $("#choice3").tooltip();
    $("#choice4").tooltip();

    // on click, run the search function
    $("#choice1").click(function() {
        searchTweets(0)
    });
    $("#choice2").click(function() {
        searchTweets(1)
    });
    $("#choice3").click(function() {
        searchTweets(2)
    });
    $("#choice4").click(function() {
        searchTweets(3)
    });

    $("#postTweet").click(function() {
        $.post('/postTweet', {
            'status': JSON.stringify(tweet.substr(0, 140))
        }, function(data) {});
        initialize();
    });


});
