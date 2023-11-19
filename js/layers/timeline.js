addLayer("CT", {
    name: "Collapsed Timelines", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "CT", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
        best: new Decimal(0),
    }},
    color(){ 
        let color = `#ea3add`
        if (inChallenge('CT', 11)) color = `#ed4046`
        return color
    },
    requires: new Decimal("e1e50"), // Can be a function that takes requirement increases into account
    resource: "Collapsed Timelines", // Name of prestige currency
    baseResource: "infects", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    effect() {
        let eff5 = player.CT.points.add(1).pow(1)
        eff5 = eff5.times(tmp.CT.effectBase)
        return eff5
    },
    effectBase() {
        let base = new Decimal(1) 
        return base
    },
    effectDescription() {
        dis = "You are currently in Timeline 1"
        if (player.CT.points.gte(1)) dis = "You are currently in Timeline 2 which is much different then Timeline 1"
        return dis
    },
    row: 4, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "t", description: "T: reset for Collapsed Timelines", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown() {
        let value = false
        if (player.points.gte(1e9999) || player.CT.unlocked) value = true
        return value
    },
milestones: {
        11: {
            requirementDescription: "1 Collapsed Timelines (It's all gone)",
            effectDescription(){ 
                let des
                des = `Fix Everything`
                if (player.CT.points.gte(1)) des = `Everything is gone...Unlock Floors instead.`
                return des
            },
            done() { return player.CT.points.gte(1)},
        },
    },
challenges: {
        11: {
            name: "Explosive Floors",
            challengeDescription: 
            `Explosives are now becoming required on more floors!<br>
            Infect gain is divided by 2.5<br>
            To counter the Infect Gain, Floor Upgrade Effects are changed slightly!<br>
            EX Requirement is now 1,500 instead of 6,000!`,
            canComplete: function() {return player.EX.points.gte(1)},
            goalDescription: "1 Explosive",
            rewardDescription: "Triple Floor Gain",
            unlocked(){
                return hasMilestone('EX', 11) || inChallenge('CT', 11) || hasChallenge('CT', 11)
            },
        },
    },
})