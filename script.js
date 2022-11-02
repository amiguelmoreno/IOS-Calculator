const { clearImmediate } = require("core-js");

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const allClearButton = document.querySelector("[data-all-clear]");
const deleteButton = document.querySelector("[data-delete]");
const previousOperationTextEl = document.querySelector(
    "[data-previous-operation]"
);
const currentOperationTextEl = document.querySelector(
    "[data-current-operation]"
);

const numbPad = [
    "Numpad0",
    "Numpad1",
    "Numpad2",
    "Numpad3",
    "Numpad4",
    "Numpad5",
    "Numpad6",
    "Numpad7",
    "Numpad8",
    "Numpad9",
];

const operationPad = [
    "NumpadDivide",
    "NumpadMultiply",
    "NumpadSubtract",
    "NumpadAdd",
];

const keyPad = [
    "Numpad0",
    "Numpad1",
    "Numpad2",
    "Numpad3",
    "Numpad4",
    "Numpad5",
    "Numpad6",
    "Numpad7",
    "Numpad8",
    "Numpad9",
    "NumpadDivide",
    "NumpadMultiply",
    "NumpadSubtract",
    "NumpadAdd",
    "Delete",
    "NumpadEnter",
    "Backspace",
];

console.log(
    numberButtons,
    operationButtons,
    equalsButton,
    allClearButton,
    previousOperationTextEl,
    currentOperationTextEl
);

class Calculator {
    constructor(previousOperationTextEl, currentOperationTextEl) {
        this.previousOperationTextEl = previousOperationTextEl;
        this.currentOperationTextEl = currentOperationTextEl;
        this.clear();
    }

    clear() {
        this.currentOperation = "";
        this.previousOperation = "";
        this.operation = undefined;
    }

    delete() {
        this.currentOperation = this.currentOperation.toString().slice(0, -1);
    }

    appendNumber(number) {
        if (number === "." && this.currentOperation.includes(".")) return;
        this.currentOperation =
            this.currentOperation.toString() + number.toString();
    }

    chooseOperation(operation) {
        if (this.currentOperation === "") return;
        if (this.previousOperation !== "") {
            this.compute();
        }
        this.operation = operation;
        this.previousOperation = this.currentOperation;
        this.currentOperation = "";
    }

    compute() {
        let computation;
        const prev = +this.previousOperation;
        const current = +this.currentOperation;
        if (isNaN(prev) || isNaN(current)) return;
        switch (this.operation) {
            case "+":
                computation = prev + current;
                break;
            case "-":
                computation = prev - current;
                break;
            case "×":
                computation = prev * current;
                break;
            case "÷":
                computation = prev / current;
                break;
            default:
                return;
        }

        this.currentOperation = computation;
        this.operation = undefined;
        this.previousOperation = "";
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split(".")[0]);
        const decimalDigits = stringNumber.split(".")[1];
        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = "";
        } else {
            integerDisplay = integerDigits.toLocaleString("en", {
                maximumFractionDigits: 0,
            });
        }

        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

    updateDisplay() {
        this.currentOperationTextEl.innerText = this.getDisplayNumber(
            this.currentOperation
        );
        if (this.operation != null) {
            this.previousOperationTextEl.innerText = `${this.getDisplayNumber(
                this.previousOperation
            )} ${this.operation}`;
        } else {
            this.previousOperationTextEl.innerText = "";
        }
    }
}

const calculator = new Calculator(
    previousOperationTextEl,
    currentOperationTextEl
);

// ADD EVENT LISTENER TO DISPLAY BUTTONS

numberButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
        calculator.appendNumber(btn.innerText);
        calculator.updateDisplay();
    });
});

operationButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
        calculator.chooseOperation(btn.innerText);
        calculator.updateDisplay();
    });
});

equalsButton.addEventListener("click", () => {
    calculator.compute();
    calculator.updateDisplay();
});

allClearButton.addEventListener("click", () => {
    calculator.clear();
    calculator.updateDisplay();
});

deleteButton.addEventListener("click", () => {
    calculator.delete();
    calculator.updateDisplay();
});

/// ADD EVENT LISTENER TO KEYBOARD BUTTONS

document.addEventListener("keydown", function (e) {
    if (keyPad.includes(e.code)) {
        switch (e.key) {
            case "+":
                calculator.chooseOperation("+");
                break;
            case "-":
                calculator.chooseOperation("-");
                break;
            case "*":
                calculator.chooseOperation("×");
                break;
            case "/":
                calculator.chooseOperation("÷");
                break;
            case "Delete":
                calculator.clear();
                break;
            case "Enter":
                calculator.compute();
                break;
            case "Backspace":
                calculator.delete();
                break;
            default:
                calculator.appendNumber(e.key);
        }
        calculator.updateDisplay();
    }
});
