// Timer constants and elements
const ftotalTime = 30; // 30 seconds total
let fcurrentTime = ftotalTime;
const ftimerBar = document.getElementById("franstimer-bar");
const ftimerLabel = document.getElementById("franstimer-label");
const heartratecontainer = document.getElementById("heart-rate-container");
const textfransopdracht = document.querySelectorAll("textfransopdracht");

let totalTimePenalty = 0; // Penalty time

// Heart rates (dummy data)
let userHeartRate = 100; // Player's heart rate (will be updated dynamically)
let intruderHeartRate = 100; // Enemy's heart rate starts from 100

// Heart rate display elements
const userHeartRateElement = document.querySelector('.jijHeartRate');
const intruderHeartRateElement = document.querySelector('.achtervolgersHeartRate');

// Intervals
let userHeartRateInterval;
let intruderHeartRateInterval;

// Function to update the player's heart rate (dummy data for now)
function updateUserHeartRate() {
  // Simulate user heart rate within a random range (90-120)
  userHeartRate = Math.floor(Math.random() * 31) + 90; // Random value between 90 and 120
  userHeartRateElement.textContent = userHeartRate;
  console.log(`User heart rate updated: ${userHeartRate}`);
}

// Function to update the enemy's heart rate
function updateIntruderHeartRate() {
  if (intruderHeartRate < 120) {
    intruderHeartRate += Math.floor(Math.random() * 5) + 1; // Increment by 1-5
  }
  intruderHeartRateElement.textContent = intruderHeartRate;
  console.log(`Intruder heart rate updated: ${intruderHeartRate}`);
}

// Function to format time as mm:ss
function fformatTime(fseconds) {
  const fminutes = Math.floor(fseconds / 60);
  const fsecs = fseconds % 60;
  return `${fminutes.toString().padStart(2, "0")}:${fsecs.toString().padStart(2, "0")}`;
}

let penaltyTimeout = null; // Track timeout for leeway

// Timer update function
function fupdateTimer() {
  // Calculate progress bar width
  const percentage = (fcurrentTime / ftotalTime) * 100;
  ftimerBar.style.width = `${percentage}%`;

  // Check heart rates with 2-second leeway
  if (userHeartRate < intruderHeartRate) {
    if (!penaltyTimeout) {
      penaltyTimeout = setTimeout(() => {
        console.log("Penalty applied! User heart rate is below intruder's for 2 seconds.");
        totalTimePenalty += 15; // Apply penalty
        console.log(`Total penalty time: ${totalTimePenalty}s`);
        penaltyTimeout = null; // Reset timeout
      }, 2000); // 2-second delay
    }
  } else {
    // Clear timeout if user heart rate goes back above intruder's
    if (penaltyTimeout) {
      clearTimeout(penaltyTimeout);
      penaltyTimeout = null;
      console.log("User recovered before penalty was applied.");
    }
  }

  // Update timer label
  ftimerLabel.textContent = fformatTime(fcurrentTime);
  console.log(`Timer updated: ${ftimerLabel.textContent}`);

  if (fcurrentTime > 0) {
    fcurrentTime--;
    setTimeout(fupdateTimer, 1000); // Call the function every second
  } else {
    ftimerLabel.textContent = "Time's up!";
    ftimerBar.style.background = "#ff0000"; // Turn the bar red
    console.log("Timer finished!");
    showCongratulations(); // Show the congratulations message
  }
}

// Function to display the congratulations message
function showCongratulations() {
  // Stop the heart rate updates and timer
  clearInterval(userHeartRateInterval);
  clearInterval(intruderHeartRateInterval);
  console.log("Heart rate updates stopped.");

  const congratsContainer = document.querySelector('.c-congertscontainer');
  congratsContainer.classList.remove('o-hidden');
  heartratecontainer.classList.add('o-hidden');
  const txtContainer = document.querySelector('.c-container--textfransopdracht');
  txtContainer.classList.add('o-hidden');
  console.log('Congratulations! Time is up!');
}

// Function to hide all draggable rings
function hideRings() {
  draggables.forEach((draggable) => {
    draggable.style.display = "none"; // Hide the ring
  });
  console.log("All rings are now hidden.");
  dropzones.forEach((zone) => {
    zone.style.borderColor = "transparent"; // Reset the border color
  });
}

// Draggable rings and drop zones functionality
const draggables = document.querySelectorAll('.draggable');
const dropzones = document.querySelectorAll('.dropzone');
let totalRingsPlaced = 0;

// Make rings draggable
let currentDraggable = null;
let offsetX = 0;
let offsetY = 0;

draggables.forEach((draggable) => {
  // Start drag
  draggable.addEventListener('mousedown', (e) => {
    currentDraggable = draggable;
    offsetX = e.offsetX;
    offsetY = e.offsetY;
    currentDraggable.style.cursor = 'grabbing';
  });

  // Move element
  document.addEventListener('mousemove', (e) => {
    if (!currentDraggable) return;
    currentDraggable.style.left = `${e.pageX - offsetX}px`;
    currentDraggable.style.top = `${e.pageY - offsetY}px`;
  });

  // Stop drag
  document.addEventListener('mouseup', (e) => {
    if (!currentDraggable) return;

    currentDraggable.style.cursor = 'grab';

    const draggableColor = currentDraggable.dataset.color;
    const draggableRect = currentDraggable.getBoundingClientRect();

    // Find the closest dropzone
    let closestZone = null;
    let closestDistance = Infinity;

    dropzones.forEach((zone) => {
      const zoneRect = zone.getBoundingClientRect();
      const zoneCenterX = (zoneRect.left + zoneRect.right) / 2;
      const zoneCenterY = (zoneRect.top + zoneRect.bottom) / 2;

      const draggableCenterX = (draggableRect.left + draggableRect.right) / 2;
      const draggableCenterY = (draggableRect.top + draggableRect.bottom) / 2;

      const distance = Math.sqrt(
        Math.pow(zoneCenterX - draggableCenterX, 2) +
        Math.pow(zoneCenterY - draggableCenterY, 2)
      );

      if (distance < closestDistance) {
        closestDistance = distance;
        closestZone = zone;
      }
    });

    // Check if the closest dropzone is valid
    if (closestZone) {
      const zoneColor = closestZone.dataset.color;

      if (draggableColor === zoneColor) {
        closestZone.style.borderColor = draggableColor; // Highlight the zone
        const zoneRect = closestZone.getBoundingClientRect();
        currentDraggable.style.left = `${zoneRect.left}px`;
        currentDraggable.style.top = `${zoneRect.top}px`;

        // Increment the total rings placed
        totalRingsPlaced++;
        console.log(`Ring placed correctly. Total placed: ${totalRingsPlaced}`);

        // Check if all rings have been placed
        if (totalRingsPlaced === 5) {
          console.log('All rings placed. Starting the timer...');
          hideRings(); // Hide all rings

          // Start the heart rate updates and timer
          userHeartRateInterval = setInterval(updateUserHeartRate, 1000); // Update user heart rate every second
          intruderHeartRateInterval = setInterval(updateIntruderHeartRate, 4000); // Update intruder heart rate every 4 seconds

          fupdateTimer(); // Start the timer when all rings are placed
          heartratecontainer.classList.remove('o-hidden');
          const txtContainer = document.querySelector('.c-container--textfransopdracht');
          txtContainer.classList.remove('o-hidden');
          ftimerLabel.classList.remove('o-hidden');
          const timerContainer = document.querySelector('.zwidtimer-container');
          timerContainer.classList.remove('o-hidden');
        }

      } else {
        alert(`Only ${zoneColor} items can be dropped here!`);
        currentDraggable.style.left = '';
        currentDraggable.style.top = '';
      }
    } else {
      currentDraggable.style.left = '';
      currentDraggable.style.top = '';
    }

    currentDraggable = null; // Release the current draggable
  });
});
