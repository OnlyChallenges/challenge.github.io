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
        if (hasUpgrade('F', 34)) requirement = requirement.div(upgradeEffect('F', 34))
        if (hasUpgrade('W', 11)) requirement = requirement.div(2.5)
        return requirement

    },
    branches: ["W"],
    nodeStyle() {
        return {
            "background": (player.V.unlocked || canReset("V")) ? "radial-gradient(#CD33B2, #ba1356)" : "#bf8f8f",
        }
    },
    componentStyles: {
        "prestige-button": {
            background() {
                return (canReset("V")) ? "radial-gradient(#CD33B2, #ba1356)" : "#bf8f8f"
            },
        },
    },
    position: 1,
    nodeStyle() {
        return {
            "background": (player.V.unlocked || canReset("V")) ? "radial-gradient(#CD33B2, #651791)" : "#bf8f8f",
        }
    },
    componentStyles: {
        "prestige-button": {
            background() {
                return (canReset("V")) ? "radial-gradient(#CD33B2, #651791)" : "#bf8f8f"
            },
        },
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
        if (hasUpgrade('SP', 25)) gain = gain.times(1.6)
        return gain
    },
    gainExp() {
        let exp = new Decimal(1)
        return exp
    },
    hotkeys: [
        { key: "v", description: "v: Reset for Vaccines", onPress() { if (canReset(this.layer) && player.V.unlocked) doReset(this.layer) } },
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
            effectDescription: `+^7.5% Super Power Effect<br> Add 3 More Feed Upgrades`,
            done() { return player.V.points.gte(22) },
            unlocked() { return hasMilestone('V', 12) },
        },
        14: {
            requirementDescription: "<server>E</server> (165 Vaccines)",
            effectDescription: `Lower Super Powder Requirement by 400%<br>Also unlock the next layer.`,
            done() { return player.V.points.gte(165) },
            unlocked() { return hasMilestone('V', 13) },
        },
        15: {
            requirementDescription: "<logic>Special</logic> (S²F-VI Unlocked)",
            effectDescription: `Keep S²F-VI on Resets before Vaccines`,
            done() { return hasUpgrade('F', 36) },
            unlocked() { return hasMilestone('V', 13) },
        
        },
    },

    buyables: {
        11: {
            title: "Powdery Boost",
            unlocked() { return true },
            cost(x) {
                let exp1 = new Decimal(1.1)
                let exp2 = new Decimal(1.02)
                let costdef = new Decimal(100)
                let spec = new Decimal(costdef).mul(Decimal.pow(exp1, x)).mul(Decimal.pow(x, Decimal.pow(exp2, x))).add(costdef).floor()
                return spec
            },
            display() {
                return "Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Vaccines<br>Effect: Boost Powder gain by ^1.05 per purchase<br>Purchase Limit: " + getBuyableAmount(this.layer, this.id) + "/" + formatWhole(tmp[this.layer].buyables[this.id].purchaseLimit) + "<br> To increase the purchase limit, you need 1e^x Achievement Points."
            },
            purchaseLimit() {
                let pur = new Decimal.log10(tmp.A.aP).floor()
                return pur
            },
            canAfford() {
                return player[this.layer].points.gte(this.cost())
            },
            buy() {
                let cost = new Decimal(1)
                player[this.layer].points = player[this.layer].points.sub(this.cost().mul(cost))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                let base1 = new Decimal(1.05)
                let base2 = x
                let expo = new Decimal(1)
                let eff = base1.pow(Decimal.pow(base2, expo))
                return eff
            },
            style() {
                return {
                    background: (tmp[this.layer].buyables[this.id].canAfford ? "radial-gradient(#CD33B2, #ba1356)" : "#bf8f8f"),
                }
            },
        },
    },

    //Build Content
    upgrades: {
        rows: 7,
        cols: 7,
        11: {
            title: "<rainbowr>V</rainbow>",
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
        17: {
            title: "<rainbow>E</rainbow>",
            description: "Vaccines boost Super Power Generatione (Multiplicative)",
            cost: new Decimal(13),
            unlocked() { return hasUpgrade('V', 16) },
            effect() {
                let effect1 = (player.V.points.max(1).pow(0.2)).max(1).min(99);
                return effect1
            },
            effectDisplay() {
                let text = `+${format(upgradeEffect(this.layer, this.id))}x`;
                return text;
            },
        },
    },
})