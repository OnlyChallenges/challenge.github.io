addLayer("E", {
    name: "Experiments", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "E", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
        best: new Decimal(0),
        total: new Decimal(0),
    }
    },
    color: "#BF233F",
    requires: new Decimal(1.25e8), // Can be a function that takes requirement increases into account
    resource: "experiments", // Name of prestige currency
    baseResource: "crystals", // Name of resource prestige is based on
    baseAmount() {return player["c"].points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.23, // Prestige currency exponent
    gainMult() {
        mult = new Decimal(1)
        // C Upgrades (# Order)
        if (hasUpgrade('c', 42)) mult = mult.times(upgradeEffect('c',42))
        if (hasUpgrade('c', 52)) mult = mult.times(upgradeEffect('c',52))
        // E Upgrades (# Order)
        if (hasUpgrade('E', 21)) mult = mult.times(upgradeEffect('E',21))
        if (hasUpgrade('E', 23)) mult = mult.times(4)
        if (hasUpgrade('E', 26)) mult = mult.times(upgradeEffect('E',26))
        if (hasUpgrade('E', 44)) mult = mult.times(upgradeEffect('E',44))
        if (hasUpgrade('E', 46)) mult = mult.times(1.5)	
        // F Upgrades (# Order)
        if (hasUpgrade('F', 12)) mult = mult.times(3.33)
        if (hasUpgrade('F', 26)) mult = mult.times(upgradeEffect('F',26))
        if (hasUpgrade('F', 32)) mult = mult.times(upgradeEffect('F',32))
        if (hasUpgrade('F', 33)) mult = mult.times(upgradeEffect('F',33))
        // H Upgrades (# Order)
    	if (hasUpgrade('H', 11)) mult = mult.times(upgradeEffect('H',11))
        if (hasUpgrade('H', 23)) mult = mult.times(upgradeEffect('H',23))
        if (hasUpgrade('H', 25)) mult = mult.times(upgradeEffect('H',25))
        // Combo Upgrades | Upgrade Increasers
        if (hasUpgrade('W', 14) && hasUpgrade('c', 13)) mult = mult.times(upgradeEffect('c', 13))
        // Milestone Effects
        if (hasMilestone('W', 11)) mult = mult.times(2.2)
        if (hasUpgrade('W', 12)) mult = mult.times(upgradeEffect('W',12))
        // Layer Effects
        if (player.H.unlocked) mult = mult.times(tmp.H.effect)
        if (player.R.unlocked) mult = mult.times(tmp.R.effect)
        if (player.W.unlocked) mult = mult.times(tmp.W.effect)
        // Achievement Effects
        if (hasAchievement('a', 34)) mult = mult.times(1.33)
        if (hasAchievement('a', 41)) mult = mult.times(1.69)
        if (hasAchievement('a', 44)) mult = mult.times(3)

        return mult
    },
    gainExp() {
        exp = new Decimal(1)
        return exp
    },
    effect() {
        let eff = player.E.points.add(1).pow(0.26)
        if (hasUpgrade('F',21)) eff = eff.times(3)
        if (hasUpgrade('F',22)) eff = eff.times(4)
        if (hasUpgrade('H',32)) eff = eff.times(upgradeEffect('H',32))
        if (hasUpgrade('F',35)) eff = eff.times(4)
        if (hasMilestone('W', 12)) eff = eff.times(4)
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
        if (hasUpgrade ('E', 34)) base = base.times(1.5)
        if (hasUpgrade ('E', 45)) base = base.add(upgradeEffect('E',45))
        if (hasUpgrade ('F', 23)) base = base.times(5)
        
        return base
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "e", description: "e: reset for Experiments", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
	infoboxes: {
        lore: {
            title: "Experiments",
            body: `Experiments would cause harmful infections towards people turning into themselves. There are some Upgrades in Experiments that will unlock some Upgrades in Crystals, so make sure you're going back and forth!`,
        },
    },
    passiveGeneration() {
        let value1 = new Decimal(0);
        if (hasMilestone('E', 13)) value1 = value1.add(0.01)
        if (hasMilestone('E', 15)) value1 = value1.add(0.49)
        if (hasMilestone('H', 12)) value1 = value1.add(9.5)
        return value1
    },
    layerShown(){return true},
milestones: {
        11: {
            requirementDescription: "333 Experiments",
            effectDescription: `Keep the first three rows of Crystal Upgrades on Reset<br> (Except for 'Layering' & 'Double Layering')`,
            done() { return player.E.points.gte(333) },
        },
        12: {
            requirementDescription: "10,000 Experiments",
            effectDescription: "Passively Gain 15% Crystals/sec",
            done() { return player.E.points.gte(10000) },
        },
        13: {
            requirementDescription: "25,000,000 Experiments",
            effectDescription: "Passively Gain 1% Experiments/sec",
            done() { return player.E.points.gte(25000000) },
        },
        14: {
            requirementDescription: "250,000,000 Experiments and 'Salt Crystals'",
            effectDescription: "Keep the 4th row of Crystal Upgrades",
            done() { return player.E.points.gte(250000000) && hasUpgrade('c',44) },
            unlocked(){
                return hasMilestone('E',13) 
            },
        },
        15: {
            requirementDescription: "1e11 Experiments and 7 Fusions",
            effectDescription(){
                let text
                text = `Passively Gain 50% Experiments/sec & 35% Crystals/sec.`
                if (hasMilestone("E",15)) text = `Passively Gain 50% Experiments/sec & 35% Crystals/sec.<br> You get to keep this Milestone if you have 'Kryruin'!`
                return text
            },
            done() { return player.E.points.gte(1e11) && player.F.points.gte(7) },
            unlocked(){
                return hasMilestone('E',14) 
            },
        },
        16: {
            requirementDescription: "1e15 Experiments and 60 Fusions",
            effectDescription: "Keep the 5th row of Crystal Upgrades",
            done() { return player.E.points.gte(1e15) && player.F.points.gte(60) },
            unlocked(){
                return hasMilestone('E',15)
            }
        },
    },
 upgrades: {
    rows: 4,
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
        title: "Cyberruin",
        description: "Add 0.3 to the Experiment Effect Base",
        cost: new Decimal(15),
        unlocked(){
            return hasUpgrade("E", 12)
        },
    },
    14: {
        title: "Lovebeast",
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
            return (player.E.points.plus(0.7).log10().pow(0.235).plus(1)).max(1).min(7)
        },
        effectDisplay() {
            let capped = upgradeEffect(this.layer, this.id).gte(7) ? "(Kryptox Capped)" : "";
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
            return (player.points.plus(1).pow(0.07).plus(1)).max(1).min(7.5)
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
        description: "Azure can duplicate into 4 clones of themself, 4x Experiment Gain! Keep 'Layering' & 'Double Layering'",
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
            return (player.points.plus(1).log10().pow(0.5)).max(1).min(25)
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
        description: "Infects Boosts Experiment Gain",
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
            return hasUpgrade('E', 26)
        },
    },
    32: {
        title: "Malachite",
        description: "Infects & Experiments boosts Crystals",
        cost: new Decimal(3.5e6),
        effect(){
            return (((player.points.plus(0.1).log10().pow(0.455))) + (player.E.points.plus(1).log10().pow(0.55)))
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        unlocked(){
            return hasUpgrade("E", 31) || hasUpgrade("E",32)
        },
    },
    33: {
        title: "Voiskral",
        description: "Crystals Boosts Infects",
        cost: new Decimal(1e7),
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
        description: "Multiply the Experiment Effect Base by 1.5",
        cost: new Decimal(2.25e7),
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
        if (hasUpgrade("E", 35)) text = "Wait what... Multiply Infect Gain by 1.25x"
        return text
        },
        cost: new Decimal(66666665),
        unlocked(){
            return hasUpgrade("E", 34)
        },
    },
    36: {
        title(){
            let text
            text = "Goon"
            if (hasUpgrade("E", 36)) text = "Not so Goon"
            return text
            },
            description(){
            let text
            text = "Increase Crystal Gain by 100x"
            if (hasUpgrade("E", 36)) text = "Increase Crystal Gain by 7.5x (not 105 wth)"
            return text
            },
            cost: new Decimal(8.33e9),
        unlocked(){
            return hasUpgrade("E", 35) && player.F.unlocked
        },
    },
    41: {
        title: "Virus",
        description: "Increase Fusions based on Infects",
        cost: new Decimal(2.34e10),
        effect(){
            return (player.E.points.plus(1.2).log10().pow(0.13)).max(1).min(5)
        },
        effectDisplay() {
            let capped = upgradeEffect(this.layer, this.id).gte(5) ? "(Capped)" : "";
            let text = `x${format(upgradeEffect(this.layer, this.id))} ${capped}`;
            return text;
        },
        unlocked(){
            return hasMilestone("F", 12) && hasUpgrade("E",35)
        },
    },
    42: {
        title: "Lucial",
        description: "Increase Infects based on Infects",
        cost: new Decimal(1e11),
        effect(){
            return (player.points.plus(1.3).log10().pow(0.6)).max(1).min(263)
        },
        effectDisplay() {
            let capped = upgradeEffect(this.layer, this.id).gte(263) ? "(Capped randomly)" : "";
            let text = `x${format(upgradeEffect(this.layer, this.id))} ${capped}`;
            return text;
        },
        unlocked(){
            return hasUpgrade("E", 41)
        },
    },
    43: {
        title: "M#92olp(",
        description: "Increase Crystals by Crystals",
        cost: new Decimal(4.5e11),
        effect(){
            return (player.c.points.plus(1.1).log10().pow(0.24)).max(1).min(20)
        },
        effectDisplay() {
            let capped = upgradeEffect(this.layer, this.id).gte(20) ? "(Capped)" : "";
            let text = `x${format(upgradeEffect(this.layer, this.id))} ${capped}`;
            return text;
        },
        unlocked(){
            return hasUpgrade("E", 42)
        },
    },
    44: {
        title: "Morgan",
        description: "Increase Experiments by Experiments (Inflation...?)",
        cost: new Decimal(9.2e11),
        effect(){
            return (player.c.points.plus(1).log10().pow(0.33)).max(1).min(13)
        },
        effectDisplay() {
            let capped = upgradeEffect(this.layer, this.id).gte(13) ? "(Not yet!)" : "";
            let text = `x${format(upgradeEffect(this.layer, this.id))} ${capped}`;
            return text;
        },
        unlocked(){
            return hasUpgrade("E", 43)
        },
    },
    45: {
        title: "Lohikaarme",
        description: "Boost Experiment Base Significantly",
        cost: new Decimal(3.5e12),
        effect(){
            return player.c.points.plus(1).log10().pow(0.45)
        },
        effectDisplay() { return "+"+format(upgradeEffect(this.layer, this.id)) },
        unlocked(){
            return hasUpgrade("E", 44)
        },
    },
    46: {
        title: "Nichir",
        description: "Times All Resources by 1.5",
        cost: new Decimal(1e13),
        unlocked(){
            return hasUpgrade("E", 45)
        },
    },
 },  
layerShown() {
    return hasUpgrade("c", 25) || hasUpgrade("E", 11) || player.E.points.gte(1) || player.F.unlocked;
    },
 })             
