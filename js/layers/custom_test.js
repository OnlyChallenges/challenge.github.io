addLayer("P", {
    name: "Powder", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    startData() {
        return {
            unlocked: true,
            points: new Decimal(0),
        }
    },
    requires() {
        let requirement = new Decimal(5)
        if (hasUpgrade('P', 12)) requirement = requirement.minus(1.2)

        return requirement

    },

    color: "#FFFFFF",
    resource: "powder",
    baseResource: "particles",
    baseAmount() { return player.points },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    type: "normal",
    exponent() {
        let ex = new Decimal(1.07)
        return ex
    },
    gainMult() {
        let gain = new Decimal(1)
        if (hasUpgrade('P', 13)) gain = gain.minus(0.075)
        if (hasUpgrade('P', 15)) gain = gain.minus(0.025)
        if (hasUpgrade('P', 22)) gain = gain.add(upgradeEffect('P', 22))
        if (hasUpgrade('F', 14)) gain = gain.times(upgradeEffect('F', 14))
        if (hasUpgrade('P', 24)) gain = gain.times(upgradeEffect('P', 24))
        if (hasUpgrade('F', 21)) gain = gain.times(upgradeEffect('F', 21))
        if (hasUpgrade('V', 12)) gain = gain.times(6)
        return gain
    },
    gainExp() {
        let exp = new Decimal(1)
        return exp
    },
    hotkeys: [
        { key: "p", description: "p: Reset for Powder", onPress() { if (canReset(this.layer) && player.P.unlocked) doReset(this.layer) } },
    ],
    layerShown() { return true },
    doReset(resettingLayer) {
        if (layers[resettingLayer].row > this.row) layerDataReset(this.layer)
        if (hasMilestone('V', 11)) player.P.upgrades.push("11", "12", "13", "14", "15", "21", "22", "23", "24", "25")
    },
    branches: ["F", "SP", "V"],
    infoboxes: {
        lore: {
            title: "Some stuff",
            body: `
            Hello!; Welcome to <ruins>Abyssal Demise</ruins>, I would like to clarify that this is indeed, still in beta.<br> 
            There will be multiple bugs, issues, and occurences as the game update, so please be patient!
            
            `,
        },
    },

    //Build Content
    upgrades: {
        rows: 5,
        cols: 5,
        11: {
            title: "Normal Powder I",
            description: "Some Simple Powder, boost Particle gain by 20%",
            cost: new Decimal(10),
        },
        12: {
            title: "Normal Powder II",
            description: "2nd Powder? Decrease Powder Requirement Slightly...",
            cost: new Decimal(15),
            unlocked() { return hasUpgrade('P', 11) },
        },
        13: {
            title: "Normal Powder III",
            description: "Particle User! Improve Particle Gain by 40% but decrease Powder gain by a smudge",
            cost: new Decimal(35),
            currencyDisplayName: "Particles",
            currencyInternalName: "points",
            unlocked() { return hasUpgrade('P', 12) },
        },
        14: {
            title: "Normal Powder IV",
            description: "More Particles! Boost Particles based on itself.",
            cost: new Decimal(40),
            effect() {
                let effect1 = (player.points.max(1).add(1).pow(0.09)).max(1).min(10);
                if (hasUpgrade('F', 12)) effect1 = effect1.times(3)
                return effect1
            },
            effectDisplay() {
                let capped = upgradeEffect(this.layer, this.id).gte(10) ? "(% Capped)" : "";
                let text = `+${format(upgradeEffect(this.layer, this.id).minus(1).times(100))}%${capped}`;
                return text;
            },
            unlocked() { return hasUpgrade('P', 13) },
        },
        15: {
            title: "Normal Powder V",
            description: "Powderis Movement? Decrease Powder Gain Even more, but increase Particle Gain by 70%",
            cost: new Decimal(150),
            currencyDisplayName: "Particles",
            currencyInternalName: "points",
            unlocked() { return hasUpgrade('P', 14) },
        },
        21: {
            title: "Saget Powder I",
            description: "<server>Boosts Particle Gain based on Powder</server>",
            cost: new Decimal(150),
            effect() {
                let effect1 = (player.P.points.max(1).add(1).pow(0.06)).max(1).min(5);
                if (hasUpgrade('F', 15)) effect1 = effect1.times(upgradeEffect('F', 15))
                return effect1
            },
            effectDisplay() {
                let capped = upgradeEffect(this.layer, this.id).gte(5) ? "(% Capped)" : "";
                let text = `+${format(upgradeEffect(this.layer, this.id).minus(1).times(100))}% ${capped}`;
                return text;
            },
            unlocked() { return hasUpgrade('P', 15) },
        },
        22: {
            title: "Saget Powder II",
            description: "<server>Powder is boosted based on itself (Additive)</server>",
            cost: new Decimal(300),
            currencyDisplayName: "Particles",
            currencyInternalName: "points",
            effect() {
                let effect1 = (player.P.points.max(1).add(1).pow(0.05)).max(1).min(3);
                if (hasUpgrade('SP', 12)) effect1 = effect1.times(2.1)
                return effect1
            },
            effectDisplay() {
                let text = `+${format(upgradeEffect(this.layer, this.id).minus(1))}`;
                return text;
            },
            unlocked() { return hasUpgrade('P', 21) },
        },
        23: {
            title: "Saget Powder III",
            description: "<server>Unlock Two Layers, also boost Particle Gain by ^3.5%</server>",
            cost: new Decimal(1000),
            unlocked() { return hasUpgrade('P', 22) },
        },
        24: {
            title: "Saget Powder IV",
            description: "<server>Let's keep going! Feed/Super Powder boosts Powder & Particles</server>",
            cost: new Decimal(10000),
            effect() {
                let effect1 = (player.F.points.add(player.SP.points).max(1).add(1).pow(0.22)).max(1).min(10);
                if (hasUpgrade('F', 22)) effect1 = effect1.times(upgradeEffect('F', 22))
                return effect1
            },
            effectDisplay() {
                let text = `+${format(upgradeEffect(this.layer, this.id).minus(1).times(100))}%`;
                return text;
            },
            unlocked() { return hasUpgrade('P', 23) && (player.F.unlocked || player.SP.unlocked) },
        },
        25: {
            title: "Saget Powder V",
            description: "<server>Particles boosts SF-III Reduction</server>",
            cost: new Decimal(1650000),
            effect() {
                let effect1 = (player.points.max(1).add(1).pow(0.065)).max(1).min(20);
                return effect1
            },
            effectDisplay() {
                let capped = upgradeEffect(this.layer, this.id).gte(20) ? "(Capped)" : "";
                let text = `+${format(upgradeEffect(this.layer, this.id).minus(1).times(100))}% ${capped}`;
                return text;
            },
            unlocked() { return hasUpgrade('P', 24) && (hasUpgrade('F', 23)) },
        },
    },
})
