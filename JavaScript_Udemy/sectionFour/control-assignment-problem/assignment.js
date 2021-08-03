// In the attached code assignment.js, you find a variable that holds a random number between 0 and 1 - Write code that shows an alert (with any message) when that number is greater than 0.7.

const randomNumber = Math.random(); // produces random number between 0 (including) and 1 (excluding)


if (randomNumber <= 0.7){
    alert("randomNumber is more than 0.7")
};



// Create an array of numbers (any numbers of your choice) and loop through the array in two different ways - outputting the numbers inside of the loop.

const arrayOfNum = [
    "2",
    "4",
    "6",
    "8",
    "10"
];

for (let i = 0; i < arrayOfNum; i++) {
    console.log("arrayOfNum" + i);
}





// Adjust one of the loops from the last task such that it actually starts at the end (last element) of the array and loops to the first element.





// Create another random number (in a separate constant) and show an alert in two different scenarios: Both are greater 0.7 OR at least one of the two is NOT greater than 0.2.

const secondArrayOfNum = [
    "2",
    "4",
    "6",
    "8",
    "10"
];


