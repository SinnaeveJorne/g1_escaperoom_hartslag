// Timer instellingen
const totalTime = 2 * 60; // Totale tijd in seconden (10 minuten)
let currentTime = totalTime;

// Elementen selecteren
const timerBar = document.getElementById("zwidtimer-bar");
const timerLabel = document.getElementById("zwidtimer-label");

// Functie om de tijd te formatteren als mm:ss
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

// Functie om de timer te updaten
function updateTimer() {
  // Bereken breedte van de balk
  const percentage = (currentTime / totalTime) * 100;
  timerBar.style.width = `${percentage}%`;

  // Update de tijd onder de balk
  timerLabel.textContent = formatTime(currentTime);

  // Aftellen
  if (currentTime > 0) {
    currentTime--;
    setTimeout(updateTimer, 1000); // Herhaal elke seconde
  } else {
    timerLabel.textContent = "Time's up!";
    timerBar.style.background = "#ff0000"; // Balk wordt rood
  }
}

// Start de timer
const init = function(){
    // Functie om de wijzer aan te passen
function setNeedle(value) {
    // Converteer de waarde naar een hoek (90 = links, 100 = midden, 110 = rechts)
    const angle = ((value - 90) / 20) * 40 - 20; // 40 graden tussen labels
    const needle = document.getElementById('c-zwiderland__needle');
    needle.style.transform = `rotate(${angle}deg)`;
  }
  
  // Voorbeeld: zet de wijzer op 100
  setNeedle(100);
  
  // Voeg een slider toe voor interactie (optioneel)
  document.body.insertAdjacentHTML(
    'beforeend',
    '<input type="range" min="90" max="110" value="100" id="slider" style="position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%);">'
  );
  
  document.getElementById('slider').addEventListener('input', (e) => {
    setNeedle(Number(e.target.value));
  });
  
    updateTimer();
}

document.addEventListener('DOMContentLoaded',init);
