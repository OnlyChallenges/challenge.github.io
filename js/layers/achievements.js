addLayer("A", {
    name: "Achievements", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "A", // This appears on the layer's node. Default is the id with the first letter capitalized
    startData() {
        return {
            unlocked: true,
        }
    },
    color: "#5DE18A",
    tooltip: "Achievements",
    row: "side", // Row the layer is in on the tree (0 is the first row)
    layerShown() { return true },
    tabFormat: {
        "Achievements": {
            content: [
                "blank",
                "blank",
                "blank",
                "blank",
                ["achievements", [1, 2, 3, 4, 5, 6, 7, 8, 9]],
            ],
        },
    },

    achievements: {
        11: {
            name: "particle accelerator",
            done() { return player.points.gte(20) },
            tooltip: "Embark on your points!",
        },
        12: {
            name: "thre",
            done() { return hasUpgrade('P', 13) },
            tooltip: "3 Powders?",
            unlocked() { return hasAchievement('A', 11) },
        },
        13: {
            name: "Half of Two",
            done() { return hasUpgrade('P', 14) && (upgradeEffect('P', 14) > 1.499) },
            tooltip: "NP-IV has 50% boost",
            unlocked() { return hasAchievement('A', 12) },
        },
        14: {
            name: "Saget the 2nd",
            done() { return hasUpgrade('P', 22) },
            tooltip: "Saget the 1st would be proud...",
            unlocked() { return hasAchievement('A', 13) },
        },
        15: {
            name: "SF",
            done() { return player.SP.unlocked || player.F.unlocked },
            tooltip: "Unlock one of the layers in Row 2",
            unlocked() { return hasAchievement('A', 14) },
        },
        16: {
            name: "Duel Achieved",
            done() { return player.SP.unlocked && player.F.unlocked },
            tooltip: "have both layers unlocked",
            unlocked() { return hasAchievement('A', 15) },
        },
        17: {
            name: "6&3",
            done() { return hasUpgrade('F', 16) && hasUpgrade('SP', 13) },
            tooltip: "get 6 & 3<br>Reward: Row 3 Layer (WIP)",
            unlocked() { return hasAchievement('A', 16) },
        },
        21: {
            name: "curing",
            done() { return player.V.points.gte(1) },
            tooltip: "start the 3rd layer",
            unlocked() { return hasAchievement('A', 16) },
        },
        22: {
            name: "number adoption",
            done() { return player.points.gte(1e10) },
            tooltip: "1.00 × 10¹⁰",
            unlocked() { return hasAchievement('A', 21) },
        },
        23: {
            name: "4 out of 6",
            done() { return hasUpgrade('V', 14) },
            tooltip: "V.A.C.C.?",
            unlocked() { return hasAchievement('A', 22) },
        },
        24: {
            name: "due process",
            done() { return hasMilestone('V', 13) },
            tooltip: "would you like an CUR?",
            unlocked() { return hasAchievement('A', 23) },
        },
        25: {
            name: "2 Gens",
            done() { return hasUpgrade('F', 36) },
            tooltip: "Ultra",
            unlocked() { return hasAchievement('A', 24) },
        },
        26: {
            name: "C.U.R.E",
            done() { return hasMilestone('V', 14) },
            tooltip: "Cure... Have fun with Water!",
            unlocked() { return hasAchievement('A', 25) },
        },
    },
})