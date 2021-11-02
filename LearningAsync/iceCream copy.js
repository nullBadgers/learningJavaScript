const { setuid } = require("process");

//our stock of ingredients
let stocks = {
  fruits: ["strawberry", "grapes", "banana", "apple"],
  liquid: ["water", "ice"],
  holder: ["cone", "cup", "stick"],
  toppings: ["chocolate", "peanuts"],
};

//order process and what the cx has selected
let order = (fruit_name, call_production) => {
  setTimeout(() => {
    console.log(`${stocks.fruits[fruit_name]} was selected`);
  }, 2000);
  call_production();
};

//making the ice cream
let production = () => {
  setTimeout(() => {
    console.log("Production has started!");

    setTimeout(() => {
      console.log("The fruit has been chopped!");

      setTimeout(() => {
        console.log(`${stocks.liquid[0]} and ${stocks.liquid[1]} was added`);

        setTimeout(() => {
          console.log("The machine has started");

          setTimeout(() => {
            console.log(`Icecream was placed on ${stocks.holder[0]}`);

            setTimeout(() => {
              console.log(`${stocks.toppings[0]} was added as toppings.`);

              setTimeout(() => {
                console.log("Icecream served.");
              }, 2000);
            }, 3000);
          }, 2000);
        }, 1000);
      }, 1000);
    }, 2000);
  }, 0000);
};

order(0, production);
