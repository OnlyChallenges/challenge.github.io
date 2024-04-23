addLayer("F3", {
    name: "Floor 3", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "F3", // This appears on the layer's node. Default is the id with the first letter capitalized
    startData() {
        return {
            unlocked: false,
            points: new Decimal(0),
        }
    },
    requires() {
        let requirement = new Decimal("1e850")
        return requirement

    },
    color: "#a86932",
    resource: "Floor 3",
    baseResource: "Floor 2",
    baseAmount() { return player.F1.points },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    type: "normal",
    exponent() {
        let ex = new Decimal(0.9)
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
        { key: "2", description: "2: Reset for Floor 2", onPress() { if (canReset(this.layer) && player.F2.unlocked) doReset(this.layer) } },
    ],
    layerShown() { return true },
    doReset(resettingLayer) {
        if (layers[resettingLayer].row > this.row) layerDataReset(this.layer);
    },

    //Build Content
    buyables: {
        11: {
            title: "Doubler Doubler",
            unlocked() { return true },
            cost(x) {
                let exp1 = new Decimal(1.1)
                let exp2 = new Decimal(1.005)
                let costdef = new Decimal(1)
                if (getBuyableAmount(this.layer, this.id).gte(25)) exp2 = exp2.add(0.007)
                if (getBuyableAmount(this.layer, this.id).gte(50)) exp2 = exp2.add(0.011)
                if (getBuyableAmount(this.layer, this.id).gte(75)) exp2 = exp2.add(0.016)
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
                return eff
            },
        },
        12: {
            title: "Tripler Doubler",
            unlocked() { return true },
            cost(x) {
                let exp1 = new Decimal(1.05)
                let exp2 = new Decimal(1.005)
                let costdef = new Decimal(15000)
                if (getBuyableAmount(this.layer, this.id).gte(25)) exp2 = exp2.add(0.009)
                if (getBuyableAmount(this.layer, this.id).gte(50)) exp2 = exp2.add(0.011)
                if (getBuyableAmount(this.layer, this.id).gte(75)) exp2 = exp2.add(0.015)
                if (getBuyableAmount(this.layer, this.id).gte(150)) exp2 = exp2.add(0.025)
                return new Decimal(costdef).mul(Decimal.pow(exp1, x)).mul(Decimal.pow(x, Decimal.pow(exp2, x))).floor()
            },
            display() {
                return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Floor 2" + "<br>Bought: " + getBuyableAmount(this.layer, this.id) + "<br>Effect: Triple-Double Floor 2 Gain"
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
        },
        13: {
            title: "Tripler Tripler",
            unlocked() { return true },
            cost(x) {
                let exp1 = new Decimal(1.05)
                let exp2 = new Decimal(1.005)
                let costdef = new Decimal(1e25)
                if (getBuyableAmount(this.layer, this.id).gte(25)) exp2 = exp2.add(0.005)
                if (getBuyableAmount(this.layer, this.id).gte(50)) exp2 = exp2.add(0.010)
                if (getBuyableAmount(this.layer, this.id).gte(75)) exp2 = exp2.add(0.015)
                if (getBuyableAmount(this.layer, this.id).gte(150)) exp2 = exp2.add(0.025)
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
        },
    },
})
