var hwords = ["superman", "batman", "aquaman", "spiderman", "daredevil", "hellboy", "wolverine", "starlord"]
var chosenLetters = [];
var currentWord = [];
var spaces = [];
var hangman;
var currentLetter;
var guesses = 6;
var index = 0;

function startGame() {
    hangman = hwords[Math.floor(Math.random() * hwords.length)];

    for (var i = 0; i < hangman.length; i++) {
        currentWord.push(hangman.charAt(i));
    };

    for (var i = 0; i < hangman.length; i++) {
        spaces.push("_");
    };
    console.log(hangman);
    console.log(currentWord);

    document.querySelector("#word").innerHTML = spaces.join(" ");
    document.querySelector("#guessesRemaining").innerHTML = "Guesses: " + guesses;
}

document.onkeyup = startGame() 

    function compareLetters(l, array) {
        var match = "n";
        console.log(match);
        array.forEach(function (element) {
            if (l === element) {
                match = "y";
                console.log(match);
            }
        })
        return match;
        console.log(chosenLetters);
    };

    function compareWord(l, array) {
        var i = 0;
        var match = "n";
        array.forEach(function (element) {
                if (l === element) {
                    spaces[i] = l;
                    match = "y";
            }
            i++;
        });
        return match;
    }

    document.onkeyup = function (event) {
        currentLetter = event.key;
        
        document.querySelector("#prompt").innerHTML = "Choose another letter!";

        var usedLetter = compareLetters(currentLetter, chosenLetters);

        if (usedLetter === "y") {
            alert("You already tried that letter!");
        } else {
            chosenLetters.push(currentLetter);
            document.querySelector("#guesses").innerHTML = "Guessed letters: " + chosenLetters;
        };

        var match = compareWord(currentLetter, currentWord);

        if (match === "y") {
            document.querySelector("#word").innerHTML = spaces.join(" ");
        } else {
            guesses = guesses--;
            document.querySelector("#guessesRemaining").innerHTML = "Guesses: " + guesses;
         };

        var gameState = compareLetters("_", spaces);

        if (gameState === "n") {
            document.querySelector("#word").innerHTML = "You won with " + guesses + " guesses remaining!";
            document.querySelector("#prompt").innerHTML = "Press any key to try again!";
        } else if (guesses === 0) {
            document.querySelector("#word").innerHTML = "You lost!";
            document.querySelector("#prompt").innerHTML = "Press any key to try again!";
        }

    }
