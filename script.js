// Quiz Questions Data
const quizQuestions = [
    {
        id: 1,
        question: "What is the capital of France?",
        options: ["London", "Berlin", "Paris", "Madrid"],
        correctAnswer: 2,
        explanation: "Paris is the capital and largest city of France."
    },
    {
        id: 2,
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        correctAnswer: 1,
        explanation: "Mars is called the Red Planet due to its reddish appearance from iron oxide on its surface."
    },
    {
        id: 3,
        question: "What is the largest mammal in the world?",
        options: ["African Elephant", "Blue Whale", "Giraffe", "Polar Bear"],
        correctAnswer: 1,
        explanation: "The Blue Whale is the largest animal ever known to have lived on Earth."
    },
    {
        id: 4,
        question: "In which year did World War II end?",
        options: ["1944", "1945", "1946", "1947"],
        correctAnswer: 1,
        explanation: "World War II ended in 1945 with the surrender of Japan in September."
    },
    {
        id: 5,
        question: "What is the chemical symbol for gold?",
        options: ["Go", "Gd", "Au", "Ag"],
        correctAnswer: 2,
        explanation: "Au comes from the Latin word 'aurum' meaning gold."
    }
];

// Quiz State
let currentQuestionIndex = 0;
let score = 0;
let selectedAnswer = null;
let userAnswers = [];
let quizCompleted = false;

// DOM Elements
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const nextBtn = document.getElementById('next-btn');
const currentQuestionSpan = document.getElementById('current-question');
const totalQuestionsSpan = document.getElementById('total-questions');
const progressBar = document.getElementById('progress-bar');
const currentScoreSpan = document.getElementById('current-score');
const questionsAnsweredSpan = document.getElementById('questions-answered');
const quizContent = document.getElementById('quiz-content');
const resultsScreen = document.getElementById('results-screen');
const finalScoreSpan = document.getElementById('final-score');
const scorePercentageSpan = document.getElementById('score-percentage');
const scoreMessageSpan = document.getElementById('score-message');
const reviewContainer = document.getElementById('review-container');
const restartBtn = document.getElementById('restart-btn');
const feedbackModal = document.getElementById('feedback-modal');
const feedbackIcon = document.getElementById('feedback-icon');
const feedbackText = document.getElementById('feedback-text');
const feedbackExplanation = document.getElementById('feedback-explanation');

// Initialize Quiz
function initQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    selectedAnswer = null;
    userAnswers = [];
    quizCompleted = false;
    
    totalQuestionsSpan.textContent = quizQuestions.length;
    updateDisplay();
    showQuestion();
}

// Show Current Question
function showQuestion() {
    const question = quizQuestions[currentQuestionIndex];
    questionText.textContent = question.question;
    
    // Clear previous options
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
    
    // Reset button state
    nextBtn.disabled = true;
    selectedAnswer = null;
}

// Select Answer
function selectAnswer(answerIndex) {
    selectedAnswer = answerIndex;
    
    // Update visual selection
    const options = document.querySelectorAll('.option');
    options.forEach((option, index) => {
        option.classList.remove('selected');
        if (index === answerIndex) {
            option.classList.add('selected');
            option.querySelector('input').checked = true;
        }
    });
    
    // Enable next button
    nextBtn.disabled = false;
}

// Handle Next Question
function handleNext() {
    if (selectedAnswer === null) return;
    
    const question = quizQuestions[currentQuestionIndex];
    const isCorrect = selectedAnswer === question.correctAnswer;
    
    // Store user answer
    userAnswers.push(selectedAnswer);
    
    // Update score
    if (isCorrect) {
        score++;
    }
    
    // Show feedback
    showFeedback(isCorrect, question);
    
    // Update display
    updateDisplay();
    
    // Move to next question or finish quiz
    setTimeout(() => {
        hideFeedback();
        
        if (currentQuestionIndex + 1 < quizQuestions.length) {
            currentQuestionIndex++;
            showQuestion();
        } else {
            finishQuiz();
        }
    }, 2000);
}

// Show Feedback Modal
function showFeedback(isCorrect, question) {
    const options = document.querySelectorAll('.option');
    
    // Highlight correct/incorrect answers
    options.forEach((option, index) => {
        if (index === question.correctAnswer) {
            option.classList.add('correct');
        } else if (index === selectedAnswer && !isCorrect) {
            option.classList.add('incorrect');
        }
    });
    
    // Show modal
    feedbackIcon.textContent = isCorrect ? '✓' : '✗';
    feedbackIcon.className = `feedback-icon ${isCorrect ? 'correct' : 'incorrect'}`;
    feedbackText.textContent = isCorrect ? 'Correct!' : 'Incorrect!';
    feedbackExplanation.textContent = question.explanation;
    
    feedbackModal.classList.remove('hidden');
}

// Hide Feedback Modal
function hideFeedback() {
    feedbackModal.classList.add('hidden');
    
    // Remove highlight classes
    const options = document.querySelectorAll('.option');
    options.forEach(option => {
        option.classList.remove('correct', 'incorrect', 'selected');
    });
}

// Update Display Elements
function updateDisplay() {
    currentQuestionSpan.textContent = currentQuestionIndex + 1;
    const progress = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;
    progressBar.style.width = `${progress}%`;
    currentScoreSpan.textContent = score;
    questionsAnsweredSpan.textContent = currentQuestionIndex + (selectedAnswer !== null ? 1 : 0);
}

// Finish Quiz
function finishQuiz() {
    quizCompleted = true;
    quizContent.classList.add('hidden');
    resultsScreen.classList.remove('hidden');
    
    // Calculate percentage
    const percentage = Math.round((score / quizQuestions.length) * 100);
    
    // Update final score display
    finalScoreSpan.textContent = `${score}/${quizQuestions.length}`;
    scorePercentageSpan.textContent = `${percentage}% Correct`;
    
    // Set score message and color
    let messageClass, message;
    if (percentage >= 80) {
        messageClass = 'score-excellent';
        message = 'Excellent work! 🎉';
    } else if (percentage >= 60) {
        messageClass = 'score-good';
        message = 'Good job! 👍';
    } else {
        messageClass = 'score-needs-improvement';
        message = 'Keep practicing! 💪';
    }
    
    finalScoreSpan.className = `score-number ${messageClass}`;
    scoreMessageSpan.textContent = message;
    scoreMessageSpan.className = `score-message ${messageClass}`;
    
    // Generate review
    generateReview();
}

// Generate Review Section
function generateReview() {
    reviewContainer.innerHTML = '';
    
    quizQuestions.forEach((question, index) => {
        const userAnswer = userAnswers[index];
        const isCorrect = userAnswer === question.correctAnswer;
        
        const reviewItem = document.createElement('div');
        reviewItem.className = 'review-item';
        
        reviewItem.innerHTML = `
            <div class="review-question">${question.question}</div>
            <div class="review-answer ${isCorrect ? 'review-correct' : 'review-incorrect'}">
                Your answer: ${question.options[userAnswer]}
            </div>
            ${!isCorrect ? `<div class="review-answer review-correct">Correct answer: ${question.options[question.correctAnswer]}</div>` : ''}
            <div class="review-explanation">${question.explanation}</div>
        `;
        
        reviewContainer.appendChild(reviewItem);
    });
}

// Restart Quiz
function restartQuiz() {
    resultsScreen.classList.add('hidden');
    quizContent.classList.remove('hidden');
    initQuiz();
}

// Event Listeners
nextBtn.addEventListener('click', handleNext);
restartBtn.addEventListener('click', restartQuiz);

// Close feedback modal when clicking outside
feedbackModal.addEventListener('click', (e) => {
    if (e.target === feedbackModal) {
        hideFeedback();
    }
});

// Initialize the quiz when page loads
document.addEventListener('DOMContentLoaded', initQuiz);
