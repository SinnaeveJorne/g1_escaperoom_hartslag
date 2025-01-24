document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.c-nav__mainside__hamburger');
    const menu = document.querySelector('.c-nav__mainside__menu');

    hamburger.addEventListener('click', () => {
        menu.classList.toggle('c-nav__mainside__menu--active');
    });
});
