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
                ["display-text", function () {
                    let func = "<text style='color:red'>Row 1 (Level 1 ~ 15)</text><br>"
                    return func
                }, {}],
                ["achievements", [1]],
                "h-line",
                ["display-text", function () {
                    let func = "<text style='color:orange'>Row 2 (Level 15 ~ 30)</text><br>"
                    return func
                }, {}],
                ["achievements", [2]],
                "h-line",
                ["display-text", function () {
                    let func = "<text style='color:yellow'>Row 3 (Level 30 ~ 50)</text><br>"
                    return func
                }, {}],
                ["achievements", [3]],
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
                "blank",
                ["clickables", [1]],
            ],
        },
    },

    achievements: {
        11: {
            name: "Level Up!",
            done() { return player.L.level >= 2 },
            tooltip: "Reach Level 2",
            style() {
                let x = ""
                if (hasAchievement("A", 11)) x = ""
                else return {"background-color" : "rgba(250, 119, 102, 0.65)"}},
        },
        12: {
            name: "The 2nd Zone",
            done() { return player.L.zone >= 2 },
            tooltip: "Reach Zone 2",
            style() {
                let x = ""
                if (hasAchievement("A", 12)) x = ""
                else return {"background-color" : "rgba(250, 119, 102, 0.65)"}},
        },
        13: {
            name: "Experimental Threat",
            done() { return player.L.level >= 10 },
            tooltip: "Reach Level <logic>10</logic>",
            style() {
                let x = ""
                if (hasAchievement("A", 13)) x = ""
                else return {"background-color" : "rgba(250, 119, 102, 0.65)"}},
        },
        14: {
            name: "More Damage",
            done() { return player.L.attack > 10 },
            tooltip: "Have more than 10 Base Attack ",
            style() {
                let x = ""
                if (hasAchievement("A", 14)) x = ""
                else return {"background-color" : "rgba(250, 119, 102, 0.65)"}},
        },
        15: {
            name: "Powering Damage",
            done() { return player.L.level >= 16 },
            tooltip: "Reach Level 16",
            style() {
                let x = ""
                if (hasAchievement("A", 15)) x = ""
                else return {"background-color" : "rgba(250, 119, 102, 0.65)"}},
        },
        16: {
            name: "Defensive Apporach",
            done() { return player.L.defense >= 5 },
            tooltip: "Get 5 Defense or higher",
            style() {
                let x = ""
                if (hasAchievement("A", 16)) x = ""
                else return {"background-color" : "rgba(250, 119, 102, 0.65)"}},
        },
        17: {
            name: "Good Programming",
            done() { return player.L.revives >= 1 },
            tooltip: "Congrats!<br>You learned about the revive system!",
            style() {
                let x = ""
                if (hasAchievement("A", 17)) x = ""
                else return {"background-color" : "rgba(250, 119, 102, 0.65)"}},
        },
        18: {
            name: "Another Medium",
            done() { return player.L.zone >= 4 },
            tooltip: "Reach Zone 4",
            style() {
                let x = ""
                if (hasAchievement("A", 18)) x = ""
                else return {"background-color" : "rgba(250, 119, 102, 0.65)"}},
        },
        21: {
            name: "Beginner's Murder",
            done() { return player.L.kills > 50 },
            tooltip: "Have more than 50 Experiment Kills",
            style() {
                let x = ""
                if (hasAchievement("A", 21)) x = ""
                else return {"background-color" : "rgba(250, 186, 102, 0.65)"}},
        },
        22: {
            name: "Normal Murder",
            done() { return player.L.kills > 250 },
            tooltip: "Have more than 250 Experiment Kills",
            style() {
                let x = ""
                if (hasAchievement("A", 22)) x = ""
                else return {"background-color" : "rgba(250, 186, 102, 0.65)"}},
        },
        23: {
            name: "Experimental Massacre",
            done() { return player.L.kills > 600 },
            tooltip: "Have more than 600 Experiment Kills",
            style() {
                let x = ""
                if (hasAchievement("A", 23)) x = ""
                else return {"background-color" : "rgba(250, 186, 102, 0.65)"}},
        },
        
        24: {
            name: "<fail>Your best friend</fail>",
            done() { return player.L.kills > 1000 },
            tooltip: "Have more than 1,000 Experiment Kills",
            style() {
                let x = ""
                if (hasAchievement("A", 24)) x = ""
                else return {"background-color" : "rgba(250, 186, 102, 0.65)"}},
        },
        25: {
            name: "The first health boost",
            done() { return player.L.Pregen >= 0.1 },
            tooltip: "Unlock Player Regeneration",
            style() {
                let x = ""
                if (hasAchievement("A", 25)) x = ""
                else return {"background-color" : "rgba(250, 186, 102, 0.65)"}},
        },
        26: {
            name: "Two Birds, One Stone",
            done() { return player.L.randomizer == (2) && player.L.zone == (6) && player.L.enemyHP <= 0 },
            tooltip: "Kill an Enemy that gives you 'Bird's Fear'",
            style() {
                let x = ""
                if (hasAchievement("A", 26)) x = ""
                else return {"background-color" : "rgba(250, 186, 102, 0.65)"}},
        },
        27: {
            name: "I love disappearing!",
            done() { return player.L.revives >= 10 },
            tooltip: "Revive yourself 10 or more times!",
            style() {
                let x = ""
                if (hasAchievement("A", 27)) x = ""
                else return {"background-color" : "rgba(250, 186, 102, 0.65)"}},
        },
        28: {
            name: "Heavy-Hitter",
            done() { return player.L.counter == (5) && player.L.crit == (2) },
            tooltip: "Get Counter-Crited!",
            style() {
                let x = ""
                if (hasAchievement("A", 28)) x = ""
                else return {"background-color" : "rgba(250, 186, 102, 0.65)"}},
        },
        31: {
            name: "Last one standing",
            done() { return player.L.level >= 30 },
            style() {
                let x = ""
                if (hasAchievement("A", 31)) x = ""
                else return {"background-color" : "rgba(250, 247, 102, 0.65)"}},
            tooltip: "<text style='color:yellow'>Reach Level 30</text>",
        },
        32: {
            name: "[WIP] Singularity",
            done() { return player.L.zone >= 7 },
            style() {
                let x = ""
                if (hasAchievement("A", 32)) x = ""
                else return {"background-color" : "rgba(250, 247, 102, 0.65)"}},
            tooltip: "<text style='color:yellow'>Unlock the Singularity Zone</text>",
        },
        33: {
            name: "[WIP] Recalling Chance",
            done() { return player.L.zone >= 7 },
            style() {
                let x = ""
                if (hasAchievement("A", 33)) x = ""
                else return {"background-color" : "rgba(250, 247, 102, 0.65)"}},
            tooltip: "<text style='color:yellow'>Perform a Prestige Reset</text>",
        },
        34: {
            name: "[WIP] Improved Form",
            done() { return player.L.zone >= 7 },
            style() {
                let x = ""
                if (hasAchievement("A", 34)) x = ""
                else return {"background-color" : "rgba(250, 247, 102, 0.65)"}},
            tooltip: "<text style='color:yellow'>Reach Level 15 while being Prestige I</text>",
        },
        35: {
            name: "[WIP] Experience Hoarder",
            done() { return player.points >= 70000 },
            style() {
                let x = ""
                if (hasAchievement("A", 35)) x = ""
                else return {"background-color" : "rgba(250, 247, 102, 0.65)"}},
            tooltip: "<text style='color:yellow'>Have a total of 10 Million Experience</text>",
        },
        36: {
            name: "[WIP] Lucky Healing Cat!",
            done() { return player.points >= 70000 },
            style() {
                let x = ""
                if (hasAchievement("A", 36)) x = ""
                else return {"background-color" : "rgba(250, 247, 102, 0.65)"}},
            tooltip: `<text style='color:yellow'>Recover 50,000 Total Healing.</text><br><i><text style='opacity:0.75; font-size: 12px'>"So, you need a new shield buddy?"</text></i>`,
        },
        37: {
            name: "[WIP] Lucky Healing Cat 2!",
            done() { return player.points >= 70000 },
            style() {
                let x = ""
                if (hasAchievement("A", 37)) x = ""
                else return {"background-color" : "rgba(250, 247, 102, 0.65)"}},
            tooltip: `<text style='color:yellow'>Break 100 Enemy Shields</text><br><i><text style='opacity:0.75; font-size: 12px'>"I have the best aim in the spirit realm!"</text></i>`,
        },
        38: {
            name: "[WIP] Perfectionist",
            done() { return player.points >= 70000 },
            style() {
                let x = ""
                if (hasAchievement("A", 38)) x = ""
                else return {"background-color" : "rgba(250, 247, 102, 0.65)"}},
            tooltip: `<text style='color:yellow'>Thanks for Playing! (Reach Level 50)</text><br><i><text style='opacity:0.75; font-size: 12px'>"Ouch! See you in your next life!"</text></i>`,
        },
    },

})