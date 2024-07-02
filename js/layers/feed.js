addLayer("F", {
    name: "Feed", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "F", // This appears on the layer's node. Default is the id with the first letter capitalized|
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
        if (hasMilestone('W', 11)) requirement = requirement.div(1.2)
        return requirement

    },
    branches: ["V"],
    nodeStyle() {
        return {
            "background": (player.F.unlocked || canReset("F")) ? "radial-gradient(#e0c287, #d1863b)" : "#bf8f8f",
        }
    },
    componentStyles: {
        "prestige-button": {
            background() {
                return (canReset("F")) ? "radial-gradient(#e0c287, #d1863b)" : "#bf8f8f"
            },
        },
    },
    tabFormat: {
        "Hall A": {
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
                
                "blank",
                "h-line",
                "blank",
                "upgrades",
                "blank",
                
            ],
            buttonStyle(){return {'background':'linear-gradient(to right,orange 33%, yellow 63%)','color':'black','box-shadow':'2px 2px 2px orange'}},
            style(){
                return {
                    'background': 'linear-gradient(135deg, #000000 22px, #616362 22px, #616362 24px, transparent 24px, transparent 67px, #616362 67px, #616362 69px, transparent 69px),linear-gradient(225deg, #000000 22px, #616362 22px, #616362 24px, transparent 24px, transparent 67px, #616362 67px, #616362 69px, transparent 69px)0 64px',
                    'background-color':'black',
                    'background-size':'64px 128px',
                    "background-position":"100%"+" "+(player.timePlayed%200)+"%"
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
    canBuyMax() { return hasMilestone('F', 11) },
    hotkeys: [
        { key: "f", description: "f: Reset for Feed", onPress() { if (canReset(this.layer) && player.F.unlocked) doReset(this.layer) } },
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
            title: "Compound of Chemicality<br>[ <text style='color:red'>I-1</text> ]",
            description: "<br>Boost Crystal Gain by 75%",
            color(){return '#d1863b'},
            color2(){return '#e0c287'},
            cost() {return new Decimal(1)},
            canAfford() {return player.F.points.gte(this.cost())},
            style() {
                if(!hasUpgrade(this.layer,this.id)&&!this.canAfford()){return ''}
                else if(!hasUpgrade(this.layer,this.id)&&this.canAfford()){return {'box-shadow':'inset 0px 0px 5px '+(player.timePlayed%2+5)+'px '+this.color(), 'background-color':'black', 'color':'white', 'height':'130px', 'width':'130px','border-color':'white'}}
                else return {'background-color':this.color(), 'color':'white', 'border-color':'green', 'box-shadow':'inset 0px 0px 5px '+(player.timePlayed%2+5)+'px '+this.color2(), 'height':'130px', 'width':'130px'}
            },
        },
        12: {
            title: "Buster<br>[ <text style='color:skyblue'>F-2</text> ]",
            description: "<br>Decrease Feed Requirement & Boost <text style='color:skyblue'>P-4</text> by 300%.",
            unlocked() { return hasUpgrade('F', 11) },
            color(){return '#d1863b'},
            color2(){return '#e0c287'},
            cost() {return new Decimal(1)},
            canAfford() {return player.F.points.gte(this.cost())},
            style() {
                if(!hasUpgrade(this.layer,this.id)&&!this.canAfford()){return ''}
                else if(!hasUpgrade(this.layer,this.id)&&this.canAfford()){return {'box-shadow':'inset 0px 0px 5px '+(player.timePlayed%2+5)+'px '+this.color(), 'background-color':'black', 'color':'white', 'height':'130px', 'width':'130px','border-color':'white'}}
                else return {'background-color':this.color(), 'color':'white', 'border-color':'green', 'box-shadow':'inset 0px 0px 5px '+(player.timePlayed%2+5)+'px '+this.color2(), 'height':'130px', 'width':'130px'}
            },
        },
        13: {
            title: "Health<br>[<red>F-3</red>]",
            description: "Boost Powder Gain by 40%, ^1.05 Particle Gain",
            cost: new Decimal(7500),
            currencyDisplayName: "Particles",
            currencyInternalName: "points",
            unlocked() { return hasUpgrade('F', 12) },
        },
        14: {
            title: "Feed IV",
            description: "Feeder + Feeder + Feeder + Feeder? Particles boosts Powder",
            cost: new Decimal(25000),
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
            currencyDisplayName: "Particles",
            currencyInternalName: "points",
            unlocked() { return hasUpgrade('F', 13) },
        },
        15: {
            title: "Feed V",
            description: "Feeding Movement! Feed boosts SP-I Upgrade.",
            cost: new Decimal(3),
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
        },
        16: {
            title: "Feed VI",
            description: "Feeding Movement II! Feed boosts Super Power effect",
            cost: new Decimal(150000),
            currencyDisplayName: "Particles",
            currencyInternalName: "points",
            effect() {
                let effect1 = (player.F.points.max(1).add(1).pow(0.28)).max(1).min(7);
                return effect1
            },
            effectDisplay() {
                let capped = upgradeEffect(this.layer, this.id).gte(7) ? "(% Capped)" : "";
                let text = `+${format(upgradeEffect(this.layer, this.id).minus(1).times(100))}% ${capped}`;
                return text;
            },
            unlocked() { return hasUpgrade('F', 15) && player.SP.unlocked },
        },
        21: {
            title: "Super Feed I",
            description: "Super Seeds? Particles boost Powder Gain",
            cost: new Decimal(5),
            effect() {
                let effect1 = (player.points.max(1).add(1).pow(0.09)).max(1).min(7);
                return effect1
            },
            effectDisplay() {
                let capped = upgradeEffect(this.layer, this.id).gte(7) ? "(% Capped)" : "";
                let text = `+${format(upgradeEffect(this.layer, this.id).minus(1).times(100))}% ${capped}`;
                return text;
            },
            unlocked() { return player.SP.generation.gte(150) || hasUpgrade('F', 21) },
        },
        22: {
            title: "Super Feed II",
            description: "Powder boost SP-IV",
            cost: new Decimal(7),
            effect() {
                let effect1 = (player.P.points.max(1).add(1).pow(0.06)).max(1).min(20);
                if (hasUpgrade('F', 31)) effect1 = effect1.times(upgradeEffect('F', 31))
                return effect1
            },
            effectDisplay() {
                let capped = upgradeEffect(this.layer, this.id).gte(20) ? "(% Capped)" : "";
                let text = `+${format(upgradeEffect(this.layer, this.id).minus(1).times(100))}% ${capped}`;
                return text;
            },
            unlocked() { return hasUpgrade('F', 21) },
        },
        23: {
            title: "Super Feed III",
            description: "Feed decreases Super Powder Requirement",
            cost: new Decimal(7),
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
        },
        24: {
            title: "Super Feed IV",
            description: "Super Powder boosts Particle gain",
            cost: new Decimal(8),
            effect() {
                let effect1 = (player.SP.points.max(1).add(1).pow(0.33)).max(1).min(10);
                return effect1
            },
            effectDisplay() {
                let capped = upgradeEffect(this.layer, this.id).gte(10) ? "(% Capped)" : "";
                let text = `+${format(upgradeEffect(this.layer, this.id).minus(1).times(100))}% ${capped}`;
                return text;
            },
            unlocked() { return hasUpgrade('F', 23) },
        },
        25: {
            title: "Super Feed V",
            description: "Lower Super Powder Requirement based on Powder",
            cost: new Decimal(150000000),
            currencyDisplayName: "Powder",
            currencyInternalName: "points",
            currencyLayer: "P",
            effect() {
                let effect1 = (player.P.points.max(1).add(1).pow(0.09)).max(1).min(15);
                return effect1
            },
            effectDisplay() {
                let capped = upgradeEffect(this.layer, this.id).gte(15) ? "(% Capped)" : "";
                let text = `-${format(upgradeEffect(this.layer, this.id).minus(1).times(100))}% ${capped}`;
                return text;
            },
            unlocked() { return hasUpgrade('F', 24) },
        },
        26: {
            title: "Super Feed VI",
            description: "Super Power Gain is boosted based on Particles",
            cost: new Decimal(750000000),
            currencyDisplayName: "Powder",
            currencyInternalName: "points",
            currencyLayer: "P",
            effect() {
                let effect1 = (player.points.max(1).add(1).pow(0.11)).max(1).min(22);
                return effect1
            },
            effectDisplay() {
                let capped = upgradeEffect(this.layer, this.id).gte(22) ? "(% Capped)" : "";
                let text = `+${format(upgradeEffect(this.layer, this.id).minus(1).times(100))}% ${capped}`;
                return text;
            },
            unlocked() { return hasUpgrade('F', 25) },
        },
        31: {
            title: "Super² Feed I",
            description: "Feed boosts SF-II Effect",
            cost: new Decimal(1.5e9),
            currencyDisplayName: "Powder",
            currencyInternalName: "points",
            currencyLayer: "P",
            effect() {
                let effect1 = (player.F.points.max(1).add(1).pow(0.3)).max(1).min(12);
                if (hasUpgrade('SP', 21)) effect1 = effect1.times(upgradeEffect('SP', 21))
                return effect1
            },
            effectDisplay() {
                let capped = upgradeEffect(this.layer, this.id).gte(12) ? "(% Capped)" : "";
                let text = `+${format(upgradeEffect(this.layer, this.id).minus(1).times(100))}% ${capped}`;
                return text;
            },
            unlocked() { return hasUpgrade('F', 26) },
        },
        32: {
            title: "Super² Feed II",
            description: "Feed boosts itself",
            cost: new Decimal(2.2e9),
            currencyDisplayName: "Powder",
            currencyInternalName: "points",
            currencyLayer: "P",
            effect() {
                let effect1 = (player.F.points.max(1).add(1).pow(0.47)).max(1).min(12);
                if (hasUpgrade('SP', 21)) effect1 = effect1.times(upgradeEffect('SP', 21))
                return effect1
            },
            effectDisplay() {
                let text = `+${format(upgradeEffect(this.layer, this.id).minus(1).times(100))}%`;
                return text;
            },
            unlocked() { return hasUpgrade('F', 31) },
        },
        33: {
            title: "Super² Feed III",
            description: "Particles boosts itself",
            cost: new Decimal(10),
            effect() {
                let effect1 = (player.points.max(1).add(1).pow(0.115)).max(1).min(12);
                return effect1
            },
            effectDisplay() {
                let text = `+${format(upgradeEffect(this.layer, this.id).minus(1).times(100))}%`;
                return text;
            },
            unlocked() { return hasUpgrade('F', 32) },
        },
        34: {
            title: "Super² Feed IV",
            description: "Feed lowers Vaccine Requirement slightly",
            cost: new Decimal(14),
            effect() {
                let effect1 = (player.F.points.max(1).add(1).pow(0.04)).max(1).min(16);
                return effect1
            },
            effectDisplay() {
                let text = `-${format(upgradeEffect(this.layer, this.id).minus(1).times(100))}%`;
                return text;
            },
            unlocked() { return hasUpgrade('F', 33) && hasMilestone('V', 13) },
        },
        35: {
            title: "Super² Feed V",
            description: "+30% Particle Gain, +50% Powder Gain, +33% Super Power Gain",
            cost: new Decimal(15),
            unlocked() { return hasUpgrade('F', 34) && hasMilestone('V', 13) },
        },
        36: {
            title: "Super² Feed VI",
            description: "Unlock the next generation in Super Powder Layer, +60% Particles",
            cost: new Decimal(16),
            unlocked() { return hasUpgrade('F', 35) && hasMilestone('V', 13) },
        },
    },
})