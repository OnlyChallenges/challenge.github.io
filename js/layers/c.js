addLayer("c", {
    name: "Crystals", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "C", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        best: new Decimal(0),
        total: new Decimal(0),
    }},
    color: "#FA7BDC",
    nodeStyle() {return {
        "background-color": ((player.c.unlocked||canReset("c"))?"#FA7BDC":"#bf8f8f"),
    }},
    requires:
    new Decimal(5),    // Can be a function that takes requirement increases into account    
    resource: "crystals", // Name of prestige currency
    baseResource: "infects", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: .85, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        // C Upgrade Effects (# Order)
        if (hasUpgrade('c', 22)) mult = mult.times(upgradeEffect('c',22))
        if (hasUpgrade('c', 41)) mult = mult.times(upgradeEffect('c',41))
        if (hasUpgrade('c', 43)) mult = mult.times(upgradeEffect('c',43))
        // E Upgrade Effects (# Order)
        if (hasUpgrade('E', 16)) mult = mult.times(upgradeEffect('E',16))
        if (hasUpgrade('E', 25)) mult = mult.times(upgradeEffect('E',25))
        if (hasUpgrade('E', 32)) mult = mult.times(upgradeEffect('E',32))
        if (hasUpgrade('E', 36)) mult = mult.times(7.5)	
        if (hasUpgrade('E', 43)) mult = mult.times(upgradeEffect('E',43))
        if (hasUpgrade('E', 46)) mult = mult.times(1.5)	
        // F Upgrade Effects (# Order)
        if (hasUpgrade('F', 11)) mult = mult.times(12.5)
        if (hasUpgrade('F', 33)) mult = mult.times(upgradeEffect('F',33))
        if (hasUpgrade('F', 34)) mult = mult.times(upgradeEffect('F',34))
        // H Upgrade Effects (# Order)
    	if (hasUpgrade('H', 14)) mult = mult.times(upgradeEffect('H',14))
        if (hasUpgrade('H', 22)) mult = mult.times(upgradeEffect('H',22))
        if (hasUpgrade('H', 33)) mult = mult.times(upgradeEffect('H',33))
        if (hasUpgrade('H', 34)) mult = mult.times(upgradeEffect('H',34))
        // Milestone Effects
        if (hasMilestone('W', 11)) mult = mult.times(2.2)
        // Achievement Effects
    	if (hasAchievement('a', 32)) mult = mult.times(2.5)
        // Layer Effects (Lowest Layer)
        if (hasUpgrade('F', 15)) mult = mult.times(tmp.F.effect)
        if (player.H.unlocked) mult = mult.times(tmp.H.effect)
        if (player.R.unlocked) mult = mult.times(tmp.R.effect)
        if (player.W.unlocked) mult = mult.times(tmp.W.effect)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        pow = new Decimal(1)
        if (hasUpgrade('c', 53)) pow = pow.add(.01)
        return pow
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "c", description: "c: reset for Crystals", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    doReset(resettingLayer) {
        if (layers[resettingLayer].row > this.row) layerDataReset(this.layer)
        if (hasMilestone ('E', 11)) player.c.upgrades.push("11", "12", "13", "14", "15", "21", "22", "23", "24", "25", "31", "32", "33", "34", "35")
        if (hasMilestone ('E', 14)) player.c.upgrades.push("41", "42", "43", "44", "45")
        if (hasMilestone ('E', 16)) player.c.upgrades.push("51", "52", "53", "54", "55")
        if (hasMilestone ('F', 11)) player.E.upgrades.push("11","12","13","14","15","16","21","22","23","24","25","26","31","32","33","34","35")
        if (hasMilestone ('F', 14)) player.E.upgrades.push("36","41", "42", "43", "44", "45", "46")
        if (hasMilestone ('F', 12)) player.E.milestones.push("11", "12", "13", "14")
        if (hasUpgrade ('F', 16)) player.E.milestones.push("15")
        if (hasUpgrade ('F', 22)) player.E.milestones.push("16")
        // Human Milestone
        if (hasMilestone ('H', 11)) player.c.upgrades.push("11", "12", "13", "14", "15", "21", "22", "23", "24", "25", "31", "32", "33", "34", "35","41", "42", "43", "44", "45","51", "52", "53", "54", "55")
        if (hasMilestone ('H', 13)) player.E.upgrades.push("11","12","13","14","15","16","21","22","23","24","25","26","31","32","33","34","35")
        if (hasMilestone ('H', 13)) player.E.upgrades.push("36","41", "42", "43", "44", "45", "46")
        if (hasMilestone ('H', 13)) player.E.milestones.push("11", "12", "13", "14")
        if (hasMilestone ('H', 13)) player.E.milestones.push("15")
        if (hasMilestone ('H', 13)) player.E.milestones.push("16")
        // Weapon Milestone
        if (hasMilestone ('W', 12)) player.push("milestones")
        if (hasMilestone ('W', 12)) player.push("upgrades")
    },
    passiveGeneration() {
        let value1 = new Decimal(0);
        if (hasMilestone('E', 12)) value1 = value1.add(0.15)
        if (hasMilestone('E', 15)) value1 = value1.add(0.20)
        return value1
    },
    layerShown(){return true},
	infoboxes: {
        lore: {
            title: "Crystals",
            body: `Crystals hurt people which would infect them. The main problem of Infects...`,
        },
    },
 upgrades: {
    rows: 5,
    cols: 5,
    11: {
        title: "Feelings",
        description: "Crystals boosts infects slightly",
        cost: new Decimal(1),
        effect() {
            return (player.c.points.max(1).add(1.3).pow(0.152)).max(1).min(142);
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
            return (player.c.points.max(1).add(1.45).pow(0.25)).max(1).min(33.33);

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
            return (player.c.points.max(1).add(1.66).pow(0.24)).max(1).min(74.62);
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
            return (player.points.max(1).add(1).log10().pow(0.45)).max(1).min(5)
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
                return player.points.add(1).pow(0.058)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },

	24: {
        title: "Freezlity",
            description: "The Crystals are -5°C, infects are slightly increased",
            cost: new Decimal(304500),
            unlocked(){
                return hasUpgrade("c", 23)
            },
            effect() {
                return player.points.add(1).pow(0.05)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            },

    25: {
        title: "Crystalized",
        description: "Influcations has occured-- infects gain is 2.2x!",
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
            return hasUpgrade("E", 22) && hasUpgrade("c", 33);
        },
        effect() {
            return (player.c.points.max(1).add(1.33).log10().pow(0.076)).max(1).min(14.5);
        },
        effectDisplay() {
            let capped = upgradeEffect(this.layer, this.id).gte(14.5) ? "(Layer Capped)" : "";
            let text = `x${format(upgradeEffect(this.layer, this.id))} ${capped}`;
            return text;
        },
     },
    35: {
        title: "Double Layering",
        description: "Crystals are layering again?...Experiments boosts Infects",
        cost: new Decimal(3.88e19),
        unlocked(){
            return hasUpgrade("E", 23) && hasUpgrade("c", 34);
        },
        effect() {
            return (player.E.points.add(0.96).log10().pow(0.63)).max(1).min(10);
        },
        effectDisplay() {
            let capped = upgradeEffect(this.layer, this.id).gte(10) ? "(Layer^Layer capped)" : "";
            let text = `x${format(upgradeEffect(this.layer, this.id))} ${capped}`;
            return text;
        },
    },
    41: {
        title: "Crystal Synergy",
        description: "Crystals can boost Crystals",
        cost: new Decimal(3.14e21),
        unlocked(){
            return hasUpgrade("E", 31) && hasUpgrade("c", 35);
        },
        effect() {
            return (player.c.points.add(1).log10().pow(0.45)).max(1).min(15);
        },
        effectDisplay() {
            let capped = upgradeEffect(this.layer, this.id).gte(15) ? "(Crystal capped)" : "";
            let text = `x${format(upgradeEffect(this.layer, this.id))} ${capped}`;
            return text;
        },
    },
    42: {
        title: "Experimental Infects Synergy",
        description: "Infects boosts Experiments",
        cost: new Decimal(1e23),
        unlocked(){
            return hasUpgrade("c", 41);
        },
        effect() {
            return (player.points.add(0.62).log10(2).pow(0.45)).max(1).min(100);
        },
        effectDisplay() {
            let capped = upgradeEffect(this.layer, this.id).gte(100) ? "(Capped)" : "";
            let text = `x${format(upgradeEffect(this.layer, this.id))} ${capped}`;
            return text;
        },
    },
    43: {
        title: "Crystaling Crystals",
        description: "Crystals boosts itself",
        cost: new Decimal(5.5e25),
        unlocked(){
            return hasUpgrade("c", 42) && hasUpgrade("E", 34);
        },
        effect() {
            return (player.c.points.add(0.65).log10(1.2).pow(0.4)).max(1).min(6);
        },
        effectDisplay() {
            let capped = upgradeEffect(this.layer, this.id).gte(6) ? "(Capped)" : "";
            let text = `x${format(upgradeEffect(this.layer, this.id))} ${capped}`;
            return text;
        },
    },
	44: {
        title: "Salt Crystals",
            description: "Salty Crystals...Intresting...Boost Crystals by Experiments",
            cost: new Decimal(3.44e27),
            unlocked(){
                return hasMilestone("E", 13) && hasUpgrade("c", 43);
            },
            effect() {
                return player.E.points.add(1).pow(0.034)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
    },
    45: {
        title: "Fusion Crystals?",
            description: "Let's start something... fusiony? Shall we? Boost Infects by Infects + 10",
            cost: new Decimal(1e29),
            unlocked(){
                return hasUpgrade("c", 44);
            },
            effect() {
                return (player.points.max(1).add(11).pow(0.067)).max(1).min(130);
            },
            effectDisplay() {
                let capped = upgradeEffect(this.layer, this.id).gte(130) ? "(Capped)" : "";
                let text = `x${format(upgradeEffect(this.layer, this.id))} ${capped}`;
                return text;
            },
    },
    51: {
        title(){
            let text
            text = "Crystalation"
            if (hasUpgrade("c", 51)) text = "Uncrystalation"
            return text
            },
            description(){
            let text
            text = "Increase Infect Gain by 1e10x with another Crystal Boost!"
            if (hasUpgrade("c", 51)) text = "Increase Infect Gain at an stable ammount..."
            return text
            },
            effect(){
                return (player.points.plus(1).log10().pow(0.35).plus(1)).max(1).min(25)
            },
            effectDisplay() {
                let capped = upgradeEffect(this.layer, this.id).gte(25) ? "(Capped)" : "";
                let text = `x${format(upgradeEffect(this.layer, this.id))} ${capped}`;
                return text
        },
            cost: new Decimal(6.5e39),
        unlocked(){
            return hasMilestone("F", 13) && hasUpgrade("c",45)
        },
    },
    52: {
        title(){
            let text
            text = "Crystal the Crystals"
            if (hasUpgrade("c", 52)) text = "Only Crystals"
            return text
            },
            description(){
            let text
            text = "Crystal gain is now ^1.1 with an Infect Boost!"
            if (hasUpgrade("c", 52)) text = "Not how this works! Experiment Gain is boosted by Crystals."
            return text
            },
            effect(){
                return (player.c.points.plus(1).log10().pow(0.333)).max(1).min(12.5)
            },
            effectDisplay() {
                let capped = upgradeEffect(this.layer, this.id).gte(12.5) ? "(Capped)" : "";
                let text = `x${format(upgradeEffect(this.layer, this.id))} ${capped}`;
                return text
        },
            cost: new Decimal(1e41),
        unlocked(){
            return hasUpgrade("c", 51)
        },
    },
        53: {
            title(){
                let text
                text = "Crystal Infectors"
                if (hasUpgrade("c", 53)) text = "Infect Crystalors"
                return text
                },
                description(){
                let text
                text = "Crystal gain is now ^1.5"
                if (hasUpgrade("c", 53)) text = "Kidding! Crystals gain is now ^1.01. Hey...Be happy it's some power and not another multiplier."
                return text
                },
                cost: new Decimal(5.2e41),
            unlocked(){
                return hasUpgrade("c", 52)
            },
    },
    54: {
        title(){
            let text
            text = "Reforming the Infectors"
            if (hasUpgrade("c", 54)) text = "Reforming the Reforming Infectors"
            return text
            },
            description(){
            let text
            text = "Fusion Effect is now ^2"
            if (hasUpgrade("c", 54)) text = "Times Fusion Effect by 3.5x!"
            return text
            },
            cost: new Decimal(1e42),
        unlocked(){
            return hasUpgrade("c", 53)
        },
    },
    55: {
            title: "Lusionist",
                description: "Beelusion again? Infects boosts Infects",
                cost: new Decimal(3.44e42),
                unlocked(){
                    return hasUpgrade("c", 54)
                },
                effect() {
                    return player.points.add(1).pow(0.033)
                },
                effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            },
},
 })

