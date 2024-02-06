document.addEventListener('DOMContentLoaded', function() {
    const inputDisplay = document.querySelector(".input-display");
    const outputDisplay = document.querySelector(".output-display");
    const buttons = document.querySelectorAll("button");
    console.log(buttons);
    const specialChars = ["%", "*", "/", "-", "+", "="];
    let input = "";
    let output = "";

    // Define function to calculate based on button clicked.
    const calculate = (btnValue) => {
        inputDisplay.focus();
        try {
            if (btnValue === "=" && input !== "") {
                // If input has '%', replace with '/100' before evaluating.
                output = eval(input.replace("%", "/100"));
                if (output % 1 !== 0) {
                    output = output.toFixed(2);
                }
                outputDisplay.value = output;
            } else if (btnValue === "AC") {
                input = "";
                output = "";
                inputDisplay.value = "";
                outputDisplay.value = "";
            } else if (btnValue === "DEL") {
                // If DEL button is clicked, remove the last character from the input.
                input = input.toString().slice(0, -1);
            } else {
                if (btnValue === "." && input.includes(".")) return; // Prevent multiple decimal points
                // If input is empty and button is specialChars then return
                if (input === "" && specialChars.includes(btnValue)) return;
                input += btnValue;
            }
            inputDisplay.value = input; // Update input display
        } catch (error) {
            // Handle error cases
            output = "Error";
            outputDisplay.value = output;
        }
    };

    // Add event listener to buttons, call calculate() on click.
    buttons.forEach((button) => {
        // Button click listener calls calculate() with dataset value as argument.
        button.addEventListener("click", (e) => calculate(e.target.dataset.value));
    });

    // Add event listener for keyboard input.
    document.addEventListener("keyup", (e) => {
        // Get the key code of the pressed key
        const key = e.key;

        // Determine if the pressed key is a digit or operator
        if (!isNaN(parseInt(key)) || specialChars.includes(key) || key === ".") {
            calculate(key);
        }

        // Handle Enter key
        if (key === "Enter") {
            calculate("=");
        }

        // Handle Backspace key
        if (key === "Backspace") {
            calculate("DEL");
        }
        if (key === "Escape") {
            calculate("AC");
        }
    });
});
