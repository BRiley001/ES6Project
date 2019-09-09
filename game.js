// Author: Brenden Riley
// Date: 8.20.19


//Global Variables
//Shortcut for changing the battlelog
const log = document.getElementById("log");
var enemyRampUp = 0;

//The enemy's stats
const enemy = {
    name: "Slime",
    hp: 30,
    maxhp: 30,
    defense: 1,
    attack: 1,
}

//The player's stats
const hero = {
    name: "You",
    hp: 50,
    maxhp: 50,
    defense: 3,
    attack: 3,
    mana: 20,
    maxmana: 20,
    hpotions: 3,
    mpotions: 3,
    gold: 2
}

//sets up the page correctly
window.onload = setup();

//Functions
//sets up the page and some onclicks
function setup() {
    document.querySelector("#attack").onclick = damageCalc;
    document.querySelector("#magic").onclick = magic;
    document.querySelector("#hPotion").onclick = healthP;
    document.querySelector("#mPotion").onclick = manaP;
    document.querySelector("#shop1").onclick = buyH;
    document.querySelector("#shop2").onclick = buyM;
    document.querySelector("#shop3").onclick = buyW;
    document.querySelector("#shop4").onclick = buyA;
    updateStats();
}

//helpful basic integer generator
function randomNumber(size) {
    return Math.round(Math.random() * size);
}

//Determines what happens when the player attacks, checking to make sure an attack is able to happen
function damageCalc() {
    if (hero.hp > 0) {
        if (enemy.hp > 0) {
            let attack = hero.attack;
            let defense = enemy.defense;
            if (randomNumber(10) === 10) {
                var totalDamage = attack * 3;
                //console.log("CRIT");
            } else {
                var totalDamage = attack;
            }
            totalDamage = Math.round(totalDamage - defense * (1 / 3));
            if (totalDamage <= 0) {
                totalDamage = 1
            }
            enemy.hp -= totalDamage;
            log.innerText = `You hit the enemy for ${totalDamage}`;
            //console.log(totalDamage);
            //console.log(enemy.hp);
            if (enemy.hp <= 0) {
                enemy.hp = 0
                document.getElementById("enemyHealth").innerText = `0/${enemy.maxhp}`;
                log.innerText = `The enemy was slain`
                setTimeout(function () {
                    log.innerText = `Choose a stat to upgrade`;
                    document.getElementById(`statChoice`).style.display = `initial`;
                    statChoice();
                }, 2000)
            } else {
                enemyAttack();
            }
            updateStats();
        } else {
            log.innerText = `The enemy is already slain`;
        }
    } else {
        log.innerText = (`You can't attack`);
    }
}

//The enemy's attack, which will only happen if the hero attacks.
function enemyAttack() {
    let attack = enemy.attack;
    let defense = hero.defense;
    if (randomNumber(20) === 20) {
        var totalDamage = attack * 3;
        //console.log("CRIT");
    } else {
        var totalDamage = attack;
    }
    totalDamage = Math.round(totalDamage - defense * (1 / 3));
    if (totalDamage <= 0) {
        totalDamage = 1
    }
    hero.hp -= totalDamage;
    log.innerText += `, but the enemy hits you for ${totalDamage}`;
    if (hero.hp <= 0) {
        hero.hp = 0
        document.getElementById("enemyHealth").innerText = `0/${hero.maxhp}`;
        log.innerText = `You were slain`;
    }
}

//A function that updates the page to show any changes in stats.
function updateStats() {
    document.getElementById("health").innerText = `${hero.hp}/${hero.maxhp}HP`;
    document.getElementById("mana").innerText = `${hero.mana}/${hero.maxmana}MP`;
    document.getElementById("statA").innerText = `Attack: ${hero.attack}`;
    document.getElementById("statD").innerText = `Defense: ${hero.defense}`;
    document.getElementById("hPotion").innerText = `Drink Health Potion (${hero.hpotions})`;
    document.getElementById("mPotion").innerText = `Drink Mana Potion (${hero.mpotions})`;
    document.getElementById("enemyName").innerText = `${enemy.name}`;
    document.getElementById("enemyHealth").innerText = `${enemy.hp}/${enemy.maxhp}HP`;
    document.getElementById("enemyAttack").innerText = `Attack: ${enemy.attack}`;
    document.getElementById("enemyDefense").innerText = `Defense: ${enemy.defense}`;
    document.getElementById("gold").innerText = `Gold: ${hero.gold}`
}

//A function to drink a health potion, assuming they can
function healthP() {
    if (hero.hp > 0) {
        if (hero.hp == hero.maxhp) {
            log.innerText = `You're already at full health!`;
        } else if (hero.hpotions > 0) {
            hero.hpotions -= 1;
            hero.hp += 30;
            if (hero.hp > hero.maxhp) {
                hero.hp = hero.maxhp;
            }
            log.innerText = `You drink a red potion and recover health`;
        } else {
            log.innerText = `You don't have any red potions!`;
        }
    } else {
        log.innerText = `You have already been slain`;
    }


    updateStats();
}

//Checks to see if the player can drink a mana potion
function manaP() {
    if (hero.hp > 0) {
        if (hero.mana == hero.maxmana) {
            log.innerText = `You already have full mana!`;
        } else if (hero.mpotions > 0) {
            hero.mpotions -= 1;
            hero.mana += 10;
            if (hero.mana > hero.maxmana) {
                hero.mana = hero.maxmana;
            }
            log.innerText = `You drink a blue potion and regain mana`;
        } else {
            log.innerText = `You don't have any blue potions!`;
        }
    } else {
        log.innerText = `You have already been slain`;
    }

    updateStats();
}

//An alternative to an attack that doesn't let the enemy attack, but costs mana
function magic() {
    if (hero.hp > 0) {
        if (enemy.hp > 0) {
            if (hero.mana >= 5) {
                enemy.hp -= 20;
                log.innerText = `You hit the enemy with a fireball`;
                if (enemy.hp <= 0) {
                    enemy.hp = 0;
                    log.innerText = `The enemy was slain`;
                    setTimeout(function () {
                        log.innerText = `Choose a stat to upgrade`;
                        document.getElementById(`statChoice`).style.display = `initial`;
                        statChoice();
                    }, 2000)
                }
                hero.mana -= 5;
            } else {
                log.innerText = `You're out of mana!`;
            }

        } else {
            log.innerText = `The enemy is already slain`;
        }
    } else {
        log.innerText = `You have already been slain`;
    }
    updateStats();
}

//When the player defeats an enemy, they get to increase their stats
function statChoice() {
    document.querySelector("#stat1").onclick = function () {
        hero.attack += 1;
        document.getElementById(`statChoice`).style.display = `none`;
        updateStats();
        makeEnemy();
    };
    document.querySelector("#stat2").onclick = function () {
        hero.defense += 1;
        document.getElementById(`statChoice`).style.display = `none`;
        updateStats();
        makeEnemy();
    };
    document.querySelector("#stat3").onclick = function () {
        hero.maxmana += 5;
        hero.mana += 5;
        document.getElementById(`statChoice`).style.display = `none`;
        updateStats();
        makeEnemy();
    };
    document.querySelector("#stat4").onclick = function () {
        hero.maxhp += 10;
        hero.hp += 10;
        document.getElementById(`statChoice`).style.display = `none`;
        updateStats();
        makeEnemy();
    };
}

//Creates a new enemy when the previous one dies, the new one has somewhat random stats(that ramp up)
function makeEnemy() {
    let gold = Math.round((randomNumber(20) + randomNumber(20)) * enemyRampUp);
    log.innerText = `You loot ${gold} gold pieces from the enemy`;
    hero.gold += gold;
    setTimeout(function () {
        log.innerText = `A new enemy approaches`;
        enemyRampUp += .25;
        enemy.hp = 30 + Math.round((randomNumber(3) * (10 * enemyRampUp)));
        enemy.maxhp = enemy.hp;
        if (enemy.maxhp < 50) {
            enemy.name = "Slime";
        } else if (100 > enemy.maxhp && enemy.maxhp >= 50) {
            enemy.name = "Bandit";
        } else if (175 > enemy.maxhp && enemy.maxhp >= 100) {
            enemy.name = "Barbarian";
        } else if (250 > enemy.maxhp && enemy.maxhp >= 175) {
            enemy.name = "Giant";
        } else if (300 > enemy.maxhp && enemy.maxhp >= 250) {
            enemy.name = "Dragon";
        } else if (enemy.maxhp >= 300) {
            enemy.name = "God";
        }
        enemy.attack = Math.round((randomNumber(3) + 1) * enemyRampUp);
        enemy.defense = Math.round((randomNumber(3) + 1) * enemyRampUp);
        updateStats();
    }, 2000)
    updateStats();
}

function buyH() {
    if (hero.hp > 0) {
        if (hero.gold >= 50) {
            hero.gold -= 50;
            hero.hpotions += 1;
            log.innerText = `You buy a health potion`;
        } else {
            log.innerText = `You don't have enough gold to buy this`;
        }
        
    } else{
        log.innerText=`You have already been slain`;
    }
    updateStats();
}

function buyM() {
    if (hero.hp > 0) {
        if (hero.gold >= 30) {
            hero.gold -= 30;
            hero.mpotions += 1;
            log.innerText = `You buy a mana potion`;
        } else {
            log.innerText = `You don't have enough gold to buy this`;
        }
    } else{
        log.innerText=`You have already been slain`;
    }
    updateStats();
}

function buyW() {
    if (hero.hp > 0) {
        if (hero.gold >= 100) {
            hero.gold -= 100;
            hero.attack += 1;
            log.innerText = `You better a new weapon (+1 attack)`;
        } else {
            log.innerText = `You don't have enough gold to buy this`;
        }
    } else{
        log.innerText=`You have already been slain`;
    }
    updateStats();
}

function buyA() {
    if (hero.hp > 0) {
        if (hero.gold >= 75) {
            hero.gold -= 75;
            hero.defense += 1;
            hero.maxhp += 5;
            hero.hp += 5;
            log.innerText = `You buy better armor (+1 defense, +5 health)`;
        } else {
            log.innerText = `You don't have enough gold to buy this`;
        }
    } else{
        log.innerText=`You have already been slain`;
    }
    updateStats();
}