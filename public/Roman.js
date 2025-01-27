document.addEventListener("DOMContentLoaded", () => {
  const doors = document.querySelectorAll(".c-romedoor__item");
  const secondPartText = document.querySelector(".c-romesecondpart");
  const nextChallengeButton = document.getElementById("next-challenge-button");

  // Define questions with heart rate ranges
  const romanQuestions = [
    { question: "C - X", answer: "XC", range: [90, 100], options: ["IX", "XC", "LX"] },
    { question: "C + XL", answer: "CXL", range: [100, 110], options: ["XC", "CXL", "LXX"] },
    { question: "LXX + X", answer: "XC", range: [90, 100], options: ["XC", "C", "LXX"] },
    { question: "LXX + XX", answer: "C", range: [80, 90], options: ["C", "XC", "LXX"] },
    { question: "C + X", answer: "CX", range: [110, 120], options: ["CX", "CXX", "C"] },
    { question: "C + L", answer: "CL", range: [130, 140], options: ["CL", "CXL", "C"] },
    { question: "C + XV", answer: "CXV", range: [110, 120], options: ["CXV", "CXX", "C"] },
    { question: "C + XX", answer: "CXX", range: [120, 130], options: ["CXX", "CX", "C"] }
  ];

  let currentQuestion = null;
  let isAnswerCorrect = false; // Tracks if the user clicked the correct answer
  let totalTimePenalty = 0; // Penalty time

  // Log when the page is loaded and DOM is ready
  console.log("DOMContentLoaded event triggered");

  // Function to randomize and show a new question
  function randomizeQuestion() {
    console.log("randomizeQuestion called");

    // Randomly pick a question
    const randomIndex = Math.floor(Math.random() * romanQuestions.length);
    currentQuestion = romanQuestions[randomIndex];

    // Ensure currentQuestion is set
    if (!currentQuestion) {
      console.error("No current question set during randomizeQuestion.");
      return; // Exit the function if currentQuestion is not set
    }

    console.log(`New question: ${currentQuestion.question}`);

    document.querySelector(".c-romequestion h1").textContent = `${currentQuestion.question} = ?`;

    // Reset previous door classes
    doors.forEach((door) => {
      door.classList.remove("c-romedoor__item--corect", "c-romedoor__item--fout");
      door.classList.remove("correct-border", "wrong-border");
    });

    // Assign options to doors
    doors.forEach((door, index) => {
      const doorText = door.querySelector("h2");
      doorText.textContent = currentQuestion.options[index];

      // Mark correct door
      if (currentQuestion.options[index] === currentQuestion.answer) {
        door.classList.add("c-romedoor__item--corect"); // Add correct class
      } else {
        door.classList.remove("c-romedoor__item--corect"); // Ensure it's not marked as correct
      }
    });
  }


  randomizeQuestion();

  // Event listener for door click
  doors.forEach((door) => {
    door.addEventListener("click", () => {
      // Log current question when door is clicked
      console.log("Door clicked. currentQuestion:", currentQuestion);

      if (currentQuestion === null) {
        console.error("currentQuestion is null when door is clicked.");
        return; // Exit if there's no current question
      }

      const isCorrect = door.classList.contains("c-romedoor__item--corect");

      if (isCorrect) {
        door.classList.add("correct-border"); // Add correct border
        secondPartText.classList.remove("o-hidden"); // Show the hidden text
        isAnswerCorrect = true; // Mark the answer as correct

        // Ensure currentQuestion is set before calling enableHeartRateMonitor
        if (currentQuestion) {
          // Enable heart rate detection (simulating the heart rate monitor)
          enableHeartRateMonitor(); // Simulating the heart rate detection
          console.log("Correct answer selected. Heart rate detection enabled.");
        } else {
          console.log("No current question set when answer is correct.");
        }
      } else {
        door.classList.add("wrong-border"); // Add wrong border
        totalTimePenalty += 30; // Add 30 seconds penalty
        console.log(`Penalty time: ${totalTimePenalty}s`);

        // Remove the wrong border after 3 seconds
        setTimeout(() => {
          door.classList.remove("wrong-border");
        }, 3000);
      }
    });
  });

  function enableHeartRateMonitor() {
    console.log("enableHeartRateMonitor called. currentQuestion:", currentQuestion);
    if (!currentQuestion) {
      console.log("No current question found in enableHeartRateMonitor.");
      return; // Exit the function if currentQuestion is not defined
    }

    // Simulating an automatic heart rate check, with a random heart rate (for demonstration) change this to actual heart rate detection
    let heartRate = Math.floor(Math.random() * (120 - 80 + 1)) + 80; // Random heart rate between 80 and 120
    console.log(`Detected heart rate: ${heartRate}`);

    // Check if the detected heart rate is within the correct range
    if (heartRate >= currentQuestion.range[0] && heartRate <= currentQuestion.range[1]) {
      nextChallengeButton.classList.add("enabled"); // Enable the button
      nextChallengeButton.classList.remove("disabled"); // Remove disabled class
      nextChallengeButton.disabled = false; // Ensure the button is enabled
      console.log(`Heart rate ${heartRate} is within range. Button enabled.`);
    } else {
      console.log(`Heart rate ${heartRate} is outside range. Button remains disabled.`);
    }
  }

  // Event listener for the next challenge button click
  nextChallengeButton.addEventListener("click", () => {
    console.log("Proceeding to the next challenge...");
  });
});



// without the heartrate validation
//-----------------------------------------------------------------------
// document.addEventListener("DOMContentLoaded", () => {
//     const doors = document.querySelectorAll(".c-romedoor__item");
//     const secondPartText = document.querySelector(".c-romesecondpart");

//     // Generate random Roman numeral equations with answers between 80 and 140 (max 3 digits)
//     const romanQuestions = [
//       { question: "C - X", answer: "XC", options: ["XC", "C", "LXX"] },
//       { question: "C + XL", answer: "CXL", options: ["XC", "CXL", "LXX"] },
//       { question: "LXX + X", answer: "XC", options: ["XC", "C", "LXX"] },
//       { question: "C - XX", answer: "LXXX", options: ["LXX", "C", "XC"] },
//       { question: "LXX + XX", answer: "C", options: ["C", "XC", "LXX"] }
//     ];
    


//     let currentQuestion = null;
//     let totalTimePenalty = 0; // Total penalty time added

//     // Function to randomize the question
//     function randomizeQuestion() {
//       const randomIndex = Math.floor(Math.random() * romanQuestions.length);
//       currentQuestion = romanQuestions[randomIndex];

//       document.querySelector(".c-romequestion h1").textContent = `${currentQuestion.question} = ?`;

//       // Remove initial classes from the doors
//       doors.forEach((door) => {
//         door.classList.remove("c-romedoor__item--corect", "c-romedoor__item--fout");
//         door.classList.remove("correct-border", "wrong-border");
//       });

//       // Assign options to doors dynamically
//       doors.forEach((door, index) => {
//         const doorText = door.querySelector("h2");
//         doorText.textContent = currentQuestion.options[index];

//         // Set class for correct or incorrect answer
//         if (currentQuestion.options[index] === currentQuestion.answer) {
//           door.dataset.correct = "true";
//         } else {
//           door.dataset.correct = "false";
//         }
//       });
//     }

//     // Add event listeners to each door
//     doors.forEach((door) => {
//       door.addEventListener("click", () => {
//         const isCorrect = door.dataset.correct === "true";

//         if (isCorrect) {
//           door.classList.add("correct-border"); // Add correct border class
//           secondPartText.classList.remove("o-hidden"); // Show the hidden text
//         } else {
//           door.classList.add("wrong-border"); // Add wrong border class
//           totalTimePenalty += 30; // Add 30 seconds penalty
//           console.log(`Total penalty time: ${totalTimePenalty}s`);

//           // Remove the wrong border class after 3 seconds
//           setTimeout(() => {
//             door.classList.remove("wrong-border");
//           }, 3000);
//         }
//       });
//     });

//     // Initialize the first question
//     randomizeQuestion();
// });
