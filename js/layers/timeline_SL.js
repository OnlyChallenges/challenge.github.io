addLayer("SL", {
    name: "Souls", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "SL", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
        best: new Decimal(0),
    }},
    color(){ 
        let color = `#403736`
        return color
    },
    nodeStyle() {return {
        "background": (player.SL.unlocked||canReset("SL"))?"radial-gradient(#403736, #7a6261)":"#bf8f8f" ,
    }},
    requires(){ 
        let requirement = new Decimal(1e40);
        return requirement
    },
    resource: "Souls", // Name of prestige currency
    baseResource: "Floors", // Name of resource prestige is based on
    baseAmount() {return player.FL.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.58, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    doReset(resettingLayer) {
        if (layers[resettingLayer].row > this.row) layerDataReset(this.layer)
    },
    effect() {
        let eff = player.SL.points.add(1.25).pow(0.27)
        return eff
    },
    effectDescription() {
        dis = "which is boosting floor gain by "+format(tmp.E.effect)+"x"
        return dis
    },
    effectBase() {
        let base = new Decimal(1)
        return base
    },
    passiveGeneration() {
        let value1 = new Decimal(0);
        return value1
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "s", description: "s: reset for Souls", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown() {
        let value = false
        if (hasChallenge('CT', 21)) value = true
        return value
    },
milestones: {
    },
upgrades: {
        rows: 2,
        cols: 5,
        11: {
            title: "Contract with the Infection",
            description: "3x Floors & Explosives",
            cost: new Decimal(1),
            unlocked(){
                return player.SL.points.gte(0)
            },
        },
    },
})