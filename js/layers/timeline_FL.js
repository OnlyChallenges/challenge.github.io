addLayer("FL", {
    name: "Floors", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "FL", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
        best: new Decimal(0),
    }},
    color: "#9c422a",
    requires: new Decimal(200), // Can be a function that takes requirement increases into account
    resource: "Floors", // Name of prestige currency
    baseResource: "infects", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.8, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('FL', 11)) mult = mult.times(upgradeEffect('FL', 11))
        if (hasUpgrade('FL', 13)) mult = mult.times(upgradeEffect('FL', 13))
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
        {key: "l", description: "l: reset for Floors", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown() {
        let value = false
        if (player.CT.unlocked) value = true
        return value
    },
    upgrades: {
        rows: 3,
        cols: 4,
        11: {
            title: "1st Floor",
            description: "Floors boosts Floors (Cap is 300x)",
            cost: new Decimal(1),
            effect() {
                return (player.FL.points.max(1).add(1.22).pow(0.15)).max(1).min(300);
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
                return (player.FL.points.max(1).add(1).pow(0.13)).max(1).min(800);
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
                return (player.FL.points.max(1).add(1.8).pow(0.22)).max(1).min(240);
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
                return (player.points.max(1).add(1).pow(0.02)).max(1).min(1930);
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked(){
                return hasUpgrade('FL', 13)
            },
        },
    },
})