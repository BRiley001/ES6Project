// Author: Brenden Riley
// Date: 8.20.19


//Global Variables

const log = document.getElementById("log");

const enemy = {
    name: "Slime",
    hp: 30,
    maxhp: 30,
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
    if (hero.hp > 0) {
        if (enemy.hp>0) {
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
        log.innerText=`You hit the enemy for ${totalDamage}`;
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
            }, 3000)
        } else {
            enemyAttack();
        }
        updateStats();
        } else{
            log.innerText = `The enemy is already slain`;
        }
        
    } else {
        log.innerText(`You can't attack`)
    }

}

function enemyAttack() {
    let attack = enemy.attack;
    let defense = hero.defense;
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
    hero.hp -= totalDamage;
    log.innerText += `, but the enemy hits you for ${totalDamage}`;
    if (hero.hp <= 0) {
        hero.hp = 0
        document.getElementById("enemyHealth").innerText = `0/${hero.maxhp}`;
        log.innerText = `You were slain`;
    }
}

function updateStats() {
    document.getElementById("health").innerText = `${hero.hp}/${hero.maxhp}HP`;
    document.getElementById("mana").innerText = `${hero.mana}/${hero.maxmana}MP`;
    document.getElementById("statA").innerText = `Attack: ${hero.attack}`;
    document.getElementById("statD").innerText = `Defense: ${hero.defense}`;
    document.getElementById("hPotion").innerText = `Drink Red Potion (${hero.rpotions})`;
    document.getElementById("mPotion").innerText = `Drink Blue Potion (${hero.mpotions})`;
    document.getElementById("enemyHealth").innerText = `${enemy.hp}/${enemy.maxhp}HP`;
    document.getElementById("enemyAttack").innerText = `Attack: ${enemy.attack}`;
    document.getElementById("enemyDefense").innerText = `Defense: ${enemy.defense}`;

}

function healthP() {
    if (hero.rpotions > 0) {
        hero.rpotions -= 1;
        hero.hp += 30;
        if (hero.hp > hero.maxhp) {
            hero.hp = hero.maxhp;
        }
        log.innerText = `You drink a red potion and recover health`;
    } else {
        log.innerText = `You don't have any red potions!`;
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
        log.innerText = `You drink a blue potion and regain mana`;
    } else {
        log.innerText = `You don't have any blue potions!`;
    }

    updateStats();
}

function magic() {
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
                }, 3000)
            }
            hero.mana -= 5;
        } else {
            log.innerText = `You're out of mana!`;
        }

        updateStats();
    } else {
        log.innerText = (`The enemy is already slain`);
    }
}

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

function makeEnemy() {
    log.innerText = `A new enemy approaches`
    enemy.hp = 30;
    enemy.maxhp = 30;
    enemy.attack = randomNumber(3);
    enemy.defense = randomNumber(3);
    updateStats();
}