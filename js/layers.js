addLayer("r", {
    name: "Rocket Power", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "R", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#FDFDFD",
    requires: new Decimal(20), // Can be a function that takes requirement increases into account
    resource: "rocket power", // Name of prestige currency
    baseResource: "meters traveled", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "r", description: "R: Reset for rocket power", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
	infoboxes: {
        lore: {
            title: "Rocket",
            body: `<img src="Rocket.png" width="500"><br>
            You:<q>Huh? What is this place?</q><br>
            ???:<q>Oh great, you finally woke up. I thought I have to clean up another corpse again.</q><br>
            You:<q>What's all this corpse cleaning and me being teleported to another world about?</q><br>
            ???:<q>So you did not belong to this world?</q><br>
            You:<q>I was at my home having some sleep after grinding an incremental game and next thing I know, I am here.</q><br>
            ???:<q>I see... Having numbers go up is what we do here as well!</q><br>
            You:<q>Really?</q><br>
            ???:<q>Yes! My name is Chal, and I'm have to do basically every chore in this place...</q><br>
            You:<q>Oh, I'm sorry to hear.</q><br>
            Chal:<q>I can try helping you go back to your world, but before that you need to accumulate a lot of Challenge Power first. Try getting some by clearing these challenges first!`,
        },
    },
 upgrades: {
        11: {
        title: "You Gotta Start Somewhere",
        description: "Rocket Power boost your distance gain.",
        cost: new Decimal(1),
        effect() {
            return player[this.layer].points.add(1).pow(0.5)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
	12: {
	title: "20 rockets are not",
        description: "Rocket Power boost your distance gain.",
        cost: new Decimal(20),
        effect() {
            return player[this.layer].points.add(1).pow(0.6)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, 12))+"x" }, // Add formatting to the effect
        },
	13: {
	title: "Half Life 3 Confirmed",
        description: "Rocket Power boost your distance gain.",
        cost: new Decimal(300),
        effect() {
            return player[this.layer].points.add(1).pow(0.7)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
	14: {
        title: "Booster",
	description: "x10 more distance",
	cost: new Decimal(1000),
	},
    },
})
addLayer("a", {
        startData() { return {
            unlocked: true,
        }},
        color: "lime",
        row: "side",
        layerShown() {return true}, 
        tooltip() { // Optional, tooltip displays when the layer is locked
            return ("Accomplishments")
        },
        achievements: {
            rows: 2,
            cols: 4,
                11: {
                name: "Welcome to Rocket Tree",
                done() { return player.points.gte(100) },
                tooltip: "Reach 100m",
            },
		12: {
                name: "20 rocket is not",
                done() { return player.r.points.gte(20) },
                tooltip: "Get 20 rocket power",
            },
		13: {
                name: "Off to go",
                done() { return player.points.gte(20000) },
                tooltip: "Reach 20km",
            },
		14: {
                name: "I joined vais",
                done() { return player.points.gte(1e6) },
                tooltip: "Reach 1,000km",
            },
		21: {
		name: "1 year ago...",
		done() { return player.y.unlocked },
		tooltip: "Perform a YFN",
	    },
		22: {
		name: "Time Travel?",
		done() { return player.y.points.gte(10) },
		tooltip: "Get 10 YFN",
	    },
		23: {
		name: "IC 1011",
		done() { return player.points.gte(1e20) },
		tooltip: "Travel 10,000+ ly",
	    },
		24: {
		name: "Now in 3023",
		done() { return player.y.points.gte(1000) },
		tooltip: "Get 1,000 YFN",
	    }
        },
        midsection: [
            "achievements",
        ]
    }, 
)
addLayer("y", {
    name: "Yfn", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Y", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#808080",
    requires: new Decimal(1e8), // Can be a function that takes requirement increases into account
    resource: "yfn", // Name of prestige currency
    branches: ["r"],
    baseResource: "rockek power", // Name of resource prestige is based on
    baseAmount() {return player.r.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
 upgrades: {
        11: {
        title: "Yet another layer",
        description: "YFN boost your distance gain.",
        cost: new Decimal(1),
        effect() {
            return player[this.layer].points.add(1).pow(0.5)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        }
   }
})
