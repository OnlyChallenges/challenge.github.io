addLayer("R", {
    name: "Rooms", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "R", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
        best: new Decimal(0),
    }},
    color: "#064526",
    requires: new Decimal(1e30), // Can be a function that takes requirement increases into account
    resource: "rooms", // Name of prestige currency
    baseResource: "experiments", // Name of resource prestige is based on
    baseAmount() {return player.E.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.05, // Prestige currency exponent
    base() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (player.R.points.gte(1) || hasUpgrade('R', 13)) mult = mult.div(2)
        if (player.R.points.gte(2) || hasUpgrade('R', 13)) mult = mult.div(3)
        if (player.R.points.gte(3) || hasUpgrade('R', 13)) mult = mult.div(6)
        if (player.R.points.gte(4)) mult = mult.div(4)
        return mult
    },
    effect() {
        let eff3 = player.R.points.add(1).pow(1.75)
        if (hasUpgrade('H', 31)) eff3 = eff3.times(4)
        if (hasMilestone('W', 12)) eff3 = eff3.times(4)
        eff3 = eff3.times(tmp.R.effectBase)
        return eff3
    },
    effectBase() {
        let base = new Decimal(1) 
        return base
    },
    effectDescription() {
        dis = "which boosts Infects, Experiments, and Crystal gain by "+ format(tmp.R.effect) +"x"
        return dis
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "r", description: "r: reset for Rooms", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    infoboxes: {
        lore1: {
            title: "Rooms",
            body() {
            let text 
            text = 
            `Welcome to Rooms!<br>
            The more Rooms you get, the more it divides the requirement.
            Luckily, Fusions & Humans doesn't reset anything, so this is basically a side-layer but with high imporantance!`
            return text
            },
        },
    },
    layerShown() {return true},
    layerShown() {
        return hasUpgrade("H", 25) || player.R.points.gte(1) || player.R.unlocked;
    },
milestones: {
        11: {
            requirementDescription: "1 Room",
            effectDescription() {
                let text = "Unlock another row of Human Upgrades";
                return text;
              },
            done() { return player.R.points.gte(1) },
        },
        12: {
            requirementDescription: "2 Rooms",
            effectDescription() {
                let text = "Unlock another row of Fusion Upgrades";
                return text;
              },
            done() { return player.R.points.gte(2) },
        },
},

upgrades: {
        rows: 1,
        cols: 6,
        11: {
            title: "Pool Zone",
            description: "Rooms boosts Fusions & Humans Effects",
            cost: new Decimal(1),
            effect() {
                return (player.R.points.max(1).add(1).pow(1.4)).max(1).min(25);
            },
            effectDisplay() {
                let capped = upgradeEffect(this.layer, this.id).gte(25) ? "(Capped)" : "";
                let text = `x${format(upgradeEffect(this.layer, this.id))} ${capped}`;
                return text;
            },
            unlocked(){
                return player.R.points.gte(0)
            },
        },
        12: {
            title: "Elevator",
            description: "Humans boosts Fusions significantly",
            cost: new Decimal(1),
            effect() {
                return (player.H.points.max(1).add(1).pow(0.03)).max(1).min(63);
            },
            effectDisplay() {
                let capped = upgradeEffect(this.layer, this.id).gte(63) ? "(Capped)" : "";
                let text = `x${format(upgradeEffect(this.layer, this.id))} ${capped}`;
                return text;
            },
            unlocked(){
                return hasUpgrade('R', 11)
            },
        },
        13: {
            title: "Testing Lab",
            description: "Fusions boosts Humans significantly but rooms are pushed to 3",
            cost: new Decimal(3),
            effect() {
                return (player.F.points.max(1).add(1).pow(0.162)).max(1).min(1600);
            },
            effectDisplay() {
                let capped = upgradeEffect(this.layer, this.id).gte(1600) ? "(Capped)" : "";
                let text = `x${format(upgradeEffect(this.layer, this.id))} ${capped}`;
                return text;
            },
            unlocked(){
                return hasUpgrade('W', 12) && hasUpgrade('R', 12)
            },
        },
    },
})