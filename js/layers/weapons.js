addLayer("V", {
    name: "Weapons", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "W", // This appears on the layer's node. Default is the id with the first letter capitalized
    startData() {
        return {
            unlocked: false,
            spec: false,
            underwater: false,
            points: new Decimal(0),
            kills: new Decimal(0),
            streak: new Decimal(0),
            infects: new Decimal(0),
            coins: new Decimal(0),
            assists: new Decimal(0),
            avgdamage: new Decimal(0),

            oxygen: new Decimal(100),
            oxygenMax: new Decimal(100),
            scrap: new Decimal(0),
            gears: new Decimal(0),
            scrapFound: new Decimal(0),
            scrapMax: new Decimal(10),
            drown: new Decimal(0),
            health: new Decimal(0),
            blood: new Decimal(0),
            chaltime: new Decimal(0),
            clickableTime: new Decimal(0),
            clickableTime2: new Decimal(0),
            focus: new Decimal(0),
            spectime: new Decimal(316),
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
        if (inChallenge("V", 12)) player.V.blood = player.V.blood.plus(new Decimal(1).times(diff))
        if (inChallenge("V", 21)) player.V.health = player.V.health.minus(new Decimal(0.2).times(diff))
        if (player.V.clickableTime > 0) player.V.clickableTime = player.V.clickableTime.minus(new Decimal(1).times(diff)).max(0)
        if (player.V.clickableTime2 > 0) player.V.clickableTime2 = player.V.clickableTime2.minus(new Decimal(1).times(diff)).max(0)
        if (player.V.focus > 0) player.V.focus = player.V.focus.minus(new Decimal(1).times(diff)).max(0)
        if (player.V.underwater == true) player.V.oxygen = player.V.oxygen.minus(new Decimal(tmp.V.lossBreathing).times(diff)).max(0)
        if (player.V.underwater == false) player.V.oxygen = player.V.oxygen.plus(new Decimal(tmp.V.breathing).times(diff)).min(tmp.V.oxygenSwimMax)
        if (player.V.underwater == true) player.V.scrapFound = player.V.scrapFound.plus(new Decimal(tmp.V.scrapGain).times(diff)).min(tmp.V.scrapSwimMax)
        if (player.V.underwater == false) player.V.scrap = player.V.scrap.add(player.V.scrapFound)
        if (player.V.underwater == false) player.V.scrapFound = new Decimal(0)
        if (player.V.oxygen == 0) player.V.drown = player.V.drown.plus(1)
        if (player.V.oxygen == 0) player.V.underwater = false
        if (player.V.oxygen == 0) player.V.scrapFound = new Decimal(0)
        if (player.V.oxygen == 0) player.V.scrap = new Decimal(0)
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

    barrierBleed() {
        let logger = player.points.log10().log10()
        let bleed = new Decimal(1).div(logger.pow(2)).div(1.05)
        if (player.points < 1e10) bleed = new Decimal(1)
        return bleed
    },

    barrierBleed2() {
        let logger = player.points.log10().log10()
        let bleed = new Decimal(1).div(logger.pow(2)).div(1.075)
        if (player.points < 1e10) bleed = new Decimal(1)
        return bleed
    },

    barrierBleed3() {
        let booster = player.points.pow(0.15)
        let bleed = new Decimal(2).times(booster)
        if (player.points < 1e20) bleed = new Decimal(2)
        return bleed
    },

    softCaps() {
        let softs = new Decimal(0)
        if (player.points >= 1e10) softs = softs.add(1)
        if (player.points >= 1e20) softs = softs.add(1)
        if (player.points >= 1e150) softs = softs.add(1)
        if (player.P.points >= 1e28) softs = softs.add(1)
        return softs
    },

    scrapEff() {
        return player.V.scrap.add(1).pow(0.2)
    },

    scrapSwimMax() {
        let swim = new Decimal(10)
        if (getBuyableAmount("V", 41).gte(1)) swim = swim.times(buyableEffect("V", 41))
        return swim
    },

    oxygenSwimMax() {
        let oxy = new Decimal(100)
        if (getBuyableAmount("V", 51).gte(1)) oxy = oxy.times(buyableEffect("V", 51))
        return oxy
    },

    breathing() {
        let air = new Decimal(2.8)
        if (getBuyableAmount("V", 51).gte(1)) air = air.times(buyableEffect("V", 51).times(0.6))
        return air
    },

    lossBreathing() {
        let loss = new Decimal(2.25)
        if (getBuyableAmount("V", 52).gte(1)) loss = loss.times(buyableEffect("V", 52).times(1.3))
        if (player.V.focus > 0) loss = loss.times(0.75)
        return loss
    },
    scrapGain() {
        let gain = new Decimal(0.2)
        if (getBuyableAmount("V", 42).gte(1)) gain = gain.times(buyableEffect("V", 42))
        if (getBuyableAmount("V", 61).gte(1)) gain = gain.times(buyableEffect("V", 61).max(1))
        return gain
    },

    gearform() {
        if (player.V.scrap < 1) return new Decimal(0)
        else return player.V.scrap.pow(0.1).minus(1.2).max(0)
    },

    gearEff() {
        return player.V.gears.pow(0.4).div(13)
    },

    challengeScaler() {
        let a = new Decimal(player.V.oxygen)
        let b = new Decimal(tmp.V.oxygenSwimMax)
        let final = a/b
        return final
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
                ["buyables", [1, 2, 3]],
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
                ["infobox", "w1"],
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
                "blank",
                ["display-text",
                    function () { return "<h3 style='color:grey;text-shadow: red 0px 0px 5px'>The Events of Chaos</text>" },
                    {}],
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
        "Underwater": {
            content: [
                "blank",
                ["bar", "oxygen"],
                ["bar", "scrap"],
                ["display-text",
                    function () {

                        if (player.V.focus > 0) return "<text style='color:red;text-shadow: orange 2px 1px 3px'>Dead-Eye Swimming</text> is active for " + formatWhole(player.V.focus) + "s<br>(Oxygen Loss ↓25%)"

                    },
                    {}],
                ["clickables", [1]],
                ["display-text",
                    function () { return "<text style='color:cyan'>You have drowned " + formatWhole(player.V.drown) + " time(s), which makes all <text style='color:grey'>Scrap Buyables</text> weaker by <text style='color:red;text-shadow: cyan 2px 1px 3px'>" + format(player.V.drown.times(1.25)) + " </text>%</text>" },
                    {}],
                "blank",
                "h-line",
                "blank",
                ["display-text",
                    function () { return "You have " + formatWhole(player.V.scrap) + " <text style='color:grey'>Scrap</text>(s), which boosts all Stats (on this layer; except <text style='color:grey'>Scrap</text>) by " + format(tmp.V.scrapEff) + "x" },
                    {}],
                ["display-text",
                    function () { return "You have " + format(player.V.gears) + " <text style='color:pink'>Gears</text>(s), which boosts all <text style='color:grey'>Scrap Buyables</text> by " + format(tmp.V.gearEff.times(100)) + "%" },
                    {}],
                ["display-text",
                    function () {
                        if (player.V.scrap.gte(1)) return "Developers are unlocked at 1,000,000,000 <text style='color:grey'>Scrap</text> (" + format((player.V.scrap.log10().times(100)).div(10)) + "%)"
                        else return "Developers are unlocked at 1,000,000,000 <text style='color:grey'>Scrap</text> (0%)"
                    },
                    {}],
                "blank",
                ["buyables", [4, 5,6]],
            ],
            buttonStyle() { return { 'background': 'linear-gradient(to right,blue 40%, cyan 60%)', 'color': 'black', 'box-shadow': '2px 2px 2px blue', 'border': 'skyblue' } },
        },
        "Softcaps": {
            content: [
                ["display-text",
                    function () {
                        if (player.points >= 1e10) return "<text style='color:red;text-shadow:yellow 3px 3px 10px'>Barrier Bleed</text> Nerf (Starts at 1e10 <text style='color:#b76ce6'>crystals</text>) [<text style='color:green;text-shadow:lime 3px 3px 10px'>ACTIVE</text>]:<br>^" + format(tmp[this.layer].barrierBleed) + " <text style='color:#b76ce6'>crystal</text> gain<br><text style='color:skyblue'>Chemical Buyables</text> are much weaker by ^" + format(tmp[this.layer].barrierBleed2)
                        else return "<text style='color:red;text-shadow:yellow 3px 3px 10px'>Barrier Bleed</text> Nerf (Starts at 1e10 <text style='color:#b76ce6'>crystals</text>) [<text style='color:red;text-shadow:orange 3px 3px 10px'>INACTIVE</text>]:<br>^" + format(tmp[this.layer].barrierBleed) + " <text style='color:#b76ce6'>crystal</text> gain<br><text style='color:skyblue'>Chemical Buyables</text> are much weaker by ^" + format(tmp[this.layer].barrierBleed2)
                    },
                    {}],
                "blank",
                "h-line",
                "blank",
                ["display-text",
                    function () {
                        if (player.points >= 1e20) return "<text style='color:red;text-shadow:yellow 3px 3px 10px'>Barrier Bleed</text> Nerf 2 (Starts at 1e20 <text style='color:#b76ce6'>crystals</text>) [<text style='color:green;text-shadow:lime 3px 3px 10px'>ACTIVE</text>]:<br> +" + format(tmp[this.layer].barrierBleed3) + "x All<text style='color:green'> Experiment</text> Health<br>All Weapons are 30% weaker"
                        else return "<text style='color:red;text-shadow:yellow 3px 3px 10px'>Barrier Bleed</text> Nerf 2 (Starts at 1e20 <text style='color:#b76ce6'>crystals</text>) [<text style='color:red;text-shadow:orange 3px 3px 10px'>INACTIVE</text>]:<br> +" + format(tmp[this.layer].barrierBleed3) + "x All<text style='color:green'> Experiment</text> Health<br>All Weapons are 30% weaker"
                    },
                    {}],
                "blank",
                "h-line",
                "blank",
                ["display-text",
                    function () {
                        if (player.P.points >= 1e28) return "<text style='color:cyan;text-shadow:blue 3px 3px 10px'>Drowning</text> Nerf (Starts at 1e28 <text style='color:skyblue'>chemicals</text>) [<text style='color:green;text-shadow:lime 3px 3px 10px'>ACTIVE</text>]:<br>Triggers 1 Time!<br> Lose the ability to gain <text style='color:lightblue;text-shadow:cyan 3px 3px 10px'>assists</text><br> <text style='color:green'>Experiments</text> now inflict '<text style='color:grey;text-shadow: lightgrey 0px 0px 5px'>Pure Drown</text>' towards you in challenges<br> <h5 style='opacity:0.5'>'Pure Drown' causes chemical decay (-5%/sec); Effect is active inside challenge at all times</h5><br>"
                        else return "<text style='color:cyan;text-shadow:blue 3px 3px 10px'>Drowning</text> Nerf (Starts at 1e28 <text style='color:skyblue'>chemicals</text>) [<text style='color:red;text-shadow:orange 3px 3px 10px'>INACTIVE</text>]:<br>Triggers 1 Time!<br> Lose the ability to gain <text style='color:lightblue;text-shadow:cyan 3px 3px 10px'>assists</text><br> <text style='color:green'>Experiments</text> now inflict '<text style='color:grey;text-shadow: lightgrey 0px 0px 5px'>Pure Drown</text>' towards you in challenges<br> <h5 style='opacity:0.5'>'Pure Drown' causes chemical decay (-5%/sec); Effect is active inside challenge at all times</h5><br>"
                    },
                    {}],
                "h-line",
                "blank",
                ["display-text",
                    function () { return "<text style='color:lime;text-shadow:green 3px 3px 10px'>Poison</text> Nerf (Starts at 1e150 <text style='color:#b76ce6'>crystals</text>) [<text style='color:red;text-shadow:orange 3px 3px 10px'>INACTIVE</text>]:<br><text style='color:green'>Experiments</text></text> now inflict '<text style='color:lime;text-shadow: green 0px 0px 5px'>Acidic Stare</text>' towards you every 15 seconds<br><text style='color:skyblue'>Chemical Buyables</text> no longer boost anything<br><h5 style='opacity:0.5'>'Acidic Stare' causes weapons effects to be set to 0, lasts for 5 seconds</h5><br>" },
                    {}],
            ],
            buttonStyle() { return { 'background': 'linear-gradient(to right,red 30%, orange 70%)', 'color': 'black', 'box-shadow': '2px 2px 2px red', 'border': 'red' } },
        },
    },


    infoboxes: {
        w1: {
            title: "Only the beginning...",
            titleStyle: { 'color': '#000000' },
            body() { return "Weapons... we all know them... we all love them...<br><spoiler>Power Outage</spoiler> & <spoiler>Blood Moon</spoiler> are the only challenges so far<br>Weapon Buyables give Damage depending on the level & contribution towards it. Get enough minimum damage and you'll be able to sweap the experiments on that floor! How far can you go?<br><br> Floors Remaining: <text style='color:yellow'>0</text>/<text style='color:red'>5</text>" },
            bodyStyle: { 'background-color': "green" }
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
        },
        41: {
            title() {
                if (getBuyableAmount(this.layer, this.id) >= 100) { return "More Scraps<br>[<text style='color:blue'>" + convertToRoman(getBuyableAmount(this.layer, this.id)) + "</text>]" }
                else if (getBuyableAmount(this.layer, this.id) >= 50) { return "More Scraps<br>[<text style='color:green'>" + convertToRoman(getBuyableAmount(this.layer, this.id)) + "</text>]" }
                else if (getBuyableAmount(this.layer, this.id) >= 25) { return "More Scraps<br>[<text style='color:yellow'>" + convertToRoman(getBuyableAmount(this.layer, this.id)) + "</text>]" }
                else if (getBuyableAmount(this.layer, this.id) >= 10) { return "More Scraps<br>[<text style='color:orange'>" + convertToRoman(getBuyableAmount(this.layer, this.id)) + "</text>]" }
                else if (getBuyableAmount(this.layer, this.id) > 0) { return "More Scraps<br>[<text style='color:darkred'>" + convertToRoman(getBuyableAmount(this.layer, this.id)) + "</text>]" }
                else return "More Scraps"
            },
            unlocked() { return true },
            cost(x) {
                let exp1 = new Decimal(1.11)
                let exp2 = new Decimal(1.01)
                let costdef = new Decimal(10)
                let spec = new Decimal(costdef).mul(Decimal.pow(exp1, x)).mul(Decimal.pow(x, Decimal.pow(exp2, x))).add(costdef).floor()
                return spec
            },
            display() {
                return "Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Scraps<br>Effect: Boost Scrap Swim Max by " + format(tmp[this.layer].buyables[this.id].effect) + "x"
            },
            canAfford() {
                return player[this.layer].scrap.gte(this.cost())
            },
            buy() {
                let cost = new Decimal(1)
                player[this.layer].scrap = player[this.layer].scrap.sub(this.cost().mul(cost))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                let base1 = new Decimal(1.15)
                let base2 = x
                let expo = new Decimal(1.02)
                let eff = base1.pow(Decimal.pow(base2, expo))
                if (player.V.drown > 0) eff = eff.times(new Decimal(1).minus(player.V.drown.times(1.25).div(100)))
                if (player.V.gears > 0) eff = eff.times(new Decimal(1).add(tmp.V.gearEff))
                return eff
            },
        },
        42: {
            title() {
                if (getBuyableAmount(this.layer, this.id) >= 100) { return "Heavy Breathing<br>[<text style='color:blue'>" + convertToRoman(getBuyableAmount(this.layer, this.id)) + "</text>]" }
                else if (getBuyableAmount(this.layer, this.id) >= 50) { return "Heavy Breathing<br>[<text style='color:green'>" + convertToRoman(getBuyableAmount(this.layer, this.id)) + "</text>]" }
                else if (getBuyableAmount(this.layer, this.id) >= 25) { return "Heavy Breathing<br>[<text style='color:yellow'>" + convertToRoman(getBuyableAmount(this.layer, this.id)) + "</text>]" }
                else if (getBuyableAmount(this.layer, this.id) >= 10) { return "Heavy Breathing<br>[<text style='color:orange'>" + convertToRoman(getBuyableAmount(this.layer, this.id)) + "</text>]" }
                else if (getBuyableAmount(this.layer, this.id) > 0) { return "Heavy Breathing<br>[<text style='color:darkred'>" + convertToRoman(getBuyableAmount(this.layer, this.id)) + "</text>]" }
                else return "Heavy Breathing"
            },
            unlocked() { return true },
            cost(x) {
                let exp1 = new Decimal(1.4)
                let exp2 = new Decimal(1.01)
                let costdef = new Decimal(40)
                let spec = new Decimal(costdef).mul(Decimal.pow(exp1, x)).mul(Decimal.pow(x, Decimal.pow(exp2, x))).add(costdef).floor()
                return spec
            },
            display() {
                return "Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Scraps<br>Effect: Boost Scrap Gain/sec by " + format(tmp[this.layer].buyables[this.id].effect) + "x"
            },
            canAfford() {
                return player[this.layer].scrap.gte(this.cost())
            },
            buy() {
                let cost = new Decimal(1)
                player[this.layer].scrap = player[this.layer].scrap.sub(this.cost().mul(cost))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                let base1 = new Decimal(2.1)
                let base2 = x
                let expo = new Decimal(1.02)
                let eff = base1.pow(Decimal.pow(base2, expo))
                if (player.V.drown > 0) eff = eff.times(new Decimal(1).minus(player.V.drown.times(1.25).div(100)))
                if (player.V.gears > 0) eff = eff.times(new Decimal(1).add(tmp.V.gearEff))
                if (getBuyableAmount("V", 42) == 0) eff = new Decimal(1)
                return eff
            },
        },
        51: {
            title() {
                if (getBuyableAmount(this.layer, this.id) >= 100) { return "Equipment<br>[<text style='color:blue'>" + convertToRoman(getBuyableAmount(this.layer, this.id)) + "</text>]" }
                else if (getBuyableAmount(this.layer, this.id) >= 50) { return "Equipment<br>[<text style='color:green'>" + convertToRoman(getBuyableAmount(this.layer, this.id)) + "</text>]" }
                else if (getBuyableAmount(this.layer, this.id) >= 25) { return "Equipment<br>[<text style='color:yellow'>" + convertToRoman(getBuyableAmount(this.layer, this.id)) + "</text>]" }
                else if (getBuyableAmount(this.layer, this.id) >= 10) { return "Equipment<br>[<text style='color:orange'>" + convertToRoman(getBuyableAmount(this.layer, this.id)) + "</text>]" }
                else if (getBuyableAmount(this.layer, this.id) > 0) { return "Equipment<br>[<text style='color:darkred'>" + convertToRoman(getBuyableAmount(this.layer, this.id)) + "</text>]" }
                else return "Equipment"
            },
            unlocked() { return true },
            cost(x) {
                let exp1 = new Decimal(1.13)
                let exp2 = new Decimal(1.01)
                let costdef = new Decimal(75)
                let spec = new Decimal(costdef).mul(Decimal.pow(exp1, x)).mul(Decimal.pow(x, Decimal.pow(exp2, x))).add(costdef).floor()
                return spec
            },
            display() {
                return "Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Scraps<br>Effect: Increase Oxygen Level & Breathing Capabilities by " + format(tmp[this.layer].buyables[this.id].effect) + "x"
            },
            canAfford() {
                return player[this.layer].scrap.gte(this.cost())
            },
            buy() {
                let cost = new Decimal(1)
                player[this.layer].scrap = player[this.layer].scrap.sub(this.cost().mul(cost))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                let base1 = new Decimal(1.27)
                let base2 = x
                let expo = new Decimal(1.02)
                let eff = base1.pow(Decimal.pow(base2, expo))
                if (player.V.drown > 0) eff = eff.times(new Decimal(1).minus(player.V.drown.times(1.25).div(100)))
                if (player.V.gears > 0) eff = eff.times(new Decimal(1).add(tmp.V.gearEff))
                if (getBuyableAmount("V", 51) == 0) eff = new Decimal(1)
                return eff
            },
        },
        52: {
            title() {
                if (getBuyableAmount(this.layer, this.id) >= 100) { return "Risky Movement<br>[<text style='color:blue'>" + convertToRoman(getBuyableAmount(this.layer, this.id)) + "</text>]" }
                else if (getBuyableAmount(this.layer, this.id) >= 50) { return "Risky Movement<br>[<text style='color:green'>" + convertToRoman(getBuyableAmount(this.layer, this.id)) + "</text>]" }
                else if (getBuyableAmount(this.layer, this.id) >= 25) { return "Risky Movement<br>[<text style='color:yellow'>" + convertToRoman(getBuyableAmount(this.layer, this.id)) + "</text>]" }
                else if (getBuyableAmount(this.layer, this.id) >= 10) { return "Risky Movement<br>[<text style='color:orange'>" + convertToRoman(getBuyableAmount(this.layer, this.id)) + "</text>]" }
                else if (getBuyableAmount(this.layer, this.id) > 0) { return "Risky Movement<br>[<text style='color:darkred'>" + convertToRoman(getBuyableAmount(this.layer, this.id)) + "</text>]" }
                else return "Risky Movement"
            },
            unlocked() { return true },
            cost(x) {
                let exp1 = new Decimal(1.47)
                let exp2 = new Decimal(1.01)
                let costdef = new Decimal(200)
                let spec = new Decimal(costdef).mul(Decimal.pow(exp1, x)).mul(Decimal.pow(x, Decimal.pow(exp2, x))).add(costdef).floor()
                return spec
            },
            display() {
                return "Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Scraps<br>Effect: Increase Scrap Gain/sec significantly by " + format(tmp[this.layer].buyables[this.id].effect) + "x, but lose oxygen faster..."
            },
            canAfford() {
                return player[this.layer].scrap.gte(this.cost())
            },
            buy() {
                let cost = new Decimal(1)
                player[this.layer].scrap = player[this.layer].scrap.sub(this.cost().mul(cost))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                let base1 = new Decimal(1.4)
                let base2 = x
                let expo = new Decimal(1.02)
                let eff = base1.pow(Decimal.pow(base2, expo))
                if (player.V.drown > 0) eff = eff.div(new Decimal(100).minus(player.V.drown.times(1.25))).times(100)
                if (player.V.gears > 0) eff = eff.times(new Decimal(1).add(tmp.V.gearEff))
                if (getBuyableAmount("V", 52) == 0) eff = new Decimal(1)
                return eff
            },
        },
        61: {
            title() {
                if (getBuyableAmount(this.layer, this.id) >= 100) { return "Infected Water<br>[<text style='color:blue'>" + convertToRoman(getBuyableAmount(this.layer, this.id)) + "</text>]" }
                else if (getBuyableAmount(this.layer, this.id) >= 50) { return "Infected Water<br>[<text style='color:green'>" + convertToRoman(getBuyableAmount(this.layer, this.id)) + "</text>]" }
                else if (getBuyableAmount(this.layer, this.id) >= 25) { return "Infected Water<br>[<text style='color:yellow'>" + convertToRoman(getBuyableAmount(this.layer, this.id)) + "</text>]" }
                else if (getBuyableAmount(this.layer, this.id) >= 10) { return "Infected Water<br>[<text style='color:orange'>" + convertToRoman(getBuyableAmount(this.layer, this.id)) + "</text>]" }
                else if (getBuyableAmount(this.layer, this.id) > 0) { return "Infected Water<br>[<text style='color:darkred'>" + convertToRoman(getBuyableAmount(this.layer, this.id)) + "</text>]" }
                else return "Infected Water"
            },
            unlocked() { return true },
            cost(x) {
                let exp1 = new Decimal(1.47)
                let exp2 = new Decimal(1.01)
                let costdef = new Decimal(1500)
                let spec = new Decimal(costdef).mul(Decimal.pow(exp1, x)).mul(Decimal.pow(x, Decimal.pow(exp2, x))).add(costdef).floor()
                return spec
            },
            display() {
                return "Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Scraps<br>Effect: Increase Scrap Gain/sec, but decreases depending on your oxygen remaining<br><br>Current Effect: <text style='color:cyan'>" + format(tmp[this.layer].buyables[this.id].effect)+"</text>x<br>Original Effect: <text style='color:lime'>" + format(tmp[this.layer].buyables[this.id].effect2) + "</text>x"
            },
            canAfford() {
                return player[this.layer].scrap.gte(this.cost())
            },
            buy() {
                let cost = new Decimal(1)
                player[this.layer].scrap = player[this.layer].scrap.sub(this.cost().mul(cost))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                let base1 = new Decimal(1.6)
                let base2 = x
                let expo = new Decimal(1)
                let eff = tmp[this.layer].challengeScaler
                let effmain = base1.pow(Decimal.pow(base2, expo)).times(new Decimal(1).times(eff)).max(1)
                if (getBuyableAmount("V", 61) == 0) effmain = new Decimal(1)
                return effmain
            },
            effect2(x = getBuyableAmount("V", 61)) {
                let base1 = new Decimal(1.6)
                let base2 = x
                let expo = new Decimal(1)
                let effmain = base1.pow(Decimal.pow(base2, expo)).max(1)
                if (getBuyableAmount("V", 61) == 0) effmain = new Decimal(1)
                return effmain
            },
        },
    },

    clickables: {
        11: {
            title() {
                if (player.V.clickableTime2 > 0) return ""
                else return "Dead-Eye Swimming"
            },
            display() {
                if (player.V.clickableTime2 > 0) return formatWhole(player.V.clickableTime2) + " Seconds Remaining"
                else return "Focus all of your breathing into collecting scrap<br>Lowers the loss of oxygen by 25% for 15 seconds!"
            },
            canClick() {
                if (player.V.clickableTime2 > 0) return false
                else return true

            },
            onClick() {
                player.V.clickableTime2 = new Decimal(90)
                player.V.focus = new Decimal(15)
            },
            style() {
                if (player.V.clickableTime2 > 0) return { 'background-color': 'red', "background-image": "repeating-linear-gradient(45deg, hsla(204, 48%, 17%, 0.7), hsla(204, 48%, 17%, 0.7) 15px, transparent 0, transparent 30px)", "background-size": "1000% 1000%", "background-position": "0% 0%", "border": "2px solid red", "width": "140px", "animation": "main 150s infinite", "color": "white", "text-shadow": "rgb(6, 12, 20) 3px 3px 10px" }
                else return {
                    'background-color': '#f08078', "background-image": "repeating-radial-gradient(circle at center, hsla(4, 94%, 41%, 0.5), hsla(4, 94%, 41%, 0.5) 15px, transparent 0, transparent 30px)", "background-size": "100% 100%", "background-position": "0% 0%", "border": "2px solid red", "width": "140px", "animation": "main 150s infinite", "color": "white", "text-shadow": "rgb(6, 12, 20) 3px 3px 10px"
                }
            },
        },
        12: {
            title() {
                if (player.V.underwater == true) return "Exit the Water"
                else return "Enter the Water"
            },
            display: "Scavage for Scrap Materials<br>If your oxygen hits 0, all of your scrap is gone due to drowning",
            canClick: true,
            onClick() {
                if (player.V.underwater == true) return player.V.underwater = false
                else return player.V.underwater = true
            },
            style() {
                return {
                    'background-color': 'cyan', "background-image": "repeating-linear-gradient(135deg, hsla(204, 48%, 17%, 0.134), hsla(204, 48%, 17%, 0.134) 15px, transparent 0, transparent 30px)", "background-size": "1000% 1000%", "background-position": "0% 0%", "border": "2px solid blue", "width": "275px", "animation": "main 150s infinite", "color": "blue", "text-shadow": "rgb(6, 12, 20) 3px 3px 10px"
                }
            },
        },
        13: {
            title() {
                if (player.V.clickableTime > 0) return ""
                else return "Mechanical Engineering"
            },
            display() {
                if (player.V.clickableTime > 0) return formatWhole(player.V.clickableTime) + " Seconds Remaining"
                else return "Transfer Scrap Pieces to Gears<br>(+" + format(tmp.V.gearform) + " Gears)"
            },
            canClick() {
                if (player.V.clickableTime > 0) return false
                else return true

            },
            onClick() {
                player.V.gears = player.V.gears.add(tmp.V.gearform)
                player.V.clickableTime = new Decimal(45)
                player.V.scrap = new Decimal(0)
            },
            style() {
                if (player.V.clickableTime > 0) return { 'background-color': 'red', "background-image": "repeating-linear-gradient(45deg, hsla(204, 48%, 17%, 0.7), hsla(204, 48%, 17%, 0.7) 15px, transparent 0, transparent 30px)", "background-size": "1000% 1000%", "background-position": "0% 0%", "border": "2px solid red", "width": "140px", "animation": "main 150s infinite", "color": "white", "text-shadow": "rgb(6, 12, 20) 3px 3px 10px" }
                else return {
                    'background-color': 'grey', "background-image": "repeating-linear-gradient(45deg, hsla(204, 48%, 17%, 0.134), hsla(204, 48%, 17%, 0.134) 15px, transparent 0, transparent 30px)", "background-size": "1000% 1000%", "background-position": "0% 0%", "border": "2px solid grey", "width": "140px", "animation": "main 150s infinite", "color": "white", "text-shadow": "rgb(6, 12, 20) 3px 3px 10px"
                }
            },
        },
    },

    bars: {
        oxygen: {
            direction: RIGHT,
            width: 500,
            height: 60,
            fillStyle() {
                if (player.V.focus > 0) return { 'background-color': '#070173' }
                else return { 'background-color': "blue" }

            },
            borderStyle() { return { "border-color": "skyblue" } },
            progress() {
                let prog = player.V.oxygen.div(100)
                return prog
            },
            display() {
                if (player.V.underwater == false) return "Oxygen Level: " + formatWhole(player.V.oxygen.div(tmp.V.oxygenSwimMax).times(100)) + "%<br>( " + formatWhole(player.V.oxygen) + " / " + formatWhole(tmp.V.oxygenSwimMax) + " ) [↑<text style='color:lime'>" + format(tmp.V.breathing) + "</text>/s]"
                else return "Oxygen Level: " + formatWhole(player.V.oxygen.div(tmp.V.oxygenSwimMax).times(100)) + "%<br>( " + formatWhole(player.V.oxygen) + " / " + formatWhole(tmp.V.oxygenSwimMax) + " ) [↓<text style='color:red'>" + format(tmp.V.lossBreathing) + "</text>/s]"
            },
        },
        scrap: {
            direction: RIGHT,
            width: 500,
            height: 35,
            instant: true,
            fillStyle: { 'background-color': "grey" },
            borderStyle() { return { "border-color": "darkgrey" } },
            progress() {
                let prog = player.V.scrapFound.div(tmp.V.scrapSwimMax)
                return prog
            },
            display() {
                return "Scraps Found: " + formatWhole(player.V.scrapFound) + "/" + formatWhole(tmp.V.scrapSwimMax) + " (" + format(tmp.V.scrapGain) + "/s)"
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
                if (challengeCompletions("V", 11) == 2) basetext = "<text style='color:red'>" + formatWhole(new Decimal(10).pow(player[this.layer].chaltime.pow(0.36).plus(1).min(20))) + " </text><text style='color:skyblue'>Chemicals</text><br>Current Scale: ^<text style='color:yellow'>" + format(player[this.layer].chaltime.pow(0.36).plus(1).min(20)) + "</text> (" + formatWhole(player[this.layer].chaltime) + "s)" + "<h5 style='opacity:0.5'>(Requirement scales overtime... but reseting layers lowers the scale by .01 each time)</h5>"
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
        12: {
            name() { return "<text style='color:#fc7d74'>Blood Moon</text> <text style='text-shadow: white 1.75px 1.75px 4px; color:red;'>" + convertToRoman(challengeCompletions("V", 12) + 1) + "</text>" },
            challengeDescription() {
                return `<h5 style='opacity:0.5'>(You can re-enter this challenge multiple times)</h5>All Weapon Stats are reduced sigificantly<br>You gain <text style='color:orange'>Blood</text> depending on the duration you're in this challenge, <text style='color:orange'>Blood</text> reduces crystal gain over time, if your gain is under 1, <text style='color:orange'>Blood</text> will reset.<br> Can you withstand the <text style='color:red'>bleeding</text>?`
            },
            canComplete: function () {
                return player.V.blood.gte(300)
            }, // Recorded On Sep 6th, 2024
            goalDescription() {
                let basetext = formatWhole(player.V.blood) + " / 300 <text style='color:orange'>Blood</text>"
                return basetext
            },
            completionLimit() { return new Decimal(2) },
            letchallengeFail() {
                if (getPointGen() < 1)
                    return run(layers["V"].challenges["12"].onExit)
            },
            onExit() {
                player.V.blood = new Decimal(0)

            },
            rewardDescription() {
                let reward = "Decrease the potency of the 1st Softcap"
                return reward
            },
            unlocked() {
                return player[this.layer].assists.gte(100)
            },
            style() {
                {
                    return { "color": "rgb(223, 222, 222)", "text-shadow": "rgb(6, 12, 20) 3px 3px 10px", "background": " red", "background-image": "repeating-linear-gradient(45deg, hsla(204, 48%, 17%, 0.384), hsla(204, 48%, 17%, 0.842) 15px, transparent 0, transparent 30px)", "background-size": "1000% 1000%", "background-position": "0% 0%", "border": "2px solid red", "width": "400px", "animation": "main 240s infinite" }
                }
            },
        },
        21: {
            name() { return "<text style='color:##f78f2'>Abyssal</text> <text style='text-shadow: white 1.75px 1.75px 4px; color:cyan;'>" + convertToRoman(challengeCompletions("V", 21) + 1) + "</text>" },
            challengeDescription() {
                return "<h5 style='opacity:0.5'>(You can re-enter this challenge multiple times)</h5>Weapons & Isotopes are useless<br><text style='color:lightblue'>Chemical Buyables</text> are severely nerfed<br>You now take '<text style='color:cyan'>Blue Damage</text>', which makes you lose health overtime. Due to the lack of regeneration, you're on a set pace to beat the challenge before running out of health. Can you beat the event?<br><br> Health Remaining: " + formatWhole(player.V.health) + " / <text style='color:lime'>135</text><h5 style='opacity:0.5'>(Blue Damage is not karma)</h5>"
            },
            canComplete: function () {
                return player.points.gte(1e15)
            }, // Recorded On Sep 6th, 2024
            goalDescription() {
                let basetext = "Reach 1e15 <text style='color:#b375f0'>Crystals</text>"
                return basetext
            },
            completionLimit() { return new Decimal(2) },
            letchallengeFail() {
                if (player.V.health < 0.1)
                    return run(layers["V"].challenges["21"].onEnter)
            },
            onEnter() {
                doReset(this.layer, true)
            },
            onExit() {
                player.V.health = new Decimal(135)
            },
            rewardDescription() {
                let reward = "Power Outage & Blood Moon are 55% weaker"
                return reward
            },
            unlocked() {
                return player[this.layer].assists.gte(100)
            },
            style() {
                {
                    return { "color": "rgb(223, 222, 222)", "text-shadow": "rgb(6, 12, 20) 3px 3px 10px", "background": " blue", "background-image": "repeating-radial-gradient(circle at center, hsla(204, 48%, 17%, 0.384), hsla(204, 48%, 17%, 0.842) 15px, transparent 0, transparent 30px)", "background-size": "250% 250%", "background-position": "0% 0%", "border": "2px solid cyan", "width": "800px", "animation": "main 240s infinite" }
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