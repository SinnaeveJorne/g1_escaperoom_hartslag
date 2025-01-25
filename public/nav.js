document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.c-nav__mainside__hamburger');
    const menu = document.querySelector('.c-nav__mainside__menu');

    hamburger.addEventListener('click', () => {
        menu.classList.toggle('c-nav__mainside__menu--active');
    });

    const trigger = document.getElementById('menu-trigger');
    const popupMenu = document.getElementById('popup-menu');

    // Voeg een event listener toe voor klikken op de trigger
    trigger.addEventListener('click', (event) => {
        event.stopPropagation(); // Voorkomt dat het menu sluit bij klikken binnen de trigger
        popupMenu.classList.toggle('c-menu__popup-menu--visible'); // Toggle de zichtbaarheid van het menu
    });

    // Sluit het menu als ergens anders wordt geklikt
    document.addEventListener('click', () => {
        popupMenu.classList.remove('c-menu__popup-menu--visible'); // Verwijder de zichtbare klasse
    });
});
      // Selecteer de trigger en het popup-menu
 