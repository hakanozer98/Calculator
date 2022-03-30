let previousInput = document.querySelector('.previous-input');
let currentInput = document.querySelector('.current-input');
let numbers = document.querySelectorAll('.number');
let operators = document.querySelectorAll('.operator');
let clearButton = document.querySelector('.c');
let equalBUtton = document.querySelector('.equal');
let dotButton = document.querySelector('.dot');
let changeSignButton = document.querySelector('.sign');
let percentageButton = document.querySelector('.percent');

function add(operand1, operand2) {
    return operand1 + operand2;
}

function substract(operand1, operand2) {
    return operand1 - operand2;
}

function multiply(operand1, operand2) {
    return operand1 * operand2;
}

function divide(operand1, operand2) {
    return operand1 / operand2;
}

function operate(operation, operand1, operand2) {
    switch(operation) {
        case '+':
            return add(Number(operand1), Number(operand2));
        case '-':
            return substract(Number(operand1), Number(operand2));
        case 'x':
            return multiply(Number(operand1), Number(operand2));
        case '÷':
            return divide(Number(operand1), Number(operand2));
    }
}

let operator = '';
let currentNumber = '';
let previousNumber = '';

function updateDisplay() {
    currentInput.textContent = currentNumber;
    previousInput.textContent = previousNumber + operator;
}

clearButton.addEventListener('click', () => {
    operator = '';
    currentNumber = '';
    previousNumber = '';
    updateDisplay();
});

numbers.forEach(number => {
    number.addEventListener('click', () => {
        currentNumber += number.firstElementChild.textContent;
        updateDisplay();
    });
});

operators.forEach(op => {
    op.addEventListener('click', () => {
        if(previousNumber != '' && currentNumber != '') {
            currentNumber = operate(operator, previousNumber, currentNumber);
            previousNumber = '';
            operator = '';
        }
        operator = op.firstElementChild.textContent;
        previousNumber = currentNumber;
        currentNumber = '';
        updateDisplay();
    });    
});

equalBUtton.addEventListener('click', () => {
    if(previousNumber != '' && currentNumber != '') {
        currentNumber = operate(operator, previousNumber, currentNumber);
        previousNumber = '';
        operator = '';
    }
    updateDisplay();
});

dotButton.addEventListener('click', () => {
    if(!currentNumber.includes('.')) {
        currentNumber += '.';
        updateDisplay();
    }
});

changeSignButton.addEventListener('click', () => {
    if(Number(currentNumber) < 0) {
        currentNumber = Math.abs(currentNumber).toString();
    } else {
        currentNumber = -Number(currentNumber).toString();
    }
    updateDisplay();
});

percentageButton.addEventListener('click', ()=> {
    currentNumber = (Number(currentNumber) / 100).toString();
    updateDisplay();
});