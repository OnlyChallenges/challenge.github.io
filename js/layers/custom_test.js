addLayer("P", {
    name: "Powder", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "C", // This appears on the layer's node. Default is the id with the first letter capitalized
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

    passiveGeneration() {
        let pass = new Decimal(0)
        if (hasUpgrade('V', 13)) pass = pass.add(upgradeEffect('V', 13).div(2))
        if (player.P.points.gte(1e10)) pass = new Decimal(0)
        return pass
    },
    nodeStyle() {
        return {
            "background": (player.P.unlocked || canReset("P")) ? "radial-gradient(#5b85b3, #333232)" : "#bf8f8f",
        }
    },
    componentStyles: {
        "prestige-button": {
            background() {
                return (canReset("P")) ? "radial-gradient(#5b85b3, #333232)" : "#bf8f8f"
            },
        },
    },
    color: "#5b85b3",
    resource: "chemicals",
    baseResource: "crystals",
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
        if (hasUpgrade('P', 15)) gain = gain.minus(0.115)
        if (hasUpgrade('P', 22)) gain = gain.add(upgradeEffect('P', 22))
        if (hasUpgrade('F', 14)) gain = gain.times(upgradeEffect('F', 14))
        if (hasUpgrade('P', 24)) gain = gain.times(upgradeEffect('P', 24))
        if (hasUpgrade('F', 21)) gain = gain.times(upgradeEffect('F', 21))
        if (hasUpgrade('V', 12)) gain = gain.times(6)
        if (hasUpgrade('F', 34)) gain = gain.times(1.5)
        if (hasUpgrade('W', 11)) gain = gain.pow(1.035)
        if (hasUpgrade('W', 13)) gain = gain.times(upgradeEffect('W', 13))
        if (player.SP.generation2 > 0) gain = gain.times(tmp.SP.generation2Eff)
        if (getBuyableAmount('W', 12).gte(1)) gain = gain.times(buyableEffect('W', 12))
        if ((getBuyableAmount('V', 11)).gte(1)) eff = eff.pow(buyableEffect('V', 11))
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
        if (layers[resettingLayer].row > this.row) layerDataReset(this.layer);
        if (hasMilestone('V', 11)) player.P.upgrades.push("11", "12", "13", "14", "15", "21", "22", "23", "24", "25");
        if (hasMilestone('V', 15)) player.F.upgrades.push("36");
    },
    branches: ["F", "SP", "V", "W"],
    tabFormat: {
        "Spawn": {
            content: [
                "main-display",
                "prestige-button",
                "blank",
                "h-line",
                ["display-text",
                    function () { return '<br>You have ' + formatWhole(player.points) + " <text style='color:purple'>crystals</text>" },
                    {}],
                ["display-text",
                    function () { return `Time: formatBaseTime(player.timePlayed)`}
                ]
                ["display-text",
                    function () {
                        let x = getUndulatingColor()
                        if (tmp[this.layer].passiveGeneration.lte(0) && !hasUpgrade('V', 13) && player.V.spec == false && player.V.unlocked == false)
                            return ""
                        if (tmp[this.layer].passiveGeneration.lte(0) && !hasUpgrade('V', 13) && player.V.spec == true && player.V.unlocked == false)
                            return ""
                        if (tmp[this.layer].passiveGeneration.lte(0) && !hasUpgrade('V', 13) && player.V.unlocked == true)
                            return ""
                        if (tmp[this.layer].passiveGeneration.gte(0.0001))
                            return "+ " + colorText("b", x, formatWhole(tmp[this.layer].resetGain.times(tmp[this.layer].passiveGeneration)))  +" Powder/sec (+" + format(tmp[this.layer].passiveGeneration.times(100)) + "%)"
                        if (player.P.points.gte(1e10) && tmp[this.layer].passiveGeneration.lte(0) && hasUpgrade('V', 13))
                            return "+ " + colorText("b", x, "0") + " Powder/sec (0%)"
                    },
                    {}],
                ["display-text",
                    function () {
                        let x = getUndulatingColor()
                        if (player.P.points.gte(1e10) && tmp[this.layer].passiveGeneration.lte(0) && hasUpgrade('V', 13) && player.W.unlocked == false)
                            return "You do not have " + colorText("b", x, "??????") + " Unlocked"
                        if (player.P.points.gte(1e10) && tmp[this.layer].passiveGeneration.lte(0) && hasUpgrade('V', 13) && player.W.unlocked == true)
                            return "You do not have " + colorText("b", x, "Water Upgrade 11") + " Unlocked"
                        if (player.P.points.lte(1e50) && tmp[this.layer].passiveGeneration.gte(0.0001) && player.W.unlocked && hasUpgrade('W', 15))
                            return "Passive Cap Changed: 1e10 >>> 1e50"
                     },
                    {}],
                "blank",
                "h-line",
                "blank",
                "upgrades",
                "blank",
                
            ],
            buttonStyle(){return {'background':'linear-gradient(to right,skyblue 33%, blue 92%)','color':'black','box-shadow':'2px 2px 2px skyblue'}},
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
    infoboxes: {
        lore: {
            title: "Tutorial",
            body: `
            Hello!; Welcome to <ruins>Experiment 205 Idle</ruins>, I would like to clarify that this is indeed, still in beta.<br> 
            There will be multiple bugs, issues, and occurences as the game update, so please be patient!<br><br>
            -------------------------------------<br><br>

            How to play:<br>
            Each Row (Layer) will have content regarding the game or content, it'll progress more and more as we move forward.
            To start, get some Powder & Upgrades! Look at your achievements to get through the game better!
            `,
        },
    },

    //Build Content
    upgrades: {
        rows: 5,
        cols: 5,
        11: {
            title: "Simplicity<br>[ <text style='color:skyblue'>P-1</text> ]",
            description: "<br>Boost Crystal gain by 20%",
            color(){return '#1b39a6'},
            color2(){return '#5b85b3'},
            cost() {return new Decimal(6)},
            canAfford() {return player.P.points.gte(this.cost())},
            style() {
                if(!hasUpgrade(this.layer,this.id)&&!this.canAfford()){return ''}
                else if(!hasUpgrade(this.layer,this.id)&&this.canAfford()){return {'box-shadow':'inset 0px 0px 5px '+(player.timePlayed%2+5)+'px '+this.color(), 'background-color':'black', 'color':'white', 'height':'130px', 'width':'130px','border-color':'white'}}
                else return {'background-color':this.color(), 'color':'white', 'border-color':'green', 'box-shadow':'inset 0px 0px 5px '+(player.timePlayed%2+5)+'px '+this.color2(), 'height':'130px', 'width':'130px'}
            },
        },
        12: {
            title: "The Idea<br>[ <text style='color:skyblue'>P-2</text> ]",
            description: "<br>Decrease Chemical Requirement Slightly...",
            unlocked() { return hasUpgrade('P', 11) },
            color(){return '#1b39a6'},
            color2(){return '#5b85b3'},
            cost() {return new Decimal(13)},
            canAfford() {return player.P.points.gte(this.cost())},
            style() {
                if(!hasUpgrade(this.layer,this.id)&&!this.canAfford()){return ''}
                else if(!hasUpgrade(this.layer,this.id)&&this.canAfford()){return {'box-shadow':'inset 0px 0px 5px '+(player.timePlayed%2+5)+'px '+this.color(), 'background-color':'black', 'color':'white', 'height':'130px', 'width':'130px','border-color':'white'}}
                else return {'background-color':this.color(), 'color':'white', 'border-color':'green', 'box-shadow':'inset 0px 0px 5px '+(player.timePlayed%2+5)+'px '+this.color2(), 'height':'130px', 'width':'130px'}
            },
        },
        13: {
            title: "Processing<br>[ <text style='color:skyblue'>P-3</text> ]",
            description: "<br>Improve Crystal gain by 40% but decrease Chemical gain by 7.5%",
            cost() {return new Decimal(35)},
            currencyDisplayName: "Crystals",
            currencyInternalName: "points",
            unlocked() { return hasUpgrade('P', 12) },
            color(){return '#1b39a6'},
            color2(){return '#5b85b3'},
            canAfford() {return player.points.gte(this.cost())},
            style() {
                if(!hasUpgrade(this.layer,this.id)&&!this.canAfford()){return ''}
                else if(!hasUpgrade(this.layer,this.id)&&this.canAfford()){return {'box-shadow':'inset 0px 0px 5px '+(player.timePlayed%2+5)+'px '+this.color(), 'background-color':'black', 'color':'white', 'height':'130px', 'width':'130px','border-color':'white'}}
                else return {'background-color':this.color(), 'color':'white', 'border-color':'green', 'box-shadow':'inset 0px 0px 5px '+(player.timePlayed%2+5)+'px '+this.color2(), 'height':'130px', 'width':'130px'}
            },
        },
        14: {
            title: "Developers<br>[ <text style='color:skyblue'>P-4</text> ]",
            description: "<br>Boost Crystals based on itself.",
            cost(){return new Decimal(36)},
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
            color(){return '#1b39a6'},
            color2(){return '#5b85b3'},
            canAfford() {return player.P.points.gte(this.cost())},
            style() {
                if(!hasUpgrade(this.layer,this.id)&&!this.canAfford()){return ''}
                else if(!hasUpgrade(this.layer,this.id)&&this.canAfford()){return {'box-shadow':'inset 0px 0px 5px '+(player.timePlayed%2+5)+'px '+this.color(), 'background-color':'black', 'color':'white', 'height':'130px', 'width':'130px','border-color':'white'}}
                else return {'background-color':this.color(), 'color':'white', 'border-color':'green', 'box-shadow':'inset 0px 0px 5px '+(player.timePlayed%2+5)+'px '+this.color2(), 'height':'130px', 'width':'130px'}
            },
        },
        15: {
            title: "Versions<br>[ <text style='color:skyblue'>P-5</text> ]",
            description: "<br>Decrease Chemical Gain by 11.5%, but increase Particle Gain by 70%",
            currencyDisplayName: "Crystals",
            currencyInternalName: "points",
            unlocked() { return hasUpgrade('P', 14) },
            color(){return '#1b39a6'},
            color2(){return '#5b85b3'},
            cost() {return new Decimal(125)},
            canAfford() {return player.points.gte(this.cost())},
            style() {
                if(!hasUpgrade(this.layer,this.id)&&!this.canAfford()){return ''}
                else if(!hasUpgrade(this.layer,this.id)&&this.canAfford()){return {'box-shadow':'inset 0px 0px 5px '+(player.timePlayed%2+5)+'px '+this.color(), 'background-color':'black', 'color':'white', 'height':'130px', 'width':'130px','border-color':'white'}}
                else return {'background-color':this.color(), 'color':'white', 'border-color':'green', 'box-shadow':'inset 0px 0px 5px '+(player.timePlayed%2+5)+'px '+this.color2(), 'height':'130px', 'width':'130px'}
            },
        },
        21: {
            title: "Lore<br>[ <text style='color:skyblue'>P-6</text> ]",
            description: "<br>Boosts Crystal Gain based on Chemicals",
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
            color(){return '#1b39a6'},
            color2(){return '#5b85b3'},
            cost() {return new Decimal(150)},
            canAfford() {return player.P.points.gte(this.cost())},
            style() {
                if(!hasUpgrade(this.layer,this.id)&&!this.canAfford()){return ''}
                else if(!hasUpgrade(this.layer,this.id)&&this.canAfford()){return {'box-shadow':'inset 0px 0px 5px '+(player.timePlayed%2+5)+'px '+this.color(), 'background-color':'black', 'color':'white', 'height':'130px', 'width':'130px','border-color':'white'}}
                else return {'background-color':this.color(), 'color':'white', 'border-color':'green', 'box-shadow':'inset 0px 0px 5px '+(player.timePlayed%2+5)+'px '+this.color2(), 'height':'130px', 'width':'130px'}
            },
        },
        22: {
            title: "System.Start<br>[ <text style='color:skyblue'>P-7</text> ]",
            description: "<br>Chemicals boosts itself (Additive)",
            currencyDisplayName: "Crystals",
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
            color(){return '#1b39a6'},
            color2(){return '#5b85b3'},
            cost() {return new Decimal(300)},
            canAfford() {return player.points.gte(this.cost())},
            style() {
                if(!hasUpgrade(this.layer,this.id)&&!this.canAfford()){return ''}
                else if(!hasUpgrade(this.layer,this.id)&&this.canAfford()){return {'box-shadow':'inset 0px 0px 5px '+(player.timePlayed%2+5)+'px '+this.color(), 'background-color':'black', 'color':'white', 'height':'130px', 'width':'130px','border-color':'white'}}
                else return {'background-color':this.color(), 'color':'white', 'border-color':'green', 'box-shadow':'inset 0px 0px 5px '+(player.timePlayed%2+5)+'px '+this.color2(), 'height':'130px', 'width':'130px'}
            },
        },
        23: {
            title: "Beta Test<br>[ <text style='color:skyblue'>P-8</text> ]",
            description: "<br>Unlock Two Layers, also boost Crystal Gain by ^1.035",
            unlocked() { return hasUpgrade('P', 22) },
            color(){return '#f54260'},
            color2(){return '#8f0e24'},
            cost() {return new Decimal(250)},
            canAfford() {return player.P.points.gte(this.cost())},
            style() {
                if(!hasUpgrade(this.layer,this.id)&&!this.canAfford()){return ''}
                else if(!hasUpgrade(this.layer,this.id)&&this.canAfford()){return {'box-shadow':'inset 0px 0px 5px '+(player.timePlayed%2+5)+'px '+this.color(), 'background-color':'black', 'color':'white', 'height':'130px', 'width':'130px','border-color':'white'}}
                else return {'background-color':this.color(), 'color':'white', 'border-color':'green', 'box-shadow':'inset 0px 0px 5px '+(player.timePlayed%2+5)+'px '+this.color2(), 'height':'130px', 'width':'130px'}
            },
        },
        24: {
            title: "Baseball.Bat.<br>Start<br>[ <text style='color:skyblue'>P-9</text> ]",
            description: "<br>Feed & Super Powder boosts Chemicals & Crystals",
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
            color(){return '#1b39a6'},
            color2(){return '#5b85b3'},
            cost() {return new Decimal(10000)},
            canAfford() {return player.P.points.gte(this.cost())},
            style() {
                if(!hasUpgrade(this.layer,this.id)&&!this.canAfford()){return ''}
                else if(!hasUpgrade(this.layer,this.id)&&this.canAfford()){return {'box-shadow':'inset 0px 0px 5px '+(player.timePlayed%2+5)+'px '+this.color(), 'background-color':'black', 'color':'white', 'height':'130px', 'width':'130px','border-color':'white'}}
                else return {'background-color':this.color(), 'color':'white', 'border-color':'green', 'box-shadow':'inset 0px 0px 5px '+(player.timePlayed%2+5)+'px '+this.color2(), 'height':'130px', 'width':'130px'}
            },
        },
        25: {
            title: "Combination<br>[<red>P-10</red>]",
            description: "<br>Particles boosts SF-III Reduction<br>",
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
            color(){return '#1b39a6'},
            color2(){return '#5b85b3'},
            cost() {return new Decimal(1650000)},
            canAfford() {return player.P.points.gte(this.cost())},
            style() {
                if(!hasUpgrade(this.layer, this.id)&&!this.canAfford()){return ''}
                else if(!hasUpgrade(this.layer, this.id)&&this.canAfford()){return {'box-shadow':'inset 0px 0px 5px '+(player.timePlayed%2+5)+'px '+this.color(), 'background-color':'black', 'color':'white', 'height':'130px', 'width':'130px','border-color':'white'}}
                else return {'background-color':this.color(), 'color':'white', 'border-color':'green', 'box-shadow':'inset 0px 0px 5px '+(player.timePlayed%2+5)+'px '+this.color2(), 'height':'130px', 'width':'130px'}
            },
        },
    },
})
