addLayer("W", {
    name: "Weapons", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "W", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
        best: new Decimal(0),
    }},
    color: "#b5c3dd",
    requires: new Decimal(1e100), // Can be a function that takes requirement increases into account
    resource: "weapons", // Name of prestige currency
    baseResource: "crystals", // Name of resource prestige is based on
    baseAmount() {return player.c.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.05, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    effect() {
        let eff4 = player.W.points.add(1.1).pow(0.45)
        eff4 = eff4.times(tmp.W.effectBase)
        return eff4
    },
    effectBase() {
        let base = new Decimal(1) 
        return base
    },
    effectDescription() {
        dis = "which boosts all previous layers (Except Rooms) by "+ format(tmp.W.effect) +"x"
        return dis
    },
    row: 3, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "w", description: "w: reset for Humans", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    infoboxes: {
        lore1: {
            title: "Weapons",
            body() {
            let text 
            text = 
            `Weapons cause damage...but also a lot of content...`
            return text
            },
        },
    },
    layerShown() {return true},
    layerShown() {
        return hasUpgrade("F", 36) || player.W.points.gte(1) || player.W.unlocked;
    },
milestones: {
        11: {
            requirementDescription: "1 Weapon",
            effectDescription() {
                let text = "Multiply all previous layers (Except Rooms) by 2.2x";
                return text;
              },
            done() { return player.W.points.gte(1) },
        },
        12: {
            requirementDescription: "3 Weapons",
            effectDescription() {
                let text = "Keep everything from the previous layers";
                return text;
              },
            done() { return player.W.points.gte(3) },
        },
},

upgrades: {
        rows: 1,
        cols: 6,
        11: {
            title: "Fists",
            description: "Increases Crystals by Crystals",
            cost: new Decimal(1),
            effect() {
                return (player.c.points.max(1).add(1).pow(0.25)).max(1).min(25);
            },
            effectDisplay() {
                let capped = upgradeEffect(this.layer, this.id).gte(25) ? "(Capped)" : "";
                let text = `x${format(upgradeEffect(this.layer, this.id))} ${capped}`;
                return text;
            },
            unlocked(){
                return player.W.points.gte(0)
            },
        },
    },
})