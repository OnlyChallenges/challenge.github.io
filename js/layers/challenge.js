addLayer("p", {
    name: "prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#4BDC13",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "prestige points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    tabFormat: ["main-display", "prestige-button",["display-text", function(){return "You have "+ format(player.points) +"("+ format(player.getPointGen)+"/s)"},{}],"blank","challenges"],
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
                let unlock = (hasChallenge('p',11)|| inChallenge('p', 12) || hasChallenge('p', 12))
                return unlock
            },
        },
        13: {
            name: "A little different",
            challengeDescription: 
            `/0.8 Point Gain`,
            canComplete: function() {return player.points.gte(70)},
            goalDescription: "70 Points",
            rewardDescription: "+7 Point Gain",
            unlocked(){
                let unlock = (hasChallenge('p',12)|| inChallenge('p', 13) || hasChallenge('p', 13))
                return unlock
            },
        },
    },
})
