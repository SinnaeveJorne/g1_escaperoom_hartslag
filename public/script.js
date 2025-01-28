

document.addEventListener('DOMContentLoaded', init);
let socket = "";

function init() {
    initLoginForm();
    initRegisterForm();

    if(document.querySelector('.js-jorneplsleerditgebruiken')){
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
    }
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
            const re = /^(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            if(!re.test(e.target.value)) {
                e.target.classList.add('c-input--error');
                showerror(error,'Wachtwoord moet minimaal 8 karakters lang zijn en minimaal 1 speciaal karakter bevatten');
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

