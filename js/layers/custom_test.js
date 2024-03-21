addLayer("P", {
    name: "Powder", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    startData() {
        return {
            unlocked: true,
            points: new Decimal(0),
        }
    },
    requires(){ 
        let requirement = new Decimal(5)
        if (hasUpgrade('P', 12)) requirement = requirement.minus(0.7)
    
        return requirement
    
    },

    color: "#FFFFFF",
    resource: "powder",
    baseResource: "particles",
    baseAmount() { return player.points },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    type: "normal",
    exponent(){
        let ex = new Decimal(1.1)
        return ex
    },
    gainMult(){
        let gain = new Decimal(1)
        if (hasUpgrade('P', 13)) gain = gain.minus(0.1)
        return gain
    },
    gainExp(){
        let exp = new Decimal(1)
        return exp
    },
    hotkeys: [
        {key: "p", description: "p: Reset for Powder", onPress(){if (canReset(this.layer) && player.P.unlocked) doReset(this.layer)}},
    ],
    layerShown() { return true },
    doReset(resettingLayer) {
        if (layers[resettingLayer].row > this.row) layerDataReset(this.layer)
    },

    infoboxes: {
        lore: {
            title: "Some stuff",
            body: `
            Hello!; Welcome to <ruinsAbyssal Demise</ruins>, I would like to clarify that this is indeed, still in beta.<br> 
            There will be multiple bugs, issues, and occurences as the game update, so please be patient!
            
            `,
        },
    },

    update(diff){
        if (player.devSpeed > 1)  
            player.devSpeed = player.devSpeed.div(2)
        if (player.devSpeed < 1)
            player.devSpeed = new Decimal(1)


    },


    //Build Content
    upgrades: {
        11: {
            title: "Normal Powder I",
            description: "Some Simple Powder, boost Particle gain by 20%",
            cost: new Decimal(10),
        },
        12: {
            title: "Normal Powder II",
            description: "2nd Powder? Decrease Powder Requirement Slightly...",
            cost: new Decimal(15),
            unlocked() { return hasUpgrade('P', 11)},
        },
        13: {
            title: "Normal Powder III",
            description: "Particle User! Improve Particle Gain by 40% but decrease Powder gain by a smudge",
            cost: new Decimal(35),
            currencyDisplayName: "Particles",
            currencyInternalName: "points",
            unlocked() { return hasUpgrade('P', 12)},
        },
        14: {
            title: "Normal Powder IV",
            description: "More Particles! Boost Particles based on itself.",
            cost: new Decimal(40),
            effect() {
                let effect1 = (player.points.max(1).add(1).pow(0.07)).max(1).min(10);
                return effect1
            },
            effectDisplay() {
                let capped = upgradeEffect(this.layer, this.id).gte(10) ? "(% Capped)" : "";
                let text = `+${format(upgradeEffect(this.layer, this.id).minus(1).times(10))} ${capped}%`;
                return text;
            },
            unlocked() { return hasUpgrade('P', 13)},
        },
    },
})
