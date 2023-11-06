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
    exponent: 0.111, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade("E",41)) mult = mult.times(upgradeEffect("E", 41))
        if (hasUpgrade('E', 46)) mult = mult.times(1.5)	
        if (hasAchievement('a', 42)) mult = mult.times(2.33333)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    effect() {
        let eff1 = player.F.points.add(1.3).pow(0.488)
        if (hasUpgrade("F",14)) eff1 = eff1.add(2.5)
        if (hasUpgrade ('c', 54)) eff1 = eff1.times(3.5)
        if (hasChallenge('H', 11)) eff1 = eff.times(3)
        eff1 = eff1.times(tmp.F.effectBase)
        return eff1
    },
    effectBase() {
        let base = new Decimal(1)
        if (hasUpgrade("F",16)) base = base.add(1)
        
        return base
    },
    effectDescription() {
        dis = "which boosts infects gain by "+ format(tmp.F.effect) +"x"
        if (hasUpgrade("F", 15)) dis = "which boosts infects & crystal gain by "+ format(tmp.F.effect) +"x";
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
            body() {
            let text 
            text = 
            `This section is completely fanmade...<br><br>
            ???: I heard something...<br>
            ???: What?<br>
            ???: I heard something.<br>
            ???: What do you mean?<br>
            ???: Like...like someone's putting duct tape on something...<br>
            ???: Oh... really? Well... I'm not scared of it. It's just tap-<br>
            - There was distant yelling ... -<br>
            ???: Oh...-<br>
            ???: Well I guess it's just two people yelling about the pipes leaking...<br>
            ???: I can see why, what's the point of putting duct tape on pipes...<br><br>
            
            - In a later Upgrade you'll see one of the names and more lore.. -`
            return text
            },
        },
    },
    layerShown() {
        return hasUpgrade("c", 45) || player.F.unlocked;
      },
milestones: {
        11: {
            requirementDescription: "2 Fusions",
            effectDescription: "Keep the first 3 rows of Experiment Upgrades except 'Goon'",
            done() { return player.F.points.gte(2)},
        },
        12: {
            requirementDescription: "5 Fusions",
            effectDescription: `
            Unlock the next row of Experiment Upgrades<br>
            Keep the first 3 Experiment Milestones on Reset`,
            done() { return player.F.points.gte(5)},
        },
        13: {
            requirementDescription: "20 Fusions",
            effectDescription() {
                let text = "Unlock the next row of Crystal Upgrades";
                if (hasMilestone("F", 13)) text = "Unlock the next row of Crystal Upgrades... Can we get something new??";
                return text;
              },
            done() { return player.F.points.gte(20)},
            unlocked() {return hasUpgrade('F', 16) || player.F.points.gte(12)},
        },
        14: {
            requirementDescription: "100 Fusions",
            effectDescription() {
                let text = 
                `Keep the 4th Row of Experiment Upgrades (And 'Goon')`;
                if (hasMilestone("F", 14)) text =
                `Keep the 4th Row of Experiment Upgrades<br>
                Give us more Fusion stuff you jerk...<br>
                It's annoying to go back and forth y'know.`;
                return text;
              },
            done() { return player.F.points.gte(100)},
            unlocked() {return hasUpgrade('c', 55) || player.F.points.gte(50)},
        }
    },
 upgrades: {
    rows: 2,
    cols: 6,
    11: {
        title: "Ayko",
        description: "Nyko & Abys...Boost Crystal gain by 12.5x",
        cost: new Decimal(1),
    },
    12: {
        title: "Cyberus",
        description: "Cyberruin & Virus...Boost Experiment Gain by 3.33x",
        cost: new Decimal(3),
        unlocked(){
            return hasUpgrade('F',11)
        },
    },
    13: {
        title: "Sombtox",
        description: "Somby & Kryptox...Boost Infect Gain by 60x",
        cost: new Decimal(6),
        unlocked(){
            return hasUpgrade('F',12)
        },
    },
    14: {
        title: "Snapko",
        description: "There's too many of them...Boosts Fusion Effect by 2.5x",
        cost: new Decimal(9),
        unlocked(){
            return hasUpgrade('F',13)
        },
    },
    15: {
        title: "Honzure",
        description: "Have the Fusion Effect effect Crystals also!",
        cost: new Decimal(11),
        unlocked(){
            return hasUpgrade('F',14)
        },
    },
    16: {
        title: "Kryruin",
        description: "Double and a half the Fusion Effect & keep Experiment Milestone 15!",
        cost: new Decimal(13),
        unlocked(){
            return hasUpgrade('F',15)
        },
    },
    21: {
        title: "Frostral",
        description: "Triple the Experiment Effect!",
        cost: new Decimal(17),
        unlocked(){
            return hasUpgrade('F',16)
        },
    },
    22: {
        title: "Lovegen",
        description: "Quadtruple the Experiment Effects",
        cost: new Decimal(45),
        unlocked(){
            return hasUpgrade('F',21)
        },
    },
    23: {
        title: "Lovegen",
        description: "5x the Experiment Effect",
        cost: new Decimal(45),
        unlocked(){
            return hasUpgrade('H',15)
        },
    },
    24: {
        title: "Morgana",
        description: "Triple the Human Effect",
        cost: new Decimal(45),
        unlocked(){
            return hasUpgrade('H',15)
        },
    },
 },
 })
