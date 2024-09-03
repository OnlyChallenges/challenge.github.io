addLayer("SP", {
    name: "Super Powder", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "E", // This appears on the layer's node. Default is the id with the first letter capitalized|
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
        if (player.F.unlocked) requirement = requirement.times(40)
        if (player.F.unlocked && player.SP.unlocked) requirement = requirement.div(40)
        if (hasUpgrade('F', 23)) requirement = requirement.div(upgradeEffect('F', 23))
        if (hasUpgrade('F', 25)) requirement = requirement.div(upgradeEffect('F', 25))
        if (hasMilestone('V', 14)) requirement = requirement.div(4)
        if (hasUpgrade('V', 16)) requirement = requirement.div(upgradeEffect('V', 16))
        if (player.W.unlocked) requirement = requirement.div(tmp.W.generationEff)
        return requirement

    },
    branches: ["W"],
    nodeStyle() {
        return {
            "background": (player.SP.unlocked || canReset("SP")) ? "radial-gradient(#a733dc, #ab13bf)" : "#bf8f8f",
        }
    },
    componentStyles: {
        "prestige-button": {
            background() {
                return (canReset("SP")) ? "radial-gradient(#a733dc, #ab13bf)" : "#bf8f8f"
            },
        },
    },
    tabFormat: {
        "Crystal Caves": {
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
                    function () { 
                        
                        if (player.F.unlocked) return 'You have ' + formatWhole(player.F.points) + " <text style='color:orange'>isotopes</text>" 
                        else if (!player.F.unlocked) return "?????????????????????????????"
                    },
                    {}],

                "blank",
                ["display-text", function () {
                    
                    
                    if (player.SP.unlocked) return 'You have ' + formatWhole(player.SP.generation) + " <text style='color:#5d56e8'>Experiment Dust</text>, which boosts <text style='color:#b76ce6'>crystal</text> gain by " + format(tmp.SP.generationEff.minus(1).times(100)) + '%'
                    else if (!player.SP.unlocked) return "??????????????????????????????????????????????????????????????"

                }, {}],

        
                ["display-text", function () {
                    if (hasUpgrade('F', 36)) return 'You have ' + format(player.SP.generation2) + ' Ultra Power, which boosts Powder Gain, +' + format(tmp.SP.generation2Eff.minus(1).times(100)) + '%'
                }, {}],
                "blank",
                "h-line",
                "blank",
                "upgrades",
                "blank",

            ],
            buttonStyle() { return { 'background': 'linear-gradient(to right,purple 40%, #b76ce6 60%)', 'color': 'black', 'box-shadow': '2px 2px 2px purple' } },
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
    color: "#a733dc",
    resource: "experiments",
    baseResource: "crystals",
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
        dis = "which is generating " + format(tmp.SP.effect) + " <text style='color:#5d56e8'>Experiment Dust</text> / sec"
        if (!player.SP.unlocked) dis = "???????????????????????????????????????"
        else if (player.SP.unlocked) dis = "which is generating " + format(tmp.SP.effect) + " <text style='color:#5d56e8'>Experiment Dust</text> / sec"
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
        let base = new Decimal(1.65);
        return base;
    },
    update(diff) {
        if (player.SP.unlocked)
            player.SP.generation = player.SP.generation.plus(tmp.SP.effect.times(diff));
        if (player.SP.unlocked && hasUpgrade('F', 36))
            player.SP.generation2 = player.SP.generation2.plus(tmp.SP.effect.times(diff).div(150));
        if (player.SP.unlocked && hasUpgrade('F', 36) && hasUpgrade('SP', 35))
            player.SP.generation2 = player.SP.generation2.plus(tmp.SP.effect.times(diff).div(150).times(upgradeEffect('SP', 35)))
    },

    generationExp() {
        let exp = new Decimal(1 / 6);
        return exp;
    },

    generation2Exp() {
        let exp1 = new Decimal(1 / 18);
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
        return gen
    },

    canBuyMax() { return hasMilestone('F', 11) },


    //Build Content
    upgrades: {
        rows: 5,
        cols: 5,
        11: {
            fullDisplay()
            { if (!player.SP.unlocked) return ("<h3>Falsification<br>[ <text style='color:pink'>E-1</text> ]</h3><br><br>Boost <text style='color:#b76ce6'>crystal</text> gain by 50%<br><br>Cost: 100 <text style='color:#5d56e8'>Experiment Dust</text>")
              else if (player.SP.unlocked) return ("<h3>Nyko<br>[ <text style='color:pink'>E-1</text> ]</h3><br><br>Boost <text style='color:#b76ce6'>crystal</text> gain by 50%<br><br>Cost: ???????????????????")
            },
            currencyInternalName: "generation",
            currencyLayer: "SP",
            color() { return '#571a7d' },
            color2() { return '#a859d9' },
            cost() { return new Decimal(100) },
            canAfford() { return player.SP.generation.gte(this.cost()) },
            style() {
                if (!hasUpgrade(this.layer, this.id) && !this.canAfford()) { return '' }
                else if (!hasUpgrade(this.layer, this.id) && this.canAfford()) { return { 'box-shadow': 'inset 0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px ' + this.color(), 'background-color': 'black', 'color': 'white', 'height': '130px', 'width': '130px', 'border-color': 'white' } }
                else return { 'background-color': this.color(), 'color': 'white', 'border-color': 'green', 'box-shadow': 'inset 0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px ' + this.color2(), 'height': '130px', 'width': '130px' }
            },
        },
        12: {
            fullDisplay:
            ("<h3>Abys<br>[ <text style='color:pink'>E-2</text> ]</h3><br><br>Boost <text style='color:skyblue'>P-7</text> Effect by 110%<br><br>Cost: 650 <text style='color:#5d56e8'>Experiment Dust</text>"),
            currencyInternalName: "generation",
            currencyLayer: "SP",
            unlocked() { return hasUpgrade('SP', 11) },
            color() { return '#571a7d' },
            color2() { return '#a859d9' },
            cost() { return new Decimal(650) },
            canAfford() { return player.SP.generation.gte(this.cost()) },
            style() {
                if (!hasUpgrade(this.layer, this.id) && !this.canAfford()) { return '' }
                else if (!hasUpgrade(this.layer, this.id) && this.canAfford()) { return { 'box-shadow': 'inset 0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px ' + this.color(), 'background-color': 'black', 'color': 'white', 'height': '130px', 'width': '130px', 'border-color': 'white' } }
                else return { 'background-color': this.color(), 'color': 'white', 'border-color': 'green', 'box-shadow': 'inset 0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px ' + this.color2(), 'height': '130px', 'width': '130px' }
            },
        },
        13: {
            fullDisplay:
            ("<h3>False Experiments<br>[ <text style='color:pink'>E-3</text> ]</h3><br><br>Boost <text style='color:#b76ce6'>crystal</text> gain by 333%<br><br>Cost: 2,500 <text style='color:#5d56e8'>Experiment Dust</text>"),
            currencyInternalName: "generation",
            currencyLayer: "SP",
            unlocked() { return hasUpgrade('SP', 12) },
            color() { return '#571a7d' },
            color2() { return '#a859d9' },
            cost() { return new Decimal(2500) },
            canAfford() { return player.SP.generation.gte(this.cost()) },
            style() {
                if (!hasUpgrade(this.layer, this.id) && !this.canAfford()) { return '' }
                else if (!hasUpgrade(this.layer, this.id) && this.canAfford()) { return { 'box-shadow': 'inset 0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px ' + this.color(), 'background-color': 'black', 'color': 'white', 'height': '130px', 'width': '130px', 'border-color': 'white' } }
                else return { 'background-color': this.color(), 'color': 'white', 'border-color': 'green', 'box-shadow': 'inset 0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px ' + this.color2(), 'height': '130px', 'width': '130px' }
            },
        },
        14: {
            fullDisplay:
            ("<h3>Experimental Fusion<br>[ <text style='color:pink'>E-4</text> ]</h3><br><br> <text style='color:#5d56e8'>Experiment Dust</text> Effect is boosted by 45%<br><br>Cost: 32,500 <text style='color:#5d56e8'>Experiment Dust</text>"),
            currencyInternalName: "generation",
            currencyLayer: "SP",
            unlocked() { return hasUpgrade('SP', 13) },
            color() { return '#571a7d' },
            color2() { return '#a859d9' },
            cost() { return new Decimal(32500) },
            canAfford() { return player.SP.generation.gte(this.cost()) },
            style() {
                if (!hasUpgrade(this.layer, this.id) && !this.canAfford()) { return '' }
                else if (!hasUpgrade(this.layer, this.id) && this.canAfford()) { return { 'box-shadow': 'inset 0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px ' + this.color(), 'background-color': 'black', 'color': 'white', 'height': '130px', 'width': '130px', 'border-color': 'white' } }
                else return { 'background-color': this.color(), 'color': 'white', 'border-color': 'green', 'box-shadow': 'inset 0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px ' + this.color2(), 'height': '130px', 'width': '130px' }
            },
        },
    },
})