addLayer("F", {
    name: "Feed", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "I", // This appears on the layer's node. Default is the id with the first letter capitalized|
    position: 0,
    startData() {
        return {
            unlocked: false,
            points: new Decimal(0),
        }
    },
    requires() {
        let requirement = new Decimal(500)
        if (hasUpgrade('F', 12)) requirement = requirement.div(3.5)
        if (player.SP.unlocked) requirement = requirement.times(50)
        if (player.SP.unlocked && player.F.unlocked) requirement = requirement.div(50)
        if (hasUpgrade('F', 32)) requirement = requirement.div(upgradeEffect('F', 32))
        if (hasUpgrade('V', 14)) requirement = requirement.div(upgradeEffect('V', 14))
        if (hasUpgrade('SP', 22)) requirement = requirement.div(upgradeEffect('SP', 22))
        if (player.V.assists > 0) requirement = requirement.div(tmp.V.assistEff.pow(0.4))
        if (hasMilestone('W', 11)) requirement = requirement.div(1.2)
        return requirement

    },

    doReset(resettingLayer) {
        player.V.chaltime = player.V.chaltime.div(1.1)
        if (layers[resettingLayer].row > this.row) layerDataReset(this.layer);
    },

    branches: ["V"],
    tabFormat: {
        "Test Lab": {
            content: [
                "main-display",
                "prestige-button",
                "blank",
                "h-line",
                ["display-text",
                    function () { return '<br>You have ' + formatWhole(player.points) + " <text style='color:purple'>crystals</text>" },
                    {}],
                ["display-text",
                    function () { return 'You have ' + formatWhole(player.P.points) + " <text style='color:skyblue'>chemicals</text>" },
                    {}],
                ["display-text",
                    function () { 
                        if (player.SP.unlocked) return 'You have ' + formatWhole(player.SP.points) + " <text style='color:#a733dc'>experiments</text>" 
                        else if (!player.SP.unlocked) return "?????????????????????????????"
                    },
                    {}],

                "blank",
                "h-line",
                "blank",
                "upgrades",
                "blank",

            ],
            buttonStyle() { return { 'background': 'linear-gradient(to right,orange 33%, yellow 63%)', 'color': 'black', 'box-shadow': '2px 2px 2px orange' } },
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
    color: "#e0c287",
    resource: "isotopes",
    baseResource: "chemicals",
    baseAmount() { return player.P.points },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    type: "static",
    exponent() {
        let ex = new Decimal(1.5)
        if (inChallenge("V", 11)) ex = new Decimal(1.6)
        if (inChallenge("V", 11) && (challengeCompletions("V", 11) == 1)) ex = new Decimal(1.75)
        if (inChallenge("V", 11) && (challengeCompletions("V", 11) == 1)) ex = new Decimal(2.3)
        return ex
    },
    gainMult() {
        let gain = new Decimal(1)
        return gain
    },
    gainExp() {
        let exp = new Decimal(1)
        if (inChallenge("V", 11)) exp = new Decimal(0.9)
        return exp
    },
    hotkeys: [
        { key: "i", description: "i: Reset for Isotopes", onPress() { if (canReset(this.layer) && player.F.unlocked) doReset(this.layer) } },
    ],
    layerShown() { return hasUpgrade('P', 23) || player.F.unlocked || player.SP.unlocked },

    //Build Content
    milestones: {
        11: {
            requirementDescription: "8 Feed",
            effectDescription: `Buy the maximum amount of feed & super powder you can purchase.<br>To get the 2nd row of Feed Upgrades<br>You need 150 Super Power.`,
            done() { return player.F.points.gte(8) },
        },
    },
    upgrades: {
        rows: 5,
        cols: 6,
        11: {
            title: "Compound of Chemicality<br>[ <text style='color:darkred'>I-1</text> ]",
            description: "<br>Learn the mastery of stimulates.<br>Boost <text style='color:#b76ce6'>crystal</text> gain by 75%",
            color() { return '#d1863b' },
            color2() { return '#e0c287' },
            cost() { return new Decimal(1) },
            canAfford() { return player.F.points.gte(this.cost()) },
            style() {
                if (!hasUpgrade(this.layer, this.id) && !this.canAfford()) { return '' }
                else if (!hasUpgrade(this.layer, this.id) && this.canAfford()) { return { 'box-shadow': 'inset 0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px ' + this.color(), 'background-color': 'black', 'color': 'white', 'height': '130px', 'width': '130px', 'border-color': 'white' } }
                else return { 'background-color': this.color(), 'color': 'white', 'border-color': 'green', 'box-shadow': 'inset 0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px ' + this.color2(), 'height': '130px', 'width': '130px' }
            },
        },
        12: {
            title: "Rubber Material<br>[ <text style='color:darkred'>I-2</text> ]",
            description: "<br>Decrease <text style='color:orange'>isotopes</text> requirement & boost <text style='color:skyblue'>P-4</text> by 300%.",
            unlocked() { return hasUpgrade('F', 11) },
            color() { return '#d1863b' },
            color2() { return '#e0c287' },
            cost() { return new Decimal(1) },
            canAfford() { return player.F.points.gte(this.cost()) },
            style() {
                if (!hasUpgrade(this.layer, this.id) && !this.canAfford()) { return '' }
                else if (!hasUpgrade(this.layer, this.id) && this.canAfford()) { return { 'box-shadow': 'inset 0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px ' + this.color(), 'background-color': 'black', 'color': 'white', 'height': '130px', 'width': '130px', 'border-color': 'white' } }
                else return { 'background-color': this.color(), 'color': 'white', 'border-color': 'green', 'box-shadow': 'inset 0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px ' + this.color2(), 'height': '130px', 'width': '130px' }
            },
        },
        13: {
            title: "Compressive Health<br>[ <text style='color:darkred'>I-3</text> ]",
            description: "<br>Boost <text style='color:#5b85b3'>chemical</text> gain by 40%, ^1.05 <text style='color:#b76ce6'>crystal</text> gain",
            currencyDisplayName: "crystals",
            currencyInternalName: "points",
            unlocked() { return hasUpgrade('F', 12) },
            color() { return '#d1863b' },
            color2() { return '#e0c287' },
            cost() { return new Decimal(7500) },
            canAfford() { return player.points.gte(this.cost()) },
            style() {
                if (!hasUpgrade(this.layer, this.id) && !this.canAfford()) { return '' }
                else if (!hasUpgrade(this.layer, this.id) && this.canAfford()) { return { 'box-shadow': 'inset 0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px ' + this.color(), 'background-color': 'black', 'color': 'white', 'height': '130px', 'width': '130px', 'border-color': 'white' } }
                else return { 'background-color': this.color(), 'color': 'white', 'border-color': 'green', 'box-shadow': 'inset 0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px ' + this.color2(), 'height': '130px', 'width': '130px' }
            },


        },
        14: {
            title: "Visor of Life<br>[ <text style='color:darkred'>I-4</text> ]",
            description: "<br><text style='color:#b76ce6'>Crystals</text> boost <text style='color:#5b85b3'>chemicals</text> in a way.<br>",
            effect() {
                let effect1 = (player.points.max(1).add(1).pow(0.07)).max(1).min(10);
                if (hasUpgrade('SP', 15)) effect1 = effect1.times(upgradeEffect('SP', 15))
                return effect1
            },
            effectDisplay() {
                let capped = upgradeEffect(this.layer, this.id).gte(10) ? "(% Capped)" : "";
                let text = `+${format(upgradeEffect(this.layer, this.id).minus(1).times(100))}%${capped}`;
                return text;
            },
            currencyDisplayName: "crystals",
            currencyInternalName: "points",
            unlocked() { return hasUpgrade('F', 13) },
            color() { return '#d1863b' },
            color2() { return '#e0c287' },
            cost() { return new Decimal(25000) },
            canAfford() { return player.points.gte(this.cost()) },
            style() {
                if (!hasUpgrade(this.layer, this.id) && !this.canAfford()) { return '' }
                else if (!hasUpgrade(this.layer, this.id) && this.canAfford()) { return { 'box-shadow': 'inset 0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px ' + this.color(), 'background-color': 'black', 'color': 'white', 'height': '130px', 'width': '130px', 'border-color': 'white' } }
                else return { 'background-color': this.color(), 'color': 'white', 'border-color': 'green', 'box-shadow': 'inset 0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px ' + this.color2(), 'height': '130px', 'width': '130px' }
            },
        },
        15: {
            title: "Empty Stim<br>[ <text style='color:darkred'>I-5</text> ]",
            description: "<br>There is no such thing as progression.<br><text style='color:orange'>Isotopes</text> boosts <text style='color:#a733dc'>E-1</text><br>",
            effect() {
                let effect1 = (player.F.points.max(1).add(1).pow(0.3)).max(1).min(3.5);
                return effect1
            },
            effectDisplay() {
                let capped = upgradeEffect(this.layer, this.id).gte(3.5) ? "(% Capped)" : "";
                let text = `+${format(upgradeEffect(this.layer, this.id).minus(1).times(100))}%${capped}`;
                return text;
            },
            unlocked() { return hasUpgrade('F', 14) },
            color() { return '#d1863b' },
            color2() { return '#e0c287' },
            cost() { return new Decimal(3) },
            canAfford() { return player.F.points.gte(this.cost()) },
            style() {
                if (!hasUpgrade(this.layer, this.id) && !this.canAfford()) { return '' }
                else if (!hasUpgrade(this.layer, this.id) && this.canAfford()) { return { 'box-shadow': 'inset 0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px ' + this.color(), 'background-color': 'black', 'color': 'white', 'height': '130px', 'width': '130px', 'border-color': 'white' } }
                else return { 'background-color': this.color(), 'color': 'white', 'border-color': 'green', 'box-shadow': 'inset 0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px ' + this.color2(), 'height': '130px', 'width': '130px' }
            },
        },
        16: {
            title: "Experiment Isotope Type XI<br>[ <text style='color:darkred'>I-6</text> ]",
            description: "<br>Across it all; it's only you.<br>Boost <text style='color:#5d56e8'>Experiment Dust</text> based on <text style='color:orange'>Isotopes</text>",
            cost() {return new Decimal(140000) },
            effect() {
                let effect1 = (player.F.points.max(1).add(1).pow(0.295)).max(1).min(150);
                return effect1
            },
            currencyDisplayName: "chemicals",
            currencyInternalName: "points",
            currencyLayer: "P",
            effectDisplay() {
                let capped = upgradeEffect(this.layer, this.id).gte(150) ? "(% Capped)" : "";
                let text = `+${format(upgradeEffect(this.layer, this.id).minus(1).times(100))}% ${capped}`;
                return text;
            },
            unlocked() { return hasUpgrade('F', 15) && player.SP.unlocked },
            color() { return '#d1863b' },
            color2() { return '#e0c287' },
            canAfford() { return player.P.points.gte(this.cost()) },
            style() {
                if (!hasUpgrade(this.layer, this.id) && !this.canAfford()) { return '' }
                else if (!hasUpgrade(this.layer, this.id) && this.canAfford()) { return { 'box-shadow': 'inset 0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px ' + this.color(), 'background-color': 'black', 'color': 'white', 'height': '130px', 'width': '130px', 'border-color': 'white' } }
                else return { 'background-color': this.color(), 'color': 'white', 'border-color': 'green', 'box-shadow': 'inset 0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px ' + this.color2(), 'height': '130px', 'width': '130px' }
            },

        },
        21: {
            title: "Cooldown Maker<br>[ <text style='color:darkred'>I-7</text> ]",
            description: "<br><text style='color:#b76ce6'>Crystal</text> boosts <text style='color:#5b85b3'>Chemicals</text>",
            cost() {return new Decimal(5) },
            effect() {
                let effect1 = (player.points.max(1).add(1).pow(0.08)).max(1).min(7);
                return effect1
            },
            effectDisplay() {
                let capped = upgradeEffect(this.layer, this.id).gte(7) ? "(% Capped)" : "";
                let text = `+${format(upgradeEffect(this.layer, this.id).minus(1).times(100))}% ${capped}`;
                return text;
            },
            unlocked() { return (player.SP.generation.gte(150) && hasUpgrade('F', 16)) || hasUpgrade('F', 21) },
            color() { return '#d1863b' },
            color2() { return '#e0c287' },
            canAfford() { return player.F.points.gte(this.cost()) },
            style() {
                if (!hasUpgrade(this.layer, this.id) && !this.canAfford()) { return '' }
                else if (!hasUpgrade(this.layer, this.id) && this.canAfford()) { return { 'box-shadow': 'inset 0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px ' + this.color(), 'background-color': 'black', 'color': 'white', 'height': '130px', 'width': '130px', 'border-color': 'white' } }
                else return { 'background-color': this.color(), 'color': 'white', 'border-color': 'green', 'box-shadow': 'inset 0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px ' + this.color2(), 'height': '130px', 'width': '130px' }
            },
        },
        22: {
            title: "Chemicalize Isotopes<br>[ <text style='color:darkred'>I-8</text> ]",
            description: "<br><text style='color:skyblue'>Chemicals</text> boosts <text style='color:purple'>E-4</text>",
            cost() {return new Decimal(7) },
            effect() {
                let effect1 = (player.P.points.max(1).add(1).pow(0.065)).max(1).min(20);
                if (hasUpgrade('F', 31)) effect1 = effect1.times(upgradeEffect('F', 31))
                return effect1
            },
            effectDisplay() {
                let capped = upgradeEffect(this.layer, this.id).gte(20) ? "(% Capped)" : "";
                let text = `+${format(upgradeEffect(this.layer, this.id).minus(1).times(100))}% ${capped}`;
                return text;
            },
            unlocked() { return hasUpgrade('F', 21) },
            color() { return '#d1863b' },
            color2() { return '#e0c287' },
            canAfford() { return player.F.points.gte(this.cost()) },
            style() {
                if (!hasUpgrade(this.layer, this.id) && !this.canAfford()) { return '' }
                else if (!hasUpgrade(this.layer, this.id) && this.canAfford()) { return { 'box-shadow': 'inset 0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px ' + this.color(), 'background-color': 'black', 'color': 'white', 'height': '130px', 'width': '130px', 'border-color': 'white' } }
                else return { 'background-color': this.color(), 'color': 'white', 'border-color': 'green', 'box-shadow': 'inset 0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px ' + this.color2(), 'height': '130px', 'width': '130px' }
            },
        },
        23: {
            title: "Isotopes = Experiments<br>[ <text style='color:darkred'>I-9</text> ]",
            description: "<br><text style='color:orange'>Isotopes</text> decreases <text style='color:purple'>Experiment</text> Requirement",
            cost(){ return new Decimal(8)},
            effect() {
                let effect1 = (player.F.points.max(1).add(1).pow(0.7)).max(1).min(25);
                if (hasUpgrade('P', 25)) effect1 = effect1.times(upgradeEffect('P', 25))
                return effect1
            },
            effectDisplay() {
                let capped = upgradeEffect(this.layer, this.id).gte(25) ? "(% Capped)" : "";
                let text = `-${format(upgradeEffect(this.layer, this.id).minus(1).times(100))}% ${capped}`;
                return text;
            },
            unlocked() { return hasUpgrade('F', 22) },
            color() { return '#d1863b' },
            color2() { return '#e0c287' },
            canAfford() { return player.F.points.gte(this.cost()) },
            style() {
                if (!hasUpgrade(this.layer, this.id) && !this.canAfford()) { return '' }
                else if (!hasUpgrade(this.layer, this.id) && this.canAfford()) { return { 'box-shadow': 'inset 0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px ' + this.color(), 'background-color': 'black', 'color': 'white', 'height': '130px', 'width': '130px', 'border-color': 'white' } }
                else return { 'background-color': this.color(), 'color': 'white', 'border-color': 'green', 'box-shadow': 'inset 0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px ' + this.color2(), 'height': '130px', 'width': '130px' }
            },
        },
        24: {
            title: "Dustive Touch<br>[ <text style='color:darkred'>I-10</text> ]",
            description: "<br><text style='color:#5d56e8'>Experiment Dust</text> boosts <text style='color:#b76ce6'>crystal</text> gain",
            cost(){ return new Decimal(9)},
            effect() {
                let effect1 = (player.SP.points.max(1).add(1).pow(0.31)).max(1).min(13);
                return effect1
            },
            effectDisplay() {
                let capped = upgradeEffect(this.layer, this.id).gte(10) ? "(% Capped)" : "";
                let text = `+${format(upgradeEffect(this.layer, this.id).minus(1).times(100))}% ${capped}`;
                return text;
            },
            unlocked() { return hasUpgrade('F', 23) },
            color() { return '#d1863b' },
            color2() { return '#e0c287' },
            canAfford() { return player.F.points.gte(this.cost()) },
            style() {
                if (!hasUpgrade(this.layer, this.id) && !this.canAfford()) { return '' }
                else if (!hasUpgrade(this.layer, this.id) && this.canAfford()) { return { 'box-shadow': 'inset 0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px ' + this.color(), 'background-color': 'black', 'color': 'white', 'height': '130px', 'width': '130px', 'border-color': 'white' } }
                else return { 'background-color': this.color(), 'color': 'white', 'border-color': 'green', 'box-shadow': 'inset 0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px ' + this.color2(), 'height': '130px', 'width': '130px' }
            },
        },
        25: {
            title: "Chemical Reunion<br>[ <text style='color:darkred'>I-11</text> ]",
            description: "<br>Lower <br><text style='color:purple'>Experiment</text> Requirement based on <text style='color:skyblue'>Chemicals</text>",
            cost() { return new Decimal(13500000000)},
            currencyDisplayName: "Chemicals",
            currencyInternalName: "points",
            currencyLayer: "P",
            effect() {
                let effect1 = (player.P.points.max(1).add(1).pow(0.075)).max(1).min(15);
                return effect1
            },
            effectDisplay() {
                let capped = upgradeEffect(this.layer, this.id).gte(15) ? "(% Capped)" : "";
                let text = `-${format(upgradeEffect(this.layer, this.id).minus(1).times(100))}% ${capped}`;
                return text;
            },
            unlocked() { return hasUpgrade('F', 24) },
            color() { return '#d1863b' },
            color2() { return '#e0c287' },
            canAfford() { return player.P.points.gte(this.cost()) },
            style() {
                if (!hasUpgrade(this.layer, this.id) && !this.canAfford()) { return '' }
                else if (!hasUpgrade(this.layer, this.id) && this.canAfford()) { return { 'box-shadow': 'inset 0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px ' + this.color(), 'background-color': 'black', 'color': 'white', 'height': '130px', 'width': '130px', 'border-color': 'white' } }
                else return { 'background-color': this.color(), 'color': 'white', 'border-color': 'green', 'box-shadow': 'inset 0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px ' + this.color2(), 'height': '130px', 'width': '130px' }
            },
        },
        26: {
            title: "Insomnic Dreams<br>[ <text style='color:darkred'>I-12</text> ]",
            description: "<br>Reduce <text style='color:skyblue'>Chemical</text> Buyable Scaling slightly",
            cost() { return new Decimal(7.77e11)},
            unlocked() { return hasUpgrade('F', 25) },
            color() { return '#d1863b' },
            color2() { return '#e0c287' },
            canAfford() { return player.P.points.gte(this.cost()) },
            style() {
                if (!hasUpgrade(this.layer, this.id) && !this.canAfford()) { return '' }
                else if (!hasUpgrade(this.layer, this.id) && this.canAfford()) { return { 'box-shadow': 'inset 0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px ' + this.color(), 'background-color': 'black', 'color': 'white', 'height': '130px', 'width': '130px', 'border-color': 'white' } }
                else return { 'background-color': this.color(), 'color': 'white', 'border-color': 'green', 'box-shadow': 'inset 0px 0px 5px ' + (player.timePlayed % 2 + 5) + 'px ' + this.color2(), 'height': '130px', 'width': '130px' }
            },
        },
    },
})