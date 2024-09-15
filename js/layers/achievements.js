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
                    return 'You have ' + formatWhole(tmp.A.total) + ' / 17 Achievements, which boosts crystal gain by ' + format(tmp.A.effect) + 'x<br>You have <logic>' + formatWhole(tmp.A.aP) + '</logic> Achievement Points.<br>[Formula: (1.0125^<logic>' + formatWhole(tmp.A.aP) + '</logic>) / ((1.0012^<logic>' + formatWhole(tmp.A.aP) + '</logic>)*(<logic>' + formatWhole(tmp.A.aP) + '</logic>/100))]'
                }, {}],
                "blank",
                "h-line",
                ["display-text", function () {
                    return 'Current Demo/Beta-Testers:<br> Brian/@therealbrian.'
                }, {}],
                "blank",
                "blank",
                "blank",
                ["achievements", [1, 2, 3, 4, 5, 6, 7, 8, 9]],
                "blank",
                "h-line",
                "blank",
                "blank",
                "blank",
                "blank",
                "blank",
                "blank",
                "blank",
                "blank",
                "blank",
                "clickables",
            ],
        },
    },

    update() {
        let title = ""
        let devspeed = ""
        if (player.devSpeed != 1) {
            devspeed = format(player.devSpeed) + "x || "
        }
        title = "Demo: " + formatTitleTime(player.timePlayed) + "/" + formatTitleTime(modInfo.demoTime)

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
        if (hasAchievement('A', 32)) form = form.add(1)
        if (hasAchievement('A', 33)) form = form.add(1)
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
        if (hasAchievement('A', 24)) form = form.add(30)
        if (hasAchievement('A', 25)) form = form.add(30)
        if (hasAchievement('A', 26)) form = form.add(30)
        if (hasAchievement('A', 27)) form = form.add(40)
        // Row 3
        if (hasAchievement('A', 31)) form = form.add(100)
        if (hasAchievement('A', 32)) form = form.add(150)
        if (hasAchievement('A', 33)) form = form.add(180)
        return form
    },

    achievements: {
        11: {
            name: "The Demo",
            done() { return player.timePlayed > 5 },
            tooltip: "Start the demo-version of the game!<br> Reward: 1 AP",
            style() {
                if (!hasAchievement(this.layer, this.id)) { return '' }
                else if (hasAchievement(this.layer, this.id)) { return { 'background-color': 'blue', 'color': 'white' } }

            },
        },
        12: {
            name: "The Five Bases",
            done() { return hasUpgrade('P', 13) },
            tooltip: "5 Base Upgrades! <br> Reward: 2 AP",
            style() {
                if (!hasAchievement(this.layer, this.id)) { return '' }
                else if (hasAchievement(this.layer, this.id)) { return { 'background-color': 'blue', 'color': 'white' } }

            },
        },
        13: {
            name: "Good Math",
            done() { return hasUpgrade('P', 14) && (upgradeEffect('P', 14) > 1.999) },
            tooltip: "Developers is 100% <br>Reward: 5 AP",
            style() {
                if (!hasAchievement(this.layer, this.id)) { return '' }
                else if (hasAchievement(this.layer, this.id)) { return { 'background-color': 'blue', 'color': 'white' } }

            },
        },
        14: {
            name: "Starting the System",
            done() { return hasUpgrade('P', 22) },
            tooltip: "V5.0...<br> Reward: 5.0 AP",
            style() {
                if (!hasAchievement(this.layer, this.id)) { return '' }
                else if (hasAchievement(this.layer, this.id)) { return { 'background-color': 'blue', 'color': 'white' } }

            },
        },
        15: {
            name: "The Unknown Boundaries",
            done() { return player.SP.unlocked || player.F.unlocked },
            tooltip() {
                if (!hasAchievement(this.layer, this.id)) return "????????????????????"
                else if (hasAchievement(this.layer, this.id)) return "Unlock one of the layers in Row 2<br> Reward: 7 AP"
            },
            style() {
                if (!hasAchievement(this.layer, this.id)) { return '' }
                else if (hasAchievement(this.layer, this.id)) { return { 'background-color': 'blue', 'color': 'white' } }

            },
        },
        16: {
            name: "Process of Elimination",
            done() { return player.SP.unlocked && player.F.unlocked },
            tooltip: "have both layers unlocked<br> Reward: 10 AP",
            style() {
                if (!hasAchievement(this.layer, this.id)) { return '' }
                else if (hasAchievement(this.layer, this.id)) { return { 'background-color': 'blue', 'color': 'white' } }

            },
        },
        17: {
            name: "Importance in progression",
            done() { return hasUpgrade('F', 16) && hasUpgrade('SP', 13) },
            tooltip: "Get E-3 & I-6<br>Reward: Row 3 Layer & 10 AP",
            style() {
                if (!hasAchievement(this.layer, this.id)) { return '' }
                else if (hasAchievement(this.layer, this.id)) { return { 'background-color': 'blue', 'color': 'white' } }

            },
        },
        21: {
            name: "Tip of Damage",
            done() { return player.V.points.gte(1) },
            tooltip: "Start the 3rd layer<br>Reward: 20 AP",
            style() {
                if (!hasAchievement(this.layer, this.id)) { return '' }
                else if (hasAchievement(this.layer, this.id)) { return { 'background-color': 'orange', 'color': 'white' } }

            },
        },
        22: {
            name: "Are there that many crystals?",
            done() { return player.points.gte(1e20) },
            tooltip: "Achieve 1e20 Crystals<br>Reward: 20 AP",
            style() {
                if (!hasAchievement(this.layer, this.id)) { return '' }
                else if (hasAchievement(this.layer, this.id)) { return { 'background-color': 'orange', 'color': 'white' } }

            },
        },
        23: {
            name: "Developer's Plan",
            done() { return player.V.assists.gte(1) },
            tooltip: "Achieve Assists from Weapons<br>Reward: 20 AP",
            style() {
                if (!hasAchievement(this.layer, this.id)) { return '' }
                else if (hasAchievement(this.layer, this.id)) { return { 'background-color': 'orange', 'color': 'white' } }

            },
        },
        24: {
            name: "Lights are back on!",
            done() { return hasChallenge("V", 11) && challengeCompletions("V", 11) >= 1 },
            tooltip: "Complete Power Outage for the first time<br>Reward: 30 AP",
            style() {
                if (!hasAchievement(this.layer, this.id)) { return '' }
                else if (hasAchievement(this.layer, this.id)) { return { 'background-color': 'orange', 'color': 'white' } }
            },
        },
        25: {
            name: "Overkill",
            done() { return hasUpgrade('F', 36) },
            tooltip: "Achieve 10,000,000 Kills<br>Reward: 30 AP",
            style() {
                if (!hasAchievement(this.layer, this.id)) { return '' }
                else if (hasAchievement(this.layer, this.id)) { return { 'background-color': 'orange', 'color': 'white' } }
            },
        },
        26: {
            name: "2nd Wave!",
            done() { return hasMilestone('V', 14) },
            tooltip: "Complete Wave 1 <br>Reward: 30 AP",
            style() {
                if (!hasAchievement(this.layer, this.id)) { return '' }
                else if (hasAchievement(this.layer, this.id)) { return { 'background-color': 'orange', 'color': 'white' } }
            },
        },
        27: {
            name: "Killing Loop",
            done() { return tmp.V.avgDamage.gte(15000) },
            tooltip: "Get an Average of 15,000 Damage<br>Reward: 40 AP",
            style() {
                if (!hasAchievement(this.layer, this.id)) { return '' }
                else if (hasAchievement(this.layer, this.id)) { return { 'background-color': 'orange', 'color': 'white' } }
            },
        },
        31: {
            name: "The Truth",
            done() { return player.points.gte("1e999") },
            tooltip: "Unlock the 4th Layer<br>Reward: 100 AP",
            style() {
                if (!hasAchievement(this.layer, this.id)) { return '' }
                else if (hasAchievement(this.layer, this.id)) { return { 'background-color': 'green', 'color': 'white' } }
            },
        },
        32: {
            name: "Lack of Energy",
            done() { return hasChallenge("V", 11) && challengeCompletions("V", 11) >= 3 },
            tooltip: "Complete Power Outage 3 times<br>Reward: 150 AP",
            style() {
                if (!hasAchievement(this.layer, this.id)) { return '' }
                else if (hasAchievement(this.layer, this.id)) { return { 'background-color': 'green', 'color': 'white' } }
            },
        },
        33: {
            name: "Strike of Blood",
            done() { return hasChallenge("V", 11) && challengeCompletions("V", 11) >= 4 },
            tooltip: "Complete Blood Moon for the first time<br>Reward: 180 AP",
            style() {
                if (!hasAchievement(this.layer, this.id)) { return '' }
                else if (hasAchievement(this.layer, this.id)) { return { 'background-color': 'green', 'color': 'white' } }
            },
        },
    },

    clickables: {
        11: {
            title: "Enable Developer Console",
            display: "Shows a Dev Console/Layer",
            canClick: true,
            onClick() {
                if (confirm("WARNING!!!: This is for the game developer. You can use this if you need help. -vali"))
                    return player[this.layer].secret = 1
            },
            style() {
                return {
                    'background-color': tmp.A.color,
                }
            },
        },
    },

})