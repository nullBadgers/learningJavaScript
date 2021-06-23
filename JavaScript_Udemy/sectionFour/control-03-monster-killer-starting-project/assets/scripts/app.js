// written in capital to show it's a GLOBAL value
// these values do not change!
const ATTACK_VALUE = 8;
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 14;
const HEAL_VALUE = 20;

// hard coded health of player
let chosenMaxLife = 100;
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;

// this alters the health bar on the page
adjustHealthBars(chosenMaxLife);

// check win condition
function endRound() {
  const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerHealth -= playerDamage;
  if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    alert("You win!");
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    alert("You lose!");
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
    alert("Draw!");
  }
}

// this func executes depending on which attack user has clicked on the page and will inflict the damage accordingly on what values from the constants above
function attackMonster(attackMode) {
  let maxDamage;
  if (attackMode === "ATTACK") {
    maxDamage = ATTACK_VALUE;
  } else if (attackMode === "STRONG_ATTACK") {
    maxDamage = STRONG_ATTACK_VALUE;
  }
  const damage = dealMonsterDamage(maxDamage);
  currentMonsterHealth -= damage;
  endRound();
}

// these handlers will then call the parameters in "attackMonster"
function attackHandler() {
  attackMonster("ATTACK");
}

function strongAttackHandler() {
  attackMonster("STRONG_ATTACK");
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
  endRound();
}

attackBtn.addEventListener("click", attackHandler);
strongAttackBtn.addEventListener("click", strongAttackHandler);
healBtn.addEventListener("click", healPlayerHandler);
