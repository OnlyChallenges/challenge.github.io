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
        kills: new Decimal(0),
        revives: new Decimal(0),
        dmg: new Decimal(0),
        spec: "#DAC0CB",
        spectwo: "#00FF00",
        specthree: "#FF4433",
        barprog: "#47d424",
        barprog2: "#47d424",
        // Enemy Stats
        enemyHP: new Decimal(0),
        enemyHPMax: new Decimal(0),
        enemyAttack: new Decimal(0),
        enemyDefense: new Decimal(0),
        enemyShield: new Decimal(0),
        enemyShieldMax: new Decimal(0),
        // Other Stats
        debuff: new Decimal(0),
        crit: new Decimal(0),
        counter: new Decimal(0),
        DMGBoost: new Decimal(1)
    }},
    color: "#8A422A",
    tooltip: "Battle",
    row: 5, // Row the layer is in on the tree (0 is the first row)
    type: "none",
    layerShown(){return true},


    bars: {
        Phealth: {
            direction: RIGHT,
            width: 380,
            height: 37,
            fillStyle() { return { 'background-color': player.L.barprog2, } },
            borderStyle() { return { "border-color": "#569945", } },
            healthBarProg(){
                let prog = player.L.health.div(player.L.healthMax)
                if (prog > 0.99) player.L.barprog2 = "#47d424"
                if (prog < 0.9) player.L.barprog2 = "#67d424"
                if (prog < 0.8) player.L.barprog2 = "#88d424"
                if (prog < 0.7) player.L.barprog2 = "#b4d424"
                if (prog < 0.6) player.L.barprog2 = "#d4d424"
                if (prog < 0.5) player.L.barprog2 = "#d4c224"
                if (prog < 0.4) player.L.barprog2 = "#d4ae24"
                if (prog < 0.3) player.L.barprog2 = "#d47624"
                if (prog < 0.2) player.L.barprog2 = "#d43e24"
                if (prog < 0.1) player.L.barprog2 = "#d42424"
                if (prog < 0.05) player.L.barprog2 = "#ad2111"
                if (player.L.health < 1) prog = 0
                return prog
            },
            progress() {
                let prog = player.L.health.div(player.L.healthMax)
                if (player.L.health == player.L.healthMax) prog = 1
                if (player.L.health < 0) prog = 0
                return prog
            },
            display() {
                if (player.L.health > 0)
                    return "Health: "+ formatWhole(player.L.health) + " / " + formatWhole(player.L.healthMax)
                if ((player.L.health > 1000) && (player.L.healthMax > 1000))
                    return "health: "+ format(player.L.health.div(1000)) + " Thousand / " + format( player.L.healthMax.div(1000)) + " Thousand"
                if ((player.L.health < 1000) && (player.L.healthMax > 1000))
                    return "health: "+ formatWhole(player.L.health) + " / " + format(player.L.healthMax.div(1000)) + " Thousand"
                else
                    return "You died."
            },
            unlocked(){
                return true
            },
        },
        Ehealth: {
            direction: RIGHT,
            width: 380,
            height: 37,
            fillStyle() { return { 'background-color': player.L.barprog, } },
            borderStyle() { return { "border-color": "#569945", } },
            healthBarProg(){
                let prog = player.L.enemyHP.div(player.L.enemyHPMax)
                if (prog > 0.99) player.L.barprog = "#47d424"
                if (prog < 0.9) player.L.barprog = "#67d424"
                if (prog < 0.8) player.L.barprog = "#88d424"
                if (prog < 0.7) player.L.barprog = "#b4d424"
                if (prog < 0.6) player.L.barprog = "#d4d424"
                if (prog < 0.5) player.L.barprog = "#d4c224"
                if (prog < 0.4) player.L.barprog = "#d4ae24"
                if (prog < 0.3) player.L.barprog = "#d47624"
                if (prog < 0.2) player.L.barprog = "#d43e24"
                if (prog < 0.1) player.L.barprog = "#d42424"
                if (prog < 0.05) player.L.barprog = "#ad2111"
                if (player.L.enemyHP < 1) prog = 0
                return prog
            },
            progress() {
                let prog = player.L.enemyHP.div(player.L.enemyHPMax)
                if (player.L.enemyHP == player.L.enemyHPMax) prog = 1
                if (player.L.enemyHP < 0) prog = 0
                return prog
            },
            display() {
                if ((player.L.enemyHP > 1000) && (player.L.enemyHPMax > 1000))
                    return "Health: "+ format(player.L.enemyHP.div(1000)) + " Thousand / " + format( player.L.enemyHPMax.div(1000)) + " Thousand"
                if ((player.L.enemyHP < 1000) && (player.L.enemyHPMax > 1000))
                    return "Health: "+ formatWhole(player.L.enemyHP) + " / " + format(player.L.enemyHPMax.div(1000)) + " Thousand"
                else
                    return "Health: "+ formatWhole(player.L.enemyHP) + " / " + formatWhole(player.L.enemyHPMax)
            },
            unlocked(){
                return player.L.enemyHP > 0
            },
        },

        Eshield: {
            direction: RIGHT,
            width: 290,
            height: 18,
            fillStyle: { 'background-color': "#349beb", },
            borderStyle() { return { "border-color": "#3437eb", } },
            progress() {
                let prog = player.L.enemyShield.div(player.L.enemyShieldMax)
                if (player.L.enemyShield == player.L.enemyShieldMax) prog = 1
                if (player.L.enemyShield < 0) prog = 0
                return prog
            },
            display() {
                if (player.L.enemyShield > 0)
                    return "Shield: "+ formatWhole(player.L.enemyShield) + " / " + formatWhole(player.L.enemyShieldMax)
                else
                    return "Shattered!"
            },
            unlocked(){
                return (player.L.enemyShield > 0) 
            },
        },

        EXP: {
            direction: RIGHT,
            width: 380,
            height: 34,
            fillStyle: { 'background-color': "#f281fc", },
            borderStyle() { return { "border-color": "#f4ccfc", } },
            progress() {
                let prog = player.L.exp.div(player.L.expMax)
                if (player.L.exp == player.L.expMax) prog = 1
                if (player.L.exp <= 0) prog = 0
                return prog
            },
            display() {
                if ((player.L.exp > 1000) && (player.L.expMax > 1000))
                    return "Level: " + formatWhole(player.L.level) + "<br>Experience: "+ format(player.L.exp.div(1000)) + " Thousand / " + format(player.L.expMax.div(1000)) + " Thousand"
                if ((player.L.exp < 1000) && (player.L.expMax > 1000))
                    return "Level: " + formatWhole(player.L.level) + "<br>Experience: "+ format(player.L.exp) + " / " + format(player.L.expMax.div(1000)) + " Thousand"
                else
                    return "Level: " + formatWhole(player.L.level) + "<br>Experience: "+ format(player.L.exp) + " / " + formatWhole(player.L.expMax)
            },
            unlocked(){
                return true
            },
        },

     },



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
      if ((player.L.exp > 2200) && player.L.level == 16) player.L.expMax = player.L.expMax.add(300)
      if ((player.L.exp > 2200) && player.L.level == 16) player.L.exp = new Decimal(0)
      if ((player.L.exp > 2500) && player.L.level == 17) player.L.expMax = player.L.expMax.add(500)
      if ((player.L.exp > 2500) && player.L.level == 17) player.L.exp = new Decimal(0)
      if ((player.L.exp > 3000) && player.L.level == 18) player.L.expMax = player.L.expMax.add(2000)
      if ((player.L.exp > 3000) && player.L.level == 18) player.L.exp = new Decimal(0)
      if ((player.L.exp > 5000) && player.L.level == 19) player.L.expMax = player.L.expMax.add(2500)
      if ((player.L.exp > 5000) && player.L.level == 19) player.L.exp = new Decimal(0)
      if ((player.L.exp > 7500) && player.L.level == 20) player.L.expMax = player.L.expMax.add(5000)
      if ((player.L.exp > 7500) && player.L.level == 20) player.L.exp = new Decimal(0)
      if ((player.L.exp > 12500) && player.L.level == 21) player.L.expMax = player.L.expMax.add(2500)
      if ((player.L.exp > 12500) && player.L.level == 21) player.L.exp = new Decimal(0)
      if ((player.L.exp > 15000) && player.L.level == 22) player.L.expMax = player.L.expMax.add(2500)
      if ((player.L.exp > 15000) && player.L.level == 22) player.L.exp = new Decimal(0)
      if ((player.L.exp > 17500) && player.L.level == 23) player.L.expMax = player.L.expMax.add(2500)
      if ((player.L.exp > 17500) && player.L.level == 23) player.L.exp = new Decimal(0)
      if ((player.L.exp > 20000) && player.L.level == 24) player.L.expMax = player.L.expMax.add(10000)
      if ((player.L.exp > 20000) && player.L.level == 24) player.L.exp = new Decimal(0)
      if ((player.L.exp > 30000) && player.L.level == 25) player.L.expMax = player.L.expMax.add(10000)
      if ((player.L.exp > 30000) && player.L.level == 25) player.L.exp = new Decimal(0)
      if ((player.L.exp > 40000) && player.L.level == 26) player.L.expMax = player.L.expMax.add(15000)
      if ((player.L.exp > 40000) && player.L.level == 26) player.L.exp = new Decimal(0)
      if ((player.L.exp > 55000) && player.L.level == 27) player.L.expMax = player.L.expMax.add(15000)
      if ((player.L.exp > 55000) && player.L.level == 27) player.L.exp = new Decimal(0)
      if ((player.L.exp > 70000) && player.L.level == 28) player.L.expMax = player.L.expMax.add(10000)
      if ((player.L.exp > 70000) && player.L.level == 28) player.L.exp = new Decimal(0)
      if ((player.L.exp > 80000) && player.L.level == 29) player.L.expMax = player.L.expMax.add(20000)
      if ((player.L.exp > 80000) && player.L.level == 29) player.L.exp = new Decimal(0)
},
    recheckChecker(){
        // Level Up Checker - DelogV1
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
      if ((player.L.expMax > 2200) && player.L.level == 16) player.L.level = new Decimal(17)
      if ((player.L.expMax > 2500) && player.L.level == 17) player.L.level = new Decimal(18)
      if ((player.L.expMax > 3000) && player.L.level == 18) player.L.level = new Decimal(19)
      if ((player.L.expMax > 5000) && player.L.level == 19) player.L.level = new Decimal(20)
      if ((player.L.expMax > 7500) && player.L.level == 20) player.L.level = new Decimal(21)
      if ((player.L.expMax > 12500) && player.L.level == 21) player.L.level = new Decimal(22)
      if ((player.L.expMax > 15000) && player.L.level == 22) player.L.level = new Decimal(23)
      if ((player.L.expMax > 17500) && player.L.level == 23) player.L.level = new Decimal(24)
      if ((player.L.expMax > 20000) && player.L.level == 24) player.L.level = new Decimal(25)
      if ((player.L.expMax > 30000) && player.L.level == 25) player.L.level = new Decimal(26)
      if ((player.L.expMax > 40000) && player.L.level == 26) player.L.level = new Decimal(27)
      if ((player.L.expMax > 55000) && player.L.level == 27) player.L.level = new Decimal(28)
      if ((player.L.expMax > 70000) && player.L.level == 28) player.L.level = new Decimal(29)
      if ((player.L.expMax > 80000) && player.L.level == 28) player.L.level = new Decimal(30)

      // Zone Movements
      if (player.L.level == 4) player.L.zone = new Decimal(2)
      if (player.L.level == 11) player.L.zone = new Decimal(3)
      if (player.L.level == 18) player.L.zone = new Decimal(4)
      if (player.L.level == 25) player.L.zone = new Decimal(5)
      if (player.L.level == 30) player.L.zone = new Decimal(6)


      //Level 1 Stats
      if (player.L.level == 1) player.L.healthMax = new Decimal(20)
      if (player.L.level == 1) player.L.attack = new Decimal(2)
      //Level 2 Stats
      if (player.L.level == 2) player.L.healthMax = new Decimal(24)
      if (player.L.level == 2) player.L.attack = new Decimal(4)
      //Level 3 Stats
      if (player.L.level == 3) player.L.healthMax = new Decimal(29)
      if (player.L.level == 3) player.L.Wattack = new Decimal(2)
      if (player.L.level == 3) player.L.defense = new Decimal(2)
      //Level 4 Stats
      if (player.L.level == 4) player.L.healthMax = new Decimal(33)
      if (player.L.level == 4) player.L.Wattack = new Decimal(3)
      //Level 5 Stats
      if (player.L.level == 5) player.L.healthMax = new Decimal(40)
      if (player.L.level == 5) player.L.attack = new Decimal(7)
      //Level 6 Stats
      if (player.L.level == 6) player.L.attack = new Decimal(9)
      if (player.L.level == 6) player.L.healthMax = new Decimal(45)
      if (player.L.level == 6) player.L.defense = new Decimal(3)
      //Level 7 Stats
      if (player.L.level == 7) player.L.healthMax = new Decimal(48)
      if (player.L.level == 7) player.L.Wattack = new Decimal(4)
      //Level 8 Stats
      if (player.L.level == 8) player.L.healthMax = new Decimal(50)
      if (player.L.level == 8) player.L.Wdefense = new Decimal(1)
      //Level 9 Stats
      if (player.L.level == 9) player.L.healthMax = new Decimal(53)
      if (player.L.level == 9) player.L.attack = new Decimal(11)
      //Level 10 Stats
      if (player.L.level == 10) player.L.healthMax = new Decimal(60)
      if (player.L.level == 10) player.L.attack = new Decimal(15)
      if (player.L.level == 10) player.L.defense = new Decimal(4)
      //Level 11 Stats
      if (player.L.level == 11) player.L.healthMax = new Decimal(64)
      if (player.L.level == 11) player.L.attack = new Decimal(17)
      if (player.L.level == 11) player.L.Wdefense = new Decimal(2)
      if (player.L.level == 11) player.L.defense = new Decimal(6)
      //Level 12 Stats
      if (player.L.level == 12) player.L.healthMax = new Decimal(67)
      if (player.L.level == 12) player.L.Wattack = new Decimal(6)
      //Level 13 Stats
      if (player.L.level == 13) player.L.healthMax = new Decimal(75)
      if (player.L.level == 13) player.L.Wattack = new Decimal(8)
      if (player.L.level == 13) player.L.defense = new Decimal(7)
      //Level 14 Stats
      if (player.L.level == 14) player.L.healthMax = new Decimal(80)
      if (player.L.level == 14) player.L.Wattack = new Decimal(9)
      if (player.L.level == 14) player.L.attack = new Decimal(23)
      //Level 15 Stats
      if (player.L.level == 15) player.L.Wattack = new Decimal(10)
      if (player.L.level == 15) player.L.attack = new Decimal(26)
      if (player.L.level == 15) player.L.defense = new Decimal(8)
      //Level 16 Stats
      if (player.L.level == 16) player.L.Wattack = new Decimal(13)
      if (player.L.level == 16) player.L.attack = new Decimal(30)
      if (player.L.level == 16) player.L.defense = new Decimal(10)
      if (player.L.level == 16) player.L.healthMax = new Decimal(85)
      //Level 17 Stats
      if (player.L.level == 17) player.L.healthMax = new Decimal(90)
      if (player.L.level == 17) player.L.attack = new Decimal(37)
      if (player.L.level == 17) player.L.Wdefense = new Decimal(3)
      //Level 18 Stats
      if (player.L.level == 18) player.L.healthMax = new Decimal(150)
      if (player.L.level == 18) player.L.attack = new Decimal(45)
      if (player.L.level == 18) player.L.Wdefense = new Decimal(5)
      if (player.L.level == 18) player.L.Wattack = new Decimal(20)
      //Level 19 Stats
      if (player.L.level == 19) player.L.healthMax = new Decimal(199)
      if (player.L.level == 19) player.L.attack = new Decimal(70)
      if (player.L.level == 19) player.L.Wdefense = new Decimal(6)
      if (player.L.level == 19) player.L.Wattack = new Decimal(25)
      //Level 20 Stats
      if (player.L.level == 20) player.L.healthMax = new Decimal(220)
      if (player.L.level == 20) player.L.attack = new Decimal(99)
      if (player.L.level == 20) player.L.Wdefense = new Decimal(7)
      if (player.L.level == 20) player.L.Wattack = new Decimal(30)
      //Level 21 Stats
      if (player.L.level == 21) player.L.attack = new Decimal(120)
      //Level 22 Stats
      if (player.L.level == 22) player.L.attack = new Decimal(140)
      if (player.L.level == 22) player.L.Wattack = new Decimal(34)
      if (player.L.level == 22) player.L.defense = new Decimal(14)
      if (player.L.level == 22) player.L.healthMax = new Decimal(260)
      //Level 23 Stats
      if (player.L.level == 23) player.L.attack = new Decimal(150)
      if (player.L.level == 23) player.L.Wattack = new Decimal(36)
      if (player.L.level == 23) player.L.defense = new Decimal(15)
      //Level 24 Stats
      if (player.L.level == 24) player.L.attack = new Decimal(160)
      if (player.L.level == 24) player.L.defense = new Decimal(17)
      if (player.L.level == 24) player.L.healthMax = new Decimal(280)
      //Level 25 Stats
      if (player.L.level == 25) player.L.attack = new Decimal(175)
      if (player.L.level == 25) player.L.defense = new Decimal(20)
      if (player.L.level == 25) player.L.healthMax = new Decimal(300)
      //Level 26 Stats
      if (player.L.level == 26) player.L.attack = new Decimal(200)
      if (player.L.level == 26) player.L.defense = new Decimal(23)
      if (player.L.level == 26) player.L.healthMax = new Decimal(325)
      //Level 27 Stats
      if (player.L.level == 27) player.L.attack = new Decimal(220)
      if (player.L.level == 27) player.L.defense = new Decimal(25)
      if (player.L.level == 27) player.L.healthMax = new Decimal(350)
      //Level 28 Stats
      if (player.L.level == 28) player.L.Wattack = new Decimal(41)
      if (player.L.level == 28) player.L.Wdefense = new Decimal(8)
      if (player.L.level == 28) player.L.healthMax = new Decimal(365)
      //Level 29 Stats
      if (player.L.level == 29) player.L.Wattack = new Decimal(45)
      //Level 30 Stats
      if (player.L.level == 30) player.L.Wattack = new Decimal(60)
      if (player.L.level == 30) player.L.healthMax = new Decimal(400)
},

    colorcheckerOne(){
    if ((player.points > 2.5) && (player.L.randomizer == (7) || player.L.randomizer == (6) || player.L.randomizer == (2))) player.L.spectwo = "#00FF00"
    else player.L.spectwo = "#f5cbcb"
},
    colorcheckerThree(){
    if ((player.points > 2.5) && (player.L.randomizer == (7) || player.L.randomizer == (6) || player.L.randomizer == (2))) player.L.specthree = "#FF4433"
    else player.L.specthree = "#f5cbcb"
},
    posionCheck(){
        if ((player.L.randomizer == 7) && (player.L.zone == 5)) player.L.dmg = 1
        if ((player.L.enemyHP <= 0) || (player.L.health <= 0)) player.L.dmg = 0
        if ((player.L.randomizer == 2) && (player.L.zone == 6)) player.L.dmg = 2
    },


    update(diff){
        if (player.L.dmg == 1) 
            player.L.health = player.L.health.minus(0.3)
        if (player.L.dmg == 2)
            player.L.health = player.L.health.minus(0.5)
        if ((player.L.randomizer == (2) && player.L.zone == (6)) && player.L.enemyHP < player.L.enemyHPMax) // Regenerative Attack If Enemy Health is under the max.
            player.L.enemyHP = player.L.enemyHP.add(6)

        player.L.exp = player.L.exp.add(0.0000000001)
        // Bar Checker
    },


    tabFormat: {
            "E205_Beta 1: RPG Mechanics":{
            content: [
                ["raw-html", function () { return player.L.zone == (4) ? "<audio controls autoplay loop hidden><source src=music/another.mp3 type<=audio/mp3>loop=true hidden=true autostart=true</audio>": ""}],
                "blank",
                "blank",
                ["display-text",function(){
let func = ""
if (player.L.zone == 1) func = "Zone: <ruins>Pool</ruins>"
if (player.L.zone == 2) func = "Zone: <corrupt>Library</corrupt>"
if (player.L.zone == 3) func = "Zone: <server>Server Room</server>"
if (player.L.zone == 4) func = "Zone: <rainbow>Garden</rainbow>"
if (player.L.zone == 5) func = "Zone: <obs>Observatory</obs>"
if (player.L.zone == 6) func = "Zone: <ruins>Reality</ruins>"
let func2 = (func + "<br>(This is still in beta so expect multiple bugs from Level 1 - 30 :D)")
return func2
},{}],
                "blank",
                ["bar", "EXP"],
                ["bar", "Phealth"],
                ["display-text",function(){let func = "ATK: " +formatWhole(player.L.attack)+" ("+formatWhole(player.L.Wattack)+ ") ==== DEF: " + formatWhole(player.L.defense) + " ("+formatWhole(player.L.Wdefense)+")"
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

// Zone 4


if (player.L.randomizer == (10) && player.L.zone == (4)) func = "* You looked at the trees"
 if (player.L.randomizer == (9) && player.L.zone == (4)) func = "* You looked at the small pond"
 if (player.L.randomizer == (8) && player.L.zone == (4)) func = "* Something is in the water..."
 if (player.L.randomizer == (7) && player.L.zone == (4)) func = "* You've Encountered A(n) <rainbow>Morgan</rainbow>"
if (player.L.randomizer == (6) && player.L.zone == (4)) func = "* You've Encountered A(n) <rainbow>Lovebeast</rainbow>"
if (player.L.randomizer == (5) && player.L.zone == (4)) func = "* A weird aroma scent is near..."
if (player.L.randomizer == (4) && player.L.zone == (4)) func = "* Another book about 'Plasmatic Damage'...<br>* Huh...might be helpful..."
if (player.L.randomizer == (3) && player.L.zone == (4)) func = "* Those Metal Beams on the roof seems stable."
if (player.L.randomizer == (2) && player.L.zone == (4)) func = "* You've Encountered A(n) <rainbow>Deep</rainbow>"
if (player.L.randomizer == (1) && player.L.zone == (4)) func = "* You found a fun fact about the Facility.<br>* Facility§1.3: There's a Loving Experiment who would lure people in and then murder them...<br>* Turns out it wasn't a fun fact..."

// Zone 5


if (player.L.randomizer == (10) && player.L.zone == (5)) func = "* Why is their defense feel higher with shield?"
 if (player.L.randomizer == (9) && player.L.zone == (5)) func = "* They're becoming stronger"
 if (player.L.randomizer == (8) && player.L.zone == (5)) func = "* You look around the <obs>Observatory</obs>"
 if (player.L.randomizer == (7) && player.L.zone == (5)) func = "* You've Encountered A(n) <obs>Vixtra</obs>"
if (player.L.randomizer == (6) && player.L.zone == (5)) func = "* You've Encountered A(n) <obs>Wenyi</obs>"
if (player.L.randomizer == (5) && player.L.zone == (5)) func = "* Glassy Shards on a Glass Window...?"
if (player.L.randomizer == (4) && player.L.zone == (5)) func = "* 'Shields' - Experiments have 3x defense with shields enabled.<br> If not, they have regular defense...<br>* These bastards..."
if (player.L.randomizer == (3) && player.L.zone == (5)) func = "* This is a pretty narrow area..."
if (player.L.randomizer == (2) && player.L.zone == (5)) func = "* You've Encountered A(n) <obs>Somby</obs>"
if (player.L.randomizer == (1) && player.L.zone == (5)) func = "* You found a another fun fact about the Facility.<br>* Facility§1.4: Have you heard of 'Plasmatic Damage'?<br>* Seems familiar..."

// Zone 6


if (player.L.randomizer == (10) && player.L.zone == (6)) func = "* Darkness"
 if (player.L.randomizer == (9) && player.L.zone == (6)) func = "* Fear"
 if (player.L.randomizer == (8) && player.L.zone == (6)) func = "* <obs>Unknown Reality</obs>"
 if (player.L.randomizer == (7) && player.L.zone == (6)) func = "* You've Encountered <water>Stone, Tidal, Daizy</water>"
if (player.L.randomizer == (6) && player.L.zone == (6)) func = "* You've Encountered <ruins>Plasma, Brian, JJ</ruins>"
if (player.L.randomizer == (5) && player.L.zone == (6)) func = "* Undetermined"
if (player.L.randomizer == (4) && player.L.zone == (6)) func = "* Another Basementative"
if (player.L.randomizer == (3) && player.L.zone == (6)) func = "* Regenerative?"
if (player.L.randomizer == (2) && player.L.zone == (6)) func = "* You've Encountered <rainbow>Vali</rainbow>"
if (player.L.randomizer == (1) && player.L.zone == (6)) func = "* Facility§1.5.1: There are some people in this world who can see this photo correctly<br>* Facility§1.5.2: You are not one of them...only a figment of imagination...<br>* Facility§1.5.3: Only time can tell from this nonexistant world<br>* Facility§1.5.4: Heh...only some can understand.<br>* Written by <ruins>A Bird of light</ruins>"




 return func
},{}],
                "blank",
                ["display-text",function(){let func = "<fail>Zone 2 unlocks at Level 4</fail><br>(You are currently Level " +formatWhole(player.L.level) + ")"
 if (player.L.zone == 2) func = "<fail>Zone 3 unlocks at Level 11</fail><br>(You are currently Level " +formatWhole(player.L.level) + ")"
if (player.L.zone == 3) func = "<fail>Zone 4 unlocks at Level 18</fail><br>(You are currently Level " +formatWhole(player.L.level) + ")"
if (player.L.zone == 4) func = "<fail>Zone 5 unlocks at Level 25</fail><br>(You are currently Level " +formatWhole(player.L.level) + ")"
if (player.L.zone == 5) func = "<fail>Zone 6 unlocks at Level 30</fail><br>(You are currently Level " +formatWhole(player.L.level) + ")"
if (player.L.zone == 6) func = "<fail>Zone 7 unlocks at Level 37</fail><br>(You are currently Level " +formatWhole(player.L.level) + ")"
return func
},{}],
                "blank",
                ["display-text",function(){let func = ""
if ((player.L.exp < 1) && player.L.level == (2)) func = "<levelup>Level Up! You're now Level 2</levelup><br> (+4 Max Health, +2 Attack)"
if ((player.L.exp < 1) && player.L.level == (3)) func = "<levelup>Level Up! You're now Level 3</levelup><br> (+5 Max Health, +1 Weapon Attack, +1 Defense)"
if ((player.L.exp < 1) && player.L.level == (4)) func = "<levelup>Level Up! You're now Level 4</levelup><br> (+4 Max Health, +1 Weapon Attack)<br> Storyline Updated!"
if ((player.L.exp < 1) && player.L.level == (5)) func = "<levelup>Level Up! You're now Level 5</levelup><br> (+7 Max Health, +3 Attack)"
if ((player.L.exp < 1) && player.L.level == (6)) func = "<levelup>Level Up! You're now Level 6</levelup><br> (+5 Max Health, +2 Attack, +1 Defense)"
if ((player.L.exp < 1) && player.L.level == (7)) func = "<levelup>Level Up! You're now Level 7</levelup><br> (+3 Max Health, +1 Weapon Attack, Increased Max Damage)"
if ((player.L.exp < 1) && player.L.level == (8)) func = "<levelup>Level Up! You're now Level 8</levelup><br> (+2 Max Health, Unlock Weapon Defense)"
if ((player.L.exp < 1) && player.L.level == (9)) func = "<levelup>Level Up! You're now Level 9</levelup><br> (+3 Max Health, +2 Attack)"
if ((player.L.exp < 1) && player.L.level == (10)) func = "<levelup>Level Up! You're now Level 10</levelup><br> (+7 Max Health, +4 Attack, +1 Defense)<br><red>Don't let them escape...</red>"
if ((player.L.exp < 1) && player.L.level == (11)) func = "<levelup>Level Up! You're now Level 11</levelup><br> (+4 Max Health, +2 Attack, +2 Defense, +1 Weapon Defense)<br> Storyline Updated!"
if ((player.L.exp < 1) && player.L.level == (12)) func = "<levelup>Level Up! You're now Level 12</levelup><br> (+3 Max Health, +2 Weapon Attack)"
if ((player.L.exp < 1) && player.L.level == (13)) func = "<levelup>Level Up! You're now Level 13</levelup><br> (+8 Max Health, +2 Weapon Attack, +1 Defense)"
if ((player.L.exp < 1) && player.L.level == (14)) func = "<levelup>Level Up! You're now Level 14</levelup><br> (+5 Max Health, +1 Weapon Attack, +6 Attack)"
if ((player.L.exp < 1) && player.L.level == (15)) func = "<levelup>Level Up! You're now Level 15</levelup><br> (+1 Weapon Attack, +3 Attack, +1 Defense)"
if ((player.L.exp < 1) && player.L.level == (16)) func = "<levelup>Level Up! You're now Level 16</levelup><br> (+5 Max Health, +3 Weapon Attack, +4 Attack, +2 Defense)"
if ((player.L.exp < 1) && player.L.level == (17)) func = "<levelup>Level Up! You're now Level 17</levelup><br> (+5 Max Health, +7 Attack, +1 Weapon Defense)"
if ((player.L.exp < 1) && player.L.level == (18)) func = "<levelup>Level Up! You're now Level 18</levelup><br> (+60 Max Health, +8 Attack, +7 Weapon Attack, +2 Weapon Defense) Storyline Updated!"
if ((player.L.exp < 1) && player.L.level == (19)) func = "<levelup>Level Up! You're now Level 19</levelup><br> (+49 Max Health, +25 Attack, +5 Weapon Attack, +1 Weapon Defense)"
if ((player.L.exp < 1) && player.L.level == (20)) func = "<levelup>Level Up! You're now Level 20</levelup><br> (+21 Max Health, +29 Attack, +5 Weapon Attack, +1 Weapon Defense)"
if ((player.L.exp < 1) && player.L.level == (21)) func = "<levelup>Level Up! You're now Level 21</levelup><br> (+21 Attack, Increased Max Damage)"
if ((player.L.exp < 1) && player.L.level == (22)) func = "<levelup>Level Up! You're now Level 22</levelup><br> (+20 Attack, +4 Weapon Attack, +4 Defense, +40 Health)"
if ((player.L.exp < 1) && player.L.level == (23)) func = "<levelup>Level Up! You're now Level 23</levelup><br> (+10 Attack, +2 Weapon Attack, +1 Defense)"
if ((player.L.exp < 1) && player.L.level == (24)) func = "<levelup>Level Up! You're now Level 24</levelup><br> (+10 Attack, +2 Defense, +20 Max Health)"
if ((player.L.exp < 1) && player.L.level == (25)) func = "<levelup>Level Up! You're now Level 25</levelup><br> (+15 Attack, +3 Defense, +20 Max Health)<br>WARNING: <logic>Experiments now have Shields!</logic>"
if ((player.L.exp < 1) && player.L.level == (26)) func = "<levelup>Level Up! You're now Level 26</levelup><br> (+25 Attack, +3 Defense, +25 Max Health)"
if ((player.L.exp < 1) && player.L.level == (27)) func = "<levelup>Level Up! You're now Level 27</levelup><br> (+20 Attack, +2 Defense, +25 Max Health)"
if ((player.L.exp < 1) && player.L.level == (28)) func = "<levelup>Level Up! You're now Level 28</levelup><br> (+5 Weapon Attack, +1 Weapon Defense, +15 Max Health)"
if ((player.L.exp < 1) && player.L.level == (29)) func = "<levelup>Level Up! You're now Level 29</levelup><br> (+4 Weapon Attack)"
if ((player.L.exp < 1) && player.L.level == (30)) func = "<levelup>Level Up! You're now Level 30</levelup><br> (+15 Weapon Attack, +35 Max Health, Increased Max Damage)"

return func
},{}],
                "blank",
                "blank",
                ["clickables", [1]],
                ["display-text",function(){
                    let func = "* You need 2.5 Points per Attack, Heal, or Flee action!"
                    if (player.L.health <= 0) func = "* You have been killed..."
                    if (player.L.dmg == 1) func = "* You're <logic>Bleeding</logic>! (10HP/sec)"
                    if (player.L.randomizer == (2) && player.L.zone == (6)) func = "* You've been inflicted with <fail>Bird's Fear</fail>! (You lose 25% of your DEF!)<br>* <rainbow>Vali</rainbow> regenerates health overtime!"
                    return func
                },{}],
                ["display-text",function(){
                    let func = " "
                    if (player.L.crit == 2) func = "<fail>Critical Hit!</fail>"
                    if (player.L.counter == 5) func = "<fail>Enemy Counter! (2x Damage Taken)</fail>"
                    if (player.L.crit == 2 && player.L.counter == 5) func = "<fail>Crtical Hit but Enemy Countered! (Take 3x Damage & Crit Fails)</fail>"
                    return func
                },{}],
                "blank",
                "blank",
                ["bar", "Eshield"],
                ["bar", "Ehealth"],
                ["display-text",function(){ let func = ""
if (player.L.randomizer == (7) && player.L.zone == (1)) func = "<water>Abys</water><br> Attack: "+ formatWhole(player.L.enemyAttack) + " | Defense: "+ formatWhole(player.L.enemyDefense)
if (player.L.randomizer == (2) && player.L.zone == (1)) func = "<water>Azure</water><br> Attack: "+ formatWhole(player.L.enemyAttack) + " | Defense: "+ formatWhole(player.L.enemyDefense)
if (player.L.randomizer == (6) && player.L.zone == (1)) func = "<water>Malachite</water><br> Attack: "+ formatWhole(player.L.enemyAttack) + " | Defense: "+ formatWhole(player.L.enemyDefense)

// Zone 2

if (player.L.randomizer == (7) && player.L.zone == (2)) func = "<ruins>Nyko</ruins><br> Attack: "+ formatWhole(player.L.enemyAttack) + " | Defense: "+ formatWhole(player.L.enemyDefense)
if (player.L.randomizer == (6) && player.L.zone == (2)) func = "<ruins>Permafrost</ruins><br> Attack: "+ formatWhole(player.L.enemyAttack) + " | Defense: "+ formatWhole(player.L.enemyDefense)
if (player.L.randomizer == (2) && player.L.zone == (2)) func = "<ruins>Snapper</ruins><br> Attack: "+ formatWhole(player.L.enemyAttack) + " | Defense: "+ formatWhole(player.L.enemyDefense)

// Zone 3

if (player.L.randomizer == (7) && player.L.zone == (3)) func = "<rainbow>Hallow</rainbow><br> Attack: "+ formatWhole(player.L.enemyAttack) + " | Defense: "+ formatWhole(player.L.enemyDefense)
if (player.L.randomizer == (6) && player.L.zone == (3)) func = "<rainbow>Virux</rainbow><br> Attack: "+ formatWhole(player.L.enemyAttack) + " | Defense: "+ formatWhole(player.L.enemyDefense)
if (player.L.randomizer == (2) && player.L.zone == (3)) func = "<rainbow>Cyberruin</rainbow><br> Attack: "+ formatWhole(player.L.enemyAttack) + " | Defense: "+ formatWhole(player.L.enemyDefense)

// Zone 4

if (player.L.randomizer == (7) && player.L.zone == (4)) func = "<server>Morgan</server><br> Attack: "+ formatWhole(player.L.enemyAttack) + " | Defense: "+ formatWhole(player.L.enemyDefense)
if (player.L.randomizer == (6) && player.L.zone == (4)) func = "<server>Lovebeast</server><br> Attack: "+ formatWhole(player.L.enemyAttack) + " | Defense: "+ formatWhole(player.L.enemyDefense)
if (player.L.randomizer == (2) && player.L.zone == (4)) func = "<server>Deep</server><br> Attack: "+ formatWhole(player.L.enemyAttack) + " | Defense: "+ formatWhole(player.L.enemyDefense)

// Zone 5

if (player.L.randomizer == (7) && player.L.zone == (5)) func = "<obs>Vixtra</obs><br> Attack: "+ formatWhole(player.L.enemyAttack) + " | Defense: "+ formatWhole(player.L.enemyDefense)
if (player.L.randomizer == (6) && player.L.zone == (5)) func = "<obs>Wenyi</obs><br> Attack: "+ formatWhole(player.L.enemyAttack) + " | Defense: "+ formatWhole(player.L.enemyDefense)
if (player.L.randomizer == (2) && player.L.zone == (5)) func = "<obs>Somby</obs><br> Attack: "+ formatWhole(player.L.enemyAttack) + " | Defense: "+ formatWhole(player.L.enemyDefense)

// Zone 6

if (player.L.randomizer == (7) && player.L.zone == (6)) func = "<water>Stone, Tidal, Daizy</water><br> Attack: "+ formatWhole(player.L.enemyAttack) + " | Defense: "+ formatWhole(player.L.enemyDefense)
if (player.L.randomizer == (6) && player.L.zone == (6)) func = "<ruins>Plasma, Brian, JJ</ruins><br> Attack: "+ formatWhole(player.L.enemyAttack) + " | Defense: "+ formatWhole(player.L.enemyDefense)
if (player.L.randomizer == (2) && player.L.zone == (6)) func = "<rainbow>Vali</rainbow><br> Attack: "+ formatWhole(player.L.enemyAttack) + " | Defense: "+ formatWhole(player.L.enemyDefense)
 

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

// Zone 4

if (player.L.randomizer == (7) && player.L.zone == (4)) func = "* You inflicted " + formatWhole((player.L.attack.add(player.L.Wattack.times(player.L.dmgMult).times(player.L.DMGBoost).floor()).minus(player.L.enemyDefense).max(0))) + " Damage on <server>Morgan</server><br>* You lost " +formatWhole(player.L.enemyAttack.minus(player.L.defense.add(player.L.Wdefense.times(player.L.defenseRNG))).max(0))+" Health"
if (player.L.randomizer == (6) && player.L.zone == (4)) func = "* You inflicted " + formatWhole((player.L.attack.add(player.L.Wattack.times(player.L.dmgMult).times(player.L.DMGBoost).floor()).minus(player.L.enemyDefense).max(0))) + " Damage on <server>Lovebeast</server><br>* You lost " +formatWhole(player.L.enemyAttack.minus(player.L.defense.add(player.L.Wdefense.times(player.L.defenseRNG))).max(0))+" Health"
if (player.L.randomizer == (2) && player.L.zone == (4)) func = "* You inflicted " + formatWhole((player.L.attack.add(player.L.Wattack.times(player.L.dmgMult).times(player.L.DMGBoost).floor()).minus(player.L.enemyDefense).max(0))) + " Damage on <server>Deep</server><br>* You lost " +formatWhole(player.L.enemyAttack.minus(player.L.defense.add(player.L.Wdefense.times(player.L.defenseRNG))).max(0))+" Health"

// Zone 5

// Normal ->> Counter ->> Counter & Crit
if (player.L.randomizer == (7) && player.L.zone == (5)) func = "* You inflicted " + formatWhole((player.L.attack.add(player.L.Wattack.times(player.L.dmgMult).times(player.L.DMGBoost).floor()).minus(player.L.enemyDefense).max(0))) + " (<a>"+formatWhole((player.L.attack.add(player.L.Wattack.times(player.L.dmgMult).times(player.L.DMGBoost).floor()).minus(player.L.enemyDefense.times(3)).max(0)))+"</a>) Damage on <obs>Vixtra</obs><br>* You lost "+ formatWhole(player.L.enemyAttack.minus(player.L.defense.add(player.L.Wdefense.times(player.L.defenseRNG))).max(0))+" Health"
    if (player.L.randomizer == (7) && player.L.zone == (5) && player.L.counter == (5)) func = "* You inflicted " + formatWhole((player.L.attack.add(player.L.Wattack.times(player.L.dmgMult).times(player.L.DMGBoost).floor()).minus(player.L.enemyDefense).max(0))) + " (<a>"+formatWhole((player.L.attack.add(player.L.Wattack.times(player.L.dmgMult).times(player.L.DMGBoost).floor()).minus(player.L.enemyDefense.times(3)).max(0)))+"</a>) Damage on <obs>Vixtra</obs><br>* You lost "+ formatWhole(player.L.enemyAttack.times(2).minus(player.L.defense.add(player.L.Wdefense.times(player.L.defenseRNG))).max(0))+" Health"
        if (player.L.randomizer == (7) && player.L.zone == (5) && player.L.counter == (5) && player.L.crit == (2)) func = "* You inflicted " + formatWhole((player.L.attack.add(player.L.Wattack.times(player.L.dmgMult).times(player.L.DMGBoost).floor()).minus(player.L.enemyDefense).max(0))) + " (<a>"+formatWhole((player.L.attack.add(player.L.Wattack.times(player.L.dmgMult).times(player.L.DMGBoost).floor()).minus(player.L.enemyDefense.times(3)).max(0)))+"</a>) Damage on <obs>Vixtra</obs><br>* You lost "+ formatWhole(player.L.enemyAttack.times(3).minus(player.L.defense.add(player.L.Wdefense.times(player.L.defenseRNG))).max(0))+" Health"
if (player.L.randomizer == (6) && player.L.zone == (5)) func = "* You inflicted " + formatWhole((player.L.attack.add(player.L.Wattack.times(player.L.dmgMult).times(player.L.DMGBoost).floor()).minus(player.L.enemyDefense).max(0))) + " (<a>"+formatWhole((player.L.attack.add(player.L.Wattack.times(player.L.dmgMult).times(player.L.DMGBoost).floor()).minus(player.L.enemyDefense.times(3)).max(0)))+"</a>) Damage on <obs>Wenyi</obs><br>* You lost " +formatWhole(player.L.enemyAttack.minus(player.L.defense.add(player.L.Wdefense.times(player.L.defenseRNG))).max(0))+" Health"
    if (player.L.randomizer == (6) && player.L.zone == (5) && player.L.counter == (5)) func = "* You inflicted " + formatWhole((player.L.attack.add(player.L.Wattack.times(player.L.dmgMult).times(player.L.DMGBoost).floor()).minus(player.L.enemyDefense).max(0))) + " (<a>"+formatWhole((player.L.attack.add(player.L.Wattack.times(player.L.dmgMult).times(player.L.DMGBoost).floor()).minus(player.L.enemyDefense.times(3)).max(0)))+"</a>) Damage on <obs>Wenyi</obs><br>* You lost " +formatWhole(player.L.enemyAttack.times(2).minus(player.L.defense.add(player.L.Wdefense.times(player.L.defenseRNG))).max(0))+" Health"
        if (player.L.randomizer == (6) && player.L.zone == (5) && player.L.counter == (5) && player.L.crit == (2)) func = "* You inflicted " + formatWhole((player.L.attack.add(player.L.Wattack.times(player.L.dmgMult).times(player.L.DMGBoost).floor()).minus(player.L.enemyDefense).max(0))) + " (<a>"+formatWhole((player.L.attack.add(player.L.Wattack.times(player.L.dmgMult).times(player.L.DMGBoost).floor()).minus(player.L.enemyDefense.times(3)).max(0)))+"</a>) Damage on <obs>Wenyi</obs><br>* You lost " +formatWhole(player.L.enemyAttack.times(3).minus(player.L.defense.add(player.L.Wdefense.times(player.L.defenseRNG))).max(0))+" Health"
if (player.L.randomizer == (2) && player.L.zone == (5)) func = "* You inflicted " + formatWhole((player.L.attack.add(player.L.Wattack.times(player.L.dmgMult).times(player.L.DMGBoost).floor()).minus(player.L.enemyDefense).max(0))) + " (<a>"+formatWhole((player.L.attack.add(player.L.Wattack.times(player.L.dmgMult).times(player.L.DMGBoost).floor()).minus(player.L.enemyDefense.times(3)).max(0)))+"</a>) Damage on <obs>Somby</obs><br>* You lost " +formatWhole(player.L.enemyAttack.minus(player.L.defense.add(player.L.Wdefense.times(player.L.defenseRNG))).max(0))+" Health"
    if (player.L.randomizer == (2) && player.L.zone == (5) && player.L.counter == (5)) func = "* You inflicted " + formatWhole((player.L.attack.add(player.L.Wattack.times(player.L.dmgMult).times(player.L.DMGBoost).floor()).minus(player.L.enemyDefense).max(0))) + " (<a>"+formatWhole((player.L.attack.add(player.L.Wattack.times(player.L.dmgMult).times(player.L.DMGBoost).floor()).minus(player.L.enemyDefense.times(3)).max(0)))+"</a>) Damage on <obs>Somby</obs><br>* You lost " +formatWhole(player.L.enemyAttack.times(2).minus(player.L.defense.add(player.L.Wdefense.times(player.L.defenseRNG))).max(0))+" Health"
        if (player.L.randomizer == (2) && player.L.zone == (5) && player.L.counter == (5) && player.L.crit == (2)) func = "* You inflicted " + formatWhole((player.L.attack.add(player.L.Wattack.times(player.L.dmgMult).times(player.L.DMGBoost).floor()).minus(player.L.enemyDefense).max(0))) + " (<a>"+formatWhole((player.L.attack.add(player.L.Wattack.times(player.L.dmgMult).times(player.L.DMGBoost).floor()).minus(player.L.enemyDefense.times(3)).max(0)))+"</a>) Damage on <obs>Somby</obs><br>* You lost " +formatWhole(player.L.enemyAttack.times(3).minus(player.L.defense.add(player.L.Wdefense.times(player.L.defenseRNG))).max(0))+" Health"
// Zone 6

if (player.L.randomizer == (7) && player.L.zone == (6)) func = "* You inflicted " + formatWhole((player.L.attack.add(player.L.Wattack.times(player.L.dmgMult).times(player.L.DMGBoost).floor()).minus(player.L.enemyDefense).max(0))) + " (<a>"+formatWhole((player.L.attack.add(player.L.Wattack.times(player.L.dmgMult).times(player.L.DMGBoost).floor()).minus(player.L.enemyDefense.times(3)).max(0)))+"</a>) Damage on <water>Stone, Tidal, Daizy</water><br>* You lost " +formatWhole(player.L.enemyAttack.minus(player.L.defense.add(player.L.Wdefense.times(player.L.defenseRNG))).max(0))+" Health"
    if (player.L.randomizer == (7) && player.L.zone == (6) && player.L.counter == (5)) func = "* You inflicted " + formatWhole((player.L.attack.add(player.L.Wattack.times(player.L.dmgMult).times(player.L.DMGBoost).floor()).minus(player.L.enemyDefense).max(0))) + " (<a>"+formatWhole((player.L.attack.add(player.L.Wattack.times(player.L.dmgMult).times(player.L.DMGBoost).floor()).minus(player.L.enemyDefense.times(3)).max(0)))+"</a>) Damage on <water>Stone, Tidal, Daizy</water><br>* You lost " +formatWhole(player.L.enemyAttack.times(2).minus(player.L.defense.add(player.L.Wdefense.times(player.L.defenseRNG))).max(0))+" Health"
        if (player.L.randomizer == (7) && player.L.zone == (6) && player.L.counter == (5) && player.L.crit == (2)) func = "* You inflicted " + formatWhole((player.L.attack.add(player.L.Wattack.times(player.L.dmgMult).times(player.L.DMGBoost).floor()).minus(player.L.enemyDefense).max(0))) + " (<a>"+formatWhole((player.L.attack.add(player.L.Wattack.times(player.L.dmgMult).times(player.L.DMGBoost).floor()).minus(player.L.enemyDefense.times(3)).max(0)))+"</a>) Damage on <water>Stone, Tidal, Daizy</water><br>* You lost " +formatWhole(player.L.enemyAttack.times(3).minus(player.L.defense.add(player.L.Wdefense.times(player.L.defenseRNG))).max(0))+" Health"

if (player.L.randomizer == (6) && player.L.zone == (6)) func = "* You inflicted " + formatWhole((player.L.attack.add(player.L.Wattack.times(player.L.dmgMult).times(player.L.DMGBoost).floor()).minus(player.L.enemyDefense).max(0))) + " (<a>"+formatWhole((player.L.attack.add(player.L.Wattack.times(player.L.dmgMult).times(player.L.DMGBoost).floor()).minus(player.L.enemyDefense.times(3)).max(0)))+"</a>) Damage on <ruins>Plasma, Brian, JJ</ruins><br>* You lost " +formatWhole(player.L.enemyAttack.minus(player.L.defense.add(player.L.Wdefense.times(player.L.defenseRNG))).max(0))+" Health"
    if (player.L.randomizer == (6) && player.L.zone == (6) && player.L.counter == (5)) func = "* You inflicted " + formatWhole((player.L.attack.add(player.L.Wattack.times(player.L.dmgMult).times(player.L.DMGBoost).floor()).minus(player.L.enemyDefense).max(0))) + " (<a>"+formatWhole((player.L.attack.add(player.L.Wattack.times(player.L.dmgMult).times(player.L.DMGBoost).floor()).minus(player.L.enemyDefense.times(3)).max(0)))+"</a>) Damage on <ruins>Plasma, Brian, JJ</ruins><br>* You lost " +formatWhole(player.L.enemyAttack.times(2).minus(player.L.defense.add(player.L.Wdefense.times(player.L.defenseRNG))).max(0))+" Health"
        if (player.L.randomizer == (6) && player.L.zone == (6) && player.L.counter == (5) && player.L.crit == (2)) func = "* You inflicted " + formatWhole((player.L.attack.add(player.L.Wattack.times(player.L.dmgMult).times(player.L.DMGBoost).floor()).minus(player.L.enemyDefense).max(0))) + " (<a>"+formatWhole((player.L.attack.add(player.L.Wattack.times(player.L.dmgMult).times(player.L.DMGBoost).floor()).minus(player.L.enemyDefense.times(3)).max(0)))+"</a>) Damage on <ruins>Plasma, Brian, JJ</ruins><br>* You lost " +formatWhole(player.L.enemyAttack.times(3).minus(player.L.defense.add(player.L.Wdefense.times(player.L.defenseRNG))).max(0))+" Health"

if (player.L.randomizer == (2) && player.L.zone == (6)) func = "* You inflicted " + formatWhole((player.L.attack.add(player.L.Wattack.times(player.L.dmgMult).times(player.L.DMGBoost).floor()).minus(player.L.enemyDefense).max(0))) + " (<a>"+formatWhole((player.L.attack.add(player.L.Wattack.times(player.L.dmgMult).times(player.L.DMGBoost).floor()).minus(player.L.enemyDefense.times(3)).max(0)))+"</a>) Damage on <rainbow>Vali</rainbow><br>* You lost " +formatWhole(player.L.enemyAttack.minus(player.L.defense.add(player.L.Wdefense.times(player.L.defenseRNG))).max(0))+" Health"
    if (player.L.randomizer == (2) && player.L.zone == (6) && player.L.counter == (5)) func = "* You inflicted " + formatWhole((player.L.attack.add(player.L.Wattack.times(player.L.dmgMult).times(player.L.DMGBoost).floor()).minus(player.L.enemyDefense).max(0))) + " (<a>"+formatWhole((player.L.attack.add(player.L.Wattack.times(player.L.dmgMult).times(player.L.DMGBoost).floor()).minus(player.L.enemyDefense.times(3)).max(0)))+"</a>) Damage on <rainbow>Vali</rainbow><br>* You lost " +formatWhole(player.L.enemyAttack.times(2).minus(player.L.defense.add(player.L.Wdefense.times(player.L.defenseRNG))).max(0))+" Health"
        if (player.L.randomizer == (2) && player.L.zone == (6) && player.L.counter == (5) && player.L.crit == (2)) func = "* You inflicted " + formatWhole((player.L.attack.add(player.L.Wattack.times(player.L.dmgMult).times(player.L.DMGBoost).floor()).minus(player.L.enemyDefense).max(0))) + " (<a>"+formatWhole((player.L.attack.add(player.L.Wattack.times(player.L.dmgMult).times(player.L.DMGBoost).floor()).minus(player.L.enemyDefense.times(3)).max(0)))+"</a>) Damage on <rainbow>Vali</rainbow><br>* You lost " +formatWhole(player.L.enemyAttack.times(3).minus(player.L.defense.add(player.L.Wdefense.times(player.L.defenseRNG))).max(0))+" Health"

return func
},{}],
                ],
            },
            "Storyline": {
                content: [
                    "blank",
                    "blank",
                    ["display-text", function(){return `<logic>CONTEXT</logic>: Welcome to Zone 1 (Pool);<br>
                    In this area; you will encounter three types of monsters;<br>
                    - <water>Abys</water><br>
                    - <water>Azure</water><br>
                    - <water>Malachite</water><br>
                    Each having their own stats and damage counters.<br>
                    The game will be split into 10 Zones and will be having more and more content added throughout the zones.<br> Enjoy :)<br><br><br>
                    
                    ~~~~~~~~~~~~~~~~~~~~~~~~~<br><br>

                    <water>Act 1: Pool</water><br><br>
                    * You traverse into a facility.<br>
                    * Wondering what would be inside.<br>
                    * You walk around only to find multiple pools.<br>
                    * Mainly a bigger one.<br>
                    * You can feel a presence of something nearby.<br>
                    * You see a book on the counter*<br><br>
                    -= * It says 'Guide-ful Advice' * =-<br>
                    -= * You put the book into your Bag. * =-<br><br>
                    * And decide to walk through the water while looking at the intresting technology.<br>
                    * You feel something really close...<br>
                    * You decide to get out of the water and look around<br>
                    * You have a stick on you just in case...<br><br>
                    <water>End of Act 1</water>
                    `
                },{}],
                    "blank",
                    "blank",
                    ["display-text", function(){if (player.L.zone == 2 || player.L.zone == 3 || player.L.zone == 4 || player.L.zone == 5) return `
                    
                    ~~~~~~~~~~~~~~~~~~~~~~~~~<br><br>

                    <corrupt>Act 2: Library</corrupt><br><br>
                    * You leave the pool area, achieved greater confidence and strength.<br>
                    * You want to see if you can find intresting books about what you just encountered...<br>
                    * You walk around with the stick you've been using earlier.<br>
                    * Annoyed; you tried to find a better weapon<br>
                    * All you found was a flashlight...<br><br>
                    -= * You put the Flashlight in your Bag * =-<br>
                    -= * This might be wise... * =-<br><br>
                    * You sit down carefully, fully aware of what this facility could contain...<br>
                    * Your mumbling to yourself...<br>
                    * Anxiety ran down your face with fear of more enemies approaching down the hall..<br>
                    * ...<br>
                    * You found a busted bat...<br>
                    * <red>We need to get stronger</red><br><br>
                    -= * Three New Enemies Are Now Lurking * =-<br>
                    -= * <ruins>Snapper, Permafrost, and Nyko</ruins> * =-<br><br>
                    <corrupt>End of Act 2</corrupt>
                    `
                },{}],
                    "blank",
                    "blank",
                    ["display-text", function(){if (player.L.zone == 3 || player.L.zone == 4 || player.L.zone == 5) return `
                    
                    ~~~~~~~~~~~~~~~~~~~~~~~~~<br><br>

                    <server>Act 3: Server Room</server><br><br>
                    * You escape from the weird creatures...<br>
                    * One of them scratched your hand...<br>
                    * Luckily, you stumbled across the <server>Server Room</server>.<br>
                    * Your strength and confidence started to look for something to help your hand.<br>
                    * You found something that could help<br><br>
                    -= * You found an 'MedHealth Stim'. * =-<br>
                    -= * Boosts your healing ability by 3. * =-<br><br>
                    * Your <red>hand</red> starts to irritate <red>quite</red> a lot.<br>
                    * Your <red>mind</red> is racing...<br>
                    * You start to <red>lose</red> your feeling in your <red>right hand</red>.<br>
                    * ...<br>
                    * <red>All you can do is heal it...</red><br>
                    * '<red>Kill them all</red>'... You said to yourself.<br><br>
                    -= * Three New Enemies Are Now Lurking * =-<br>
                    -= * <rainbow>Hallow, Virux, Cyberruin</rainbow> * =-<br><br>
                    <server>End of Act 3</server>
                    `
                },{}],
                    "blank",
                    "blank",
                    ["display-text", function(){if (player.L.zone == 4 || player.L.zone == 5) return `
                    
                    ~~~~~~~~~~~~~~~~~~~~~~~~~<br><br>

                    <rainbow>Act 4: Garden</rainbow><br><br>
                    * You run down the halls<br>
                    * Escaping the <red>other</red> electronical creatures that <red>tried</red> to hurt you<br>
                    * Your hand start to <red>iritate</red> even <red>more</red><br>
                    * A strange <red>substance</red> starts to <red>form</red> on your hand.<br>
                    * <red>Your mind</red> is constantly <red>racing</red> from the pain and <red>hurt</red>.<br>
                    * You use <red>another MedHealth Stim</red> to <red>prevent it</red> from spreading.<br><br>
                    -= * Healing is boosted to 10 health per Heal Ability * =-<br><br>
                    * <red>During the process</red> your <red>vision starts</red> to become <red>red</red>.<br>
                    * Anxiety <red>is taking you over</red> with a fear of <red>losing your own thought</red>.<br>
                    * <red>All you can</red> do is try to <red>find</red> a cure.<br>
                    * '<fail>I'll see how long you last</fail>' You heard something controlling your hand that's proceeding your mind.<br>
                    * '<fail>Kill them all</fail>' It said...<br>
                    * You flee to the Garden to relax.<br>
                    * Only to sense more <red>experiments</red> near by...<br>
                    -= * Three New Enemies Are Now Lurking * =-<br>
                    -= * <server>Morgan, Lovebeast, Deep</server> * =-<br><br>
                    <rainbow>End of Act 4</rainbow>
                    `
                },{}],

                ],
            },
            "Stats & Bonus": {
                content: [
                    "blank",
                    "blank",
                    ["display-text", function(){return "You are currently Level "+ formatWhole(player.L.level)},{}],
                    ["display-text", function(){return "You have killed "+ formatWhole(player.L.kills) + " Experiments"},{}],
                    ["display-text", function(){return "You have revived a total of "+ formatWhole(player.L.revives) + " times"},{}],
                    ["display-text", function(){return "You are currently in Zone "+ formatWhole(player.L.zone)},{}],
                    "blank",
                    "blank",
                    "blank",
                    ["display-text", function(){return `~~~~~~~~~~~~~Experiment Log~~~~~~~~~~~~~<br><br>
                    
                    Zone 1 (<ruins>Pool</ruins>):<br><br>

                    Enemy 1: <water>Abys</water><br>
                    - Health: 75<br>
                    - Attack: 2<br>
                    - Defense: 1<br>
                    - EXP on Death: 3.05 EXP<br><br>
                    
                    Enemy 2: <water>Azure</water><br>
                    - Health: 60<br>
                    - Attack: 1<br>
                    - Defense: 3<br>
                    - EXP on Death: 4.37 EXP<br><br>

                    Enemy 3: <water>Malachite</water><br>
                    - Health: 30<br>
                    - Attack: 4<br>
                    - Defense: 0<br>
                    - EXP on Death: 2.58 EXP<br><br>
                    
                    `
                },{}],
                    "blank",
                    ["display-text", function(){if (player.L.zone == 2 || player.L.zone == 3 || player.L.zone == 4 || player.L.zone == 5) return `~~~~~~~~~~~~~~~~~~~~~~~~~~<br><br>
                    
                    Zone 2 (<corrupt>Library</corrupt>):<br><br>

                    Enemy 1: <ruins>Nyko</ruins><br>
                    - Health: 360<br>
                    - Attack: 3<br>
                    - Defense: 2<br>
                    - EXP on Death: 17.36 EXP<br><br>
                    
                    Enemy 2: <ruins>Permafrost</ruins><br>
                    - Health: 70<br>
                    - Attack: 10<br>
                    - Defense: 0<br>
                    - EXP on Death: 11.52 EXP<br><br>

                    Enemy 3: <ruins>Snapper</ruins><br>
                    - Health: 140<br>
                    - Attack: 2<br>
                    - Defense: 7<br>
                    - EXP on Death: 9.28 EXP<br><br>
                    
                    `
                },{}],
                "blank",
                ["display-text", function(){if (player.L.zone == 3 || player.L.zone == 4 || player.L.zone == 5) return `~~~~~~~~~~~~~~~~~~~~~~~~~~<br><br>
                
                    Zone 3 (<server>Server Room</server>):<br><br>

                    Enemy 1: <rainbow>Hallow</rainbow><br>
                    - Health: 750<br>
                    - Attack: 12<br>
                    - Defense: 5<br>
                    - EXP on Death: 84.61 EXP<br><br>
                
                    Enemy 2: <rainbow>Virux</rainbow><br>
                    - Health: 150<br>
                    - Attack: 24<br>
                    - Defense: 3<br>
                    - EXP on Death: 79.19 EXP<br><br>

                    Enemy 3: <rainbow>Cyberruin</rainbow><br>
                    - Health: 250<br>
                    - Attack: 4<br>
                    - Defense: 25<br>
                    - EXP on Death: 88.37 EXP<br><br>
                
                `
            },{}],
                "blank",
                ["display-text", function(){if (player.L.zone == 4 || player.L.zone == 5) return `~~~~~~~~~~~~~~~~~~~~~~~~~~<br><br>
                
                Zone 4 (<rainbow>Garden</rainbow>):<br><br>

                Enemy 1: <server>Morgan</server><br>
                - Health: 400<br>
                - Attack: 45<br>
                - Defense: 13<br>
                - EXP on Death: 496.68 EXP<br><br>
            
                Enemy 2: <server>Lovebeast</server><br>
                - Health: 1800<br>
                - Attack: 37<br>
                - Defense: 43<br>
                - EXP on Death: 516.14 EXP<br><br>

                Enemy 3: <server>Deep</server><br>
                - Health: 3500<br>
                - Attack: 15<br>
                - Defense: 15<br>
                - EXP on Death: 527.55 EXP<br><br>
            
            `
        },{}],
                "blank",
                ["display-text", function(){if (player.L.zone == 5) return `~~~~~~~~~~~~~~~~~~~~~~~~~~<br><br>
                
                Zone 5 (<obs>Observatory</obs>): <br>[Blue Means Shield!]<br><br>

                Enemy 1: <obs>Vixtra</obs><br>
                - Health: 3500 (<a>1500</a>)<br>
                - Attack: 46<br>
                - Defense: 58<br>
                - EXP on Death: 3,183.48 EXP<br><br>
            
                Enemy 2: <obs>Wenyi</obs><br>
                - Health: 5000 (<a>750</a>)<br>
                - Attack: 25<br>
                - Defense: 100<br>
                - EXP on Death: 2,849.32 EXP<br><br>

                Enemy 3: <obs>Somby</obs><br>
                - Health: 2000 (<a>1500</a>)<br>
                - Attack: 70<br>
                - Defense: 10<br>
                - EXP on Death: 3,527.49 EXP<br><br>
            
            `
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
            return click
            },
            onClick() {
                player.L.randomizer = Math.floor(Math.random() * 10) + 1;
                if (player.L.randomizer == (7) && player.L.zone == (1)) player.L.enemyHP = player.L.enemyHP.add(75)
                if (player.L.randomizer == (7) && player.L.zone == (1)) player.L.enemyHPMax = player.L.enemyHPMax.add(75)
                if (player.L.randomizer == (7) && player.L.zone == (1)) player.L.enemyAttack = player.L.enemyAttack.add(2)
                if (player.L.randomizer == (7) && player.L.zone == (1)) player.L.enemyDefense = player.L.enemyDefense.add(1)

                if (player.L.randomizer == (2) && player.L.zone == (1)) player.L.enemyHP = player.L.enemyHP.add(60)
                if (player.L.randomizer == (2) && player.L.zone == (1)) player.L.enemyHPMax = player.L.enemyHPMax.add(60)
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

                // Zone 4

                if (player.L.randomizer == (7) && player.L.zone == (4)) player.L.enemyHP = player.L.enemyHP.add(400)
                if (player.L.randomizer == (7) && player.L.zone == (4)) player.L.enemyHPMax = player.L.enemyHPMax.add(400)
                if (player.L.randomizer == (7) && player.L.zone == (4)) player.L.enemyAttack = player.L.enemyAttack.add(45)
                if (player.L.randomizer == (7) && player.L.zone == (4)) player.L.enemyDefense = player.L.enemyDefense.add(13)

                if (player.L.randomizer == (6) && player.L.zone == (4)) player.L.enemyHP = player.L.enemyHP.add(1800)
                if (player.L.randomizer == (6) && player.L.zone == (4)) player.L.enemyHPMax = player.L.enemyHPMax.add(1800)
                if (player.L.randomizer == (6) && player.L.zone == (4)) player.L.enemyAttack = player.L.enemyAttack.add(37)
                if (player.L.randomizer == (6) && player.L.zone == (4)) player.L.enemyDefense = player.L.enemyDefense.add(43)

                if (player.L.randomizer == (2) && player.L.zone == (4)) player.L.enemyHP = player.L.enemyHP.add(3500)
                if (player.L.randomizer == (2) && player.L.zone == (4)) player.L.enemyHPMax = player.L.enemyHPMax.add(3500)
                if (player.L.randomizer == (2) && player.L.zone == (4)) player.L.enemyAttack = player.L.enemyAttack.add(15)
                if (player.L.randomizer == (2) && player.L.zone == (4)) player.L.enemyDefense = player.L.enemyDefense.add(15)

                // Zone 5

                if (player.L.randomizer == (7) && player.L.zone == (5)) player.L.enemyHP = player.L.enemyHP.add(3500)
                if (player.L.randomizer == (7) && player.L.zone == (5)) player.L.enemyHPMax = player.L.enemyHPMax.add(3500)
                if (player.L.randomizer == (7) && player.L.zone == (5)) player.L.enemyAttack = player.L.enemyAttack.add(46)
                if (player.L.randomizer == (7) && player.L.zone == (5)) player.L.enemyDefense = player.L.enemyDefense.add(58)
                if (player.L.randomizer == (7) && player.L.zone == (5)) player.L.enemyShield = player.L.enemyShield.add(1500)
                if (player.L.randomizer == (7) && player.L.zone == (5)) player.L.enemyShieldMax = player.L.enemyShieldMax.add(1500)

                if (player.L.randomizer == (6) && player.L.zone == (5)) player.L.enemyHP = player.L.enemyHP.add(5000)
                if (player.L.randomizer == (6) && player.L.zone == (5)) player.L.enemyHPMax = player.L.enemyHPMax.add(5000)
                if (player.L.randomizer == (6) && player.L.zone == (5)) player.L.enemyAttack = player.L.enemyAttack.add(25)
                if (player.L.randomizer == (6) && player.L.zone == (5)) player.L.enemyDefense = player.L.enemyDefense.add(100)
                if (player.L.randomizer == (6) && player.L.zone == (5)) player.L.enemyShield = player.L.enemyShield.add(750)
                if (player.L.randomizer == (6) && player.L.zone == (5)) player.L.enemyShieldMax = player.L.enemyShieldMax.add(750)

                if (player.L.randomizer == (2) && player.L.zone == (5)) player.L.enemyHP = player.L.enemyHP.add(2000)
                if (player.L.randomizer == (2) && player.L.zone == (5)) player.L.enemyHPMax = player.L.enemyHPMax.add(2000)
                if (player.L.randomizer == (2) && player.L.zone == (5)) player.L.enemyAttack = player.L.enemyAttack.add(70)
                if (player.L.randomizer == (2) && player.L.zone == (5)) player.L.enemyDefense = player.L.enemyDefense.add(10)
                if (player.L.randomizer == (2) && player.L.zone == (5)) player.L.enemyShield = player.L.enemyShield.add(1500)
                if (player.L.randomizer == (2) && player.L.zone == (5)) player.L.enemyShieldMax = player.L.enemyShieldMax.add(1500)

                // Zone 6

                if (player.L.randomizer == (7) && player.L.zone == (6)) player.L.enemyHP = player.L.enemyHP.add(15000)
                if (player.L.randomizer == (7) && player.L.zone == (6)) player.L.enemyHPMax = player.L.enemyHPMax.add(15000)
                if (player.L.randomizer == (7) && player.L.zone == (6)) player.L.enemyAttack = player.L.enemyAttack.add(170)
                if (player.L.randomizer == (7) && player.L.zone == (6)) player.L.enemyDefense = player.L.enemyDefense.add(75)

                if (player.L.randomizer == (6) && player.L.zone == (6)) player.L.enemyHP = player.L.enemyHP.add(35000)
                if (player.L.randomizer == (6) && player.L.zone == (6)) player.L.enemyHPMax = player.L.enemyHPMax.add(35000)
                if (player.L.randomizer == (6) && player.L.zone == (6)) player.L.enemyAttack = player.L.enemyAttack.add(55)
                if (player.L.randomizer == (6) && player.L.zone == (6)) player.L.enemyDefense = player.L.enemyDefense.add(125)
                if (player.L.randomizer == (6) && player.L.zone == (6)) player.L.enemyShield = player.L.enemyShield.add(7500)
                if (player.L.randomizer == (6) && player.L.zone == (6)) player.L.enemyShieldMax = player.L.enemyShieldMax.add(7500)

                if (player.L.randomizer == (2) && player.L.zone == (6)) player.L.enemyHP = player.L.enemyHP.add(99999)
                if (player.L.randomizer == (2) && player.L.zone == (6)) player.L.enemyHPMax = player.L.enemyHPMax.add(99999)
                if (player.L.randomizer == (2) && player.L.zone == (6)) player.L.enemyAttack = player.L.enemyAttack.add(130)
                if (player.L.randomizer == (2) && player.L.zone == (6)) player.L.enemyDefense = player.L.enemyDefense.add(75)


            },
                style() {return{'background-color': tmp.L.color,}},
        },

        12: {
            title: "Revive",
                display(){let dis = "You died, Would you like to start again?<br><logic>On Revive, Recover 20 HP; but lose half of your experience..."   
                return dis
            },
            canClick(){ 
                let click = false
                if (player.L.health <= 0) click = true
                return click
            },
            onClick() {
                player.L.randomizer = new Decimal(0)
                if (player.L.randomizer == (0)) player.L.enemyAttack = player.L.enemyAttack.minus(player.L.enemyAttack)
               if (player.L.randomizer == (0)) player.L.enemyHP = player.L.enemyHP.minus(player.L.enemyHP)
               if (player.L.randomizer == (0)) player.L.enemyHPMax = player.L.enemyHPMax.minus(player.L.enemyHPMax)
               if (player.L.randomizer == (0)) player.L.enemyDefense = player.L.enemyDefense.minus(player.L.enemyDefense)
               if (player.L.randomizer == (0)) player.L.enemyShield = player.L.enemyShield.minus(player.L.enemyShield)
               if (player.L.randomizer == (0)) player.L.enemyShieldMax = player.L.enemyShieldMax.minus(player.L.enemyShieldMax)
                // Enemy Stat Reset on Revive
                player.L.health = new Decimal(20)
                player.L.exp = player.L.exp.div(2)
                player.L.revives = player.L.revives.add(1)
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
            if ((player.L.randomizer == (7) || player.L.randomizer == (2) || player.L.randomizer == (6)) && player.L.level > 17)
                 player.L.dmgMult = Math.floor((Math.random() * 13) + 2)
            if ((player.L.randomizer == (7) || player.L.randomizer == (2) || player.L.randomizer == (6)) && player.L.level > 20)
                 player.L.dmgMult = Math.floor((Math.random() * 18) + 2)
            if ((player.L.randomizer == (7) || player.L.randomizer == (2) || player.L.randomizer == (6)) && player.L.level > 29)
                 player.L.dmgMult = Math.floor((Math.random() * 24) + 3)
                // Max Damage Boost Based on Attack Formuals:
                // Under Level 6: 1-7x Damage Multi 
                // Under Level 17: 1-9x Damage Multi
                // Under Level 20: 2-13x Damage Multi
                // Under Level 29: 2-18x Damage Multi
                // Above Level 29: 3-24x Damage Multi

                 player.L.defenseRNG = Math.floor((Math.random() * 4) + 1)
                 // DefenseRNG; Allows The Player to sustain less damage dependant on Weapon Defense
                 if (player.L.zone > 4) player.L.crit = Math.floor((Math.random() * 5) + 1)
                 if (player.L.crit == 2 && player.L.counter != 5) player.L.DMGBoost = 2
                 if (player.L.crit != 2) player.L.DMGBoost = 1
                 if (player.L.zone > 4) player.L.counter = Math.floor((Math.random() * 10) + 1)
                 if (player.L.counter != 5) player.L.health = player.L.health.minus(player.L.enemyAttack.minus(player.L.defense.add(player.L.Wdefense.times(player.L.defenseRNG))).max(0))
                 if (player.L.counter == 5) player.L.health = player.L.health.minus(player.L.enemyAttack.times(2).minus(player.L.defense.add(player.L.Wdefense.times(player.L.defenseRNG))).max(0))
                 if (player.L.counter == 5 && player.L.crit == 2) player.L.health = player.L.health.minus(player.L.enemyAttack.times(3).minus(player.L.defense.add(player.L.Wdefense.times(player.L.defenseRNG))).max(0))
                 // Attack Formuals
                 // Attacking Enemy Damage Formula: (attack(+weapon_attack * Damage Luck Mult(Crit2x)) - Enemy_Defense)) (Minimum of 0 Damage)
                 // Player Damage Formula: (Enemy_attack+(defense+(Weapon_Defense*Defense_RNG))) (Minimum of 0 Damage)
                 // Damage Mult RNG: Picks a Number between 1 through 9 per Attack (Added Crit damage Mult during Zone 4)
                 // Defense RNG: Picks a Number between 1 through 4 per Attack (Added Block Chance during Zone 5)
                 // Crit Change Mech: Randomly Picks a Number between 1 - 5, if the number lands on 2, land a crit on the enemy, applies to main damage but shield damage is still reduced based on Enemy Defense.
                 // Counter Chance Mech: Randomly picks a number between 1 - 10, if the number lands on 5, land a counter by the enemy to do double damage, doesn't apply the Crit Given to the enemy and Player Weapon Defense can always relucate the damage.
                    // Crit Chance & Counter Chance are the Same Predic: Counter takes over Crit and Crit becomes defective and only charges with a normal attack, disavantage is that you take 3x damage instead due to the counter damage
                 if (player.L.enemyShield <= 0) player.L.enemyHP = player.L.enemyHP.minus((player.L.attack.add(player.L.Wattack.times(player.L.dmgMult).times(player.L.DMGBoost))).minus(player.L.enemyDefense).max(0))
                 if (player.L.enemyShield > 0) player.L.enemyHP = player.L.enemyHP.minus(0)
                 if (player.L.enemyShield > 0) player.L.enemyShield = player.L.enemyShield.minus((player.L.attack.add(player.L.Wattack.times(player.L.dmgMult).times(player.L.DMGBoost))).minus(player.L.enemyDefense.times(3)).max(0))


                 player.points = player.points.minus(2.5)
                 // Somewhat of a Mana Storage
                 if (player.L.enemyHP <= (0) && player.L.randomizer == (7) && player.L.zone == (1)) player.L.exp = player.L.exp.add(3.05)
                 if (player.L.enemyHP <= (0) && player.L.randomizer == (2) && player.L.zone == (1)) player.L.exp = player.L.exp.add(4.37)
                 if (player.L.enemyHP <= (0) && player.L.randomizer == (6) && player.L.zone == (1)) player.L.exp = player.L.exp.add(2.58)

                 if (player.L.enemyHP <= (0) && player.L.randomizer == (7) && player.L.zone == (2)) player.L.exp = player.L.exp.add(17.36)
                 if (player.L.enemyHP <= (0) && player.L.randomizer == (6) && player.L.zone == (2)) player.L.exp = player.L.exp.add(11.52)
                 if (player.L.enemyHP <= (0) && player.L.randomizer == (2) && player.L.zone == (2)) player.L.exp = player.L.exp.add(9.28)

                 if (player.L.enemyHP <= (0) && player.L.randomizer == (7) && player.L.zone == (3)) player.L.exp = player.L.exp.add(84.61)
                 if (player.L.enemyHP <= (0) && player.L.randomizer == (6) && player.L.zone == (3)) player.L.exp = player.L.exp.add(79.19)
                 if (player.L.enemyHP <= (0) && player.L.randomizer == (2) && player.L.zone == (3)) player.L.exp = player.L.exp.add(88.37)

                 if (player.L.enemyHP <= (0) && player.L.randomizer == (7) && player.L.zone == (4)) player.L.exp = player.L.exp.add(498.68)
                 if (player.L.enemyHP <= (0) && player.L.randomizer == (6) && player.L.zone == (4)) player.L.exp = player.L.exp.add(516.14)
                 if (player.L.enemyHP <= (0) && player.L.randomizer == (2) && player.L.zone == (4)) player.L.exp = player.L.exp.add(527.55)

                 if (player.L.enemyHP <= (0) && player.L.randomizer == (7) && player.L.zone == (5)) player.L.exp = player.L.exp.add(3183.48)
                 if (player.L.enemyHP <= (0) && player.L.randomizer == (6) && player.L.zone == (5)) player.L.exp = player.L.exp.add(2849.32)
                 if (player.L.enemyHP <= (0) && player.L.randomizer == (2) && player.L.zone == (5)) player.L.exp = player.L.exp.add(3527.49)

                 if (player.L.enemyHP <= (0) && player.L.randomizer == (7) && player.L.zone == (6)) player.L.exp = player.L.exp.add(18305.35)
                 if (player.L.enemyHP <= (0) && player.L.randomizer == (6) && player.L.zone == (6)) player.L.exp = player.L.exp.add(21044.35)
                 if (player.L.enemyHP <= (0) && player.L.randomizer == (2) && player.L.zone == (6)) player.L.exp = player.L.exp.add(56022.33)
                 // EXP Per Zone Applier


                 if (player.L.enemyHP <= (0)) player.L.randomizer = new Decimal(0)
                if (player.L.enemyHP <= (0)) player.L.kills = player.L.kills.add(1)
                if (player.L.enemyHP <= (0)) player.L.enemyAttack = player.L.enemyAttack.minus(player.L.enemyAttack)
                if (player.L.enemyHP <= (0)) player.L.enemyDefense = player.L.enemyDefense.minus(player.L.enemyDefense)
                if (player.L.enemyHP <= (0)) player.L.enemyHP = new Decimal(0)
                if (player.L.enemyShield <= (0)) player.L.enemyShield = new Decimal(0)
                if (player.L.enemyShield <= (0)) player.L.enemyShieldMax = player.L.enemyShieldMax.minus(player.L.enemyShieldMax)

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
let re = false
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
    if ((player.L.health >= 90) && player.L.level == (17)) click = false
    if ((player.L.health >= 150) && player.L.level == (18)) click = false
    if ((player.L.health >= 199) && player.L.level == (19)) click = false
    if (((player.L.health >= 220) && player.L.level == (20)) || (player.L.health >= 220 && player.L.level == (21))) click = false
    if (((player.L.health >= 260) && player.L.level == (22)) || (player.L.health >= 260 && player.L.level == (23))) click = false
    if ((player.L.health >= 280) && player.L.level == (24)) click = false
    if ((player.L.health >= 300) && player.L.level == (25)) click = false
    if ((player.L.health >= 325) && player.L.level == (26)) click = false
    if ((player.L.health >= 350) && player.L.level == (27)) click = false
    if ((player.L.health >= 365) && player.L.level == (28)) click = false
    if ((player.L.health >= 365) && player.L.level == (29)) click = false
    if ((player.L.health >= 400) && player.L.level == (30)) click = false
    if (player.L.health <= (0)) click = false
    if (player.points < 2.49) click = false
    if ((player.L.randomizer == (7) || player.L.randomizer == (2) || player.L.randomizer == (6)) && player.points > 2.49 && click == true) re = true
return re
    },
            onClick() {
        if ((player.L.randomizer == (7) || player.L.randomizer == (2)) && player.L.zone == (1))
                 player.L.enemyHP = player.L.enemyHP.add(1)
            if (player.L.randomizer == (6) && player.L.zone == (1))
                 player.L.enemyHP = player.L.enemyHP.add(2)

if ((player.L.randomizer == (7) || player.L.randomizer == (2)) && player.L.zone == (1))
                 player.L.enemyHPMax = player.L.enemyHPMax.add(1)
            if (player.L.randomizer == (6) && player.L.zone == (1))
                 player.L.enemyHPMax = player.L.enemyHPMax.add(2)

        if ((player.L.randomizer == (7) || player.L.randomizer == (2)) && player.L.zone == (2))
                 player.L.enemyHP = player.L.enemyHP.add(2)
            if (player.L.randomizer == (6) && player.L.zone == (2))
                 player.L.enemyHP = player.L.enemyHP.add(3)

if ((player.L.randomizer == (7) || player.L.randomizer == (2)) && player.L.zone == (2))
                 player.L.enemyHPMax = player.L.enemyHPMax.add(2)
            if (player.L.randomizer == (6) && player.L.zone == (2))
                 player.L.enemyHPMax = player.L.enemyHPMax.add(3)


        if ((player.L.randomizer == (7) || player.L.randomizer == (2)) && player.L.zone == (3))
                 player.L.enemyHP = player.L.enemyHP.add(3)
            if (player.L.randomizer == (6) && player.L.zone == (3))
                 player.L.enemyHP = player.L.enemyHP.add(5)

if ((player.L.randomizer == (7) || player.L.randomizer == (2)) && player.L.zone == (3))
                 player.L.enemyHPMax = player.L.enemyHPMax.add(3)
            if (player.L.randomizer == (6) && player.L.zone == (3))
                 player.L.enemyHPMax = player.L.enemyHPMax.add(5)

        if ((player.L.randomizer == (7) || player.L.randomizer == (2)) && player.L.zone == (4))
                 player.L.enemyHP = player.L.enemyHP.add(9)
            if (player.L.randomizer == (6) && player.L.zone == (4))
                 player.L.enemyHP = player.L.enemyHP.add(12)

if ((player.L.randomizer == (7) || player.L.randomizer == (2)) && player.L.zone == (4))
                 player.L.enemyHPMax = player.L.enemyHPMax.add(9)
            if (player.L.randomizer == (6) && player.L.zone == (4))
                 player.L.enemyHPMax = player.L.enemyHPMax.add(12)

if ((player.L.randomizer == (7) || player.L.randomizer == (2)) && player.L.zone == (5))
                 player.L.enemyHP = player.L.enemyHP.add(137)
            if (player.L.randomizer == (6) && player.L.zone == (5))
                 player.L.enemyHP = player.L.enemyHP.add(175)

if ((player.L.randomizer == (7) || player.L.randomizer == (2)) && player.L.zone == (5))
                 player.L.enemyHPMax = player.L.enemyHPMax.add(137)
            if (player.L.randomizer == (6) && player.L.zone == (5))
                 player.L.enemyHPMax = player.L.enemyHPMax.add(175)

                 if ((player.L.randomizer == (7) || player.L.randomizer == (6)) && player.L.zone == (6))
                 player.L.enemyHP = player.L.enemyHP.add(470)
                 if ((player.L.randomizer == (7) || player.L.randomizer == (6)) && player.L.zone == (6))
                 player.L.enemyHPMax = player.L.enemyHPMax.add(470)

            if (player.L.level < 12)
                 player.L.health = player.L.health.add(2)
            if ((player.L.level < 18) && player.L.zone == 3)
                 player.L.health = player.L.health.add(5)
            if ((player.L.level < 26) && player.L.zone == 4)
                 player.L.health = player.L.health.add(7)
            if ((player.L.level < 30) && player.L.zone == 5)
                 player.L.health = player.L.health.add(15)
            if ((player.L.level < 37) && player.L.zone == 6)
                 player.L.health = player.L.health.add(43)

        player.points = player.points.minus(2.5)
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
    if ((player.L.randomizer == (7) || player.L.randomizer == (2) || player.L.randomizer == (6)) && player.points > 2.49) click = true
    if (player.L.health <= (0)) click = false
return click},
            onClick() {
            player.L.randomizer = 0
                if (player.L.randomizer == (0)) player.L.enemyAttack = player.L.enemyAttack.minus(player.L.enemyAttack)
                if (player.L.randomizer == (0)) player.L.enemyHP = player.L.enemyHP.minus(player.L.enemyHP)
                if (player.L.randomizer == (0)) player.L.enemyHPMax = player.L.enemyHPMax.minus(player.L.enemyHPMax)
                if (player.L.randomizer == (0)) player.L.enemyDefense = player.L.enemyDefense.minus(player.L.enemyDefense)

                if ((player.L.enemyShieldMax <= (0)) || (player.L.randomizer == (0))) player.L.enemyShieldMax = player.L.enemyShieldMax.minus(player.L.enemyShieldMax)
                if ((player.L.enemyShield <= (0)) || (player.L.randomizer == (0))) player.L.enemyShield = player.L.enemyShield.minus(player.L.enemyShield)

        player.points = player.points.minus(2.5)
            },
            style() {return{
                'background-color': player.L.specthree,
            }},
        },
     },
})



// TODO
// Add Crit Chance Past Zone 4
// Improve the Level cap to 25
// Add Block Chance Past Zone 5