addLayer("p", {
    name: "prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#4BDC13",
    requires(){ 
        let req = new Decimal(10)
        if (inChallenge('d', 11)) req = req.times(50)
        if (inChallenge('d', 12)) req = req.times(5)
        if (inChallenge('d', 13)) req = req.times(player.points.pow(0.7).add(1))
        if (inChallenge('d', 16)) req = req.times(player.p.points.pow(0.1).add(1))
        if (inChallenge('d', 18)) req = req.times((player.p.challenges.length).pow(0.8).add(1))
        return req
}, 


    resource: "prestige points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.25, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasAchievement('A', 13)) mult = mult.times(3)
        if (hasChallenge('p', 18)) mult = mult.times(challengeEffect('p', 18))
        if (hasChallenge('d', 12)) mult = mult.times(3)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    passiveGeneration(){
        let passive = new Decimal(0)
        if (inChallenge('d', 16)) passive = passive.minus(0.3)
        return passive
    },
    branches: ["d"],
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    tabFormat: ["main-display", "prestige-button",["display-text", function(){return "You have "+ format(player.points) +" points ("+ format(tmp.pointGen)+"/s)"},{}],"blank","challenges"],
    challenges: {
        11: {
            name: "The Beginning",
            challengeDescription: 
            `Point Gain is nerf'd by 0.5`,
            canComplete: function() {return player.points.gte(10)},
            goalDescription: "10 Points",
            rewardDescription: "+1 Point Gain",
            unlocked(){
                let unlock = (player.p.unlocked || inChallenge('p', 11) || hasChallenge('p', 11))
                return unlock
            },
        },
        12: {
            name: "Still the beginning",
            challengeDescription: 
            `Point Gain is nerf'd by 1.4`,
            canComplete: function() {return player.points.gte(20)},
            goalDescription: "20 Points",
            rewardDescription: "+3 Point Gain",
            unlocked(){
                let unlock = (hasChallenge('p',11)|| inChallenge('p', 12) || hasChallenge('p', 12) || inChallenge('d', 18))
                return unlock
            },
        },
        13: {
            name: "A little different",
            challengeDescription: 
            `/1.2 Point Gain`,
            canComplete: function() {return player.points.gte(70)},
            goalDescription: "70 Points",
            rewardDescription: "+7 Point Gain",
            unlocked(){
                let unlock = (hasChallenge('p',12)|| inChallenge('p', 13) || hasChallenge('p', 13) || inChallenge('d', 18))
                return unlock
            },
        },
        14: {
            name: "Harsh Nerf",
            challengeDescription: 
            `/1.7 Point Gain`,
            canComplete: function() {return player.points.gte(130)},
            goalDescription: "130 Points",
            rewardDescription: "x2 Point Gain",
            unlocked(){
                let unlock = (hasChallenge('p',13)|| inChallenge('p', 14) || hasChallenge('p', 14) || inChallenge('d', 18))
                return unlock
            },
        },
        15: {
            name: "Challenging Approach",
            challengeDescription: 
            `Log point gain`,
            canComplete: function() {return player.points.gte(50)},
            goalDescription: "50 Points",
            rewardEffect() { return (player.p.points.pow(0.25).add(1))},
            rewardDescription(){ return "Points are boosted by Prestige Points"},
            rewardDisplay(){return format(challengeEffect('p', 15))+"x"},
            unlocked(){
                let unlock = (hasChallenge('p',14)|| inChallenge('p', 15) || hasChallenge('p', 15) || inChallenge('d', 18))
                return unlock
            },
        },
16: {
            name: "Logful Approach",
            challengeDescription: 
            `Triple log point gain`,
            canComplete: function() {return player.points.gte(0.2)},
            goalDescription: "0.2 Point(s)",
            rewardEffect() { return (player.p.points.pow(0.17).add(1))},
            rewardDescription(){ return "Points are boosted by Prestige Points again"},
            rewardDisplay(){return format(challengeEffect('p', 16))+"x"},
            unlocked(){
                let unlock = (hasChallenge('p',15)|| inChallenge('p', 16) || hasChallenge('p', 16) || inChallenge('d', 18))
                return unlock
            },
        },
17: {
            name: "Powering Defense",
            challengeDescription: 
            `^0.25 point gain`,
            canComplete: function() {return player.points.gte(50)},
            goalDescription: "50 Point(s)",
            rewardEffect() { return (player.points.pow(0.18).add(1))},
            rewardDescription(){ return "Points boosts itself"},
            rewardDisplay(){return format(challengeEffect('p', 17))+"x"},
            unlocked(){
                let unlock = (hasChallenge('p',16)|| inChallenge('p', 17) || hasChallenge('p', 17) || inChallenge('d', 18))
                return unlock
            },
        },
18: {
            name: "Logful Defense",
            challengeDescription(){
            return "^0.5 point gain, overtime; points will be nerf'd by an effect<br> Nerf Effect: /" + format(player.points.log10().add(1))},
            canComplete: function() {return player.points.gte(300)},
            goalDescription: "300 Points",
            rewardEffect() { return (player.p.points.pow(0.18).add(1))},
            rewardDescription(){ return "Prestige Points boosts itself"},
            rewardDisplay(){return format(challengeEffect('p', 18))+"x"},
            unlocked(){
                let unlock = (hasChallenge('p',17)|| inChallenge('p', 18) || hasChallenge('p', 18) || inChallenge('d', 18))
                return unlock
            },
        },
19: {
            name: "Nerfic Effects",
            challengeDescription(){
            return "^0.1 point gain, overtime; points will be nerf'd by an effect; with that log point gain <br> (Nerf Effect: /" + format(player.points.log10().add(3)) + ")"},
            canComplete: function() {return player.points.gte(7)},
            goalDescription: "7 Points",
            rewardEffect() { return (player.points.pow(0.13).add(1))},
            rewardDescription(){ return "Points boosts itself again"},
            rewardDisplay(){return format(challengeEffect('p', 19))+"x"},
            unlocked(){
                let unlock = (hasChallenge('p',18)|| inChallenge('p', 19) || hasChallenge('p', 19) || inChallenge('d', 18))
                return unlock
            },
        },
    },
})
