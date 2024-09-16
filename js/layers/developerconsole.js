addLayer("Dev", {
    name: "Developer Console", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "/", // This appears on the layer's node. Default is the id with the first letter capitalized
    startData() {
        return {
            unlocked: true,
            hardmode: new Decimal(0),
            command1: new Decimal(0),
            command2: new Decimal(0),
            command3: new Decimal(0),
            command5: new Decimal(0),
        }
    },
    color: "#5DE18A",
    tooltip: "Dev Console",
    tooltipLocked: "???",
    color: "#5b85b3",
    row: "side", // Row the layer is in on the tree (0 is the first row)
    layerShown() { return player.A.secret == 1 },
    tabFormat: {
        "Developer Console": {
            content: [
                "clickables",
                "blank",
                "blank",
                "h-line",
                "blank",
                ["display-text", function () {
                    return "Developer Commands:"
                }, {}],
                ["display-text", function () {
                    if (player.Dev.command1 == 1) return "/time : Able to manipluate the game time, whatever you please"
                    else if (player.Dev.command1 == 1 && player.Dev.command3 == 1) return "/time : Able to manipluate the game time, whatever you please (You can't edit time in hardmode)"
                    else return "???????????????????????????????????"
                }, {}],
                ["display-text", function () {
                    if (player.Dev.command2 == 1) return "/achievementcheat : Adds 250 Achievement Points (only once)"
                    else if (player.Dev.command2 == 1 && player.Dev.command3 == 1) return "/achievementcheat : Adds 250 Achievement Points (only once) (AP doesn't matter in hardmode)"
                    else return "?????????????????????????????"
                }, {}],
                ["display-text", function () {
                    if (player.Dev.command3 == 1) return "/hardmode : The game is progressively harder depending on your setting"
                    else return "???????????????????????????????"
                }, {}],
                ["display-text", function () {
                    if (player.Dev.command5 == 1) return "/normalmode : Disables Hardmode"
                    else return "???????????????????"
                }, {}],
            ],
        },
    },
    clickables: {
        11: {
            title: "Reset Time",
            display: "Resets the game timer",
            canClick: true,
            onClick() {
                if (confirm("Are you sure you want to reset the game time?"))
                    return player.timePlayed = 0
            },
            style() {
                return {
                    'background-color': tmp.Dev.color,
                }
            },
        },
        12: {
            title: "2x Dev Speed",
            display: "doubles the dev speed",
            canClick: true,
            onClick() {
                if (player.Dev.hardmode >= 1) return alert("You're cannot edit devspeed in hardmode")
                else return player.devSpeed = 2
            },
            style() {
                return {
                    'background-color': tmp.Dev.color,
                }
            },
        },
        13: {
            title: "5x Dev Speed",
            display: "5x the dev speed",
            canClick: true,
            onClick() {
                if (player.Dev.hardmode >= 1) return alert("You're cannot edit devspeed in hardmode")
                else return player.devSpeed = 5
            },
            style() {
                return {
                    'background-color': tmp.Dev.color,
                }
            },
        },
        14: {
            title: "Normal Dev Speed",
            display: "Normal Game Time",
            canClick: true,
            onClick() {
                if (player.Dev.hardmode >= 1) return alert("You're cannot edit devspeed in hardmode")
                else return player.devSpeed = 1
            },
            style() {
                return {
                    'background-color': tmp.Dev.color,
                }
            },
        },
        15: {
            title: "Type Commands",
            display: "Input commands",
            canClick: true,
            onClick() {
                let input = (prompt("Developer Command Prompt"));


                if ((input == "/time") && player.Dev.hardmode == 0) {
                    input = (prompt("Seconds set for time played?"))
                    if (!isNaN(input))
                        return (player.timePlayed = input) && (player.Dev.command1 = 1) && alert("Your game time is set to " + input + "s")
                    else
                        alert("Not an actual number or you closed the prompt")
                }

                else if (input == "/achievementcheat") { return (player.Dev.command2 = 1) }

                else if (input == "/hardmode") {
                    input = (prompt("How difficult do you want it? \n\nHard \nInsane \nImpossible"))
                    if (input == "Hard" || input == "hard")
                        return (player.Dev.hardmode = 1) && (player.Dev.command3 = 1) && (player.devSpeed = 0.9) && alert("You've Enter'd Hard Mode")
                    if (input == "Insane" || input == "insane")
                        return (player.Dev.hardmode = 2) && (player.Dev.command3 = 1) && (player.devSpeed = 0.8) && alert("You've Enter'd Insane Mode ")
                    if (input == "Impossible" || input == "impossible")
                        return (player.Dev.hardmode = 3) && (player.Dev.command3 = 1) && (player.devSpeed = 0.65) && alert("You've Enter'd Impossible Mode")
                    else
                        alert("ERROR; Please try again")
                }

                else if (input == "/normalmode") {
                    if (player.Dev.hardmode == 1) {
                        if (confirm("Are you sure you want to exit Hard Mode?"))
                            return (player.Dev.command5 = 1) && (player.Dev.hardmode = 0)
                    }
                    else if (player.Dev.hardmode == 2) { if (confirm("Are you sure you want to exit Insane Mode?")) return (player.Dev.command5 = 1) && (player.Dev.hardmode = 0) && (player.devSpeed = 1) }
                    else if (player.Dev.hardmode == 3) { if (confirm("Are you sure you want to exit Impossible Mode?")) return (player.Dev.command5 = 1) && (player.Dev.hardmode = 0) && (player.devSpeed = 1) }
                    else alert("You're already in Normal Mode...")
                }

                else
                    alert("Invaild Command")
            },
            style() {
                return {
                    'background-color': tmp.Dev.color,
                }
            },
        },
    },

})