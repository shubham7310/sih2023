
const hourHand = document.querySelector('.hour-hand');
const minuteHand = document.querySelector('.minute-hand');
const feedback = document.querySelector('.feedback');
const options = document.querySelector('.options');
const nextQuestionButton = document.querySelector('.next-question');

let currentQuestion = 0;

// Define an array of questions
const questions = [
    { hour: 12, minute: 0 },
    { hour: 3, minute: 45 },
    { hour: 9, minute: 30 },
    { hour: 6, minute: 15 },
    { hour: 1, minute: 50 },
       
];

// Function to set the clock hands to a specific time
function setClockHands(time) {
    const hourDegrees = (time.hour % 12) * 30 + (time.minute / 2); // Each hour is 30 degrees
    const minuteDegrees = time.minute * 6; // Each minute is 6 degrees
    
    hourHand.style.transform = `rotate(${hourDegrees}deg)`;
    minuteHand.style.transform = `rotate(${minuteDegrees}deg)`;
}

// Function to generate answer options for a specific time
function generateOptions(time) {
    const correctAnswer = `${time.hour}:${time.minute < 10 ? '0' : ''}${time.minute}`;
    
    // Generate incorrect options by randomizing minutes
    const incorrectOptions = [];
    while (incorrectOptions.length < 2) {
        const randomMinute = Math.floor(Math.random() * 60);
        const incorrectOption = `${time.hour}:${randomMinute < 10 ? '0' : ''}${randomMinute}`;
        if (!incorrectOptions.includes(incorrectOption) && incorrectOption !== correctAnswer) {
            incorrectOptions.push(incorrectOption);
        }
    }
    
    // Combine correct and incorrect options and shuffle them
    const allOptions = [correctAnswer, ...incorrectOptions];
    shuffleArray(allOptions);
    
    return allOptions;
}

// Function to shuffle an array (Fisher-Yates algorithm)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Function to initialize a new question
function initializeQuestion() {
    const currentQuestionData = questions[currentQuestion];
    
    // Set the clock to the current question's time
    setClockHands(currentQuestionData);
    
    const answerOptions = generateOptions(currentQuestionData);

    // Clear previous options
    options.innerHTML = '';

    // Create buttons for answer options
    answerOptions.forEach((option, index) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.className = 'option';
        button.onclick = () => checkAnswer(option, currentQuestionData);
        options.appendChild(button);
    });
}

// Initialize the quiz
initializeQuiz();

// Function to start the quiz
function startQuiz() {
    // You can perform any setup here if needed
    initializeQuestion();
}

// Call startQuiz when the page loads or when the user clicks a "Start Quiz" button
window.addEventListener('load', startQuiz);


// Function to initialize the quiz
function initializeQuiz() {
    currentQuestion = 0;
    initializeQuestion();
}

// Function to handle the "Next Question" button
function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        initializeQuestion();
        feedback.textContent = '';
    } else {
        // All questions have been answered
        feedback.textContent = 'Congratulations! You have completed the quiz.';
        const clapAudio = document.getElementById("clap-audio");
         clapAudio.play(); // Play correct audio feedback
        options.innerHTML = '';
    }
}




// Function to check the user's answer
function checkAnswer(userAnswer, correctTime) {
    const correctAnswer = `${correctTime.hour}:${correctTime.minute < 10 ? '0' : ''}${correctTime.minute}`;

    if (userAnswer === correctAnswer) {
        feedback.textContent = 'Correct! Well done.';
        const correctAudio = document.getElementById("correct-audio");
        correctAudio.play(); // Play correct audio feedback
    } else {
        feedback.textContent = `Incorrect. The correct answer is ${correctAnswer}.`;
        const incorrectAudio = document.getElementById("incorrect-audio");
        incorrectAudio.play(); // Play incorrect audio feedback
    }
}
