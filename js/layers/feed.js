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
    cols: 5,
        11: {
            title: "Feed I",
            description: "Feeding! Boost Particle Gain by 50%",
            cost: new Decimal(1),
        },
        12: {
            title: "Feed II",
            description: "2nd Feed! Decrease Feed Requirement & Boost NP-IV by 40%.",
            cost: new Decimal(2),
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
    },
})