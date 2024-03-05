// Adding timer first
var timerElement = document.querySelector("#timer-count");
var startButton = document.querySelector("#start-btn");
var questionsContainerElement = document.getElementById("questions-container");
var questionsElement = document.getElementById('question');
var answerButtonElement = document.getElementById('answer-buttons');
var initialsInput = document.getElementById('initials');
var submitButton = document.getElementById('submit-btn');
var highScoresContainer = document.getElementById('high-scores-container');

var timer;
var timerCount = 60;
var currentQuestionIndex = 0;
var score = 0;
var highScores = JSON.parse(localStorage.getItem("highScores")) || [];

function startTimer() {
    timer = setInterval(function () {
        timerCount--;
        timerElement.textContent = timerCount;
        if (timerCount === 0) {
            clearInterval(timer);
            console.log("Time is up!");
            endGame();
        }
    }, 1000);
}

function startGame() {
    startTimer();
    console.log("started");
    startButton.classList.add('hide');
    questionsContainerElement.classList.remove("hide");
    setNextQuestion();
}

function displayFeedback(message) {
    var feedbackElement = document.getElementById('feedback');
    feedbackElement.textContent = message;
}

function setNextQuestion() {
    if (currentQuestionIndex < questions.length) {
        var currentQuestion = questions[currentQuestionIndex];
        questionsElement.innerText = currentQuestion.question;

        answerButtonElement.innerHTML = '';

        currentQuestion.answers.forEach(function (answer) {
            var button = document.createElement('button');
            button.innerText = answer.text;
            button.classList.add('answer-btn');
            button.addEventListener('click', function () {
                if (answer.correct) {
                    console.log("Correct!");
                    score++;
                    console.log("Current Score: " + score);
                } else {
                    console.log("Incorrect!");
                    timerCount -= 10;
                    displayFeedback("Wrong!");
                }

                currentQuestionIndex++;
                setNextQuestion();
            });
            answerButtonElement.appendChild(button);
        });
    } else {
        endGame();
    }
}

function endGame() {
    clearInterval(timer);
    console.log("Game Over!");
    console.log("Final Score: " + score);

    highScoresContainer.classList.remove('hide'); // Show the high scores container

    var highScoresList = document.getElementById('high-scores-list');
    highScores.forEach(function (highScore) {
        var li = document.createElement('li');
        li.textContent = highScore.initials + ": " + highScore.score;
        highScoresList.appendChild(li);
    });
}

function submitScore() {
    var initials = initialsInput.value.trim().toUpperCase();

    if (initials === "") {
        alert("Please enter your initials.");
        return;
    }

    var newScore = { initials: initials, score: score };
    highScores.push(newScore);
    highScores.sort(function (a, b) {
        return b.score - a.score;
    });

    highScores = highScores.slice(0, 5);

    localStorage.setItem("highScores", JSON.stringify(highScores));

    endGame();
}

var questions = [
    {
        question: 'Using a # is to define what?',
        answers: [
            { text: 'ID', correct: true },
            { text: 'class', correct: false },
            { text: 'string', correct: false },
            { text: 'boolean', correct: false }
        ]
    },
    {
        question: 'Arrays in Javascript can be used to store?',
        answers: [
            { text: 'numbers and strings', correct: false },
            { text: 'other arrays', correct: false },
            { text: 'Booleans', correct: false },
            { text: 'All of the above', correct: true }
        ]
    },
    {
        question: 'Which programming language is known for use in web development?',
        answers: [
            { text: 'Bootstrap', correct: false },
            { text: 'HTML', correct: false },
            { text: 'CSS', correct: false },
            { text: 'JavaScript', correct: true }
        ]
    },
    { 
        question: 'Commonly used data types do not include?',
        answers: [
            { text: 'Strings', correct: false },
            { text: 'Booleans', correct: true },
            { text: 'Alerts', correct: false },
            { text: 'Numbers', correct: false }
        ]
    }
];

startButton.addEventListener("click", startGame);

document.addEventListener("keydown", function (event) {
    if (timerCount === 0) {
        return;
    }
});
