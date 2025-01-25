

let socket = "";
let isadmin = false;


function init()
{
    // initStartGameButton();
    // isUserInGame();
    nextroom('/rooms');

    
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
            document.body.style.overflow = "auto";
          });
          buttonContainer.appendChild(button);
        });
      
        // Append elements to the DOM
        popup.appendChild(popupTitle);
        popup.appendChild(popupType);
        popup.appendChild(buttonContainer);
        popupContainer.appendChild(popup);
        document.body.appendChild(popupContainer);
        document.body.style.overflow = "hidden";
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
        
      
        // Emit heart rate via socket.io
        if (socket !== "") {
          socket.emit("heartRate", heartRate);
        }

        if(laagste == null)
        {
          laagste = heartRate;
        }
        else if(laagste > heartRate)
        {
          laagste = heartRate;
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
                  returnarrow();
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
  socketevents();
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

}


async function Room(roomname)
{
if(document.querySelector('.js-room'))
{
const roomid = roomname;
console.log(socket);
socket.emit("joinroom", roomid); 

const startgamebutton = document.querySelector('.js-startgame');
if(startgamebutton)
{
  startgamebutton.addEventListener('click', async () => {
    socket.emit("startgame");
  });
}
}

}


function returnarrow()
{
  document.querySelector('.js-returnarrow').addEventListener('click', () => {
    console.log("test");
    socket.disconnect();
    nextroom('/rooms');
  });
}

function createRoom(user)
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
  <p>50</p>
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
  console.log(user.id);
  socket.emit("kickuser", user.id);
});
  }
}
}


function socketevents()
{
  socket.on('loadusers', (users) => {
    users.users.forEach(user => {
      createRoom(user);
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
      if(userdiv)
      {
          userdiv.querySelector('p').textContent = heartbeat.heartbeat;
      }
  
  });

  socket.on('kicked', async() => {
    await nextroom('/rooms');
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
    console.log("biep boop melding");
    if(document.querySelector('.js-rooms'))
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

  socket.on('disconnected', async(message) => {
    await nextroom('/rooms');
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

  socket.on('startgame', async() => {
    await nextroom('/greecegame');
  });

  socket.on('showadmin', async (adminid) => {
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
  console.log(user.dataset.id);
  socket.emit("kickuser", user.dataset.id);
});  
    });
  });




}



// const admindiv = document.querySelector('.c-personcard[data-id="'+adminid+'"]').querySelector('.c-personcard__imgdiv');
// console.log(admindiv);
// admindiv.innerHTML += `<svg class="c-personcard__admincrown width="26" height="25" viewBox="0 0 26 25" fill="none" xmlns="http://www.w3.org/2000/svg">
// <path d="M20.08 12.2095C19.8072 12.0894 19.6807 11.9443 19.6701 11.7121C19.6598 11.4912 19.7937 11.3588 19.9595 11.2561C20.0467 11.2018 20.1441 11.1661 20.2458 11.1514C20.7821 11.0812 21.3186 11.0064 21.8575 10.9658C22.0316 10.9617 22.2033 11.0078 22.3521 11.0985C22.4211 11.1402 22.4793 11.1977 22.5218 11.2662C22.5645 11.3348 22.5902 11.4124 22.5971 11.4928C22.6039 11.5732 22.5916 11.6541 22.5613 11.7288C22.5309 11.8035 22.4833 11.8701 22.4223 11.9229C22.2683 12.0564 22.0806 12.145 21.8796 12.1791C21.3877 12.2359 20.89 12.2462 20.3941 12.2615C20.2877 12.2572 20.1821 12.2398 20.08 12.2095Z" fill="#C49C48"/>
// <path d="M7.19544 6.97546C7.13183 6.8877 6.96868 6.73044 6.89125 6.53827C6.76859 6.22448 6.67553 5.89994 6.61323 5.56885C6.57723 5.39839 6.59314 5.22108 6.65892 5.05978C6.79464 4.77262 7.19424 4.704 7.45457 4.94812C7.67361 5.14413 7.85175 5.3815 7.97871 5.64661C8.10569 5.91171 8.17897 6.19932 8.19439 6.49285C8.21584 6.9931 7.75301 7.24735 7.19544 6.97546Z" fill="#C49C48"/>
// <path d="M20.8869 6.25282C21.2971 6.43816 21.4027 6.8572 21.1743 7.14163C21.104 7.23553 21.0115 7.31051 20.905 7.3596C20.4965 7.51852 20.0857 7.67615 19.6651 7.79728C19.4609 7.85594 19.2329 7.86515 19.045 7.68821C18.8263 7.48221 18.7992 7.21211 19.0014 6.99298C19.0585 6.92574 19.1282 6.87023 19.2064 6.8294C19.605 6.6472 20.0024 6.45904 20.4125 6.30597C20.5811 6.24304 20.7806 6.26305 20.8869 6.25282Z" fill="#C49C48"/>
// <path d="M12.9268 4.42454C12.7949 4.65016 12.6157 4.77975 12.3553 4.78475C12.1118 4.78931 11.9695 4.64407 11.8939 4.44332C11.724 4.01995 11.6607 3.56128 11.7098 3.10771C11.7496 2.78948 11.9388 2.59508 12.1975 2.56264C12.4725 2.52835 12.6967 2.65386 12.8001 2.96495C12.9576 3.44002 13.0484 3.92857 12.9268 4.42454Z" fill="#C49C48"/>
// <path d="M21.9293 16.0092C22.0155 15.8056 22.0712 15.5905 22.0945 15.3706C22.1175 15.0754 22.0286 14.8269 21.8451 14.6729C21.6596 14.5168 21.3964 14.4726 21.1049 14.5474C20.8849 14.6037 20.6628 14.6735 20.4483 14.7409C20.3601 14.7684 20.2716 14.7967 20.1838 14.8233L19.012 15.1811C18.0559 15.4729 17.0994 15.7646 16.1422 16.0558C16.0747 16.0743 16.0062 16.0882 15.9369 16.0974C15.9085 16.1019 15.8795 16.106 15.8497 16.1118C15.8297 16.1152 15.8093 16.114 15.7899 16.1083C15.7704 16.1027 15.7525 16.0928 15.7375 16.0791C15.7223 16.0655 15.7106 16.0487 15.703 16.0297C15.6956 16.0108 15.6926 15.9903 15.6943 15.9701C15.7332 15.4861 15.7751 15.0059 15.8162 14.5274C15.9077 13.4644 16.002 12.3641 16.0666 11.2873C16.1558 9.78868 16.1916 8.3116 16.2182 6.93888C16.215 6.60271 16.1539 6.26963 16.0375 5.95425C15.9366 5.66236 15.7312 5.54961 15.3714 5.59117C15.0789 5.62378 14.8715 5.81772 14.6521 6.02274L14.6317 6.04173C14.4135 6.24436 14.1962 6.44803 13.9795 6.65268C13.3196 7.27173 12.6369 7.91324 11.9451 8.52153C10.8992 9.44173 9.80898 10.3475 8.78152 11.1965C8.43277 11.4847 8.0746 11.7511 7.69558 12.0333C7.52317 12.162 7.34742 12.2927 7.16957 12.4285C7.15513 12.4396 7.1386 12.4476 7.12097 12.452C7.10334 12.4564 7.08497 12.4571 7.06705 12.4541C7.04913 12.451 7.03203 12.4443 7.01681 12.4344C7.00162 12.4244 6.98861 12.4114 6.97868 12.3962L6.73792 12.0284C6.58456 11.7959 6.4449 11.5843 6.30683 11.3714C6.11219 11.0724 5.91768 10.7731 5.72327 10.4735C5.3427 9.88631 4.96093 9.30015 4.57799 8.71506C4.49787 8.57135 4.37911 8.45286 4.23509 8.37324C4.12364 8.32631 3.99894 8.32147 3.8842 8.35965C3.55865 8.44497 3.38204 8.65414 3.3447 8.99979C3.32014 9.22237 3.31836 9.45457 3.31592 9.67958L3.3164 9.68923C3.31413 9.87172 3.31757 10.0586 3.31999 10.2393C3.32463 10.5801 3.3303 10.9335 3.30558 11.2811C3.29082 11.5014 3.27619 11.7221 3.26166 11.9433C3.16855 13.3573 3.07185 14.8192 2.79395 16.2425C2.69944 16.7252 2.84246 17.0752 3.23121 17.3129C3.33796 17.3784 3.44455 17.4448 3.54999 17.5108C3.97934 17.792 4.42771 18.043 4.89198 18.2618C5.95784 18.7348 7.05317 19.1901 8.11257 19.6309C8.57877 19.8246 9.04428 20.019 9.50925 20.2141C10.2722 20.5352 11.0347 20.8574 11.7965 21.1809L12.672 21.5508C12.7424 21.5811 12.8133 21.6108 12.8846 21.6416C12.9614 21.6749 13.0395 21.7079 13.1175 21.7408C13.3881 21.8555 13.6599 21.9674 13.9311 22.0804C14.5975 22.3573 15.2851 22.6428 15.9538 22.9451C16.2624 23.0848 16.529 23.077 16.7933 22.9219C16.9802 22.8048 17.148 22.6597 17.2909 22.4914L17.5078 22.2473C18.3926 21.2522 19.3073 20.2222 20.0785 19.1088C20.1536 19.0006 20.2289 18.8935 20.3038 18.7852C20.9097 17.9169 21.5382 17.0174 21.9293 16.0092ZM16.2253 21.3865C16.208 21.4042 16.1861 21.4165 16.162 21.4222C16.138 21.4278 16.1127 21.4265 16.0895 21.4185C15.9884 21.3848 15.8835 21.3511 15.7778 21.3173C15.5356 21.24 15.2843 21.1596 15.0391 21.0596C14.6369 20.8953 14.2307 20.7233 13.8389 20.5557C13.3156 20.3342 12.7749 20.1039 12.2381 19.8925C11.6124 19.6469 10.9687 19.4125 10.3467 19.186C9.98917 19.056 9.63158 18.9257 9.2756 18.7922C8.75524 18.598 8.32159 18.4347 7.87769 18.2475C6.78374 17.7869 5.67515 17.3117 4.60291 16.8526L4.0717 16.6251L4.05961 16.6195C4.01134 16.5961 3.9654 16.5681 3.92235 16.5361C3.90775 16.5255 3.89323 16.5149 3.8786 16.5065C3.85726 16.493 3.84031 16.4735 3.82966 16.4506C3.81906 16.4276 3.81523 16.4021 3.81864 16.3771L4.50584 11.209C4.50915 11.1823 4.52066 11.1572 4.53873 11.1371C4.55681 11.1171 4.58059 11.1032 4.60689 11.0971C4.63318 11.091 4.6607 11.0932 4.6857 11.1034C4.71073 11.1134 4.73203 11.131 4.74674 11.1536L4.8759 11.3478C4.96149 11.4764 5.04041 11.5942 5.11694 11.7128C5.2259 11.8813 5.33514 12.0492 5.4447 12.2165C5.71544 12.633 5.99652 13.063 6.25877 13.4959C6.42657 13.7729 6.61075 13.9341 6.80468 13.9746C6.9942 14.0144 7.20794 13.9482 7.45666 13.7723L7.67976 13.6155C8.10092 13.3197 8.53674 13.0132 8.93493 12.6806C10.255 11.5747 11.5901 10.4407 12.881 9.34371C13.3903 8.91079 13.9002 8.47814 14.4106 8.04575C14.4537 8.00885 14.497 7.97376 14.5581 7.92521L14.6769 7.82929C14.6964 7.81297 14.7203 7.80283 14.7456 7.80009C14.7709 7.79739 14.7964 7.80219 14.8189 7.81395C14.8417 7.82507 14.8608 7.84252 14.8739 7.86419C14.887 7.88587 14.8935 7.91085 14.8928 7.93615C14.8851 8.20246 14.8815 8.46188 14.8781 8.71656C14.8703 9.27028 14.8633 9.79289 14.8204 10.3196C14.7212 11.5271 14.6043 12.7517 14.4918 13.9374C14.4275 14.6164 14.3639 15.2961 14.3011 15.9763C14.2657 16.3216 14.2503 16.6687 14.2547 17.0158C14.2514 17.1402 14.2774 17.2636 14.3306 17.376C14.3839 17.4885 14.4628 17.5868 14.5611 17.6632C14.7572 17.8047 15.0191 17.8346 15.2992 17.7487C15.725 17.6182 16.1505 17.4845 16.5755 17.3516C16.9485 17.2346 17.3212 17.1181 17.6937 17.0022C18.1672 16.8567 18.6415 16.7124 19.1163 16.5692L19.7525 16.377C19.776 16.3699 19.8009 16.3693 19.8245 16.3755C19.8484 16.3816 19.8699 16.3942 19.8871 16.4117L19.9553 16.4828C19.9762 16.5044 19.9893 16.5326 19.992 16.5627C19.9948 16.5928 19.9873 16.6229 19.9707 16.648C19.003 18.1061 17.8014 19.8099 16.2253 21.3865Z" fill="#C49C48"/>
// </svg>`