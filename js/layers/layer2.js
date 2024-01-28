addLayer("bP", {
    name: "buffed prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "bP", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#8ADC13",
    requires(){ 
        let requirement = new Decimal(10)
        if (hasUpgrade('bP', 12)) requirement = requirement.div(2.5)
        return requirement
    },
    resource: "buffed prestige points", // Name of prestige currency
    baseResource: "prestige points", // Name of resource prestige is based on
    baseAmount() {return player.p.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.2, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        let mult = new Decimal(1)
        if (player.cP.unlocked) mult = mult.times(tmp.cP.effect)
        if (hasUpgrade('cP', 11)) mult = mult.times(2)
        if (hasUpgrade('cP', 13)) mult = mult.times(10)
        if (hasMilestone('dP', 12)) mult = mult.times(3)
        if (hasMilestone('dP', 13)) mult = mult.times(2)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    effect(){
        let eff = (player.bP.points.add(1)).pow(0.22)
        return eff
    },
    effectDescription() {
        dis = "which boosts Prestige Point gain by "+format(tmp.bP.effect)+"x"
        return dis
    },
    passiveGeneration(){
        let passive = new Decimal(0)
        if (hasMilestone('eP', 11)) passive = new Decimal(0.1)
        if (hasMilestone('fP', 11)) passive = new Decimal(1)
        return passive
    },
    branches: ["cP","b"],
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "b", description: "b: Reset for buffed prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return hasUpgrade('p', 13) || player.bP.unlocked},
        milestones: {
        11: {
            requirementDescription: "5 Buff Prestige Points",
            effectDescription: `Triple Point Gain`,
            done() { return player.bP.points.gte(5) },
        },
    },
    upgrades: {
        11: {
            title: "Buff Modern",
            description: "Double Prestige point gain",
            cost: new Decimal(2),
        },
        12: {
            title: "Buff Normality",
            description: "/2.5 Buffed Prestige Point requirement",
            cost: new Decimal(6),
            unlocked(){ return hasUpgrade('bP', 11) },
        },
        13: {
            title: "Buff Difference",
            description: "ten-fold Prestige point gain",
            cost: new Decimal(10),
            unlocked(){ return hasUpgrade('bP', 12) },
        },
    },
})