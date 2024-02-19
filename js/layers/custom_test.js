addLayer("L", {
    name: "Battle", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "L", // This appears on the layer's node. Default is the id with the first letter capitalized
    startData() { return {
        unlocked: true,
        zone: new Decimal(1),
        level: new Decimal(1),
        health: new Decimal(20),
        healthMax: new Decimal(20),
        attack: new Decimal(2),
        Wattack: new Decimal(1),
        defense: new Decimal(1),
        Wdefense: new Decimal(0),
        exp: new Decimal(0),
        expMax: new Decimal(10),
        randomizer: new Decimal(1),
        dmgMult: new Decimal(1),

        // Enemy Stats
        enemyHP: new Decimal(0),
        enemyHPMax: new Decimal(0),
        enemyAttack: new Decimal(0),
        enemyDefense: new Decimal(0),
    }},
    color: "#8A422A",
    tooltip: "Battle",
    row: 5, // Row the layer is in on the tree (0 is the first row)
    type: "none",
    layerShown(){return true},
    levelChecker(){
      if ((player.L.exp > 10) && player.L.level == 1) player.L.expMax = player.L.expMax.times(2)
      if ((player.L.exp > 10) && player.L.level == 1) player.L.exp = new Decimal(0)
      if ((player.L.exp > 20) && player.L.level == 2) player.L.expMax = player.L.expMax.times(1.5)
      if ((player.L.exp > 20) && player.L.level == 2) player.L.exp = new Decimal(0)
      if ((player.L.exp > 30) && player.L.level == 3) player.L.expMax = player.L.expMax.times(2)
      if ((player.L.exp > 30) && player.L.level == 3) player.L.exp = new Decimal(0)
      if ((player.L.exp > 60) && player.L.level == 4) player.L.expMax = player.L.expMax.times(1.5)
      if ((player.L.exp > 60) && player.L.level == 4) player.L.exp = new Decimal(0)
},
    recheckChecker(){
      if ((player.L.expMax > 10) && player.L.level == 1) player.L.level = new Decimal(2)
      if ((player.L.expMax > 20) && player.L.level == 2) player.L.level = new Decimal(3)
      if ((player.L.expMax > 30) && player.L.level == 3) player.L.level = new Decimal(4)
      if ((player.L.expMax > 60) && player.L.level == 4) player.L.level = new Decimal(5)
      if (player.L.level == 4) player.L.zone = new Decimal(2)
      if (player.L.level == 1) player.L.healthMax = new Decimal(20)
      if (player.L.level == 1) player.L.attack = new Decimal(2)
      if (player.L.level == 2) player.L.healthMax = new Decimal(24)
      if (player.L.level == 2) player.L.attack = new Decimal(4)
      if (player.L.level == 3) player.L.healthMax = new Decimal(29)
      if (player.L.level == 3) player.L.Wattack = new Decimal(2)
      if (player.L.level == 3) player.L.defense = new Decimal(2)
      if (player.L.level == 4) player.L.healthMax = new Decimal(33)
      if (player.L.level == 4) player.L.Wattack = new Decimal(3)
      if (player.L.level == 5) player.L.healthMax = new Decimal(40)
      if (player.L.level == 5) player.L.attack = new Decimal(7)
},
    tabFormat: {
            "E205_Beta 1: RPG Mechanics":{
            content: [
                "blank",
                "blank",
                ["display-text",function(){
let func = ""
if (player.L.zone == 1) func = "Zone: <ruins>Pool</ruins>"
if (player.L.zone == 2) func = "Zone: <corrupt>Library</corrupt>"
return func
},{}],
                "blank",
                ["display-text",function(){
let func = "LV " + formatWhole(player.L.level)
return func

},{}],
                ["display-text",function(){
let func = "HP <logic>" + formatWhole(player.L.health) + "</logic> / <logic>" + formatWhole(player.L.healthMax) + "</logic>"
return func

},{}],
                ["display-text",function(){let func = "ATK: " +formatWhole(player.L.attack)+" ("+formatWhole(player.L.Wattack)+ ") ==== DEF: " + formatWhole(player.L.defense) + " ("+formatWhole(player.L.Wdefense)+")"
return func
},{}],
                ["display-text",function(){let func = "EXP: "+format(player.L.exp)+" / " +format(player.L.expMax)
return func
},{}],
                ["display-text",function(){let func = "RNG: " + format(player.L.randomizer) + " (<corrupt>Developer Feature</corrupt>)"
return func
},{}],
                "blank",
                ["display-text",function(){let func = ""

// Zone 1

 if (player.L.randomizer == (10) && player.L.zone == (1)) func = "* You Saw A Book that says: <br>* 'How to give a hu-'<br>* ... The rest of the title is scrapped off."
 if (player.L.randomizer == (9) && player.L.zone == (1)) func = "* You Stepped On Something..."
 if (player.L.randomizer == (8) && player.L.zone == (1)) func = "* You Walked Across The Pool"
 if (player.L.randomizer == (7) && player.L.zone == (1)) func = "* You've Encountered A(n) <water>Abys</water>"
if (player.L.randomizer == (6) && player.L.zone == (1)) func = "* You've Encountered A(n) <water>Malachite</water>"
if (player.L.randomizer == (5) && player.L.zone == (1)) func = "* You Liked The Lighting In The Pool"
if (player.L.randomizer == (4) && player.L.zone == (1)) func = "* You Found A Rock; You Threw It"
if (player.L.randomizer == (3) && player.L.zone == (1)) func = "* You Dipped Your Hand In The Water"
if (player.L.randomizer == (2) && player.L.zone == (1)) func = "* You've Encountered A(n) <water>Azure</water>"
if (player.L.randomizer == (1) && player.L.zone == (1)) func = "*<red> Kill Them All</red>"

// Zone 2

if (player.L.randomizer == (10) && player.L.zone == (2)) func = "* You turned on a lamp."
 if (player.L.randomizer == (9) && player.L.zone == (2)) func = "* You became anxious. "
 if (player.L.randomizer == (8) && player.L.zone == (2)) func = "* You Walked Across The Library"
 if (player.L.randomizer == (7) && player.L.zone == (2)) func = "* You've Encountered A(n) <ruins>Nyko</ruins>"
if (player.L.randomizer == (6) && player.L.zone == (2)) func = "* You've Encountered A(n) <ruins>Permafrost</ruins>"
if (player.L.randomizer == (5) && player.L.zone == (2)) func = "* You found an intresting book about 'Gooberification'"
if (player.L.randomizer == (4) && player.L.zone == (2)) func = "* You saw three tubes of some weird green liquid"
if (player.L.randomizer == (3) && player.L.zone == (2)) func = "* You messed with some books on the shelves"
if (player.L.randomizer == (2) && player.L.zone == (2)) func = "* You've Encountered A(n) <ruins>Snapper</ruins>"
if (player.L.randomizer == (1) && player.L.zone == (2)) func = "*<red> I love the smell of blood.</red>"

 return func
},{}],
                "blank",
                ["display-text",function(){let func = "<fail>Zone 2 unlocks at Level 4</fail><br>(You are currently Level " +formatWhole(player.L.level) + ")"
 if (player.L.zone == 2) func = "<fail>Zone 3 unlocks at Level 11</fail><br>(You are currently Level " +formatWhole(player.L.level) + ")"
return func
},{}],
                "blank",
                ["display-text",function(){let func = ""
if ((player.L.exp < 1) && player.L.level == (2)) func = "<levelup>Level Up! You're now Level 2</levelup><br> (+4 Max Health, +2 Attack)"
if ((player.L.exp < 1) && player.L.level == (3)) func = "<levelup>Level Up! You're now Level 3</levelup><br> (+5 Max Health, +1 Weapon Attack, +1 Defense)"
if ((player.L.exp < 1) && player.L.level == (4)) func = "<levelup>Level Up! You're now Level 4</levelup><br> (+4 Max Health, +1 Weapon Attack)"
if ((player.L.exp < 1) && player.L.level == (5)) func = "<levelup>Level Up! You're now Level 5</levelup><br> (+7 Max Health, +3 Attack)"
return func
},{}],
                "blank",
                "blank",
                ["clickables", [1]],
                "blank",
                "blank",
                ["display-text",function(){ let func = ""
if (player.L.randomizer == (7) && player.L.zone == (1)) func = "<water>Abys</water><br>Health: " + formatWhole(player.L.enemyHP) + " / " + formatWhole(player.L.enemyHPMax) + "<br> Attack: "+ formatWhole(player.L.enemyAttack) + " | Defense: "+ formatWhole(player.L.enemyDefense)
if (player.L.randomizer == (2) && player.L.zone == (1)) func = "<water>Azure</water><br>Health: " + formatWhole(player.L.enemyHP) + " / " + formatWhole(player.L.enemyHPMax) + "<br> Attack: "+ formatWhole(player.L.enemyAttack) + " | Defense: "+ formatWhole(player.L.enemyDefense)
if (player.L.randomizer == (6) && player.L.zone == (1)) func = "<water>Malachite</water><br>Health: " + formatWhole(player.L.enemyHP) + " / " + formatWhole(player.L.enemyHPMax) + "<br> Attack: "+ formatWhole(player.L.enemyAttack) + " | Defense: "+ formatWhole(player.L.enemyDefense)

// Zone 2

if (player.L.randomizer == (7) && player.L.zone == (2)) func = "<ruins>Nyko</ruins><br>Health: " + formatWhole(player.L.enemyHP) + " / " + formatWhole(player.L.enemyHPMax) + "<br> Attack: "+ formatWhole(player.L.enemyAttack) + " | Defense: "+ formatWhole(player.L.enemyDefense)
if (player.L.randomizer == (6) && player.L.zone == (2)) func = "<ruins>Permafrost</ruins><br>Health: " + formatWhole(player.L.enemyHP) + " / " + formatWhole(player.L.enemyHPMax) + "<br> Attack: "+ formatWhole(player.L.enemyAttack) + " | Defense: "+ formatWhole(player.L.enemyDefense)
if (player.L.randomizer == (2) && player.L.zone == (2)) func = "<ruins>Snapper</ruins><br>Health: " + formatWhole(player.L.enemyHP) + " / " + formatWhole(player.L.enemyHPMax) + "<br> Attack: "+ formatWhole(player.L.enemyAttack) + " | Defense: "+ formatWhole(player.L.enemyDefense)
return func
},{}],
                "blank",
                ["clickables", [2]],
                "blank",
["display-text",function(){ let func = ""
if (player.L.randomizer == (7) && player.L.zone == (1)) func = "* You inflicted " + formatWhole(player.L.attack.add(player.L.Wattack.times(player.L.dmgMult).floor()).minus(player.L.enemyDefense)) + " Damage on <water>Abys</water><br>* You lost " +formatWhole(player.L.enemyAttack.minus(player.L.defense).max(0))+" Health"
if (player.L.randomizer == (2) && player.L.zone == (1)) func = "* You inflicted " + formatWhole(player.L.attack.add(player.L.Wattack.times(player.L.dmgMult).floor()).minus(player.L.enemyDefense)) + " Damage on <water>Azure</water><br>* You lost " +formatWhole(player.L.enemyAttack.minus(player.L.defense).max(0))+" Health"
if (player.L.randomizer == (6) && player.L.zone == (1)) func = "* You inflicted " + formatWhole(player.L.attack.add(player.L.Wattack.times(player.L.dmgMult).floor()).minus(player.L.enemyDefense)) + " Damage on <water>Malachite</water><br>* You lost " +formatWhole(player.L.enemyAttack.minus(player.L.defense).max(0))+" Health"

// Zone 2

if (player.L.randomizer == (7) && player.L.zone == (2)) func = "* You inflicted " + formatWhole(player.L.attack.add(player.L.Wattack.times(player.L.dmgMult).floor()).minus(player.L.enemyDefense)) + " Damage on <ruins>Nyko</ruins><br>* You lost " +formatWhole(player.L.enemyAttack.minus(player.L.defense).max(0))+" Health"
if (player.L.randomizer == (6) && player.L.zone == (2)) func = "* You inflicted " + formatWhole(player.L.attack.add(player.L.Wattack.times(player.L.dmgMult).floor()).minus(player.L.enemyDefense)) + " Damage on <ruins>Permafrost</ruins><br>* You lost " +formatWhole(player.L.enemyAttack.minus(player.L.defense).max(0))+" Health"
if (player.L.randomizer == (2) && player.L.zone == (2)) func = "* You inflicted " + formatWhole(player.L.attack.add(player.L.Wattack.times(player.L.dmgMult).floor()).minus(player.L.enemyDefense)) + " Damage on <ruins>Snapper</ruins><br>* You lost " +formatWhole(player.L.enemyAttack.minus(player.L.defense).max(0))+" Health"

return func
},{}],
                ],
            },
        },
        clickables:{
        11: {
            title: "Explore",
            display(){let dis = "Look Around"
               if (player.L.randomizer == (7)) dis = "Look Around<br><ruins>You've Encountered An Enemy</ruins>"
               if (player.L.randomizer == (2)) dis = "Look Around<br><ruins>You've Encountered An Enemy</ruins>"
               if (player.L.randomizer == (6)) dis = "Look Around<br><ruins>You've Encountered An Enemy</ruins>"
return dis
},
            canClick(){ 
let click = true
if (player.L.randomizer == (7)) click = false
if (player.L.randomizer == (2)) click = false
if (player.L.randomizer == (6)) click = false
return click},
            onClick() {
                player.L.randomizer = Math.floor(Math.random() * 10) + 1;
                if (player.L.randomizer == (7) && player.L.zone == (1)) player.L.enemyHP = player.L.enemyHP.add(75)
                if (player.L.randomizer == (7) && player.L.zone == (1)) player.L.enemyHPMax = player.L.enemyHPMax.add(75)
                if (player.L.randomizer == (7) && player.L.zone == (1)) player.L.enemyAttack = player.L.enemyAttack.add(2)
                if (player.L.randomizer == (7) && player.L.zone == (1)) player.L.enemyDefense = player.L.enemyDefense.add(1)

if (player.L.randomizer == (2) && player.L.zone == (1)) player.L.enemyHP = player.L.enemyHP.add(90)
                if (player.L.randomizer == (2) && player.L.zone == (1)) player.L.enemyHPMax = player.L.enemyHPMax.add(90)
                if (player.L.randomizer == (2) && player.L.zone == (1)) player.L.enemyAttack = player.L.enemyAttack.add(1)
                if (player.L.randomizer == (2) && player.L.zone == (1)) player.L.enemyDefense = player.L.enemyDefense.add(3)

if (player.L.randomizer == (6) && player.L.zone == (1)) player.L.enemyHP = player.L.enemyHP.add(30)
                if (player.L.randomizer == (6) && player.L.zone == (1)) player.L.enemyHPMax = player.L.enemyHPMax.add(30)
                if (player.L.randomizer == (6) && player.L.zone == (1)) player.L.enemyAttack = player.L.enemyAttack.add(4)
                if (player.L.randomizer == (6) && player.L.zone == (1)) player.L.enemyDefense = player.L.enemyDefense.add(0)

// Zone 2

if (player.L.randomizer == (7) && player.L.zone == (2)) player.L.enemyHP = player.L.enemyHP.add(360)
                if (player.L.randomizer == (7) && player.L.zone == (2)) player.L.enemyHPMax = player.L.enemyHPMax.add(360)
                if (player.L.randomizer == (7) && player.L.zone == (2)) player.L.enemyAttack = player.L.enemyAttack.add(3)
                if (player.L.randomizer == (7) && player.L.zone == (2)) player.L.enemyDefense = player.L.enemyDefense.add(2)

if (player.L.randomizer == (2) && player.L.zone == (2)) player.L.enemyHP = player.L.enemyHP.add(140)
                if (player.L.randomizer == (2) && player.L.zone == (2)) player.L.enemyHPMax = player.L.enemyHPMax.add(140)
                if (player.L.randomizer == (2) && player.L.zone == (2)) player.L.enemyAttack = player.L.enemyAttack.add(2)
                if (player.L.randomizer == (2) && player.L.zone == (2)) player.L.enemyDefense = player.L.enemyDefense.add(7)

if (player.L.randomizer == (6) && player.L.zone == (2)) player.L.enemyHP = player.L.enemyHP.add(70)
                if (player.L.randomizer == (6) && player.L.zone == (2)) player.L.enemyHPMax = player.L.enemyHPMax.add(70)
                if (player.L.randomizer == (6) && player.L.zone == (2)) player.L.enemyAttack = player.L.enemyAttack.add(10)
                if (player.L.randomizer == (6) && player.L.zone == (2)) player.L.enemyDefense = player.L.enemyDefense.add(0)


//Refix
            },
            style() {return{
                'background-color': tmp.L.color,
            }},
        },
        21: {
            title: "Attack",
            display(){let dis = "Attack the enemy"
return dis
},
            canClick(){ 
let click = false
if (player.L.randomizer == (7) || player.L.randomizer == (2) || player.L.randomizer == (6)) click = true
if (player.L.enemyHP <= (0)) click = false
return click},
            onClick() {
            if (player.L.randomizer == (7) || player.L.randomizer == (2) || player.L.randomizer == (6))
                 player.L.dmgMult = Math.floor((Math.random() * 7) + 1)
                 player.L.enemyHP = player.L.enemyHP.minus(player.L.attack.add(player.L.Wattack.times(player.L.dmgMult))).add(player.L.enemyDefense).max(0)
                 player.L.health = player.L.health.minus(player.L.enemyAttack.minus(player.L.defense).max(0))
                 if (player.L.enemyHP <= (0) && player.L.randomizer == (7) && player.L.zone == (1)) player.L.exp = player.L.exp.add(3)
                 if (player.L.enemyHP <= (0) && player.L.randomizer == (2) && player.L.zone == (1)) player.L.exp = player.L.exp.add(4)
                 if (player.L.enemyHP <= (0) && player.L.randomizer == (6) && player.L.zone == (1)) player.L.exp = player.L.exp.add(2.58)

                 if (player.L.enemyHP <= (0) && player.L.randomizer == (7) && player.L.zone == (2)) player.L.exp = player.L.exp.add(13.36)
                 if (player.L.enemyHP <= (0) && player.L.randomizer == (6) && player.L.zone == (2)) player.L.exp = player.L.exp.add(8.52)
                 if (player.L.enemyHP <= (0) && player.L.randomizer == (2) && player.L.zone == (2)) player.L.exp = player.L.exp.add(6.28)
                 if (player.L.enemyHP <= (0)) player.L.randomizer = new Decimal(0)
                if (player.L.enemyHP <= (0)) player.L.enemyAttack = player.L.enemyAttack.minus(player.L.enemyAttack)
                if (player.L.enemyHP <= (0)) player.L.enemyDefense = player.L.enemyDefense.minus(player.L.enemyDefense)
                if (player.L.enemyHP <= (0)) player.L.enemyHP = new Decimal(0)
                if (player.L.enemyHP <= (0)) player.L.enemyHPMax = player.L.enemyHPMax.minus(player.L.enemyHPMax)
            },
            style() {return{
                'background-color': tmp.L.color,
            }},
        },
        22: {
            title: "Heal",
            display(){let dis = "Heal Ability<br>You can't heal of your above Max Health"
return dis
},
            canClick(){ 
let click = true
if ((player.L.health >= 20) && player.L.level == (1)) click = false
if ((player.L.health >= 24) && player.L.level == (2)) click = false
if ((player.L.health >= 29) && player.L.level == (3)) click = false
if ((player.L.health >= 33) && player.L.level == (4)) click = false
if ((player.L.health >= 40) && player.L.level == (5)) click = false
return click},
            onClick() {
            if ((player.L.randomizer == (7) || player.L.randomizer == (2)) && player.L.zone == (1))
                 player.L.enemyHP = player.L.enemyHP.add(1)
            if (player.L.randomizer == (6) && player.L.zone == (1))
                 player.L.enemyHP = player.L.enemyHP.add(2)

if ((player.L.randomizer == (7) || player.L.randomizer == (2)) && player.L.zone == (2))
                 player.L.enemyHP = player.L.enemyHP.add(2)
            if (player.L.randomizer == (6) && player.L.zone == (2))
                 player.L.enemyHP = player.L.enemyHP.add(3)
            if (player.L.level < 3)
                 player.L.health = player.L.health.add(2)
            if ((player.L.level < 6) && player.L.zone == 2)
                 player.L.health = player.L.health.add(3)
            },
            style() {return{
                'background-color': tmp.L.color,
            }},
        },
23: {
            title: "Flee",
            display(){let dis = "Flee from the Enemy"
return dis
},
            canClick(){ 
let click = false
if (player.L.randomizer == (7) || player.L.randomizer == (2) || player.L.randomizer == (6)) click = true
return click},
            onClick() {
            player.L.randomizer = 0
                if (player.L.randomizer == (0)) player.L.enemyAttack = player.L.enemyAttack.minus(player.L.enemyAttack)
               if (player.L.randomizer == (0)) player.L.enemyHP = player.L.enemyHP.minus(player.L.enemyHP)
               if (player.L.randomizer == (0)) player.L.enemyHPMax = player.L.enemyHPMax.minus(player.L.enemyHPMax)
               if (player.L.randomizer == (0)) player.L.enemyDefense = player.L.enemyDefense.minus(player.L.enemyDefense)
            },
            style() {return{
                'background-color': tmp.L.color,
            }},
        },
     },
})