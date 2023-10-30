addLayer("c", {
    name: "Crystals", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "C", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#FC7BDC",
    requires:
    new Decimal(5),    // Can be a function that takes requirement increases into account
    total: new Decimal(0), // Total of this currency earned
    best: new Decimal(0), // Best ammount of this currency earned
    
    resource: "crystals", // Name of prestige currency
    baseResource: "infects", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: .85, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('c', 22)) mult = mult.times(upgradeEffect('c',22))
        if (hasUpgrade('E', 25)) mult = mult.times(upgradeEffect('E',25))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    branches: ['P','E','F'],
    hotkeys: [
        {key: "c", description: "c: reset for Crystals", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    doReset(resettingLayer) {
        let keep = [];
        if (hasMilestone ('F', 11) && resettingLayer=="F") keep.push("upgrades")
        if (hasMilestone ('E', 11) && resettingLayer=="E") keep.push("upgrades")
        if (layers[resettingLayer].row > this.row) layerDataReset(this.layer, keep)
    },
    passiveGeneration() {
        return hasMilestone ('E', 2)?.15:0
    },
    getBoost() {
        return (gainExp.gainMult)
    },
    boostDisplay(){
        { return "You are getting an boost of"+(format.getBoost)+"x" }
    },
    layerShown(){return true},
	infoboxes: {
        lore: {
            title: "Crystals",
            body: `Crystals hurt people which would infect them`,
        },
    },
 upgrades: {
    rows: 4,
    cols: 5,
    11: {
        title: "Feelings",
        description: "Crystals boosts infects slightly",
        cost: new Decimal(1),
        effect() {
            return (player[this.layer].total.max(1).add(1.3).pow(0.152)).max(1).min(142);
        },
        effectDisplay() {
            let capped = upgradeEffect(this.layer, this.id).gte(142) ? "(Capped so late?)" : "";
            let text = `x${format(upgradeEffect(this.layer, this.id))} ${capped}`;
            return text;
        },
        unlocked(){
            return player.c.points.gte(0)
        },
    },
	12: {
	    title: "Submergance",
        description: "Crystals boosts infects",
        cost: new Decimal(5),
        effect() {
            return (player[this.layer].total.max(1).add(1.45).pow(0.25)).max(1).min(33.33);

        },
        effectDisplay() {
            let capped = upgradeEffect(this.layer, this.id).gte(33.33) ? "(Capped)" : "";
            let text = `x${format(upgradeEffect(this.layer, this.id))} ${capped}`;
            return text;
        },
        unlocked(){
            return hasUpgrade("c", 11)
        },
    },
	13: {
	    title: "Reformation",
        description: "Crystals boosts infects",
        cost: new Decimal(15),
        effect() {
            return (player[this.layer].total.max(1).add(1.66).pow(0.24)).max(1).min(74.62);
        },
        effectDisplay() {
            let capped = upgradeEffect(this.layer, this.id).gte(74.62) ? "(Capped again)" : "";
            let text = `x${format(upgradeEffect(this.layer, this.id))} ${capped}`;
            return text;
        },
        unlocked(){
            return hasUpgrade("c", 12)
        },
    },
	14: {
        title: "Crystalization",
	    description: "Crystals made Experiments more mad, Infects are 3x faster",
	    cost: new Decimal(35),
        unlocked(){
            return hasUpgrade("c", 13)
        },
    },
    15: {
        title: "Strength",
        description: "Experiments are now stronger, Infects are 4.5x faster",
        cost: new Decimal(175),
        unlocked(){
            return hasUpgrade("c", 14)
        },
    },
    21: {
        title: "Permacold",
        description: "Permafrost learned fire control, infects are 3.5x faster",
        cost: new Decimal(1250),
        unlocked(){
            return hasUpgrade("c", 15)
        },
    },
	22: {
        title: "Frosticality",
        description: "Permafrosting can lead to Frosticality-- Infects boosts Crystals",
        cost: new Decimal(4400),
        unlocked(){
            return hasUpgrade("c", 21)
        },
        effect() {
            return (player.points.max(1).add(1).log10().pow(0.45)).max(1).min(25)
        },
        effectDisplay(){
        let capped = upgradeEffect(this.layer, this.id).gte(25) ? "(Capped)" : "";
        let text = `x${format(upgradeEffect(this.layer, this.id))} ${capped}`;
        return text;
        },
    },
	23: {
        title: "Beelusion",
            description: "There's Honey Crystals around the corner-- infects are increased",
            cost: new Decimal(25000),
            unlocked(){
                return hasUpgrade("c", 22)
            },
            effect() {
                return player[this.layer].points.add(1).pow(0.062)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            },

	24: {
        title: "Freezlity",
            description: "The Crystals are -5°C-- infects are slightly increased",
            cost: new Decimal(304500),
            unlocked(){
                return hasUpgrade("c", 23)
            },
            effect() {
                return player[this.layer].points.add(1).pow(0.05)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            },

    25: {
        title: "Crystalized",
        description: "Influcations has occured-- infects gain is 4.2x!",
        cost: new Decimal(1.46e6),
        unlocked(){
            return hasUpgrade("c", 24)
        },
    },
    31: {
        title: "Crystalmania",
        description: "They're Everywhere! Infects Gain is 2.5x!",
        cost: new Decimal(1.24e7),
        unlocked(){
            return hasUpgrade("c", 25)
        },
    },
    32: {
        title: "Transformations",
        description: "Infects boosts Infects slightly.",
        cost: new Decimal(3.14e11),
        unlocked(){
            return hasUpgrade("E", 12) && hasUpgrade("c", 31);
        },
        effect() {
            return player.points.add(1).log10().pow(0.35).add(1)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
    },

    33: {
        title: "Snorkeling",
        description: "Abys is getting faster in the pool...Crystals boosts Infects.",
        cost: new Decimal(2.24e14),
        unlocked(){
            return hasUpgrade("E", 15) && hasUpgrade("c", 32);
        },
        effect(){
            return player.c.points.pow(0.02).add(1)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
     },

     34: {
        title: "Layering",
        description: "Crystals are layering over each other...Crystals boosts Infects",
        cost: new Decimal(9.99e17),
        unlocked(){
            return hasUpgrade("E", 23) && hasUpgrade("c", 33);
        },
        effect() {
            return (player[this.layer].total.max(1).add(1.3).pow(0.055)).max(1).min(25);
        },
        effectDisplay() {
            let capped = upgradeEffect(this.layer, this.id).gte(25) ? "(Capped)" : "";
            let text = `x${format(upgradeEffect(this.layer, this.id))} ${capped}`;
            return text;
        },
     },
 },
 })

