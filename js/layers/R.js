addLayer("R", {
    name: "Rooms", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "R", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
        best: new Decimal(0),
    }},
    color: "#c27ea6",
    requires: new Decimal(1e30), // Can be a function that takes requirement increases into account
    resource: "rooms", // Name of prestige currency
    baseResource: "experiments", // Name of resource prestige is based on
    baseAmount() {return player.E.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.1, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    effect() {
        let eff3 = player.R.points.add(1).pow(1.25)
        eff3 = eff3.times(tmp.R.effectBase)
        return eff3
    },
    effectBase() {
        let base = new Decimal(1) 
        return base
    },
    effectDescription() {
        dis = "which boosts Infects, Experiments, and Crystal gain by "+ format(tmp.R.effect) +"x"
        return dis
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "r", description: "r: reset for Humans", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    infoboxes: {
        lore1: {
            title: "Rooms",
            body() {
            let text 
            text = 
            `Welcome to Rooms! This is the layer that will release the v1.0_test of the game!`
            return text
            },
        },
    },
    layerShown() {return true},
    layerShown() {
        return hasUpgrade("H", 22) || player.R.points.gte(1) || player.R.unlocked;
    },
})