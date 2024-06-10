addLayer("A", {
    name: "Achievements", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "A", // This appears on the layer's node. Default is the id with the first letter capitalized
    startData() {
        return {
            unlocked: true,
            secret: new Decimal(0),
            hugs: new Decimal(0),
            randomizer: new Decimal(0),
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
                    return 'You have ' + formatWhole(tmp.A.total) + ' / 15 Achievements, which boosts particle gain by ' + format(tmp.A.effect) + 'x<br>You have <logic>' + formatWhole(tmp.A.aP) + '</logic> Achievement Points.<br>[Formula: (1.0125^<logic>' + formatWhole(tmp.A.aP) + '</logic>) / ((1.0012^<logic>'+ formatWhole(tmp.A.aP)+'</logic>)*(<logic>'+ formatWhole(tmp.A.aP) + '</logic>/100))]'
                }, {}],
                "blank",
                "h-line",
                "blank",
                "blank",
                "blank",
                ["achievements", [1, 2, 3, 4, 5, 6, 7, 8, 9]],
                "blank",
                "h-line",
            ],
        },
    },

    update() {
        let title = ""
        let devspeed = ""
        if (player.devSpeed != 1) {
            devspeed = format(player.devSpeed) + "x || "
        }
        if (((!player.F.unlocked) || (!player.SP.unlocked))) {
            title = "" + formatWhole(player.P.points) + " P"
        }
        if ((player.F.unlocked) || (player.SP.unlocked)) {
            if ((player.F.unlocked)) title = "" + formatWhole(player.F.points) + " F"
            if ((player.SP.unlocked)) title = "" + formatWhole(player.SP.points) + " SP"
        }
        if ((player.F.unlocked) && player.SP.unlocked) {
            title = "" + formatWhole(player.F.points) + " F || " + formatWhole(player.SP.points) + " SP"
        }
        if (player.V.unlocked) {
            title = "" + formatWhole(player.V.points) + " V"
        }
        if ((player.V.unlocked) && (player.W.unlocked)) {
            title = "" + formatWhole(player.V.points) + " V || " + formatWhole(player.W.points) + " W"
        }
        document.title = devspeed + title
    },

    effect() {
        let eff = Decimal.pow(1.0125, tmp.A.aP).div(tmp.A.nonInf.times(tmp.A.specialInf)).max(1)

        return eff
    },

    nonInf() {
        let non = Decimal.pow(1.0012, tmp.A.aP).max(1)
        return non
    },

    specialInf() {
        let ia = tmp.A.aP.div(100).max(1)
        return ia
    },

    total() {
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
        // Row 3
        if (hasAchievement('A', 31)) form = form.add(1)
        return form
    },

    total2() {
        let form = new Decimal(0)
        // Row 1
        if (hasAchievement('A', 101)) form = form.add(1)
        if (hasAchievement('A', 102)) form = form.add(1)
        if (hasAchievement('A', 103)) form = form.add(1)
        if (hasAchievement('A', 104)) form = form.add(1)
        return form
    },

    total3() {
        let form = new Decimal(0)
        // Row 1
        if (hasAchievement('A', 201)) form = form.add(1)
        if (hasAchievement('A', 202)) form = form.add(1)
        if (hasAchievement('A', 203)) form = form.add(1)
        if (hasAchievement('A', 204)) form = form.add(1)
        return form
    },

    aP() {
        let form = new Decimal(0)
        // Row 1
        if (hasAchievement('A', 11)) form = form.add(1)
        if (hasAchievement('A', 12)) form = form.add(2)
        if (hasAchievement('A', 13)) form = form.add(5)
        if (hasAchievement('A', 14)) form = form.add(5)
        if (hasAchievement('A', 15)) form = form.add(7)
        if (hasAchievement('A', 16)) form = form.add(10)
        if (hasAchievement('A', 17)) form = form.add(10)
        // Row 2
        if (hasAchievement('A', 21)) form = form.add(20)
        if (hasAchievement('A', 22)) form = form.add(20)
        if (hasAchievement('A', 23)) form = form.add(20)
        if (hasAchievement('A', 24)) form = form.add(20)
        if (hasAchievement('A', 25)) form = form.add(20)
        if (hasAchievement('A', 26)) form = form.add(20)
        if (hasAchievement('A', 27)) form = form.add(20)
        // Row 3
        if (hasAchievement('A', 31)) form = form.add(30)
        // Special Achievements are worth more points
        if (hasAchievement('A', 101)) form = form.add(100)
        if (hasAchievement('A', 102)) form = form.add(50)
        if (hasAchievement('A', 103)) form = form.add(50)
        if (hasAchievement('A', 104)) form = form.add(30)
        // Secret Bar Achievements
        if (hasAchievement('A', 201)) form = form.add(100)
        if (hasAchievement('A', 202)) form = form.add(100)
        if (hasAchievement('A', 203)) form = form.add(100)
        if (hasAchievement('A', 204)) form = form.add(100)
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
            tooltip: "3 Powders?<br> Reward: 2 AP",
            unlocked() { return hasAchievement('A', 11) },
        },
        13: {
            name: "Half of Two",
            done() { return hasUpgrade('P', 14) && (upgradeEffect('P', 14) > 1.499) },
            tooltip: "NP-IV has 50% boost<br>Reward: 5 AP",
            unlocked() { return hasAchievement('A', 12) },
        },
        14: {
            name: "Saget the 2nd",
            done() { return hasUpgrade('P', 22) },
            tooltip: "Saget the 1st would be proud...<br> Reward: 5 AP",
            unlocked() { return hasAchievement('A', 13) },
        },
        15: {
            name: "SF",
            done() { return player.SP.unlocked || player.F.unlocked },
            tooltip: "Unlock one of the layers in Row 2<br> Reward: 7 AP",
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
            tooltip: "start the 3rd layer<br>Reward: 20 AP",
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
            tooltip: "Ultra<br>Reward: 20 AP",
            unlocked() { return hasAchievement('A', 24) },
        },
        26: {
            name: "C.U.R.E",
            done() { return hasMilestone('V', 14) },
            tooltip: "Cure... Have fun with Water!<br>Reward: 20 AP",
            unlocked() { return hasAchievement('A', 25) },
        },
        27: {
            name: "HTwoTheNo!",
            done() { return player.W.points.gte(2) },
            tooltip: "Hah, get it?<br>Reward: 20 AP",
            unlocked() { return hasAchievement('A', 26) },
        },
        31: {
            name: "Special Formula +2",
            done() { return getBuyableAmount('W', 12).gte(2)},
            tooltip: "Get 2 of the 2nd Water Buyable<br>Reward: 30 AP",
            unlocked() { return hasAchievement('A', 27) },
        },
    }
})