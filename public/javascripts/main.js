$(function() {

    $("#huh").tooltipster({
        content: 'about',
        position: 'right'
    });

    $("#restart").tooltipster({
        content: 'restart',
        position: 'left'
    });

    initialize();


    function initialize() {
        $("#tweet").text("");
        $("#count").text("0/140");
        $("#loading").text('loading...');
        $(".choice").remove();
        $(".tooltipster-icon").remove();

        $.get('/search0', function(data) {
            data = JSON.parse(data);
            $("#twitter-widget-0").width(590);

            //$("#tweet").html("");
            $("#loading").hide();

            // append data to the DOM
            for (var i = 0; i < data.length; i++) {
                var newChoice = $("<a href='javascript:void(0)' class='choice'></a>").text(data[i].word);
                var userInfo = $("<a class='toolTip' href='https://twitter.com/" + data[i].user + "' class='toolTip'>by @" + data[i].user + "</a>").css("color", "#666666");
                $("#choices").append(newChoice);
                $(newChoice).tooltipster({
                    position: 'right',
                    content: userInfo,
                    contentAsHTML: true,
                    interactive: true,
                    iconTouch: true
                });
                $("#choices").append("<br class='choice'>");

            }
            $(".choice").minEmoji();

        });
    }




    $("#choices").on("click", ".choice", function() {

        $("#twitter-widget-0").width(590);
        $("#intro").hide();

        var lastWord = $(this).text();
        var tweet = ($("#tweet").text() + lastWord + ' ');

        $(".choice").remove();
        $(".tooltipster-icon").remove();
        $("#loading").fadeIn();
        $("#tweet").html(tweet);
        $("#tweet").minEmoji();
        $("#count").text((tweet.length - 1) + '/140');

        $.post('/search', {
            'lastWord': JSON.stringify(lastWord),
            'twtLength': JSON.stringify(tweet.length)
        }, function(data) {
            data = JSON.parse(data);

            if (data.error == 1) {
                $("#loading").html('<br>Bummer, no results :(<br><br>(You can still post what you\'ve got though.)').css("color", "grey");
            } else if (data.error == 2) {
                $("#loading").html('Uh oh, something messed up!');
            } else {
                $("#loading").hide();
                // append data to the DOM
                for (var i = 0; i < data.length; i++) {
                    //if (data['choice' + i]) {
                    var newChoice = $("<a href='javascript:void(0)' class='choice'></a>").html(data[i].word).attr("title", "by @" + data[i].user);
                    var userInfo = $("<a class='toolTip' href='https://twitter.com/" + data[i].user + "' class='toolTip'>by @" + data[i].user + "</a>").css("color", "#666666");
                    $("#choices").append(newChoice);
                    $(newChoice).tooltipster({
                        position: 'right',
                        content: userInfo,
                        contentAsHTML: true,
                        interactive: true,
                        iconTouch: true
                    });
                    $("#choices").append("<br class='choice'>");
                }
                //}

                $(".choice").minEmoji();
                $(".choice").fadeIn();

            }
        });
    });

    $("#restart").click(function() {
        initialize();
    });

    $("#postTweet").click(function() {
        var tweet = $("#tweet").text();
        $.post('/postTweet', {
            'status': JSON.stringify(tweet)
        }, function(data) {});
        initialize();
    });

});
