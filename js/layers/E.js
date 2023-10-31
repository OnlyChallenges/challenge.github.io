addLayer("E", {
    name: "Experiments", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "E", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
        best: new Decimal(0),
        total: new Decimal(0),
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
        if (hasUpgrade('F', 12)) mult = mult.times(3.33)
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
        if (hasUpgrade ('E', 34)) base = base.add(3.14)
        return base
    },
    doReset(resettingLayer) {
        if (layers[resettingLayer].row > this.row) layerDataReset(this.layer)
        if (hasMilestone ('F', 11) && resettingLayer=="F") player.E.upgrades.push("11","12","13","14","15","16") && player.E.challenges.push("11")
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
        let value1 = new Decimal(0);
        if (hasMilestone('E', 13)) value1 = value1.add(0.15)
        return value1
    },
    layerShown() {
        return hasUpgrade("c", 25) || hasUpgrade("E", 11) || player.E.points.gte(1) || player.F.unlocked;
      },
milestones: {
        11: {
            requirementDescription: "333 Experiments",
            effectDescription() {
                let text = "Keep the first three rows of Crystal Upgrades on Reset";
                if (inChallenge("E", 11)) text = "Keep the first three rows of Crystal Upgrades on Reset";
                return text;
              },
            done() { return player.E.points.gte(333) },
        },
        12: {
            requirementDescription: "10,000 Experiments",
            effectDescription() {
                let text = "Passively Gain 15% Crystals/sec";
                if (inChallenge("E", 11)) text = "Passively Gain 15% Crystals/sec (DISABLED)";
                return text;
              },
            done() { return player.E.points.gte(10000) },
        },
        13: {
            requirementDescription: "63,000,000 Experiments",
            effectDescription: "Passively Gain 1% Experiments/sec",
            done() { return player.E.points.gte(63000000) },
            unlocked(){
                return hasUpgrade('c', 43) || hasUpgrade('E',34)
            },
        },
        14: {
            requirementDescription: "250,000,000 Experiments and 'Salt Crystals'",
            effectDescription: "Keep the 4th row of Crystal Upgrades",
            done() { return player.E.points.gte(250000000) && hasUpgrade('c',44) },
            unlocked(){
                return hasMilestone('E',13) 
            },
        },
    },
challenges: {
        11: {
            name: "Experimental Brawl",
            challengeDescription: `
            The Experiments are ganging up on you!<br>
            They're using everything they got!<br>
            Some Milestones are Disabled!<br>
            Crystal /7, Infect /5e9, Experiment *20.`,
            goalDescription: "5e9 Crystals",
            rewardDescription: "Tenfold your Infects",
            canComplete: function() {return player.c.points.gte(5e9)},
            unlocked() {return hasUpgrade('E', 26)},
        },
        12: {
            name: "Immunity",
            challengeDescription: `
            Someone made an vaccination against the infection!<br>
            Crystal /40, Infect /8e12,<br>
            Experiment /1e99!`,
            goalDescription: "1 Infect",
            rewardDescription: "5x Crystal & Experiment Gain",
            canComplete: function() {return player.points.gte(1)},
            unlocked() {return hasUpgrade('c', 42) || inChallenge('E',12) || hasChallenge('E',12)},
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
            return (player.points.plus(0.85).log10().pow(0.45)).max(1).min(10)
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
            return (player.points.plus(0.56).log10().pow(0.55)).max(1).min(10)
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
            return (player.E.points.plus(0.74).log10().pow(0.56)).max(1).min(25)
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
            return (((player.points.plus(0.54).log10().pow(0.42))) + (player.E.points.plus(1).log10().pow(0.55)))
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        unlocked(){
            return hasChallenge("E", 12) && hasUpgrade("E", 31) || hasUpgrade("E",32)
        },
    },
    33: {
        title: "Voiskral",
        description: "Crystals Boosts Infects",
        cost: new Decimal(6.3e7),
        effect(){
            return (player.c.points.plus(0.29).log10().pow(0.77)).max(1).min(50)
        },
        effectDisplay() {
            let capped = upgradeEffect(this.layer, this.id).gte(50) ? "(Capped)" : "";
            let text = `x${format(upgradeEffect(this.layer, this.id))} ${capped}`;
            return text;
        },
        unlocked(){
            return hasUpgrade("E", 32)
        },
    },
    34: {
        title: "Honeydiver",
        description: "Increase the Experiment Effect Base by π",
        cost: new Decimal(1.9e8),
        unlocked(){
            return hasUpgrade("E", 33)
        },
    },
    35: {
        title(){
        let text
        text = "Foxnay"
        if (hasUpgrade("E", 35)) text = "Fake Foxnay"
        return text
        },
        description(){
        let text
        text = "Increase Infect Gain by 100x"
        if (hasUpgrade("E", 35)) text = "YOU REALLY THOUGHT FOXNAY IS REAL? Divide Infect Gain by 2.5x"
        return text
        },
        cost: new Decimal(3.5e8),
        unlocked(){
            return hasUpgrade("E", 34)
        },
    },
    36: {
        title: "Goon",
        description: "Goon...Increase Crystal Gain by 105x",
        cost: new Decimal(1e12),
        unlocked(){
            return hasUpgrade("E", 35) && player.F.unlocked
        },
    },
 },
 })             
