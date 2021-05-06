let expression = "";
let operatorCalled = false;
let secondNumber = "";
let decimalPressed = 0;

const display = document.getElementById("displayResult");
const numberKeys = document.querySelectorAll(".calc_button");
const operatorKeys = document.querySelectorAll(".calc_operator");
const equalsKey = document.querySelector("#calc_equal");
const clear = document.querySelector("#calc_clear");
const backSpace = document.querySelector("#calc_backspace");
const decimalPoint = document.querySelector("#calc_decimal");

document.addEventListener("keydown", (e) => {
  console.log(e);
  if (e.key >= "0" && e.key <= "9") {
    populateDisplay(e);
  } else if (e.key === "*" || e.key === "/" || e.key === "+" || e.key === "-") {
    operatorCalled = true;
    populateDisplay(e);
  } else if (e.key === "Enter") {
    getResult(e);
  }
});

function parse(str) {
  return Function(`'use strict'; return (${str})`)();
}
function populateDisplay(e) {
  if (operatorCalled === true) {
    secondNumber += this.value;
  }

  expression += this.value || e.key;
  display.value = expression;
}
for (let i = 0; i < numberKeys.length; i++) {
  numberKeys[i].addEventListener("click", populateDisplay);
}
function setOperator(e) {
  operatorCalled = true;
  expression += this.value || e.key;
  display.value = expression;
  console.log(`${operatorCalled}`);
  secondNumber = "";
}
for (let j = 0; j < operatorKeys.length; j++) {
  operatorKeys[j].addEventListener("click", setOperator);
}
function getResult(e) {
  if (operatorCalled && secondNumber !== "") {
    let result = parse(expression);
    console.log(`${expression} = ${result} `);
    display.value = result;
    expression = "";
  } else {
    return;
  }
}
equalsKey.addEventListener("click", getResult);
function clearScreen() {
  display.value = "";
  expression = "";
  secondNumber = "";
}
clear.addEventListener("click", clearScreen);
function removeChar() {
  const index = expression.length - 1;
  let str = expression.slice(0, index);
  expression = str;
  display.value = expression;
  console.log(expression);
}
backSpace.addEventListener("click", removeChar);
document.addEventListener("keydown", (e) =>
  e.key === "Backspace" ? removeChar() : -1
);
