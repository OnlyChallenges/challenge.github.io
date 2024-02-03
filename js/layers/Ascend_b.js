addLayer("Ab", {
    name: "Ascension Upgrader", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Ab", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    color: "#ff5535",
    requires(){ 
        let requirement = new Decimal(150)
        let nerf = (player.A.points).pow(0.8)
        return requirement
    },
    resource: "Ascension Upgrade points", // Name of prestige currency
    baseResource: "Ascension points", // Name of resource prestige is based on
    baseAmount() {return player.A.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        let mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    passiveGeneration(){
        let passive = new Decimal(0)
        return passive
    },
    row: 10, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "B", description: "Shift + b: Reset for Ascension Upgrades", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return player.A.points.gte(150) || player.Ab.unlocked},

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
    challenges: {
        11: {
            name: "True Ascension",
            challengeDescription: 
            `Your now in purity...<br>
            Point gain is now ^0.06 & P > iP gain is now ^0.1<br>
            Booster effect is significantly boosted<br>
            Passive Effect is removed from all (letter)P's<br>
            ^0.2 Original Passive Effect<br>
            Boost Power also has no effect inside the challenge & Ascension Power Effect is nerfed gravely<br>
            Note: Ab Upgrades purchased in Ab1 Challenge will be kept but will not have an effect outside of the challenge.<br>`,
            canComplete: function() {return player.jP.points.gte(1)},
            goalDescription: "1 Juggling Prestige Point",
            rewardDescription: "^0.65 Ascension Requirement & ^1.2 Juggling Prestige Points",
            unlocked(){
                let unlock = (hasUpgrade('Ab', 16) || inChallenge('Ab', 11) || hasChallenge('Ab', 11))
                return unlock
            },
        },
    },
    upgrades:{  
        11: {
            title: "Better Ascension Power",
            description: "AP Effect is significantly better",
            cost: new Decimal(1),
        },
        12: {
            title: "Improved Generators",
            description: "Generators effect is significantly better",
            cost: new Decimal(1),
            unlocked() {return hasUpgrade('Ab', 11)},
        },
        13: {
            title: "Improved Buffed Prestige Points",
            description: "Buffed Prestige Point gain is signifcantly better",
            cost: new Decimal(2),
            unlocked() {return hasUpgrade('Ab', 12)},
        },
        14: {
            title: "Improved Point Gain",
            description: "^1.2 Point Gain",
            cost: new Decimal(2),
            unlocked() {return hasUpgrade('Ab', 13)},
        },
        15: {
            title: "Improved Booster Effect",
            description: "Booster Effect is signifcantly improved",
            cost: new Decimal(3),
            unlocked() {return hasUpgrade('Ab', 14)},
        },
        16: {
            title: "Improved Delta Prestige Points",
            description: "Delta Prestige Point gain is signifcantly better",
            cost: new Decimal(3),
            unlocked() {return hasUpgrade('Ab', 15)},
        },
        21: {
            title: "Pure Upgrade I",
            description: "10x Prestige Point Gain",
            cost: new Decimal(250),
            currencyDisplayName: "Points",
            currencyInternalName: "points",
            unlocked() {return inChallenge('Ab', 11) || hasUpgrade('Ab', 21)}
        },
        22: {
            title: "Pure Upgrade II",
            description: "^1.3 Point Gain",
            cost: new Decimal(25),
            currencyDisplayName: "Prestige Points",
            currencyInternalName: "points",
            currencyLayer: 'p',
            unlocked() {return inChallenge('Ab', 11) || hasUpgrade('Ab', 22)}
        },
        23: {
            title: "Pure Upgrade III",
            description: "Buffed Prestige Effect is signifcantly greater",
            cost: new Decimal(7),
            currencyDisplayName: "BPrestige Points",
            currencyInternalName: "points",
            currencyLayer: 'bP',
            unlocked() {return inChallenge('Ab', 11) || hasUpgrade('Ab', 23)}
        },
        24: {
            title: "Pure Upgrade IV",
            description: "Lower P, bP, and cP Requirement cost significantly",
            cost: new Decimal(3),
            currencyDisplayName: "CPrestige Points",
            currencyInternalName: "points",
            currencyLayer: 'cP',
            unlocked() {return inChallenge('Ab', 11) || hasUpgrade('Ab', 24)}
        },
        25: {
            title: "Pure Upgrade V",
            description: "100x All P-Layers before fP",
            cost: new Decimal(6),
            currencyDisplayName: "DPrestige Points",
            currencyInternalName: "points",
            currencyLayer: 'dP',
            unlocked() {return inChallenge('Ab', 11) || hasUpgrade('Ab', 25)}
        },
        26: {
            title: "Pure Upgrade VI",
            description: "10x fP, gP, hP, and iP",
            cost: new Decimal(8),
            currencyDisplayName: "FPrestige Points",
            currencyInternalName: "points",
            currencyLayer: 'fP',
            unlocked() {return inChallenge('Ab', 11) || hasUpgrade('Ab', 26)}
        },
        },
})