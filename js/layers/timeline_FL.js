addLayer("FL", {
    name: "Floors", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "FL", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
        best: new Decimal(0),
    }},
    color(){ 
        let color = `#9c422a`
        return color
    },
    requires(){ 
        let requirement = new Decimal(150);
        if (inChallenge('CT', 12)) requirement = new Decimal(75);
        if (hasUpgrade('FL', 23)) requirement = requirement.div(upgradeEffect('FL', 23))
        return requirement
    },// Can be a function that takes requirement increases into account
    resource: "Floors", // Name of prestige currency
    baseResource: "infects", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.8, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('FL', 11)) mult = mult.times(upgradeEffect('FL', 11))
        if (hasUpgrade('FL', 13)) mult = mult.times(upgradeEffect('FL', 13))
        if (hasUpgrade('FL', 14)) mult = mult.times(upgradeEffect('FL', 14))
        if (hasUpgrade('EX', 14)) mult = mult.times(upgradeEffect('EX', 14))
        if (hasUpgrade('EX', 15)) mult = mult.times(upgradeEffect('EX', 15))
        if (hasChallenge('CT', 11)) mult = mult.times(3)
        if (inChallenge('CT', 12)) mult = mult.times(3)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        let exp = new Decimal(1)
        if (hasUpgrade('FL', 24)) exp = exp.add(.3)
        return exp
    },
    doReset(resettingLayer) {
        if (layers[resettingLayer].row > this.row) layerDataReset(this.layer)
        if (inChallenge('CT', 11)) player.EX.milestones.push('11')
        if (inChallenge('CT', 12)) player.EX.milestones.push('11')
        if (inChallenge('CT', 12)) player.FL.milestones.push('11')
    },
    passiveGeneration() {
        let value1 = new Decimal(0);
        return value1
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "l", description: "l: reset for Floors", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown() {
        let value = false
        if (player.CT.unlocked) value = true
        return value
    },
    milestones: {
        11: {
            requirementDescription: "1e11 Floors",
            effectDescription(){ 
                let des
                des = `Are we at Pluto yet...`
                if (player.FL.points.gte(1e11)) des = "Unlock another Collapsed Challenge & infects boosts itself (" + format(player.points.add(1).pow(0.07)) + "x)"
                return des
            },
            done() { return player.FL.points.gte(1e11) || hasMilestone('FL', 11)},
            unlocked(){ return hasUpgrade('EX', 15)}
        },
    },
    upgrades: {
        rows: 3,
        cols: 4,
        11: {
            title: "1st Floor",
            description: "Floors boosts Floors (Cap is 300x)",
            cost: new Decimal(1),
            effect() {
                let effect1 = (player.FL.points.max(1).add(1.22).pow(0.15)).max(1).min(300);
                if (inChallenge('CT', 11)) effect1 = (player.FL.points.max(1).add(1.66).pow(0.26)).max(1).min(300);
                return effect1
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked(){
                return player.FL.points.gte(0)
            },
        },
        12: {
            title: "7th Floor",
            description: "Floors boosts Infects (Cap is 800x)",
            cost: new Decimal(7),
            effect() {
                let effect1 = (player.FL.points.max(1).add(1).pow(0.19)).max(1).min(800);
                if (inChallenge('CT', 11)) effect1 = (player.FL.points.max(1).add(1.2).pow(0.26)).max(1).min(800);
                return effect1
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked(){
                return hasUpgrade('FL', 11)
            },
        },
        13: {
            title: "44th Floor",
            description: "Floors boosts Floors (Cap is 240x)",
            cost: new Decimal(44),
            effect() {
                let effect1 = (player.FL.points.max(1).add(1.8).pow(0.22)).max(1).min(240);
                if (inChallenge('CT', 11)) effect1 = (player.FL.points.max(1).add(1.9).pow(0.23)).max(1).min(240);
                return effect1
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked(){
                return hasUpgrade('FL', 12)
            },
        },
        14: {
            title: "295th Floor",
            description: "Infects boosts Floors (Cap is 1930x) & Unlock a new Layer (Explosives)",
            cost: new Decimal(295),
            effect() {
                return (player.points.max(1).add(1.2).pow(0.06)).max(1).min(1930);
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked(){
                return hasUpgrade('FL', 13)
            },
        },
        21: {
            title: "50,000th Floor",
            description: "Floors boosts Infects & Explosives (Cap is 95x)",
            cost: new Decimal(50000),
            effect() {
                return (player.FL.points.max(1).add(1.3).pow(0.075)).max(1).min(95);
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked(){
                return hasUpgrade('FL', 14) && hasChallenge('CT', 11)
            },
        },
        22: {
            title: "650,000th Floor",
            description: "Divided Explosive Requirement based on Infects (Cap is /39)",
            cost: new Decimal(650000),
            effect() {
                return (player.points.max(1).add(1.1).pow(0.0555)).max(1).min(39);
            },
            effectDisplay() { return "/"+format(upgradeEffect(this.layer, this.id)) },
            unlocked(){
                return hasUpgrade('FL', 21)
            },
        },
        23: {
            title: "1,500,000,000th Floor",
            description: "Divide Floor Requirement based on Explosives (Cap is /15)",
            cost: new Decimal(1500000000),
            effect() {
                return (player.EX.points.max(1).add(1.1).pow(0.02)).max(1).min(15);
            },
            effectDisplay() { return "/"+format(upgradeEffect(this.layer, this.id)) },
            unlocked(){
                return hasUpgrade('FL', 22)
            },
        },
        24: {
            title: `9,500,000,000,<br>000,000,000th Floor`,
            description: "Add a base of .3 to Floor Gain",
            cost: new Decimal(9.5e18),
            unlocked(){
                return hasUpgrade('FL', 23)
            },
        },
    },
})