const deleteAccountBtn = document.getElementById('delete-account-btn');
const deleteModal = document.getElementById('delete-modal');
const cancelBtn = document.getElementById('cancel-btn');

// Show the modal
deleteAccountBtn.addEventListener('click', () => {
    deleteModal.style.display = 'flex';
});

// Hide the modal
cancelBtn.addEventListener('click', () => {
    deleteModal.style.display = 'none';
});

// Close modal when clicking outside the content
window.addEventListener('click', (e) => {
    if (e.target === deleteModal) {
        deleteModal.style.display = 'none';
    }
});

document.addEventListener('DOMContentLoaded', () => {
const deleteAccountButton = document.querySelector('#delete-account-btn');

if (deleteAccountButton) {
deleteAccountButton.addEventListener('click', (e) => {
    if (window.innerWidth > 600) {
        // Redirect to a new page if the viewport width is greater than 600px
        deleteModal.style.display = 'none';
        window.location.href = '/verwijderenAccount'; // Replace with your actual URL
    } else {
        // Prevent default behavior and show the popup for mobile
        e.preventDefault();
        showDeleteAccountPopup(); // This is your existing popup logic
    }
});
}
});
// Hide pop-up when not needed
const deletePopUp = document.querySelector('.delete-pop-up');

if (window.innerWidth > 600) {
deletePopUp.classList.remove('show'); // Make sure it's hidden
deletePopUp.style.display = 'none';  // Ensure display is set properly
}

// Show the pop-up only when necessary
function togglePopUp() {
if (window.innerWidth <= 600) {
deletePopUp.classList.add('show');
} else {
deletePopUp.classList.remove('show');
deletePopUp.style.display = 'none';
}
}

// Call this whenever needed
togglePopUp();


function showDeleteAccountPopup() {
// Code to show the popup
const popup = document.querySelector('#delete-account-popup');
if (popup) {
popup.style.display = 'block';
}
}
