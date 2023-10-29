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
            rows: 1,
            cols: 4,
                11: {
                name: "Experiments",
                done() { return player.points.gte(100) },
                tooltip: "Infect 100 people",
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
        },
        midsection: [
            "achievements",
        ]
    }, 
)