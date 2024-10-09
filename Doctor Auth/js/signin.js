// const myModal = document.getElementById('myModal')
// const myInput = document.getElementById('myInput')

// myModal.addEventListener('shown.bs.modal', () => {
//   myInput.focus()
// })

function toggleModal(_old, _new, backBtn=null) {
    let old_modal = document.querySelector(`#${_old}`);
    let new_modal = document.querySelector(`#${_new}`);
    // let backSvg = document.querySelector(".back-svg");

    if (old_modal.classList.contains('hide')) {
        old_modal.classList.remove('hide');
        new_modal.classList.add('hide');
        // backSvg.classList.add('hide');
    } else {
        old_modal.classList.add('hide');
        new_modal.classList.remove('hide');
        // backSvg.classList.remove('hide');
    }
    if (backBtn != null) {
        document.querySelector(`.${_new}`).querySelectorAll("input").forEach((input) => {
            console.log("lll",input);
            input.value = null;
            if (input.classList.contains("filled-input")){
                input.classList.remove("filled-input");
            }
        })
    }
}


const inputs = ["input1", "input2", "input3", "input4"];
let errorMsg = document.querySelector('.verify-error-msg');
let button = document.querySelector('button[type="submit"]');
let otpValue = "";

inputs.map((id) => {
    const input = document.getElementById(id);
    addListener(input);
});

function addListener(input) {
    input.addEventListener("keyup", function(event) {
        const code = parseInt(input.value);
        if (code >= 0 && code <= 9) {
            const n = input.nextElementSibling;
            if (n) {
                n.focus();
                input.classList.add('filled-input');
            }
            else if (!n && input.getAttribute('data-position') == 'last') {
                input.classList.add('filled-input');
            }
        } else {
            input.value = "";
        }

        const key = event.key;
        if (key === "Backspace" || key === "Delete") {
            const prev = input.previousElementSibling;
            if (prev && input.getAttribute('data-position') == 'last') {
                input.classList.remove('filled-input');
            }
            if (prev) {
                prev.focus();
                prev.classList.remove('filled-input');
            }
        }

        // Update otpValue whenever a key is pressed
        updateOtpValue();
    });

    input.addEventListener("blur", () => {
        if (input.value.trim() == '') {
            input.classList.remove('filled-input');
        }
    });

    // Add paste event listener
    input.addEventListener("paste", (e) => {
        e.preventDefault();
        const pasteData = e.clipboardData.getData('text').trim();
        const inputsElements = inputs.map(id => document.getElementById(id));

        // Distribute pasted data across the input fields
        pasteData.split('').forEach((char, index) => {
            if (inputsElements[index]) {
                inputsElements[index].value = char;
                inputsElements[index].classList.add('filled-input');
            }
        });

        // Focus the last input field
        inputsElements[inputsElements.length - 1].focus();

        // Update otpValue after paste
        updateOtpValue();
    });
}

// Function to update otpValue
function updateOtpValue() {
    otpValue = inputs.map(id => document.getElementById(id).value).join('');
}


function togglePasswordField(event, icon) {
    let passwordField = icon.closest('.password-input-div').querySelector('input[data-type="password"]');
    if (icon.classList.contains('hide-password-icon') && passwordField.type == 'password') {
        passwordField.type = 'text';
        icon.classList.add('hide');
        icon.closest('.password-input-div').querySelector('.show-password-icon').classList.remove('hide');
    }
    else if (icon.classList.contains('show-password-icon') && passwordField.type == 'text') {
        passwordField.type = 'password';
        icon.classList.add('hide');
        icon.closest('.password-input-div').querySelector('.hide-password-icon').classList.remove('hide');
    }
}
