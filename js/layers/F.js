addLayer("F", {
    name: "Fusions", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "F", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
        best: new Decimal(0),
    }},
    color: "#322CA8",
    requires: new Decimal(1e30), // Can be a function that takes requirement increases into account
    resource: "fusions", // Name of prestige currency
    baseResource: "infects", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.425, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade("E",41)) mult = mult.times(upgradeEffect("E", 41))
        if (hasUpgrade('E', 46)) mult = mult.times(1.5)	
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    effect() {
        let eff1 = player.F.points.add(1.3).pow(0.488)
        if (hasUpgrade("F",14)) eff1 = eff1.add(2.5)
        return eff1
    },
    effectDescription() {
        dis = "which boosts infects gain by "+ format(tmp.F.effect) +"x"
        return dis
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "f", description: "f: reset for Fusions", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
	infoboxes: {
        lore: {
            title: "Fusions",
            body: `Fusions aren't a very good combination...`,
        },
    },
    layerShown() {
        return hasUpgrade("E", 22) || player.F.unlocked;
      },
milestones: {
        11: {
            requirementDescription: "2 fusions",
            effectDescription: "Keep 1st Row of Experiment Upgrades",
            done() { return player.F.points.gte(2)},
        },
        12: {
            requirementDescription: "5 fusions",
            effectDescription: "Unlock the next row of Experiment Upgrades",
            done() { return player.F.points.gte(5)},
        },
    },
 upgrades: {
    rows: 2,
    cols: 5,
    11: {
        title: "Ayko",
        description: "This is stupidly cursed...Boost Crystal gain by 7.5x",
        cost: new Decimal(1),
    },
    12: {
        title: "Cytra",
        description: "What Am I even looking at...Boost Experiment Gain by 3.33x",
        cost: new Decimal(3),
        unlocked(){
            return hasUpgrade('F',11)
        },
    },
    13: {
        title: "Sombtox",
        description: "What in the hell...Boost Infect Gain by 60x",
        cost: new Decimal(6),
        unlocked(){
            return hasUpgrade('F',12)
        },
    },
    14: {
        title: "Fusion 4",
        description: "There's too many of them...Boosts Fusion Effect by 2.5x",
        cost: new Decimal(9),
        unlocked(){
            return hasUpgrade('F',13)
        },
    },
 },
 })
