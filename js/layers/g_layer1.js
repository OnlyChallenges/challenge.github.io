addLayer("g", {
    name: "generators",
    symbol: "G",
    position: 0,
    color: "#a3d9a5",
    requires() {
        return new Decimal()
    },
    resource: "generators",
    baseResource: "delta prestige points",
    baseAmount() {
        return player.dP.points
    },
    type: "static",
    exponent() {
        return expo = new Decimal(1.1)
    },
    base() {
        return base = new Decimal(2.5)
    },
    gainMult() {
        let mult = new Decimal(1);
        return mult;
    },
    canBuyMax() {
        return hasMilestone("g", 2)
    },
    row: 6,
    hotkeys: [{
        key: "G",
        description: "Shift + G: Reset for Generators",
        onPress() {
            if (canReset(this.layer))
                doReset(this.layer)
        }
    }, ],
    layerShown() {return hasUpgrade('fP', 13) || player.cB.unlocked || player.gP.unlocked},  
    automate() {},
    effBase() {
        let base = new Decimal(2);
        return base;
    },
    effect() {
        if ((!unl(this.layer)))
            return new Decimal(0);
        let eff = Decimal.pow(this.effBase(), player.g.points).sub(1).max(0);
        return eff;
    },
    effectDescription() {
        return "which are generating " + format(tmp.g.effect) + " Generator Power/sec"
    },
    update(diff) {
        if (player.g.unlocked)
            player.g.power = player.g.power.plus(tmp.g.effect.times(diff));
    },
    startData() {
        return {
            unlocked: false,
            points: new Decimal(0),
            best: new Decimal(0),
            total: new Decimal(0),
            power: new Decimal(0),
        }
    },
    powerExp() {
        let exp = new Decimal(1 / 3);
        return exp;
    },
    powerEff() {
        if (!unl(this.layer))
            return new Decimal(1);
        return player.g.power.plus(1).pow(this.powerExp());
    },
    tabFormat: ["main-display", "prestige-button", "blank", ["display-text", function() {
        return 'You have ' + format(player.g.power) + ' Generator Power, which boosts Prestige Point generation by ' + format(tmp.g.powerEff) + 'x'
    }
    , {}], "blank", ["display-text", function() {
        return 'Your best Generators is ' + formatWhole(player.g.best) + '<br>You have made a total of ' + formatWhole(player.g.total) + " Generators."
    }
    , {}], "blank"],
})