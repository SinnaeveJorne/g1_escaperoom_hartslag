let swiper;
function init(){
    if(document.querySelector('.swiper-container'))
        {
          function initializeSwiper() {
            const containerWidth = window.innerWidth;
    
            // Destroy the previous swiper instance if it exists
            if (swiper) {
                swiper.destroy(true, true);
            }
    
            // Create a new swiper instance based on the window size
            swiper = new Swiper('.swiper-container', {
                slidesPerView: 3,  // Always show 3 slides at once
                spaceBetween: 30,   // Space between slides
                centeredSlides: true, // Centers the active slide
                loop: true,  // Infinite loop
                effect: 'coverflow', // Use the coverflow effect
                coverflowEffect: {
                    rotate: 50,   // Adjust the rotation angle
                    stretch: 0,   // No stretching between slides
                    depth: 100,   // Depth of the effect
                    modifier: 1,  // Overall strength of the effect
                    slideShadows: true, // Enable shadows for the effect
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                // Add navigation arrows
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                // Dynamic breakpoints logic to adjust slidesPerView
                breakpoints: {
                    300: {
                        slidesPerView: 1, // Show 1 slide for smaller screens
                    },
                    1200: {
                        slidesPerView: 3, // Show 3 slides for screens larger than 720px
                    },
                }
            });
        }
    
        // Initialize the swiper when the page is loaded
        window.addEventListener('load', initializeSwiper);
        // Reinitialize swiper when the window is resized
        window.addEventListener('resize', initializeSwiper);
        }
}

document.addEventListener('DOMContentLoaded', init);