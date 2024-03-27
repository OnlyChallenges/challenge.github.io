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
        let ex = new Decimal(0.87)
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
    },
})