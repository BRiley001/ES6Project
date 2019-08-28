// Author: Brenden Riley
// Date: 8.20.19


//Global Variables

var enemyName = "Dummy";
var enemyHP = 1000;
var enemyD = 10;
var enemyA = 1;

const hero = {
    name: "You",
    hp:50,
    maxhp:50,
    defense:3,
    attack:3,
    mana:20
}

window.onload=setup;

//Functions

function setup(){
    document.querySelector("#attack").onclick = damageCalc;
    document.querySelector("#magic").onclick = magic;
    document.querySelector("#hPotion").onclick = a;
    document.querySelector("#mPotion").onclick = a;
}

function randomNumber(size) {
    var number = Math.round(Math.random() * size);
    return number;
}

function damageCalc(){
    let attack = hero.attack;
    let defense = enemyD;
    if (randomNumber(10) === 10) {
        var totalDamage = attack * 3;
        console.log("CRIT");
    } else {
        var totalDamage = attack;
    }
    totalDamage = Math.round(totalDamage - defense*(1/3));
    if (totalDamage < 0) {
        totalDamage=0
    }
    enemyHP-=totalDamage;
    console.log(totalDamage)
}

function updateStats(){

}

function magic(){

}