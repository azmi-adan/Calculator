const display = document.getElementById('display');

let currentOperation = '';
let lastOperation = '';

document.querySelectorAll('.key').forEach(button => {
  button.addEventListener('click', () => {
    const keyValue = button.textContent;
    switch (keyValue) {
      case '=':
        calculate();
        break;
      case 'AC':
        clearScreen();
        break;
      case 'DEL':
        deleteLastChar();
        break;
      default:
        if (keyValue === '+' || keyValue === '-' || keyValue === '*' || keyValue === '/') {
          currentOperation += keyValue;
          display.value = currentOperation;
        } else if (keyValue === 'in' || keyValue === 'cos' || keyValue === 'tan' || keyValue === 'log' || keyValue === 'ln' || keyValue === 'e' || keyValue === 'π' || keyValue === 'x²') {
          currentOperation += keyValue + '(';
          display.value = currentOperation;
        } else if (keyValue === '√') {
          currentOperation += 'Math.sqrt(';
          display.value = currentOperation;
        } else {
          currentOperation += keyValue;
          display.value = currentOperation;
        }
    }
  });
});

function calculate() {
  try {
    const result = eval(currentOperation);
    display.value = result;
    currentOperation = result;
  } catch (error) {
    display.value = 'Error';
  }
}

function clearScreen() {
  display.value = '';
  currentOperation = '';
}

function deleteLastChar() {
  currentOperation = currentOperation.slice(0, -1);
  display.value = currentOperation;
}