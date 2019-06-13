function createGrid(){
    const container = document.querySelector('#container-div');
    container.style.display = 'grid';
    container.style.gridTemplateRows = '1fr 1fr 1fr 1fr 1fr 1fr';
    container.style.gridTemplateColumns =  '1fr 1fr 1fr 1fr';

    for (i = 3; i>0; i--){
        const newDiv = document.createElement('button');
        newDiv.classList.add('calcBtn');
        newDiv.classList.add('numbers');
        newDiv.id = `btn${6+i}`;
        newDiv.innerText = `${6+i}`;
        newDiv.style.gridRow = '3 / 4';
        newDiv.style.gridColumn = `${i} / ${i+1}`;
        container.appendChild(newDiv);
    }

    for (i = 3; i>0; i--){
        const newDiv = document.createElement('button');
        newDiv.classList.add('numbers');
        newDiv.classList.add('calcBtn');
        newDiv.id = `btn${3+i}`;
        newDiv.innerText = `${3+i}`;
        newDiv.style.gridRow = '4 / 5';
        newDiv.style.gridColumn = `${i} / ${i+1}`;

        container.appendChild(newDiv);
    }
    for (i = 3; i>0; i--){
        const newDiv = document.createElement('button');
        newDiv.classList.add('calcBtn');
        newDiv.classList.add('numbers');
        newDiv.id = `btn${i}`;
        newDiv.innerText = `${i}`;
        newDiv.style.gridRow = '5 / 6';
        newDiv.style.gridColumn = `${i} / ${i+1}`;

        container.appendChild(newDiv);
    }

    let newDiv = document.createElement('button');
    newDiv.classList.add('calcBtn');
    newDiv.classList.add('operator');
    newDiv.id = 'clear';
    newDiv.innerText = 'AC';
    newDiv.style.gridRow = '2 / 3';
    newDiv.style.gridColumn = '1 / 2';
    container.appendChild(newDiv);

    newDiv = document.createElement('button');
    newDiv.classList.add('calcBtn');
    newDiv.classList.add('operator');
    newDiv.id = 'neg';
    newDiv.innerText = '+/-';
    newDiv.style.gridRow = '2 / 3';
    newDiv.style.gridColumn = '2 / 3';
    container.appendChild(newDiv);

    newDiv = document.createElement('button');
    newDiv.classList.add('calcBtn');
    newDiv.classList.add('operator');
    newDiv.id = 'percent';
    newDiv.innerText = '%';
    newDiv.style.gridRow = '2 / 3';
    newDiv.style.gridColumn = '3 / 4';
    container.appendChild(newDiv);

    newDiv = document.createElement('button');
    newDiv.classList.add('calcBtn');
    newDiv.classList.add('operator');
    newDiv.id = 'divide';
    newDiv.innerText = '/';
    newDiv.style.gridRow = '2 / 3';
    newDiv.style.gridColumn = '4 / 5';
    container.appendChild(newDiv);

    newDiv = document.createElement('button');
    newDiv.classList.add('calcBtn');
    newDiv.classList.add('operator');
    newDiv.id = 'multiply';
    newDiv.innerText = 'x';
    newDiv.style.gridRow = '3 / 4';
    newDiv.style.gridColumn = '4 / 5';
    container.appendChild(newDiv);

    newDiv = document.createElement('button');
    newDiv.classList.add('calcBtn');
    newDiv.classList.add('operator');
    newDiv.id = 'subtract';
    newDiv.innerText = '-';
    newDiv.style.gridRow = '4 / 5';
    newDiv.style.gridColumn = '4 / 5';
    container.appendChild(newDiv);

    newDiv = document.createElement('button');
    newDiv.classList.add('calcBtn');
    newDiv.classList.add('operator');
    newDiv.id = 'add';
    newDiv.innerText = '+';
    newDiv.style.gridRow = '5 / 6';
    newDiv.style.gridColumn = '4 / 5';
    container.appendChild(newDiv);

    newDiv = document.createElement('button');
    newDiv.classList.add('calcBtn');
    newDiv.classList.add('operator');
    newDiv.id = 'equals';
    newDiv.innerText = '=';
    newDiv.style.gridRow = '6 / 7';
    newDiv.style.gridColumn = '4 / 5';
    container.appendChild(newDiv);

    newDiv = document.createElement('button');
    newDiv.classList.add('calcBtn');
    newDiv.classList.add('operator');
    newDiv.id = 'decimal';
    newDiv.innerText = '.';
    newDiv.style.gridRow = '6 / 7';
    newDiv.style.gridColumn = '3 / 4';
    container.appendChild(newDiv);

    newDiv = document.createElement('button');
    newDiv.classList.add('calcBtn');
    newDiv.classList.add('numbers');
    newDiv.id = 'btn0';
    newDiv.innerText = '0';
    newDiv.style.gridRow = '6 / 7';
    newDiv.style.gridColumn = '1 / span 2';
    container.appendChild(newDiv);
}

function add(a, b){
    return a+b;
}
function subtract(a, b){
    return a-b;
}
function multiply(a, b){
    return a*b;
}
function divide(a, b){
    return a/b;
}
function negative(a){
    return -1*a;
}
function percent(a){
    return a/100;
}

function doBinaryOperation(operation, a, b){
    switch(operation){
        case 'add':
            return add(a, b);
        case 'subtract':
            return subtract(a, b);
        case 'multiply':
            return multiply(a, b);
        case 'divide':
            return divide(a, b);
        default:
            return a;
    }
}
function doUnitaryOperation(operation, a){
    switch(operation){
        case 'negative':
            return negative(a);
        case 'percent':
            return percent(a);
        default:
            return a;
    }
}
function setUpNumbers(){
    const btnArray = document.querySelectorAll('.numbers');
    const inputBox = document.querySelector('#inputbox');
    btnArray.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            if(inputBox.value == '0'){
                inputBox.value = '';
            }
            inputBox.value = inputBox.value.concat(e.target.textContent);
            displayValue = parseFloat(inputBox.value);
        });
    });
}

function addOperations(){
    const btnArray = document.querySelectorAll('.operator');
    const inputBox = document.querySelector('#inputbox');
    btnArray.forEach((btn) => {
        btn.addEventListener(('click'), (e) => {
            if(e.target.id == 'decimal')
            {
                if(!inputBox.value.includes('.'))
                    inputBox.value = inputBox.value.concat(e.target.textContent);
            }
            else if(e.target.id == 'equals'){
                if(currentOperation != ''){
                    displayValue = doBinaryOperation(currentOperation, storedValue, displayValue);
                    inputBox.value = displayValue.toString();
                    currentOperation = '';
                }
            }
            else if(e.target.id == 'neg'){
                displayValue = -1*displayValue;
                inputBox.value = displayValue.toString();
            }
            else if(e.target.id == 'percent'){
                displayValue = displayValue/100;
                inputBox.value = displayValue.toString();
            }
            else if(e.target.id == 'clear'){
                displayValue = 0;
                storedValue = 0;
                currentOperation = '';
                inputBox.value = displayValue.toString();
            }
            else{
                if(currentOperation == ''){
                    storedValue = displayValue;
                    displayValue = 0;
                    inputBox.value = displayValue.toString();
                    currentOperation = e.target.id;
                }
                else{
                    displayValue = doBinaryOperation(currentOperation, storedValue, displayValue);
                    storedValue = displayValue;
                    displayValue = 0;
                    inputBox.value = displayValue.toString();
                    currentOperation = e.target.id;
                }
            }
        });
    });
}
createGrid();
setUpNumbers();
addOperations();
var storedValue = 0;
var displayValue = 0;
var currentOperation = '';