addLayer("SP", {
    name: "Super Powder", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "SP", // This appears on the layer's node. Default is the id with the first letter capitalized|
    position: 1,
    startData() {
        return {
            unlocked: false,
            points: new Decimal(0),
            generation: new Decimal(0),
            generation2: new Decimal(0),
        }
    },
    requires() {
        let requirement = new Decimal(2500)
        if (player.F.unlocked) requirement = requirement.times(50)
        if (player.F.unlocked && player.SP.unlocked) requirement = requirement.div(50)
        if (hasUpgrade('F', 23)) requirement = requirement.div(upgradeEffect('F', 23))
        if (hasUpgrade('F', 25)) requirement = requirement.div(upgradeEffect('F', 25))
        if (hasMilestone('V', 14)) requirement = requirement.div(4)
        if (hasUpgrade('V', 16)) requirement = requirement.div(upgradeEffect('V', 16))
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
        if (hasUpgrade('V', 17)) eff = eff.times(upgradeEffect('V', 17))
        if (hasUpgrade('F', 34)) eff = eff.times(1.33)
        return eff;
    },
    effBase() {
        let base = new Decimal(1.4);
        return base;
    },
    update(diff) {
        if (player.SP.unlocked)
            player.SP.generation = player.SP.generation.plus(tmp.SP.effect.times(diff));
        if (player.SP.unlocked && hasUpgrade('F', 36))
            player.SP.generation2 = player.SP.generation2.plus(player.SP.generation.pow(0.01).times(diff));
    },

    generationExp() {
        let exp = new Decimal(1 / 6);
        return exp;
    },

    generation2Exp() {
        let exp1 = new Decimal(1 / 18);
        if (hasUpgrade('SP', 24)) exp1 = exp1.times(upgradeEffect('SP', 24))
        return exp1;
    },

    generationEff() {
        let gen = player.SP.generation.plus(1).pow(this.generationExp())
        if (!player.SP.unlocked) gen = new Decimal(1)
        if (hasUpgrade('F', 16)) gen = gen.times(upgradeEffect('F', 16))
        if (hasUpgrade('V', 15)) gen = gen.times(upgradeEffect('V', 15))
        return gen
    },

    generation2Eff() {
        let gen = player.SP.generation2.plus(1).pow(this.generation2Exp())
        if (!hasUpgrade('F', 36)) gen = new Decimal(1)
        if (hasUpgrade('SP', 23)) gen = gen.pow(1.2)
        return gen
    },

    canBuyMax() { return hasMilestone('F', 11) },


    tabFormat:
        ["main-display", "prestige-button",
            ["display-text", function () {
                return 'You have ' + format(player.SP.generation) + ' Super Power, which boosts Particle Gain, +' + format(tmp.SP.generationEff.minus(1).times(100)) + '%'
            }, {}],
            ["display-text", function () {
                if (hasUpgrade('F', 36)) return 'You have ' + format(player.SP.generation2) + ' Ultra Power, which boosts Powder Gain, +' + format(tmp.SP.generation2Eff.minus(1).times(100)) + '%'
            }, {}],
            "blank",
            "upgrades"
        ],


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
            description: "Super Super! Boost SP-II Effect by 110%",
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
                let effect1 = (player.SP.generation.max(1).add(1).pow(0.068)).max(1).min(14);
                return effect1
            },
            effectDisplay() {
                let capped = upgradeEffect(this.layer, this.id).gte(10) ? "(% Capped)" : "";
                let text = `+${format(upgradeEffect(this.layer, this.id).minus(1).times(100))}% ${capped}`;
                return text;
            },
            unlocked() { return hasUpgrade('SP', 14) },
        },
        21: {
            title: "Vaccine Super I",
            description: "Vaccine + Super? S²F-II Effect is better based on hover formula",
            cost: new Decimal(10),
            tooltip: "(Super Points + Vaccines / (Feed + 1))^0.3",
            currencyDisplayName: "Ultra Power",
            currencyInternalName: "generation2",
            currencyLayer: "SP",
            effect() {
                let effect1 = (((player.SP.points.add(player.V.points)).div(player.F.points.add(1))).max(1).add(1).pow(0.3)).max(1).min(19);
                return effect1
            },
            effectDisplay() {
                let text = `+${format(upgradeEffect(this.layer, this.id).minus(1).times(100))}%`;
                return text;
            },
            unlocked() { return hasUpgrade('SP', 15) && hasUpgrade('V', 11) },
        },
        22: {
            title: "Vaccine Super II",
            description: "Vaccine + Vaccine = Super 2? Ultra Power lowers Feed Requirement",
            cost: new Decimal(70),
            currencyDisplayName: "Ultra Power",
            currencyInternalName: "generation2",
            currencyLayer: "SP",
            effect() {
                let effect1 = (player.SP.generation2.max(1).add(1).pow(0.13)).max(1).min(44);
                return effect1
            },
            effectDisplay() {
                let text = `-${format(upgradeEffect(this.layer, this.id).minus(1).times(100))}%`;
                return text;
            },
            unlocked() { return hasUpgrade('SP', 21) },
        },
        23: {
            title: "Vaccine Super III",
            description: "VacVacVac = Super 3? Increase Ultra Power Effect by ^20%",
            cost: new Decimal(300),
            currencyDisplayName: "Ultra Power",
            currencyInternalName: "generation2",
            currencyLayer: "SP",
            unlocked() { return hasUpgrade('SP', 22) },
        },
        24: {
            title: "Vaccine Super IV",
            description: "Vac^Vac = Super 4? Increase Ultra Power Gain based on Super Power",
            cost: new Decimal(400),
            currencyDisplayName: "Ultra Power",
            currencyInternalName: "generation2",
            currencyLayer: "SP",
            effect() {
                let effect1 = (player.SP.generation.max(1).add(1).pow(0.08)).max(1).min(39);
                return effect1
            },
            effectDisplay() {
                let text = `+${format(upgradeEffect(this.layer, this.id).minus(1).times(100))}x%`;
                return text;
            },
            unlocked() { return hasUpgrade('SP', 23) },
        },
        25: {
            title: "Vaccine Super V",
            description: "Super^^Vac. 60% Vaccine Gain",
            cost: new Decimal(1000),
            currencyDisplayName: "Ultra Power",
            currencyInternalName: "generation2",
            currencyLayer: "SP",
            unlocked() { return hasUpgrade('SP', 24) },
        },
    },
})