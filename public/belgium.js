let currentHeartRate = 120; // Dummy starting heart rate
const minHeartRate = 85; // Minimum heart rate to simulate
const maxHeartRate = 120; // Maximum heart rate to simulate

// List of predefined heart rate ranges
const heartRateRanges = [
  { min: 85, max: 100 },
  { min: 90, max: 110 },
  { min: 95, max: 105 },
  { min: 100, max: 120 },
  { min: 105, max: 115 },
  { min: 110, max: 120 },
  { min: 95, max: 115 },
  { min: 90, max: 120 },
  { min: 85, max: 110 },
  { min: 95, max: 110 },
  { min: 100, max: 110 },
  { min: 105, max: 120 },
  { min: 90, max: 100 },
  { min: 95, max: 120 },
  { min: 85, max: 105 },
  { min: 90, max: 105 },
  { min: 100, max: 115 },
  { min: 95, max: 120 },
  { min: 85, max: 110 },
  { min: 90, max: 115 }
];

// Pick a random range from the predefined list
const randomRange = heartRateRanges[Math.floor(Math.random() * heartRateRanges.length)];
document.getElementById('heartRateRange').textContent = `${randomRange.min}-${randomRange.max}`;

let heartRateInterval;
let isLightingUp = false; // Flag to prevent multiple transitions

function generateDummyHeartRate() {
  currentHeartRate = Math.floor(Math.random() * (maxHeartRate - minHeartRate + 1)) + minHeartRate;
  document.getElementById('heartRateValue').textContent = currentHeartRate;

  if (currentHeartRate >= randomRange.min && currentHeartRate <= randomRange.max) {
    if (!isLightingUp) {
      isLightingUp = true;
      document.body.style.backgroundColor = "#4caf50"; // Light up the background
      document.getElementById("gameImage").style.opacity = 1; // Reveal image
      document.querySelector(".c-torchbelg").style.opacity = 1; // Torch light effect
    }
  } else {
    if (isLightingUp) {
      document.body.style.backgroundColor = "black"; // Reset background color
      document.getElementById("gameImage").style.opacity = 0; // Hide image
      document.querySelector(".c-torchbelg").style.opacity = 0.3; // Reset torch opacity
      isLightingUp = false;
    }
  }
}

// Start the heart rate simulation
heartRateInterval = setInterval(generateDummyHeartRate, 2000);

// Handle the input answer logic
document.getElementById("answerInput").addEventListener("keyup", function(event) {
  if (event.key === "Enter") {
    const userAnswer = document.getElementById("answerInput").value.trim().toLowerCase();
    if (userAnswer === "belgium") {
      alert("Correct Answer!");
      clearInterval(heartRateInterval); // Stop the heart rate generation
    } else {
      alert("Try Again!");
    }
  }
});
