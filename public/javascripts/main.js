$(function () {

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
  $("#tweet").val('\n\n(pick someone\'s word to start your tweet)');
  $("#tweet").css({"color":"grey"});
  $("#count").text("0/140");

  $.get('/search0', function (data) {
      data = JSON.parse(data);

    $("#loading").hide();
      // append data to the DOM
      for (var i=1; i<5; i++){
        choices[i-1] = data['choice' + i];
        $("#choice" + i).text(choices[i-1]);
          $("#choice" + i).attr('title', 'Contributed by @' + data['user' + i]);
        $("#choice" + i).fadeIn();
      }
    });
  }

  function searchTweets(n) {
    $("#choice1").hide();
    $("#choice2").hide();
    $("#choice3").hide();
    $("#choice4").hide();
    $("#loading").fadeIn();
    $("#tweet").css({"color":"black"});

    lastWord = choices[n];
    tweet = (tweet + lastWord + ' ');
    $("#tweet").val(tweet);
    $("#count").text((tweet.length - 1) + '/140');

    $.post('/search', {'lastWord': JSON.stringify(lastWord), 'Tlength': JSON.stringify(tweet.length)}, function (data) {
      data = JSON.parse(data);

      $("#loading").hide();

      // append data to the DOM
      for (var i=1; i<5; i++){
        if (data['choice' + i]) {
          choices[i-1] = data['choice' + i];
          $("#choice" + i).text(choices[i-1]);
          $("#choice" + i).attr('title', 'Contributed by @' + data['user' + i]);
          $("#choice" + i).fadeIn();
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
  $("#choice1").click(function () {
    searchTweets(0)
  });
  $("#choice2").click(function () {
    searchTweets(1)
  });
  $("#choice3").click(function () {
    searchTweets(2)
  });
  $("#choice4").click(function () {
    searchTweets(3)
  });

  $("#postTweet").click(function () {
    $.post('/postTweet', {'status': JSON.stringify(tweet.substr(0, 140))}, function (data) {});
    initialize();
  });


});