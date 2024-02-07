addLayer("d", {
    name: "dust", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "D", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
                points: new Decimal(0),
    }},
    color: "#ACDC63",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "dust", // Name of prestige currency
    baseResource: "prestige points", // Name of resource prestige is based on
    baseAmount() {return player.p.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.25, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "d", description: "D: Reset for dust", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return hasAchievement('A', 14)},
    tabFormat: ["main-display", "prestige-button",["display-text", function(){return "You have "+ format(player.p.points) +" prestige points (Point Gain: ("+ format(tmp.pointGen)+"/s)"},{}],"blank","challenges"],
    challenges: {
        11: {
            name: "Dusty Adventist",
            challengeDescription: 
            `x50 Prestige Point Requirement`,
            canComplete: function() {return player.p.points.gte(5)},
            goalDescription: "5 Prestige Points",
            rewardDescription: "^1.1 Point Gain",
            unlocked(){
                let unlock = (player.d.unlocked || inChallenge('d', 11) || hasChallenge('d', 11))
                return unlock
            },
        },
    },
})