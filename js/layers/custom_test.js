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
        defenseRNG: new Decimal(1),
        spec: "#DAC0CB",
        spectwo: "#00FF00",
        specthree: "#FF4433",
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
      if ((player.L.exp > 90) && player.L.level == 5) player.L.expMax = player.L.expMax.add(40)
      if ((player.L.exp > 90) && player.L.level == 5) player.L.exp = new Decimal(0)
      if ((player.L.exp > 130) && player.L.level == 6) player.L.expMax = player.L.expMax.add(50)
      if ((player.L.exp > 130) && player.L.level == 6) player.L.exp = new Decimal(0)
      if ((player.L.exp > 180) && player.L.level == 7) player.L.expMax = player.L.expMax.add(70)
      if ((player.L.exp > 180) && player.L.level == 7) player.L.exp = new Decimal(0)
      if ((player.L.exp > 250) && player.L.level == 8) player.L.expMax = player.L.expMax.add(50)
      if ((player.L.exp > 250) && player.L.level == 8) player.L.exp = new Decimal(0)
      if ((player.L.exp > 300) && player.L.level == 9) player.L.expMax = player.L.expMax.add(100)
      if ((player.L.exp > 300) && player.L.level == 9) player.L.exp = new Decimal(0)
      if ((player.L.exp > 400) && player.L.level == 10) player.L.expMax = player.L.expMax.add(100)
      if ((player.L.exp > 400) && player.L.level == 10) player.L.exp = new Decimal(0)
      if ((player.L.exp > 500) && player.L.level == 11) player.L.expMax = player.L.expMax.add(350)
      if ((player.L.exp > 500) && player.L.level == 11) player.L.exp = new Decimal(0)
      if ((player.L.exp > 850) && player.L.level == 12) player.L.expMax = player.L.expMax.add(450)
      if ((player.L.exp > 850) && player.L.level == 12) player.L.exp = new Decimal(0)
      if ((player.L.exp > 1300) && player.L.level == 13) player.L.expMax = player.L.expMax.add(400)
      if ((player.L.exp > 1300) && player.L.level == 13) player.L.exp = new Decimal(0)
      if ((player.L.exp > 1700) && player.L.level == 14) player.L.expMax = player.L.expMax.add(300)
      if ((player.L.exp > 1700) && player.L.level == 14) player.L.exp = new Decimal(0)
      if ((player.L.exp > 2000) && player.L.level == 15) player.L.expMax = player.L.expMax.add(200)
      if ((player.L.exp > 2000) && player.L.level == 15) player.L.exp = new Decimal(0)
},
    recheckChecker(){
      if ((player.L.expMax > 10) && player.L.level == 1) player.L.level = new Decimal(2)
      if ((player.L.expMax > 20) && player.L.level == 2) player.L.level = new Decimal(3)
      if ((player.L.expMax > 30) && player.L.level == 3) player.L.level = new Decimal(4)
      if ((player.L.expMax > 60) && player.L.level == 4) player.L.level = new Decimal(5)
      if ((player.L.expMax > 90) && player.L.level == 5) player.L.level = new Decimal(6)
      if ((player.L.expMax > 130) && player.L.level == 6) player.L.level = new Decimal(7)
      if ((player.L.expMax > 180) && player.L.level == 7) player.L.level = new Decimal(8)
      if ((player.L.expMax > 250) && player.L.level == 8) player.L.level = new Decimal(9)
      if ((player.L.expMax > 300) && player.L.level == 9) player.L.level = new Decimal(10)
      if ((player.L.expMax > 400) && player.L.level == 10) player.L.level = new Decimal(11)
      if ((player.L.expMax > 500) && player.L.level == 11) player.L.level = new Decimal(12)
      if ((player.L.expMax > 850) && player.L.level == 12) player.L.level = new Decimal(13)
      if ((player.L.expMax > 1300) && player.L.level == 13) player.L.level = new Decimal(14)
      if ((player.L.expMax > 1700) && player.L.level == 14) player.L.level = new Decimal(15)
      if ((player.L.expMax > 2000) && player.L.level == 15) player.L.level = new Decimal(16)
      if (player.L.level == 4) player.L.zone = new Decimal(2)
      if (player.L.level == 11) player.L.zone = new Decimal(3)
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
      if (player.L.level == 6) player.L.attack = new Decimal(9)
      if (player.L.level == 6) player.L.healthMax = new Decimal(45)
      if (player.L.level == 6) player.L.defense = new Decimal(3)
      if (player.L.level == 7) player.L.healthMax = new Decimal(48)
      if (player.L.level == 7) player.L.Wattack = new Decimal(4)
      if (player.L.level == 8) player.L.healthMax = new Decimal(50)
      if (player.L.level == 8) player.L.Wdefense = new Decimal(1)
      if (player.L.level == 9) player.L.healthMax = new Decimal(53)
      if (player.L.level == 9) player.L.attack = new Decimal(11)
      if (player.L.level == 10) player.L.healthMax = new Decimal(60)
      if (player.L.level == 10) player.L.attack = new Decimal(15)
      if (player.L.level == 10) player.L.defense = new Decimal(4)
      if (player.L.level == 11) player.L.healthMax = new Decimal(64)
      if (player.L.level == 11) player.L.attack = new Decimal(17)
      if (player.L.level == 11) player.L.Wdefense = new Decimal(2)
      if (player.L.level == 11) player.L.defense = new Decimal(6)
      if (player.L.level == 12) player.L.healthMax = new Decimal(67)
      if (player.L.level == 12) player.L.Wattack = new Decimal(6)
      if (player.L.level == 13) player.L.healthMax = new Decimal(75)
      if (player.L.level == 13) player.L.Wattack = new Decimal(8)
      if (player.L.level == 13) player.L.defense = new Decimal(7)
      if (player.L.level == 14) player.L.healthMax = new Decimal(80)
      if (player.L.level == 14) player.L.Wattack = new Decimal(9)
      if (player.L.level == 14) player.L.attack = new Decimal(23)
      if (player.L.level == 15) player.L.Wattack = new Decimal(10)
      if (player.L.level == 15) player.L.attack = new Decimal(26)
      if (player.L.level == 15) player.L.defense = new Decimal(8)
      if (player.L.level == 16) player.L.Wattack = new Decimal(13)
      if (player.L.level == 16) player.L.attack = new Decimal(30)
      if (player.L.level == 16) player.L.defense = new Decimal(10)
      if (player.L.level == 16) player.L.healthMax = new Decimal(85)
},

    colorcheckerOne(){
    if ((player.points > 2.5) && (player.L.randomizer == (7) || player.L.randomizer == (6) || player.L.randomizer == (2))) player.L.spectwo = "#00FF00"
    else player.L.spectwo = "#f5cbcb"
},

    colorcheckerTwo(){
    if ((player.L.randomizer != (7) || player.L.randomizer != (6) || player.L.randomizer != (2)) && (player.L.health >= player.L.healthMax)) player.L.spec = "#f5cbcb"
    else player.L.spec = "#11f4f7"
},

    colorcheckerThree(){
    if (player.L.randomizer == (7) || player.L.randomizer == (6) || player.L.randomizer == (2)) player.L.specthree = "#FF4433"
    else player.L.specthree = "#f5cbcb"
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
if (player.L.zone == 3) func = "Zone: <server>Server Room</server>"
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


// Zone 3


if (player.L.randomizer == (10) && player.L.zone == (3)) func = "* You looked at one of the server cases."
 if (player.L.randomizer == (9) && player.L.zone == (3)) func = "* You saw a pair of orange headphones on the table... "
 if (player.L.randomizer == (8) && player.L.zone == (3)) func = "* You liked looking at green and red blinkers from the server case."
 if (player.L.randomizer == (7) && player.L.zone == (3)) func = "* You've Encountered A(n) <rainbow>Hallow</rainbow>"
if (player.L.randomizer == (6) && player.L.zone == (3)) func = "* You've Encountered A(n) <rainbow>Virux</rainbow>"
if (player.L.randomizer == (5) && player.L.zone == (3)) func = "* You saw a handbook on 'Experimental Vials of Go-'<br>* The rest of the title is torn off..."
if (player.L.randomizer == (4) && player.L.zone == (3)) func = "* You felt <water>water</water> on the floor."
if (player.L.randomizer == (3) && player.L.zone == (3)) func = "* You heard something move in the corner of the room..."
if (player.L.randomizer == (2) && player.L.zone == (3)) func = "* You've Encountered A(n) <rainbow>Cyberruin</rainbow>"
if (player.L.randomizer == (1) && player.L.zone == (3)) func = "*<red> Watch out.</red>"
 return func
},{}],
                "blank",
                ["display-text",function(){let func = "<fail>Zone 2 unlocks at Level 4</fail><br>(You are currently Level " +formatWhole(player.L.level) + ")"
 if (player.L.zone == 2) func = "<fail>Zone 3 unlocks at Level 11</fail><br>(You are currently Level " +formatWhole(player.L.level) + ")"
if (player.L.zone == 3) func = "<fail>Zone 4 unlocks at Level 18</fail><br>(You are currently Level " +formatWhole(player.L.level) + ")"
return func
},{}],
                "blank",
                ["display-text",function(){let func = ""
if ((player.L.exp < 1) && player.L.level == (2)) func = "<levelup>Level Up! You're now Level 2</levelup><br> (+4 Max Health, +2 Attack)"
if ((player.L.exp < 1) && player.L.level == (3)) func = "<levelup>Level Up! You're now Level 3</levelup><br> (+5 Max Health, +1 Weapon Attack, +1 Defense)"
if ((player.L.exp < 1) && player.L.level == (4)) func = "<levelup>Level Up! You're now Level 4</levelup><br> (+4 Max Health, +1 Weapon Attack)"
if ((player.L.exp < 1) && player.L.level == (5)) func = "<levelup>Level Up! You're now Level 5</levelup><br> (+7 Max Health, +3 Attack)"
if ((player.L.exp < 1) && player.L.level == (6)) func = "<levelup>Level Up! You're now Level 6</levelup><br> (+5 Max Health, +2 Attack, +1 Defense)"
if ((player.L.exp < 1) && player.L.level == (7)) func = "<levelup>Level Up! You're now Level 7</levelup><br> (+3 Max Health, +1 Weapon Attack, Increased Max Damage)"
if ((player.L.exp < 1) && player.L.level == (8)) func = "<levelup>Level Up! You're now Level 8</levelup><br> (+2 Max Health, Unlock Weapon Defense)"
if ((player.L.exp < 1) && player.L.level == (9)) func = "<levelup>Level Up! You're now Level 9</levelup><br> (+3 Max Health, +2 Attack)"
if ((player.L.exp < 1) && player.L.level == (10)) func = "<levelup>Level Up! You're now Level 10</levelup><br> (+7 Max Health, +4 Attack, +1 Defense)<br><red>Don't let them escape...</red>"
if ((player.L.exp < 1) && player.L.level == (11)) func = "<levelup>Level Up! You're now Level 11</levelup><br> (+4 Max Health, +2 Attack, +2 Defense, +1 Weapon Defense)<br>"
if ((player.L.exp < 1) && player.L.level == (12)) func = "<levelup>Level Up! You're now Level 12</levelup><br> (+3 Max Health, +2 Weapon Attack)<br>"
if ((player.L.exp < 1) && player.L.level == (13)) func = "<levelup>Level Up! You're now Level 13</levelup><br> (+8 Max Health, +2 Weapon Attack, +1 Defense)<br>"
if ((player.L.exp < 1) && player.L.level == (14)) func = "<levelup>Level Up! You're now Level 14</levelup><br> (+5 Max Health, +1 Weapon Attack, +6 Attack)<br>"
if ((player.L.exp < 1) && player.L.level == (15)) func = "<levelup>Level Up! You're now Level 15</levelup><br> (+1 Weapon Attack, +3 Attack, +1 Defense)<br>"
if ((player.L.exp < 1) && player.L.level == (16)) func = "<levelup>Level Up! You're now Level 16</levelup><br> (+5 Max Health, +3 Weapon Attack, +4 Attack, +2 Defense)<br>"
return func
},{}],
                "blank",
                "blank",
                ["clickables", [1]],
                ["display-text",function(){
                    let func = ""
                    if (player.L.health <= 0) func = "* You have been killed..."
                    return func
                },{}],
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

// Zone 3

if (player.L.randomizer == (7) && player.L.zone == (3)) func = "<rainbow>Hallow</rainbow><br>Health: " + formatWhole(player.L.enemyHP) + " / " + formatWhole(player.L.enemyHPMax) + "<br> Attack: "+ formatWhole(player.L.enemyAttack) + " | Defense: "+ formatWhole(player.L.enemyDefense)
if (player.L.randomizer == (6) && player.L.zone == (3)) func = "<rainbow>Virux</rainbow><br>Health: " + formatWhole(player.L.enemyHP) + " / " + formatWhole(player.L.enemyHPMax) + "<br> Attack: "+ formatWhole(player.L.enemyAttack) + " | Defense: "+ formatWhole(player.L.enemyDefense)
if (player.L.randomizer == (2) && player.L.zone == (3)) func = "<rainbow>Cyberruin</rainbow><br>Health: " + formatWhole(player.L.enemyHP) + " / " + formatWhole(player.L.enemyHPMax) + "<br> Attack: "+ formatWhole(player.L.enemyAttack) + " | Defense: "+ formatWhole(player.L.enemyDefense)

return func
},{}],
                "blank",
                ["clickables", [2]],
                "blank",
["display-text",function(){ let func = ""
if (player.L.randomizer == (7) && player.L.zone == (1)) func = "* You inflicted " + formatWhole(player.L.attack.add(player.L.Wattack.times(player.L.dmgMult).floor()).minus(player.L.enemyDefense)) + " Damage on <water>Abys</water><br>* You lost " +formatWhole(player.L.enemyAttack.minus(player.L.defense.add(player.L.Wdefense.times(player.L.defenseRNG))).max(0))+" Health"
if (player.L.randomizer == (2) && player.L.zone == (1)) func = "* You inflicted " + formatWhole(player.L.attack.add(player.L.Wattack.times(player.L.dmgMult).floor()).minus(player.L.enemyDefense)) + " Damage on <water>Azure</water><br>* You lost " +formatWhole(player.L.enemyAttack.minus(player.L.defense.add(player.L.Wdefense.times(player.L.defenseRNG))).max(0))+" Health"
if (player.L.randomizer == (6) && player.L.zone == (1)) func = "* You inflicted " + formatWhole(player.L.attack.add(player.L.Wattack.times(player.L.dmgMult).floor()).minus(player.L.enemyDefense)) + " Damage on <water>Malachite</water><br>* You lost " +formatWhole(player.L.enemyAttack.minus(player.L.defense.add(player.L.Wdefense.times(player.L.defenseRNG))).max(0))+" Health"

// Zone 2

if (player.L.randomizer == (7) && player.L.zone == (2)) func = "* You inflicted " + formatWhole(player.L.attack.add(player.L.Wattack.times(player.L.dmgMult).floor()).minus(player.L.enemyDefense)) + " Damage on <ruins>Nyko</ruins><br>* You lost " +formatWhole(player.L.enemyAttack.minus(player.L.defense.add(player.L.Wdefense.times(player.L.defenseRNG))).max(0))+" Health"
if (player.L.randomizer == (6) && player.L.zone == (2)) func = "* You inflicted " + formatWhole(player.L.attack.add(player.L.Wattack.times(player.L.dmgMult).floor()).minus(player.L.enemyDefense)) + " Damage on <ruins>Permafrost</ruins><br>* You lost " +formatWhole(player.L.enemyAttack.minus(player.L.defense.add(player.L.Wdefense.times(player.L.defenseRNG))).max(0))+" Health"
if (player.L.randomizer == (2) && player.L.zone == (2)) func = "* You inflicted " + formatWhole(player.L.attack.add(player.L.Wattack.times(player.L.dmgMult).floor()).minus(player.L.enemyDefense)) + " Damage on <ruins>Snapper</ruins><br>* You lost " +formatWhole(player.L.enemyAttack.minus(player.L.defense.add(player.L.Wdefense.times(player.L.defenseRNG))).max(0))+" Health"

// Zone 3

if (player.L.randomizer == (7) && player.L.zone == (3)) func = "* You inflicted " + formatWhole((player.L.attack.add(player.L.Wattack.times(player.L.dmgMult).floor()).minus(player.L.enemyDefense).max(0))) + " Damage on <rainbow>Hallow</rainbow><br>* You lost " +formatWhole(player.L.enemyAttack.minus(player.L.defense.add(player.L.Wdefense.times(player.L.defenseRNG))).max(0))+" Health"
if (player.L.randomizer == (6) && player.L.zone == (3)) func = "* You inflicted " + formatWhole((player.L.attack.add(player.L.Wattack.times(player.L.dmgMult).floor()).minus(player.L.enemyDefense).max(0))) + " Damage on <rainbow>Virux</rainbow><br>* You lost " +formatWhole(player.L.enemyAttack.minus(player.L.defense.add(player.L.Wdefense.times(player.L.defenseRNG))).max(0))+" Health"
if (player.L.randomizer == (2) && player.L.zone == (3)) func = "* You inflicted " + formatWhole((player.L.attack.add(player.L.Wattack.times(player.L.dmgMult).floor()).minus(player.L.enemyDefense).max(0))) + " Damage on <rainbow>Cyberruin</rainbow><br>* You lost " +formatWhole(player.L.enemyAttack.minus(player.L.defense.add(player.L.Wdefense.times(player.L.defenseRNG))).max(0))+" Health"

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
               if (player.L.health <= 0) dis = "You were killed; revive to continue..."
return dis
},
            canClick(){ 
let click = true
if (player.L.randomizer == (7)) click = false
if (player.L.randomizer == (2)) click = false
if (player.L.randomizer == (6)) click = false
if (player.L.health <= 0) click = false
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

// Zone 3

if (player.L.randomizer == (7) && player.L.zone == (3)) player.L.enemyHP = player.L.enemyHP.add(750)
                if (player.L.randomizer == (7) && player.L.zone == (3)) player.L.enemyHPMax = player.L.enemyHPMax.add(750)
                if (player.L.randomizer == (7) && player.L.zone == (3)) player.L.enemyAttack = player.L.enemyAttack.add(12)
                if (player.L.randomizer == (7) && player.L.zone == (3)) player.L.enemyDefense = player.L.enemyDefense.add(5)

if (player.L.randomizer == (2) && player.L.zone == (3)) player.L.enemyHP = player.L.enemyHP.add(250)
                if (player.L.randomizer == (2) && player.L.zone == (3)) player.L.enemyHPMax = player.L.enemyHPMax.add(250)
                if (player.L.randomizer == (2) && player.L.zone == (3)) player.L.enemyAttack = player.L.enemyAttack.add(4)
                if (player.L.randomizer == (2) && player.L.zone == (3)) player.L.enemyDefense = player.L.enemyDefense.add(25)

if (player.L.randomizer == (6) && player.L.zone == (3)) player.L.enemyHP = player.L.enemyHP.add(150)
                if (player.L.randomizer == (6) && player.L.zone == (3)) player.L.enemyHPMax = player.L.enemyHPMax.add(150)
                if (player.L.randomizer == (6) && player.L.zone == (3)) player.L.enemyAttack = player.L.enemyAttack.add(24)
                if (player.L.randomizer == (6) && player.L.zone == (3)) player.L.enemyDefense = player.L.enemyDefense.add(3)


//Refix
            },
            style() {return{
                'background-color': tmp.L.color,
            }},
        },

        12: {
            title: "Revive",
            display(){let dis = "You died, Would you like to start again?<br><logic>On Revive, Recover 20 HP; but lose half of your experience..."   
return dis
},
            canClick(){ 
let click = false
if (player.L.health <= 0) click = true
return click},
            onClick() {
                player.L.randomizer = new Decimal(0)
                if (player.L.randomizer == (0)) player.L.enemyAttack = player.L.enemyAttack.minus(player.L.enemyAttack)
               if (player.L.randomizer == (0)) player.L.enemyHP = player.L.enemyHP.minus(player.L.enemyHP)
               if (player.L.randomizer == (0)) player.L.enemyHPMax = player.L.enemyHPMax.minus(player.L.enemyHPMax)
               if (player.L.randomizer == (0)) player.L.enemyDefense = player.L.enemyDefense.minus(player.L.enemyDefense)
                player.L.health = new Decimal(20)
                player.L.exp = player.L.exp.div(2)
            },
            style() {return{
                'background-color': tmp.L.color,
            }},
            unlocked() { return (player.L.health <= 0) },
        },

        21: {
            title: "Attack",
            display(){let dis = "Attack the enemy!"
            return dis
        },
            canClick(){ 
                let click = false
                if ((player.L.randomizer == (7) || player.L.randomizer == (2) || player.L.randomizer == (6)) && player.points > 2.49) click = true
                if (player.L.enemyHP <= (0)) click = false
                if (player.L.health <= (0)) click = false
return click},
            onClick() {
            if (player.L.randomizer == (7) || player.L.randomizer == (2) || player.L.randomizer == (6))
                 player.L.dmgMult = Math.floor((Math.random() * 7) + 1)
            if ((player.L.randomizer == (7) || player.L.randomizer == (2) || player.L.randomizer == (6)) && player.L.level > 6)
                 player.L.dmgMult = Math.floor((Math.random() * 9) + 1)
                 player.L.defenseRNG = Math.floor((Math.random() * 4) + 1)
                 player.L.enemyHP = player.L.enemyHP.minus((player.L.attack.add(player.L.Wattack.times(player.L.dmgMult))).minus(player.L.enemyDefense).max(0))
                 player.L.health = player.L.health.minus(player.L.enemyAttack.minus(player.L.defense.add(player.L.Wdefense.times(player.L.defenseRNG))).max(0))
                 // Attack Formuals
                 // Attacking Enemy Damage Formula: (attack(+weapon_attack * Damage Luck Mult) - Enemy_Defense))
                 player.points = player.points.minus(2.5)
                 if (player.L.enemyHP <= (0) && player.L.randomizer == (7) && player.L.zone == (1)) player.L.exp = player.L.exp.add(3)
                 if (player.L.enemyHP <= (0) && player.L.randomizer == (2) && player.L.zone == (1)) player.L.exp = player.L.exp.add(4)
                 if (player.L.enemyHP <= (0) && player.L.randomizer == (6) && player.L.zone == (1)) player.L.exp = player.L.exp.add(2.58)

                 if (player.L.enemyHP <= (0) && player.L.randomizer == (7) && player.L.zone == (2)) player.L.exp = player.L.exp.add(13.36)
                 if (player.L.enemyHP <= (0) && player.L.randomizer == (6) && player.L.zone == (2)) player.L.exp = player.L.exp.add(8.52)
                 if (player.L.enemyHP <= (0) && player.L.randomizer == (2) && player.L.zone == (2)) player.L.exp = player.L.exp.add(6.28)

                 if (player.L.enemyHP <= (0) && player.L.randomizer == (7) && player.L.zone == (3)) player.L.exp = player.L.exp.add(47.61)
                 if (player.L.enemyHP <= (0) && player.L.randomizer == (6) && player.L.zone == (3)) player.L.exp = player.L.exp.add(38.19)
                 if (player.L.enemyHP <= (0) && player.L.randomizer == (2) && player.L.zone == (3)) player.L.exp = player.L.exp.add(26.33)

                 if (player.L.enemyHP <= (0)) player.L.randomizer = new Decimal(0)
                if (player.L.enemyHP <= (0)) player.L.enemyAttack = player.L.enemyAttack.minus(player.L.enemyAttack)
                if (player.L.enemyHP <= (0)) player.L.enemyDefense = player.L.enemyDefense.minus(player.L.enemyDefense)
                if (player.L.enemyHP <= (0)) player.L.enemyHP = new Decimal(0)
                if (player.L.enemyHP <= (0)) player.L.enemyHPMax = player.L.enemyHPMax.minus(player.L.enemyHPMax)
            },
            style() {return {'background-color': player.L.spectwo,
}},
        },
        22: {
            title: "Heal",
            display(){let dis = "Heal Ability<br>You can't heal if your above Max Health"
return dis
},
            canClick(){ 
let click = true
    if ((player.L.health >= 20) && player.L.level == (1)) click = false
    if ((player.L.health >= 24) && player.L.level == (2)) click = false
    if ((player.L.health >= 29) && player.L.level == (3)) click = false
    if ((player.L.health >= 33) && player.L.level == (4)) click = false
    if ((player.L.health >= 40) && player.L.level == (5)) click = false
    if ((player.L.health >= 45) && player.L.level == (6)) click = false
    if ((player.L.health >= 48) && player.L.level == (7)) click = false
    if ((player.L.health >= 50) && player.L.level == (8)) click = false
    if ((player.L.health >= 53) && player.L.level == (9)) click = false
    if ((player.L.health >= 60) && player.L.level == (10)) click = false
    if ((player.L.health >= 64) && player.L.level == (11)) click = false
    if ((player.L.health >= 67) && player.L.level == (12)) click = false
    if ((player.L.health >= 75) && player.L.level == (13)) click = false
    if ((player.L.health >= 80) && player.L.level == (14)) click = false
    if ((player.L.health >= 80) && player.L.level == (15)) click = false
    if ((player.L.health >= 85) && player.L.level == (16)) click = false
    if (player.L.health <= (0)) click = false
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

        if ((player.L.randomizer == (7) || player.L.randomizer == (2)) && player.L.zone == (3))
                 player.L.enemyHP = player.L.enemyHP.add(3)
            if (player.L.randomizer == (6) && player.L.zone == (3))
                 player.L.enemyHP = player.L.enemyHP.add(5)

            if (player.L.level < 4)
                 player.L.health = player.L.health.add(2)
            if ((player.L.level < 11) && player.L.zone == 2)
                 player.L.health = player.L.health.add(3)
            if ((player.L.level < 17) && player.L.zone == 3)
                 player.L.health = player.L.health.add(5)
            },
            style() {return {
                'background-color': player.L.spec,}
            },
        },
23: {
            title: "Flee",
            display(){let dis = "Flee from the Enemy"
return dis
},
            canClick(){ 
let click = false
    if (player.L.randomizer == (7) || player.L.randomizer == (2) || player.L.randomizer == (6)) click = true
    if (player.L.health <= (0)) click = false
return click},
            onClick() {
            player.L.randomizer = 0
                if (player.L.randomizer == (0)) player.L.enemyAttack = player.L.enemyAttack.minus(player.L.enemyAttack)
                if (player.L.randomizer == (0)) player.L.enemyHP = player.L.enemyHP.minus(player.L.enemyHP)
                if (player.L.randomizer == (0)) player.L.enemyHPMax = player.L.enemyHPMax.minus(player.L.enemyHPMax)
                if (player.L.randomizer == (0)) player.L.enemyDefense = player.L.enemyDefense.minus(player.L.enemyDefense)
            },
            style() {return{
                'background-color': player.L.specthree,
            }},
        },
     },
})