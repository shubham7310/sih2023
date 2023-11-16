const questions = [
    {
        image: 'happy.jpg',
        choices: ['Happy', 'Sad', 'Fear', 'Surprised'],
        correctAnswer: 'Happy'
    },
    {
        image: 'sad.jpg',
        choices: ['Happy', 'Sad', 'Angry', 'Surprised'],
        correctAnswer: 'Sad'
    },
    {
        image: 'angry.jpg',
        choices: ['Happy', 'Sad', 'Angry', 'Fear'],
        correctAnswer: 'Angry'
    },
    {
        image: 'surprised.jpg',
        choices: ['Happy', 'Sad', 'Angry', 'Surprised'],
        correctAnswer: 'Surprised'
    },
    {
        image: 'fear.jpg',
        choices: ['Fear', 'Sad', 'Angry', 'Surprised'],
        correctAnswer: 'Fear'
    }
    // Add more questions here
];

let currentQuestion = 0;

function initializeQuestion() {
    const questionData = questions[currentQuestion];
    const questionImage = document.getElementById('question-image');
    const optionsContainer = document.getElementById('options-container');

    questionImage.src = questionData.image;
    
    // Shuffle the choices for this question
    const shuffledChoices = shuffleArray(questionData.choices);

    optionsContainer.innerHTML = ''; // Clear previous options

    shuffledChoices.forEach((choice, index) => {
        const button = document.createElement('button');
        button.textContent = choice;
        button.className = 'option';
        button.style.fontSize='18px';
        button.style.margin='3px';
        button.style.borderRadius='5px';
        button.style.backgroundColor = 'white';
        button.onclick = () => checkAnswer(choice, questionData.correctAnswer);
        optionsContainer.appendChild(button);
    });

    // Clear feedback and hide the "Next Question" button
    document.getElementById('feedback').textContent = '';
    document.getElementById('next-question').style.display = 'none';
}

function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function checkAnswer(userAnswer, correctAnswer) {
    const feedback = document.getElementById('feedback');
    const nextQuestionButton = document.getElementById('next-question');

    if (userAnswer === correctAnswer) {
        const correctAudio = document.getElementById("correct-audio");
        correctAudio.play(); // Play correct audio feedback
        feedback.textContent = 'Correct! Well done.';
        
    } else {
        const incorrectAudio = document.getElementById("incorrect-audio");
        incorrectAudio.play(); // Play incorrect audio feedback
        feedback.textContent = `Incorrect. The correct answer is ${correctAnswer}.`;
    }

    // Show the "Next Question" button
    nextQuestionButton.style.display = 'block';
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        initializeQuestion();
    } else {
        // All questions have been answered
        const feedback = document.getElementById('feedback');
        feedback.textContent = 'Congratulations! You have completed the quiz.';
        const clapAudio = document.getElementById("clap-audio");
        clapAudio.play(); // Play correct audio feedback
        document.getElementById('options-container').innerHTML = '';
        document.getElementById('next-question').style.display = 'none';
    }
}

// Start the quiz
initializeQuestion();
