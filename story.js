// Define the story and the correct answer
const story = " Raju has a red car.He also has a blue truck and a yellow cycle.";
const correctAnswer = "red";

// Function to show the story, "Repeat" button, and "Submit Answer" button
function showStory() {
    const storyContainer = document.getElementById("story-container");
    storyContainer.style.display = "block"; // Show the story

    // Show the "Repeat" button
    const repeatButton = document.getElementById("repeat-button");
    repeatButton.style.display = "block";

    // Hide the "Show Story" button
    document.getElementById("show-story-button").style.display = "none";

   
    startCountdown(); // Start the countdown timer
        
     
    }


// Function to hide the story and show the "Submit Answer" button
function hideStory() {
    const storyContainer = document.getElementById("story-container");
    storyContainer.style.display = "none";

    // Show the "Submit Answer" button
    const submitButton = document.getElementById("story-recall-button");
    submitButton.style.display = "block";
}


 // Function to reset and replay the story and audio
function repeatStory() {
    const storyContainer = document.getElementById("story-container");
    storyContainer.style.display = "block"; // Display the story

    // Show the "Submit Answer" button
    const submitButton = document.getElementById("story-recall-button");
    submitButton.style.display = "block";

    const audio = document.getElementById("story-audio");
    audio.currentTime = 0; // Reset the audio to the beginning
    audio.play(); // Play the audio from the beginning

    // Reset the countdown timer
    hideStoryWithCountdown();
}


// Function to check the answer
function checkStoryRecall() {
    const userAnswer = prompt("what is the color of raju's car?");
    const feedback = document.getElementById("story-recall-feedback");

    if (userAnswer === correctAnswer) {
        feedback.textContent = "Correct! You remembered the color!";
        const correctAudio = document.getElementById("correct-audio");
        correctAudio.play(); // Play correct audio feedback
    } else {
        feedback.textContent = "Oops, that's not correct. Try again!";
        const incorrectAudio = document.getElementById("incorrect-audio");
        incorrectAudio.play(); // Play incorrect audio feedback
    }
    var quizLink = document.getElementById('quiz-link');
  
        quizLink.style.display = 'block'; // Or 'inline', 'inline-block', etc., depending on your CSS styling
   
}

// Initially, show the "Show Story" button and hide the rest
window.onload = function () {
    document.getElementById("show-story-button").style.display = "block";
};

// for countdown
let countdown; // Variable to store the countdown interval ID

// Function to start the countdown timer
function startCountdown() {
    let seconds = 9; // Set the countdown duration in seconds
    const timerElement = document.getElementById("countdown-timer");

    const updateInterval = 100; // Update the timer every 100 milliseconds
    const initialPercentage = 100; // Initial percentage (timer starts full)

    let currentPercentage = initialPercentage; // Track the current percentage
    timerElement.style.width = initialPercentage + "%"; // Set the initial width

    countdown = setInterval(function () {
        if (seconds <= 0) {
            clearInterval(countdown); // Clear the countdown interval when time is up
            timerElement.style.width = "0%"; // Set the timer's width to 0%
            hideStory(); // Hide the story when time is up
        } else {
            currentPercentage -= (updateInterval / (seconds * 1000)) * 100; // Calculate the decrease in percentage
            timerElement.style.width = currentPercentage + "%"; // Update the timer's width
            seconds -= (updateInterval / 1000); // Decrease the time in seconds
        }
    }, updateInterval); // Update the countdown at the specified interval
}

// Function to reset the countdown timer
function resetTimer() {
    clearInterval(countdown); // Clear the countdown interval
    const timerElement = document.getElementById("countdown-timer");
    timerElement.style.width = "100%"; // Reset the timer's width to 100%
}

// Function to repeat the story and reset the timer
function repeatStory() {
    const storyContainer = document.getElementById("story-container");
    storyContainer.style.display = "block"; // Show the story container
    resetTimer(); // Reset the countdown timer
    startCountdown(); // Start the countdown timer again
}

