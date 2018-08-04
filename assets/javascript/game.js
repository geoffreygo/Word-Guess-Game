var heroes = ["superman", "batman", "aquaman", "spiderman", "daredevil", "hellboy", "wolverine", "starlord", "deadpool", "robin", "hawkeye", "rorschach", "cyborg", "cyclops", "iceman", "colossus", "nightcrawler", "magneto", "gambit", "psylocke", "antman", "havok", "vision", "quicksilver", "powerman", "shehulk", "hawkman", "supergirl", "mystique", "punisher", "dazzler"]
var gamesWon = 0;
var started = false;
// choose a random word from the heroes array
var hangman = heroes[Math.floor(Math.random() * heroes.length)];
// guesses remaining
var guesses = 6;
// array to store letters user has guessed this game
var chosenLetters = [];
// array to store underlines representing unguessed letters
var spaces = [];
// array to store letters of random word from heroes array
var currentWord = [];

document.querySelector("#hangman").innerHTML = "<img src='assets/images/h6.png' alt='hangman'/>"

function startGame() {
    hangman = heroes[Math.floor(Math.random() * heroes.length)];
    guesses = 6;
    chosenLetters = [];
    spaces = [];
    currentWord = [];

    // place the letters of the random word into the currentWord array
    for (var i = 0; i < hangman.length; i++) {
        currentWord.push(hangman.charAt(i));
    };

    // create an array the same length as the random word and put an underline in each member
    for (var i = 0; i < hangman.length; i++) {
        spaces.push("_");
    };

    // new values for the html sections
    document.querySelector("#word").innerHTML = spaces.join(" ");
    document.querySelector("#guesses").innerHTML = "Guessed letters: " + chosenLetters;
    document.querySelector("#guessesRemaining").innerHTML = "Guesses: " + guesses;
    document.querySelector("#prompt").innerHTML = "Choose a letter!";
    document.querySelector("#hangman").innerHTML = "<img src='assets/images/h6.png' alt='hangman'/>"

}

// Function accepts a letter and an array and checks to see if the letter is in the array.
// It returns "y" if there is a match, otherwise "n".
function compareLetters(l, array) {
    var match = "n";
    array.forEach(function (element) {
        if (l === element) {
            match = "y";
        }
    })
    return match;
};

// Function accepts a letter and an array and checks each member of the array to see if there
// is a match. If there is, it replaces the underline in the spaces array that is at the same
// index with the letter. It then returns "y" if it made replacements, or "n" if it hasn't.
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
    // if the game hasn't started yet, onkeyup will run the startGame function, if the
    // game has started, it uses the onkeyup events in the game
    if (!started) {
        startGame();
        started = true;
    } else {
    // put the typed letter in a variable    
     var currentLetter = event.key;

    document.querySelector("#prompt").innerHTML = "Choose another letter!";
    // Compare the typed letter to the array with previously typed letters to see if it has
    // already been selected.
    var usedLetter = compareLetters(currentLetter, chosenLetters);
    // Send typed letter and array with letters from random word to replace underlines
    // in spaces array with correct letters if there are matches
    var match = compareWord(currentLetter, currentWord);
    // if a typed letter has already been typed before, alert the user and set match to
    // "y" so that guesses won't decrement
    if (usedLetter === "y") {
        alert("You already tried that letter!");
        match = "y";
    // if not, put the letter in the array of previously typed letters and update the html
    // with the new typed letter
    } else {
        chosenLetters.push(currentLetter);
        document.querySelector("#guesses").innerHTML = "Guessed letters: " + chosenLetters;
    };
    // If the typed letter matched letters in the chosen word, rewrite the html with the
    // array of spaces with the newly matched letters in it
    if (match === "y") {
        document.querySelector("#word").innerHTML = spaces.join(" ");
    // It the typed letter does not match, decrement the number of guesses and update the
    // hangman picture with another body part
    } else {
        guesses = --guesses;
        document.querySelector("#hangman").innerHTML = "<img src='assets/images/h" + guesses + ".png' alt='hangman'/>";
        document.querySelector("#guessesRemaining").innerHTML = "Guesses: " + guesses;
    };
    // Check the spaces array to see if there are any underlines left in it
    var gameState = compareLetters("_", spaces);
    // If there are no underlines left, it means the user has won
    if (gameState === "n") {
        gamesWon++;
        if (guesses > 1) {
            document.querySelector("#word").innerHTML = "You won with " + guesses + " guesses remaining!";
        } else {
            document.querySelector("#word").innerHTML = "You won with " + guesses + " guess remaining!";
        }
        if (gamesWon === 0 || gamesWon < 2) {
            document.querySelector("#prompt").innerHTML = "You won! You've won " + gamesWon + " time!";
        } else {
            document.querySelector("#prompt").innerHTML = "You won! You've won " + gamesWon + " times!";
        }
        gameState = "y";
        setTimeout(startGame, 4000);
    } else if (guesses === 0) {
        document.querySelector("#word").innerHTML = "You lost!";
        document.querySelector("#prompt").innerHTML = "Try again!";
        gameState = "y";
        setTimeout(startGame, 4000);
    }

}
}
