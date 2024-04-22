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
                "blank",
                "blank",
                ["achievements", [1, 2, 3, 4, 5, 6, 7, 8, 9]],
                "blank",
                ["display-text", function () {
                    return 'You have ' + formatWhole(tmp.A.total2) + ' / 4 Secret Achievements'
                }, {}],
                "blank",
                ["achievements", [10, 11, 12]],
                "blank",
                "blank",
                "blank",
                "blank",
                "blank",
                "blank",
                "blank",
                "blank",
                "blank",
                "blank",
                "blank",
                "blank",
                "blank",
                "blank",
                "blank",
                "blank",
                "blank",
                "blank",
                "blank",
                "blank",
                "blank",
                "blank",
                "blank",
                "blank",
                "blank",
                "blank",
                "blank",
                "blank",
                "blank",
                "blank",
                "blank",
                "blank",
                "blank",
                "blank",
                "blank",
                "blank",
                "blank",
                "blank",
                "blank",
                "blank",
                "blank",
                "blank",
                "blank",
                "blank",
                "blank",
                "blank",
                "blank",
                "blank",
                "blank",
                "blank",
                "blank",
                "blank",
                "blank",
                "blank",
                "blank",
                ["display-text", function () {
                    let yes = 'You have hugged Plasma a total of <logic>' + formatWhole(player.A.hugs) + '</logic> times!'
                    if (player.A.hugs > 999) yes = 'You have hugged Plasma a total of <logic>' + formatWhole(player.A.hugs) + `</logic> times!<br> You Achieved 'Secret: Creature's Forgiving Hug' Achievement!`
                    return yes
                }, {}],
                "clickables",
            ],
        },
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
            done() { return getBuyableAmmount('W', 12).gte(2)},
            tooltip: "Get 2 of the 2nd Water Buyable<br>Reward: 30 AP",
            unlocked() { return hasAchievement('A', 31) },
        },
        101: {
            name: "Secret: Only the first row",
            done() { return ((hasUpgrade('F', 11) && hasUpgrade('F', 12) && hasUpgrade('F', 13) && hasUpgrade('F', 14) && hasUpgrade('F', 15) && hasUpgrade('F', 16) && !hasUpgrade('F', 21) && !hasUpgrade('F', 22)) && (hasUpgrade('SP', 11) && hasUpgrade('SP', 12) && hasUpgrade('SP', 13) && hasUpgrade('SP', 14) && hasUpgrade('SP', 15) && !hasUpgrade('SP', 21))) },
            tooltip: "Get only the first row of Super Power & Feed Upgrades before getting the 2nd row of both!<br>Reward: 100 AP",
            unlocked() { return hasAchievement('A', 101) },
        },
        102: {
            name: "Secret: Hidden under the Achievements",
            done() { return player.A.secret == 1 },
            tooltip: "You found a secret Button...it does nothing surprisingly<br>Reward: 50 AP",
            unlocked() { return hasAchievement('A', 102) },
        },
        103: {
            name: "Secret: Powdery World",
            done() { return player.P.points.gte(1e25) && player.W.points.lte(0) },
            tooltip: `"Have no H20, but have 10^25 Powder", Nice quote <br>Reward: 50 AP`,
            unlocked() { return hasAchievement('A', 103) },
        },
        104: {
            name: "Secret: Creatur's Forgiving Hug",
            done() { return player.A.hugs > 999 },
            tooltip: `"Hug Plasma more than 999 times! (<logic>Are you a psychopath?</logic>)<br>Reward: 30 AP`,
            unlocked() { return hasAchievement('A', 104) },
        },
    },
    clickables: {
        11: {
            title: "You found a secret",
            display: "Secret, THIS WILL REQUIRE TO RESTART THE PAGE ON CLICK",
            canClick: true,
            onClick() {
                player.A.secret += 1
            },
            style() {
                return {
                    'background-color': tmp.A.color,
                }
            },
            unlocked() { return player.A.secret == 0 }
        },
        12: {
            title: "Hug Plasma",
            display() {
                let hug = "Hug the creatur"
                if (player.A.hugs >= 30) hug = "Uh...you can stop hugging the creatur"
                if (player.A.hugs >= 60) hug = "Please..stop"
                if (player.A.hugs >= 100) hug = "I said to stop..."
                if (player.A.hugs >= 130) hug = "..."
                if (player.A.hugs >= 160) hug = "I spent 20 minutes making this hug button"
                if (player.A.hugs >= 200) hug = "Too much affection"
                if (player.A.hugs >= 250) hug = "..."
                if (player.A.hugs >= 450) hug = "How long until you stop pressing this button?"
                if (player.A.hugs >= 500) hug = "Fine, at 1000 you WILL leave me alone"
                if (player.A.hugs >= 550) hug = "..."
                if (player.A.hugs >= 600) hug = "... ..."
                if (player.A.hugs >= 650) hug = "... ... ..."
                if (player.A.hugs >= 750) hug = "... ... ... ..."
                if (player.A.hugs >= 800) hug = "Hug me until this button disappears I guess..."
                if (player.A.hugs >= 950) hug = "Thanks for being so nice...I guess"
                return hug
            },
            canClick: true,
            onClick() {
                player.A.hugs = player.A.hugs.add(1)
            },
            style() {
                return {
                    'background-color': tmp.A.color,
                }
            },
            unlocked() {
                let yes = false
                if (player.A.secret == 1) yes = true
                if (player.A.hugs >= 1000) yes = false
                return yes
            }
        },
    },
})