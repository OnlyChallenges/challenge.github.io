addLayer("r", {
    name: "Rocket Power", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "R", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#FDFDFD",
    requires: new Decimal(20), // Can be a function that takes requirement increases into account
    resource: "rocket power", // Name of prestige currency
    baseResource: "meters traveled", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
 upgrades: {
        11: {
        title: "You Gotta Start Somewhere",
        description: "Rocket Power boost your distance gain.",
        cost: new Decimal(1),
        effect() {
            return player[this.layer].points.add(1).pow(0.5)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
	12: {
	title: "20 Rockets are not",
	description: "Rocket Power boost your distance gain.",
	cost: new Decimal(20)
	effect() {
	    return player[this.layer].points.add(1).pow(0.7)
	effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
	},
	13: {
	title: "Half Life 3 Confirmed",
	description: "Rocket Power boost your distance gain.",
	cost: new Decimal(300)
	effect() {
	    return player[this.layer].points.add(1).pow(0.8)
	effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
	},
    },
})
