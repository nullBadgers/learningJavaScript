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

// prompts user to pick the health for the player and monster
const enteredValue = prompt("Enter max health for you and the monster", "100");

// logging the events
const LOG_EVENT_PLAYER_ATTACK = 0;
const LOG_EVENT_PLAYER_STRONG_ATTACK = 1;
const LOG_EVENT_MONSTER_ATTACK = "MONSTER_ATTACK";
const LOG_EVENT_PLAYER_HEAL = "PLAYER_HEAL";
const LOG_EVENT_GAME_OVER = "GAME_OVER";

// WAS hard coded health of player
let chosenMaxLife = parseInt(enteredValue);

let battleLog = [];

// this checks if user has entered a non number value (NaN), it will then default to 100 OR (||) if the user enters a negative value
if (isNaN(chosenMaxLife) || chosenMaxLife <= 0) {
  chosenMaxLife = 100;
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
      logEntry.target = 'MONSTER';
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
function printLogHandler() {
  for (let i = 0; i < 3; i++ )
  console.log(battleLog);
}

// this calls the buttons from vendor.js
attackBtn.addEventListener("click", attackHandler);
strongAttackBtn.addEventListener("click" , strongAttackHandler);
healBtn.addEventListener("click", healPlayerHandler);
logBtn.addEventListener("click", printLogHandler);
