document.addEventListener('DOMContentLoaded', function () {
    const display = document.querySelector('.display');
    const keys = document.querySelector('.keys');

    let currentInput = '0';
    let operator = '';
    let prevInput = '';

    function updateDisplay() {
        display.value = prevInput + operator + currentInput;
    }

    function clear() {
        currentInput = '0';
        operator = '';
        prevInput = '';
        updateDisplay();
    }

    function square() {
        let result;
        // Check if there's a previous input (for squaring after operations)
        if (prevInput !== '') {
          result = operate(); // Call operate to perform squaring if previous input exists
        } else {
          const numberToSquare = parseFloat(currentInput);
          result = numberToSquare * numberToSquare;
        }
        currentInput = result.toString();
        prevInput = '';
        operator = '';
        updateDisplay();
    }
    
    function operate() {
        let result;
        const num1 = parseFloat(prevInput);
        const num2 = parseFloat(currentInput);
        switch (operator) {
            case '+':
                result = num1 + num2;
                break;
            case '-':
                result = num1 - num2;
                break;
            case '*':
                result = num1 * num2;
                break;
            case '/':
                if (num2 === 0) {
                    displayError('Error: Division by zero');
                    return;
                }
                result = num1 / num2;
                break;
            case '%':
                result = num1 % num2;
                break;
            default:
                result = num2;
        }
        currentInput = result.toString();
        prevInput = '';
        operator = '';
        updateDisplay();
    }

    function displayError(message) {
        display.value = message;
        setTimeout(() => {
            updateDisplay();
        }, 2000); // Clear error message after 2 seconds
    }

    keys.addEventListener('click', function (event) {
        const { target } = event;
        if (target.classList.contains('number')) {
            if (currentInput === '0' || currentInput === '') {
                currentInput = target.value;
            } else {
                currentInput += target.value;
            }
            updateDisplay();
        } else if (target.classList.contains('operator')) {
            if (prevInput !== '' && currentInput !== '') {
                operate();
            }
            operator = target.value;
            prevInput = currentInput;
            currentInput = '';
            updateDisplay();
        } else if (target.classList.contains('equal')) {
            if (prevInput !== '' && currentInput !== '') {
                operate();
            }
        } else if (target.classList.contains('clear')) {
            clear();
        } else if (target.classList.contains('decimal')) {
            if (currentInput.includes('.')) {
                displayError('Error: Multiple decimal points in number');
            } else {
                currentInput += '.';
                updateDisplay();
            }
        } else if (target.classList.contains('square')) { // New button for squaring
            square();
        }
    });

    updateDisplay();
});
