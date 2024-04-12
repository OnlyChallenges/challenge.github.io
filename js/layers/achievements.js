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
                ["display-text", function () {
                    return 'You have ' + formatWhole(tmp.A.total) + ' / 14 Achievements, which boosts particle gain by ' + format(tmp.A.effect) + 'x<br>You have ' + formatWhole(tmp.A.aP) + ' Achievement Points.<br>(1.01^Achievement-Points)'
                }, {}],
                "blank",
                "blank",
                "blank",
                ["achievements", [1, 2, 3, 4, 5, 6, 7, 8, 9]],
                "blank",
                ["display-text", function () {
                    return 'You have ' + formatWhole(tmp.A.total2) + ' / ? Secret Achievements'
                }, {}],
                ["achievements", [10, 11, 12]],
            ],
        },
    },

    effect(){
        let eff = Decimal.pow(1.01, tmp.A.hahaFormula).max(1)

        return eff
    },

    total(){
        let form = new Decimal(0)
        // Row 1
        if (hasAchievement('A', 11)) form = form.add(1)
        if (hasAchievement('A', 12)) form = form.add(1)
        if (hasAchievement('A', 13)) form = form.add(1)
        if (hasAchievement('A', 14)) form = form.add(1)
        if (hasAchievement('A', 15)) form = form.add(1)
        if (hasAchievement('A', 16)) form = form.add(1)
        if (hasAchievement('A', 17)) form = form.add(1)
        // Row 2
        if (hasAchievement('A', 21)) form = form.add(1)
        if (hasAchievement('A', 22)) form = form.add(1)
        if (hasAchievement('A', 23)) form = form.add(1)
        if (hasAchievement('A', 24)) form = form.add(1)
        if (hasAchievement('A', 25)) form = form.add(1)
        if (hasAchievement('A', 26)) form = form.add(1)
        if (hasAchievement('A', 27)) form = form.add(1)
        return form
    },

    total2(){
        let form = new Decimal(0)
        // Row 1
        if (hasAchievement('A', 101)) form = form.add(1)
        return form
    },

    aP(){
        let form = new Decimal(0)
        // Row 1
        if (hasAchievement('A', 11)) form = form.add(1)
        if (hasAchievement('A', 12)) form = form.add(1)
        if (hasAchievement('A', 13)) form = form.add(3)
        if (hasAchievement('A', 14)) form = form.add(4)
        if (hasAchievement('A', 15)) form = form.add(4)
        if (hasAchievement('A', 16)) form = form.add(10)
        if (hasAchievement('A', 17)) form = form.add(10)
        // Row 2
        if (hasAchievement('A', 21)) form = form.add(15)
        if (hasAchievement('A', 22)) form = form.add(20)
        if (hasAchievement('A', 23)) form = form.add(20)
        if (hasAchievement('A', 24)) form = form.add(20)
        if (hasAchievement('A', 25)) form = form.add(25)
        if (hasAchievement('A', 26)) form = form.add(30)
        if (hasAchievement('A', 27)) form = form.add(40)
        // Special Achievements are worth more points
        if (hasAchievement('A', 101)) form = form.add(100)
        return form
    },

    achievements: {
        11: {
            name: "particle accelerator",
            done() { return player.points.gte(20) },
            tooltip: "Embark on your points!<br> Reward: 1 AP",
        },
        12: {
            name: "thre",
            done() { return hasUpgrade('P', 13) },
            tooltip: "3 Powders?<br> Reward: 1 AP",
            unlocked() { return hasAchievement('A', 11) },
        },
        13: {
            name: "Half of Two",
            done() { return hasUpgrade('P', 14) && (upgradeEffect('P', 14) > 1.499) },
            tooltip: "NP-IV has 50% boost<br>Reward: 3 AP",
            unlocked() { return hasAchievement('A', 12) },
        },
        14: {
            name: "Saget the 2nd",
            done() { return hasUpgrade('P', 22) },
            tooltip: "Saget the 1st would be proud...<br> Reward: 4 AP",
            unlocked() { return hasAchievement('A', 13) },
        },
        15: {
            name: "SF",
            done() { return player.SP.unlocked || player.F.unlocked },
            tooltip: "Unlock one of the layers in Row 2<br> Reward: 4 AP",
            unlocked() { return hasAchievement('A', 14) },
        },
        16: {
            name: "Duel Achieved",
            done() { return player.SP.unlocked && player.F.unlocked },
            tooltip: "have both layers unlocked<br> Reward: 10 AP",
            unlocked() { return hasAchievement('A', 15) },
        },
        17: {
            name: "6&3",
            done() { return hasUpgrade('F', 16) && hasUpgrade('SP', 13) },
            tooltip: "get 6 & 3<br>Reward: Row 3 Layer & 10 AP",
            unlocked() { return hasAchievement('A', 16) },
        },
        21: {
            name: "curing",
            done() { return player.V.points.gte(1) },
            tooltip: "start the 3rd layer<br>Reward: 15 AP",
            unlocked() { return hasAchievement('A', 16) },
        },
        22: {
            name: "number adoption",
            done() { return player.points.gte(1e10) },
            tooltip: "1.00 × 10¹⁰<br>Reward: 20 AP",
            unlocked() { return hasAchievement('A', 21) },
        },
        23: {
            name: "4 out of 6",
            done() { return hasUpgrade('V', 14) },
            tooltip: "V.A.C.C.?<br>Reward: 20 AP",
            unlocked() { return hasAchievement('A', 22) },
        },
        24: {
            name: "due process",
            done() { return hasMilestone('V', 13) },
            tooltip: "would you like an CUR?<br>Reward: 20 AP",
            unlocked() { return hasAchievement('A', 23) },
        },
        25: {
            name: "2 Gens",
            done() { return hasUpgrade('F', 36) },
            tooltip: "Ultra<br>Reward: 25 AP",
            unlocked() { return hasAchievement('A', 24) },
        },
        26: {
            name: "C.U.R.E",
            done() { return hasMilestone('V', 14) },
            tooltip: "Cure... Have fun with Water!<br>Reward: 30 AP",
            unlocked() { return hasAchievement('A', 25) },
        },
        27: {
            name: "HTwoTheNo!",
            done() { return player.W.points.gte(2) },
            tooltip: "Hah, get it?<br>Reward: 40 AP",
            unlocked() { return hasAchievement('A', 26) },
        },
        101: {
            name: "Secret: Only 6 and 6",
            done() { return ((hasUpgrade('F', 11) && hasUpgrade('F', 12) && hasUpgrade('F', 13) && hasUpgrade('F', 14) && hasUpgrade('F', 15) && hasUpgrade('F', 16) && !hasUpgrade('F', 21) && !hasUpgrade('F', 22)) && (hasUpgrade('SP', 11) && hasUpgrade('SP', 12) && hasUpgrade('SP', 13) && hasUpgrade('SP', 14) && hasUpgrade('SP', 15) && hasUpgrade('SP', 16) && !hasUpgrade('SP', 21))) },
            tooltip: "Get only the first row of Super Power & Feed Upgrades before getting the 2nd row of both!<br>Reward: 100 AP",
            unlocked() { return hasAchievement('A', 101) },
        },
    },
})