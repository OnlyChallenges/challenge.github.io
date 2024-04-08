addLayer("SP", {
    name: "Super Powder", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "SP", // This appears on the layer's node. Default is the id with the first letter capitalized|
    position: 1,
    startData() {
        return {
            unlocked: false,
            points: new Decimal(0),
            generation: new Decimal(0),
        }
    },
    requires() {
        let requirement = new Decimal(2500)
        if (player.F.unlocked) requirement = requirement.times(50)
        if (player.F.unlocked && player.SP.unlocked) requirement = requirement.div(50)
        if (hasUpgrade('F', 23)) requirement = requirement.div(upgradeEffect('F', 23))
        if (hasUpgrade('F', 25)) requirement = requirement.div(upgradeEffect('F', 25))
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
    layerShown() { return hasUpgrade('P', 23) || player.SP.unlocked || player.F.unlocked },

    effect() {
        if (!player.SP.unlocked)
            return new Decimal(0)
        let eff = Decimal.pow(this.effBase(), player.SP.points).sub(1).max(0);
        if (hasUpgrade('F', 26)) eff = eff.times(upgradeEffect('F', 26))
        if (hasMilestone('V', 12)) eff = eff.times(4.5)
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
        let exp = new Decimal(1 / 7);
        return exp;
    },

    generationEff() {
        let gen = player.SP.generation.plus(1).pow(this.generationExp())
        if (!player.SP.unlocked) gen = new Decimal(1)
        if (hasUpgrade('F', 16)) gen = gen.times(upgradeEffect('F', 16))
        return gen
    },



    tabFormat: ["main-display", "prestige-button", ["display-text", function () {
        return 'You have ' + format(player.SP.generation) + ' Super Power, which boosts Particle Gain, +' + format(tmp.SP.generationEff.minus(1).times(100)) + '%'
    }, {}], "blank", "upgrades"],


    //Build Content
    upgrades: {
        rows: 5,
        cols: 5,
        11: {
            title: "Super I",
            description: "Super! Boost Particle Gain by 50%",
            cost: new Decimal(100),
            currencyDisplayName: "Super Power",
            currencyInternalName: "generation",
            currencyLayer: "SP",
        },
        12: {
            title: "Super II",
            description: "Super Super! Boost SP-II Effect by 30%",
            cost: new Decimal(650),
            currencyDisplayName: "Super Power",
            currencyInternalName: "generation",
            currencyLayer: "SP",
            unlocked() { return hasUpgrade('SP', 11) },
        },
        13: {
            title: "Super III",
            description: "Super³! Boost Particle Gain by 200%",
            cost: new Decimal(2500),
            currencyDisplayName: "Super Power",
            currencyInternalName: "generation",
            currencyLayer: "SP",
            unlocked() { return hasUpgrade('SP', 12) },
        },
        14: {
            title: "Super IV",
            description: "Super^Super! Increase Super Power Effect by 45%",
            cost: new Decimal(32500),
            currencyDisplayName: "Super Power",
            currencyInternalName: "generation",
            currencyLayer: "SP",
            unlocked() { return hasUpgrade('SP', 13) },
        },
        15: {
            title: "Super V",
            description: "Super*Super⁴! Increase F-IV Effect based on Super Power Points",
            cost: new Decimal(50000),
            currencyDisplayName: "Super Power",
            currencyInternalName: "generation",
            currencyLayer: "SP",
            effect() {
                let effect1 = (player.SP.generation.max(1).add(1).pow(0.068)).max(1).min(10);
                return effect1
            },
            effectDisplay() {
                let capped = upgradeEffect(this.layer, this.id).gte(10) ? "(% Capped)" : "";
                let text = `+${format(upgradeEffect(this.layer, this.id).minus(1).times(100))}% ${capped}`;
                return text;
            },
            unlocked() { return hasUpgrade('SP', 14) },
        },
    },
})