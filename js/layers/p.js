addLayer("P", {
    name: "Powers", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#EBD638",
    requires: new Decimal(1e45), // Can be a function that takes requirement increases into account
    resource: "powers", // Name of prestige currency
    baseResource: "crystals", // Name of resource prestige is based on
    baseAmount() {return player["c"].points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.15, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    effect() {
        let eff = player.P.points.add(1).pow(0.5)
        return eff
    },
    effectDescription() {
        dis = "which boosts crystals gain by "+ format(tmp.E.effect) +"x"
        return dis
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "p: reset for powers", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
	infoboxes: {
        lore: {
            title: "Powers",
            body: `...`,
        },
    },
    layerShown() {
        return player.points.gte(1e25);
      },
 upgrades: {
    rows: 1,
    cols: 5,
 },
 })
