addLayer("EX", {
    name: "Explosives", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "EX", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
        best: new Decimal(0),
    }},
    color: "#7dee99",
    requires: new Decimal(1000), // Can be a function that takes requirement increases into account
    resource: "Explosives", // Name of prestige currency
    baseResource: "Floors", // Name of resource prestige is based on
    baseAmount() {return player.FL.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.75, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    passiveGeneration() {
        let value1 = new Decimal(0);
        return value1
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "x", description: "x: reset for Explosives", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown() {
        let value = false
        if (hasUpgrade('FL', 14)) value = true
        return value
    },
milestones: {
        11: {
            requirementDescription: "3 Explosives",
            effectDescription(){ 
                let des
                des = `Explode, Explode, Explode!`
                if (player.EX.points.gte(3)) des = `Unlock a...Collapsed Timeline Challenge...?`
                return des
            },
            done() { return player.EX.points.gte(3)},
        },
    },
upgrades: {
        rows: 2,
        cols: 5,
        11: {
            title: "Minor Explosive",
            description: "Explosives boosts Infects (Cap is 4950x)",
            cost: new Decimal(1),
            effect() {
                return (player.EX.points.max(1).add(1.5).pow(0.2)).max(1).min(4950);
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked(){
                return player.FL.points.gte(0)
            },
        },
    },
})