addLayer("E", {
    name: "Experiments", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "E", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#BF233F",
    requires: new Decimal(2500000), // Can be a function that takes requirement increases into account
    resource: "experiments", // Name of prestige currency
    baseResource: "crystals", // Name of resource prestige is based on
    baseAmount() {return player["c"].points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.23, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    effect() {
        let eff = player.E.points.add(1).pow(0.23)
        if (hasUpgrade("E",23)) eff = eff.add(1.7)
        if (hasUpgrade("E",23)) eff = eff.pow(0.1)
        return eff
    },
    effectDescription() {
        dis = "which boosts crystals gain by "+ format(tmp.E.effect) +"x"
        return dis
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "e", description: "e: reset for Experiments", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
	infoboxes: {
        lore: {
            title: "Experiments",
            body: `Experiments would cause harmful infections towards people turning into themselves.`,
        },
    },
    layerShown() {
        return hasUpgrade("c", 25) || hasUpgrade("E", 11) || player.E.points.gte(1);
      },
 upgrades: {
    rows: 2,
    cols: 5,
    11: {
        title: "Nyko",
        description: "The first of the Experiments...Boost Infect Gain by 9.5x",
        cost: new Decimal(1),
    },
    12: {
        title: "Abys",
        description: "Squid...Boost Infect Gain by 13x",
        cost: new Decimal(5),
        unlocked(){
            return hasUpgrade("E", 11)
        },
    },
    13: {
        title: "Wintear",
        description: "Poisonity...Boost Infect Gain by 3x",
        cost: new Decimal(25),
        unlocked(){
            return hasUpgrade("E", 12)
        },
    },
    14: {
        title: "Vixtra",
        description: "Something Glitchy...Boost Infect Gain by 5x",
        cost: new Decimal(66),
        unlocked(){
            return hasUpgrade("E", 13)
        },
    },
    15: {
        title: "Aida",
        description: "A damn bat...Boost Infect Gain by 6.5x",
        cost: new Decimal(100),
        unlocked(){
            return hasUpgrade("E", 14)
        },
    },
    21: {
        title: "Snapper",
        description: "Goober...Boost Infect Gain by 4x",
        cost: new Decimal(250),
        unlocked(){
            return hasUpgrade("E", 15)
        },
    },
    22: {
        title: "Honeycomb",
        description: "Stingers are real...Experiments boosts Crystals.",
        cost: new Decimal(666),
        effect(){
            return player.E.points.add(1.5).pow(0.035)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        unlocked(){
            return hasUpgrade("E", 21)
        },
    },
    23: {
        title: "Moss",
        description: "Moss does create some crystals...Moss increased Experiment Effect Base gain by 1.7x & 1.1^",
        cost: new Decimal(2250),
        unlocked(){
            return hasUpgrade("E", 22)
        },
    },
    24: {
        title: "Experiment Surge",
        description: "Infects boosts Infects",
        cost: new Decimal(6942),
        effect(){
            return player.points.plus(1).log10().pow(0.55).plus(1)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        unlocked(){
            return hasUpgrade("E", 23)
        },
    },
 },
 })
