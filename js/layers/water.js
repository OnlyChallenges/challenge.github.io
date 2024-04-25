addLayer("W", {
    name: "Water", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "W", // This appears on the layer's node. Default is the id with the first letter capitalized
    startData() {
        return {
            unlocked: false,
            points: new Decimal(0),
            generation: new Decimal(0),
        }
    },
    requires() {
        let requirement = new Decimal(9.99e19)
        return requirement

    },
    position: 2,
    color: "#E2776A",
    resource: "water",
    baseResource: "powder",
    baseAmount() { return player.P.points },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    type: "normal",
    exponent() {
        let ex = new Decimal(0.1)
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
    effect() {
        if (!player.W.unlocked)
            return new Decimal(0)
        let eff = Decimal.pow(this.effBase(), player.W.points).sub(1).max(0);
        return eff;
    },
    effBase() {
        let base = new Decimal(1.25);
        return base;
    },
    effectDescription() {
        dis = "which is generating " + format(tmp.W.effect) + " Liquid/sec"
        return dis
    },
    update(diff) {
        if (player.W.unlocked)
            player.W.generation = player.W.generation.plus(tmp.W.effect.times(diff));
    },

    generationExp() {
        let exp = new Decimal(1 / 7);
        return exp;
    },

    generationEff() {
        let gen = player.W.generation.plus(1).pow(this.generationExp())
        if (!player.W.unlocked) gen = new Decimal(1)
        return gen
    },


    hotkeys: [
        { key: "w", description: "w: Reset for Water", onPress() { if (canReset(this.layer) && player.W.unlocked) doReset(this.layer) } },
    ],
    layerShown() { return hasMilestone('V', 14) || player.W.unlocked },
    doReset(resettingLayer) {
        if (layers[resettingLayer].row > this.row) layerDataReset(this.layer)
    },

    tabFormat:
        ["main-display", "prestige-button",
            ["display-text", function () {
                return 'You have ' + format(player.W.generation) + ' Liquid, which lowers Super Powder Requirement by -' + format(tmp.W.generationEff.minus(1).times(100)) + '%'
            }, {}],
            "blank",
            "blank",
            "milestones",
            "blank",
            "buyables",
            "blank",
            "upgrades",
        ],


    //Milestone Build Content
    milestones: {
        11: {
            requirementDescription: "HO (1 Water)",
            effectDescription: `+200% Particle Gain & -20% Feed Requirement`,
            done() { return player.W.points.gte(1) || hasUpgrade('W', 11) },
        },
        12: {
            requirementDescription: "H3O (3 Water)",
            effectDescription: `Unlock 5 more Powder Upgrades<br>Ontop of that; keep the Feed Milestone`,
            done() { return player.W.points.gte(3) },
            unlocked() { return hasMilestone('W', 11) },
        },
    },
    buyables: {
        11: {
            title: "Watery Intentions",
            unlocked() { return true },
            cost(x) {
                let exp1 = new Decimal(1.1)
                let exp2 = new Decimal(1.101)
                let costdef = new Decimal(1)
                if (getBuyableAmount(this.layer, this.id).gte(45)) exp2 = exp2.add(0.014)
                return new Decimal(costdef).mul(Decimal.pow(exp1, x)).mul(Decimal.pow(x, Decimal.pow(exp2, x))).floor()
            },
            display() {
                return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Water" + "<br>Bought: " + getBuyableAmount(this.layer, this.id) + "<br>Effect: Boost Particle gain by x" + format(buyableEffect(this.layer, this.id))
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
                let base1 = new Decimal(1.3)
                let base2 = x
                let expo = new Decimal(1.012)
                let eff = base1.pow(Decimal.pow(base2, expo))
                return eff
            },
        },
        12: {
            title: "Diluted Water",
            unlocked() { return true },
            cost(x) {
<<<<<<< HEAD
                let exp1 = new Decimal(1.4)
                let exp2 = new Decimal(1.105)
                let costdef = new Decimal(1)
                if (getBuyableAmount(this.layer, this.id).gte(45)) exp2 = exp2.add(0.014)
                return new Decimal(costdef).mul(Decimal.pow(exp1, x)).mul(Decimal.pow(x , Decimal.pow(exp2 , x))).floor()
            },
            display() {
                return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Water" + "<br>Bought: " + getBuyableAmount(this.layer, this.id) + "<br>Effect: Boost Powder gain by 1.5^x <br> Current Effect: x" + format(buyableEffect(this.layer, this.id))
=======
                let exp1 = new Decimal(1.3)
                let exp2 = new Decimal(1.105)
                let costdef = new Decimal(1)
                if (getBuyableAmount(this.layer, this.id).gte(45)) exp2 = exp2.add(0.005)
                return new Decimal(costdef).mul(Decimal.pow(exp1, x)).mul(Decimal.pow(x, Decimal.pow(exp2, x))).floor()
            },
            display() {
                return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Water" + "<br>Bought: " + getBuyableAmount(this.layer, this.id) + "<br>Effect: Boost Powder Gain by 1.5^x<br>Current Effect: x" + format(buyableEffect(this.layer, this.id))
>>>>>>> 645b6e6c9ca385b5361277196b486953458cad06
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
                let base1 = new Decimal(1.5)
                let base2 = x
<<<<<<< HEAD
                let expo = new Decimal(1.000)
=======
                let expo = new Decimal(1)
>>>>>>> 645b6e6c9ca385b5361277196b486953458cad06
                let eff = base1.pow(Decimal.pow(base2, expo))
                return eff
            },
        },
    },
    //Build Content
    upgrades: {
        rows: 7,
        cols: 7,
        11: {
            title: "Type I",
            description: "^7.5% Particle Gain & ^3.5% Powder Gain",
            cost: new Decimal(1),
        },
        12: {
            title: "Type II",
            description: "Lower Vaccine Requirement by 250%",
            cost: new Decimal(1),
            unlocked() { return hasUpgrade('W', 11) },
        },
        13: {
            title: "Type III",
            description: "Boost Powder Gain on a lackluster effect",
            cost: new Decimal(3),
            effect() {
                let effect1 = (player.points.max(1).add(1).pow(0.004)).max(1).min(10);
                return effect1
            },
            effectDisplay() {
                let text = `+${format(upgradeEffect(this.layer, this.id).minus(1).times(100))}%`;
                return text;
            },
            unlocked() { return hasUpgrade('W', 12) },
        },
    },
})