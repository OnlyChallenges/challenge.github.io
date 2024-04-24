addLayer("F2", {
    name: "Floor 2", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "F2", // This appears on the layer's node. Default is the id with the first letter capitalized
    startData() {
        return {
            unlocked: false,
            points: new Decimal(0),
        }
    },
    requires() {
        let requirement = new Decimal(1e90)
        return requirement

    },
    nodeStyle() {
        return {
            "background": (player.F2.unlocked || canReset("F2")) ? "radial-gradient(#ACC233, #4dc233)" : "#bf8f8f",
        }
    },
    componentStyles: {
        "prestige-button": {
            background() {
                return (canReset("F2")) ? "radial-gradient(#ACC233, #4dc233" : "#bf8f8f"
            },
        },
    },
    color: "#ACC233",
    resource: "Floor 2",
    baseResource: "Floor 1",
    baseAmount() { return player.F1.points },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    type: "normal",
    exponent() {
        let ex = new Decimal(0.98)
        return ex
    },
    gainMult() {
        let gain = new Decimal(1)
        if (getBuyableAmount('F2', 12).gte(1)) gain = gain.times(buyableEffect('F2', 12))
        return gain
    },
    gainExp() {
        let exp = new Decimal(1)
        return exp
    },
    branches: ["F3"],
    hotkeys: [
        { key: "2", description: "2: Reset for Floor 2", onPress() { if (canReset(this.layer) && player.F2.unlocked) doReset(this.layer) } },
    ],
    layerShown() { return true },
    doReset(resettingLayer) {
        if (layers[resettingLayer].row > this.row) layerDataReset(this.layer);
    },
    automate() {
        if (player.F3.unlocked) {
            if (layers.F2.buyables[11].canAfford()) {
                    layers.F2.buyables[11].buy();
            };
        };
        if (player.F3.unlocked) {
            if (layers.F2.buyables[12].canAfford()) {
                    layers.F2.buyables[12].buy();
            };
        };
        if (player.F3.unlocked) {
            if (layers.F2.buyables[13].canAfford()) {
                    layers.F2.buyables[13].buy();
            };
        };
    },


    //Build Content
    buyables: {
        11: {
            title: "Doubler Doubler",
            unlocked() { return true },
            cost(x) {
                let exp1 = new Decimal(1.12)
                let exp2 = new Decimal(1.005)
                let costdef = new Decimal(1)
                if (getBuyableAmount(this.layer, this.id).gte(25)) exp2 = exp2.add(0.007)
                if (getBuyableAmount(this.layer, this.id).gte(50)) exp2 = exp2.add(0.011)
                if (getBuyableAmount(this.layer, this.id).gte(75)) exp2 = exp2.add(0.014)
                if (getBuyableAmount(this.layer, this.id).gte(150)) exp2 = exp2.add(0.025)
                return new Decimal(costdef).mul(Decimal.pow(exp1, x)).mul(Decimal.pow(x, Decimal.pow(exp2, x))).floor()
            },
            display() {
                return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Floor 2" + "<br>Bought: " + getBuyableAmount(this.layer, this.id) + "<br>Effect: Double Money Gain"
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
                let base1 = new Decimal(2)
                let base2 = x
                let expo = new Decimal(1)
                let eff = base1.pow(Decimal.pow(base2, expo))
                if ((getBuyableAmount('F3', 21)).gte(1)) eff = eff.pow(buyableEffect('F3', 14))
                return eff
            },
            style() {
                return {
                    background: (tmp[this.layer].buyables[this.id].canAfford ? "radial-gradient(#ACC233, #4dc233)" : "#bf8f8f"),
                }
            },
        },
        12: {
            title: "Tripler Doubler",
            unlocked() { return true },
            cost(x) {
                let exp1 = new Decimal(1.07)
                let exp2 = new Decimal(1.005)
                let costdef = new Decimal(15000)
                if (getBuyableAmount(this.layer, this.id).gte(25)) exp2 = exp2.add(0.009)
                if (getBuyableAmount(this.layer, this.id).gte(50)) exp2 = exp2.add(0.011)
                if (getBuyableAmount(this.layer, this.id).gte(150)) exp2 = exp2.add(0.015)
                if (getBuyableAmount(this.layer, this.id).gte(300)) exp2 = exp2.add(0.025)
                return new Decimal(costdef).mul(Decimal.pow(exp1, x)).mul(Decimal.pow(x, Decimal.pow(exp2, x))).floor()
            },
            display() {
                return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Floor 2" + "<br>Bought: " + getBuyableAmount(this.layer, this.id) + "<br>Effect: Triple-Double Floor 1 Gain"
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
                let base1 = new Decimal(6)
                let base2 = x
                let expo = new Decimal(1)
                let eff = base1.pow(Decimal.pow(base2, expo))
                return eff
            },
            style() {
                return {
                    background: (tmp[this.layer].buyables[this.id].canAfford ? "radial-gradient(#ACC233, #4dc233)" : "#bf8f8f"),
                }
            },
        },
        13: {
            title: "Tripler Tripler",
            unlocked() { return true },
            cost(x) {
                let exp1 = new Decimal(1.09)
                let exp2 = new Decimal(1.005)
                let costdef = new Decimal(1e25)
                if (getBuyableAmount(this.layer, this.id).gte(25)) exp2 = exp2.add(0.005)
                if (getBuyableAmount(this.layer, this.id).gte(50)) exp2 = exp2.add(0.010)
                if (getBuyableAmount(this.layer, this.id).gte(250)) exp2 = exp2.add(0.015)
                if (getBuyableAmount(this.layer, this.id).gte(350)) exp2 = exp2.add(0.025)
                return new Decimal(costdef).mul(Decimal.pow(exp1, x)).mul(Decimal.pow(x, Decimal.pow(exp2, x))).floor()
            },
            display() {
                return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Floor 2" + "<br>Bought: " + getBuyableAmount(this.layer, this.id) + "<br>Effect: Triple-Triple Money Gain"
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
                let base1 = new Decimal(9)
                let base2 = x
                let expo = new Decimal(1)
                let eff = base1.pow(Decimal.pow(base2, expo))
                return eff
            },
            style() {
                return {
                    background: (tmp[this.layer].buyables[this.id].canAfford ? "radial-gradient(#ACC233, #4dc233)" : "#bf8f8f"),
                }
            },
        },
    },
})
