addLayer("A", {
    name: "Achievements", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "A", // This appears on the layer's node. Default is the id with the first letter capitalized
    startData() { return {
        unlocked: true,
    }},
    color: "#5DE18A",
    tooltip: "Achievements",
    row: "side", // Row the layer is in on the tree (0 is the first row)
    layerShown(){return true},
    tabFormat: {
            "Achievements":{
            content: [
                "blank",
                "blank",
                "blank",
                "blank",
                ["achievements", [1,2]],
                "blank",
                ],
            },
        },
achievements: {
    11: {
        name: "Level Up!",
        done() { return player.L.level == 2 },
        tooltip: "Reach Level 2",
    },
    12: {
        name: "The 2nd Zone",
        done() { return player.L.zone == 2 },
        tooltip: "Reach Zone 2",
    },
    13: {
        name: "Experimental Threat",
        done() { return player.L.level == 10 },
        tooltip: "Reach Level <logic>10</logic<",
    },
},
})