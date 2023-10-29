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
    exponent: 0.65, // Prestige currency exponent
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
    rows: 3,
    cols: 5,
    11: {
    title: "Touching Crystals",
        description: "Crystals boosts infects slightly",
        cost: new Decimal(1),
        effect() {
            return player[this.layer].points.add(1.2).pow(0.15)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        unlocked(){
            return player.c.points.gte(0)
        },
	12: {
	title: "Submerge the Crystals",
        description: "Crystals boosts infects",
        cost: new Decimal(5),
        effect() {
            return player[this.layer].points.add(1.5).pow(0.14)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, 12))+"x" }, // Add formatting to the effect
        },
        unlocked(){
            return hasUpgrade("c", 11)
        },
	13: {
	title: "Reformation",
        description: "Crystals boosts infects",
        cost: new Decimal(15),
        effect() {
            return player[this.layer].points.add(1.2).pow(0.17)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        unlocked(){
            return hasUpgrade("c", 12)
        },
	14: {
        title: "Crystalization",
	description: "Crystals made Experiments more mad, Infects are 3x faster",
	cost: new Decimal(50),
    unlocked(){
        return hasUpgrade("c", 13)
    },
    },
    15: {
        title: "Experimental Changes",
    description: "Experiments are now stronger, Infects are 4.5x faster",
    cost: new Decimal(250),
    unlocked(){
        return hasUpgrade("c", 14)
    },
    },
    21: {
        title: "Solarfrost",
        description: "Permafrost learned fire control, infects are 3.5x faster",
        cost: new Decimal(1250),
        unlocked(){
            return hasUpgrade("c", 15)
        },
    },
	22: {
        title: "Frosticality",
            description: "Permafrosting can lead to Frosticality-- infects are boosted based on crystals",
            cost: new Decimal(4400),
            effect() {
                return player[this.layer].points.add(1).pow(0.12)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            },
            unlocked(){
                return hasUpgrade("c", 21)
            },
	23: {
        title: "Bee-lusion",
            description: "There's Honey Crystals around the corner-- infects are increased",
            cost: new Decimal(12345),
            effect() {
                return player[this.layer].points.add(1).pow(0.11)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            },
            unlocked(){
                return hasUpgrade("c", 22)
            },
	24: {
        title: "Frozen Crystals",
            description: "The Crystals has frozen scientists in place-- infects are slightly increased",
            cost: new Decimal(75000),
            effect() {
                return player[this.layer].points.add(1).pow(0.08)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            },
            unlocked(){
                return hasUpgrade("c", 23)
            },
    25: {
        title: "Crystalized Dragons",
        description: "Influcational has occured on them, throwing crystals at others-- infects gain is 6.5x!",
        cost: new Decimal(250000),
        unlocked(){
            return hasUpgrade("c", 24)
        },
    },
    31: {
        title: "Crystalmania",
        description: "They're Everywhere! Infects Gain is 5x!",
        cost: new Decimal(1.25e7),
        unlocked(){
            return hasUpgrade("c", 25)
        },
    },
    32: {
        title: "Nyko's Transformation",
        description: "Nyko has gotten smarter...Crystals boosts Infects.",
        cost: new Decimal(2.5e10),
        effect() {
            return player[this.layer].points.add(1.5).pow(0.07)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        unlocked(){
            return hasUpgrade("E", 13)
        },
    },
 })
