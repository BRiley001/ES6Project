// Author: Brenden Riley
// Date: 8.20.19


//Global Variables

const log = document.getElementById("log");

const enemy = {
    name: "Dummy",
    hp: 1000,
    maxhp: 1000,
    defense: 1,
    attack: 1,
}

const hero = {
    name: "You",
    hp: 50,
    maxhp: 50,
    defense: 3,
    attack: 3,
    mana: 20,
    maxmana: 20,
    rpotions: 3,
    mpotions: 3
}

window.onload = setup();

//Functions

function setup() {
    document.querySelector("#attack").onclick = damageCalc;
    document.querySelector("#magic").onclick = magic;
    document.querySelector("#hPotion").onclick = healthP;
    document.querySelector("#mPotion").onclick = manaP;
    updateStats();
}

function randomNumber(size) {
    var number = Math.round(Math.random() * size);
    return number;
}

function damageCalc() {
    if (randomNumber(10) === 10) {
        var totalDamage = attack * 3;
        console.log("CRIT");
    } else {
        var totalDamage = attack;
    }
    totalDamage = Math.round(totalDamage - defense * (1 / 3));
    if (totalDamage <= 0) {
        totalDamage = 1
    }
    enemy.hp -= totalDamage;
    console.log(totalDamage)
    updateStats();
}

function updateStats() {
    document.getElementById("health").innerText = `${hero.hp}/${hero.maxhp}HP`;
    document.getElementById("mana").innerText = `${hero.mana}/${hero.maxmana}MP`;
    document.getElementById("enemyHealth").innerText = `${enemy.hp}/${enemy.maxhp}HP`;
    document.getElementById("enemyAttack").innerText = `Attack: ${enemy.attack}`;
    document.getElementById("");
    document.getElementById("");
    document.getElementById("");
    document.getElementById("");
}

function healthP() {
    if (hero.rpotions > 0) {
        hero.rpotions -= 1;
        hero.hp += 30;
        if (hero.hp > hero.maxhp) {
            hero.hp = hero.maxhp;
        }
        log.innerText=`You drink a red potion and recover health`
    } else{
        log.innerText=`You don't have any red potions!`;
    }

    updateStats();
}

function manaP() {
    if (hero.mpotions > 0) {
        hero.mpotions -= 1;
        hero.mana += 10;
        if (hero.mana > hero.maxmana) {
            hero.mana = hero.maxmana;
        }
        log.innerText=`You drink a blue potion and regain mana`
    } else {
        log.innerText=`You don't have any blue potions!`;
    }

    updateStats();
}

function magic() {
    if (hero.mana >= 5) {
        enemy.hp -= 20;
        hero.mana -= 5;
    } else{
        log.innerText=`You're out of mana!`
    }

    updateStats();
}