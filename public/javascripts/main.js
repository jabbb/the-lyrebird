$(function () {

  // initialize
  var lastWord = '';
  var tweet = '';
  var choices = ['', '', '', ''];
    $("#choice1").hide();
    $("#choice2").hide();
    $("#choice3").hide();
    $("#choice4").hide();
  $.get('/search0', function (data) {
      data = JSON.parse(data);

    $("#loading").hide();
      // append data to the DOM
      for (var i=1; i<5; i++){
      choices[i-1] = data['choice' + i];
      $("#choice" + i).text(choices[i-1]);
      $("#choice" + i).fadeIn();
      }
    });

  function searchTweets(n) {
    $("#choice1").hide();
    $("#choice2").hide();
    $("#choice3").hide();
    $("#choice4").hide();
    $("#loading").fadeIn();

    lastWord = choices[n];
    tweet = (tweet + lastWord + ' ');
    $("#tweet").val( tweet );

    $.post('/search', {'lastWord': JSON.stringify(lastWord)}, function (data) {
      data = JSON.parse(data);

      $("#loading").hide();

      // append data to the DOM
      for (var i=1; i<5; i++){
        if (data['choice' + i]) {
        choices[i-1] = data['choice' + i];
        $("#choice" + i).text(choices[i-1]);
        $("#choice" + i).fadeIn();
        }
      }
    });
  }

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
    $.post('/postTweet', {'status': JSON.stringify(tweet)}, function (data) {
      window.open('https://twitter.com/retweetwee');
    });
  });


});