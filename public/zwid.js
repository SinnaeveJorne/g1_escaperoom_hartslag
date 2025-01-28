// Timer settings
const totalTime = 2 * 60; // Total time in seconds (2 minutes)
let currentTime = totalTime;

// Select elements
const timerBar = document.getElementById("zwidtimer-bar");
const timerLabel = document.getElementById("zwidtimer-label");

// Dummy heart rate value and interval settings
let userHeartRate = 100; // Initial heart rate
const minHeartRate = 80;
const maxHeartRate = 120;
let heartRateInterval; // Variable to store the interval ID

// Penalty settings (this will be tracked separately)
let penaltyTime = 0; // Keep track of the penalty time
const penaltyDuration = 1; // Time in seconds for when HR is out of range to apply penalty
const penaltyPenalty = 5; // Penalty time in seconds to add

// Function to generate dummy heart rate data
function generateDummyHeartRate() {
  userHeartRate = Math.floor(Math.random() * (maxHeartRate - minHeartRate + 1)) + minHeartRate;
  console.log(`Current Heart Rate: ${userHeartRate}`);
  setNeedle(userHeartRate); // Update the needle based on heart rate
  checkHeartRateOutOfRange(userHeartRate); // Check heart rate for penalty
}

// Function to format time as mm:ss
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

// Function to update the timer
function updateTimer() {
  // Calculate the width of the bar
  const percentage = (currentTime / totalTime) * 100;
  timerBar.style.width = `${percentage}%`;

  // Update the time below the bar
  timerLabel.textContent = formatTime(currentTime);

  // Countdown logic
  if (currentTime > 0) {
    currentTime--;
    setTimeout(updateTimer, 1000); // Repeat every second
  } else {
    timerLabel.textContent = "Time's up!";
    timerBar.style.background = "#ff0000"; // Make the bar red
    clearInterval(heartRateInterval); // Stop generating heart rate data
    console.log("Heart rate generation stopped.");
  }
}

// Function to adjust the needle position
function setNeedle(value) {
  // Calculate the angle (90 = -90°, 100 = 0°, 110 = +90°)
  const minValue = 90;
  const maxValue = 110;
  const minAngle = -90;
  const maxAngle = 90;

  // Linear transformation of value to angle
  const angle = ((value - minValue) / (maxValue - minValue)) * (maxAngle - minAngle) + minAngle;

  // Adjust the needle rotation
  const needle = document.getElementById("c-zwiderland__needle");
  if (needle) {
    needle.style.transform = `rotate(${angle}deg)`;
  }
}

// Function to check heart rate for out-of-range conditions and apply penalty if necessary
let outOfRangeTime = 0; // Track the time out of range
function checkHeartRateOutOfRange(value) {
  if (value < 90 || value > 110) {
    outOfRangeTime++;
    if (outOfRangeTime >= penaltyDuration) {
      applyPenalty(); // Apply penalty if out of range for more than 1 second
    }
  } else {
    outOfRangeTime = 0; // Reset if heart rate returns to valid range
  }
}

// Function to apply the penalty
function applyPenalty() {
  penaltyTime += penaltyPenalty; // Apply 5-second penalty every time
  console.log(`Penalty applied: +${penaltyPenalty} seconds. Total penalty time: ${penaltyTime} seconds.`);
}

// Function to get the current penalty time
function getPenaltyTime() {
  return penaltyTime;
}

// Initialization function
const init = function () {
  // Start the timer
  updateTimer();

  // Start generating heart rate data every 2 seconds
  heartRateInterval = setInterval(generateDummyHeartRate, 2000);
};

// Wait for the DOM to load before starting the script
document.addEventListener("DOMContentLoaded", init);
