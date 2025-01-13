document.addEventListener('DOMContentLoaded', init);

function init() {
    initLoginForm();
    initRegisterForm();
    initStartGameButton();
}

function initLoginForm() {
    if(document.querySelector('.js-loginform')) {
        let inputs = document.querySelectorAll('.js-input');
        inputs.forEach(input => {
            input.addEventListener('blur', validateInput);
            input.addEventListener('focus', handleFocus);     
        });

        document.querySelector('.js-loginform').addEventListener('submit', async (e) => {
            e.preventDefault();
            let hasErrors = false;
            inputs.forEach(input => {
                if (!validateInput({target: input})) {
                    hasErrors = true;
                }
            });

            if (!hasErrors) {
                const formData = new FormData(e.target);
                const data = Object.fromEntries(formData);
                
                try {
                    const response = await fetch('/login', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            email: data.email,
                            password: data.password
                        })
                    });

                    if (response.ok) {
                        window.location.href = '/dashboard.html';
                    } else {
                        const error = await response.text();
                        alert(error);
                    }
                } catch (error) {
                    alert('Er is iets misgegaan. Probeer het later opnieuw.');
                }
            }
        });
    }
}

function initRegisterForm() {
    if(document.querySelector('.js-registerform')) {
        let inputs = document.querySelectorAll('.js-input');
        inputs.forEach(input => {
            input.addEventListener('blur', validateInput);
            input.addEventListener('focus', handleFocus);     
        });

        document.querySelector('.js-registerform').addEventListener('submit', async (e) => {
            e.preventDefault();
            let hasErrors = false;
            inputs.forEach(input => {
                if (!validateInput({target: input})) {
                    hasErrors = true;
                }
            });

            if (!hasErrors) {
                const formData = new FormData(e.target);
                const data = Object.fromEntries(formData);
                
                try {
                    const response = await fetch('/register', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            naam: data.naam,
                            voornaam: data.voornaam,
                            email: data.email,
                            wachtwoord: data.wachtwoord,
                            herhaalWachtwoord: data.herhaalwachtwoord
                        })
                    });

                    if (response.ok) {
                        window.location.href = '/login.html';
                    } else {
                        const error = await response.text();
                        alert(error);
                    }
                } catch (error) {
                    alert('Er is iets misgegaan. Probeer het later opnieuw.');
                }
            }
        });
    }
}

function initStartGameButton() {
    const startGameButton = document.querySelector(".js-startgame");
    if (startGameButton) {
        startGameButton.addEventListener("click", async () => {
            // Attempt to reconnect
            const isReconnected = await reconnectPolarHeartRateMonitor();
          
            if (isReconnected) {
              // Show the next popup if reconnect works
              showPopup({
                title: "Reconnected!",
                type: "start_game",
                buttons: [
                  {
                    text: "Continue",
                    action: () => {
                    
                    }
                  }
                ]
              });
            } else {
             
              showPopup({
                title: "Connecteer uw hartslagmeter",
                type: "connect",
                buttons: [
                  {
                    text: "Connect",
                    action: async () => {
                      const isConnected = await connectPolarHeartRateMonitor();
                      if (isConnected) {
                        showPopup({
                          title: "Connection Successful",
                          type: "connected",
                          buttons: [
                            {
                              text: "Start Game",
                              action: () => {
                                console.log("Solo mode selected.");
                              }
                            }
                          ]
                        });
                      } else {
                        alert("Connection failed. Please try again.");
                      }
                    }
                  }
                ]
              });
            }
          });
          
            
        }
    } 



function validateInput(e) {
    const inputspan = e.target.parentElement;
    const error = e.target.closest('.c-label').querySelector('.c-input__errorSpan'); 
    
    if(e.target.value === '') {
        e.target.classList.add('c-input--error');
        showerror(error,'Dit veld is verplicht');
        summonicon(inputspan,error);
        return false;
    }

    if(e.target.type === 'email') {
        if(!validateEmail(e.target.value)) {
            e.target.classList.add('c-input--error');
            showerror(error,'Dit is geen geldig emailadres');
            summonicon(inputspan,error);
            return false;
        }
    }

    if(document.querySelector('.js-repeatpassword')) {
        if(e.target.type === 'password') {
            const re = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
            if(!re.test(e.target.value)) {
                e.target.classList.add('c-input--error');
                showerror(error,'Dit wachtwoord is niet veilig');
                summonicon(inputspan,error);
                return false;
            } else {
                const passwordFields = document.querySelectorAll('input[type="password"]');
                let allFilled = true;
                passwordFields.forEach(field => {
                    if (!field.value.trim()) {
                        allFilled = false;
                    }
                });

                if(allFilled) {
                    if(passwordFields[0].value !== passwordFields[1].value) {
                        document.querySelector('.js-repeatpassword').classList.add('c-input--error');
                        showerror(document.querySelector('.c-input__errorSpan--repeatpassword'),'Wachtwoorden komen niet overeen');
                        summonicon(document.querySelector('.js-repeatpassword').parentElement, document.querySelector('.c-input__errorSpan--repeatpassword'));
                        return false;
                    }
                }
            }
        }
    }
    return true;
}

function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}

function summonicon(inputspan) {
    if(!inputspan.querySelector('.c-input__errorIcon')) {
        inputspan.insertAdjacentHTML('beforeend', `
            <svg class="c-input__errorIcon" width="16" height="16" viewBox="0 0 16 16" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <rect width="16" height="16" fill="white" fill-opacity="0.01" />
                <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M8.51092 2.65517C8.67289 2.72228 8.82006 2.82066 8.944 2.94467L13.056 7.056C13.1801 7.17996 13.2786 7.32716 13.3457 7.4892C13.4129 7.65124 13.4475 7.82492 13.4475 8.00033C13.4475 8.17574 13.4129 8.34943 13.3457 8.51147C13.2786 8.67351 13.1801 8.82071 13.056 8.94467L8.944 13.056C8.82006 13.18 8.67289 13.2784 8.51092 13.3455C8.34894 13.4126 8.17533 13.4472 8 13.4472C7.82467 13.4472 7.65106 13.4126 7.48908 13.3455C7.32711 13.2784 7.17995 13.18 7.056 13.056L2.944 8.94467C2.81989 8.82071 2.72143 8.67351 2.65426 8.51147C2.58708 8.34943 2.55251 8.17574 2.55251 8.00033C2.55251 7.82492 2.58708 7.65124 2.65426 7.4892C2.72143 7.32716 2.81989 7.17996 2.944 7.056L7.056 2.94467C7.17995 2.82066 7.32711 2.72228 7.48908 2.65517C7.65106 2.58805 7.82467 2.5535 8 2.5535C8.17533 2.5535 8.34894 2.58805 8.51092 2.65517ZM7.5286 9.13807C7.65362 9.26309 7.82319 9.33333 8 9.33333C8.17681 9.33333 8.34638 9.26309 8.4714 9.13807C8.59643 9.01304 8.66667 8.84347 8.66667 8.66666V5.33333C8.66667 5.15652 8.59643 4.98695 8.4714 4.86193C8.34638 4.7369 8.17681 4.66666 8 4.66666C7.82319 4.66666 7.65362 4.7369 7.5286 4.86193C7.40357 4.98695 7.33333 5.15652 7.33333 5.33333V8.66666C7.33333 8.84347 7.40357 9.01304 7.5286 9.13807ZM7.5286 11.1381C7.65362 11.2631 7.82319 11.3333 8 11.3333C8.17681 11.3333 8.34638 11.2631 8.4714 11.1381C8.59643 11.013 8.66667 10.8435 8.66667 10.6667C8.66667 10.4899 8.59643 10.3203 8.4714 10.1953C8.34638 10.0702 8.17681 10 8 10C7.82319 10 7.65362 10.0702 7.5286 10.1953C7.40357 10.3203 7.33333 10.4899 7.33333 10.6667C7.33333 10.8435 7.40357 11.013 7.5286 11.1381Z"
                    fill="#DE350B" />
            </svg>
        `);
    }
}

function removeicon(inputspan) {
    const icon = inputspan.querySelector('.c-input__errorIcon');
    if (icon) {
        icon.remove();
    }
}

function showerror(error, message) {
    error.textContent = message;
    error.style.opacity = 1;
}

function clearerror(error) {
    error.textContent = '';
    error.style.opacity = 0;
}

function handleFocus(e) {
    if(e.target.classList.contains('c-input--error')) {
        e.target.classList.remove('c-input--error');
        const inputspan = e.target.parentElement;
        const error = e.target.closest('.c-label').querySelector('.c-input__errorSpan');
        removeicon(inputspan);
        clearerror(error);
    }
}

  // Helper to show a popup
  function showPopup({ title, type, buttons }) {
    // Remove existing popup if any
    const existingPopup = document.querySelector(".c-popup__container");
    if (existingPopup) existingPopup.remove();
  
    // Create popup elements
    const popupContainer = document.createElement("div");
    popupContainer.className = "c-popup__container";
  
    const popup = document.createElement("div");
    popup.className = "c-popup";
  
    const popupTitle = document.createElement("h3");
    popupTitle.textContent = title;
  
    const popupType = document.createElement("div");
    if(type == "connect") {
       popupType.classList.add("c-popup__connecticons");
        popupType.innerHTML = `
           <svg width="45" height="53" viewBox="0 0 45 53" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.44796 2.6404C6.44796 1.64033 7.38537 0.82959 8.54171 0.82959H36.4584C37.6147 0.82959 38.5521 1.64033 38.5521 2.6404C38.5521 3.64047 37.6147 4.45121 36.4584 4.45121H8.54171C7.38537 4.45121 6.44796 3.64047 6.44796 2.6404ZM22.3839 8.07283H22.6162C26.4385 8.07281 29.4672 8.07278 31.8859 8.28559C34.3638 8.50359 36.4324 8.95986 38.2422 10.0056C39.69 10.8423 40.9331 11.9175 41.9007 13.1698C43.1098 14.7348 43.6374 16.524 43.8895 18.6671C44.1355 20.7589 44.1355 23.3783 44.1355 26.6841V26.885C44.1355 30.1908 44.1355 32.8102 43.8895 34.902C43.6374 37.0451 43.1098 38.8342 41.9007 40.3994C40.9331 41.6515 39.69 42.7267 38.2422 43.5635C36.4324 44.6092 34.3638 45.0655 31.8859 45.2835C29.4672 45.4962 26.4385 45.4962 22.6162 45.4962H22.3839C18.5616 45.4962 15.5329 45.4962 13.1143 45.2835C10.6363 45.0655 8.56756 44.6092 6.75794 43.5635C5.31005 42.7267 4.06686 41.6515 3.09941 40.3994C1.89025 38.8342 1.36269 37.0451 1.11063 34.902C0.864569 32.8102 0.864597 30.1908 0.864625 26.885V26.6841C0.864597 23.3783 0.864569 20.7589 1.11063 18.6671C1.36269 16.524 1.89025 14.7348 3.09941 13.1698C4.06686 11.9175 5.31005 10.8423 6.75794 10.0056C8.56756 8.95986 10.6363 8.50359 13.1143 8.28559C15.5329 8.07278 18.5616 8.07281 22.3839 8.07283ZM13.5381 11.8886C11.3912 12.0775 10.0913 12.435 9.08441 13.0169C8.09373 13.5894 7.24314 14.325 6.58118 15.1818C5.90841 16.0526 5.49502 17.1769 5.2766 19.0337C5.05467 20.9207 5.05212 23.3558 5.05212 26.7845C5.05212 30.2132 5.05467 32.6484 5.2766 34.5353C5.49502 36.3922 5.90841 37.5164 6.58118 38.3872C7.24314 39.2441 8.09373 39.9798 9.08441 40.5522C10.0913 41.1341 11.3912 41.4917 13.5381 41.6805C15.72 41.8725 18.5356 41.8746 22.5 41.8746C26.4645 41.8746 29.2802 41.8725 31.4618 41.6805C33.6089 41.4917 34.9087 41.1341 35.9157 40.5522C36.9064 39.9798 37.7571 39.2441 38.419 38.3872C39.0917 37.5164 39.5052 36.3922 39.7235 34.5353C39.9454 32.6484 39.948 30.2132 39.948 26.7845C39.948 23.3558 39.9454 20.9207 39.7235 19.0337C39.5052 17.1769 39.0917 16.0526 38.419 15.1818C37.7571 14.325 36.9064 13.5894 35.9157 13.0169C34.9087 12.435 33.6089 12.0775 31.4618 11.8886C29.2802 11.6966 26.4645 11.6945 22.5 11.6945C18.5356 11.6945 15.72 11.6966 13.5381 11.8886ZM26.3369 18.23C27.1741 18.9197 27.2065 20.0659 26.4089 20.7901L21.8021 24.9737H28.0834C28.9209 24.9737 29.678 25.4054 30.0079 26.0713C30.3376 26.737 30.1771 27.5089 29.5995 28.0333L21.6235 35.2765C20.8259 36.0008 19.5007 36.0288 18.6632 35.3391C17.826 34.6493 17.7936 33.5031 18.5911 32.779L23.198 28.5954H16.9167C16.0792 28.5954 15.3222 28.1637 14.9922 27.4978C14.6623 26.8321 14.8229 26.0602 15.4006 25.5358L23.3766 18.2925C24.1742 17.5683 25.4994 17.5403 26.3369 18.23ZM6.44796 50.9287C6.44796 49.9286 7.38537 49.1179 8.54171 49.1179H36.4584C37.6147 49.1179 38.5521 49.9286 38.5521 50.9287C38.5521 51.9287 37.6147 52.7395 36.4584 52.7395H8.54171C7.38537 52.7395 6.44796 51.9287 6.44796 50.9287Z" fill="#262626"/>
            </svg> <svg width="41" height="60" viewBox="0 0 41 60" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M25.0641 29.8784L39.549 17.6555C40.1005 17.1904 40.4115 16.5521 40.4115 15.8859C40.4115 15.2196 40.1005 14.5814 39.549 14.1162L23.6533 0.703181C22.8302 0.00862542 21.6062 -0.191114 20.5464 0.194078C19.4867 0.58037 18.7976 1.47824 18.7976 2.47281V24.5909L5.35017 13.2439C4.21989 12.2903 2.4101 12.3092 1.30714 13.2868C0.20449 14.2643 0.226728 15.8298 1.35701 16.7835L16.8757 29.8786L1.35701 42.9738C0.226728 43.9274 0.20449 45.4929 1.30714 46.4705C2.40978 47.448 4.22021 47.4673 5.35017 46.5133L18.7976 35.1664V57.2844C18.7976 58.279 19.4867 59.1769 20.5464 59.5632C20.9048 59.694 21.2818 59.7571 21.6561 59.7571C22.3883 59.7571 23.1085 59.5137 23.6533 59.0541L39.549 45.641C40.1005 45.1759 40.4115 44.5376 40.4115 43.8714C40.4115 43.2051 40.1005 42.5669 39.549 42.1018L25.0641 29.8784ZM24.5161 8.33972L33.4586 15.8856L24.5161 23.4315V8.33972ZM24.5161 51.4167V36.325L33.4586 43.8708L24.5161 51.4167Z" fill="#262626"/>
</svg>
`;
    }
    else if(type == "connected") {
        popupType.classList.add("c-popup__showheartbeat");
        popupType.innerHTML = `
            <svg width="80" height="80" viewBox="0 0 51 50" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.75 26.5625H14.5625L17.6875 21.875L23.9375 31.25L27.0625 26.5625H31.75" stroke="#E63946" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M5.25195 18.75C5.54022 16.1716 6.76874 13.79 8.70259 12.0604C10.6364 10.3309 13.1399 9.37479 15.7344 9.375C20.1465 9.375 23.9258 11.7793 25.5 15.625C27.0742 11.7793 30.8535 9.375 35.2656 9.375C38.0628 9.375 40.7455 10.4862 42.7234 12.4641C44.7013 14.442 45.8125 17.1247 45.8125 19.9219C45.8125 32.8125 25.5 43.75 25.5 43.75C25.5 43.75 18.5938 40.0391 12.8359 34.375" stroke="#E63946" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
<p class="showheartbeat"></p>
`;
        showheartBeat();
    }
  
    const buttonContainer = document.createElement("div");
    buttonContainer.className = "c-popup__buttons";
  
    buttons.forEach(({ text, action }) => {
      const button = document.createElement("button");
      button.textContent = text;
      button.classList.add("c-button");
      button.classList.add("c-popup__button");
      button.addEventListener("click", () => {
        action();
        popupContainer.remove(); // Close popup on button click
      });
      buttonContainer.appendChild(button);
    });
  
    // Append elements to the DOM
    popup.appendChild(popupTitle);
    popup.appendChild(popupType);
    popup.appendChild(buttonContainer);
    popupContainer.appendChild(popup);
    document.body.appendChild(popupContainer);
  }
  
  // Reconnect function
  async function reconnectPolarHeartRateMonitor() {
    const deviceId = sessionStorage.getItem("bluetoothDeviceId");
    if (!deviceId) return false;
  
    const devices = await navigator.bluetooth.getDevices();
    const device = devices.find((d) => d.id === deviceId);
    if (!device) return false;
  
    if (!device.watchAdvertisements) return false;
  
    return new Promise((resolve) => {
      device.addEventListener("advertisementreceived", async () => {
        try {
          await setupHeartRateNotifications(device);
          resolve(true);
        } catch {
          resolve(false);
        }
      });
      device.watchAdvertisements().catch(() => resolve(false));
    });
  }
  
  // Connect function
  async function connectPolarHeartRateMonitor() {
    try {
      const device = await navigator.bluetooth.requestDevice({
        filters: [{ services: ["heart_rate"] }],
        optionalServices: ["heart_rate"]
      });
  
      sessionStorage.setItem("bluetoothDeviceId", device.id);
      await setupHeartRateNotifications(device);
  
      return true;
    } catch (error) {
      console.error(`Connection error: ${error.message}`);
      return false;
    }
}

async function setupHeartRateNotifications(device) {
    const server = await device.gatt.connect();
    const service = await server.getPrimaryService('heart_rate');
    heartRateCharacteristic = await service.getCharacteristic('heart_rate_measurement');
    await heartRateCharacteristic.startNotifications();

    heartRateCharacteristic.addEventListener('characteristicvaluechanged', handleHeartRateNotification);
}


async function showheartBeat() {
    if (!heartRateCharacteristic) {
        console.error("Heart rate characteristic is not initialized.");
        return;
    }

    try {
        await heartRateCharacteristic.startNotifications();

        heartRateCharacteristic.addEventListener('characteristicvaluechanged', (event) => {
            const heartRate = parseHeartRate(event.target.value);
            document.querySelector('.showheartbeat').textContent = heartRate;
        });

    } catch (error) {
        console.error("Failed to show heart rate notifications:", error);
    }
}

function handleHeartRateNotification(event) {
    const heartRate = parseHeartRate(event.target.value);
    console.log(`Heart rate: ${heartRate}`);
}

function parseHeartRate(value) {
    const data = new DataView(value.buffer);
    const flags = data.getUint8(0);
    return flags & 0x01 ? data.getUint16(1, true) : data.getUint8(1);
}