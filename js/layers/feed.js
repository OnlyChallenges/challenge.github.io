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
    requires(){ 
        let requirement = new Decimal(500)  
        if (hasUpgrade('F', 12)) requirement = requirement.div(3.5)
        if (player.SP.unlocked) requirement = requirement.times(50)
        if (player.SP.unlocked && player.F.unlocked) requirement = requirement.div(50)
        return requirement
    
    },

    color: "#e0c287",
    resource: "feed",
    baseResource: "powder",
    baseAmount() { return player.P.points },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    type: "static",
    exponent(){
        let ex = new Decimal(1.5)
        return ex
    },
    gainMult(){
        let gain = new Decimal(1)
        return gain
    },
    gainExp(){
        let exp = new Decimal(1)
        return exp
    },
    hotkeys: [
        {key: "f", description: "f: Reset for Feed", onPress(){if (canReset(this.layer) && player.F.unlocked) doReset(this.layer)}},
    ],
    layerShown() { return hasUpgrade('P', 23) || player.F.unlocked || player.SP.unlocked },

    //Build Content
    upgrades: {
    rows: 5,
    cols: 6,
        11: {
            title: "Feed I",
            description: "Feeding! Boost Particle Gain by 50%",
            cost: new Decimal(1),
        },
        12: {
            title: "Feed II",
            description: "2nd Feed! Decrease Feed Requirement & Boost NP-IV by 300%.",
            cost: new Decimal(1),
            unlocked() { return hasUpgrade('F', 11)},
        },
        13: {
            title: "Feed III",
            description: "Three Feeders? Boost Powder Gain by 40%, ^1.05 Particle Gain",
            cost: new Decimal(7500),
            currencyDisplayName: "Particles",
            currencyInternalName: "points",
            unlocked() { return hasUpgrade('F', 12)},
        },
        14: {
            title: "Feed IV",
            description: "Feeder + Feeder + Feeder + Feeder? Particles boosts Powder",
            cost: new Decimal(25000),
            effect() {
                let effect1 = (player.points.max(1).add(1).pow(0.04)).max(1).min(10);
                return effect1
            },
            effectDisplay() {
                let capped = upgradeEffect(this.layer, this.id).gte(10) ? "(% Capped)" : "";
                let text = `+${format(upgradeEffect(this.layer, this.id).minus(1).times(100))}%${capped}`;
                return text;
            },
            currencyDisplayName: "Particles",
            currencyInternalName: "points",
            unlocked() { return hasUpgrade('F', 13)},
        },
        15: {
            title: "Feed V",
            description: "Feeding Movement! Feed boosts SP-I Upgrade.",
            cost: new Decimal(3),
            effect() {
                let effect1 = (player.F.points.max(1).add(1).pow(0.2)).max(1).min(3.5);
                return effect1
            },
            effectDisplay() {
                let capped = upgradeEffect(this.layer, this.id).gte(3.5) ? "(% Capped)" : "";
                let text = `+${format(upgradeEffect(this.layer, this.id).minus(1).times(100))}%${capped}`;
                return text;
            },
            unlocked() { return hasUpgrade('F', 14)},
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
            unlocked() { return hasUpgrade('F', 15) && player.SP.unlocked},
        },
        22: {
            title: "Super Feed II",
            description: "Powder boost SP-IV",
            cost: new Decimal(7),
            effect() {
                let effect1 = (player.P.points.max(1).add(1).pow(0.06)).max(1).min(20);
                return effect1
            },
            effectDisplay() {
                let capped = upgradeEffect(this.layer, this.id).gte(20) ? "(% Capped)" : "";
                let text = `+${format(upgradeEffect(this.layer, this.id).minus(1).times(100))}% ${capped}`;
                return text;
            },
            unlocked() { return hasUpgrade('F', 21)},
        },
        23: {
            title: "Super Feed III",
            description: "Feed decreases Super Powder Requirement",
            cost: new Decimal(7),
            effect() {
                let effect1 = (player.F.points.max(1).add(1).pow(0.7)).max(1).min(25);
                return effect1
            },
            effectDisplay() {
                let capped = upgradeEffect(this.layer, this.id).gte(25) ? "(% Capped)" : "";
                let text = `-${format(upgradeEffect(this.layer, this.id).minus(1).times(100))}% ${capped}`;
                return text;
            },
            unlocked() { return hasUpgrade('F', 22)},
        },
    },
})