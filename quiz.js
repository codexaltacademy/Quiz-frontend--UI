const questions = [

    {
        question:"Which HTML tag is used to create a hyperlink?",
        options:["<link>","<a>","<href>","<url>"],
        answer:"<a>"
    },
    {
       question:"Which CSS property controls the space inside an element?",
        options:["margin","spacing","padding","gap"],
        answer:"padding" 
    },
    {
       question:"Which CSS property is used to create a flex container?",
        options:["position:flex","display:flex","flex:box","layout:flex"],
        answer:"display:flex" 
    },
    {
       question:"Which value centers items horizontally in a flex container?",
        options:["align-items:center","justify-content:center","text-align:center","place-content:top"],
        answer:"justify-content:center" 
    },
    {
       question:"Which HTML tag is used for the largest heading?",
        options:["<heading>","<head>","<h6>","<h1>"],
        answer:"<h1>" 
    },
    {
       question:"Which CSS property changes the text color?",
        options:["font-color","text-color","color","foreground"],
        answer:"color" 
    },
    {
       question:"Which javascript keyword creates a variable that cannot be reassigned?",
        options:["let","var","const","static"],
        answer:"const" 
    },
    {
       question:"Which CSS property controls the size of text?",
        options:["text-size","font-size","font-scale","size"],
        answer:"font-size" 
    },
    {
       question:"Which method adds an item to the end of a Javascript array?",
        options:["add()","push()","append()","insert()"],
        answer:"push()" 
    },
    {
       question:"Which CSS property rounds the conrners of an element?",
        options:["corner-radius","radius","border-radius","round"],
        answer:"border-radius" 
    }
];

const startScreen = document.getElementById("startScreen");
const quizScreen = document.getElementById("quizScreen");
const resultScreen = document.getElementById("resultScreen");

// buttons

const startBtn =document.getElementById("startBtn");
const nextBtn =document.getElementById("nextBtn");
const restartBtn =document.getElementById("restartBtn");

// quiz screen 

const questionText = document.getElementById("questionText");
const questionNumber = document.getElementById("questionNumber");
const progressBar = document.getElementById("progressBar");
const options = document.getElementById("options");
const scoreText = document.getElementById("score");

// result screen 

const finalScore = document.getElementById("finalScore");
const percentage = document.getElementById("percentage");
const resultMessage = document.getElementById("resultMessage");
const resultTitle = document.getElementById("resultTitle");

let currentQuestion = 0;
let score = 0;

function startQuiz(){
    currentQuestion = 0;
    score = 0;

    startScreen.style.display="none";
    resultScreen.style.display="none";
    quizScreen.style.display = "block";
    
    showQuestions();
}

// Function that will show questions 

function showQuestions(){
    const question = questions[currentQuestion];

    questionNumber.textContent =
        `Question ${currentQuestion +1} of ${questions.length}`;
    scoreText.textContent = `Score:${score}`;

    progressBar.style.width = `${((currentQuestion + 1) / questions.length) * 100}%`;

    questionText.textContent = question.question;

    options.innerHTML = ""
    nextBtn.style.display ="none";

    question.options.forEach(option => {
        const button = document.createElement("button");

        button.className = "option";
        button.textContent = option;

        button.addEventListener("click", () =>{
            selectAnswer(button, option);
        });

        options.appendChild(button);
    });
}

// function for selecting answer 

function selectAnswer(button, selected){
    const question = questions[currentQuestion];

    const buttons = document.querySelectorAll(".option");

    buttons.forEach(button => {
        button.disabled = true;

        if(button.textContent === question.answer){
            button.classList.add("correct");
        }
    });

    if(selected === question.answer){
        score++;
    }else{
        button.classList.add("wrong");
    }

    scoreText.textContent = `Score: ${score}`;
    nextBtn.style.display="block";
}




// function for moving to the next question 

function nextQuestion(){
    currentQuestion++;

    if(currentQuestion < questions.length){
        showQuestions();
    }else{
        showResult();
    }
}

function showResult(){
    quizScreen.style.display="none";
    resultScreen.style.display="block";

    const percent = Math.round(
        (score / questions.length) * 100
    );

    finalScore.textContent = `${score}/${questions.length}`;
    percentage.textContent = `${percent}%`;

    if(percent >= 80){
        resultTitle.textContent = "Great job!";
        resultMessage.textContent = "You have a solid understanding of frontend basics.";
    }
    else if(percent >=50){
        resultTitle.textContent = "Good effort!";
        resultMessage.textContent = "You know the basics.Keep practicing and you'll improve.";
    }else{
        resultTitle.textContent = "Keep learning!";
        resultMessage.textContent = "Don't worry. Try again and see if can beat your score.";
    }
}

startBtn.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", nextQuestion);
restartBtn.addEventListener("click", startQuiz);


