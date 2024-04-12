addLayer("s", {
    startData() {
        return {
            unlocked: true,
            secret: new Decimal(0),
        }
    },
    tabFormat: {
        "Secret": {
            content: [

                "blank",
                "clickables",
                "blank",
            ],
        },
    },
    clickables: {
        11: {
            title: "You found a secret",
            display: "Secret",
            canClick: true,
            onClick() {
                player.s.secret = 1
            },
            style() {
                return {
                    'background-color': tmp.W.color,
                }
            },
            unlocked() { return player.s.secret == 0 }
        },
    },
})
