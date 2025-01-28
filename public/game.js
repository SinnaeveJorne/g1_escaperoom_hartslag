

let socket = "";
let isadmin = false;
let kicked = false;
let gameroom = false;
let closepopup = true;
let getroomname = "";
let wachtwoord = "";
let gamestarted = false;


function init()
{
    initStartGameButton();

    // isUserInGame();
    // nextroom('/rooms');

    
}


async function isUserInGame()
{
      const response = await fetch('/isUserInARoom', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify()
      });
      const jsonresponse = await response.json();;

      if (jsonresponse.type == 'succes')
      {
          // socket = io("/room");
          // socketevents();
          // nextroom(`/room/${jsonresponse.message}`,jsonresponse.message);
      } 
      else {
          console.log(jsonresponse.message);
      }
}


function initStartGameButton() {
    const startGameButtons = document.querySelectorAll(".js-startgame");
    returnarrow("leavegame");
    if (startGameButtons) {
        startGameButtons.forEach(startGameButton => {
        startGameButton.addEventListener("click", async () => {
            
          loadanimation();

            const isReconnected = await reconnectPolarHeartRateMonitor(); // Perform the async operation
            
            removeanimation();   
            if (isReconnected) 
                {
                    nextroom('/rooms');
                } 
             else {
              showPopup({
                title: "Connecteer uw hartslagmeter",
                type: "connect",
                buttons: [
                  {
                    text: "Connect",
                    action: async () => {
                    
                      const isConnected = await connectPolarHeartRateMonitor();
                       
                      if (isConnected) {
                      nextroom('/rooms');
                      } else {
                        alert("Connection failed. Please try again.");
                      }
                    }
                  }
                ]
              });
            }
          });
          
        });
        }
        
    } 

   async function showPopup({ title, type, buttons,extra=null }) {
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
    
        else if(type == "create_room")
        {
            popupType.classList.add("c-popup__joinroom");
            popupType.innerHTML = `
            <form class="js-createroomform" method="POST">
            <div class="c-loginForm__inputdiv">
                <label class="c-label" for="roomname">
                    Kamer naam
                    <span class="c-input__span">
                        <input class="c-input js-input" type="text" name="roomname" id="roomname" required="">
                    </span>
                    <span class="c-input__errorSpan"></span>
                </label>
    
                <label class="c-label" for="roompassword">
                    Kamer wachtwoord (optioneel)
                    <span class="c-input__span">
                        <input class="c-input js-input" type="test" name="roompassword" id="roompassword" required="">
                    </span>
                    <span class="c-input__errorSpan"></span>
                </label>
            </div>
        </form>
            `;
    
    
        }
        else if(type == "join_room")
        {
          popupType.classList.add("c-popup__joinroom");
          popupType.innerHTML = `
          <form class="js-createroomform" method="POST">
          <div class="c-loginForm__inputdiv">
              <label class="c-label" for="roomname">
                  Kamer naam
                  <span class="c-input__span">
                      <input class="c-input js-input" type="text" name="roomname" id="roomname" value="${extra.name}" readonly>
                  </span>
                  <span class="c-input__errorSpan"></span>
              </label>
  
              <label class="c-label" for="roompassword">
                  Kamer wachtwoord
                  <span class="c-input__span">
                      <input class="c-input js-input" type="text" name="roompassword" id="roompassword" value="${extra.password ? extra.password : ''}" required="">
                  </span>
                  <span class="c-input__errorSpan"></span>
              </label>
          </div>
      </form>`
        }

        //prevent all forms from submitting
        document.querySelectorAll('form').forEach(form => {
          form.addEventListener('submit', (e) => {
            e.preventDefault();
          });
        });
      
        const buttonContainer = document.createElement("div");
        buttonContainer.className = "c-popup__buttons";
      
        buttons.forEach(({ text, action, classlist}) => {
          const button = document.createElement("button");
          button.textContent = text;
          if(classlist)
          {
          button.classList.add(classlist);
          }
          button.classList.add("c-button");
          button.classList.add("c-popup__button");
          button.addEventListener("click", async () => {
           await action();
            if(closepopup)
            {
              popupContainer.remove(); // Close popup on button click
            document.body.style.overflow = "auto"; 
            }
            else
            {
              closepopup = true;
            }
           
          });
          buttonContainer.appendChild(button);
        });
      
        const popupclose = `
        <button class="c-popup__close" onclick="document.querySelector('.c-popup__container').remove();document.body.style.overflow = 'auto';">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M25 7L7 25" stroke="#343330" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M25 25L7 7" stroke="#343330" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      `;
        popup.innerHTML += popupclose;
        popup.appendChild(popupTitle);
        popup.appendChild(popupType);
        popup.appendChild(buttonContainer);
        popupContainer.appendChild(popup);
        document.body.appendChild(popupContainer);
        document.body.style.overflow = "hidden";
        popupContainer.addEventListener("click", (event) => {
          if (event.target === popupContainer) {
            popupContainer.remove(); // Close popup on outside click
            document.body.style.overflow = "auto"; 
          }
        });
      }
      
      let heartRateCharacteristic = null;
    
      // Reconnect function
      async function reconnectPolarHeartRateMonitor() {
        const deviceId = localStorage.getItem("bluetoothDeviceId");
        if (!deviceId) {
          console.warn("No previously connected device found.");
          return false;
        }
      
        try {
          const devices = await navigator.bluetooth.getDevices();
          const device = devices.find(d => d.id === deviceId);
      
          if (!device) {
            console.error("Previously remembered device not found.");
            return false;
          }
      
          // Connect to the device
          await setupHeartRateNotifications(device);
          console.log("Reconnected to device:", device.name || "Unknown Device");
          return true;
        } catch (error) {
          console.error(`Reconnection error: ${error.message}`);
          return false;
        }
      }
      
      // Connect function
      async function connectPolarHeartRateMonitor() {
        try {
          const device = await navigator.bluetooth.requestDevice({
            filters: [{ services: ["heart_rate"] }],
            optionalServices: ["heart_rate"]
          });
      
          // Save the device ID for future reconnections
          localStorage.setItem("bluetoothDeviceId", device.id);
      
          // Show loading animation
          loadanimation();
      
          // Set up heart rate notifications
          await setupHeartRateNotifications(device);
      
          // Remove loading animation
          removeanimation();
          console.log("waarom ga ik niet weg!");
      
          console.log("Connected to device:", device.name || "Unknown Device");
          return true;
        } catch (error) {
          console.error(`Connection error: ${error.message}`);
          return false;
        }
      }
      
      // Function to set up heart rate notifications
      async function setupHeartRateNotifications(device) {
        try {
          const server = await device.gatt.connect();
          const service = await server.getPrimaryService("heart_rate");
          heartRateCharacteristic = await service.getCharacteristic("heart_rate_measurement");
      
          // Start notifications and add event listener for characteristic changes
          await heartRateCharacteristic.startNotifications();
          heartRateCharacteristic.addEventListener("characteristicvaluechanged", handleHeartRateNotification);

          device.addEventListener("gattserverdisconnected", () => {
            showPopup({
              title: "Connecteer uw hartslagmeter",
              type: "connect",
              buttons: [
                {
                  text: "Connect",
                  action: async () => {
                    const isConnected = await connectPolarHeartRateMonitor();
                    if (isConnected) {
                    
                    } else {
                     closepopup = false;
                    }
                  }
                }
              ]
            });      
          });
      
          console.log("Heart rate notifications enabled.");
        } catch (error) {
          console.error("Failed to set up heart rate notifications:", error);
          throw error;
        }
      }
      
      // Show real-time heartbeat data
      async function showheartBeat() {
        if (!heartRateCharacteristic) {
          console.error("Heart rate characteristic is not initialized.");
          return;
        }
      
        try {
          await heartRateCharacteristic.startNotifications();
      
          heartRateCharacteristic.addEventListener("characteristicvaluechanged", (event) => {
            const heartRate = parseHeartRate(event.target.value);
          });

      
          console.log("Real-time heart rate monitoring started.");
        } catch (error) {
          console.error("Failed to show heart rate notifications:", error);
        }
      }
      
      // Handle heart rate notifications
      function handleHeartRateNotification(event) {
        const heartRate = parseHeartRate(event.target.value);
        
        if(document.querySelector('.js-currentheartbeat'))
          {
            document.querySelector('.js-currentheartbeat').textContent = heartRate;
          }
      
        // Emit heart rate via socket.io
        if (socket !== "") {
          socket.emit("heartRate", heartRate);
        }
        

      }
      
      // Parse heart rate value from the characteristic data
      function parseHeartRate(value) {
        const data = new DataView(value.buffer);
        const flags = data.getUint8(0);
        return flags & 0x01 ? data.getUint16(1, true) : data.getUint8(1);
      }
      

      function loadanimation() {
        const loadcontainer = document.createElement("div");
        loadcontainer.className = "c-popup__container";     // Append the element to the body
        const loader = document.createElement("div");
        loader.className = "loader";
        loadcontainer.appendChild(loader);
        document.body.appendChild(loadcontainer);
    }
    
    function removeanimation() {
        const loadcontainer = document.querySelector('.c-popup__container');
        if(loadcontainer) {
          document.querySelectorAll('.c-popup__container').forEach(loadcontainer => {
            loadcontainer.remove();
          });
        }
    }
    
   async function nextroom(room,roomname = null)
    {

        try {
            // Fetch the HTML content from the server
            const response = await fetch(room, {
                method: 'GET',
            });
    
            if (!response.ok) {
              const errorData = await response.json();
              console.log(errorData);
                throw new Error(errorData.message);
                

            }
            else
            {
              const html = await response.text();
              //check if html includes c-login
              if(html.includes('c-login'))
              {
                window.location.href = '/login';
                return;
              }

              console.log("test");
              console.log(response);
          
             if(room  != '/getgame')
             {
              document.body.innerHTML = html;
             }
             else
             {
              if(gamestarted == false)
              {
                document.body.innerHTML = "";
                const progressbar = document.createElement('div');
                progressbar.classList.add('c-gamebalk');
                progressbar.innerHTML = `
                <div class="container">
                <div class="c-gamebalk__level">
                  <h3>1</h3>
                </div>
                <div class="c-gamebalk__progress">
                <div class="c-gamebalk__progress__bar"></div>
                </div>
                </div>
                `;
                 document.body.appendChild(progressbar);        
                const gamecontainer = document.createElement('div');
                gamecontainer.classList.add('container','c-main__game');
                document.body.appendChild(gamecontainer);

                const footer = document.createElement('footer');
                footer.classList.add('c-footer');
                footer.innerHTML = `
                <button class="c-button c-w50 js-gameactionbutton">start het spel</button>
                `;
                document.body.appendChild(footer);
                
                document.querySelector('.c-main__game').innerHTML = html;
                gamestarted = true;

       

          document.querySelector('.c-main__game').innerHTML += `<div class="c-gameinfo">
            <div>
              <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.75 15.9375H8.4375L10.3125 13.125L14.0625 18.75L15.9375 15.9375H18.75" stroke="#E63946" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path>
                <path d="M2.85107 11.25C3.02404 9.70297 3.76115 8.27398 4.92146 7.23625C6.08177 6.19852 7.58386 5.62487 9.14053 5.625C11.7878 5.625 14.0554 7.06758 14.9999 9.375C15.9444 7.06758 18.212 5.625 20.8593 5.625C22.5376 5.625 24.1472 6.29171 25.3339 7.47846C26.5207 8.66522 27.1874 10.2748 27.1874 11.9531C27.1874 19.6875 14.9999 26.25 14.9999 26.25C14.9999 26.25 10.8562 24.0234 7.40147 20.625" stroke="#E63946" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path>
              </svg>
              <p class="js-currentheartbeat">0</p>
            </div>
            
          </div>`

              }
              else
              {
                document.querySelector('.c-main__game').innerHTML = html;
              }
             }
               if(room == '/rooms')
                  {
                      rooms();
                  }
  
              else if(room.includes('/room/'))
              {
                document.body.classList.add('oplipicbackground');
                document.body.classList.add('c-body__game');
                  Room(roomname);
                  returnarrow("leaveroom");
              }

              else if(room == '/getgame')
              {
                startgame();
              }
              
            }
            
    
        } catch (error) {
            console.error(error);
        }
    }
    

    
document.addEventListener('DOMContentLoaded', init);


function rooms(){ // Connect to the namespace '/room'
  socket = io("/room");
  isadmin = false;
  gameroom = false;
  gamestarted = false;
  socketevents();
  returnarrow("leavegame");
  const searchInput = document.querySelector('.js-roomssearch');
  searchInput.addEventListener('input', () => {
    const filter = searchInput.value.toLowerCase();
    document.querySelectorAll('.c-room').forEach((room) => {
      const roomTitle = room.querySelector('.c-room__title').textContent.toLowerCase();
      if (roomTitle.includes(filter)) 
      {
        room.style.display = '';
      }
      else
      {
        room.style.display = 'none';
      }
    });
  });
  
document.querySelector('.js-makeroom').addEventListener('click', async () => {
    showPopup({
        title: "Maak een kamer",
        type: "create_room",
        buttons: [
          {
            text: "Create Room",
            action: async() => {
                const formData = new FormData(document.querySelector('.js-createroomform'));
                const data = Object.fromEntries(formData);
                
              
                    const response = await fetch('/createroom', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data)
                    });
                    const jsonresponse = await response.json();;

                    if (jsonresponse.type == 'succes')
                    {
                        wachtwoord = formData.get('roompassword');
                        nextroom(`/room/${jsonresponse.message}`,jsonresponse.message);
                    } 
                    else {
                       closepopup = false;
                       if(jsonresponse.input == "roomname")
                       {
                        // select input with name roomname then select his errorspan
                        let roomnameinput = document.querySelector('input[name="roomname"]')
                        console.log(roomnameinput);
                        let errorspan = roomnameinput.closest('.c-label').querySelector('.c-input__errorSpan');
                        errorspan.textContent = jsonresponse.message;
                        errorspan.style.opacity = 1;
                        roomnameinput.classList.add('c-input--error');
                        
                        roomnameinput.addEventListener('input', () => {
                          errorspan.style.opacity = 0;
                          roomnameinput.classList.remove('c-input--error');
                        });
                        
                       }
                        console.log(jsonresponse.message);
                    }
                
               
            }
          }
        ]
      });
});

document.querySelectorAll('.js-joinroom').forEach(joinroombutton => {
  joinroombutton.addEventListener('click', async () => {
  if(joinroombutton.dataset.locked == "true")
  {
    showPopup({
      title: "Kamer gegevens",
      type: "join_room",
      buttons: [
        {
          text: "Speel mee!",
          action: async() => {
              const formData = new FormData(document.querySelector('.js-createroomform'));
              const data = Object.fromEntries(formData);
              
              console.log("doe ik dit");
                  const response = await fetch('/joinroom', {
                      method: 'POST',
                      headers: {
                          'Content-Type': 'application/json'
                      },
                      body: JSON.stringify(data)
                  });
                  const jsonresponse = await response.json();;
                  console.log(jsonresponse);

                  if (jsonresponse.type == 'succes')
                  {
                     wachtwoord = formData.get('roompassword');
                      nextroom(`/room/${jsonresponse.message}`,jsonresponse.message);
                  } 
                  else {
                      console.log(jsonresponse.message);
                  }
              
             
          }
        }
      ],
      extra: {name: joinroombutton.dataset.name}
    });
  }
  else
  {
    nextroom(`/room/${joinroombutton.dataset.name}`,joinroombutton.dataset.name);
  }
});
})

}


async function Room(roomname)
{
if(document.querySelector('.js-room'))
{
const roomid = roomname;
socket.emit("joinroom", roomid); 
getroomname = roomname;
if(document.querySelector('.js-changepassword'))
{
  if(wachtwoord != "")
    {
      document.querySelector('.js-changepassword').innerHTML = `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M26 10H22V7C22 5.4087 21.3679 3.88258 20.2426 2.75736C19.1174 1.63214 17.5913 1 16 1C14.4087 1 12.8826 1.63214 11.7574 2.75736C10.6321 3.88258 10 5.4087 10 7V10H6C5.46957 10 4.96086 10.2107 4.58579 10.5858C4.21071 10.9609 4 11.4696 4 12V26C4 26.5304 4.21071 27.0391 4.58579 27.4142C4.96086 27.7893 5.46957 28 6 28H26C26.5304 28 27.0391 27.7893 27.4142 27.4142C27.7893 27.0391 28 26.5304 28 26V12C28 11.4696 27.7893 10.9609 27.4142 10.5858C27.0391 10.2107 26.5304 10 26 10ZM17 19.8288V23C17 23.2652 16.8946 23.5196 16.7071 23.7071C16.5196 23.8946 16.2652 24 16 24C15.7348 24 15.4804 23.8946 15.2929 23.7071C15.1054 23.5196 15 23.2652 15 23V19.8288C14.3328 19.5929 13.7704 19.1287 13.4124 18.5183C13.0543 17.9079 12.9235 17.1905 13.0432 16.493C13.1629 15.7955 13.5253 15.1628 14.0663 14.7066C14.6074 14.2505 15.2923 14.0003 16 14.0003C16.7077 14.0003 17.3926 14.2505 17.9337 14.7066C18.4747 15.1628 18.8371 15.7955 18.9568 16.493C19.0765 17.1905 18.9457 17.9079 18.5876 18.5183C18.2296 19.1287 17.6672 19.5929 17 19.8288ZM20 10H12V7C12 5.93913 12.4214 4.92172 13.1716 4.17157C13.9217 3.42143 14.9391 3 16 3C17.0609 3 18.0783 3.42143 18.8284 4.17157C19.5786 4.92172 20 5.93913 20 7V10Z" fill="#343330"/>
</svg>
`;
    }

    else{
      document.querySelector('.js-changepassword').innerHTML = 
      `
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M26 10H12V7C12 5.93913 12.4214 4.92172 13.1716 4.17157C13.9217 3.42143 14.9391 3 16 3C17.9213 3 19.65 4.375 20.02 6.19875C20.0749 6.45646 20.2294 6.68207 20.4497 6.82655C20.6701 6.97103 20.9385 7.0227 21.1968 6.97032C21.455 6.91795 21.6822 6.76577 21.8288 6.54686C21.9755 6.32795 22.0298 6.06 21.98 5.80125C21.415 3.01875 18.9 1 16 1C14.4092 1.00165 12.884 1.63433 11.7592 2.75919C10.6343 3.88405 10.0017 5.40921 10 7V10H6C5.46957 10 4.96086 10.2107 4.58579 10.5858C4.21071 10.9609 4 11.4696 4 12V26C4 26.5304 4.21071 27.0391 4.58579 27.4142C4.96086 27.7893 5.46957 28 6 28H26C26.5304 28 27.0391 27.7893 27.4142 27.4142C27.7893 27.0391 28 26.5304 28 26V12C28 11.4696 27.7893 10.9609 27.4142 10.5858C27.0391 10.2107 26.5304 10 26 10ZM17 19.8288V23C17 23.2652 16.8946 23.5196 16.7071 23.7071C16.5196 23.8946 16.2652 24 16 24C15.7348 24 15.4804 23.8946 15.2929 23.7071C15.1054 23.5196 15 23.2652 15 23V19.8288C14.3328 19.5929 13.7704 19.1287 13.4124 18.5183C13.0543 17.9079 12.9235 17.1905 13.0432 16.493C13.1629 15.7955 13.5253 15.1628 14.0663 14.7066C14.6074 14.2505 15.2923 14.0003 16 14.0003C16.7077 14.0003 17.3926 14.2505 17.9337 14.7066C18.4747 15.1628 18.8371 15.7955 18.9568 16.493C19.0765 17.1905 18.9457 17.9079 18.5876 18.5183C18.2296 19.1287 17.6672 19.5929 17 19.8288Z" fill="#343330"/>
</svg>
      `
    }

  document.querySelector('.js-changepassword').addEventListener('click', async () => {
  showPopup({
    title: "Kamer gegevens",
    type: "join_room",
    buttons: [
      {
        text: "Wijzig wachtwoord",
        action: async() => {
            const formData = new FormData(document.querySelector('.js-createroomform'));
            const data = Object.fromEntries(formData);
            
                const response = await fetch('/changepassword', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
                const jsonresponse = await response.json();;
                console.log(jsonresponse);

                if (jsonresponse.type == 'succes')
                {
                  socket.emit("changepassword", data.roompassword);
                } 
                else {
                    console.log(jsonresponse.message);
                }
            
           
        }
      }
    ],
    extra: {name: getroomname, password: wachtwoord}
  });
});
}

const startgamebutton = document.querySelector('.js-startgame');
if(startgamebutton)
{
  startgamebutton.addEventListener('click', async () => {
    socket.emit("startgame");
  });
}
}

}


function returnarrow(action)
{
  if(action == "leaveroom")
  {
  document.querySelector('.js-returnarrow').addEventListener('click', () => {
    showPopup({
      title: "Ben je het zeker dat je deze kamer wilt verlaten?",
      type: "confirm",
      buttons: [
        {
          text: "Ja",
          action: () => {
            socket.disconnect();
            setTimeout(() => {
              nextroom('/rooms');
              kicked = true;
              document.body.classList.remove('oplipicbackground');
            }, 200);
           
          },
          classlist: "c-button--red",
        },
        {
          text: "Nee",
          action: () => {
            // Do nothing
          },
          classlist: "c-button--green",
        }
      ]
    });
  });
}

else if(action == "leavegame")
{
  document.querySelector('.js-returnarrow').addEventListener('click', () => {
    showPopup({
      title: "Ben je zeker dat je wilt terug keren naar het startscherm?",
      type: "confirm",
      buttons: [
        {
          text: "Ja",
          action: () => {
            window.location.href = '/home';
          },
          classlist: "c-button--red",
        },
        {
          text: "Nee",
          action: () => {
            // Do nothing
          },
          classlist: "c-button--green",
        }
      ]
    });
    return;
  });
}

}

function createRoom(user,adminid = false)
{
  const userslist = document.querySelector('.js-room-users')
  if(userslist){

  const userdiv = document.createElement('div');
  userdiv.dataset.id = user.id;
  userdiv.classList.add('c-personcard', 'c-lobbyperson__card');
  userdiv.innerHTML = `
  <div class="c-personcard__imgdiv">
  <img src="../img/profile_1.png" alt="profiel" class="c-personcard__img">
  </div>
  <div class="c-personcard__info">
  <h4 class="c-personcard__title">${user.userName}</h3>
  <div class="c-personcard__heartbeat">
 <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M3.75 15.9375H8.4375L10.3125 13.125L14.0625 18.75L15.9375 15.9375H18.75" stroke="#E63946" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M2.85107 11.25C3.02404 9.70297 3.76115 8.27398 4.92146 7.23625C6.08177 6.19852 7.58386 5.62487 9.14053 5.625C11.7878 5.625 14.0554 7.06758 14.9999 9.375C15.9444 7.06758 18.212 5.625 20.8593 5.625C22.5376 5.625 24.1472 6.29171 25.3339 7.47846C26.5207 8.66522 27.1874 10.2748 27.1874 11.9531C27.1874 19.6875 14.9999 26.25 14.9999 26.25C14.9999 26.25 10.8562 24.0234 7.40147 20.625" stroke="#E63946" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  <p>--</p>
  </div>
  </div>
  `;
  if(isadmin)
  {
  userdiv.innerHTML += `
  <a href="#" class="c-removebutton js-kickuser">
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M27 7H5" stroke="#343330" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M13 13V21" stroke="#343330" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M19 13V21" stroke="#343330" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M25 7V26C25 26.2652 24.8946 26.5196 24.7071 26.7071C24.5196 26.8946 24.2652 27 24 27H8C7.73478 27 7.48043 26.8946 7.29289 26.7071C7.10536 26.5196 7 26.2652 7 26V7" stroke="#343330" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M21 7V5C21 4.46957 20.7893 3.96086 20.4142 3.58579C20.0391 3.21071 19.5304 3 19 3H13C12.4696 3 11.9609 3.21071 11.5858 3.58579C11.2107 3.96086 11 4.46957 11 5V7" stroke="#343330" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  </a>
`;
}
userslist.appendChild(userdiv);

if(isadmin){
const kickuserbutton = document.querySelector('.c-personcard[data-id="'+user.id+'"] .js-kickuser');
kickuserbutton.addEventListener('click', async () => {
  showPopup({
    title: "Ben je zeker dat je deze user wil verwijderen?",
    type: "confirm",
    buttons: [
      {
        text: "Ja",
        action: () => {
          socket.emit("kickuser", user.id);
        },
        classlist: "c-button--red",
      },
      {
        text: "Nee",
        action: () => {
          // Do nothing
        },
        classlist: "c-button--green",
      }
    ]
  });
});
  }

  if(adminid)
  {
    //get the profile with the adminid and add the admin icon
    if(user.id == adminid)
    {
      const admindiv = document.querySelector('.c-personcard[data-id="'+adminid+'"]').querySelector('.c-personcard__imgdiv');
      admindiv.innerHTML += `<svg class="c-personcard__admincrown width="26" height="25" viewBox="0 0 26 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20.08 12.2095C19.8072 12.0894 19.6807 11.9443 19.6701 11.7121C19.6598 11.4912 19.7937 11.3588 19.9595 11.2561C20.0467 11.2018 20.1441 11.1661 20.2458 11.1514C20.7821 11.0812 21.3186 11.0064 21.8575 10.9658C22.0316 10.9617 22.2033 11.0078 22.3521 11.0985C22.4211 11.1402 22.4793 11.1977 22.5218 11.2662C22.5645 11.3348 22.5902 11.4124 22.5971 11.4928C22.6039 11.5732 22.5916 11.6541 22.5613 11.7288C22.5309 11.8035 22.4833 11.8701 22.4223 11.9229C22.2683 12.0564 22.0806 12.145 21.8796 12.1791C21.3877 12.2359 20.89 12.2462 20.3941 12.2615C20.2877 12.2572 20.1821 12.2398 20.08 12.2095Z" fill="#C49C48"/>
      <path d="M7.19544 6.97546C7.13183 6.8877 6.96868 6.73044 6.89125 6.53827C6.76859 6.22448 6.67553 5.89994 6.61323 5.56885C6.57723 5.39839 6.59314 5.22108 6.65892 5.05978C6.79464 4.77262 7.19424 4.704 7.45457 4.94812C7.67361 5.14413 7.85175 5.3815 7.97871 5.64661C8.10569 5.91171 8.17897 6.19932 8.19439 6.49285C8.21584 6.9931 7.75301 7.24735 7.19544 6.97546Z" fill="#C49C48"/>
      <path d="M20.8869 6.25282C21.2971 6.43816 21.4027 6.8572 21.1743 7.14163C21.104 7.23553 21.0115 7.31051 20.905 7.3596C20.4965 7.51852 20.0857 7.67615 19.6651 7.79728C19.4609 7.85594 19.2329 7.86515 19.045 7.68821C18.8263 7.48221 18.7992 7.21211 19.0014 6.99298C19.0585 6.92574 19.1282 6.87023 19.2064 6.8294C19.605 6.6472 20.0024 6.45904 20.4125 6.30597C20.5811 6.24304 20.7806 6.26305 20.8869 6.25282Z" fill="#C49C48"/>
      <path d="M12.9268 4.42454C12.7949 4.65016 12.6157 4.77975 12.3553 4.78475C12.1118 4.78931 11.9695 4.64407 11.8939 4.44332C11.724 4.01995 11.6607 3.56128 11.7098 3.10771C11.7496 2.78948 11.9388 2.59508 12.1975 2.56264C12.4725 2.52835 12.6967 2.65386 12.8001 2.96495C12.9576 3.44002 13.0484 3.92857 12.9268 4.42454Z" fill="#C49C48"/>
      <path d="M21.9293 16.0092C22.0155 15.8056 22.0712 15.5905 22.0945 15.3706C22.1175 15.0754 22.0286 14.8269 21.8451 14.6729C21.6596 14.5168 21.3964 14.4726 21.1049 14.5474C20.8849 14.6037 20.6628 14.6735 20.4483 14.7409C20.3601 14.7684 20.2716 14.7967 20.1838 14.8233L19.012 15.1811C18.0559 15.4729 17.0994 15.7646 16.1422 16.0558C16.0747 16.0743 16.0062 16.0882 15.9369 16.0974C15.9085 16.1019 15.8795 16.106 15.8497 16.1118C15.8297 16.1152 15.8093 16.114 15.7899 16.1083C15.7704 16.1027 15.7525 16.0928 15.7375 16.0791C15.7223 16.0655 15.7106 16.0487 15.703 16.0297C15.6956 16.0108 15.6926 15.9903 15.6943 15.9701C15.7332 15.4861 15.7751 15.0059 15.8162 14.5274C15.9077 13.4644 16.002 12.3641 16.0666 11.2873C16.1558 9.78868 16.1916 8.3116 16.2182 6.93888C16.215 6.60271 16.1539 6.26963 16.0375 5.95425C15.9366 5.66236 15.7312 5.54961 15.3714 5.59117C15.0789 5.62378 14.8715 5.81772 14.6521 6.02274L14.6317 6.04173C14.4135 6.24436 14.1962 6.44803 13.9795 6.65268C13.3196 7.27173 12.6369 7.91324 11.9451 8.52153C10.8992 9.44173 9.80898 10.3475 8.78152 11.1965C8.43277 11.4847 8.0746 11.7511 7.69558 12.0333C7.52317 12.162 7.34742 12.2927 7.16957 12.4285C7.15513 12.4396 7.1386 12.4476 7.12097 12.452C7.10334 12.4564 7.08497 12.4571 7.06705 12.4541C7.04913 12.451 7.03203 12.4443 7.01681 12.4344C7.00162 12.4244 6.98861 12.4114 6.97868 12.3962L6.73792 12.0284C6.58456 11.7959 6.4449 11.5843 6.30683 11.3714C6.11219 11.0724 5.91768 10.7731 5.72327 10.4735C5.3427 9.88631 4.96093 9.30015 4.57799 8.71506C4.49787 8.57135 4.37911 8.45286 4.23509 8.37324C4.12364 8.32631 3.99894 8.32147 3.8842 8.35965C3.55865 8.44497 3.38204 8.65414 3.3447 8.99979C3.32014 9.22237 3.31836 9.45457 3.31592 9.67958L3.3164 9.68923C3.31413 9.87172 3.31757 10.0586 3.31999 10.2393C3.32463 10.5801 3.3303 10.9335 3.30558 11.2811C3.29082 11.5014 3.27619 11.7221 3.26166 11.9433C3.16855 13.3573 3.07185 14.8192 2.79395 16.2425C2.69944 16.7252 2.84246 17.0752 3.23121 17.3129C3.33796 17.3784 3.44455 17.4448 3.54999 17.5108C3.97934 17.792 4.42771 18.043 4.89198 18.2618C5.95784 18.7348 7.05317 19.1901 8.11257 19.6309C8.57877 19.8246 9.04428 20.019 9.50925 20.2141C10.2722 20.5352 11.0347 20.8574 11.7965 21.1809L12.672 21.5508C12.7424 21.5811 12.8133 21.6108 12.8846 21.6416C12.9614 21.6749 13.0395 21.7079 13.1175 21.7408C13.3881 21.8555 13.6599 21.9674 13.9311 22.0804C14.5975 22.3573 15.2851 22.6428 15.9538 22.9451C16.2624 23.0848 16.529 23.077 16.7933 22.9219C16.9802 22.8048 17.148 22.6597 17.2909 22.4914L17.5078 22.2473C18.3926 21.2522 19.3073 20.2222 20.0785 19.1088C20.1536 19.0006 20.2289 18.8935 20.3038 18.7852C20.9097 17.9169 21.5382 17.0174 21.9293 16.0092ZM16.2253 21.3865C16.208 21.4042 16.1861 21.4165 16.162 21.4222C16.138 21.4278 16.1127 21.4265 16.0895 21.4185C15.9884 21.3848 15.8835 21.3511 15.7778 21.3173C15.5356 21.24 15.2843 21.1596 15.0391 21.0596C14.6369 20.8953 14.2307 20.7233 13.8389 20.5557C13.3156 20.3342 12.7749 20.1039 12.2381 19.8925C11.6124 19.6469 10.9687 19.4125 10.3467 19.186C9.98917 19.056 9.63158 18.9257 9.2756 18.7922C8.75524 18.598 8.32159 18.4347 7.87769 18.2475C6.78374 17.7869 5.67515 17.3117 4.60291 16.8526L4.0717 16.6251L4.05961 16.6195C4.01134 16.5961 3.9654 16.5681 3.92235 16.5361C3.90775 16.5255 3.89323 16.5149 3.8786 16.5065C3.85726 16.493 3.84031 16.4735 3.82966 16.4506C3.81906 16.4276 3.81523 16.4021 3.81864 16.3771L4.50584 11.209C4.50915 11.1823 4.52066 11.1572 4.53873 11.1371C4.55681 11.1171 4.58059 11.1032 4.60689 11.0971C4.63318 11.091 4.6607 11.0932 4.6857 11.1034C4.71073 11.1134 4.73203 11.131 4.74674 11.1536L4.8759 11.3478C4.96149 11.4764 5.04041 11.5942 5.11694 11.7128C5.2259 11.8813 5.33514 12.0492 5.4447 12.2165C5.71544 12.633 5.99652 13.063 6.25877 13.4959C6.42657 13.7729 6.61075 13.9341 6.80468 13.9746C6.9942 14.0144 7.20794 13.9482 7.45666 13.7723L7.67976 13.6155C8.10092 13.3197 8.53674 13.0132 8.93493 12.6806C10.255 11.5747 11.5901 10.4407 12.881 9.34371C13.3903 8.91079 13.9002 8.47814 14.4106 8.04575C14.4537 8.00885 14.497 7.97376 14.5581 7.92521L14.6769 7.82929C14.6964 7.81297 14.7203 7.80283 14.7456 7.80009C14.7709 7.79739 14.7964 7.80219 14.8189 7.81395C14.8417 7.82507 14.8608 7.84252 14.8739 7.86419C14.887 7.88587 14.8935 7.91085 14.8928 7.93615C14.8851 8.20246 14.8815 8.46188 14.8781 8.71656C14.8703 9.27028 14.8633 9.79289 14.8204 10.3196C14.7212 11.5271 14.6043 12.7517 14.4918 13.9374C14.4275 14.6164 14.3639 15.2961 14.3011 15.9763C14.2657 16.3216 14.2503 16.6687 14.2547 17.0158C14.2514 17.1402 14.2774 17.2636 14.3306 17.376C14.3839 17.4885 14.4628 17.5868 14.5611 17.6632C14.7572 17.8047 15.0191 17.8346 15.2992 17.7487C15.725 17.6182 16.1505 17.4845 16.5755 17.3516C16.9485 17.2346 17.3212 17.1181 17.6937 17.0022C18.1672 16.8567 18.6415 16.7124 19.1163 16.5692L19.7525 16.377C19.776 16.3699 19.8009 16.3693 19.8245 16.3755C19.8484 16.3816 19.8699 16.3942 19.8871 16.4117L19.9553 16.4828C19.9762 16.5044 19.9893 16.5326 19.992 16.5627C19.9948 16.5928 19.9873 16.6229 19.9707 16.648C19.003 18.1061 17.8014 19.8099 16.2253 21.3865Z" fill="#C49C48"/>
      </svg>`;
    }
  }
}
}


function socketevents()
{
  socket.on('loadusers', (users) => {
    let adminid = users.adminid;
    users.users.forEach(user => {
      createRoom(user,adminid);
      document.querySelector('.js-roomcount').textContent =  document.querySelectorAll('.c-personcard').length + '/8';
    });
  });

  socket.on('userjoined', (user) => {
    createRoom(user);
    document.querySelector('.js-roomcount').textContent =  document.querySelectorAll('.c-personcard').length + '/8';
  });

  socket.on('userleft', (user) => {
      const userdiv = document.querySelector(`.c-personcard[data-id="${user.id}"]`);
      console.log(user);
      userdiv.remove();
      document.querySelector('.js-roomcount').textContent =  document.querySelectorAll('.c-personcard').length + '/8';
  });

  socket.on('heartRate', (heartbeat) => {
    const userdiv = document.querySelector(`.c-personcard[data-id="${heartbeat.id}"]`);
    if (userdiv) {
        userdiv.querySelector('p').textContent = heartbeat.heartbeat;
    }

   
});


  socket.on('kicked', async() => {
    await nextroom('/rooms');
    kicked = true;
    showPopup({
      title: "Je bent verwijderd uit de kamer",
      type: "melding",
      buttons: [
        {
          text: "Begrepen",
          action: async () => {
          }
        }
      ]
    });
  })

  socket.on('roomUpdate',(rooms) => {
    document.querySelectorAll('.js-joinroom').forEach(room => {
      if(room.dataset.name == rooms.name)
      {
        const roomcount = room.closest('.c-room').querySelector('.c-room__players');
        roomcount.textContent = rooms.amount+'/8 spelers';
      }
    });
  })
  
  socket.on('deleteRoom',(room) => {
    document.querySelectorAll('.js-joinroom').forEach(roombutton => {
  
      if(roombutton.dataset.name == room.name)
      {
        roombutton.closest('.c-room').remove();
      }
    });
  })
  
  socket.on('roomcreated', (room) => {
    if (document.querySelector('.js-rooms')) {
        const roomdiv = document.createElement('div');
        roomdiv.classList.add('c-room');

        // Create the room title with a lock icon if the room has a password
        let roomTitleHtml = `
            <h3 class="c-room__title">${room.data.name}</h3>
        `;
        
        if (room.haspassword) {
            roomTitleHtml = `
                <h3 class="c-room__title">${room.data.name}
                    <svg class="c-room__lock" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M26 10H22V7C22 5.4087 21.3679 3.88258 20.2426 2.75736C19.1174 1.63214 17.5913 1 16 1C14.4087 1 12.8826 1.63214 11.7574 2.75736C10.6321 3.88258 10 5.4087 10 7V10H6C5.46957 10 4.96086 10.2107 4.58579 10.5858C4.21071 10.9609 4 11.4696 4 12V26C4 26.5304 4.21071 27.0391 4.58579 27.4142C4.96086 27.7893 5.46957 28 6 28H26C26.5304 28 27.0391 27.7893 27.4142 27.4142C27.7893 27.0391 28 26.5304 28 26V12C28 11.4696 27.7893 10.9609 27.4142 10.5858C27.0391 10.2107 26.5304 10 26 10ZM17 19.8288V23C17 23.2652 16.8946 23.5196 16.7071 23.7071C16.5196 23.8946 16.2652 24 16 24C15.7348 24 15.4804 23.8946 15.2929 23.7071C15.1054 23.5196 15 23.2652 15 23V19.8288C14.3328 19.5929 13.7704 19.1287 13.4124 18.5183C13.0543 17.9079 12.9235 17.1905 13.0432 16.493C13.1629 15.7955 13.5253 15.1628 14.0663 14.7066C14.6074 14.2505 15.2923 14.0003 16 14.0003C16.7077 14.0003 17.3926 14.2505 17.9337 14.7066C18.4747 15.1628 18.8371 15.7955 18.9568 16.493C19.0765 17.1905 18.9457 17.9079 18.5876 18.5183C18.2296 19.1287 17.6672 19.5929 17 19.8288ZM20 10H12V7C12 5.93913 12.4214 4.92172 13.1716 4.17157C13.9217 3.42143 14.9391 3 16 3C17.0609 3 18.0783 3.42143 18.8284 4.17157C19.5786 4.92172 20 5.93913 20 7V10Z" fill="#343330"/>
                    </svg>
                </h3>
            `;
        }
        
        // Add room title and players count
        roomdiv.innerHTML = `
        <div class="c-room__info">
            ${roomTitleHtml}
            <p class="c-room__players">1/8 spelers</p>
        </div>
        `;

        // Create the "Join" button
        const joinButton = document.createElement('a');
        joinButton.classList.add('c-button', 'c-room__button', 'js-joinroom');
        joinButton.dataset.name = room.data.name;
        
        if (room.haspassword) {
            joinButton.dataset.locked = true;
            joinButton.innerHTML = 'Speel mee';
        } else {
            joinButton.innerHTML = 'Speel mee';
        }
        
        roomdiv.appendChild(joinButton);

        const searchInput = document.querySelector('.js-roomssearch');
        if(searchInput.value != "")
        {
          const filter = searchInput.value.toLowerCase();
          const roomTitle = room.data.name.toLowerCase();
          if (!roomTitle.includes(filter)) {
            roomdiv.style.display = "none";
          }
        }

        // Append the room to the rooms list
        document.querySelector('.js-rooms').appendChild(roomdiv);

        const joinroombutton = document.querySelector('.js-joinroom[data-name="'+room.data.name+'"]');
        joinroombutton.addEventListener('click', async () => {
          if(joinroombutton.dataset.locked == "true")
          {
            showPopup({
              title: "Kamer gegevens",
              type: "join_room",
              buttons: [
                {
                  text: "Speel mee!",
                  action: async() => {
                      const formData = new FormData(document.querySelector('.js-createroomform'));
                      const data = Object.fromEntries(formData);
                      
                      console.log("doe ik dit");
                          const response = await fetch('/joinroom', {
                              method: 'POST',
                              headers: {
                                  'Content-Type': 'application/json'
                              },
                              body: JSON.stringify(data)
                          });
                          const jsonresponse = await response.json();;
                          console.log(jsonresponse);
        
                          if (jsonresponse.type == 'succes')
                          {
                            wachtwoord = formData.get('roompassword');
                              nextroom(`/room/${jsonresponse.message}`,jsonresponse.message);
                          } 
                          else {
                              console.log(jsonresponse.message);
                          }
                      
                     
                  }
                }
              ],
              extra: {name: joinroombutton.dataset.name}
            });
          }
          else
          {
            nextroom(`/room/${joinroombutton.dataset.name}`,joinroombutton.dataset.name);
          }
        });
    }
    
});


  socket.on('disconnected', async(message) => {
    await nextroom('/rooms');
    kicked = true;
    showPopup({
      title: message,
      type: "melding",
      buttons: [
        {
          text: "Begrepen",
          action: async () => {
          }
        }
      ]
    });
  });

  socket.on("changepassword", async(password) => {
    wachtwoord = password.password;
    //set delay .3seconds
    await new Promise((resolve) => setTimeout(resolve, 300));
    console.log(password);
  });

  socket.on("setroompassword", async(roomname) => {
    try
    {
    const joinroombutton = document.querySelector('.js-joinroom[data-name="'+roomname.roomname+'"]');
    //check if there is a roomlock svg 
    const lock = joinroombutton.closest('.c-room').querySelector('.c-room__lock');
    console.log(lock);

    if(joinroombutton)
    {
      joinroombutton.dataset.locked = true;
      if(!lock){
        joinroombutton.closest('.c-room').querySelector('.c-room__title').innerHTML +=
      `<svg class="c-room__lock" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M26 10H22V7C22 5.4087 21.3679 3.88258 20.2426 2.75736C19.1174 1.63214 17.5913 1 16 1C14.4087 1 12.8826 1.63214 11.7574 2.75736C10.6321 3.88258 10 5.4087 10 7V10H6C5.46957 10 4.96086 10.2107 4.58579 10.5858C4.21071 10.9609 4 11.4696 4 12V26C4 26.5304 4.21071 27.0391 4.58579 27.4142C4.96086 27.7893 5.46957 28 6 28H26C26.5304 28 27.0391 27.7893 27.4142 27.4142C27.7893 27.0391 28 26.5304 28 26V12C28 11.4696 27.7893 10.9609 27.4142 10.5858C27.0391 10.2107 26.5304 10 26 10ZM17 19.8288V23C17 23.2652 16.8946 23.5196 16.7071 23.7071C16.5196 23.8946 16.2652 24 16 24C15.7348 24 15.4804 23.8946 15.2929 23.7071C15.1054 23.5196 15 23.2652 15 23V19.8288C14.3328 19.5929 13.7704 19.1287 13.4124 18.5183C13.0543 17.9079 12.9235 17.1905 13.0432 16.493C13.1629 15.7955 13.5253 15.1628 14.0663 14.7066C14.6074 14.2505 15.2923 14.0003 16 14.0003C16.7077 14.0003 17.3926 14.2505 17.9337 14.7066C18.4747 15.1628 18.8371 15.7955 18.9568 16.493C19.0765 17.1905 18.9457 17.9079 18.5876 18.5183C18.2296 19.1287 17.6672 19.5929 17 19.8288ZM20 10H12V7C12 5.93913 12.4214 4.92172 13.1716 4.17157C13.9217 3.42143 14.9391 3 16 3C17.0609 3 18.0783 3.42143 18.8284 4.17157C19.5786 4.92172 20 5.93913 20 7V10Z" fill="#343330"></path>
    </svg>`;
      }
    }
  }
    catch(e)
    {

    }
    if(document.querySelector('.js-changepassword'))
    {
    document.querySelector('.js-changepassword').innerHTML =`
   <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M26 10H22V7C22 5.4087 21.3679 3.88258 20.2426 2.75736C19.1174 1.63214 17.5913 1 16 1C14.4087 1 12.8826 1.63214 11.7574 2.75736C10.6321 3.88258 10 5.4087 10 7V10H6C5.46957 10 4.96086 10.2107 4.58579 10.5858C4.21071 10.9609 4 11.4696 4 12V26C4 26.5304 4.21071 27.0391 4.58579 27.4142C4.96086 27.7893 5.46957 28 6 28H26C26.5304 28 27.0391 27.7893 27.4142 27.4142C27.7893 27.0391 28 26.5304 28 26V12C28 11.4696 27.7893 10.9609 27.4142 10.5858C27.0391 10.2107 26.5304 10 26 10ZM17 19.8288V23C17 23.2652 16.8946 23.5196 16.7071 23.7071C16.5196 23.8946 16.2652 24 16 24C15.7348 24 15.4804 23.8946 15.2929 23.7071C15.1054 23.5196 15 23.2652 15 23V19.8288C14.3328 19.5929 13.7704 19.1287 13.4124 18.5183C13.0543 17.9079 12.9235 17.1905 13.0432 16.493C13.1629 15.7955 13.5253 15.1628 14.0663 14.7066C14.6074 14.2505 15.2923 14.0003 16 14.0003C16.7077 14.0003 17.3926 14.2505 17.9337 14.7066C18.4747 15.1628 18.8371 15.7955 18.9568 16.493C19.0765 17.1905 18.9457 17.9079 18.5876 18.5183C18.2296 19.1287 17.6672 19.5929 17 19.8288ZM20 10H12V7C12 5.93913 12.4214 4.92172 13.1716 4.17157C13.9217 3.42143 14.9391 3 16 3C17.0609 3 18.0783 3.42143 18.8284 4.17157C19.5786 4.92172 20 5.93913 20 7V10Z" fill="#343330"/>
</svg>
`;
    }
  })

  socket.on("unsetroompassword", async(roomname) => {
    try
    {
    const joinroombutton = document.querySelector('.js-joinroom[data-name="'+roomname.roomname+'"]');
    const lock = joinroombutton.closest('.c-room').querySelector('.c-room__lock');
    console.log(lock);
    if(joinroombutton)
    { 
      if(lock)
      {
        lock.remove();
      }
      joinroombutton.dataset.locked = false;
    }
  }
  catch(e)
  {

  }
  if(document.querySelector('.js-changepassword'))
  {
    document.querySelector('.js-changepassword').innerHTML = `
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M26 10H12V7C12 5.93913 12.4214 4.92172 13.1716 4.17157C13.9217 3.42143 14.9391 3 16 3C17.9213 3 19.65 4.375 20.02 6.19875C20.0749 6.45646 20.2294 6.68207 20.4497 6.82655C20.6701 6.97103 20.9385 7.0227 21.1968 6.97032C21.455 6.91795 21.6822 6.76577 21.8288 6.54686C21.9755 6.32795 22.0298 6.06 21.98 5.80125C21.415 3.01875 18.9 1 16 1C14.4092 1.00165 12.884 1.63433 11.7592 2.75919C10.6343 3.88405 10.0017 5.40921 10 7V10H6C5.46957 10 4.96086 10.2107 4.58579 10.5858C4.21071 10.9609 4 11.4696 4 12V26C4 26.5304 4.21071 27.0391 4.58579 27.4142C4.96086 27.7893 5.46957 28 6 28H26C26.5304 28 27.0391 27.7893 27.4142 27.4142C27.7893 27.0391 28 26.5304 28 26V12C28 11.4696 27.7893 10.9609 27.4142 10.5858C27.0391 10.2107 26.5304 10 26 10ZM17 19.8288V23C17 23.2652 16.8946 23.5196 16.7071 23.7071C16.5196 23.8946 16.2652 24 16 24C15.7348 24 15.4804 23.8946 15.2929 23.7071C15.1054 23.5196 15 23.2652 15 23V19.8288C14.3328 19.5929 13.7704 19.1287 13.4124 18.5183C13.0543 17.9079 12.9235 17.1905 13.0432 16.493C13.1629 15.7955 13.5253 15.1628 14.0663 14.7066C14.6074 14.2505 15.2923 14.0003 16 14.0003C16.7077 14.0003 17.3926 14.2505 17.9337 14.7066C18.4747 15.1628 18.8371 15.7955 18.9568 16.493C19.0765 17.1905 18.9457 17.9079 18.5876 18.5183C18.2296 19.1287 17.6672 19.5929 17 19.8288Z" fill="#343330"/>
</svg>
    `
  }
  })


  socket.on("disconnect", async (reason) => {
    //wait .3 seconds and check if kicked is true
    await new Promise((resolve) => setTimeout(resolve, 800));
    console.log(kicked);
    if(kicked == false)
    {
    const retryInterval = 5000; // Retry every 5 seconds
    let isConnected = false;
  
    const checkConnection = async () => {
      while (!isConnected) {
        // Show the popup only once
        showPopup({
          title: "Verbinding verbroken",
          type: "melding",
          buttons: [
            {
              text: "Begrepen",
              action: async () => {
                // Redirect user to a different page if they acknowledge
                await nextroom("/rooms");
              }
            }
          ]
        });
  
        // Wait for retryInterval before checking again
        await new Promise((resolve) => setTimeout(resolve, retryInterval));
  
        // Check connection status
        if (socket.connected) {
          isConnected = true;
          // Optionally hide popup or notify user of reconnection
          console.log("Reconnected!");
        }
      }
    };
  
    // Start checking for reconnection
    await checkConnection();
  }
  else{
    kicked = false;
  }
  });
  
  
  socket.on('giveadminrights', async (adminid) => {
    isadmin = true;
    //add buttons to the users
   await document.querySelectorAll('.c-personcard').forEach(user => {
      user.innerHTML += `
      <a href="#" class="c-removebutton js-kickuser">
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M27 7H5" stroke="#343330" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M13 13V21" stroke="#343330" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M19 13V21" stroke="#343330" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M25 7V26C25 26.2652 24.8946 26.5196 24.7071 26.7071C24.5196 26.8946 24.2652 27 24 27H8C7.73478 27 7.48043 26.8946 7.29289 26.7071C7.10536 26.5196 7 26.2652 7 26V7" stroke="#343330" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M21 7V5C21 4.46957 20.7893 3.96086 20.4142 3.58579C20.0391 3.21071 19.5304 3 19 3H13C12.4696 3 11.9609 3.21071 11.5858 3.58579C11.2107 3.96086 11 4.46957 11 5V7" stroke="#343330" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  </a>
  `;
  const kickuserbutton = document.querySelector('.c-personcard[data-id="'+user.dataset.id+'"] .js-kickuser');
kickuserbutton.addEventListener('click', async () => {
  showPopup({
    title: "Ben je zeker dat je deze user wil verwijderen?",
    type: "confirm",
    buttons: [
      {
        text: "Ja",
        action: () => {
          socket.emit("kickuser", user.dataset.id);
        },
        classlist: "c-button--red",
      },
      {
        text: "Nee",
        action: () => {
          // Do nothing
        },
        classlist: "c-button--green",
      }
    ]
  });
});  
    });
  });

  socket.on('showadmin', async(adminid) => {

    try{
      const admindiv = document.querySelector('.c-personcard[data-id="'+adminid.id+'"]').querySelector('.c-personcard__imgdiv');
      if(admindiv)
      {
    admindiv.innerHTML += `<svg class="c-personcard__admincrown width="26" height="25" viewBox="0 0 26 25" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.08 12.2095C19.8072 12.0894 19.6807 11.9443 19.6701 11.7121C19.6598 11.4912 19.7937 11.3588 19.9595 11.2561C20.0467 11.2018 20.1441 11.1661 20.2458 11.1514C20.7821 11.0812 21.3186 11.0064 21.8575 10.9658C22.0316 10.9617 22.2033 11.0078 22.3521 11.0985C22.4211 11.1402 22.4793 11.1977 22.5218 11.2662C22.5645 11.3348 22.5902 11.4124 22.5971 11.4928C22.6039 11.5732 22.5916 11.6541 22.5613 11.7288C22.5309 11.8035 22.4833 11.8701 22.4223 11.9229C22.2683 12.0564 22.0806 12.145 21.8796 12.1791C21.3877 12.2359 20.89 12.2462 20.3941 12.2615C20.2877 12.2572 20.1821 12.2398 20.08 12.2095Z" fill="#C49C48"/>
    <path d="M7.19544 6.97546C7.13183 6.8877 6.96868 6.73044 6.89125 6.53827C6.76859 6.22448 6.67553 5.89994 6.61323 5.56885C6.57723 5.39839 6.59314 5.22108 6.65892 5.05978C6.79464 4.77262 7.19424 4.704 7.45457 4.94812C7.67361 5.14413 7.85175 5.3815 7.97871 5.64661C8.10569 5.91171 8.17897 6.19932 8.19439 6.49285C8.21584 6.9931 7.75301 7.24735 7.19544 6.97546Z" fill="#C49C48"/>
    <path d="M20.8869 6.25282C21.2971 6.43816 21.4027 6.8572 21.1743 7.14163C21.104 7.23553 21.0115 7.31051 20.905 7.3596C20.4965 7.51852 20.0857 7.67615 19.6651 7.79728C19.4609 7.85594 19.2329 7.86515 19.045 7.68821C18.8263 7.48221 18.7992 7.21211 19.0014 6.99298C19.0585 6.92574 19.1282 6.87023 19.2064 6.8294C19.605 6.6472 20.0024 6.45904 20.4125 6.30597C20.5811 6.24304 20.7806 6.26305 20.8869 6.25282Z" fill="#C49C48"/>
    <path d="M12.9268 4.42454C12.7949 4.65016 12.6157 4.77975 12.3553 4.78475C12.1118 4.78931 11.9695 4.64407 11.8939 4.44332C11.724 4.01995 11.6607 3.56128 11.7098 3.10771C11.7496 2.78948 11.9388 2.59508 12.1975 2.56264C12.4725 2.52835 12.6967 2.65386 12.8001 2.96495C12.9576 3.44002 13.0484 3.92857 12.9268 4.42454Z" fill="#C49C48"/>
    <path d="M21.9293 16.0092C22.0155 15.8056 22.0712 15.5905 22.0945 15.3706C22.1175 15.0754 22.0286 14.8269 21.8451 14.6729C21.6596 14.5168 21.3964 14.4726 21.1049 14.5474C20.8849 14.6037 20.6628 14.6735 20.4483 14.7409C20.3601 14.7684 20.2716 14.7967 20.1838 14.8233L19.012 15.1811C18.0559 15.4729 17.0994 15.7646 16.1422 16.0558C16.0747 16.0743 16.0062 16.0882 15.9369 16.0974C15.9085 16.1019 15.8795 16.106 15.8497 16.1118C15.8297 16.1152 15.8093 16.114 15.7899 16.1083C15.7704 16.1027 15.7525 16.0928 15.7375 16.0791C15.7223 16.0655 15.7106 16.0487 15.703 16.0297C15.6956 16.0108 15.6926 15.9903 15.6943 15.9701C15.7332 15.4861 15.7751 15.0059 15.8162 14.5274C15.9077 13.4644 16.002 12.3641 16.0666 11.2873C16.1558 9.78868 16.1916 8.3116 16.2182 6.93888C16.215 6.60271 16.1539 6.26963 16.0375 5.95425C15.9366 5.66236 15.7312 5.54961 15.3714 5.59117C15.0789 5.62378 14.8715 5.81772 14.6521 6.02274L14.6317 6.04173C14.4135 6.24436 14.1962 6.44803 13.9795 6.65268C13.3196 7.27173 12.6369 7.91324 11.9451 8.52153C10.8992 9.44173 9.80898 10.3475 8.78152 11.1965C8.43277 11.4847 8.0746 11.7511 7.69558 12.0333C7.52317 12.162 7.34742 12.2927 7.16957 12.4285C7.15513 12.4396 7.1386 12.4476 7.12097 12.452C7.10334 12.4564 7.08497 12.4571 7.06705 12.4541C7.04913 12.451 7.03203 12.4443 7.01681 12.4344C7.00162 12.4244 6.98861 12.4114 6.97868 12.3962L6.73792 12.0284C6.58456 11.7959 6.4449 11.5843 6.30683 11.3714C6.11219 11.0724 5.91768 10.7731 5.72327 10.4735C5.3427 9.88631 4.96093 9.30015 4.57799 8.71506C4.49787 8.57135 4.37911 8.45286 4.23509 8.37324C4.12364 8.32631 3.99894 8.32147 3.8842 8.35965C3.55865 8.44497 3.38204 8.65414 3.3447 8.99979C3.32014 9.22237 3.31836 9.45457 3.31592 9.67958L3.3164 9.68923C3.31413 9.87172 3.31757 10.0586 3.31999 10.2393C3.32463 10.5801 3.3303 10.9335 3.30558 11.2811C3.29082 11.5014 3.27619 11.7221 3.26166 11.9433C3.16855 13.3573 3.07185 14.8192 2.79395 16.2425C2.69944 16.7252 2.84246 17.0752 3.23121 17.3129C3.33796 17.3784 3.44455 17.4448 3.54999 17.5108C3.97934 17.792 4.42771 18.043 4.89198 18.2618C5.95784 18.7348 7.05317 19.1901 8.11257 19.6309C8.57877 19.8246 9.04428 20.019 9.50925 20.2141C10.2722 20.5352 11.0347 20.8574 11.7965 21.1809L12.672 21.5508C12.7424 21.5811 12.8133 21.6108 12.8846 21.6416C12.9614 21.6749 13.0395 21.7079 13.1175 21.7408C13.3881 21.8555 13.6599 21.9674 13.9311 22.0804C14.5975 22.3573 15.2851 22.6428 15.9538 22.9451C16.2624 23.0848 16.529 23.077 16.7933 22.9219C16.9802 22.8048 17.148 22.6597 17.2909 22.4914L17.5078 22.2473C18.3926 21.2522 19.3073 20.2222 20.0785 19.1088C20.1536 19.0006 20.2289 18.8935 20.3038 18.7852C20.9097 17.9169 21.5382 17.0174 21.9293 16.0092ZM16.2253 21.3865C16.208 21.4042 16.1861 21.4165 16.162 21.4222C16.138 21.4278 16.1127 21.4265 16.0895 21.4185C15.9884 21.3848 15.8835 21.3511 15.7778 21.3173C15.5356 21.24 15.2843 21.1596 15.0391 21.0596C14.6369 20.8953 14.2307 20.7233 13.8389 20.5557C13.3156 20.3342 12.7749 20.1039 12.2381 19.8925C11.6124 19.6469 10.9687 19.4125 10.3467 19.186C9.98917 19.056 9.63158 18.9257 9.2756 18.7922C8.75524 18.598 8.32159 18.4347 7.87769 18.2475C6.78374 17.7869 5.67515 17.3117 4.60291 16.8526L4.0717 16.6251L4.05961 16.6195C4.01134 16.5961 3.9654 16.5681 3.92235 16.5361C3.90775 16.5255 3.89323 16.5149 3.8786 16.5065C3.85726 16.493 3.84031 16.4735 3.82966 16.4506C3.81906 16.4276 3.81523 16.4021 3.81864 16.3771L4.50584 11.209C4.50915 11.1823 4.52066 11.1572 4.53873 11.1371C4.55681 11.1171 4.58059 11.1032 4.60689 11.0971C4.63318 11.091 4.6607 11.0932 4.6857 11.1034C4.71073 11.1134 4.73203 11.131 4.74674 11.1536L4.8759 11.3478C4.96149 11.4764 5.04041 11.5942 5.11694 11.7128C5.2259 11.8813 5.33514 12.0492 5.4447 12.2165C5.71544 12.633 5.99652 13.063 6.25877 13.4959C6.42657 13.7729 6.61075 13.9341 6.80468 13.9746C6.9942 14.0144 7.20794 13.9482 7.45666 13.7723L7.67976 13.6155C8.10092 13.3197 8.53674 13.0132 8.93493 12.6806C10.255 11.5747 11.5901 10.4407 12.881 9.34371C13.3903 8.91079 13.9002 8.47814 14.4106 8.04575C14.4537 8.00885 14.497 7.97376 14.5581 7.92521L14.6769 7.82929C14.6964 7.81297 14.7203 7.80283 14.7456 7.80009C14.7709 7.79739 14.7964 7.80219 14.8189 7.81395C14.8417 7.82507 14.8608 7.84252 14.8739 7.86419C14.887 7.88587 14.8935 7.91085 14.8928 7.93615C14.8851 8.20246 14.8815 8.46188 14.8781 8.71656C14.8703 9.27028 14.8633 9.79289 14.8204 10.3196C14.7212 11.5271 14.6043 12.7517 14.4918 13.9374C14.4275 14.6164 14.3639 15.2961 14.3011 15.9763C14.2657 16.3216 14.2503 16.6687 14.2547 17.0158C14.2514 17.1402 14.2774 17.2636 14.3306 17.376C14.3839 17.4885 14.4628 17.5868 14.5611 17.6632C14.7572 17.8047 15.0191 17.8346 15.2992 17.7487C15.725 17.6182 16.1505 17.4845 16.5755 17.3516C16.9485 17.2346 17.3212 17.1181 17.6937 17.0022C18.1672 16.8567 18.6415 16.7124 19.1163 16.5692L19.7525 16.377C19.776 16.3699 19.8009 16.3693 19.8245 16.3755C19.8484 16.3816 19.8699 16.3942 19.8871 16.4117L19.9553 16.4828C19.9762 16.5044 19.9893 16.5326 19.992 16.5627C19.9948 16.5928 19.9873 16.6229 19.9707 16.648C19.003 18.1061 17.8014 19.8099 16.2253 21.3865Z" fill="#C49C48"/>
    </svg>`
      }
    }
    catch(err){
      
    }
  });

  socket.on('startgame', async() => {
    await nextroom('/getgame');
  });


  socket.on('missioncompleted', async(heartrate) => {
      seeNeededHeartbeat(heartrate.heartrate);
  });

  socket.on('nextlevel', async() => {
    nextlevel();
  });

}


function startgame()
{

  
  hidegame();
  hideheartbeat();
  storyskipbutton();

  
  // hidegame();
  if(document.querySelector('.js-greeceplayfield'))
  {
  document.body.classList.add('c-body--greece');
  const playfield = document.querySelector('.js-greeceplayfield');
  const totalTiles = 20;
  const correctTiles = 4;

  // Generate Random Tile Indices for the Correct SVG
  function getRandomIndices(count, max) {
    const indices = new Set();
    while (indices.size < count) {
      indices.add(Math.floor(Math.random() * max));
    }
    return [...indices];
  }

  function setupGame() {
    playfield.innerHTML = ''; // Clear the playfield
    const correctIndices = getRandomIndices(correctTiles, totalTiles);

    for (let i = 0; i < totalTiles; i++) {
      const tile = document.createElement('div');
      tile.classList.add('c-greece__playfield__tile');
      tile.setAttribute('data-index', i);
      tile.setAttribute('alt', `tile${i + 1}`);

      const img = document.createElement('img');
      img.classList.add('c-greece__playfield__tile__img');
      img.src = 'img/GreekSymbolsbackground.png';
      img.alt = `tile${i + 1}`;
      tile.appendChild(img);

      // Add SVG to correct tiles
      if (correctIndices.includes(i)) {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', '72');
        svg.setAttribute('height', '73');
        svg.setAttribute('viewBox', '0 0 72 73');
        svg.innerHTML = `
          <path d="M63.7151 19.5533L35.9406 69.1687L7.931 19.6857L63.7151 19.5533Z" stroke="white" stroke-width="3"/>
          <line x1="24.0536" y1="47.1963" x2="49.3036" y2="47.1963" stroke="white" stroke-width="3"/>
        `;
        tile.appendChild(svg);
        tile.classList.add('correct');
      }

      playfield.appendChild(tile);
    }

    addTileListeners();
  }

  function addTileListeners() {
    const tiles = document.querySelectorAll('.c-greece__playfield__tile');
    let correctCount = 0;

    tiles.forEach(tile => {
      tile.addEventListener('click', () => {
        if(correctCount != correctTiles)
        {
        if (tile.classList.contains('correct')) {
          tile.querySelector('img').style.display = 'none';
            correctCount++;
          if (correctCount === correctTiles) {
            missionCompleted();
          }
        } else {
          tile.querySelector('img').style.display = 'none';
          //wait 1 second and then show all tiles
          setTimeout(() => {
            tiles.forEach(t => t.querySelector('img').style.display = 'block');
            correctCount = 0;
          }, 200);
        }
      }
      });
    });
  }

  // Initialize Game
  setupGame();
}
if(document.querySelector('.c-game--rome'))
{
  document.body.classList.add('c-body--rome');
}


}


function hidegame(){
  document.querySelector('.c-game').style.display = 'none';
}

function showgame(){
  document.querySelector('.c-game').style.display = '';
} 

function hidestory(){
  document.querySelector('.c-game__story').style.display = 'none';
}
function storyskipbutton() {
  // Reference to the button
  const button = document.querySelector('.js-gameactionbutton');
  button.disabled = false;
  
  // Define the event handler function
  const handleClick = () => {
    showgame();
    hidestory();
    button.removeEventListener('click', handleClick); // Remove the event listener
    button.disabled = true; // Disable the button
    console.log("Story skipped and button disabled.");
  };

  // Add the event listener
  button.addEventListener('click', handleClick);
}

function missionCompleted()
{
  const button = document.querySelector('.js-gameactionbutton');
  button.disabled = false;

  const handleClick = () => {
    button.removeEventListener('click', handleClick); // Remove the event listener
    button.disabled = true; // Disable the button
    socket.emit('missioncompleted');
  };
  button.addEventListener('click', handleClick);
}

function seeNeededHeartbeat(heartbeat)
{
  hidegame();
  document.querySelector('.c-gamehartslag').style.display = '';
  const heartbeatdiv = document.querySelector('.c-gamehartslag h3');
  heartbeatdiv.textContent = `De hartslag die je moet halen is: ${heartbeat}`;
}

function hideheartbeat()
{
  document.querySelector('.c-gamehartslag').style.display = 'none';
}


function nextlevel()
{
  document.body.className = 'c-body__game';
  nextroom('/getgame');

}

  // button.disabled = false;

  // const handleClick = () => {
  //   button.removeEventListener('click', handleClick); // Remove the event listener
  //   button.disabled = true; // Disable the button
  //   socket.emit('seeneededheartbeat');
  // };
  // button.addEventListener('click', handleClick);





