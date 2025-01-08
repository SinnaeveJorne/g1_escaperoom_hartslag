document.addEventListener('DOMContentLoaded', init);

function init() {
    if(document.querySelector('.js-loginform')) {
       let inputs = document.querySelectorAll('.js-input');
       inputs.forEach(input => {
              input.addEventListener('blur', validateInput);
              input.addEventListener('focus', (e) => {
                console.log('focus');
                if(e.target.classList.contains('c-input--error')) {
                    console.log('focus');
                    e.target.classList.remove('c-input--error');
                    const inputspan = e.target.parentElement;
                    const error = e.target.closest('.c-label').querySelector('.c-input__errorSpan');
                    removeicon(inputspan);
                    clearerror(error);
                }
                });     
        
       });

         document.querySelector('.js-loginform').addEventListener('submit', (e) => {
            e.preventDefault();
            inputs.forEach(input => {
                validateInput({target: input});
            });
        });
    }
    }


    function validateInput(e) {
        
        const inputspan = e.target.parentElement;
        const error = e.target.closest('.c-label').querySelector('.c-input__errorSpan'); 
        if(e.target.value === '') {
            e.target.classList.add('c-input--error');
            showerror(error,'Dit veld is verplicht');
            summonicon(inputspan,error)
            return;
        }



        // if(e.target == type email)
        if(e.target.type === 'email') {
            if(!validateEmail(e.target.value)) {
                e.target.classList.add('c-input--error');
                showerror(error,'Dit is geen geldig emailadres');
                summonicon(inputspan,error)
                return;
            }
        }

    }

    function validateEmail(email) {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    function summonicon(inputspan) {
        // Check if the icon already exists to avoid duplicates
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

    function removeicon(inputspan) {
        inputspan.querySelector('.c-input__errorIcon').remove();
    }

    function showerror(error,message) {
        error.textContent = message;
        error.style.opacity = 1;
    }

    function clearerror(error) {
        error.textContent = '';
        error.style.opacity = 0;
    }