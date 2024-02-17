addLayer("A", {
    name: "Achievements", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "A", // This appears on the layer's node. Default is the id with the first letter capitalized
    startData() { return {
        unlocked: true,
    }},
    color: rainbow,
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
    17: {
        name: "Sandboxes are cool!",
        done() { return hasChallenge('d', 18) },
        tooltip: "Complete the 8th Dust Challenge<br>Reward: x50 Point Gain",
    },
    18: {
        name: "Fine Tuning",
        done() { return hasChallenge('d', 19) },
        tooltip: "Complete the 9th Dust Challenge<br>Reward: Unlock the Next Row of Achievements :D",
    },
    // Row Two Locked from Achievement 18
    21: {
        name: "Debuff? I don't think so!",
        done() { return tmp.d.challengeLook.gte(9) && inChallenge('d', 18)},
        tooltip: "Complete All P-Challenges in the 8th Dust Challenge",
        unlocked() { return hasAchievement('A', 18) },
    },
    22: {
        name: "Non-Infected Population",
        done() { return hasChallenge('u', 14) },
        tooltip: "Complete the 4th Urban Challenge<br>Reward: Double Dust Gain",
        unlocked() { return hasAchievement('A', 18) },
    },
    23: {
        name: "Unlucky Chance",
        done() { return player.points.gte(1e200) },
        tooltip: "Complete the 7th Urban Challenge<br>Reward: x4 Prestige Points",
        unlocked() { return hasAchievement('A', 18) },
    },
    24: {
        name: "Another Realm",
        done() { return player.points.gte(1e200) },
        tooltip: "Unlock the 4th Layer<br>Reward: x1,000,000 Point Gain",
        unlocked() { return hasAchievement('A', 18) },
    },
    25: {
        name: "2D to 3D!",
        done() { return player.points.gte(1e200) },
        tooltip: "Complete the 4th Dimensional Challenge<br>Reward: x25 Dust",
        unlocked() { return hasAchievement('A', 18) },
    },
    26: {
        name: "3D to 4D!",
        done() { return player.points.gte(1e200) },
        tooltip: "Complete the 7th Dimensional Challenge<br>Reward: x15,000 Prestige Points",
        unlocked() { return hasAchievement('A', 18) },
    },
    27: {
        name: "2nd Sandbox?",
        done() { return player.points.gte(1e200) },
        tooltip: "Complete the 9th Dimensional Challenge<br>Reward: x1e10 Point Gain",
        unlocked() { return hasAchievement('A', 18) },
    },
    28: {
        name: "Determined Challenges",
        done() { return player.points.gte(1e200) },
        tooltip: "Complete all Challenges in the 9th Dimensional Challenge<br>Reward: ^1.05 Point Gain",
        unlocked() { return hasAchievement('A', 18) },
    },
},
})