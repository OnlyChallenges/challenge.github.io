addLayer("V", {
    name: "Weapons", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "W", // This appears on the layer's node. Default is the id with the first letter capitalized
    startData() {
        return {
            unlocked: false,
            spec: false,
            points: new Decimal(0),
            kills: new Decimal(0),
            streak: new Decimal(0),
            infects: new Decimal(0),
            coins: new Decimal(0),
        }
    },
    requires() {
        let requirement = new Decimal(1e9)
        if (getBuyableAmount('V', 13).gte(1)) requirement = requirement.div(buyableEffect('V', 13))
        return requirement

    },
    branches: ["W"],
    nodeStyle() {
        return {
            "background": (player.V.unlocked || canReset("V")) ? "radial-gradient(#23d113, #13d1b8)" : "#bf8f8f",
        }
    },
    componentStyles: {
        "prestige-button": {
            background() {
                return (canReset("V")) ? "radial-gradient(#23d113, #13d1b8)" : "#bf8f8f"
            },
        },
    },
    position: 1,
    color: "#23d113",
    resource: "weapons",
    baseResource: "crystals",
    baseAmount() { return player.points },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    type: "static",

    exponent() {
        let ex = new Decimal(0.35)
        return ex
    },
    gainMult() {
        let gain = new Decimal(1)
        if (hasUpgrade('SP', 25)) gain = gain.times(1.6)
        return gain
    },
    gainExp() {
        let exp = new Decimal(0.3)
        return exp
    },
    hotkeys: [
        { key: "w", description: "w: Reset for Weapons", onPress() { if (canReset(this.layer) && player.V.unlocked) doReset(this.layer) } },
    ],
    layerShown() {
        let lay = true
        if (hasAchievement('A', 17)) lay = true
        return lay
    },
    effectDescription() {
        dis = "which is generating " + format(tmp.V.effect) + " <text style='color:red'>Kills</text> / sec"
        return dis
    },
    effect() {
        if (!player.V.unlocked)
            return new Decimal(0)
        let eff = Decimal.pow(this.effBase(), player.V.points).sub(1).max(0);
        return eff;
    },
    effBase() {
        let base = new Decimal(1.2);
        return base;
    },

    update(diff) {
            player.V.kills = player.V.kills.plus(tmp.V.effect.times(diff));
            player.V.streak = player.V.streak.plus(tmp.V.killEff.times(diff));
            player.V.infects = player.V.infects.plus(tmp.V.streakEff.times(diff));
            player.V.coins = player.V.coins.plus(tmp.V.infectEff.times(diff));
    },

    doReset(resettingLayer) {
        if (layers[resettingLayer].row > this.row) layerDataReset(this.layer)
    },

    killExp() {
        let exp = new Decimal(1 / 5);
        return exp;
    },

    killMult() {
        let mult = new Decimal(1);
        return mult;
    },

    killEff() {
        let gen = player.V.kills.plus(0).pow(this.killExp())
        gen = gen.times(this.killMult())
        if (!player.V.unlocked) gen = new Decimal(0)
        return gen
    },

    streakMult() {
        let mult = new Decimal(1);
        if (getBuyableAmount('V', 12).gte(1)) mult = mult.times(buyableEffect('V', 12))
        return mult;
    },

    streakExp() {
        let exp = new Decimal(1 / 9);
        return exp;
    },

    streakEff() {
        let gen = player.V.streak.plus(0).pow(this.streakExp())
        gen = gen.times(this.streakMult())
        if (!player.V.unlocked) gen = new Decimal(0)
        return gen
    },

    infectMult() {
        let mult = new Decimal(1);
        if (getBuyableAmount('V', 11).gte(1)) mult = mult.times(buyableEffect('V', 11))
        return mult;
    },

    infectExp() {
        let exp = new Decimal(1 / 12);
        return exp;
    },

    infectEff() {
        let gen = player.V.infects.plus(0).pow(this.infectExp())
        gen = gen.times(this.infectMult())
        if (!player.V.unlocked) gen = new Decimal(0)
        return gen
    },

    coinMult() {
        let mult = new Decimal(1);
        return mult;
    },

    coinExp() {
        let exp = new Decimal(1 / 4);
        return exp;
    },

    coinEff() {
        let gen = player.V.coins.plus(0).pow(this.coinExp())
        gen = gen.times(this.coinMult())
        if (!player.V.unlocked) gen = new Decimal(1)
        return gen
    },


    tabFormat: {
        "Facility": {
            content: [
                "main-display",
                "prestige-button",
                "blank",

                "h-line",
                ["display-text",
                    function () { return '<br>You have ' + formatWhole(player.points) + " <text style='color:#b76ce6'>crystals</text>" },
                    {}],
                ["display-text",
                    function () { return 'You have ' + formatWhole(player.P.points) + " <text style='color:skyblue'>chemicals</text>" },
                    {}],
                ["display-text",
                    function () { return 'You have ' + formatWhole(player.SP.points) + " <text style='color:green'>experiments</text>" },
                    {}],
                ["display-text",
                    function () { return 'You have ' + formatWhole(player.F.points) + " <text style='color:orange'>isotopes</text>" },
                    {}],
                "blank",
                ["display-text", function () {
                    return 'You have ' + formatWhole(player.V.kills) + " <text style='color:red'>Kills</text>, which boosts <text style='color:lime'>Streak</text> gain by +" + format(tmp.V.killEff) + '/sec'
                }, {}],
                ["display-text", function () {
                    return 'You have ' + formatWhole(player.V.streak) + " <text style='color:lime'>Streak</text>, which boosts '<text style='color:cyan'>Infects</text>' gain by +" + format(tmp.V.streakEff) + '/sec'
                }, {}],
                ["display-text", function () {
                    return 'You have ' + formatWhole(player.V.infects) + " <text style='color:cyan'>Infects</text>, which boosts '<text style='color:yellow'>Coins</text>' gain & <text style='color:#b76ce6'>crystals</text> (at an reduced rate) by +" + format(tmp.V.infectEff) + '/sec (' + format(tmp.V.infectEff.plus(1).pow(0.6)) + 'x)' 
                }, {}],
                ["display-text", function () {
                    return 'You have ' + formatWhole(player.V.coins) + " <text style='color:yellow'>Coins</text>, which boosts <text style='color:skyblue'>chemical</text> gain by " + format(tmp.V.coinEff) + 'x'
                }, {}],
                "blank",
                "h-line",
                "blank",
                "milestones",
                "h-line",
                "blank",
                "buyables",
                "blank",
                "h-line",

            ],
            buttonStyle() { return { 'background': 'linear-gradient(to right,green 40%, #13d165 60%)', 'color': 'black', 'box-shadow': '2px 2px 2px green' } },
            style() {
                return {
                    'background': 'linear-gradient(135deg, #000000 22px, #616362 22px, #616362 24px, transparent 24px, transparent 67px, #616362 67px, #616362 69px, transparent 69px),linear-gradient(225deg, #000000 22px, #616362 22px, #616362 24px, transparent 24px, transparent 67px, #616362 67px, #616362 69px, transparent 69px)0 64px',
                    'background-color': 'black',
                    'background-size': '64px 128px',
                    "background-position": "100%" + " " + (player.timePlayed % 200) + "%"
                }
            },
        },
    },


    //Milestone Build Content
    milestones: {
        11: {
            requirementDescription: "3 Generations Worth (1e15 Streak)",
            effectDescription: `Keep all Crystal Upgrades & Buffs on all resets`,
            done() { return player.V.streak.gte(1e15) },
            style() {
                if(!hasMilestone(this.layer, this.id)){return ''}
                else return {'background-color':'lime', 'color':'blue', 'border-color':'green'}
            },
        },
        12: {
            requirementDescription: "Facility Sanitation (1e400 Kills)",
            effectDescription: `+450% Experiment Dust/Sec Buff`,
            done() { return player.V.kills.gte("1e400") },
            unlocked() { return hasMilestone('V', 11) },
        },
        13: {
            requirementDescription: "<server>R</server> (22 Vaccines)",
            effectDescription: `+^7.5% Super Power Effect<br> Add 3 More Feed Upgrades`,
            done() { return player.V.points.gte(22) },
            unlocked() { return hasMilestone('V', 12) },
        },
        14: {
            requirementDescription: "<server>E</server> (165 Vaccines)",
            effectDescription: `Lower Super Powder Requirement by 400%<br>Also unlock the next layer.`,
            done() { return player.V.points.gte(165) },
            unlocked() { return hasMilestone('V', 13) },
        },
        15: {
            requirementDescription: "<logic>Special</logic> (S²F-VI Unlocked)",
            effectDescription: `Keep S²F-VI on Resets before Vaccines`,
            done() { return hasUpgrade('F', 36) },
            unlocked() { return hasMilestone('V', 13) },

        },
    },

    buyables: {
        11: {
            title() {
                if (getBuyableAmount(this.layer, this.id) > 0) {return "Baseball Bat<br> [LV. " + formatWhole(getBuyableAmount(this.layer, this.id))+"]<br>"}
                else return "Baseball Bat<br> [LV. 0]<br>"
            },  
            unlocked() { return true },
            cost(x) {
                let exp1 = new Decimal(1.45)
                let exp2 = new Decimal(1.05)
                let costdef = new Decimal(10)
                let spec = new Decimal(costdef).mul(Decimal.pow(exp1, x)).mul(Decimal.pow(x, Decimal.pow(exp2, x))).add(costdef).floor()
                return spec
            },
            display() {
                return "Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Kills<br>Effect: Boost 'Coins' gain by " + format(tmp[this.layer].buyables[this.id].effect) + "x"
            },
            canAfford() {
                return player[this.layer].kills.gte(this.cost())
            },
            buy() {
                let cost = new Decimal(1)
                player[this.layer].kills = player[this.layer].kills.sub(this.cost().mul(cost))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                let base1 = new Decimal(1.16)
                let base2 = x
                let expo = new Decimal(1.025)
                let eff = base1.pow(Decimal.pow(base2, expo))
                return eff
            },
            style() {
                return {
                    background: (tmp[this.layer].buyables[this.id].canAfford ? "radial-gradient(#23d113, #13d1b8)" : "#bf8f8f"),
                }
            },
        },
        12: {
            title() {
                if (getBuyableAmount(this.layer, this.id) > 0) {return "Katana<br> [LV. " + formatWhole(getBuyableAmount(this.layer, this.id))+"]<br>"}
                else return "Katana<br> [LV. 0]<br>"
            },  
            unlocked() { return true },
            cost(x) {
                let exp1 = new Decimal(1.33)
                let exp2 = new Decimal(1.06)
                let costdef = new Decimal(100)
                let spec = new Decimal(costdef).mul(Decimal.pow(exp1, x)).mul(Decimal.pow(x, Decimal.pow(exp2, x))).add(costdef).floor()
                return spec
            },
            display() {
                return "Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Coins<br>Effect: Boost 'Infect' gain by " + format(tmp[this.layer].buyables[this.id].effect) + "x"
            },
            canAfford() {
                return player[this.layer].coins.gte(this.cost())
            },
            buy() {
                let cost = new Decimal(1)
                player[this.layer].coins = player[this.layer].coins.sub(this.cost().mul(cost))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                let base1 = new Decimal(1.135)
                let base2 = x
                let expo = new Decimal(1.04)
                let eff = base1.pow(Decimal.pow(base2, expo))
                return eff
            },
            style() {
                return {
                    background: (tmp[this.layer].buyables[this.id].canAfford ? "radial-gradient(#23d113, #13d1b8)" : "#bf8f8f"),
                }
            },
        },
        13: {
            title() {
                if (getBuyableAmount(this.layer, this.id) > 0) {return "Baton<br> [LV. " + formatWhole(getBuyableAmount(this.layer, this.id))+"]<br>"}
                else return "Baton<br> [LV. 0]<br>"
            },  
            unlocked() { return true },
            cost(x) {
                let exp1 = new Decimal(1.6)
                let exp2 = new Decimal(1.06)
                let costdef = new Decimal(15000)
                let spec = new Decimal(costdef).mul(Decimal.pow(exp1, x)).mul(Decimal.pow(x, Decimal.pow(exp2, x))).add(costdef).floor()
                return spec
            },
            display() {
                return "Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Streaks<br>Effect: Lower Weapon requirement by /" + format(tmp[this.layer].buyables[this.id].effect) + ""
            },
            canAfford() {
                return player[this.layer].streak.gte(this.cost())
            },
            buy() {
                let cost = new Decimal(1)
                player[this.layer].streak = player[this.layer].streak.sub(this.cost().mul(cost))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                let base1 = new Decimal(1.2)
                let base2 = x
                let expo = new Decimal(1.01)
                let eff = base1.pow(Decimal.pow(base2, expo))
                return eff
            },
            style() {
                return {
                    background: (tmp[this.layer].buyables[this.id].canAfford ? "radial-gradient(#23d113, #13d1b8)" : "#bf8f8f"),
                }
            },
        },
        21: {
            title() {
                if (getBuyableAmount(this.layer, this.id) > 0) {return "Fireaxe<br> [LV. " + formatWhole(getBuyableAmount(this.layer, this.id))+"]<br>"}
                else return "Fireaxe<br> [LV. 0]<br>"
            },  
            unlocked() { return true },
            cost(x) {
                let exp1 = new Decimal(1.2)
                let exp2 = new Decimal(1.04)
                let costdef = new Decimal(40)
                let spec = new Decimal(costdef).mul(Decimal.pow(exp1, x)).mul(Decimal.pow(x, Decimal.pow(exp2, x))).add(costdef).floor()
                return spec
            },
            display() {
                return "Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Streaks<br>Effect: Lower Weapon requirement by /" + format(tmp[this.layer].buyables[this.id].effect) + ""
            },
            canAfford() {
                return player[this.layer].streak.gte(this.cost())
            },
            buy() {
                let cost = new Decimal(1)
                player[this.layer].streak = player[this.layer].streak.sub(this.cost().mul(cost))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                let base1 = new Decimal(1.2)
                let base2 = x
                let expo = new Decimal(1.01)
                let eff = base1.pow(Decimal.pow(base2, expo))
                return eff
            },
            style() {
                return {
                    background: (tmp[this.layer].buyables[this.id].canAfford ? "radial-gradient(#23d113, #13d1b8)" : "#bf8f8f"),
                }
            },
        },
    },

    //Build Content
    upgrades: {
        rows: 7,
        cols: 7,
        11: {
            title: "<rainbowr>V</rainbow>",
            description: "Boost Particle gain by 750%",
            cost: new Decimal(1),
        },
        12: {
            title: "<rainbow>A</rainbow>",
            description: "Boost Powder gain by 600%",
            cost: new Decimal(2),
            unlocked() { return hasUpgrade('V', 11) },
        },
        13: {
            title: "<rainbow>C</rainbow>",
            description: "Passively Gain Powder based on <ruins>Vaccines</ruins><br>(Passive Generation ends at 1e10 Powder)",
            cost: new Decimal(3),
            unlocked() { return hasUpgrade('V', 12) },
            effect() {
                let effect1 = (player.V.points.max(1).add(1).pow(0.3)).max(1).min(10);
                if (player.P.points > 1e10) effect1 = new Decimal(0)
                return effect1
            },
        },
        14: {
            title: "<rainbow>C</rainbow>",
            description: "Vaccines lower Feed Requirement (Capped at -15,000%)",
            cost: new Decimal(5),
            unlocked() { return hasUpgrade('V', 13) },
            effect() {
                let effect1 = (player.V.points.max(1).add(1).pow(0.13)).max(1).min(151);
                if (effect1 > 151) effect1 = new Decimal(151)
                return effect1
            },
            effectDisplay() {
                let text = `-${format(upgradeEffect(this.layer, this.id).minus(1).times(100))}%`;
                return text;
            },
        },
        15: {
            title: "<rainbow>I</rainbow>",
            description: "Vaccines boosts Super Power Effect",
            cost: new Decimal(8),
            unlocked() { return hasUpgrade('V', 14) },
            effect() {
                let effect1 = (player.V.points.max(1).add(1).pow(0.24)).max(1).min(20);
                return effect1
            },
            effectDisplay() {
                let text = `+${format(upgradeEffect(this.layer, this.id).minus(1).times(100))}%`;
                return text;
            },
        },
        16: {
            title: "<rainbow>N</rainbow>",
            description: "Super Power lowers Super Point Requirement",
            cost: new Decimal(10),
            unlocked() { return hasUpgrade('V', 15) },
            effect() {
                let effect1 = (player.SP.generation.max(1).add(1).pow(0.15)).max(1).min(40);
                return effect1
            },
            effectDisplay() {
                let text = `-${format(upgradeEffect(this.layer, this.id).minus(1).times(100))}%`;
                return text;
            },
        },
        17: {
            title: "<rainbow>E</rainbow>",
            description: "Vaccines boost Super Power Generatione (Multiplicative)",
            cost: new Decimal(13),
            unlocked() { return hasUpgrade('V', 16) },
            effect() {
                let effect1 = (player.V.points.max(1).pow(0.2)).max(1).min(99);
                return effect1
            },
            effectDisplay() {
                let text = `+${format(upgradeEffect(this.layer, this.id))}x`;
                return text;
            },
        },
    },
})