var prog_langs = [
    "python",
    "javascript",
    "mongodb",
    "json",
    "java",
    "html",
    "css",
    "c",
    "csharp",
    "golang",
    "kotlin",
    "php",
    "sql",
    "ruby"
]
var delayInMilliseconds = 1000;

let answer = '';
let maxWrong = 6;
let mistakes = 0;
let guessed = [];
let wordStatus = null;


function randomWord() {
    answer = prog_langs[Math.floor(Math.random() * prog_langs.length)];
    //alert(answer);
}

function generateButtons() {
    let buttonsHTML = 'abcdefghijklmnopqrstuvwxyz'.split('').map(
        letter =>
            `
        <button
            class="btn btn-lg btn-primary m-2"
            id='` + letter + `'
            onClick="handleGuess('` + letter + `')"
        >
            ` + letter + `
        </button>
        `).join('');

    document.getElementById('keyboard').innerHTML = buttonsHTML;

}

function handleGuess(chosenLetter) {
    guessed.indexOf(chosenLetter) == -1 ? guessed.push(chosenLetter) : null;
    document.getElementById(chosenLetter).setAttribute('disabled', true);

    if (answer.indexOf(chosenLetter) >= 0) {
        guessedWord();
        isGameWon();
    }
    else {
        updateMistakes();
        updatePic();
        hint(); //TODO
        isGameLost();
    }
}

// function hint() { TODO....
//     if (mistakes == 3) {
//         wordstatus


//         // setTimeout(function () {
//         //     alert("Hint: ");
//         // }, 500);
//     }
// }

function isGameWon() {
    if (wordStatus === answer) {
        document.getElementById('wordspotlight').innerHTML = answer;
        setTimeout(function () {
            alert("Good Job!  You Won!!");
        }, 500);
    }
}

function isGameLost() {
    if (mistakes === maxWrong) {
        document.getElementById('wordspotlight').innerHTML = 'The answer was: ' + answer;
        setTimeout(function () {
            alert("Try Again!  'You have been Hanged!!");
        }, 500);
    }
}

function updatePic() {
    document.getElementById('hangmanPic').src =
        './images/' + mistakes + '.jpg';
}


function updateMistakes() {
    mistakes++;
    document.getElementById('Mistakes').innerHTML = mistakes;
}

function guessedWord() {
    wordStatus = answer.split('').map(letter =>
        (guessed.indexOf(letter) >= 0 ? letter : " _ ")).join('');
    document.getElementById('wordspotlight').innerHTML = wordStatus;
}

function reset() {
    mistakes = 0;
    guessed = [];
    document.getElementById('hangmanPic').src = './images/0.jpg';
    run();
}

document.getElementById('maxWrong'), innerHTML = maxWrong;

function run() {
    randomWord();
    generateButtons();
    guessedWord();
}

run();
