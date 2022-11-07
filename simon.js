var buttoncolours = ["red", "blue", "yellow", "green"];
      var gamepattern = [];
      var userpattern = [];

      var start = false;
      var level = 0;

      $(document).keypress(function () {
        if (!start) {
          $("#title-2").text("Level  " + level);
          NextSequence();
          start = true;
        }
      });

      function playSound(name) {
        var audio = new Audio("sounds/" + name + ".mp3");
        audio.play();
      }

      function NextSequence() {
        userpattern = [];
        level = level + 1;
        $("#title-2").text("Level " + level);
        var userNumber = Math.floor(Math.random() * 4);
        var usercolour = buttoncolours[userNumber];
        gamepattern.push(usercolour);
        $("#" + usercolour)
          .fadeIn(100)
          .fadeOut(100)
          .fadeIn(100);
        playSound(usercolour);
      }

      $(".btn").click(function () {
        var usercolour = $(this).attr("id");
        userpattern.push(usercolour);

        playSound(usercolour);
        aminatedPress(usercolour);
        checkAnswer(userpattern.length - 1);
      });

      function aminatedPress(curentcolour) {
        $("#" + curentcolour).addClass("pressed");
        setTimeout(function () {
          $("#" + curentcolour).removeClass("pressed");
        }, 100);
      }

      function checkAnswer(currentlevel) {
        if (gamepattern[currentlevel] == userpattern[currentlevel]) {
          if (gamepattern.length == userpattern.length) {
            setTimeout(function () {
              NextSequence();
            }, 1000);
          }
        } else {
          playSound("wrong");
          $("body").addClass("game-over");
          $("#title-2").text("Game Over, Press Any Key to Restart");

          setTimeout(function () {
            $("body").removeClass("game-over");
          }, 200);

          startOver();
        }
      }

      function startOver() {
        level = 0;
        gamepattern = [];
        start = false;
      }