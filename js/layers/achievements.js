addLayer("A", {
    name: "Achievements", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "A", // This appears on the layer's node. Default is the id with the first letter capitalized
    startData() { return {
        unlocked: true,
    }},
    color: "#4BDC13",
    tooltip: "Achievements",
    row: "side", // Row the layer is in on the tree (0 is the first row)
    layerShown(){return true},
    tabFormat: {
            "Achievements":{
            content: [
                "blank",
                "blank",
                "blank",
                "achievements",
                "blank",
                ],
            },
        },
achievements: {
    11: {
        name: "Welcome to challenges",
        done() { return hasChallenge('p', 12) },
        tooltip: "Complete the 2nd Challenge<br>Reward: +2.5 Point Gain",
    },
    12: {
        name: "Another Challenging Welcome!",
        done() { return hasChallenge('p', 14) },
        tooltip: "Complete the 4th Challenge<br>Reward: +8 Point Gain",
    },
    13: {
        name: "log³(points)",
        done() { return hasChallenge('p', 16) },
        tooltip: "Complete the 6th Challenge<br>Reward: x3 Prestige Point Gain",
    },
    14: {
        name: "^0.1 + log10(points) + /3+log10(points).. absurd",
        done() { return hasChallenge('p', 19) },
        tooltip: "Complete the 9th Challenge<br>Reward: Unlock the next layer",
    },
    15: {
        name: "Dusty Events",
        done() { return hasChallenge('d', 11) },
        tooltip: "Complete the 1st Dust Challenge",
    },
    16: {
        name: "Hellish Dust",
        done() { return hasChallenge('d', 14) },
        tooltip: "Complete the 4th Dust Challenge<br>Reward: +2 Dust Gain",
    },
},
})