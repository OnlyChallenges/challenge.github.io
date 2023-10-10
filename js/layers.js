addLayer("c", {
    name: "Crystals", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "C", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#FC5BDC",
    requires: new Decimal(5), // Can be a function that takes requirement increases into account
    resource: "crystals", // Name of prestige currency
    baseResource: "infects", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.62, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "c", description: "C: reset for Crystals", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
	infoboxes: {
        lore: {
            title: "Crystals",
            body: `Crystals hurt people which would infect them`,
        },
    },
 upgrades: {
        11: {
        title: "Touching Crystals",
        description: "Crystals boosts infects slightly",
        cost: new Decimal(1),
        effect() {
            return player[this.layer].points.add(1.2).pow(0.25)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
	12: {
	title: "Submerge the Crystals",
        description: "Crystals boosts infects",
        cost: new Decimal(5),
        effect() {
            return player[this.layer].points.add(1.5).pow(0.4)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, 12))+"x" }, // Add formatting to the effect
        },
	13: {
	title: "Reformation",
        description: "Crystals boosts infects",
        cost: new Decimal(15),
        effect() {
            return player[this.layer].points.add(1.2).pow(0.3)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
	14: {
        title: "Crystalization",
	description: "Crystals made Experiments more mad, Infects are 3x faster",
	cost: new Decimal(50),
    },
    15: {
        title: "Experimental Changes",
    description: "Experiments are now stronger, Infects are 1.5x faster",
    cost: new Decimal(250),
    },
    },
})
addLayer("a", {
        startData() { return {
            unlocked: true,
        }},
        color: "lime",
        row: "side",
        layerShown() {return true}, 
        tooltip() { // Optional, tooltip displays when the layer is locked
            return ("Accomplishments")
        },
        achievements: {
            rows: 1,
            cols: 4,
                11: {
                name: "Experiments",
                done() { return player.points.gte(100) },
                tooltip: "Infect 100 people",
            },
		12: {
                name: "Infected Crystals",
                done() { return player.c.points.gte(20) },
                tooltip: "Get 20 Crystals",
            },
		13: {
                name: "Hurtful Experiments",
                done() { return player.points.gte(20000) },
                tooltip: "Infect 20,000 people",
            },
		14: {
                name: "Crystals are Merging",
                done() { return player.c.points.gte(1000) },
                tooltip: "Get 1,000 Crystals",
            },
        },
        midsection: [
            "achievements",
        ]
    }, 
)