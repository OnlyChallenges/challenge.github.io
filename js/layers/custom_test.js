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
    tabFormat: {
            "Seem Familiar...?":{
            content: [
                "blank",
                "blank",
                ["display-text",function(){
let func = ""
if (player.L.zone = 1) func = "Zone: <ruins>Pool</ruins>"
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
 if (player.L.randomizer == (10)) func = "* You Stepped On Some Leaves"
 if (player.L.randomizer == (9)) func = "* You Stepped On Some Rocks"
 if (player.L.randomizer == (8)) func = "* You Walked Across A Room"
 if (player.L.randomizer == (7)) func = "*You've Encountered A <water>Abys</water>"
if (player.L.randomizer == (6)) func = "*[Battle_Function2]"
if (player.L.randomizer == (5)) func = "*You Tripped On A Stick"
if (player.L.randomizer == (4)) func = "*You Found A Rock; You Threw It"
if (player.L.randomizer == (3)) func = "*You Found a Piece of 'Monster Candy', Gain 2 HP"
if (player.L.randomizer == (2)) func = "*[Battle_Function3]"
if (player.L.randomizer == (1)) func = "*<red>Kill Them All</red>"
 return func
},{}],
                "blank",
                ["display-text",function(){let func = "<help>(EXP means Execution Points)<br>(LV stands for Level of Violence)</help>"
return func
},{}],
                "blank",
                "blank",
                ["clickables", [1]],
                "blank",
                "blank",
                ["display-text",function(){ let func = ""
if (player.L.randomizer == (7)) func = "<water>Abys</water><br>Health: " + formatWhole(player.L.enemyHP) + " / " + formatWhole(player.L.enemyHPMax) + "<br> Attack: "+ formatWhole(player.L.enemyAttack) + " | Defense: "+ formatWhole(player.L.enemyDefense)
return func
},{}],
                "blank",
                ["clickables", [2]],
                "blank",
["display-text",function(){ let func = ""
if (player.L.randomizer == (7)) func = "* You inflicted " + formatWhole(player.L.attack.add(player.L.Wattack.times(player.L.dmgMult).floor()).add(player.L.enemyDefense)) + " Damage on <corrupt>Abys</corrupt><br>* You lost " +formatWhole(player.L.enemyAttack)+" Health"
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
return dis
},
            canClick(){ 
let click = true
if (player.L.randomizer == (7)) click = false
return click},
            onClick() {
                player.L.randomizer = Math.floor(Math.random() * 10) + 1;
                if (player.L.randomizer == (7)) player.L.enemyHP = 75
                if (player.L.randomizer == (7)) player.L.enemyHPMax = 75
                if (player.L.randomizer == (7)) player.L.enemyAttack = 2
                if (player.L.randomizer == (7)) player.L.enemyDefense = 1
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
if (player.L.randomizer == (7)) click = true
if (player.L.enemyHP <= (0)) click = false
return click},
            onClick() {
            if (player.L.randomizer == (7))
                 player.L.dmgMult = Math.floor((Math.random() * 7) + 1)
                 player.L.enemyHP = player.L.enemyHP.minus(player.L.attack.add(player.L.Wattack.times(player.L.dmgMult))).add(player.L.enemyDefense)
                 player.L.health = player.L.health.minus(player.L.enemyAttack)
                 if (player.L.enemyHP <= (0)) player.L.exp = player.L.exp.add(3)
                 if (player.L.enemyHP <= (0)) player.L.randomizer = minus(player.L.randomizer)
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
let click = false
if (player.L.randomizer == (7)) click = true
if (player.L.health >= player.L.healthMax) click = false
return click},
            onClick() {
            if (player.L.randomizer == (7))
                 player.L.enemyHP = player.L.enemyHP.add(1)
                 player.L.health = player.L.health.add(2)
                 if ((player.L.health > player.L.healthMax) && player.L.level == (1)) player.L.health = 20
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
if (player.L.randomizer == (7)) click = true
return click},
            onClick() {
            player.L.randomizer = 0
            },
            style() {return{
                'background-color': tmp.L.color,
            }},
        },
     },
})