// Define Quiz Questions
const quizQuestions = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Rome"],
        correctAnswer: 2
    },
    {
        question: "Which planet is known as the 'Red Planet'?",
        options: ["Mars", "Jupiter", "Venus", "Saturn"],
        correctAnswer: 0
    },
    {
        question: "What is the largest mammal in the world?",
        options: ["African Elephant", "Blue Whale", "Giraffe", "Polar Bear"],
        correctAnswer: 1
    }
];

// Get DOM Elements
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const nextBtn = document.getElementById('next-btn');
const scoreSpan = document.getElementById('score');
const totalQuestionsSpan = document.getElementById('total-questions');
const resultContainer = document.getElementById('result-container');
const finalScoreSpan = document.getElementById('final-score');

// Define Variables
let currentQuestionIndex = 0;
let score = 0;
let selectedAnswer = null;
let userAnswers = [];
let quizCompleted = false;

// Initialize Quiz
function initQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    selectedAnswer = null;
    userAnswers = [];
    quizCompleted = false;
    
    // Make sure elements exist before updating
    if (totalQuestionsSpan) {
        totalQuestionsSpan.textContent = quizQuestions.length;
    }
    
    updateDisplay();
    showQuestion();
}

// Show Current Question
function showQuestion() {
    if (!quizQuestions || quizQuestions.length === 0) {
        console.error('No quiz questions available');
        return;
    }
    
    if (currentQuestionIndex >= quizQuestions.length) {
        console.error('Question index out of bounds');
        return;
    }
    
    const question = quizQuestions[currentQuestionIndex];
    
    if (questionText) {
        questionText.textContent = question.question;
    }
    
    // Clear previous options
    if (optionsContainer) {
        optionsContainer.innerHTML = '';
        
        // Create option elements
        question.options.forEach((option, index) => {
            const optionDiv = document.createElement('div');
            optionDiv.className = 'option';
            optionDiv.onclick = () => selectAnswer(index);
            
            optionDiv.innerHTML = `
                <input type="radio" name="answer" value="${index}" id="option-${index}">
                <label for="option-${index}">${option}</label>
            `;
            
            optionsContainer.appendChild(optionDiv);
        });
    }
    
    // Reset button state
    if (nextBtn) {
        nextBtn.disabled = true;
    }
    selectedAnswer = null;
}

// Select Answer
function selectAnswer(answerIndex) {
    selectedAnswer = answerIndex;
    userAnswers[currentQuestionIndex] = answerIndex;
    if (nextBtn) {
        nextBtn.disabled = false;
    }
}

// Go to Next Question
function nextQuestion() {
    if (selectedAnswer === null) {
        alert("Please select an answer!");
        return;
    }

    // Check if answer is correct
    if (selectedAnswer === quizQuestions[currentQuestionIndex].correctAnswer) {
        score++;
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < quizQuestions.length) {
        showQuestion();
    } else {
        endQuiz();
    }

    updateDisplay();
}

// Update Display
function updateDisplay() {
    if (scoreSpan) {
        scoreSpan.textContent = score;
    }
}

// End Quiz
function endQuiz() {
    quizCompleted = true;
    if (resultContainer) {
        resultContainer.style.display = 'block';
    }
    if (finalScoreSpan) {
        finalScoreSpan.textContent = score;
    }
    if (questionText) {
         questionText.style.display = 'none';
    }
    if (optionsContainer) {
        optionsContainer.style.display = 'none';
    }
    if (nextBtn) {
        nextBtn.style.display = 'none';
    }
}

// Initialize the quiz when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing quiz...');
    
    // Small delay to ensure all elements are ready
    setTimeout(() => {
        initQuiz();
    }, 100);
});

// Fallback initialization
window.addEventListener('load', function() {
    if (questionText && questionText.textContent === 'Loading question...') {
        console.log('Fallback initialization...');
        initQuiz();
    }
});
