const calculator = {
    firstNum: null,
    operator: null,
    secondNumFlag: false,
    displayValue: '0',
};

function clearCalculator() {
    calculator.displayValue = '0';
    calculator.firstNum = null;
    calculator.secondNumFlag = false;
    calculator.operator = null;
    console.log(calculator);
}
// Getting the text input class through query selector  and updating its value 
function showResult (){
    const displayResult =  document.querySelector('.display-result');
    displayResult.value = calculator.displayValue;
}
showResult();

function inputNumber(num) {
    if(calculator.secondNumFlag === true) {
      calculator.displayValue = num;
      calculator.secondNumFlag = false;
    }
    // if the display screen of calculator is 0, 
    // change it to first number entered, otherwise, append it to first digit number 
    // (appending is done through string, and it will be converted to number in final result)
    else{
      if(calculator.displayValue === '0'){
        calculator.displayValue = num;
      }
      else{
          calculator.displayValue = calculator.displayValue + num;
      }
    }
    console.log(calculator);
    
}
function inputDecimal(dot) {
  //if we are doing arithmetic with second number as a decimal then we will
  // append it to 0. and set the flag of second number to false 
  if (calculator.secondNumFlag === true) {
  	calculator.displayValue = '0.'
    calculator.secondNumFlag = false;
    return
  }
  if (!calculator.displayValue.includes(dot)) {
    calculator.displayValue += dot;
  }
}


function handleOperator(secondOperator) {
  // convert string to number of float
    const inputValue = parseFloat(calculator.displayValue);
    if (calculator.firstNum === null && !isNaN(inputValue)) {
      calculator.firstNum = inputValue;
    }
    //after clicking first number we have an operator, do arithmetic with each digit button press 
    // and update calculator object properties through buttonCheck()
    else if (calculator.operator) {
      const result = calculate(calculator.firstNum, inputValue, calculator.operator);
      calculator.displayValue = String(result);
      //if we have subsequent operators then result will become first number
      calculator.firstNum = result;
    }
    calculator.secondNumFlag = true;
    //subsequent operator in arithmetic 
    calculator.operator = secondOperator;
    console.log(calculator);
}

function calculate(firstNum, secondnum, operator) {
    if (operator === '+') {
      return firstNum + secondnum;
    } else if (operator === '-') {
      return firstNum - secondnum;
    } else if (operator === '*') {
      return firstNum * secondnum;
    } else if (operator === '/') {
      return firstNum / secondnum;
    }
    // in case we click = button, return the second number as it is
    return secondnum;
}
  

function buttonCheck (event) {
  // Checking if button is being clicked, otherwise do nothing
  if (!event.target.matches('button')) {
    return;
  }
  // check if list contains specific class names
  else if (event.target.classList.contains('operator')) {
    handleOperator(event.target.value);
    showResult();
  }
  else if (event.target.classList.contains('decimal')) {
    inputDecimal(event.target.value);
    showResult();
  }
  else if (event.target.classList.contains('clear')) {
    clearCalculator();
    showResult();
  }
  else if (event.target.classList.contains('equal-button')) {
    handleOperator(event.target.value);
    showResult();
  }
  // finally handle numbers and update display result
  else{
    inputNumber(event.target.value);
    showResult();
  }
};


