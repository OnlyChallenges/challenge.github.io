addLayer("SP", {
    name: "Super Powder", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "SP", // This appears on the layer's node. Default is the id with the first letter capitalized|
    position: 1,
    startData() {
        return {
            unlocked: true,
            points: new Decimal(0),
            generation: new Decimal(0),
        }
    },
    requires() {
        let requirement = new Decimal(2500)
        if (player.F.unlocked) requirement = requirement.times(50)
        if (player.F.unlocked && player.SP.unlocked) requirement = requirement.div(50)
        return requirement

    },

    color: "#a733dc",
    resource: "super powder",
    baseResource: "particles",
    baseAmount() { return player.points },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    type: "static",
    exponent() {
        let ex = new Decimal(1.5)
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
    effectDescription() {
        dis = "which is generating " + format(tmp.SP.effect) + " Super Power/sec"
        return dis
    },
    hotkeys: [
        { key: "s", description: "S: Reset for Super Powder", onPress() { if (canReset(this.layer) && player.SP.unlocked) doReset(this.layer) } },
    ],
    layerShown() { return hasUpgrade('P', 23) || player.SP.unlocked },

    effect() {
        if (!player.SP.unlocked)
            return new Decimal(0)
        let eff = Decimal.pow(this.effBase(), player.SP.points).sub(1).max(0);
        return eff;
    },
    effBase() {
        let base = new Decimal(1.2);
        return base;
    },
    update(diff) {
        if (player.SP.unlocked)
            player.SP.generation = player.SP.generation.plus(tmp.SP.effect.times(diff));
    },

    generationExp() {
        let exp = new Decimal(1 / 8);
        return exp;
    },

    generationEff() {
        if (!player.SP.unlocked)
            return new Decimal(1);
        return player.SP.generation.plus(1).pow(this.generationExp());
    },



    tabFormat: ["main-display", "prestige-button", ["display-text", function() {
        return 'You have ' + format(player.A.power) + ' Super Power, which boosts Particle Gain by +' + format(tmp.SP.generationEff.minus(1).times(100)) + '%'
    },{}], "blank", "upgrades"],


    //Build Content
    upgrades: {
        rows: 5,
        cols: 5,
        11: {
            title: "Feed I",
            description: "Feeding! Boost Particle Gain by 50%",
            cost: new Decimal(1),
        },
        12: {
            title: "Feed II",
            description: "2nd Feed! Decrease Feed Requirement & Boost NP-IV by 40%.",
            cost: new Decimal(2),
            unlocked() { return hasUpgrade('F', 11) },
        },
        13: {
            title: "Feed III",
            description: "Three Feeders? Boost Powder Gain by 40%, ^1.05 Particle Gain",
            cost: new Decimal(7500),
            currencyDisplayName: "Particles",
            currencyInternalName: "points",
            unlocked() { return hasUpgrade('F', 12) },
        },
    },
})