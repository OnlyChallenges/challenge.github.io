addLayer("c", {
    name: "Crystals", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "C", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#FC5BDC",
    requires: new Decimal(20), // Can be a function that takes requirement increases into account
    resource: "crystals", // Name of prestige currency
    baseResource: "infects", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1, // Prestige currency exponent
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
            return player[this.layer].points.add(1).pow(0.2)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
	12: {
	title: "20 rockets are not",
        description: "Rocket Power boost your distance gain.",
        cost: new Decimal(20),
        effect() {
            return player[this.layer].points.add(1).pow(0.6)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, 12))+"x" }, // Add formatting to the effect
        },
	13: {
	title: "Half Life 3 Confirmed",
        description: "Rocket Power boost your distance gain.",
        cost: new Decimal(300),
        effect() {
            return player[this.layer].points.add(1).pow(0.7)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
	14: {
        title: "Booster",
	description: "x10 more distance",
	cost: new Decimal(1000),
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