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
var validateEmail = (input) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    if (re.test(input.value.trim())) {
        showSuccess(input);
    }
    else {
        showError(input, 'Email is not valid');
    }
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

function checkPasswords(input1, input2) {
    if (input1.value !== input2.value) {
        showError(input2, 'Passwords do not match');
    }
}

// Event listeners
form.addEventListener('submit', function(e) {
    e.preventDefault();

    checkRequired([username, email, password1, password2]);
    checkLength(username, 3, 15);
    checkLength(password1, 6, 16);

    validateEmail(email);

    checkPasswords(password1, password2)

})