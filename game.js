
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var started = false;

var level = 0;

$(document).keydown(function () {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});


$(".btn").on("click", function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);


    checkAnswer(userClickedPattern.length - 1);

    console.log(userClickedPattern)

});

function nextSequence(params) {

    userClickedPattern = [];
    level++;
    $("#level-title")[0].innerHTML = "Level " + level;
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColours[randomNumber];

    gamePattern.push(randomChosenColor);

    console.log(gamePattern);

    $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);
}


function playSound(name) {
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("." + currentColor).addClass("pressed");

    setTimeout(() => {
        $("." + currentColor)[0].classList.remove("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        console.log("success");

        //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
        if (userClickedPattern.length === gamePattern.length) {

            //5. Call nextSequence() after a 1000 millisecond delay.
            setTimeout(function () {
                nextSequence();
            }, 1000);

        }

    } else {
        $('body').addClass("game-over");
        playSound('wrong');
        $("#level-title").text("Game Over, Press Any Key to Restart");
        setTimeout(function () {
            $('body').removeClass("game-over");
        }, 200);
        console.log("wrong");
        startOver();

    }
}


function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}
