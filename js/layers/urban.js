addLayer("u", {
    name: "urban", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "U", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
                points: new Decimal(0),
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
    layerShown(){return hasAchievement('A', 18)},
    tabFormat: ["main-display", "prestige-button",["display-text", function(){return "[Point Gain: ("+ format(tmp.pointGen)+"/s)]<br>" + "You have "+ format(player.d.points) +" dust<br>" + "You have "+ format(player.p.points) +" prestige points" },{}],"blank","challenges"],
    challengeLook(){let look = new Decimal(0)
        return look
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
            name: "Challenging Growth",
            challengeDescription(){return "^0.2 Point Gain, with that, times Prestige Points based on challenges completed (Boost Effect: "+format(new Decimal.pow(1.25, tmp.u.challengeSafe).max(1))+"x)"},
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
    },
})