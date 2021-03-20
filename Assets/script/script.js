// questions array
var quizQuestion = [{
    question: "All public repositories on GITHUB are open source?",
    choices: ["True", "False"],
    answer: "True"
},
{
    question: "Arrays in JavaScript can be used to store?",
    choices: ["Numbers and strings", "Other arrays", "Booleans", "All of the above"],
    answer: "All of the above"
},
{
    question: "String values must be enclosed within commas to be assigned as a variable?",
    choices: ["True", "False"],
    answer: "False"
},
{
    question: "What prints things to the console in javascript?",
    choices: ["Terminal.console", "Bash.log", "Console.log", "Alert.log"],
    answer: "Console.log"
},
{
    question: "Which is not a data type?",
    choices: ["Strings", "Alerts", "Booleans", "Numbers"],
    answer: "Alerts"
}
];

var score = 0;
var currentQuestion = -1;
var timeLeft = 0;
var timer;

// starts quiz
function start() {

    timeLeft = 75;
    document.getElementById("timeLeft").innerHTML = timeLeft;
    
    timer = setInterval(function() {
        timeLeft--;
        document.getElementById("timeLeft").innerHTML = timeLeft;
        //proceed to end the game function when timer is below 0 at any time
        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
    
    next();
    };

// next question
function next() {
    currentQuestion++;
    
    if (currentQuestion > quizQuestion.length - 1) {
        endGame();
        return;
    }   
    
    var quizContent = '<h2>' + quizQuestion[currentQuestion].question + '</h2>';
    
    for (var buttonLoop = 0; buttonLoop < quizQuestion[currentQuestion].choices.length; buttonLoop++) {
        var buttonCode = "<button onclick=\"[ANS]\">[CHOICE]</button>"; 
        buttonCode = buttonCode.replace("[CHOICE]", quizQuestion[currentQuestion].choices[buttonLoop]);
        if (quizQuestion[currentQuestion].choices[buttonLoop] == quizQuestion[currentQuestion].answer) {
            buttonCode = buttonCode.replace("[ANS]", "correctAnswer()");
        } else {
            buttonCode = buttonCode.replace("[ANS]", "incorrectAnswer()");
        }
        quizContent += buttonCode
    }
    
    
    document.getElementById("quizBody").innerHTML = quizContent;
    };

// sets score
function setScore() {
localStorage.setItem("highscore", score);
localStorage.setItem("highscoreName",  document.getElementById('name').value);
getScore();
};

// retrieves score from local storage
function getScore() {
var quizContent = `
<h2>` + localStorage.getItem("highscoreName") + `'s highscore is:</h2>
<h1>` + localStorage.getItem("highscore") + `</h1><br> 
<button onclick="clearScore()">Clear score!</button><button onclick="resetQuiz()">Play Again!</button>
`;

document.getElementById("quizBody").innerHTML = quizContent;
};

// removes score from local storage
function clearScore() {
localStorage.removeItem("highscore");
localStorage.removeItem("highscoreName");

resetQuiz();
};

// if question is wrong
function incorrectAnswer() {
timeLeft -= 15; 
document.getElementById("verify").innerHTML = "Incorrect!";
document.getElementById("verify").className = "card-footer incorrect"
next();
};

// if question is correct
function correctAnswer() {
score += 20;
document.getElementById("verify").innerHTML = "Correct!";
document.getElementById("verify").className = "card-footer correct"
next();
};

// resets quiz to beginning
function resetQuiz() {
    clearInterval(timer);
    score = 0;
    currentQuestion = -1;
    timeLeft = 0;
    timer = null;
    
    document.getElementById("timeLeft").innerHTML = timeLeft;
    
    var quizContent = `
                <h1>Coding Quiz!</h1>
                 <h3>Click to play!</h3>
    <button onclick="start()">Start!</button>`;
    
    document.getElementById("quizBody").innerHTML = quizContent;
    };

function endGame() {
    clearInterval(timer);
    
    var quizContent = `
                            <h2>Game over!</h2>
                    <h3>You got a ` + score +  ` /100!</h3>
        <h3>That means you got ` + score / 20 +  ` quizQuestion correct!</h3>
    <input type="text" id="name" placeholder="Initials"> 
                <button onclick="setScore()">Set score!</button>`;
    
    document.getElementById("quizBody").innerHTML = quizContent;
    document.getElementById("verify").innerHTML = "";
    };