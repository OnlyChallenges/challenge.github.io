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
        tooltip: "Reach Level <logic>10</logic>",
    },
    14: {
        name: "More Damage",
        done() { return player.L.attack > 10 },
        tooltip: "Have more than 10 Base Attack ",
    },
    15: {
        name: "Powering Damage",
        done() { return player.L.level == 16 },
        tooltip: "Reach Level 16",
    },
    16: {
        name: "Defensive Apporach",
        done() { return player.L.defense >= 5},
        tooltip: "Get 5 Defense or higher",
    },
    17: {
        name: "Good Programming",
        done() { return player.L.revives == 1},
        tooltip: "Congrats!<br>You learned about the revive system!",
    },
    21: {
        name: "Beginner's Murder",
        done() { return player.L.kills > 50 },
        tooltip: "Have more than 50 Experiment Kills",
    },
    22: {
        name: "Normal Murder",
        done() { return player.L.kills > 250 },
        tooltip: "Have more than 250 Experiment Kills",
    },
    23: {
        name: "Experimental Massacre",
        done() { return player.L.kills > 600 },
        tooltip: "Have more than 600 Experiment Kills",
    },
    24: {
        name: "<fail>Your best friend</fail>",
        done() { return player.L.kills > 1000 },
        tooltip: "Have more than 1,000 Experiment Kills<br>Reward: 2,000 XP",
    },
},

})