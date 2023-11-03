addLayer("a", {
        startData() { return {
            unlocked: true,
        }},
        color: "#543d85",
        row: "side",
        layerShown() {return true}, 
        tooltip() { // Optional, tooltip displays when the layer is locked
            return ("Accomplishments")
        },
        achievements: {
            rows: 5,
            cols: 6,
        11: {
                name: "The Outbreak",
                done() { return player.points.gte(15) },
                tooltip: "Infect 15 people",
            },
		12: {
                name: "Infected Crystals",
                done() { return player.c.points.gte(20) },
                tooltip: "Get 20 Crystals",
            },
		13: {
                name: "Hurtful Experiments",
                done() { return player.points.gte(20000) },
                tooltip: "Infect 20,000 people",
            },
		14: {
                name: "Crystals are Merging",
                done() { return player.c.points.gte(1000) },
                tooltip: "Get 1,000 Crystals",
            },
        15: {
                name: "Crystals are becoming maniacs",
                done() { return hasUpgrade("c", 31) },
                tooltip: "Get the 'Crystalmania' upgrade",        
            },
        16: {
                name: "The First Experiment",
                done() { return player.E.points.gte(1) },
                tooltip: "Get the first experiment",
            },
        21: {
                name: "Somby's Hope",
                done() { return hasUpgrade("E", 15) },
                tooltip: "Get 'Somby' from Experiments",
            },
        22: {
                name: "Experimental Growth",
                done() { return player.E.points.gte(1000) },
                tooltip: "Get 1,000 Experiments on your side.",
            },
        23: {
                name: "Crystal^2",
                done() { return player.c.points.gte(1e20) },
                tooltip: "Achieve 1e20 Crystals.",
            },
        24: {
                name: "Brawlful Victory",
                done() { return hasChallenge("E", 11) },
                tooltip: "Complete 'Experimental Brawl' Challenge",
            },
        25: {
                name: "Saltiness isn't enough",
                done() { return hasUpgrade("c", 44) },
                tooltip: "Get 'Salt Crystals' from Crystals",
            },
        26: {
                name: "Crystalized Immunity",
                done() { return inChallenge('E', 12) && player.c.points.gte(1) },
                tooltip: "Get 1 Crystal in 'Immunity'",
            },
        31: {
                name: "Combination",
                done() { return player.F.points.gte(1) },
                tooltip: "Achieve 1 Fusion Point."
            },
        32: {
                name: "Avali",
                done() { return inChallenge('E', 12) && player.points.gte(1e9) },
                tooltip: "Get 1e9 Infects in 'Immunity'"
            },
        33: {
                name: "Avali the Availing.",
                done() { return hasMilestone('F', 11) },
                tooltip: "Get the First Fusion Milestone!"
            },
        34: {
                name: "Fusioning the Fusions!?",
                done() { return hasMilestone('F', 12) },
                tooltip: 
                `
                Get the Second Fusion Milestone!
                Reward: 1.333x Experiments
                `
            },
        35: {
                name: "Wait isn't he a human...",
                done() { return hasUpgrade('E', 36) },
                tooltip: "Get 'Goon' Upgrade"
            },
        36: {
                name: "The First Strike",
                done() { return hasChallenge('E',13)},
                tooltip: "Complete 'Entization'"
            },
        41: {
                name: "A Murder has occured...",
                done() { return player.points.gte(1e100)},
                tooltip: "Get the first Kill..."
            },
        },
    }, 
)