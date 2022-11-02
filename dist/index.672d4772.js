const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const allClearButton = document.querySelector("[data-all-clear]");
const previousOperationTextEl = document.querySelector("[data-previous-operation]");
const currentOperationTextEl = document.querySelector("[data-current-operation]");
console.log(numberButtons, operationButtons, equalsButton, allClearButton, previousOperationTextEl, currentOperationTextEl);
class Calculator {
    constructor(previousOperationTextEl, currentOperationTextEl){
        this.previousOperationTextEl = previousOperationTextEl;
        this.currentOperationTextEl = currentOperationTextEl;
        this.clear();
    }
    clear() {
        this.currentOperation = "";
        this.previousOperation = "";
        this.operation = undefined;
    }
    delete() {}
    appendNumber(number) {
        if (number === "." && this.currentOperation.includes(".")) return;
        this.currentOperation = this.currentOperation.toString() + number.toString();
    }
    chooseOperation(operation) {
        if (this.currentOperation === "") return;
        if (this.previousOperation !== "") this.compute();
        this.operation = operation;
        this.previousOperation = this.currentOperation;
        this.currentOperation = "";
    }
    compute() {}
    updateDisplay() {
        this.currentOperationTextEl.innerText = this.currentOperation;
        this.previousOperationTextEl.innerText = this.previousOperation;
    }
}
const calculator = new Calculator(previousOperationTextEl, currentOperationTextEl);
numberButtons.forEach((btn)=>{
    btn.addEventListener("click", ()=>{
        calculator.appendNumber(btn.innerText);
        calculator.updateDisplay();
    });
});
operationButtons.forEach((btn)=>{
    btn.addEventListener("click", ()=>{
        calculator.chooseOperation(btn.innerText);
        calculator.updateDisplay();
    });
});
equalsButton.addEventListener("click", ()=>{
    calculator.compute();
    calculator.updateDisplay();
});

//# sourceMappingURL=index.672d4772.js.map
