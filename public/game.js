

let socket = "";

function init()
{
    initStartGameButton();
    isUserInGame();

    
}


function isUserInGame()
{
  nextroom()
}


function initStartGameButton() {
    const startGameButtons = document.querySelectorAll(".js-startgame");
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

    function showPopup({ title, type, buttons,extra=null }) {
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
                    Kamer wachtwoord
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
          console.log("zwieber niet stelen");
          popupType.classList.add("c-popup__joinroom");
          popupType.innerHTML = `
          <form class="js-createroomform" method="POST">
          <div class="c-loginForm__inputdiv">
              <label class="c-label" for="roomname">
                  Kamer naam
                  <span class="c-input__span">
                      <input class="c-input js-input" type="text" name="roomname" id="roomname" value=${extra.name} readonly>
                  </span>
                  <span class="c-input__errorSpan"></span>
              </label>
  
              <label class="c-label" for="roompassword">
                  Kamer wachtwoord
                  <span class="c-input__span">
                      <input class="c-input js-input" type="test" name="roompassword" id="roompassword" required="">
                  </span>
                  <span class="c-input__errorSpan"></span>
              </label>
          </div>
      </form>`
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
            // document.querySelector(".showheartbeat").textContent = heartRate;
          });
      
          console.log("Real-time heart rate monitoring started.");
        } catch (error) {
          console.error("Failed to show heart rate notifications:", error);
        }
      }
      
      // Handle heart rate notifications
      function handleHeartRateNotification(event) {
        const heartRate = parseHeartRate(event.target.value);
        console.log(`Heart rate: ${heartRate}`);
      
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
            loadcontainer.remove();
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

              console.log("test");
              console.log(response);
          
              // Inject the HTML into the `#content` div
               document.body.innerHTML = html;
               if(room == '/rooms')
                  {
                      rooms();
                  }
  
              else if(room.includes('/room/'))
              {
                document.body.classList.add('oplipicbackground');
                  Room(roomname);
              }
            }
            
    
        } catch (error) {
            console.error(error);
        }
    }
    

    
document.addEventListener('DOMContentLoaded', init);


function rooms(){
  socket = io("/room"); // Connect to the namespace '/room'
document.querySelector('.js-makeroom').addEventListener('click', async () => {
    showPopup({
        title: "Reconnected!",
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
                        nextroom(`/room/${jsonresponse.message}`,jsonresponse.message);
                    } 
                    else {
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
                    console.log(jsonresponse.message);
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

socket.on('roomUpdate',(rooms) => {
  document.querySelectorAll('.js-joinroom').forEach(room => {
    if(room.dataset.name == rooms.name)
    {
      const roomcount = room.closest('.c-room').querySelector('.c-room__players');
      roomcount.textContent = rooms.amount+'/8';
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
  if(document.querySelectorAll('.js-rooms'))
  {

  const roomdiv = document.createElement('div');
  roomdiv.classList.add('c-room');
  roomdiv.innerHTML = `
  <h3 class="c-room__title">${room.data.name}</h3>
  <p class="c-room__players">${0}/8</p>
  <button class="c-button js-joinroom" data-name="${room.data.name}" data-locked="true">Join</button>
  `;
  document.querySelector('.js-rooms').appendChild(roomdiv);
  }
}
);
}


async function Room(roomname)
{
if(document.querySelector('.js-room'))
{

const usersdiv = document.querySelector('.js-room-users');

const roomid = roomname;
console.log(socket);
socket.emit("joinroom", roomid); 

    socket.on('loadusers', (users) => {
        users.users.forEach(user => {
        const userdiv = document.createElement('div');
        userdiv.dataset.id = user.id;
        userdiv.classList.add('c-personcard');
        userdiv.innerHTML = `
        <img src="../img/profile_1.png" alt="profiel" class="c-room__img">
        <div class="c-personcard__info">
        <h4 class="c-personcard__title">${user.userName}</h3>
        <div class="c-personcard__heartbeat">
       <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.75 15.9375H8.4375L10.3125 13.125L14.0625 18.75L15.9375 15.9375H18.75" stroke="#E63946" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M2.85107 11.25C3.02404 9.70297 3.76115 8.27398 4.92146 7.23625C6.08177 6.19852 7.58386 5.62487 9.14053 5.625C11.7878 5.625 14.0554 7.06758 14.9999 9.375C15.9444 7.06758 18.212 5.625 20.8593 5.625C22.5376 5.625 24.1472 6.29171 25.3339 7.47846C26.5207 8.66522 27.1874 10.2748 27.1874 11.9531C27.1874 19.6875 14.9999 26.25 14.9999 26.25C14.9999 26.25 10.8562 24.0234 7.40147 20.625" stroke="#E63946" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <p>50</p>
        </div>
        </div>
         <a href="./room/${roomid}" class="c-removebutton">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M27 7H5" stroke="#343330" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M13 13V21" stroke="#343330" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M19 13V21" stroke="#343330" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M25 7V26C25 26.2652 24.8946 26.5196 24.7071 26.7071C24.5196 26.8946 24.2652 27 24 27H8C7.73478 27 7.48043 26.8946 7.29289 26.7071C7.10536 26.5196 7 26.2652 7 26V7" stroke="#343330" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M21 7V5C21 4.46957 20.7893 3.96086 20.4142 3.58579C20.0391 3.21071 19.5304 3 19 3H13C12.4696 3 11.9609 3.21071 11.5858 3.58579C11.2107 3.96086 11 4.46957 11 5V7" stroke="#343330" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        </a>


`;
    usersdiv.appendChild(userdiv);
    let playerspan = document.querySelector('.js-roomcount');
    const aantalplayers = document.querySelectorAll('.c-room').length;
    playerspan = aantalplayers;
});
    });

    socket.on('userjoined', (user) => {
        console.log("test");
        const userdiv = document.createElement('div');
        userdiv.dataset.id = user.id;
        userdiv.classList.add('c-personcard', 'c-lobbyperson__card');
        userdiv.innerHTML = `
        <img src="../img/profile_1.png" alt="profiel" class="c-room__img">
        <div class="c-personcard__info">
        <h4 class="c-personcard__title">${user.userName}</h3>
        <div class="c-personcard__heartbeat">
       <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.75 15.9375H8.4375L10.3125 13.125L14.0625 18.75L15.9375 15.9375H18.75" stroke="#E63946" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M2.85107 11.25C3.02404 9.70297 3.76115 8.27398 4.92146 7.23625C6.08177 6.19852 7.58386 5.62487 9.14053 5.625C11.7878 5.625 14.0554 7.06758 14.9999 9.375C15.9444 7.06758 18.212 5.625 20.8593 5.625C22.5376 5.625 24.1472 6.29171 25.3339 7.47846C26.5207 8.66522 27.1874 10.2748 27.1874 11.9531C27.1874 19.6875 14.9999 26.25 14.9999 26.25C14.9999 26.25 10.8562 24.0234 7.40147 20.625" stroke="#E63946" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <p>50</p>
        </div>
        </div>
        <a href="./room/${roomid}" class="c-removebutton">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M27 7H5" stroke="#343330" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M13 13V21" stroke="#343330" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M19 13V21" stroke="#343330" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M25 7V26C25 26.2652 24.8946 26.5196 24.7071 26.7071C24.5196 26.8946 24.2652 27 24 27H8C7.73478 27 7.48043 26.8946 7.29289 26.7071C7.10536 26.5196 7 26.2652 7 26V7" stroke="#343330" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M21 7V5C21 4.46957 20.7893 3.96086 20.4142 3.58579C20.0391 3.21071 19.5304 3 19 3H13C12.4696 3 11.9609 3.21071 11.5858 3.58579C11.2107 3.96086 11 4.46957 11 5V7" stroke="#343330" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        </a>
`;

    usersdiv.appendChild(userdiv);
    });

    socket.on('userleft', (user) => {
        console.log("dit is een test van de federale overheid");
        const userdiv = document.querySelector(`.c-personcard[data-id="${user.id}"]`);
        console.log(user);
        userdiv.remove();
    });

    socket.on('heartRate', (heartbeat) => {
        const userdiv = document.querySelector(`.c-personcard[data-id="${heartbeat.id}"]`);
        if(userdiv)
        {
            userdiv.querySelector('p').textContent = heartbeat.heartbeat;
        }
    
    });
}
}