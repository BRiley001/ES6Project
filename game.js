// Author: Brenden Riley
// Date: 8.20.19


//Global Variables
var playerClass = "";
var playerCurrentHP = 50;
var playerMaxHP=50;
var playerD = 3;
var playerA = 3;
var playerMana = 20;

var enemyName = "";
var enemyHP = 0;
var enemyD = 0;
var enemyA = 0


//Functions

function randomNumber(size) {
    var number = Math.round(Math.random() * size);
    return number;
}

function damageCalc(attack, defense){
    if (randomNumber(10) === 10) {
        var totalDamage = attack * 3;
    } else {
        var totalDamage = attack;
    }
    totalDamage = Math.round(totalDamage - defense*(1/5));
    console.log(totalDamage)
}