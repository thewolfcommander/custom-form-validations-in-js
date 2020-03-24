const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password1 = document.getElementById('password1');
const password2 = document.getElementById('password2');

// Function to show error message to the input elements
function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

// Function to show the success message to the input elements
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

// Validate Email
var validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Validate Strong Password
var validateStrongPassword = (password) => {
    const re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    return re.test(String(password));
}

// Function to check required field
function checkRequired(inputArray) {
    inputArray.forEach(function(input) {
        if (input.value.trim() === '') {
            showError(input, `${getFieldName(input)} is required.`);
        } else {
            showSuccess(input);
        }
    })
}

// Get field name
function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Check field length
function checkLength(input, min, max) {
    if (input.value.trim().length < min) {
        showError(input, `${getFieldName(input)} cannot be less than ${min} characters.`);
    } else if (input.value.trim().length > max) {
        showError(input, `${getFieldName(input)} cannot be greater than ${max} characters.`);
    } else {
        showSuccess(input);
    }
}

function checkPasswords(password1, password2) {
    if (password2 === password1) {
        showSuccess(password2);
    } else if (password2 != password1) {
        showError(password2, "Passwords do not match.");
    }
}

// Event listeners
form.addEventListener('submit', function(e) {
    e.preventDefault();

    checkRequired([username, email, password1, password2]);
    checkLength(username, 3, 15);
    checkLength(password1, 6, 16);

    checkPasswords(password1, password2);
})