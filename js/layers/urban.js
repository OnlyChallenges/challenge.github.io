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
    layerShown(){return hasAchievement('A', 18)},
    tabFormat: ["main-display", "prestige-button",["display-text", function(){return "[Point Gain: ("+ format(tmp.pointGen)+"/s)]<br>" + "You have "+ format(player.d.points) +" dust<br" + "You have "+ format(player.p.points) +" prestige points" },{}],"blank","challenges"],
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
    },
})