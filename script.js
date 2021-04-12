function add(x, y) {
    return x + y;
}

function subtract(x, y) {
    return x - y;
}

function multiply(x, y) {
    return x * y;
}

function divide(x, y) {
    return x / y;
}

function operate(operator, x, y) {
    switch (operator) {
        case '+':
            return add(x, y);
            break;
        case '-':
            return subtract(x, y);
            break;
        case '*':
            return multiply(x, y);
            break;
        case '÷':
            return divide(x, y);
            break;
    }
}

function clear() {
    previousOperandTextElement.textContent = '';
    currentOperandTextElement.textContent = '';
    operation = undefined
    currentOperand = ''
}

function erase() {
    currentOperand = currentOperand.toString().slice(0, -1)
    updateDisplay(currentOperand)
}

function appendNum(number) {
    currentOperand = currentOperand.toString() + number.toString();
    updateDisplay(currentOperand)
}

function updateDisplay(result) {
    currentOperandTextElement.textContent = result;
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const deleteButton = document.querySelector('[data-delete]');
const equalsButton = document.querySelector('[data-equals]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');
let currentOperand = '';
let operation = undefined;

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        appendNum(button.innerText)
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (currentOperandTextElement.textContent === '') return
        if (previousOperandTextElement.textContent === '') {
            let firstNumber = parseFloat(currentOperand);
            operation = button.innerText;
            currentOperand = '';
            previousOperandTextElement.textContent = firstNumber.toString() + ' ' + operation;
            updateDisplay('');
        } else {
            let x = parseFloat(previousOperandTextElement.textContent)
            let y = parseFloat(currentOperandTextElement.textContent)

            previousOperandTextElement.textContent = operate(operation, x, y).toString();
            currentOperand = '';
            operation = button.innerText;
            updateDisplay('');
        }
    })
})

equalsButton.addEventListener('click', () => {
    if (previousOperandTextElement.textContent === '') return
    let previous = parseFloat(previousOperandTextElement.textContent)
    let next = parseFloat(currentOperandTextElement.textContent)
    currentOperandTextElement.textContent = '';
    updateDisplay(operate(operation, previous, next))
    currentOperand = '';
    previousOperandTextElement.textContent = '';
})

allClearButton.addEventListener('click', () => clear())


deleteButton.addEventListener('click', () => erase())