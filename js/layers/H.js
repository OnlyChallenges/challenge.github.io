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
    requires: new Decimal(1.72e43), // Can be a function that takes requirement increases into account
    resource: "humans", // Name of prestige currency
    baseResource: "infects", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.56, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    effect() {
        let eff2 = player.H.points.add(1).pow(0.215)
        eff2 = eff2.times(tmp.H.effectBase)
        return eff2
    },
    effectBase() {
        let base = new Decimal(1) 
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
    tabFormat: {
        "Main":{
            content: [
                ["infobox", "lore1"],
                ["display-text", () => "You have " + colored("H", format(player.H.points)) + " Humans<br> Which boosts Infects, Experiments, and Crystal gain by " + format(tmp.H.effect) + "x"],
                "prestige-button",
                "blank",
                ["display-text", () => "You have a best of " + format(player.H.best) + " Experiments."],
                "blank",
                "milestones",
                "blank",
                "upgrades",
            ]
        },
        "Challenges": {
            content: [
                ["display-text", () => "You have " + colored("E", format(player.H.points)) + " Humans,<br> which boosts Infects, Experiments, and Crystal gain by " + format(tmp.H.effect) + "x"],
                "prestige-button",
                "blank",
                "challenges",
            ]
        },
    },
    layerShown() {return true},
    layerShown() {
        return hasChallenge("E", 21) || player.H.points.gte(1) || player.H.unlocked;
        }, 

milestones: {
        11: {
            requirementDescription: "5 Humans",
            effectDescription() {
                let text = "Keep Crystal Upgrades on Reset";
                if (inChallenge("H", 11)) text = "Keep Crystal Upgrades on Reset (DISABLED)";
                return text;
              },
            done() { return player.H.points.gte(5) },
        },
        12: {
            requirementDescription: "30 Humans",
            effectDescription() {
                let text = "Passively gain 10x Experiments";
                if (inChallenge("H", 11)) text = "Passively gain 10x Experiments (DISABLED)";
                return text;
              },
            done() { return player.H.points.gte(30) },
        },
        13: {
            requirementDescription: "75 Humans",
            effectDescription() {
                let text = "Keep everything like in Fusions (Except Experiment Challenges)";
                return text;
              },
            done() { return player.H.points.gte(75) && hasMilestone('H', 12) },
        },
    },
challenges: {
        11: {
            name: "First Stance",
            challengeDescription: `
            They're scared and weak against them<br>
            But they presist against them.<br>
            Some Milestones are Disabled!<br>
            Crystal /1e15, Infect /1e15, Fusion & Experiment Effects are Disabled.`,
            goalDescription: "1 Crystals",
            rewardDescription: "Triple Fusion Effect!",
            canComplete: function() {return player.c.points.gte(1)},
            unlocked() {return player.H.points.gte(0)},
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
    },
})   
