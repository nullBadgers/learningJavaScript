// In the attached code assignment.js, you find a variable that holds a random number between 0 and 1 - Write code that shows an alert (with any message) when that number is greater than 0.7.

const randomNumber = Math.random(); // produces random number between 0 (including) and 1 (excluding)

if (randomNumber > 0.7) {
  alert("randomNumber is more than 0.7");
  console.log(randomNumber);
}

// Create an array of numbers (any numbers of your choice) and loop through the array in two different ways - outputting the numbers inside of the loop.

const arrayOfNum = [2, 4, 6, 8, 10];

for (let i = 0; i < arrayOfNum.length; i++) {
  console.log(arrayOfNum[i]);
}

for (const num of arrayOfNum) {
  console.log(num);
}

// while loop
let counter = 0;
while (counter < arrayOfNum.length) {
  console.log(arrayOfNum[counter]);
  counter++;
}

// Adjust one of the loops from the last task such that it actually starts at the end (last element) of the array and loops to the first element.

for (let i = arrayOfNum.length - 1; i >= 0; i--) {
  console.log(arrayOfNum[i]);
}

// Create another random number (in a separate constant) and show an alert in two different scenarios: Both are greater 0.7 OR at least one of the two is NOT greater than 0.2.

const randomNumber2 = Math.random();

if (
  (randomNumber2 >= 0.7 && randomNumber >= 0.7) ||
  randomNumber <= 0.2 ||
  randomNumber2 <= 0.2
) {
  alert("Greater than 0.7");
  console.log(randomNumber, randomNumber2);
}

// if (
//     (randomNumber > 0.7 && randomNumber2 > 0.7) ||
//     randomNumber <= 0.2 ||
//     randomNumber2 <= 0.2
//   ) {
//     alert('Greater than 0.7 or smaller than 0.2.');
//   }
