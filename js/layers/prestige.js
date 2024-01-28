addLayer("p", {
    name: "prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#2BDC13",
    requires(){ 
        let requirement = new Decimal(5)
        if (hasUpgrade('p', 12)) requirement = requirement.div(2.5)
        return requirement
    },
    resource: "prestige points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.3, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        let mult = new Decimal(1)
        if (player.bP.unlocked) mult = mult.times(tmp.bP.effect)
        if (hasUpgrade('bP', 11)) mult = mult.times(2)
        if (hasUpgrade('bP', 13)) mult = mult.times(10)
        if (hasMilestone('cP', 12)) mult = mult.times(3)
        if (hasMilestone('eP', 12)) mult = mult.times(10)
        if (hasUpgrade('fP', 14)) mult = mult.times(20)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    branches: ['bP', 'b'],
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    passiveGeneration(){
        let passive = new Decimal(0)
        if (hasMilestone('dP', 11)) passive = new Decimal(0.1)
        if (hasMilestone('eP', 11)) passive = new Decimal(1)
        if (hasMilestone('fP', 11)) passive = new Decimal(10)
        return passive
    },
    layerShown(){return true},
doReset(resettingLayer) {
        if (layers[resettingLayer].row > this.row) layerDataReset(this.layer)
        if (hasMilestone('cP', 11)) player.p.upgrades.push('11', '12', '13')
        if (hasMilestone('dP', 11)) player.p.upgrades.push('11', '12', '13')
        if (hasMilestone('dP', 11)) player.bP.upgrades.push('11', '12', '13')
        if (hasMilestone('dP', 11)) player.bP.milestones.push('11')
        if (hasMilestone('eP', 11)) player.p.upgrades.push('11', '12', '13')
        if (hasMilestone('eP', 11)) player.bP.upgrades.push('11', '12', '13')
        if (hasMilestone('eP', 11)) player.bP.milestones.push('11')
        if (hasMilestone('eP', 11)) player.cP.upgrades.push('11', '12', '13')
        if (hasMilestone('eP', 11)) player.cP.milestones.push('11', '12')
        if (hasMilestone('fP', 11)) player.p.upgrades.push('11', '12', '13')
        if (hasMilestone('fP', 11)) player.bP.upgrades.push('11', '12', '13')
        if (hasMilestone('fP', 11)) player.bP.milestones.push('11')
        if (hasMilestone('fP', 11)) player.cP.upgrades.push('11', '12', '13')
        if (hasMilestone('fP', 11)) player.cP.milestones.push('11', '12')
        if (hasMilestone('fP', 11)) player.dP.upgrades.push('11', '12', '13')
        if (hasMilestone('fP', 11)) player.dP.milestones.push('11', '12', '13')
},
    upgrades: {
        11: {
            title: "Modern",
            description: "Double point gain",
            cost: new Decimal(2),
        },
        12: {
            title: "Normality",
            description: "/2.5 Prestige Point requirement",
            cost: new Decimal(6),
            unlocked(){ return hasUpgrade('p', 11) },
        },
        13: {
            title: "Difference",
            description: "ten-fold point gain",
            cost: new Decimal(10),
            unlocked(){ return hasUpgrade('p', 12) },
        },
    },
})
