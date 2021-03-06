// written in capital to show it's a GLOBAL value
// these values do not change!
const ATTACK_VALUE = 8;
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 14;
const HEAL_VALUE = 20;

//MODE_ATTACK = 0
const MODE_ATTACK = "ATTACK";

//MODE_STRONG_ATTACK = 1
const MODE_STRONG_ATTACK = "STRONG_ATTACK";

// logging the events
const LOG_EVENT_PLAYER_ATTACK = 0;
const LOG_EVENT_PLAYER_STRONG_ATTACK = 1;
const LOG_EVENT_MONSTER_ATTACK = "MONSTER_ATTACK";
const LOG_EVENT_PLAYER_HEAL = "PLAYER_HEAL";
const LOG_EVENT_GAME_OVER = "GAME_OVER";

let battleLog = [];
let lastLoggedEntry;

function getMaxLifeValues() {
  // prompts user to pick the health for the player and monster
  const enteredValue = prompt(
    "Enter max health for you and the monster",
    "100"
  );

  const parsedValue = parseInt(enteredValue);

  // this checks if user has entered a non number value (NaN), it will then default to 100 OR (||) if the user enters a negative value
  if (isNaN(parsedValue) || parsedValue <= 0) {
    throw { message: "Invalid user input, not a number!" }; //throws an error if user enters text instead of numbers
  }
  return parsedValue;
}

let chosenMaxLife;

// error handling
try {
  chosenMaxLife = getMaxLifeValues();
} catch (error) {
  console.log(error);
  chosenMaxLife = 100;
  alert("You entered something wrong, default health value of 100 was used.");
}

let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;

// this alters the health bar on the page
adjustHealthBars(chosenMaxLife);

// log all events, using switch-cases
function writeToLog(battleEvents, val, monsterHealth, playerHealth) {
  let logEntry = {
    event: battleEvents,
    value: val,
    finalMonster: monsterHealth,
    finalPlayerHealth: playerHealth,
  };
  switch (battleEvents) {
    case LOG_EVENT_PLAYER_ATTACK:
      logEntry.target = "MONSTER";
      break; //this keyword prevents fall-through, it tells JavaScript IF this case has been handled, NO other case should be handled, otherwise it will continue to go through the cases. The case condition of the second case is then ignored
    case LOG_EVENT_PLAYER_STRONG_ATTACK:
      logEntry = {
        event: battleEvents,
        value: val,
        target: "MONSTER",
        finalMonsterHealth: monsterHealth,
        finalPlayerHealth: playerHealth,
      };
      break;
    case LOG_EVENT_MONSTER_ATTACK:
      logEntry = {
        event: battleEvents,
        value: val,
        target: "PLAYER",
        finalMonsterHealth: monsterHealth,
        finalPlayerHealth: playerHealth,
      };
      break;
    case LOG_EVENT_PLAYER_HEAL:
      logEntry = {
        event: battleEvents,
        value: val,
        target: "PLAYER",
        finalMonsterHealth: monsterHealth,
        finalPlayerHealth: playerHealth,
      };
      break;
    case LOG_EVENT_GAME_OVER:
      logEntry = {
        event: battleEvents,
        value: val,
        finalMonsterHealth: monsterHealth,
        finalPlayerHealth: playerHealth,
      };
      break;
    default:
      logEntry = {};
  }
  // the code below has been replaced with switch-cases above ^^^
  // if (battleEvents === LOG_EVENT_PLAYER_ATTACK) {
  //   logEntry = {
  //     event: battleEvents,
  //     value: val,
  //     target: "MONSTER",
  //     finalMonsterHealth: monsterHealth,
  //     finalPlayerHealth: playerHealth
  //   };
  // } else if (battleEvents === LOG_EVENT_PLAYER_STRONG_ATTACK) {
  //   logEntry = {
  //     event: battleEvents,
  //     value: val,
  //     target: "MONSTER",
  //     finalMonsterHealth: monsterHealth,
  //     finalPlayerHealth: playerHealth
  //   };
  // } else if (battleEvents === LOG_EVENT_MONSTER_ATTACK) {
  //   logEntry = {
  //     event: battleEvents,
  //     value: val,
  //     target: "PLAYER",
  //     finalMonsterHealth: monsterHealth,
  //     finalPlayerHealth: playerHealth
  //   };
  // } else if (battleEvents === LOG_EVENT_PLAYER_HEAL){
  //   logEntry = {
  //     event: battleEvents,
  //     value: val,
  //     target: "PLAYER",
  //     finalMonsterHealth: monsterHealth,
  //     finalPlayerHealth: playerHealth
  //   };
  // } else if (battleEvents === LOG_EVENT_GAME_OVER) {
  //   logEntry = {
  //     event: battleEvents,
  //     value: val,
  //     finalMonsterHealth: monsterHealth,
  //     finalPlayerHealth: playerHealth
  //   };
  // }
  battleLog.push(logEntry);
}

// this resets the game
function reset() {
  currentMonsterHealth = chosenMaxLife;
  currentPlayerHealth = chosenMaxLife;
  resetGame(chosenMaxLife);
}

// check win condition, check player health and reset the game depends if player wins or monster wins
function endRound() {
  const initialPlayerHealth = currentPlayerHealth;
  const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerHealth -= playerDamage;
  writeToLog(
    LOG_EVENT_MONSTER_ATTACK,
    playerDamage,
    currentMonsterHealth,
    currentPlayerHealth
  );

  if (currentPlayerHealth <= 0 && hasBonusLife) {
    hasBonusLife = false;
    currentPlayerHealth = initialPlayerHealth;
    removeBonusLife();
    setPlayerHealth(initialPlayerHealth);
    alert("Bonus life!");
  }

  if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    alert("You win!");
    writeToLog(
      LOG_EVENT_MONSTER_ATTACK,
      "PLAYER WON",
      currentMonsterHealth,
      currentPlayerHealth
    );
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    alert("You lose!");
    writeToLog(
      LOG_EVENT_MONSTER_ATTACK,
      "MONSTER WON",
      currentMonsterHealth,
      currentPlayerHealth
    );
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
    alert("Draw!");
    writeToLog(
      LOG_EVENT_MONSTER_ATTACK,
      "DRAW",
      currentMonsterHealth,
      currentPlayerHealth
    );
  }

  if (currentMonsterHealth <= 0 || currentPlayerHealth <= 0) {
    reset();
  }
}

// this func executes depending on which attack user has clicked on the page and will inflict the damage accordingly on what values from the constants above
function attackMonster(attackMode) {
  let maxDamage;
  let logEvent;
  if (attackMode === MODE_ATTACK) {
    maxDamage = ATTACK_VALUE;
    logEvent = LOG_EVENT_PLAYER_ATTACK;
  } else if (attackMode === MODE_STRONG_ATTACK) {
    maxDamage = STRONG_ATTACK_VALUE;
    logEvent = LOG_EVENT_PLAYER_STRONG_ATTACK;
  }
  const damage = dealMonsterDamage(maxDamage);
  currentMonsterHealth -= damage;
  writeToLog(logEvent, damage, currentMonsterHealth, currentPlayerHealth);
  endRound();
}

// these handlers will then call the parameters in "attackMonster"
function attackHandler() {
  attackMonster(MODE_ATTACK);
}

function strongAttackHandler() {
  attackMonster(MODE_STRONG_ATTACK);
}

// dynamic values for healing
function healPlayerHandler() {
  let healValue;
  if (currentPlayerHealth >= chosenMaxLife - HEAL_VALUE) {
    alert("Health is full!");
    healValue = chosenMaxLife - currentPlayerHealth;
  } else {
    healValue = HEAL_VALUE;
  }
  increasePlayerHealth(healValue);
  currentPlayerHealth += healValue;
  writeToLog(
    LOG_EVENT_PLAYER_HEAL,
    healValue,
    currentMonsterHealth,
    currentPlayerHealth
  );
  endRound();
}

// prints log on to browser console, using a 'for loop'
//sets a variable before the loop starts (let i = 0)
//defines the condition for the loop to run (i must be less than 5)
//increases a value (i++) each time the code block in the loop has been executed.

// this is a for loop
// function printLogHandler() {
//   for (let i = 0; i < 3; i++ )
//   console.log(battleLog);
// }

// this is a while and do-while loop
function printLogHandler() {
  for (let i = 0; i < 3; i++) {
    console.log("-0-0-0-0-0-0-");
  }
  let j = 3;
  do {
    console.log(j);
    j++;
  } while (j < 3);
  let i = 0;
  for (const logEntry of battleLog) {
    if ((!lastLoggedEntry && lastLoggedEntry !== 0) || lastLoggedEntry < i) {
      console.log(`#${i}`); // gives us the ability to dynamically check the value of the index {i}
      for (const key in logEntry) {
        console.log(`${key}) => ${logEntry[key]}`);
      }
      lastLoggedEntry = i;
      break;
    }
    i++;
  }
}

// this calls the buttons from vendor.js
attackBtn.addEventListener("click", attackHandler);
strongAttackBtn.addEventListener("click", strongAttackHandler);
healBtn.addEventListener("click", healPlayerHandler);
logBtn.addEventListener("click", printLogHandler);
