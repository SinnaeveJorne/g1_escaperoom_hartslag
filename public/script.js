

document.addEventListener('DOMContentLoaded', init);

function init() {
    initLoginForm();
    initRegisterForm();
    initStartGameButton();
    // initRooms();
    initRoom();
}


function initRoom()
{
if(document.querySelector('.js-room'))
{
//this is person_card
//     <div class="c-room c-lobbyprrsoon__card">
//     <div class="c-room__info">
//         <img src="../img/profile_1.png" alt="profiel" class="c-room__img">
//         <h3 class="c-room__title c-lobbyperson">PixelPhantom</h3>
//     </div>
//     <div class="c-room__info">
//         <a href="./room/123" class="c-button c-room__btn">
//             <svg width="19" height="12" viewBox="0 0 19 12" fill="none" xmlns="http://www.w3.org/2000/svg">
//                 <path d="M8.74408 8.22072C9.49798 7.69094 10.0703 6.91914 10.3765 6.01943C10.6827 5.11973 10.7065 4.1399 10.4443 3.22484C10.1821 2.30977 9.64795 1.50806 8.92073 0.938252C8.19351 0.368443 7.31187 0.060791 6.40619 0.060791C5.50051 0.060791 4.61888 0.368443 3.89166 0.938252C3.16444 1.50806 2.63024 2.30977 2.36807 3.22484C2.1059 4.1399 2.12966 5.11973 2.43586 6.01943C2.74205 6.91914 3.31441 7.69094 4.0683 8.22072C2.70459 8.75127 1.53994 9.73303 0.748146 11.0195C0.706533 11.0848 0.677627 11.1582 0.663111 11.2353C0.648595 11.3125 0.648758 11.392 0.66359 11.4691C0.678421 11.5462 0.707626 11.6194 0.749507 11.6845C0.791387 11.7496 0.845108 11.8053 0.907547 11.8483C0.969985 11.8913 1.0399 11.9207 1.11321 11.9349C1.18653 11.9492 1.2618 11.9479 1.33463 11.9311C1.40747 11.9143 1.47642 11.8825 1.53749 11.8373C1.59855 11.7922 1.65051 11.7347 1.69033 11.6682C2.20108 10.839 2.89996 10.1576 3.72352 9.68593C4.54707 9.21424 5.46921 8.96718 6.40619 8.96718C7.34317 8.96718 8.26531 9.21424 9.08887 9.68593C9.91243 10.1576 10.6113 10.839 11.1221 11.6682C11.2046 11.7976 11.332 11.8876 11.4768 11.9186C11.6217 11.9497 11.7723 11.9193 11.896 11.834C12.0198 11.7488 12.1069 11.6156 12.1383 11.4632C12.1698 11.3108 12.1432 11.1514 12.0642 11.0195C11.2724 9.73303 10.1078 8.75127 8.74408 8.22072ZM3.31244 4.51572C3.31244 3.86984 3.49389 3.23847 3.83383 2.70144C4.17378 2.16441 4.65696 1.74585 5.22227 1.49868C5.78758 1.25151 6.40963 1.18684 7.00975 1.31285C7.60988 1.43885 8.16114 1.74987 8.59381 2.20658C9.02647 2.66328 9.32112 3.24516 9.4405 3.87863C9.55987 4.5121 9.4986 5.16871 9.26445 5.76542C9.03029 6.36214 8.63375 6.87216 8.12499 7.23099C7.61622 7.58982 7.01808 7.78135 6.40619 7.78135C5.58597 7.78037 4.7996 7.43599 4.21961 6.82378C3.63962 6.21157 3.31337 5.38152 3.31244 4.51572ZM18.0879 11.8411C17.963 11.9271 17.8108 11.9572 17.6648 11.9248C17.5188 11.8924 17.3911 11.8001 17.3096 11.6682C16.7994 10.8385 16.1006 10.1568 15.2769 9.68534C14.4532 9.21384 13.5307 8.96752 12.5937 8.96885C12.4445 8.96885 12.3014 8.90629 12.1959 8.79494C12.0905 8.68359 12.0312 8.53257 12.0312 8.3751C12.0312 8.21763 12.0905 8.0666 12.1959 7.95525C12.3014 7.8439 12.4445 7.78135 12.5937 7.78135C13.0493 7.78089 13.4992 7.67423 13.9112 7.46897C14.3232 7.26371 14.6872 6.96493 14.9772 6.59398C15.2671 6.22302 15.4759 5.78904 15.5885 5.32306C15.7011 4.85707 15.7149 4.37057 15.6287 3.89833C15.5426 3.42609 15.3587 2.97976 15.0902 2.59123C14.8217 2.2027 14.4752 1.88156 14.0755 1.65076C13.6758 1.41995 13.2328 1.28519 12.778 1.25608C12.3232 1.22698 11.868 1.30426 11.4448 1.4824C11.3758 1.51389 11.3015 1.53046 11.2263 1.53113C11.1512 1.5318 11.0766 1.51656 11.0071 1.48631C10.9376 1.45606 10.8746 1.41141 10.8217 1.35501C10.7689 1.2986 10.7272 1.23158 10.6993 1.15791C10.6714 1.08424 10.6578 1.00541 10.6592 0.926073C10.6606 0.846739 10.6771 0.768514 10.7077 0.696019C10.7382 0.623524 10.7822 0.55823 10.8371 0.503995C10.892 0.44976 10.9566 0.407684 11.0271 0.380254C11.9957 -0.0274659 13.0729 -0.042138 14.0511 0.339068C15.0293 0.720273 15.839 1.47035 16.3242 2.44459C16.8094 3.41883 16.9355 4.5482 16.6784 5.61484C16.4212 6.68148 15.7989 7.6098 14.9316 8.22072C16.2953 8.75127 17.4599 9.73303 18.2517 11.0195C18.3332 11.1514 18.3617 11.312 18.331 11.4661C18.3003 11.6202 18.2128 11.7551 18.0879 11.8411Z" fill="#FAFAFA"/>
//                 </svg>
//             verwijderen
//         </a>
//     </div>
// </div>

    const socket = io("/room"); // Connect to the namespace '/room'
    const usersdiv =  document.querySelector('.js-room-users');

    const roomid = window.location.pathname.split('/').pop();
    socket.emit("joinroom", roomid); // Emit 'joinroom' with the room ID
    
    // Listen for messages
    socket.on('loadusers', (users) => {
        users.users.forEach(user => {
        const userdiv = document.createElement('div');
        userdiv.dataset.id = user.id;
        userdiv.classList.add('c-room', 'c-lobbyperson__card');
        userdiv.innerHTML = `
            <div class="c-room__info">
                <img src="../img/profile_1.png" alt="profiel" class="c-room__img">
                <h3 class="c-room__title c-lobbyperson">${user.userName}</h3>
            </div>
            <div class="c-room__info">
                <a href="./room/${roomid}" class="c-button c-room__btn">
                    <svg width="19" height="12" viewBox="0 0 19 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.74408 8.22072C9.49798 7.69094 10.0703 6.91914 10.3765 6.01943C10.6827 5.11973 10.7065 4.1399 10.4443 3.22484C10.1821 2.30977 9.64795 1.50806 8.92073 0.938252C8.19351 0.368443 7.31187 0.060791 6.40619 0.060791C5.50051 0.060791 4.61888 0.368443 3.89166 0.938252C3.16444 1.50806 2.63024 2.30977 2.36807 3.22484C2.1059 4.1399 2.12966 5.11973 2.43586 6.01943C2.74205 6.91914 3.31441 7.69094 4.0683 8.22072C2.70459 8.75127 1.53994 9.73303 0.748146 11.0195C0.706533 11.0848 0.677627 11.1582 0.663111 11.2353C0.648595 11.3125 0.648758 11.392 0.66359 11.4691C0.678421 11.5462 0.707626 11.6194 0.749507 11.6845C0.791387 11.7496 0.845108 11.8053 0.907547 11.8483C0.969985 11.8913 1.0399 11.9207 1.11321 11.9349C1.18653 11.
9492 1.2618 11.9479 1.33463 11.9311C1.40747 11.9143 1.47642 11.8825 1.53749 11.8373C1.59855 11.7922 1.65051 11.7347 1.69033 11.6682C2.20108 10.839 2.89996 10.1576 3.72352 9.68593C4.54707 9.21424 5.46921 8.96718 6.40619 8.96718C7.34317 8.96718 8.26531 9.21424 9.08887 9.68593C9.91243 10.1576 10.6113 10.839 11.1221 11.6682C11.2046 11.7976 11.332 11.8876 11.4768 11.9186C11.6217 11.9497 11.7723 11.9193 11.896 11.834C12.0198 11.7488 12.1069 11.6156 12.1383 11.4632C12.1698 11.3108 12.1432 11.1514 12.0642 11.0195C11.2724 9.73303 10.1078 8.75127 8.74408 8.22072ZM3.31244 4.51572C3.31244 3.86984 3.49389 3.23847 3.83383 2.70144C4.17378 2.16441 4.65696 1.74585 5.22227 1.49868C5.78758 1.25151 6.40963 1.18684 7.00975 1.31285C7.60988 1.43885 8.16114 1.74987 8.59381 2.20658C9.02647 2.66328 9.32112 3.24516
    9.4405 3.87863C9.55987 4.5121 9.4986 5.16871 9.26445 5.76542C9.03029 6.36214 8.63375 6.87216 8.12499 7.23099C7.61622 7.58982 7.01808 7.78135 6.40619 7.78135C5.58597 7.78037 4.7996 7.43599 4.21961 6.82378C3.63962 6.21157 3.31337 5.38152 3.31244 4.51572ZM18.0879 11.8411C17.963 11.9271 17.8108 11.9572 17.6648 11.9248C17.5188 11.8924 17.3911 11.8001 17.3096 11.6682C16.7994 10.8385 16.1006 10.1568 15.2769 9.68534C14.4532 9.21384 13.5307 8.96752 12.5937 8.96885C12.4445 8.96885 12.3014 8.90629 12.1959 8.79494C12.0905 8.68359 12.0312 8.53257 12.0312 8.3751C12.0312 8.21763 12.0905 8.0666 12.1959 7.95525C12.3014 7.8439 12.4445 7.78135 12.5937 7.78135C13.0493 7.78089 13.4992 7.67423 13.9112 7.46897C14.3232 7.26371 14.6872 6.96493 14.9772 6.59398C15.2671 6.22302 15.4759 5.78904 15.5885 5.323
    06C15.7011 4.85707 15.7149 4.37057 15.6287 3.89833C15.5426 3.42609 15.3587 2.97976 15.0902 2.59123C14.8217 2.2027 14.4752 1.88156 14.0755 1.65076C13.6758 1.41995 13.2328 1.28519 12.778 1.25608C12.3232 1.22698 11.868 1.30426 11.4448 1.4824C11.3758 1.51389 11.3015 1.53046 11.2263 1.53113C11.1512 1.5318 11.0766 1.51656 11.0071 1.48631C10.9376 1.45606 10.8746 1.41141 10.8217 1.35501C10.7689 1.2986 10.7272 1.23158 10.6993 1.15791C10.6714 1.08424 10.6578 1.00541 10.6592 0.926073C10.6606 0.846739 10.6771 0.768514 10.7077 0.696019C10.7382 0.623524 10.7822 0.55823 10.8371 0.503995C10.892 0.44976 10.9566 0.407684 11.0271 0.380254C11.9957 -0.0274659 13.0729 -0.042138 14.0511 0.339068C15.0293 0.720273 15.839 1.47035 16.3242 2.44459C16.8094 3.41883 16.9355 4.5482 16.6784 5.61484C16.4212 6.68148 15.7989 7.609
    8 14.9316 8.22072C16.2953 8.75127 17.4599 9.73303 18.2517 11.0195C18.3332 11.1514 18.3617 11.312 18.331 11.4661C18.3003 11.6202 18.2128 11.7551 18.0879 11.8411Z" fill="#FAFAFA"/>
                    </svg>
                verwijderen
            </a>
        </div>
    `;
    usersdiv.appendChild(userdiv);
    let playerspan = document.querySelector('.js-roomcount');
    const aantalplayers = document.querySelectorAll('.c-room').length;
    playerspan = aantalplayers;
});
    });

    socket.on('userjoined', (user) => {
            
        const userdiv = document.createElement('div');
        userdiv.dataset.id = user.id;
        userdiv.classList.add('c-room', 'c-lobbyperson__card');
        userdiv.innerHTML = `
            <div class="c-room__info">
                <img src="../img/profile_1.png" alt="profiel" class="c-room__img">
                <h3 class="c-room__title c-lobbyperson">${user.userName}</h3>
            </div>
            <div class="c-room__info">
                <a href="./room/${roomid}" class="c-button c-room__btn">
                    <svg width="19" height="12" viewBox="0 0 19 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.74408 8.22072C9.49798 7.69094 10.0703 6.91914 10.3765 6.01943C10.6827 5.11973 10.7065 4.1399 10.4443 3.22484C10.1821 2.30977 9.64795 1.50806 8.92073 0.938252C8.19351 0.368443 7.31187 0.060791 6.40619 0.060791C5.50051 0.060791 4.61888 0.368443 3.89166 0.938252C3.16444 1.50806 2.63024 2.30977 2.36807 3.22484C2.1059 4.1399 2.12966 5.11973 2.43586 6.01943C2.74205 6.91914 3.31441 7.69094 4.0683 8.22072C2.70459 8.75127 1.53994 9.73303 0.748146 11.0195C0.706533 11.0848 0.677627 11.1582 0.663111 11.2353C0.648595 11.3125 0.648758 11.392 0.66359 11.4691C0.678421 11.5462 0.707626 11.6194 0.749507 11.6845C0.791387 11.7496 0.845108 11.8053 0.907547 11.8483C0.969985 11.8913 1.0399 11.9207 1.11321 11.9349C1.18653 11.
9492 1.2618 11.9479 1.33463 11.9311C1.40747 11.9143 1.47642 11.8825 1.53749 11.8373C1.59855 11.7922 1.65051 11.7347 1.69033 11.6682C2.20108 10.839 2.89996 10.1576 3.72352 9.68593C4.54707 9.21424 5.46921 8.96718 6.40619 8.96718C7.34317 8.96718 8.26531 9.21424 9.08887 9.68593C9.91243 10.1576 10.6113 10.839 11.1221 11.6682C11.2046 11.7976 11.332 11.8876 11.4768 11.9186C11.6217 11.9497 11.7723 11.9193 11.896 11.834C12.0198 11.7488 12.1069 11.6156 12.1383 11.4632C12.1698 11.3108 12.1432 11.1514 12.0642 11.0195C11.2724 9.73303 10.1078 8.75127 8.74408 8.22072ZM3.31244 4.51572C3.31244 3.86984 3.49389 3.23847 3.83383 2.70144C4.17378 2.16441 4.65696 1.74585 5.22227 1.49868C5.78758 1.25151 6.40963 1.18684 7.00975 1.31285C7.60988 1.43885 8.16114 1.74987 8.59381 2.20658C9.02647 2.66328 9.32112 3.24516
    9.4405 3.87863C9.55987 4.5121 9.4986 5.16871 9.26445 5.76542C9.03029 6.36214 8.63375 6.87216 8.12499 7.23099C7.61622 7.58982 7.01808 7.78135 6.40619 7.78135C5.58597 7.78037 4.7996 7.43599 4.21961 6.82378C3.63962 6.21157 3.31337 5.38152 3.31244 4.51572ZM18.0879 11.8411C17.963 11.9271 17.8108 11.9572 17.6648 11.9248C17.5188 11.8924 17.3911 11.8001 17.3096 11.6682C16.7994 10.8385 16.1006 10.1568 15.2769 9.68534C14.4532 9.21384 13.5307 8.96752 12.5937 8.96885C12.4445 8.96885 12.3014 8.90629 12.1959 8.79494C12.0905 8.68359 12.0312 8.53257 12.0312 8.3751C12.0312 8.21763 12.0905 8.0666 12.1959 7.95525C12.3014 7.8439 12.4445 7.78135 12.5937 7.78135C13.0493 7.78089 13.4992 7.67423 13.9112 7.46897C14.3232 7.26371 14.6872 6.96493 14.9772 6.59398C15.2671 6.22302 15.4759 5.78904 15.5885 5.323
    06C15.7011 4.85707 15.7149 4.37057 15.6287 3.89833C15.5426 3.42609 15.3587 2.97976 15.0902 2.59123C14.8217 2.2027 14.4752 1.88156 14.0755 1.65076C13.6758 1.41995 13.2328 1.28519 12.778 1.25608C12.3232 1.22698 11.868 1.30426 11.4448 1.4824C11.3758 1.51389 11.3015 1.53046 11.2263 1.53113C11.1512 1.5318 11.0766 1.51656 11.0071 1.48631C10.9376 1.45606 10.8746 1.41141 10.8217 1.35501C10.7689 1.2986 10.7272 1.23158 10.6993 1.15791C10.6714 1.08424 10.6578 1.00541 10.6592 0.926073C10.6606 0.846739 10.6771 0.768514 10.7077 0.696019C10.7382 0.623524 10.7822 0.55823 10.8371 0.503995C10.892 0.44976 10.9566 0.407684 11.0271 0.380254C11.9957 -0.0274659 13.0729 -0.042138 14.0511 0.339068C15.0293 0.720273 15.839 1.47035 16.3242 2.44459C16.8094 3.41883 16.9355 4.5482 16.6784 5.61484C16.4212 6.68148 15.7989 7.609
    8 14.9316 8.22072C16.2953 8.75127 17.4599 9.73303 18.2517 11.0195C18.3332 11.1514 18.3617 11.312 18.331 11.4661C18.3003 11.6202 18.2128 11.7551 18.0879 11.8411Z" fill="#FAFAFA"/>
                    </svg>
                verwijderen
            </a>
        </div>
    `;
    usersdiv.appendChild(userdiv);
    });

    socket.on('userleft', (user) => {
        console.log("dit is een test van de federale overheid");
        const userdiv = document.querySelector(`.c-room[data-id="${user.id}"]`);
        console.log(user);
        userdiv.remove();
    });

   


    

}
}

// function initRooms()
// {
// if(document.querySelector('.js-rooms'))
// {
//     const makeroombutton = document.querySelector('.js-makeroom')
//     makeroombutton.addEventListener('click',function(){
//         showPopup({
//             title: "Kamer gegevens",
//             type: "start_game",
//             buttons: [
//               {
//                 text: "Continue",
//                 action: () => {
                
//                 }
//               }
//             ]
//           });
//     })

//     const socket = io("/room"); // Replace with your server URL
// socket.on("connection", () => {
//     console.log("Connected to server");
// });



// let xhrstatus = new XMLHttpRequest();
// xhrstatus.open("GET", "/getrooms", true);
// xhrstatus.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

// xhrstatus.onreadystatechange = function () {
//     if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
//         const response = JSON.parse(this.responseText);
//         if(response.success == true) {
//            const rooms = response.rooms;
//            document.querySelector('.js-rooms').innerHTML = '';
//            let roomlist = "";
//             rooms.forEach(room => {
//                 const playerCount = room.users.length;
//                 const roomHTML = `
//                 <div class="c-room">
//                     <div class="c-room__info">
//                         <img src="img/profile_1.png" alt="profile" class="c-room__img">
//                         <h3 class="c-room__title">${room.roomname}</h3>
//                     </div>
//                     <div class="c-room__info">
//                         <h4 class="c-room__players">${playerCount}</h4>
//                         <a href="./room/${room.roomcode}" class="c-button c-room__btn">
//                             <svg class="c-room__svgs" width="19" height="19" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                 <path d="M16 20C17.3807 20 18.5 18.8807 18.5 17.5C18.5 16.1193 17.3807 15 16 15C14.6193 15 13.5 16.1193 13.5 17.5C13.5 18.8807 14.6193 20 16 20Z" stroke="#343330" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
//                                 <path d="M16 20V23" stroke="#343330" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
//                                 <path d="M26 11H6C5.44772 11 5 11.4477 5 12V26C5 26.5523 5.44772 27 6 27H26C26.5523 27 27 26.5523 27 26V12C27 11.4477 26.5523 11 26 11Z" stroke="#343330" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
//                                 <path d="M11 11V7C11 5.67392 11.5268 4.40215 12.4645 3.46447C13.4021 2.52678 14.6739 2 16 2C17.3261 2 18.5979 2.52678 19.5355 3.46447C20.4732 4.40215 21 5.67392 21 7V11" stroke="#343330" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
//                             </svg>
//                             Join
//                         </a>
//                     </div>
//                 </div>`;
//             roomlist += roomHTML;
//             });
//             document.querySelector('.js-rooms').innerHTML = roomlist;
//         }
//         else{
//             //go to /login
//             window.location.href = '/login';
//         }
//     }
// };

// xhrstatus.onerror = function () {
//     console.error('An error occurred during the AJAX request.');
// };
// xhrstatus.send();
// }
// }


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
                        body: JSON.stringify(data)
                    });

                    const jsonresponse = await response.json();;

                    if (jsonresponse.type == 'succes')
                    {
                        window.location.href = '/dashboard';
                       
                    } 
                    else {
                        const input = document.querySelector(`.js-input[name="${jsonresponse.inputtype}"]`);
                        input.classList.add('c-input--error');
                        showerror(input.closest('.c-label').querySelector('.c-input__errorSpan'), jsonresponse.message);
                        removeicon(input.parentElement);
                        summonicon(input.parentElement, "invalid");
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
                        body: JSON.stringify(data)
                    });

                    const jsonresponse = await response.json();;

                    if (jsonresponse.type == 'succes')
                    {
                        window.location.href = '/login';
                       
                    } 
                    else {
                        const input = document.querySelector(`.js-input[name="${jsonresponse.inputtype}"]`);
                        input.classList.add('c-input--error');
                        showerror(input.closest('.c-label').querySelector('.c-input__errorSpan'), jsonresponse.message);
                        removeicon(input.parentElement);
                        summonicon(input.parentElement, "invalid");
                    }
                } 
                catch (error) {
                    alert('Er is iets misgegaan. Probeer het later opnieuw.');
                }
            }
        });
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
            if (isReconnected) {
              // Show the next popup if reconnect works
              showPopup({
                title: "Reconnected!",
                type: "start_game",
                buttons: [
                  {
                    text: "Continue",
                    action: () => {
                        //go to /rooms
                        window.location.href = '/rooms';
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
          
        });
        }
        
    } 



function validateInput(e) {
    const inputspan = e.target.parentElement;
    const error = e.target.closest('.c-label').querySelector('.c-input__errorSpan'); 
    let isvalid = true;
    
    if(e.target.value === '') {
        e.target.classList.add('c-input--error');
        showerror(error,'Dit veld is verplicht');
        summonicon(inputspan,"invalid");
        isvalid = false;
        return false;
    }

    if(e.target.type === 'email') {
        if(!validateEmail(e.target.value)) {
            e.target.classList.add('c-input--error');
            showerror(error,'Dit is geen geldig emailadres');
            summonicon(inputspan,"invalid");
            isvalid = false;
            return false;
        }
    }

    if(document.querySelector('.js-repeatpassword')) {
        if(e.target.type === 'password') {
            const re = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
            if(!re.test(e.target.value)) {
                e.target.classList.add('c-input--error');
                showerror(error,'Dit wachtwoord is niet veilig');
                summonicon(inputspan,"invalid");
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
                        summonicon(document.querySelector('.js-repeatpassword').parentElement, "invalid");
                        return false;
                    }
                }
            }
        }
    }

    if(isvalid == true) {
        e.target.classList.add('c-input--valid');
        summonicon(inputspan,"valid");
    }


    return true;
}

function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}

function summonicon(inputspan,status) {
    if(status === "invalid") {
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
    if(status === "valid") {
        if(!inputspan.querySelector('.c-input__errorIcon')) {
            inputspan.insertAdjacentHTML('beforeend', `<svg class="c-input__errorIcon c-input__errorIcon--valid" width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.5 2.15625C9.65198 2.15625 7.84547 2.70425 6.30889 3.73096C4.77232 4.75766 3.57471 6.21695 2.8675 7.9243C2.1603 9.63165 1.97526 11.5104 2.33579 13.3229C2.69632 15.1354 3.58623 16.8003 4.89298 18.107C6.19972 19.4138 7.86462 20.3037 9.67713 20.6642C11.4896 21.0247 13.3684 20.8397 15.0757 20.1325C16.783 19.4253 18.2423 18.2277 19.269 16.6911C20.2958 15.1545 20.8438 13.348 20.8438 11.5C20.8411 9.02269 19.8559 6.64759 18.1041 4.89586C16.3524 3.14413 13.9773 2.15887 11.5 2.15625ZM15.6023 9.85227L10.571 14.8835C10.5043 14.9503 10.425 15.0034 10.3377 15.0395C10.2505 15.0757 10.157 15.0943 10.0625 15.0943C9.96805 15.0943 9.87452 15.0757 9.78727 15.0395C9.70001 15.0034 9.62074 14.9503 9.55399 14.8835L7.39774 12.7273C7.26287 12.5924 7.1871 12.4095 7.1871 12.2188C7.1871 12.028 7.26287 11.8451 7.39774 11.7102C7.5326 11.5754 7.71552 11.4996 7.90625 11.4996C8.09698 11.4996 8.2799 11.5754 8.41477 11.7102L10.0625 13.3589L14.5852 8.83523C14.652 8.76845 14.7313 8.71548 14.8185 8.67934C14.9058 8.6432 14.9993 8.6246 15.0938 8.6246C15.1882 8.6246 15.2817 8.6432 15.369 8.67934C15.4562 8.71548 15.5355 8.76845 15.6023 8.83523C15.669 8.90201 15.722 8.98129 15.7582 9.06854C15.7943 9.15579 15.8129 9.24931 15.8129 9.34375C15.8129 9.43819 15.7943 9.53171 15.7582 9.61896C15.722 9.70621 15.669 9.78549 15.6023 9.85227Z" fill="#AECA5A"/>
</svg>
`);
        }
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
        removeicon(inputspan, "valid");
        clearerror(error);
    }
    else
    {
        e.target.classList.remove('c-input--valid');
        const inputspan = e.target.parentElement;
        removeicon(inputspan, "valid");
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
    const deviceId = localStorage.getItem("bluetoothDeviceId");
    // const deviceId ="39/5Qt9drL95/Se/Qx4FDg==";
    if (!deviceId) return false;
  
    const devices = await navigator.bluetooth.getDevices();
    const device = devices.find((d) => d.id === deviceId);
   
    if (!device) return false;
    console.log("run ik hier ???");
    if (!device.watchAdvertisements) return false;
  
    return new Promise((resolve) => {
        const timeout = setTimeout(() => {
          resolve(false); // Resolve with false if it times out
          console.log("oei");
        }, 5000); // 5 seconds timeout
      
        device.addEventListener("advertisementreceived", async () => {
          try {
            clearTimeout(timeout); // Clear the timeout if the event fires
            await setupHeartRateNotifications(device);
            resolve(true);
          } catch {
            resolve(false);
          }
        });
      
        device.watchAdvertisements().catch(() => {
          clearTimeout(timeout); // Clear the timeout if an error occurs
          resolve(false);
        });
      });
      
  }
  
  // Connect function
  async function connectPolarHeartRateMonitor() {
    try {
      const device = await navigator.bluetooth.requestDevice({
        filters: [{ services: ["heart_rate"] }],
        optionalServices: ["heart_rate"]
      });
  
      localStorage.setItem("bluetoothDeviceId", device.id);
      loadanimation();
      await setupHeartRateNotifications(device);
        removeanimation();
  
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


// Functie om een modal te tonen
function showModal(button) {
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = `
        <div class="modalroom__content">
            <button class=" c-button modal__close">x</button>
            <h2>Room is locked 🔒</h2>
            <p>You need permission to join this room.</p>
            <form id="passwordForm">
                <input class="c-loginForm__inputdiv" type="password" id="passwordInput" placeholder="Enter password" required />
                <button class="c-button c-mt" type="submit" class="modal__submit">Submit</button>
            </form>
        </div>
    `;

    document.body.appendChild(modal);

    // Sluitknop voor de modal
    modal.querySelector('.modal__close').addEventListener('click', () => {
        modal.remove();
    });

    // Handeling voor het verzenden van het wachtwoord
    modal.querySelector('#passwordForm').addEventListener('submit', (e) => {
        e.preventDefault(); // Voorkom standaard formulieractie
        const pass = document.querySelector('#passwordInput').value;
        if (pass === '1234') {
            // Redirect naar de link van de knop
            window.location = button.getAttribute('href');
        } else {
            alert('Incorrect password');
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.js-room-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const isLocked = button.getAttribute('data-locked') === 'true';

            if (isLocked) {
                event.preventDefault(); // Voorkom de standaard linkactie
                showModal(button); // Geef de knop door aan de modal
            } else {
                event.preventDefault(); // Zorg ervoor dat de standaard actie geblokkeerd wordt
                window.location = button.getAttribute('href');
            }
        });
    });
    const triggerDiv = document.querySelector('.js-tip--greece');
const modal = document.querySelector('.c-modeltip');
const overlay = document.querySelector('.overlay');
const closeModalButton = modal.querySelector('.c-tipmodel-close');

// Show the modal and overlay when the div is clicked
triggerDiv.addEventListener('click', () => {
    modal.style.display = 'block';
    overlay.style.display = 'block';
    
    // Animate the modal sliding in from the left
    setTimeout(() => {
        modal.style.right = '80px'; // Adjust to position it fully visible
    }, 10); // Small delay to ensure display:block is applied
});

// Hide the modal and overlay when the close button is clicked
closeModalButton.addEventListener('click', () => {
    modal.style.right = '-300px'; // Slide out to the left
    overlay.style.display = 'none';
    
    // Hide the modal completely after the animation
    setTimeout(() => {
        modal.style.display = 'none';
    }, 500); // Match transition duration
});

// Hide the modal and overlay when the overlay is clicked
overlay.addEventListener('click', () => {
    modal.style.left = '-300px'; // Slide out to the left
    overlay.style.display = 'none';

    // Hide the modal completely after the animation
    setTimeout(() => {
        modal.style.display = 'none';
    }, 500); // Match transition duration
});


});



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

