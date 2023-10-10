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
            title: "The Rocket",
            body: `<img src="images (3).jpeg" width="500"><br>
            Anon:<q>Huh? What is this place?</q><br>
            Luca12:<q>Oh great, you finally woke up. I thought I have to clean up another corpse again.</q><br>
            Anon:<q>What's all this corpse cleaning and me being teleported to another world about?</q><br>
            ???:<q>So you did not belong to this world?</q><br>
            Anon:<q>I was at my home having some sleep after grinding an incremental game and next thing I know, I am here.</q><br>
            2048-4097:<q>I see... Having numbers go up is what we do here as well!</q><br>
            2048-4097:<q>Really?</q><br>
            Luca12:<q>Yes! My name is LiceNice, and I'm have to do basically every chore in this place...</q><br>
            You:<q>Oh, I'm sorry to hear.</q><br>
            LiceNice:<q>I can try helping you go back to your world, but before that you need to accumulate a lot of meters first. Try getting some by buying these upgrades first!`,
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
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "lime",
    requires: new Decimal(1e8), // Can be a function that takes requirement increases into account
    resource: "yfn", // Name of prestige currency
    branches: ["r"],
    baseResource: "rocket power", // Name of resource prestige is based on
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
    layerShown(){return hasUpgrade("r",14)||player.y.unlocked},
 upgrades: {
        11: {
        title: "Yet another layer",
        description: "YFN boost your distance gain.",
        cost: new Decimal(1),
        effect() {
            return player[this.layer].points.add(1).pow(0.5)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
	12: {
        title: "Rocket Tree bug fix",
        description: "YFN boost your distance gain.",
        cost: new Decimal(5000),
        effect() {
            return player[this.layer].points.add(1).pow(0.7)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        }
   }
})
addLayer("s", {
name: "sacrifice",
symbol: "S",
position: 0,
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: false,                     // You can add more variables here to add them to your layer.
        points: new Decimal(0),             // "points" is the internal name for the main resource of the layer.
    }},

    color: "gold",                       // The color for this layer, which affects many elements.
    resource: "sacrifice points",            // The name of this layer's main prestige resource.
    row: 2,                                 // The row this layer is on (0 is the first row).

    baseResource: "yfn",   // The name of the resource your prestige gain is based on.
    branches: ["y"]
    baseAmount() { return player.y.points },  // A function to return the current amount of baseResource.
    requires: new Decimal(1.5e30),              // The amount of the base needed to  gain 1 of the prestige currency                                            // Also the amount required to unlock the laye
    type: "normal",                         // Determines the formula used for calculating prestige currency.
    exponent: 0.7,                          // "normal" prestige gain is (currency^exponent).

    gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
        return new Decimal(1)               // Factor in any bonuses multiplying gain here.
    },
    gainExp() {                             // Returns the exponent to your gain of the prestige resource.
        return new Decimal(1)
    },

    layerShown() { return player.y.points.gte(new Decimal(1e30))||player.s.unlocked},          // Returns a bool for if this layer's node should be visible in the tre
 upgrades: {
        // Look in the upgrades docs to see what goes here!
    },
})
