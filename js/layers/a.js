addLayer("a", {
        startData() { return {
            unlocked: true,
        }},
        color: "cyan",
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
                name: "Salty Enough?",
                done() { return hasUpgrade("c", 44) },
                tooltip: "Get 'Salt Crystals' from Crystals",
            },
        26: {
                name: "What, why?",
                done() { return inChallenge('E', 12) && player.c.points.gte(1) },
                tooltip: "Get 1 Crystal in 'Immunity'",
            },
        31: {
                name: "Combination",
                done() { return player.F.points.gte(1) },
                tooltip: "Achieve 1 Fusion Point."
            },
        32: {
                name: "Fusions makes everything better",
                done() { return inChallenge('E', 12) && player.points.gte(100) },
                tooltip: "Get 100 Infects in 'Immunity'"
            },
        },
    }, 
)