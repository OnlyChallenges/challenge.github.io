addLayer("E", {
    name: "Experiments", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "E", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#BF233F",
    requires: new Decimal(1.25e8), // Can be a function that takes requirement increases into account
    resource: "experiments", // Name of prestige currency
    baseResource: "crystals", // Name of resource prestige is based on
    baseAmount() {return player["c"].points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.23, // Prestige currency exponent
    gainMult() {
        mult = new Decimal(1)
        if (hasUpgrade('E', 21)) mult = mult.times(upgradeEffect('E',21))
        if (hasUpgrade('E', 23)) mult = mult.times(4)
        if (hasUpgrade('E', 26)) mult = mult.times(upgradeEffect('E',26))
        if (inChallenge('E', 11)) mult = mult.times(20)
        if (inChallenge('E', 12)) mult = mult.div(1e99)
        if (hasChallenge('E',12)) mult = mult.times(5)
        return mult
    },
    gainExp() {
        exp = new Decimal(1)
        return exp
    },
    effect() {
        let eff = player.E.points.add(1).pow(0.26)
        eff = eff.times(tmp.E.effectBase)
        return eff
    },
    effectDescription() {
        dis = "which boosting infect gain by "+format(tmp.E.effect)+"x"
        return dis
    },
    effectBase() {
        let base = new Decimal(1)
        if (hasUpgrade ('E', 13)) base = base.add(0.3)
        if (hasUpgrade ('E', 14)) base = base.add(upgradeEffect('E',14))
        if (hasUpgrade ('E', 34)) base = base.add(1.314)
        return base
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    branches: ['F'],
    hotkeys: [
        {key: "e", description: "e: reset for Experiments", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
	infoboxes: {
        lore: {
            title: "Experiments",
            body: `Experiments would cause harmful infections towards people turning into themselves. There are some Upgrades in Experiments that will unlock some Upgrades in Crystals, so make sure you're going back and forth!`,
        },
    },
    passiveGeneration() {
        return hasMilestone('E', 13)?.01:0
    },
    layerShown() {
        return hasUpgrade("c", 25) || hasUpgrade("E", 11) || player.E.points.gte(1) || player.F.unlocked;
      },
milestones: {
        11: {
            requirementDescription: "200 Experiments",
            effectDescription: "Keep Crystal Upgrades on Reset",
            done() { return player.E.points.gte(200) },
        },
        12: {
            requirementDescription: "4,500 Experiments",
            effectDescription: "Passively Gain 15% Crystals/sec",
            done() { return player.E.points.gte(4500) },
        },
        13: {
            requirementDescription: "25,000,000 Experiments",
            effectDescription: "Passively Gain 1% Experiments/sec",
            done() { return player.E.points.gte(25000000) },
            unlocked(){
                return hasUpgrade('c', 43)
            },
        },
    },
challenges: {
        11: {
            name: "Experimental Brawl",
            challengeDescription: `
            The Experiments are ganging up on you!
            They're using everything they got!
            Crystal gain is divided by 12.5,
            Infect gain is divided by 1e10,
            and Experiment Gain is multiplied by 20!`,
            goalDescription: "5e9 Crystals",
            rewardDescription: "Tenfold your Infects",
            canComplete: function() {return player.c.points.gte(5e9)},
            unlocked() {return hasUpgrade('E', 26)},
        },
        12: {
            name: "Immunity",
            challengeDescription: `
            Someone made an vaccination against the infection!
            Crystal gain is divided by 40,
            Infect gain is divided by 8e12,
            and Experiment Gain is divided by 1e99!`,
            goalDescription: "1 Infect",
            rewardDescription: "5x Crystal & Experiment Gain",
            canComplete: function() {return player.points.gte(1)},
            unlocked() {return hasUpgrade('c', 42)},
        },
},
 upgrades: {
    rows: 3,
    cols: 6,
    11: {
        title: "Nyko",
        description: "The first of the Experiments...Boost Infect Gain by 8.7x",
        cost: new Decimal(1),
    },
    12: {
        title: "Abys",
        description: "Squid...Boost Infect Gain by 10x",
        cost: new Decimal(3),
        unlocked(){
            return hasUpgrade("E", 11)
        },
    },
    13: {
        title: "Wintear",
        description: "Add 0.3 to the Experiment Effect Base",
        cost: new Decimal(15),
        unlocked(){
            return hasUpgrade("E", 12)
        },
    },
    14: {
        title: "Vixtra",
        description: "Increase Experiment Effect Base by infects & 5x Infects",
        cost: new Decimal(33),
        effect() {
            return (player.points.add(1.136).log10().pow(0.067)).max(1).min(3.14)
        },
        effectDisplay() {
            let capped = upgradeEffect(this.layer, this.id).gte(3.14) ? "(Base Capped)" : "";
            let text = `+${format(upgradeEffect(this.layer, this.id))} ${capped}`;
            return text;
        },
        unlocked(){
            return hasUpgrade("E", 13)
        },
    },
    15: {
        title: "Somby",
        description: "Crystals are boosted by Infects & πx Infects",
        cost: new Decimal(55),
        effect(){
            return (player.points.plus(0.86).log10(2).pow(0.25).plus(1)).max(1).min(4.5)
        },
        effectDisplay() {
            let capped = upgradeEffect(this.layer, this.id).gte(4.5) ? "(Crystal Capped)" : "";
            let text = `x${format(upgradeEffect(this.layer, this.id))} ${capped}`;
            return text;
        },
        unlocked(){
            return hasUpgrade("E", 14)
        },
    },
    16:{
        title: "Kryptox",
        description: "Experiments Boosts Crystals & Infects.",
        cost: new Decimal(76),
        effect(){
            return (player.E.points.plus(0.7).log10().pow(0.16).plus(1)).max(1).min(5)
        },
        effectDisplay() {
            let capped = upgradeEffect(this.layer, this.id).gte(4.5) ? "(Kryptox Capped)" : "";
            let text = `x${format(upgradeEffect(this.layer, this.id))} ${capped}`;
            return text;
        },
        unlocked(){
            return hasUpgrade("E", 15)
        },
    },
    21: {
        title: "Snapper",
        description: "Boosts Experiment Gain by Infects",
        cost: new Decimal(180),
        effect(){
            return (player.points.plus(1).log10().pow(0.25).plus(1)).max(1).min(7.5)
        },
        effectDisplay() {
            let capped = upgradeEffect(this.layer, this.id).gte(7.5) ? "(Capped)" : "";
            let text = `x${format(upgradeEffect(this.layer, this.id))} ${capped}`;
            return text;
        },
        unlocked(){
            return hasUpgrade("E", 16)
        },
    },
    22: {
        title: "Honeycomb",
        description: "Stingers are infecting many...Infects increase Infects slightly.",
        cost: new Decimal(730),
        effect(){
            return (player.points.plus(1).log10().pow(0.35).plus(1)).max(1).min(25)
        },
        effectDisplay() {
            let capped = upgradeEffect(this.layer, this.id).gte(25) ? "(Capped)" : "";
            let text = `x${format(upgradeEffect(this.layer, this.id))} ${capped}`;
            return text;
        },
        unlocked(){
            return hasUpgrade("E", 21)
        },
    },
    23: {
        title: "Azure",
        description: "Azure can duplicate into 4 clones of themself, 4x Experiment Gain!",
        cost: new Decimal(1520),
        unlocked(){
            return hasUpgrade("E", 22)
        },
    },
    24: {
        title: "Experiment Surge",
        description: "Infects boosts Infects",
        cost: new Decimal(6400),
        effect(){
            return (player.points.plus(1).log10().pow(0.75).plus(1)).max(1).min(150)
        },
        effectDisplay() {
            let capped = upgradeEffect(this.layer, this.id).gte(150) ? "(Capped)" : "";
            let text = `x${format(upgradeEffect(this.layer, this.id))} ${capped}`;
            return text;
        },
        unlocked(){
            return hasUpgrade("E", 23)
        },
    },
    25: {
        title: "Frostical",
        description: "Infects Boosts Crystal Gain",
        cost: new Decimal(16600),
        effect(){
            return (player.points.plus(1).log10().pow(0.45)).max(1).min(10)
        },
        effectDisplay() {
            let capped = upgradeEffect(this.layer, this.id).gte(10) ? "(Capped)" : "";
            let text = `x${format(upgradeEffect(this.layer, this.id))} ${capped}`;
            return text;
        },
        unlocked(){
            return hasUpgrade("E", 24)
        },
    },
    26: {
        title: "Syral",
        description: "Infects Boosts Experiment Gain & Unlock a Challenge!",
        cost: new Decimal(69420),
        effect(){
            return (player.points.plus(0.86).log10().pow(0.23)).max(1).min(10)
        },
        effectDisplay() {
            let capped = upgradeEffect(this.layer, this.id).gte(10) ? "(Capped)" : "";
            let text = `x${format(upgradeEffect(this.layer, this.id))} ${capped}`;
            return text;
        },
        unlocked(){
            return hasUpgrade("E", 25)
        },
    },
    31: {
        title: "Wenyi",
        description: "Experiments boosts Infects",
        cost: new Decimal(250000),
        effect(){
            return (player.E.points.plus(0.86).log10().pow(0.56)).max(1).min(25)
        },
        effectDisplay() {
            let capped = upgradeEffect(this.layer, this.id).gte(25) ? "(Capped)" : "";
            let text = `x${format(upgradeEffect(this.layer, this.id))} ${capped}`;
            return text;
        },
        unlocked(){
            return hasChallenge("E", 11)
        },
    },
    32: {
        title: "Malachite",
        description: "Infects & Experiments boosts Crystals",
        cost: new Decimal(1e7),
        effect(){
            return (((player.points.plus(0.80).log10().pow(0.33))) + (player.E.points.plus(1).log10().pow(0.55)))
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        unlocked(){
            return hasChallenge("E", 12) && hasUpgrade("E", 31)
        },
    },
    33: {
        title: "Voiskral",
        description: "Crystals Boosts Infects",
        cost: new Decimal(1e7),
        effect(){
            return (player.c.points.plus(0.77).log10().pow(0.62)).max(1).min(15)
        },
        effectDisplay() {
            let capped = upgradeEffect(this.layer, this.id).gte(15) ? "(Capped)" : "";
            let text = `x${format(upgradeEffect(this.layer, this.id))} ${capped}`;
            return text;
        },
        unlocked(){
            return hasUpgrade("E", 32)
        },
    },
    34: {
        title: "Honeydiver",
        description: "Increase the Experiment Effect Base by 1.π",
        cost: new Decimal(1e7),
        unlocked(){
            return hasUpgrade("E", 33)
        },
    },
 },
 })
