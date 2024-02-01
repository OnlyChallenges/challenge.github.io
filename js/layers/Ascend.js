addLayer("A", {
    name: "Ascension", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "A", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    color: "#fc3535",
    requires(){ 
        let requirement = new Decimal(150)
        return requirement
    },
    resource: "Ascension points", // Name of prestige currency
    baseResource: "juggling prestige points", // Name of resource prestige is based on
    baseAmount() {return player.jP.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.3, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        let mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    effectDescription() {
        dis = "which are generating " + format(tmp.A.effect) + " Ascension Power/sec"
        return dis
    },
    passiveGeneration(){
        let passive = new Decimal(0)
        return passive
    },
    row: 10, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "A", description: "Shift + a: Reset for Ascension", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return hasUpgrade('jP', 17) || player.A.unlocked},

    effect() {
        if (!player.A.unlocked)
            return new Decimal(0)
        let eff = Decimal.pow(this.effBase(), player.A.points).sub(1).max(0);
        return eff;
    },
    effBase() {
        let base = new Decimal(2);
        return base;
    },
    update(diff) {
        if (player.A.unlocked)
            player.A.power = player.A.power.plus(tmp.A.effect.times(diff));
        if (player.A.unlocked)
            player.A.passive = player.A.passive.plus(tmp.A.effect.times(diff).times(3));
        if (player.A.unlocked)
            player.A.boost = player.A.boost.plus(tmp.A.effect.times(diff).div(5));
    },
    startData() {
        return {
            unlocked: false,
            points: new Decimal(0),
            best: new Decimal(0),
            total: new Decimal(0),
            power: new Decimal(0),
            passive: new Decimal(0),
            boost: new Decimal(0),
        }
    },
    automate() {},
    powerExp() {
        let exp = new Decimal(1 / 4);
        if (hasUpgrade('A', 11)) exp = new Decimal(1 / 3);
        return exp;
    },
    passiveExp() {
        let exp = new Decimal(1 / 3);
        if (hasUpgrade('A', 12)) exp = new Decimal(1 / 2);
        return exp;
    },
    boostExp() {
        let exp = new Decimal(1 / 7);
        if (hasUpgrade('A', 13)) exp = new Decimal(1 / 5);
        return exp;
    },
    powerEff() {
        if (!player.A.unlocked)
            return new Decimal(1);
        return player.A.power.plus(1).pow(this.powerExp());
    },
    passiveEff() {
        if (!player.A.unlocked)
            return new Decimal(1);
        return player.A.passive.plus(1).pow(this.passiveExp());
    },
    boostEff() {
        if (!player.A.unlocked)
            return new Decimal(1);
        return player.A.boost.plus(1).pow(this.boostExp());
    },
    tabFormat: ["main-display", "prestige-button", "blank", ["display-text", function() {
        return 'You have ' + format(player.A.power) + ' Ascension Power, which boosts Buffed Prestige Point generation by ' + format(tmp.A.powerEff) + 'x'
    }
    , {}],["display-text", function() {
        return 'You have ' + format(player.A.passive) + ' Meta Power, which boosts Passive Generation on all previous layers by +%' + format(tmp.A.passiveEff)
    }
    , {}],["display-text", function() {
        return 'You have ' + format(player.A.boost) + ' Boost Power, which boosts all previous layers (Except Boosters & Generators) by ' + format(tmp.A.boostEff) + 'x'
    }
    , {}], "blank", ["display-text", function() {
        return 'Your best Ascension Points is ' + formatWhole(player.A.best) + '<br>You have made a total of ' + formatWhole(player.A.total) + " Ascension Points."
    }
    , {}], "blank", "upgrades"],

    upgrades:{  
        11: {
            title: "Ascension Power Boost I",
            description: "AP Effect is better",
            cost: new Decimal(250),
            currencyDisplayName: "Ascension Power",
            currencyInternalName: "power",
            currencyLayer: "A",
        },
        12: {
            title: "Meta Power Boost I",
            description: "MP Effect is better",
            cost: new Decimal(1000),
            currencyDisplayName: "Passive Power",
            currencyInternalName: "passive",
            currencyLayer: "A",
        },
        13: {
            title: "Boost Power Boost I",
            description: "BP Effect is better",
            cost: new Decimal(2500),
            currencyDisplayName: "Boost Power",
            currencyInternalName: "boost",
            currencyLayer: "A",
        },
        },



})