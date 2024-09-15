addLayer("Dev", {
    name: "Developer Console", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "/", // This appears on the layer's node. Default is the id with the first letter capitalized
    startData() {
        return {
            unlocked: true
        }
    },
    color: "#5DE18A",
    tooltip: "Dev Console",
    tooltipLocked: "???",
    color: "#5b85b3",
    row: "side", // Row the layer is in on the tree (0 is the first row)
    layerShown() { return player.A.secret == 1},
    tabFormat: {
        "Developer Console": {
            content: [
                "clickables",
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
                return player.devSpeed = 2
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
                return player.devSpeed = 5
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
                return player.devSpeed = 1
            },
            style() {
                return {
                    'background-color': tmp.Dev.color,
                }
            },
        },
    },

})