addLayer("d", {
    name: "dust", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "D", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
                points: new Decimal(0),
    }},
    color: "#ACDC63",
    requires: new Decimal(500), // Can be a function that takes requirement increases into account
    resource: "dust", // Name of prestige currency
    baseResource: "prestige points", // Name of resource prestige is based on
    baseAmount() {return player.p.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.25, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasAchievement('A', 16)) mult = mult.add(2)
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
    tabFormat: ["main-display", "prestige-button",["display-text", function(){return "You have "+ format(player.p.points) +" prestige points [Point Gain: ("+ format(tmp.pointGen)+"/s)]"},{}],"blank","challenges"],
    challenges: {
        11: {
            name: "Dusty Adventist",
            challengeDescription: 
            `50x Prestige Point Requirement`,
            canComplete: function() {return player.p.points.gte(1000)},
            goalDescription: "1000 Prestige Points",
            rewardDescription: "^1.1 Point Gain",
            unlocked(){
                let unlock = (player.d.unlocked || inChallenge('d', 11) || hasChallenge('d', 11))
                return unlock
            },
        },
        12: {
            name: "Dust Logs",
            challengeDescription: 
            `/3 Point gain & 5x Prestige Points Requirement`,
            canComplete: function() {return player.p.points.gte(100)},
            goalDescription: "100 Prestige Points",
            rewardDescription: "3x Prestige Point Gain",
            unlocked(){
                let unlock = (hasChallenge('d', 11) || inChallenge('d', 12) || hasChallenge('d', 12))
                return unlock
            },
        },
        13: {
            name: "False Dust",
            challengeDescription(){
            return "Points boost Prestige Point Requirement, Can you catch up?<br>(Nerf Effect: " + format(player.points.pow(0.7))+ "x)"},
            canComplete: function() {return player.p.points.gte(1)},
            goalDescription: "1 Prestige Points",
            rewardDescription: "3x Point Gain",
            unlocked(){
                let unlock = (hasChallenge('d', 12) || inChallenge('d', 13) || hasChallenge('d', 13))
                return unlock
            },
        },
        14: {
            name: "Confined Dust",
            challengeDescription(){
            return "Points are nerf'd by Prestige Points. <br>(Nerf Effect: /" + format(player.p.points.pow(0.8).add(1))+ ")"},
            canComplete: function() {return player.p.points.gte(50)},
            goalDescription: "50 Prestige Points",
            rewardEffect() { return (player.d.points.pow(0.3).add(1))},
            rewardDescription(){ return "Points are boosted by Dust"},
            rewardDisplay(){return format(challengeEffect('d', 14))+"x"},
            unlocked(){
                let unlock = (hasChallenge('d', 13) || inChallenge('d', 14) || hasChallenge('d', 14))
                return unlock
            },
        },
    },
})