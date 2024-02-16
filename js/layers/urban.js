addLayer("u", {
    name: "urban", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "U", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
                points: new Decimal(0),
                population: new Decimal(10000000),
                infected: new Decimal(10000000),
    }},
    color: "#eb3474",
    requires(){ 
        let req = new Decimal(250)
        return req
},


    resource: "urban", // Name of prestige currency
    baseResource: "dust", // Name of resource prestige is based on
    baseAmount() {return player.d.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.6, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "u", description: "U: Reset for urban", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    challengeSafe(){let look = new Decimal(0)
        if (hasChallenge('p', 11)) look = look.add(1)
        if (hasChallenge('p', 12)) look = look.add(1)
        if (hasChallenge('p', 13)) look = look.add(1)
        if (hasChallenge('p', 14)) look = look.add(1)
        if (hasChallenge('p', 15)) look = look.add(1)
        if (hasChallenge('p', 16)) look = look.add(1)
        if (hasChallenge('p', 17)) look = look.add(1)
        if (hasChallenge('p', 18)) look = look.add(1)
        if (hasChallenge('p', 19)) look = look.add(1)
        if (hasChallenge('d', 11)) look = look.add(1)
        if (hasChallenge('d', 12)) look = look.add(1)
        if (hasChallenge('d', 13)) look = look.add(1)
        if (hasChallenge('d', 14)) look = look.add(1)
        if (hasChallenge('d', 15)) look = look.add(1)
        if (hasChallenge('d', 16)) look = look.add(1)
        if (hasChallenge('d', 17)) look = look.add(1)
        if (hasChallenge('d', 18)) look = look.add(1)
        if (hasChallenge('d', 19)) look = look.add(1)
        return look
},
    popDia(){let dia = new Decimal(0)},
    layerShown(){return hasAchievement('A', 18)},
    tabFormat: ["main-display", "prestige-button",
    ["display-text", function(){return "[Point Gain: ("+ format(tmp.pointGen)+"/s)]<br>" + "You have "+ format(player.d.points) +" dust<br>" + "You have "+ format(player.p.points) +" prestige points" },{}],
    ["display-text", function(){if (player.u.population.lte(100) && inChallenge('u', 14)) return "<red>WARNING: Your Population is under 100!"},{}],
    ["display-text", function(){if (player.u.population.lte(1) && inChallenge('u', 14)) return "<logic>Your Population is too low! Restart the challenge...Or can you complete it?</logic>"},{}],
    "blank","challenges"],
    challengeLook(){let look = new Decimal(0)
        return look
},
    update(diff){
        if (inChallenge('u', 14))
        player.u.population = player.u.population.div(1.0127)
        if (inChallenge('u', 15))
        player.u.population = player.u.population.times(1.0283)
        if (inChallenge('u', 16))
        ((player.u.infected = player.u.infected.add(player.u.infected.pow(0.17))) && (player.u.population = player.u.population.minus(player.u.infected)))
    },
    challenges: {
        11: {
            name: "Overpopulation",
            challengeDescription: 
            `^1.5 Point Gain`,
            canComplete: function() {return player.d.points.gte(250)},
            goalDescription: "250 Dust",
            rewardDescription: "50x Point Gain",
            unlocked(){
                let unlock = (player.u.unlocked || inChallenge('u', 11) || hasChallenge('u', 11))
                return unlock
            },
        },
        12: {
            name: "Challenging Growth",
            challengeDescription(){return "Boosts Point gain based on how many challenges you have before Urban Challenges<br> (Boost Effect: "+format(new Decimal.pow(2.77, tmp.u.challengeSafe).max(1))+"x)"},
            canComplete: function() {return player.points.gte(1e35)},
            goalDescription: "1e35 Points",
            rewardEffect() { return (new Decimal.pow(1.5, tmp.u.challengeSafe).max(1))},
            rewardDescription(){return "Every Completed Challenge boosts point gain"},
            rewardDisplay(){return format(challengeEffect('u', 12))+"x"},
            unlocked(){
                let unlock = (hasChallenge('u', 11) || inChallenge('u', 12) || hasChallenge('u', 12))
                return unlock
            },
        },
        13: {
            name: "Urbanizing Difference",
            challengeDescription(){return "^0.7 Point Gain, with that, times Prestige Points based on challenges completed (Boost Effect: "+format(new Decimal.pow(1.77, tmp.u.challengeSafe).max(1))+"x)"},
            canComplete: function() {return player.d.points.gte(1000)},
            goalDescription: "1000 Dust",
            rewardEffect() { return (new Decimal.pow(1.2, tmp.u.challengeSafe).max(1))},
            rewardDescription(){return "Every Completed Challenge boosts prestige point gain"},
            rewardDisplay(){return format(challengeEffect('u', 13))+"x"},
            unlocked(){
                let unlock = (hasChallenge('u', 12) || inChallenge('u', 13) || hasChallenge('u', 13))
                return unlock
            },
        },
        14: {
            name: "Virus Spread",
            challengeDescription(){return "The Population is dropping! Can you finish the challenge before it drops to 1?<br> Population Boosts Point Gain<br> (Population Boost: " + format(player.u.population)+"x)" },
            canComplete: function() {return hasChallenge('d', 19)},
            goalDescription: "Complete Dust Challenge 9",
            rewardEffect() { return (player.u.points.pow(0.2).max(1))},
            onEnter(){return player.u.population = new Decimal(10000000)},
            onExit(){return player.u.population = new Decimal(1)},
            rewardDescription(){return "Urban boosts points slightly"},
            rewardDisplay(){return format(challengeEffect('u', 14))+"x"},
            unlocked(){
                let unlock = (hasChallenge('u', 13) || inChallenge('u', 14) || hasChallenge('u', 14))
                return unlock
            },
        },
        15: {
            name: "Populative Explosion",
            challengeDescription(){return "The Population is exploding! Don't let it inflate as it decreases your point gain overtime!<br> Population nerfs Point Gain<br> (Population Nerf: /" + format(player.u.population.pow(0.5))+")" },
            canComplete: function() {return player.d.points.gte(1)},
            goalDescription: "1 Dust",
            rewardEffect() { return (player.points.pow(0.04).max(1))},
            onEnter(){return player.u.population = new Decimal(1.1)},
            onExit(){return player.u.population = new Decimal(1)},
            rewardDescription(){return "Points boosts itself"},
            rewardDisplay(){return format(challengeEffect('u', 15))+"x"},
            unlocked(){
                let unlock = (hasChallenge('u', 14) || inChallenge('u', 15) || hasChallenge('u', 15))
                return unlock
            },
        },
        16: {
            name: "Infectious Attacks",
            challengeDescription(){return "Infects grows more and more... towards a point where it's impossible to beat the challenge <br>(Population Boost: " + format(player.u.population)+"x)<br> (Infected Nerf: /" + format(player.u.infected) + ")" },
            canComplete: function() {return hasChallenge('d', 19)},
            goalDescription: "Complete the 9th Dust Challenge",
            rewardEffect() { return (player.p.points.pow(0.1).max(1))},
            onEnter(){return ((player.u.population = new Decimal(1000000)) && (player.u.infected = new Decimal(1)))},
            onExit(){return ((player.u.population = new Decimal(1)) && (player.u.infected = new Decimal(1)))},
            rewardDescription(){return "Prestige Points boosts Dust Gain slightly"},
            rewardDisplay(){return format(challengeEffect('u', 16))+"x"},
            unlocked(){
                let unlock = (hasChallenge('u', 15) || inChallenge('u', 16) || hasChallenge('u', 16))
                return unlock
            },
        },
    },
})