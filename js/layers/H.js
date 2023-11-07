addLayer("H", {
    name: "Humans", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "H", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
        best: new Decimal(0),
    }},
    color: "#d19226",
    requires: new Decimal(1.22e42), // Can be a function that takes requirement increases into account
    resource: "humans", // Name of prestige currency
    baseResource: "infects", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.6, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('F', 31)) mult = mult.times(upgradeEffect('F',31))
        if (hasUpgrade('H', 15)) mult = mult.times(upgradeEffect('H',15))
        if (hasUpgrade('R', 13)) mult = mult.times(upgradeEffect('R',13))
        if (player.W.unlocked) mult = mult.times(tmp.W.effect)
        if (hasMilestone('W', 11)) mult = mult.times(2.2)
        if (hasMilestone('W', 13)) mult = mult.times(upgradeEffect('W',13))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    effect() {
        let eff2 = player.H.points.add(1).pow(0.26)
        if (hasAchievement ('a', 45)) eff2 = eff2.times(2.66) 
        eff2 = eff2.times(tmp.H.effectBase)
        return eff2
    },
    effectBase() {
        let base = new Decimal(1)
        if (hasUpgrade ('F', 24)) base = base.add(2) 
        if (hasUpgrade('R', 12)) base = base.times(upgradeEffect('R',12))
        return base
    },
    effectDescription() {
        dis = "which boosts Infects, Experiments, and Crystal gain by "+ format(tmp.H.effect) +"x"
        return dis
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "h", description: "h: reset for Humans", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    infoboxes: {
        lore1: {
            title: "Humans (v0.5 Update)",
            body() {
            let text 
            text = 
            `This section is completely fanmade - This Section isn't balanced yet with Crystals & Experiments!<br> 
            Full Section will be updated on E205-test_v.2!<br><br>
            
            ???: Did you hear about the rainbow lighted baton...?<br>
            ???: Where did you hear that from...<br>
            ???: Some creepy person in a darkended corner of the hall.<br>
            ???: Why would you listen to a person that would tell you something false..<br>
            ???: No look!<br>
            - They pull out something -<br>
            ???: What the f-`
            return text
            },
        },
    },
    layerShown() {return true},
    layerShown() {
        return hasUpgrade("F", 22) || player.H.points.gte(1) || player.H.unlocked;
        }, 

milestones: {
        11: {
            requirementDescription: "5 Humans",
            effectDescription() {
                let text = "Keep Crystal Upgrades on Reset";
                return text;
              },
            done() { return player.H.points.gte(5) },
        },
        12: {
            requirementDescription: "30 Humans",
            effectDescription() {
                let text = "Passively gain 10x Experiments";
                return text;
              },
            done() { return player.H.points.gte(30) },
        },
        13: {
            requirementDescription: "75 Humans",
            effectDescription() {
                let text = "Keep everything like in Fusions";
                return text;
              },
            done() { return player.H.points.gte(75) && hasMilestone('H', 12) },
        },
        14: {
            requirementDescription: "5,000 Humans",
            effectDescription() {
                let text = "Unlock more unbalanced fusion upgrades";
                return text;
              },
        done() { return player.H.points.gte(5000) && hasMilestone('H', 13) },
        },
        15: {
            requirementDescription: "6.5e9 Humans",
            effectDescription() {
                let text = "Unlock 2 more Fusion Upgrades & 2x Fusion Effect!";
                return text;
              },
        done() { return player.H.points.gte(6.5e9) && hasMilestone('H', 14) },
        },
    },
upgrades: {
        rows: 5,
        cols: 5,
        11: {
            title: "Emotions",
            description: "Experiment Boosts Infects",
            cost: new Decimal(1),
            effect() {
                return (player.E.points.max(1).add(1).pow(0.033)).max(1).min(25);
            },
            effectDisplay() {
                let capped = upgradeEffect(this.layer, this.id).gte(25) ? "(Capped)" : "";
                let text = `x${format(upgradeEffect(this.layer, this.id))} ${capped}`;
                return text;
            },
            unlocked(){
                return player.H.points.gte(0)
            },
        },
        12: {
            title: "Anxiety",
            description: "Crystals Boosts Infects",
            cost: new Decimal(6),
            effect() {
                return (player.c.points.max(1).add(1).pow(0.014)).max(1).min(30);
            },
            effectDisplay() {
                let capped = upgradeEffect(this.layer, this.id).gte(30) ? "(Capped)" : "";
                let text = `x${format(upgradeEffect(this.layer, this.id))} ${capped}`;
                return text;
            },
            unlocked(){
                return hasUpgrade('H', 11)
            },
        },
        13: {
            title: "Personific",
            description: "Infects boosts Infects",
            cost: new Decimal(26),
            effect() {
                return (player.points.max(1).add(1).pow(0.016)).max(1).min(40);
            },
            effectDisplay() {
                let capped = upgradeEffect(this.layer, this.id).gte(40) ? "(Capped)" : "";
                let text = `x${format(upgradeEffect(this.layer, this.id))} ${capped}`;
                return text;
            },
            unlocked(){
                return hasUpgrade('H', 12)
            },
        },
        14: {
            title: "Theory",
            description: "Experiments boosts Crystals",
            cost: new Decimal(180),
            effect() {
                return (player.E.points.max(1).add(1).pow(0.022)).max(1).min(24);
            },
            effectDisplay() {
                let capped = upgradeEffect(this.layer, this.id).gte(24) ? "(Capped)" : "";
                let text = `x${format(upgradeEffect(this.layer, this.id))} ${capped}`;
                return text;
            },
            unlocked(){
                return hasUpgrade('H', 13)
            },
        },
        15: {
            title: "Realization",
            description: "Humans boosts itself",
            cost: new Decimal(4650),
            effect() {
                return (player.H.points.max(1).add(1).pow(0.12)).max(1).min(3.7);
            },
            effectDisplay() {
                let capped = upgradeEffect(this.layer, this.id).gte(3.7) ? "(Capped)" : "";
                let text = `x${format(upgradeEffect(this.layer, this.id))} ${capped}`;
                return text;
            },
            unlocked(){
                return hasUpgrade('H', 14)
            },
        },
        21: {
            title: "Experimental Battle",
            description: "Humans boosts infects significantly",
            cost: new Decimal(16000),
            effect() {
                return (player.H.points.max(1).add(1).pow(0.444)).max(1).min(193);
            },
            effectDisplay() {
                let capped = upgradeEffect(this.layer, this.id).gte(193) ? "(Capped)" : "";
                let text = `x${format(upgradeEffect(this.layer, this.id))} ${capped}`;
                return text;
            },
            unlocked(){
                return hasUpgrade('H', 15)
            },
        },
        22: {
            title: "Scientific Research",
            description: "Infects boosts Crystals",
            cost: new Decimal(666666),
            effect() {
                return (player.points.max(1).add(1).pow(0.035)).max(1).min(193);
            },
            effectDisplay() {
                let capped = upgradeEffect(this.layer, this.id).gte(193) ? "(Capped)" : "";
                let text = `x${format(upgradeEffect(this.layer, this.id))} ${capped}`;
                return text;
            },
            unlocked(){
                return hasUpgrade('H', 21)
            },
        },
        23: {
            title: "Evolution",
            description: "Infects boosts Crystals & Experiments",
            cost: new Decimal(3500000),
            effect() {
                return (player.points.max(1).add(1).pow(0.01)).max(1).min(62);
            },
            effectDisplay() {
                let capped = upgradeEffect(this.layer, this.id).gte(62) ? "(Capped)" : "";
                let text = `x${format(upgradeEffect(this.layer, this.id))} ${capped}`;
                return text;
            },
            unlocked(){
                return hasUpgrade('H', 22)
            },
        },
        24: {
            title: "Reality",
            description: "Humans boosts Fusions",
            cost: new Decimal(3e8),
            effect() {
                return (player.H.points.max(1).add(1).pow(0.03)).max(1).min(4.9);
            },
            effectDisplay() {
                let capped = upgradeEffect(this.layer, this.id).gte(4.9) ? "(Capped)" : "";
                let text = `x${format(upgradeEffect(this.layer, this.id))} ${capped}`;
                return text;
            },
            unlocked(){
                return hasMilestone('F',15)
            },
        },
        25: {
            title: "Imagination",
            description: "Fusions boosts Experiments",
            cost: new Decimal(2.13e9),
            effect() {
                return (player.F.points.max(1).add(1).pow(0.15)).max(1).min(8.2);
            },
            effectDisplay() {
                let capped = upgradeEffect(this.layer, this.id).gte(8.2) ? "(Capped)" : "";
                let text = `x${format(upgradeEffect(this.layer, this.id))} ${capped}`;
                return text;
            },
            unlocked(){
                return hasUpgrade('H',24)
            },
        },
        31: {
            title: "Watering Eyes",
            description: "Quadtruple the Room Effect",
            cost: new Decimal(1.5e14),
            unlocked(){
                return hasMilestone('R', 11) && hasUpgrade('H', 25)
            },
        },
        32: {
            title: "Slowing Down",
            description: "Fusions boosts Experiment Effect",
            cost: new Decimal(3e15),
            effect() {
                return (player.F.points.max(1).add(1).pow(0.047)).max(1).min(500);
            },
            effectDisplay() {
                let capped = upgradeEffect(this.layer, this.id).gte(500) ? "(Capped)" : "";
                let text = `x${format(upgradeEffect(this.layer, this.id))} ${capped}`;
                return text;
            },
            unlocked(){
                return hasUpgrade('H',31)
            },
        },
        33: {
            title: "Vision",
            description: "Boost Crystal Gain by Humans",
            cost: new Decimal(1.25e16),
            effect() {
                return (player.H.points.max(1).add(1).pow(0.066)).max(1).min(444.44);
            },
            effectDisplay() {
                let capped = upgradeEffect(this.layer, this.id).gte(444.44) ? "(Capped)" : "";
                let text = `x${format(upgradeEffect(this.layer, this.id))} ${capped}`;
                return text;
            },
            unlocked(){
                return hasUpgrade('H',32)
            },
        },
        34: {
            title: "Colorization",
            description: "Crystals are boosted by Crystals",
            cost: new Decimal(8.4e16),
            effect() {
                return (player.c.points.max(1).add(1).pow(0.028)).max(1).min(222.22);
            },
            effectDisplay() {
                let capped = upgradeEffect(this.layer, this.id).gte(222.22) ? "(Capped)" : "";
                let text = `x${format(upgradeEffect(this.layer, this.id))} ${capped}`;
                return text;
            },
            unlocked(){
                return hasUpgrade('H',33)
            },
        },
        35: {
            title: "Weaponization",
            description: "15x Infects",
            cost: new Decimal(1e18),
            unlocked(){
                return hasUpgrade('H',34)
            },
        },
    },
})   
