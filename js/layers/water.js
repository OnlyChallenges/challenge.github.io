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
        let requirement = new Decimal(1e16)
        return requirement

    },
    position: 2,
    color: "#E2776A",
    resource: "water",
    baseResource: "powder",
    baseAmount() { return player.points },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    type: "normal",
    exponent() {
        let ex = new Decimal(0.24)
        return ex
    },
    gainMult() {
        let gain = new Decimal(0.7)
        return gain
    },
    gainExp() {
        let exp = new Decimal(1)
        return exp
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
            "upgrades"
        ],


    //Milestone Build Content
    milestones: {
        11: {
            requirementDescription: "HO (1 Water)",
            effectDescription: `+200% Particle Gain & -20% Feed Requirement`,
            done() { return player.W.points.gte(1) || hasUpgrade('W', 11) },
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
    },
})