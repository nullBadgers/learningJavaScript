const { time } = require("console");
const { setuid } = require("process");

//our stock of ingredients
let stocks = {
  fruits: ["Strawberry", "Grapes", "Banana", "Apple"],
  liquid: ["Water", "Ice"],
  holder: ["Cone", "Cup", "Stick"],
  toppings: ["Chocolate", "Peanuts"],
};

let is_shop_open = true;

let order = () => {
  return new Promise((resolve, reject) => {
    if (true) {
      resolve();
    } else {
      reject();
    }
  });
};

async function order() {}

//using promises
// let order = (time, work) => {
//   return new Promise((resolve, reject) => {
//     if (is_shop_open) {
//       setTimeout(() => {
//         resolve(work());
//       }, time);
//     } else {
//       reject(console.log("Our shop is closed."));
//     }
//   });
// };

//before using promises
// //order process and what the cx has selected
// let order = (fruit_name, call_production) => {
//   setTimeout(() => {
//     console.log(`${stocks.fruits[fruit_name]} was selected`);
//   }, 2000);
//   call_production();
// };

// //making the ice cream
// let production = () => {
//   setTimeout(() => {
//     console.log("Production has started!");

//     setTimeout(() => {
//       console.log("The fruit has been chopped!");

//       setTimeout(() => {
//         console.log(`${stocks.liquid[0]} and ${stocks.liquid[1]} was added`);

//         setTimeout(() => {
//           console.log("The machine has started");

//           setTimeout(() => {
//             console.log(`Ice cream was placed on ${stocks.holder[0]}`);

//             setTimeout(() => {
//               console.log(`${stocks.toppings[0]} was added as toppings.`);

//               setTimeout(() => {
//                 console.log("Ice cream served.");
//               }, 2000);
//             }, 3000);
//           }, 2000);
//         }, 1000);
//       }, 1000);
//     }, 2000);
//   }, 0000);
// };

// order(0, production);

// //using promise chaning
// order(2000, () => console.log(`${stocks.fruits[0]} was selected.`))
//   .then(() => {
//     return order(0000, () => console.log("Production has started."));
//   })

//   .then(() => {
//     return order(2000, () => console.log("The fruit has been chopped."));
//   })

//   .then(() => {
//     return order(1000, () =>
//       console.log(`${stocks.liquid[0]} and ${stocks.liquid[1]} was selected.`)
//     );
//   })

//   .then(() => {
//     return order(1000, () => console.log("Starting machine."));
//   })

//   .then(() => {
//     return order(2000, () =>
//       console.log(`Ice cream was placed on ${stocks.holder[0]}`)
//     );
//   })

//   .then(() => {
//     return order(3000, () =>
//       console.log(`${stocks.toppings[0]} was selected.`)
//     );
//   })

//   .then(() => {
//     return order(1000, () => console.log("Ice cream was served."));
//   })

//   //error handling
//   .catch(() => {
//     console.log("Customer left.");
//   })

//   .finally(() => {
//     console.log("Work day finished.");
//   });
