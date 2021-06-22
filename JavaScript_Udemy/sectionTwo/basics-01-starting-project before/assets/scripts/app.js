const defaultResult = 0;
// define constant to be 0, as a starting value

let currentResult = defaultResult;
// define variable to be the value of whatever defaultResult is

let logEntries = [];
// array called logEntries

// function add(num1, num2) {
//   const result = num1 + num2;
//   return result;
// }
// add two numbers defined by the variable below this comment and returns the value to the page

function getUserNumInput() {
  return parseInt(userInput.value);
}
// streamlined code so we can call this func if we require user's input value

function createAndWriteOutput(operator, resultBeforeCalc, calcNumber) {
  const calcDescription = `${resultBeforeCalc} ${operator} ${calcNumber}`;
  outputResult(currentResult, calcDescription); // from vendor file
}
// refactoring! generates and writes calculation log to webpage

function writeToLog(
  operationIdentifier,
  prevResult,
  operationNumber,
  newResult
) {
  const logEntry = {
    operation: operationIdentifier, // this is printed out into the console on what the action user selected
    prevResult: prevResult,
    number: operationNumber,
    result: newResult,
  };
  logEntries.push(logEntry);
  console.log(logEntries);
}
// create func to stop copy code, refactoring
// this func, in multiline code, will log the users inputs on what they have selected in the calc

function add() {
  const enteredNumber = getUserNumInput();
  const initialResult = currentResult;
  currentResult += enteredNumber;
  createAndWriteOutput("+", initialResult, enteredNumber);
  writeToLog("ADD", initialResult, enteredNumber, currentResult);
}
// output the result of current value and the value the user enters (userInput) parseInt can be more specific on what values are converted or if you need a decimal

// writeToLog("ADD", initialResult, enteredNumber, currentResult); this calls the func

function subtract() {
  const enteredNumber = getUserNumInput();
  const initialResult = currentResult;
  currentResult -= enteredNumber;
  createAndWriteOutput("-", initialResult, enteredNumber);
  writeToLog("SUBTRACT", initialResult, enteredNumber, currentResult);
}

function multiply() {
  const enteredNumber = getUserNumInput();
  const initialResult = currentResult;
  currentResult *= enteredNumber;
  createAndWriteOutput("*", initialResult, enteredNumber);
  writeToLog("MULTIPLY", initialResult, enteredNumber, currentResult);
}

function divide() {
  const enteredNumber = getUserNumInput();
  const initialResult = currentResult;
  currentResult /= enteredNumber;
  createAndWriteOutput("/", initialResult, enteredNumber);
  writeToLog("DIVIDE", initialResult, enteredNumber, currentResult);
}

// +=, -=. *=, /=, shorthand operators

// function add() {
//   currentResult = currentResult + +userInput.value;
//   outputResult(currentResult, "");
// }
// Same as above but shorter, won't work with decimals

//currentResult = add(6, 6);
// the digits will be used for the function, change them to whatever is needed. This will convert the value entered into an int.

addBtn.addEventListener("click", add);
subtractBtn.addEventListener("click", subtract);
multiplyBtn.addEventListener("click", multiply);
divideBtn.addEventListener("click", divide);
// button on HTML page where it's listening for the "click", once clicked, it'll execute the calculations on what operator was clicked
