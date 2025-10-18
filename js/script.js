const display = document.getElementById('display');
const historyElement = document.getElementById('history');
let currentOperation = '';
const history = [];

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
      case '√':
        currentOperation += 'Math.sqrt(';
        display.value = currentOperation;
        break;
      case 'sin':
        currentOperation += 'Math.sin(';
        display.value = currentOperation;
        break;
      case 'cos':
        currentOperation += 'Math.cos(';
        display.value = currentOperation;
        break;
      case 'tan':
        currentOperation += 'Math.tan(';
        display.value = currentOperation;
        break;
      case 'log':
        currentOperation += 'Math.log10(';
        display.value = currentOperation;
        break;
      case 'ln':
        currentOperation += 'Math.log(';
        display.value = currentOperation;
        break;
      case 'e':
        currentOperation += 'Math.E';
        display.value = currentOperation;
        break;
      case 'π':
        currentOperation += 'Math.PI';
        display.value = currentOperation;
        break;
      case 'x²':
        currentOperation += '**2';
        display.value = currentOperation;
        break;
      case '.':
        if (!currentOperation.endsWith('.')) {
          currentOperation += '.';
          display.value = currentOperation;
        }
        break;
      case '/':
      case '*':
      case '-':
      case '+':
      case '%':
        currentOperation += ` ${keyValue} `;
        display.value = currentOperation;
        break;
      default:
        currentOperation += keyValue;
        display.value = currentOperation;
        break;
    }
  });
});

function calculate() {
  try {
    const result = eval(currentOperation);
    display.value = result;
    history.push({ expression: currentOperation, result });
    updateHistory();
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

function updateHistory() {
  historyElement.innerHTML = '';
  history.forEach((entry, index) => {
    const entryElement = document.createElement('div');
    entryElement.className = 'history-entry';
    entryElement.innerHTML = `
      <span>${entry.expression} = ${entry.result}</span>
      <button onclick="deleteHistoryEntry(${index})">Delete</button>
    `;
    historyElement.appendChild(entryElement);
  });
}

function deleteHistoryEntry(index) {
  history.splice(index, 1);
  updateHistory();
}
