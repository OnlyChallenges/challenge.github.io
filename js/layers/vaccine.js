addLayer("V", {
    name: "Vaccines", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "V", // This appears on the layer's node. Default is the id with the first letter capitalized
    startData() {
        return {
            unlocked: false,
            points: new Decimal(0),
        }
    },
    requires() {
        let requirement = new Decimal(1e9)
        return requirement

    },

    color: "#CD33B2",
    resource: "vaccines",
    baseResource: "particles",
    baseAmount() { return player.points },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    type: "normal",
    exponent() {
        let ex = new Decimal(0.35)
        return ex
    },
    gainMult() {
        let gain = new Decimal(1)
        return gain
    },
    gainExp() {
        let exp = new Decimal(1)
        return exp
    },
    hotkeys: [
        { key: "v", description: "v: Reset for Vaccines", onPress() { if (canReset(this.layer) && player.P.unlocked) doReset(this.layer) } },
    ],
    layerShown() { return hasAchievement('A', 17) },
    doReset(resettingLayer) {
        if (layers[resettingLayer].row > this.row) layerDataReset(this.layer)
    },

    //Milestone Build Content
    milestones: {
        11: {
            requirementDescription: "<server>C</server> (1 Vaccines)",
            effectDescription: `Keep all Powder Upgrades on all resets`,
            done() { return player.V.points.gte(1) || hasUpgrade('V', 11) },
        },
        12: {
            requirementDescription: "<server>U</server> (4 Vaccines)",
            effectDescription: `+450% Super Power Generation`,
            done() { return player.V.points.gte(4) },
            unlocked() { return hasMilestone('V', 11) },
        },
        13: {
            requirementDescription: "<server>R</server> (22 Vaccines)",
            effectDescription: `+^7.5% Super Power Effect`,
            done() { return player.V.points.gte(22) },
            unlocked() { return hasMilestone('V', 12) },
        },
        14: {
            requirementDescription: "<server>E</server> (165 Vaccines)",
            effectDescription: `Lower Super Powder Requirement by 400%<br>Also unlock the next layer.`,
            done() { return player.V.points.gte(165) },
            unlocked() { return hasMilestone('V', 13) },
        },
    },
    //Build Content
    upgrades: {
        rows: 5,
        cols: 5,
        11: {
            title: "<server>V</server>",
            description: "Boost Particle gain by 750%",
            cost: new Decimal(1),
        },
        12: {
            title: "<rainbow>A</rainbow>",
            description: "Boost Powder gain by 600%",
            cost: new Decimal(2),
            unlocked() { return hasUpgrade('V', 11) },
        },
        13: {
            title: "<rainbow>C</rainbow>",
            description: "Passively Gain Powder based on <ruins>Vaccines</ruins><br>(Capped at +1,000% OR 1e10 Powder)",
            cost: new Decimal(3),
            unlocked() { return hasUpgrade('V', 12) },
            effect() {
                let effect1 = (player.V.points.max(1).add(1).pow(0.3)).max(1).min(10);
                if (player.P.points > 1e10) effect1 = new Decimal(0)
                return effect1
            },
            effectDisplay() {
                let text = `+${format(upgradeEffect(this.layer, this.id).minus(1).times(100))}%`;
                if (player.P.points > 1e10) text = `+0.00%`;
                return text;
            },
        },
        14: {
            title: "<rainbow>C</rainbow>",
            description: "Vaccines lower Feed Requirement (Capped at -15,000%)",
            cost: new Decimal(5),
            unlocked() { return hasUpgrade('V', 13) },
            effect() {
                let effect1 = (player.V.points.max(1).add(1).pow(0.13)).max(1).min(151);
                if (effect1 > 151) effect1 = new Decimal(151)
                return effect1
            },
            effectDisplay() {
                let text = `-${format(upgradeEffect(this.layer, this.id).minus(1).times(100))}%`;
                return text;
            },
        },
        15: {
            title: "<rainbow>I</rainbow>",
            description: "Vaccines boosts Super Power Effect",
            cost: new Decimal(8),
            unlocked() { return hasUpgrade('V', 14) },
            effect() {
                let effect1 = (player.V.points.max(1).add(1).pow(0.24)).max(1).min(20);
                return effect1
            },
            effectDisplay() {
                let text = `+${format(upgradeEffect(this.layer, this.id).minus(1).times(100))}%`;
                return text;
            },
        },
        16: {
            title: "<rainbow>N</rainbow>",
            description: "Super Power lowers Super Point Requirement",
            cost: new Decimal(10),
            unlocked() { return hasUpgrade('V', 15) },
            effect() {
                let effect1 = (player.SP.generation.max(1).add(1).pow(0.15)).max(1).min(40);
                return effect1
            },
            effectDisplay() {
                let text = `-${format(upgradeEffect(this.layer, this.id).minus(1).times(100))}%`;
                return text;
            },
        },
    },
})