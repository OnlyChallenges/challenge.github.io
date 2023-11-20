addLayer("EX", {
    name: "Explosives", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "EX", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
        best: new Decimal(0),
    }},
    color(){ 
        let color = `#7dee99`
        return color
    },
    requires(){ 
        let requirement = new Decimal(6000);
        if (inChallenge('CT', 11)) requirement = new Decimal(1500);
        if (inChallenge('CT', 12)) requirement = requirement.times(1.5)
        if (hasUpgrade('FL', 22)) requirement = requirement.div(upgradeEffect('FL', 22))
        return requirement
    },
    resource: "Explosives", // Name of prestige currency
    baseResource: "infects", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.75, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('EX', 13)) mult = mult.times(upgradeEffect('EX', 13))
        if (hasUpgrade('FL', 21)) mult = mult.times(upgradeEffect('FL', 21))
        if (hasUpgrade('EX', 15)) mult = mult.times(upgradeEffect('EX', 15))
        if (hasChallenge('CT', 12)) mult = mult.times(player.points.add(1).pow(0.05))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    doReset(resettingLayer) {
        if (layers[resettingLayer].row > this.row) layerDataReset(this.layer)
    },
    passiveGeneration() {
        let value1 = new Decimal(0);
        return value1
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "x", description: "x: reset for Explosives", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown() {
        let value = false
        if (hasUpgrade('FL', 14) || inChallenge('CT', 11)) value = true
        return value
    },
milestones: {
        11: {
            requirementDescription: "3 Explosives",
            effectDescription(){ 
                let des
                des = `Explode, Explode, Explode!`
                if (player.EX.points.gte(3) || hasMilestone('EX', 11)) des = `Unlock a...Collapsed Timeline Challenge...?`
                return des
            },
            done() { return player.EX.points.gte(3) || hasMilestone('EX', 11)},
        },
    },
upgrades: {
        rows: 2,
        cols: 5,
        11: {
            title: "Minor Explosive I",
            description: "Explosives boosts Infects (Cap is 4950x)",
            cost: new Decimal(1),
            effect() {
                return (player.EX.points.max(1).add(1.5).pow(0.2)).max(1).min(4950);
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked(){
                return player.FL.points.gte(0)
            },
        },
        12: {
            title: "Minor Explosive II",
            description: "Infects boosts itself (Cap is 2000x)",
            cost: new Decimal(1),
            effect() {
                return (player.points.max(1).add(1.5).pow(0.14)).max(1).min(2000);
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked(){
                return hasUpgrade('EX', 11)
            },
        },
        13: {
            title: "Minor Explosive III",
            description: "Infects boosts Explosives (Cap is 60x)",
            cost: new Decimal(1),
            effect() {
                return (player.points.max(1).add(1.3).pow(0.09)).max(1).min(60);
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked(){
                return hasUpgrade('EX', 12)
            },
        },
        14: {
            title: "Minor Explosive IV",
            description: "Explosives boosts Floors (Cap is 25x)",
            cost: new Decimal(1750),
            effect() {
                return (player.EX.points.max(1).add(1.1).pow(0.13)).max(1).min(25);
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked(){
                return hasUpgrade('EX', 13) & hasUpgrade('FL', 22)
            },
        },
        15: {
            title: "Minor Explosive V",
            description: "Infects boosts Floors & Explosives (Cap is 300x)...Unlock a Floor Milestone...",
            cost: new Decimal(65000),
            effect() {
                return (player.points.max(1).add(1).pow(0.1)).max(1).min(300);
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked(){
                return hasUpgrade('EX', 14) & hasUpgrade('FL', 23)
            },
        },
        21: {
            title: "Semi-Major Explosive I",
            description: "Explosives boosts Floors & Infects (Cap is 60x)",
            cost: new Decimal(1e9),
            effect() {
                return (player.EX.points.max(1).add(1.1).pow(0.12)).max(1).min(60);
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked(){
                return hasUpgrade('EX', 15) & hasChallenge('CT', 12)
            },
        },
        22: {
            title: "Semi-Major Explosive II",
            description: "Increase Floor gain (hover)",
            tooltip: "log(sin(infects))+2",
            cost: new Decimal(1.33e11),
            effect() {
                return (player.points.max(1).log10().add(2).sin()).max(1).min(5);
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked(){
                return hasUpgrade('EX', 21)
            },
        },
    },
})