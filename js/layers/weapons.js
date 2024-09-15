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
            assists: new Decimal(0),
            avgdamage: new Decimal(0),

            chaltime: new Decimal(0),
        }
    },
    requires() {
        let requirement = new Decimal(1e9)
        if (getBuyableAmount('V', 13).gte(1)) requirement = requirement.div(buyableEffect('V', 13))
        if (hasChallenge("V", 11) && challengeCompletions("V", 11) >= 2) requirement = requirement.div(tmp[this.layer].challenges["11"].reward2)
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
        if (getBuyableAmount('V', 21).gte(1)) eff = eff.times(buyableEffect('V', 21))
        if (hasUpgrade("V", 11)) eff = eff.times(1.3)
        if (player.V.assists > 0) eff = eff.times(tmp.V.assistEff)
        if (inChallenge("V", 11)) eff = new Decimal(0)
        if (hasChallenge("V", 11) && challengeCompletions("V", 11) >= 1) eff = eff.times(tmp[this.layer].challenges["11"].reward1)
        return eff;
    },
    effBase() {
        let base = new Decimal(1.2);
        return base;
    },

    update(diff) {
        if (inChallenge("V", 11)) player.V.chaltime = player.V.chaltime.plus(new Decimal(1).times(diff))
        player.V.kills = player.V.kills.plus(tmp.V.effect.times(diff));
        player.V.streak = player.V.streak.plus(tmp.V.killEff.times(diff));
        player.V.infects = player.V.infects.plus(tmp.V.streakEff.times(diff));
        player.V.coins = player.V.coins.plus(tmp.V.infectEff.times(diff));
        if (hasUpgrade("V", 12)) player.V.assists = player.V.assists.plus(tmp.V.assistEff.times(diff).pow(0.8));
    },

    doReset(resettingLayer) {
        player.V.chaltime = new Decimal(0)
        if (layers[resettingLayer].row > this.row) layerDataReset(this.layer);
    },

    killExp() {
        let exp = new Decimal(1 / 5);
        return exp;
    },

    killMult() {
        let mult = new Decimal(1);
        if (getBuyableAmount('V', 23).gte(1)) mult = mult.times(buyableEffect('V', 23).pow(0.45))
        return mult;
    },

    killEff() {
        let gen = player.V.kills.plus(0).pow(this.killExp())
        gen = gen.times(this.killMult())
        if (!player.V.unlocked) gen = new Decimal(0)
        if (inChallenge("V", 11)) gen = new Decimal(0)
        return gen
    },

    assistExp() {
        let exp = new Decimal(1 / 15);
        return exp;
    },

    assistMult() {
        let mult = new Decimal(1);
        return mult;
    },

    assistEff() {
        let gen = player.V.assists.plus(1).pow(this.assistExp())
        gen = gen.times(this.assistMult())
        if (!hasUpgrade("V", 12)) gen = new Decimal(1)
        if (inChallenge("V", 11)) gen = new Decimal(1)
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
        if (inChallenge("V", 11)) gen = new Decimal(0)
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
        if (inChallenge("V", 11)) gen = new Decimal(0)
        return gen
    },

    coinMult() {
        let mult = new Decimal(1);
        return mult;
    },

    coinExp() {
        let exp = new Decimal(1 / 6.7);
        return exp;
    },

    coinEff() {
        let gen = player.V.coins.plus(0).pow(this.coinExp())
        gen = gen.times(this.coinMult())
        if (!player.V.unlocked) gen = new Decimal(1)
        if (inChallenge("V", 11)) gen = new Decimal(1)
        return gen
    },

    avgDamage() {
        let damage = new Decimal((tmp[this.layer].buyables["11"].damageTwo).add(tmp[this.layer].buyables["12"].damageTwo).add(tmp[this.layer].buyables["13"].damageTwo).add(tmp[this.layer].buyables["21"].damageTwo).add(tmp[this.layer].buyables["23"].damageTwo).add(tmp[this.layer].buyables["31"].damageTwo).add(tmp[this.layer].buyables["32"].damageTwo).add(tmp[this.layer].buyables["33"].damageTwo).add(tmp[this.layer].buyables["11"].damageOne).add(tmp[this.layer].buyables["12"].damageOne).add(tmp[this.layer].buyables["13"].damageOne).add(tmp[this.layer].buyables["21"].damageOne).add(tmp[this.layer].buyables["23"].damageOne).add(tmp[this.layer].buyables["31"].damageOne).add(tmp[this.layer].buyables["32"].damageOne).add(tmp[this.layer].buyables["33"].damageOne)).div(2)
        return damage
    },

    tierOneUpgrades() {
        let tier1 = new Decimal(0)
        if (hasUpgrade("V", 11)) tier1 = tier1.add(1)
        if (hasUpgrade("V", 12)) tier1 = tier1.add(1)
        if (hasUpgrade("V", 13)) tier1 = tier1.add(1)

        return tier1
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
                ["display-text", function () {
                    if (player.V.assists > 0) return 'You have ' + formatWhole(player.V.assists) + " <text style='color:blue'>Assists</text>, which boosts <text style='color:red'>kill</text> gain & lower <text style='color:orange'>iso</text> req (at an reduced rate) by " + format(tmp.V.assistEff) + 'x (/' + format(tmp.V.assistEff.pow(0.4)) + ')'
                    else return ''
                }, {}],
                "blank",
                "h-line",
                "blank",
                ["display-text",
                    function () {
                        return 'You are doing ' + formatWhole(tmp[this.layer].avgDamage) + " Average Damage<br>That's " + format((tmp[this.layer].avgDamage).div(250)) + " Experiment Kills/sec!<br><spoiler>Formula: (((d1*(type)+WLVs)+(d2*(type)+WLVs))/2)^((1.05~1.15)=~Kills)</spoiler>"
                    },
                    {}],
                "buyables",
                "blank",
                "h-line",

            ],
            buttonStyle() { return { 'background': 'linear-gradient(to right,green 40%, #13d165 60%)', 'color': 'black', 'box-shadow': '2px 2px 2px green' } },
        },
        "Management": {
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
                "h-line",
                "blank",
                "milestones",
                "h-line",
                "challenges",
                ["display-text", function () {
                    if (challengeCompletions("V", 11) == 1) return "Power Outage Challenge Rewards:<br> 1st Reward: <text style='color:red'>Kills</text> are boosted by <text style='color:skyblue'>Chemicals</text> (x" + format(tmp[this.layer].challenges["11"].reward1) + ")"
                    if (challengeCompletions("V", 11) == 2) return "Power Outage Challenge Rewards:<br> 1st Reward: <text style='color:red'>Kills</text> are boosted by <text style='color:skyblue'>Chemicals</text> (x" + format(tmp[this.layer].challenges["11"].reward1) + ")<br>2nd Reward: Divide <text style='color:green'>Weapon</text> Requirement by /" + format(tmp[this.layer].challenges["11"].reward2)
                }, {}],
                "h-line",
                ["display-text", function () {
                    if (hasUpgrade("V", 12)) return formatWhole(player[this.layer].kills) + " <text style='color:red'>K</text>; " + formatWhole(player[this.layer].streak) + " <text style='color:lime'>S</text>; " + formatWhole(player[this.layer].infects) + " <text style='color:cyan'>I</text>; " + formatWhole(player[this.layer].coins) + " <text style='color:yellow'>C</text>; " + formatWhole(player[this.layer].assists) + " <text style='color:blue'>A</text>;"
                    else return formatWhole(player[this.layer].kills) + " <text style='color:red'>K</text>; " + formatWhole(player[this.layer].streak) + " <text style='color:lime'>S</text>; " + formatWhole(player[this.layer].infects) + " <text style='color:cyan'>I</text>; " + formatWhole(player[this.layer].coins) + " <text style='color:yellow'>C</text>;"
                }, {}],
                ["display-text",
                    function () {
                        return "Tier 1 Upgrades (" + formatWhole(tmp[this.layer].tierOneUpgrades) + "/10)"
                    },
                    {}],
                "blank",
                ["upgrades", [1]],
                "blank",
                "h-line",

            ],
            buttonStyle() { return { 'background': 'linear-gradient(to right,lime 30%, #13d165 70%)', 'color': 'black', 'box-shadow': '2px 2px 2px lime' } },
        },
    },


    //Milestone Build Content
    milestones: {
        11: {
            requirementDescription: "3 Generations Worth (1e15 Streak)",
            effectDescription: `Keep all Crystal Upgrades & Buffs on all resets`,
            done() { return player.V.streak.gte(1e15) },
            style() {
                if (!hasMilestone(this.layer, this.id)) { return '' }
                else return { 'background-color': 'lime', 'color': 'blue', 'border-color': 'green' }
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
                if (getBuyableAmount(this.layer, this.id) > 0) { return "Baseball Bat<br> [LV. " + formatWhole(getBuyableAmount(this.layer, this.id)) + "]<br>" }
                else return "Baseball Bat<br> [LV. 0]<br>"
            },
            unlocked() { return true },
            cost(x) {
                let exp1 = new Decimal(1.45)
                let exp2 = new Decimal(1.05)
                let costdef = new Decimal(10)
                let spec = new Decimal(costdef).mul(Decimal.pow(exp1, x)).mul(Decimal.pow(x, Decimal.pow(exp2, x))).add(costdef).floor()
                if (getBuyableAmount('V', 33).gte(1)) spec = spec.div(buyableEffect('V', 33))
                return spec
            },
            damageOne() {
                let damage = new Decimal(0)
                if (getBuyableAmount(this.layer, this.id) > 0) damage = new Decimal(29).plus(getBuyableAmount(this.layer, this.id)).plus(player[this.layer].kills.pow(0.1))
                return damage
            },
            damageTwo() {
                let damage = new Decimal(0)
                if (getBuyableAmount(this.layer, this.id) > 0) damage = new Decimal(33).plus(getBuyableAmount(this.layer, this.id)).plus(player[this.layer].kills.pow(0.15))
                return damage
            },
            display() {
                return "Damage Range: {" + formatWhole(tmp[this.layer].buyables[this.id].damageOne) + " - " + formatWhole(tmp[this.layer].buyables[this.id].damageTwo) + "}<br>Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Kills<br>Effect: Boost 'Coins' gain by " + format(tmp[this.layer].buyables[this.id].effect) + "x"
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
                if (getBuyableAmount('V', 22).gte(1)) eff = eff.times(buyableEffect('V', 22))
                if (getBuyableAmount('V', 31).gte(1)) eff = eff.times(buyableEffect('V', 31))
                if (inChallenge("V", 11) && (challengeCompletions("V", 11) == 0)) eff = eff.pow(0.9)
                if (inChallenge("V", 11) && (challengeCompletions("V", 11) == 1)) eff = eff.pow(0.8)
                if (inChallenge("V", 11) && (challengeCompletions("V", 11) == 2)) eff = eff.pow(0.5)
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
                if (getBuyableAmount(this.layer, this.id) > 0) { return "Katana<br> [LV. " + formatWhole(getBuyableAmount(this.layer, this.id)) + "]<br>" }
                else return "Katana<br> [LV. 0]<br>"
            },
            unlocked() { return true },
            cost(x) {
                let exp1 = new Decimal(1.33)
                let exp2 = new Decimal(1.06)
                let costdef = new Decimal(100)
                let spec = new Decimal(costdef).mul(Decimal.pow(exp1, x)).mul(Decimal.pow(x, Decimal.pow(exp2, x))).add(costdef).floor()
                if (getBuyableAmount('V', 33).gte(1)) spec = spec.div(buyableEffect('V', 33))
                return spec
            },
            damageOne() {
                let damage = new Decimal(0)
                if (getBuyableAmount(this.layer, this.id) > 0) damage = new Decimal(35).plus(getBuyableAmount(this.layer, this.id)).plus(player[this.layer].kills.pow(0.1))
                return damage
            },
            damageTwo() {
                let damage = new Decimal(0)
                if (getBuyableAmount(this.layer, this.id) > 0) damage = new Decimal(39).plus(getBuyableAmount(this.layer, this.id)).plus(player[this.layer].kills.pow(0.15))
                return damage
            },
            display() {
                return "Damage Range: {" + formatWhole(tmp[this.layer].buyables[this.id].damageOne) + " - " + formatWhole(tmp[this.layer].buyables[this.id].damageTwo) + "}<br>Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Coins<br>Effect: Boost 'Infect' gain by " + format(tmp[this.layer].buyables[this.id].effect) + "x"
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
                if (getBuyableAmount('V', 31).gte(1)) eff = eff.times(buyableEffect('V', 31))
                if (getBuyableAmount('V', 22).gte(1)) eff = eff.times(buyableEffect('V', 22))
                if (inChallenge("V", 11) && (challengeCompletions("V", 11) == 0)) eff = eff.pow(0.9)
                if (inChallenge("V", 11) && (challengeCompletions("V", 11) == 1)) eff = eff.pow(0.8)
                if (inChallenge("V", 11) && (challengeCompletions("V", 11) == 2)) eff = eff.pow(0.5)
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
                if (getBuyableAmount(this.layer, this.id) > 0) { return "Baton<br> [LV. " + formatWhole(getBuyableAmount(this.layer, this.id)) + "]<br>" }
                else return "Baton<br> [LV. 0]<br>"
            },
            unlocked() { return true },
            cost(x) {
                let exp1 = new Decimal(1.6)
                let exp2 = new Decimal(1.06)
                let costdef = new Decimal(15000)
                let spec = new Decimal(costdef).mul(Decimal.pow(exp1, x)).mul(Decimal.pow(x, Decimal.pow(exp2, x))).add(costdef).floor()
                if (getBuyableAmount('V', 33).gte(1)) spec = spec.div(buyableEffect('V', 33))
                return spec
            },
            damageOne() {
                let damage = new Decimal(0)
                if (getBuyableAmount(this.layer, this.id) > 0) damage = new Decimal(28).plus(getBuyableAmount(this.layer, this.id)).plus(player[this.layer].kills.pow(0.1))
                return damage
            },
            damageTwo() {
                let damage = new Decimal(0)
                if (getBuyableAmount(this.layer, this.id) > 0) damage = new Decimal(33).plus(getBuyableAmount(this.layer, this.id)).plus(player[this.layer].kills.pow(0.15))
                return damage
            },
            display() {
                return "Damage Range: {" + formatWhole(tmp[this.layer].buyables[this.id].damageOne) + " - " + formatWhole(tmp[this.layer].buyables[this.id].damageTwo) + "}<br>Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Streaks<br>Effect: Lower Weapon requirement by /" + format(tmp[this.layer].buyables[this.id].effect) + ""
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
                if (getBuyableAmount('V', 31).gte(1)) eff = eff.times(buyableEffect('V', 31))
                if (getBuyableAmount('V', 22).gte(1)) eff = eff.times(buyableEffect('V', 22))
                if (inChallenge("V", 11) && (challengeCompletions("V", 11) == 0)) eff = eff.pow(0.9)
                if (inChallenge("V", 11) && (challengeCompletions("V", 11) == 1)) eff = eff.pow(0.8)
                if (inChallenge("V", 11) && (challengeCompletions("V", 11) == 2)) eff = eff.pow(0.5)
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
                if (getBuyableAmount(this.layer, this.id) > 0) { return "Fireaxe<br> [LV. " + formatWhole(getBuyableAmount(this.layer, this.id)) + "]<br>" }
                else return "Fireaxe<br> [LV. 0]<br>"
            },
            unlocked() { return true },
            cost(x) {
                let exp1 = new Decimal(1.22)
                let exp2 = new Decimal(1.04)
                let costdef = new Decimal(40)
                let spec = new Decimal(costdef).mul(Decimal.pow(exp1, x)).mul(Decimal.pow(x, Decimal.pow(exp2, x))).add(costdef).floor()
                if (getBuyableAmount('V', 33).gte(1)) spec = spec.div(buyableEffect('V', 33))
                return spec
            },
            damageOne() {
                let damage = new Decimal(0)
                if (getBuyableAmount(this.layer, this.id) > 0) damage = new Decimal(56).plus(getBuyableAmount(this.layer, this.id)).plus(player[this.layer].kills.pow(0.1))
                return damage
            },
            damageTwo() {
                let damage = new Decimal(0)
                if (getBuyableAmount(this.layer, this.id) > 0) damage = new Decimal(62).plus(getBuyableAmount(this.layer, this.id)).plus(player[this.layer].kills.pow(0.15))
                return damage
            },
            display() {
                return "Damage Range: {" + formatWhole(tmp[this.layer].buyables[this.id].damageOne) + " - " + formatWhole(tmp[this.layer].buyables[this.id].damageTwo) + "}<br>Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Streaks<br>Effect: Weapon Effect is boosted by " + format(tmp[this.layer].buyables[this.id].effect) + "x"
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
                let base1 = new Decimal(1.1)
                let base2 = x
                let expo = new Decimal(1.01)
                let eff = base1.pow(Decimal.pow(base2, expo))
                if (getBuyableAmount('V', 22).gte(1)) eff = eff.times(buyableEffect('V', 22))
                if (inChallenge("V", 11) && (challengeCompletions("V", 11) == 0)) eff = eff.pow(0.9)
                if (inChallenge("V", 11) && (challengeCompletions("V", 11) == 1)) eff = eff.pow(0.8)
                if (inChallenge("V", 11) && (challengeCompletions("V", 11) == 2)) eff = eff.pow(0.5)
                return eff
            },
            style() {
                return {
                    background: (tmp[this.layer].buyables[this.id].canAfford ? "radial-gradient(#23d113, #13d1b8)" : "#bf8f8f"),
                }
            },
        },
        22: {
            title() {
                if (getBuyableAmount(this.layer, this.id) > 0) { return "Wave 2" }
                else return "Wave 1<br>"
            },
            unlocked() { return true },
            cost(x) {
                let exp1 = new Decimal(1.25)
                let exp2 = new Decimal(1)
                let costdef = new Decimal(1750)
                let spec = new Decimal(costdef).mul(Decimal.pow(exp1, x)).mul(Decimal.pow(x, Decimal.pow(exp2, x))).add(costdef).floor()
                return spec
            },
            display() {
                return "Requirement: " + formatWhole(tmp[this.layer].avgDamage) + "/" + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Average Damage<br>Effect: Boost all buyables around this one by " + format(tmp[this.layer].buyables[this.id].effect) + "x"
            },
            canAfford() {
                return (player[this.layer].avgdamage.gte(this.cost()))
            },
            buy() {
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                let base1 = new Decimal(1.5)
                let base2 = x
                let expo = new Decimal(1.03)
                let eff = base1.pow(Decimal.pow(base2, expo))
                if (getBuyableAmount('V', 22).gte(1)) eff = eff.times(buyableEffect('V', 22))
                if (inChallenge("V", 11) && (challengeCompletions("V", 11) == 0)) eff = eff.pow(0.9)
                if (inChallenge("V", 11) && (challengeCompletions("V", 11) == 1)) eff = eff.pow(0.8)
                if (inChallenge("V", 11) && (challengeCompletions("V", 11) == 2)) eff = eff.pow(0.5)
                return eff
            },
            style() {
                return {
                    background: (tmp[this.layer].buyables[this.id].canAfford ? "radial-gradient(#a8324c, #a80024)" : "#bd9066"),
                }
            },
        },
        23: {
            title() {
                if (getBuyableAmount(this.layer, this.id) > 0) { return "Crystalized Baton<br> [LV. " + formatWhole(getBuyableAmount(this.layer, this.id)) + "]<br>" }
                else return "Crystalized Baton<br> [LV. 0]<br>"
            },
            unlocked() { return true },
            cost(x) {
                let exp1 = new Decimal(1.3)
                let exp2 = new Decimal(1.04)
                let costdef = new Decimal(45)
                let spec = new Decimal(costdef).mul(Decimal.pow(exp1, x)).mul(Decimal.pow(x, Decimal.pow(exp2, x))).add(costdef).floor()
                if (getBuyableAmount('V', 33).gte(1)) spec = spec.div(buyableEffect('V', 33))
                return spec
            },
            damageOne() {
                let damage = new Decimal(0)
                if (getBuyableAmount(this.layer, this.id) > 0) damage = new Decimal(37).plus(getBuyableAmount(this.layer, this.id)).plus(player[this.layer].kills.pow(0.1))
                return damage
            },
            damageTwo() {
                let damage = new Decimal(0)
                if (getBuyableAmount(this.layer, this.id) > 0) damage = new Decimal(41).plus(getBuyableAmount(this.layer, this.id)).plus(player[this.layer].kills.pow(0.15))
                return damage
            },
            display() {
                return "Damage Range: {" + formatWhole(tmp[this.layer].buyables[this.id].damageOne) + " - " + formatWhole(tmp[this.layer].buyables[this.id].damageTwo) + "}<br>Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Coins<br>Effect: Boost crystal gain and 'Streak' gain (at an reduced rate) by " + format(tmp[this.layer].buyables[this.id].effect) + "x (" + + format(tmp[this.layer].buyables[this.id].effect.pow(0.45)) + "x)"
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
                let base1 = new Decimal(1.35)
                let base2 = x
                let expo = new Decimal(1.04)
                let eff = base1.pow(Decimal.pow(base2, expo))
                if (getBuyableAmount('V', 22).gte(1)) eff = eff.times(buyableEffect('V', 22))
                if (inChallenge("V", 11) && (challengeCompletions("V", 11) == 0)) eff = eff.pow(0.9)
                if (inChallenge("V", 11) && (challengeCompletions("V", 11) == 1)) eff = eff.pow(0.8)
                if (inChallenge("V", 11) && (challengeCompletions("V", 11) == 2)) eff = eff.pow(0.5)
                return eff
            },
            style() {
                return {
                    background: (tmp[this.layer].buyables[this.id].canAfford ? "radial-gradient(#23d113, #13d1b8)" : "#bf8f8f"),
                }
            },
        },
        31: {
            title() {
                if (getBuyableAmount(this.layer, this.id) > 0) { return "Pipe<br> [LV. " + formatWhole(getBuyableAmount(this.layer, this.id)) + "]<br>" }
                else return "Pipe<br> [LV. 0]<br>"
            },
            unlocked() { return true },
            cost(x) {
                let exp1 = new Decimal(1.12)
                let exp2 = new Decimal(1.04)
                let costdef = new Decimal(1e22)
                let spec = new Decimal(costdef).mul(Decimal.pow(exp1, x)).mul(Decimal.pow(x, Decimal.pow(exp2, x))).add(costdef).floor()
                if (getBuyableAmount('V', 33).gte(1)) spec = spec.div(buyableEffect('V', 33))
                return spec
            },
            damageOne() {
                let damage = new Decimal(0)
                if (getBuyableAmount(this.layer, this.id) > 0) damage = new Decimal(58).plus(getBuyableAmount(this.layer, this.id)).plus(player[this.layer].kills.pow(0.1))
                return damage
            },
            damageTwo() {
                let damage = new Decimal(0)
                if (getBuyableAmount(this.layer, this.id) > 0) damage = new Decimal(63).plus(getBuyableAmount(this.layer, this.id)).plus(player[this.layer].kills.pow(0.15))
                return damage
            },
            display() {
                return "Damage Range: {" + formatWhole(tmp[this.layer].buyables[this.id].damageOne) + " - " + formatWhole(tmp[this.layer].buyables[this.id].damageTwo) + "}<br>Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Kills<br>Effect: Boost the 1st row of Buyable Weapons by " + format(tmp[this.layer].buyables[this.id].effect) + "x"
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
                let base1 = new Decimal(1.5)
                let base2 = x
                let expo = new Decimal(1.04)
                let eff = base1.pow(Decimal.pow(base2, expo))
                if (getBuyableAmount('V', 22).gte(1)) eff = eff.times(buyableEffect('V', 22))
                if (inChallenge("V", 11) && (challengeCompletions("V", 11) == 0)) eff = eff.pow(0.9)
                if (inChallenge("V", 11) && (challengeCompletions("V", 11) == 1)) eff = eff.pow(0.8)
                if (inChallenge("V", 11) && (challengeCompletions("V", 11) == 2)) eff = eff.pow(0.5)
                return eff
            },
            style() {
                return {
                    background: (tmp[this.layer].buyables[this.id].canAfford ? "radial-gradient(#23d113, #13d1b8)" : "#bf8f8f"),
                }
            },
        },
        32: {
            title() {
                if (getBuyableAmount(this.layer, this.id) > 0) { return "Machete<br> [LV. " + formatWhole(getBuyableAmount(this.layer, this.id)) + "]<br>" }
                else return "Machete<br> [LV. 0]<br>"
            },
            unlocked() { return true },
            cost(x) {
                let exp1 = new Decimal(1.14)
                let exp2 = new Decimal(1.04)
                let costdef = new Decimal(1e4)
                let spec = new Decimal(costdef).mul(Decimal.pow(exp1, x)).mul(Decimal.pow(x, Decimal.pow(exp2, x))).add(costdef).floor()
                if (getBuyableAmount('V', 33).gte(1)) spec = spec.div(buyableEffect('V', 33))
                return spec
            },
            damageOne() {
                let damage = new Decimal(0)
                if (getBuyableAmount(this.layer, this.id) > 0) damage = new Decimal(32).plus(getBuyableAmount(this.layer, this.id)).plus(player[this.layer].kills.pow(0.1))
                return damage
            },
            damageTwo() {
                let damage = new Decimal(0)
                if (getBuyableAmount(this.layer, this.id) > 0) damage = new Decimal(39).plus(getBuyableAmount(this.layer, this.id)).plus(player[this.layer].kills.pow(0.15))
                return damage
            },
            display() {
                return "Damage Range: {" + formatWhole(tmp[this.layer].buyables[this.id].damageOne) + " - " + formatWhole(tmp[this.layer].buyables[this.id].damageTwo) + "}<br>Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Infects<br>Effect: Double Chemical gain everytime (" + formatWhole(tmp[this.layer].buyables[this.id].effect) + "x)"
            },
            canAfford() {
                return player[this.layer].infects.gte(this.cost())
            },
            buy() {
                let cost = new Decimal(1)
                player[this.layer].infects = player[this.layer].infects.sub(this.cost().mul(cost))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                let base1 = new Decimal(2)
                let base2 = x
                let expo = new Decimal(1)
                let eff = base1.pow(Decimal.pow(base2, expo))
                if (getBuyableAmount('V', 22).gte(1)) eff = eff.times(buyableEffect('V', 22))
                if (inChallenge("V", 11) && (challengeCompletions("V", 11) == 0)) eff = eff.pow(0.9)
                if (inChallenge("V", 11) && (challengeCompletions("V", 11) == 1)) eff = eff.pow(0.8)
                if (inChallenge("V", 11) && (challengeCompletions("V", 11) == 2)) eff = eff.pow(0.5)
                return eff
            },
            style() {
                return {
                    background: (tmp[this.layer].buyables[this.id].canAfford ? "radial-gradient(#23d113, #13d1b8)" : "#bf8f8f"),
                }
            },
        },
        33: {
            title() {
                if (getBuyableAmount(this.layer, this.id) > 0) { return "Combat Knife<br> [LV. " + formatWhole(getBuyableAmount(this.layer, this.id)) + "]<br>" }
                else return "Combat Knife<br> [LV. 0]<br>"
            },
            unlocked() { return true },
            cost(x) {
                let exp1 = new Decimal(1.16)
                let exp2 = new Decimal(1.045)
                let costdef = new Decimal(520)
                let spec = new Decimal(costdef).mul(Decimal.pow(exp1, x)).mul(Decimal.pow(x, Decimal.pow(exp2, x))).add(costdef).floor()
                return spec
            },
            damageOne() {
                let damage = new Decimal(0)
                if (getBuyableAmount(this.layer, this.id) > 0) damage = new Decimal(22).plus(getBuyableAmount(this.layer, this.id)).plus(player[this.layer].kills.pow(0.1))
                return damage
            },
            damageTwo() {
                let damage = new Decimal(0)
                if (getBuyableAmount(this.layer, this.id) > 0) damage = new Decimal(27).plus(getBuyableAmount(this.layer, this.id)).plus(player[this.layer].kills.pow(0.15))
                return damage
            },
            display() {
                return "Damage Range: {" + formatWhole(tmp[this.layer].buyables[this.id].damageOne) + " - " + formatWhole(tmp[this.layer].buyables[this.id].damageTwo) + "}<br>Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Kills<br>Effect: Lower all (except this one & Waves) buyable costs (/" + format(tmp[this.layer].buyables[this.id].effect) + ")"
            },
            canAfford() {
                return player[this.layer].kills.gte(this.cost())
            },
            buy() {
                let cost = new Decimal(1)
                player[this.layer].Kills = player[this.layer].infects.sub(this.cost().mul(cost))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                let base1 = new Decimal(1.15)
                let base2 = x
                let expo = new Decimal(1.02)
                let eff = base1.pow(Decimal.pow(base2, expo))
                if (getBuyableAmount('V', 22).gte(1)) eff = eff.times(buyableEffect('V', 22))
                if (inChallenge("V", 11) && (challengeCompletions("V", 11) == 0)) eff = eff.pow(0.9)
                if (inChallenge("V", 11) && (challengeCompletions("V", 11) == 1)) eff = eff.pow(0.8)
                if (inChallenge("V", 11) && (challengeCompletions("V", 11) == 2)) eff = eff.pow(0.5)
                return eff
            },
            style() {
                return {
                    background: (tmp[this.layer].buyables[this.id].canAfford ? "radial-gradient(#23d113, #13d1b8)" : "#bf8f8f"),
                }
            },
        },
    },

    challenges: {
        11: {
            name() { return "Power Outage <text style='text-shadow: white 1.75px 1.75px 10px; color:yellow;'>" + convertToRoman(challengeCompletions("V", 11) + 1) + "</text>" },
            challengeDescription() {
                if (challengeCompletions("V", 11) == 2) return `<h5 style='opacity:0.5'>(You can re-enter this challenge multiple times)</h5><text style='color:green'>Weapon</text> Generation Stats are disabled.<br>^0.5 <text style='color:green'>Weapon</text> Buyable Effects.<br>^^0.7 <text style='color:#b76ce6'>Crystal</text> Gain<h5 style='opacity:0.5'>( Teteration!! x^(0.7*0.7) )</h5><text style='color:skyblue'>Chemical</text> Buyables scales faster (+^1.25)<br> <text style='color:orange'>Isotope</text> requirement scales faster (+^.8)<br>`
                else if (challengeCompletions("V", 11) == 1) return `<h5 style='opacity:0.5'>(You can re-enter this challenge multiple times)</h5><text style='color:green'>Weapon</text> Generation Stats are disabled.<br>^0.8 <text style='color:green'>Weapon</text> Buyable Effects.<br>^0.7 <text style='color:#b76ce6'>Crystal</text> Gain<br> <text style='color:skyblue'>Chemical</text> Buyables scales faster (+^.6)<br> <text style='color:orange'>Isotope</text> requirement scales faster (+^.25)<br>`
                else return `<h5 style='opacity:0.5'>(You can re-enter this challenge multiple times)</h5><text style='color:green'>Weapon</text> Generation Stats are disabled.<br>^0.9 <text style='color:green'>Weapon</text> Buyable Effects.<br>^0.8 <text style='color:#b76ce6'>Crystal</text> Gain<br> <text style='color:skyblue'>Chemical</text> Buyables scales faster (+^.4)<br> <text style='color:orange'>Isotope</text> requirement scales faster (+^.1)<br>`
            },
            canComplete: function () {
                let challengeincrease = new Decimal(10).pow(player[this.layer].chaltime.pow(0.36).plus(1).min(20))
                if (challengeCompletions("V", 11) == 1) return player.points.gte(9.1e15)
                if (challengeCompletions("V", 11) == 2) return player.P.points.gte(challengeincrease)
                else return player.points.gte(8175023522)
            }, // Recorded On Sep 6th, 2024
            goalDescription() {
                let basetext = "<text style='color:lime'>Human Population</text> = <text style='color:#b76ce6'>Crystals</text>"
                if (challengeCompletions("V", 11) == 1) basetext = "<text style='color:orange'>LITF</text>^5 = <text style='color:#b76ce6'>Crystals</text><br><spoiler>There are 457 lights in the facility</spoiler>"
                if (challengeCompletions("V", 11) == 2) basetext = "<text style='color:red'>"+formatWhole(new Decimal(10).pow(player[this.layer].chaltime.pow(0.36).plus(1).min(20))) + " </text><text style='color:skyblue'>Chemicals</text><br>Current Scale: ^<text style='color:yellow'>"+format(player[this.layer].chaltime.pow(0.36).plus(1).min(20))+"</text> ("+formatWhole(player[this.layer].chaltime)+"s)"+"<h5 style='opacity:0.5'>(Requirement scales overtime... but reseting layers lowers the scale by .01 each time)</h5>"
                return basetext
            },
            completionLimit() { return new Decimal(3) },
            reward1() {
                let effect1 = (player.P.points.max(1).add(1).pow(0.02).max(1));
                if (inChallenge("V", 11)) effect1 = new Decimal(1)
                if (challengeCompletions("V", 11) >= 2) effect1 = (player.P.points.max(1).add(1).pow(0.035).max(1))
                return effect1
            },
            reward1alt() {
                let effect1 = (player.P.points.max(1).add(1).pow(0.035).max(1));
                if (inChallenge("V", 11)) effect1 = new Decimal(1)
                return effect1
            },
            reward2() {
                let effect1 = (player.points.max(1).add(1).pow(0.01).max(1));
                if (inChallenge("V", 11)) effect1 = new Decimal(1)
                return effect1
            },
            reward3() {
                let effect1 = (player.V.assists.max(1).add(1).pow(0.22).max(1));
                if (inChallenge("V", 11)) effect1 = new Decimal(1)
                return effect1
            },
            onExit() {
                player.V.chaltime = new Decimal(0)

            },
            rewardDescription() {
                let reward = "<text style='color:red'>Kills</text> are boosted by <text style='color:skyblue'>Chemicals</text> (x" + format(tmp[this.layer].challenges[this.id].reward1) + ")"
                if (challengeCompletions("V", 11) == 1) reward = "<br>Divide <text style='color:green'>Weapon</text> Requirement by /" + format(tmp[this.layer].challenges[this.id].reward2) + "<h5 style='opacity:0.5'>(Based on crystals)</h5>Improve 1st Reward of <text style='text-shadow: white 1.75px 1.75px 10px; color:yellow;'>PO</text> (x<text style='color:red'>" + format(tmp[this.layer].challenges[this.id].reward1) + "</text> -> x<text style='color:lime'>" + format(tmp[this.layer].challenges[this.id].reward1alt) + "</text>)"
                if (challengeCompletions("V", 11) == 2) reward = "<br><text style='color:#b76ce6'>Crystals</text> are boosted based on <text style='color:blue'>Assists</text> (x" + format(tmp[this.layer].challenges[this.id].reward3) + ")"
                return reward
            },
            unlocked() {
                return player[this.layer].assists.gte(100)
            },
            style() {
                {
                    if (inChallenge("V", 11) && this.canComplete() == false && challengeCompletions("V", 11) == 2) return { animation: "pulse2 18s infinite", width: "400px", height: "350px" }
                    if (inChallenge("V", 11) && this.canComplete() == true && challengeCompletions("V", 11) == 2) return { background: "#ffbf00", color: "black", width: "400px", height: "350px" }
                    if (inChallenge("V", 11) && this.canComplete() == false && challengeCompletions("V", 11) == 1) return { animation: "pulse2 18s infinite", width: "400px", height: "360px" }
                    if (inChallenge("V", 11) && this.canComplete() == true && challengeCompletions("V", 11) == 1) return { background: "#ffbf00", color: "black", width: "400px", height: "360px" }
                    if (inChallenge("V", 11) && this.canComplete() == false && challengeCompletions("V", 11) == 0) return { animation: "pulse2 18s infinite", width: "400px" }
                    if (inChallenge("V", 11) && this.canComplete() == true && challengeCompletions("V", 11) == 0) return { background: "#ffbf00", color: "black", width: "400px" }
                    if (challengeCompletions("V", 11) == 2) return { background: "#585959", color: "white", width: "400px", height: "350px" }
                    if (challengeCompletions("V", 11) == 1) return { background: "#585959", color: "white", width: "400px", height: "360px" }
                    if (challengeCompletions("V", 11) == 0) return { background: "#585959", color: "white", width: "400px" }
                    else return { background: "#585959", color: "white", width: "400px" }
                }
            },
        },
    },

    //Build Content
    upgrades: {
        rows: 7,
        cols: 7,
        11: {
            title: "<text style='color:orange'>Rage Stim</text><br>[ <text style='color:lime'>W-1</text> ]<br>",
            description: "Damage is boosted! <text style='color:red'>Kills</text> gain is boosted by 1.3x",
            color() { return '#5ec24a' },
            color2() { return '#778c0a' },
            cost() { return new Decimal(1) },
            canAfford() { return player.V.points.gte(this.cost()) },
            style() {
                if (!hasUpgrade(this.layer, this.id) && !this.canAfford()) { return '' }
                else if (!hasUpgrade(this.layer, this.id) && this.canAfford()) { return { 'box-shadow': 'inset 0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px ' + this.color(), 'background-color': 'grey', 'color': 'white', 'height': '130px', 'width': '130px', 'border-color': 'white' } }
                else return { 'background-color': this.color(), 'color': 'black', 'border-color': 'green', 'box-shadow': 'inset 0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px ' + this.color2(), 'height': '130px', 'width': '130px' }
            },
        },
        12: {
            title: "<text style='color:orange'>Table Measuring</text><br>[ <text style='color:lime'>W-2</text> ]<br>",
            description: "Something feels unbalanced. Add <text style='color:blue'>Assists</text>; which will boost <text style='color:red'>kill</text> gain and lower <text style='color:orange'>isotope</text> req.",
            unlocked() { return hasUpgrade('V', 11) },
            color() { return '#5ec24a' },
            color2() { return '#778c0a' },
            cost() { return new Decimal(2) },
            canAfford() { return player.V.points.gte(this.cost()) },
            style() {
                if (!hasUpgrade(this.layer, this.id) && !this.canAfford()) { return '' }
                else if (!hasUpgrade(this.layer, this.id) && this.canAfford()) { return { 'box-shadow': 'inset 0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px ' + this.color(), 'background-color': 'grey', 'color': 'white', 'height': '130px', 'width': '130px', 'border-color': 'white' } }
                else return { 'background-color': this.color(), 'color': 'black', 'border-color': 'green', 'box-shadow': 'inset 0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px ' + this.color2(), 'height': '130px', 'width': '130px' }
            },
        },
        13: {
            title: "<text style='color:orange'>Axe of Relativity</text><br>[ <text style='color:lime'>W-3</text> ]<br>",
            description: "The Axe has enter 4D! Passively Gain <text style='color:skyblue'>chemicals</text> which will cap at ~1e10!<br>",
            unlocked() { return hasUpgrade('V', 12) },
            effect() {
                let effect1 = (player.V.points.max(1).add(1).pow(0.3)).max(1).min(10);
                if (player.P.points >= 1e10) effect1 = new Decimal(0)
                return effect1
            },
            color() { return '#5ec24a' },
            color2() { return '#778c0a' },
            cost() { return new Decimal(3) },
            canAfford() { return player.V.points.gte(this.cost()) },
            style() {
                if (!hasUpgrade(this.layer, this.id) && !this.canAfford()) { return '' }
                else if (!hasUpgrade(this.layer, this.id) && this.canAfford()) { return { 'box-shadow': 'inset 0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px ' + this.color(), 'background-color': 'grey', 'color': 'white', 'height': '130px', 'width': '130px', 'border-color': 'white' } }
                else return { 'background-color': this.color(), 'color': 'black', 'border-color': 'green', 'box-shadow': 'inset 0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px ' + this.color2(), 'height': '130px', 'width': '130px' }
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