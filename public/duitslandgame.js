  // beergame();
  if(document.querySelector('.js-duistlandplayfield'))
    {
      const showheartbeat = document.querySelector('.js-heartbeatgame');
      const beerElement = document.querySelector('.beer'); // Selecteer het beer-element
      const rangeDisplay = document.querySelector('.js-range'); // Selecteer het js-range-element
      
      socket.on('heartRate', (heartbeat) => {
          // Zoek naar het juiste element met de class "germenbeat" en data-id
          const duitsspel = document.querySelector(`.js-beatroom`);
          
          if (duitsspel) {
              // Zoek naar een <p>-element met de class "germenbeat" binnen dit element
              const heartbeatElement = duitsspel.querySelector('.germenbeat');
      
              if (heartbeatElement) {
                  const heartbeatValue = heartbeat.heartbeat; // De huidige hartslagwaarde
                  const rangeParts = randomValue.split('-').map(Number); // Zet de range om naar nummers (bijv. "90-100" -> [90, 100])
                  const [min, max] = rangeParts;
      
                  if (heartbeatValue >= min && heartbeatValue <= max) {
                      // Hartslag zit binnen de range
      
                      // Voeg animatieklasse toe aan het beer-element
                      if (beerElement) {
                          beerElement.classList.add('animate-fillBeer');
                      }
      
                      // Toon "Congrats" in het js-range-element
                      if (rangeDisplay) {
                          rangeDisplay.textContent = 'Congrats';
                      }
                  } else {
                      // Hartslag zit niet binnen de range, toon de huidige hartslag
                      if (heartbeatElement) {
                          heartbeatElement.textContent = `${heartbeatValue}`;
                      }
                  }
              } else {
                  console.error('Geen element met class "germenbeat" gevonden binnen de gebruikerdiv.');
              }
          } else {
              console.error(`Geen gebruiker gevonden met ID ${heartbeat.id}.`);
          }
      });
      
      // Stel een willekeurige range in en toon deze
      document.body.classList.add('c-body--duits');
      
      const heardrange = ["90-100", "100-110", "110-120", "120-130", "130-140", "140-150", "150-160", "160-170", "170-180"];
      const range = document.querySelector('.js-range');
      
      const randomIndex = Math.floor(Math.random() * heardrange.length);
      const randomValue = heardrange[randomIndex]; // Genereer een willekeurige range
      
      if (range) {
          // Toon de geselecteerde range in de HTML
          range.textContent = randomValue;
      } else {
          console.error('Element met class .js-range niet gevonden.');
      }
      
    }
  