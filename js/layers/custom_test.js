addLayer("F1", {
    name: "Floor 1", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "G", // This appears on the layer's node. Default is the id with the first letter capitalized
    startData() {
        return {
            unlocked: true,
            points: new Decimal(0),
        }
    },
    requires() {
        let requirement = new Decimal(25)
        return requirement

    },
    color: "#33AACC",
    resource: "Floor 1",
    baseResource: "money",
    baseAmount() { return player.points },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    type: "normal",
    exponent() {
        let ex = new Decimal(1.07)
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
    branches: ["F2"],
    hotkeys: [
        { key: "1", description: "1: Reset for Floor 1", onPress() { if (canReset(this.layer) && player.F1.unlocked) doReset(this.layer) } },
    ],
    layerShown() { return true },
    doReset(resettingLayer) {
        if (layers[resettingLayer].row > this.row) layerDataReset(this.layer);
    },

    //Build Content
    buyables: {
        11: {
            title: "Doubler",
            unlocked() { return true },
            cost(x) {
                let exp1 = new Decimal(1.05)
                let exp2 = new Decimal(1.005)
                let costdef = new Decimal(1)
                if (getBuyableAmount(this.layer, this.id).gte(25)) exp2 = exp2.add(0.005)
                if (getBuyableAmount(this.layer, this.id).gte(50)) exp2 = exp2.add(0.010)
                if (getBuyableAmount(this.layer, this.id).gte(75)) exp2 = exp2.add(0.015)
                if (getBuyableAmount(this.layer, this.id).gte(150)) exp2 = exp2.add(0.025)
                return new Decimal(costdef).mul(Decimal.pow(exp1, x)).mul(Decimal.pow(x, Decimal.pow(exp2, x))).floor()
            },
            display() {
                return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Floor 1" + "<br>Bought: " + getBuyableAmount(this.layer, this.id) + "<br>Effect: Double Money Gain"
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
            title: "Tripler",
            unlocked() { return true },
            cost(x) {
                let exp1 = new Decimal(1.05)
                let exp2 = new Decimal(1.005)
                let costdef = new Decimal(15000)
                if (getBuyableAmount(this.layer, this.id).gte(25)) exp2 = exp2.add(0.005)
                if (getBuyableAmount(this.layer, this.id).gte(50)) exp2 = exp2.add(0.010)
                if (getBuyableAmount(this.layer, this.id).gte(75)) exp2 = exp2.add(0.015)
                if (getBuyableAmount(this.layer, this.id).gte(150)) exp2 = exp2.add(0.025)
                return new Decimal(costdef).mul(Decimal.pow(exp1, x)).mul(Decimal.pow(x, Decimal.pow(exp2, x))).floor()
            },
            display() {
                return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Floor 1" + "<br>Bought: " + getBuyableAmount(this.layer, this.id) + "<br>Effect: Triple Money Gain"
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
                let base1 = new Decimal(3)
                let base2 = x
                let expo = new Decimal(1)
                let eff = base1.pow(Decimal.pow(base2, expo))
                return eff
            },
        },
    },
})
