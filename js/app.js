import { questions } from "./data.js";

const helpers = {
    letters: 'abcdefghijklmnoprstuvwxyz'
}

const quiz = {
    
    hits: 0,
    currentQuestion: 0,

    getCurrentQuestion() {
        return questions[this.currentQuestion];
    },

    nextQuestion() {
        this.currentQuestion = this.currentQuestion + 1;
    },

    restart() {
        this.hits = 0;
        this.currentQuestion = 0;
    },

    calculateResult() {
        return Math.round((this.hits / questions.length) * 100);
    }
}

const newQuestion = () => {
    const question = quiz.getCurrentQuestion();
    const answers = question.answers;

    document.querySelector('.question-title').innerText = question.question;
    document.querySelector('.answers').innerText = null;

    answers.forEach((answer, index) => {
        const answerElement = document.querySelector('.models .answer').cloneNode(true);
        answerElement.querySelector('.letter').innerText = helpers.letters[index].toUpperCase();
        answerElement.querySelector('.value').innerText = answer.content;
        
        answerElement.dataset.id = answer.id;
        answerElement.addEventListener('click', checkAnswer); 
            document.querySelector('.answers').appendChild(answerElement);
    });
}

const checkAnswer = (e) =>{
    
    const currentId = e.currentTarget.dataset.id;

    for(const answer of quiz.getCurrentQuestion().answers) {
     
        if(answer.id == currentId && answer.correct == true){
            quiz.hits += 1;
        }
    }
    nextQuestion();
    progressBar();
}

const nextQuestion = () => {
    
    quiz.nextQuestion();

    if(quiz.getCurrentQuestion()){
        newQuestion();
    } else{
        showResult();
    }
}

const showResult = () => {
    
    const percentResult = quiz.calculateResult();
    
    let msg = null;
    let color = null;

    if(percentResult == 100){
        msg = "Mestre!! Zerou o Quiz!";
        color = '#4bd715';
    
    } else if(percentResult >= 90){
        msg = "Excelente!";
        color = '#c1dc10';
    
    } else if(percentResult >= 70){
        msg = "Muito Bom!";
        color = '#ff0e0e';
    
    } else if(percentResult >= 40){
        msg = "Bom! Quase Lá";
        color = '#dccb22';
    
    } else if(percentResult >= 10){
        msg = "Humm! Estude um Pouco Mais";
        color = '#ff8a00';
    } else {
        msg = "Não Foi Dessa Vez!";
        color = '#ff0e0e';
    }

    const resultScreen = document.querySelector('.result-screen');
    resultScreen.querySelector('.msg').innerText = msg;
    resultScreen.querySelector('.percent').style.color = color;
    resultScreen.querySelector('.percent span').innerText = percentResult;
    resultScreen.querySelector('#hits').innerText = quiz.hits;
    resultScreen.querySelector('#num-questions').innerText = questions.length;
    resultScreen.style.display = 'block';
}

const restartQuiz = () => {
    document.querySelector('.result-screen').style.display = 'none';
    document.querySelector('.progress-percent').style.width = `3%`;
    quiz.restart();
    newQuestion();
}

const progressBar = () => {
    const percentage = ((quiz.currentQuestion) / questions.length) * 100
    document.querySelector('.progress-percent').style.width = `${percentage}%`;
}

const restartButton = document.querySelector('#restart');
if(restartButton){
    restartButton.addEventListener('click', restartQuiz);
}

newQuestion();
