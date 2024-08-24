// script.js
document.addEventListener("DOMContentLoaded", function () {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');

    let currentInput = '0'; // Stores current input string
    let operator = null;    // Stores the last operator
    let previousValue = null; // Stores the previous value

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const value = this.textContent;

            if (value === 'C') {
                // Clear the display and reset states
                currentInput = '0';
                operator = null;
                previousValue = null;
            } else if (value === '±') {
                // Toggle the sign of the current input
                currentInput = String(-parseFloat(currentInput));
            } else if (value === '%') {
                // Convert the current input to percentage
                currentInput = String(parseFloat(currentInput) / 100);
            } else if (value === '÷' || value === '×' || value === '-' || value === '+') {
                // Save the current input and operator
                operator = value;
                previousValue = parseFloat(currentInput);
                currentInput = '0';
            } else if (value === '=') {
                // Perform the calculation
                if (operator && previousValue !== null) {
                    let result;
                    const currentValue = parseFloat(currentInput);

                    switch (operator) {
                        case '+':
                            result = previousValue + currentValue;
                            break;
                        case '-':
                            result = previousValue - currentValue;
                            break;
                        case '×':
                            result = previousValue * currentValue;
                            break;
                        case '÷':
                            result = previousValue / currentValue;
                            break;
                    }

                    // Format the result conditionally
                    currentInput = formatResult(result);
                    operator = null;
                    previousValue = null;
                }
            } else {
                // Append the clicked button's value to the current input
                if (currentInput === '0' && value !== '.') {
                    currentInput = value;
                } else {
                    currentInput += value;
                }
            }

            // Update the display with the current input
            display.textContent = currentInput;
        });
    });

    function formatResult(result) {
        // If result has a decimal part and it's not zero, show up to three decimal places
        if (result % 1 !== 0) {
            return parseFloat(result).toFixed(3);
        }
        // If result is an integer, show as integer
        return String(result);
    }
});
