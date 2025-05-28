addLayer("D", {
    name: "D", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "", // This appears on the layer's node. Default is the id with the first letter capitalized

    startData() {
        return {
            unlocked: true,
            points: new Decimal(0),
            page: new Decimal(-1),
            shown: true,
            dialogue: new Decimal(0),
        }
    },
    tooltip: "∅",
    tooltipLocked: "∅",

    layerShown() {
        let shown = player[this.layer].shown
        return shown
    },
    requires() {
        return player.points.gte(1000)
    },
    update(diff) {
        if (playlistName[currentSongIndex] == "Facility!Tale - Crystal Caves (Genocide) Theme") player[this.layer].page = 0
        else player[this.layer].page = 0
        // If the Date is Janurary 1st, 2025; set the Newsletter being opened to true, else keep the newsletter locked until Janurary 1st, 2025
        // Updates every 1/60th of a second.
    },
    nodeStyle() {
        if (playlistName[currentSongIndex] == "Facility!Tale - Crystal Caves (Genocide) Theme") return {
            // "background": "radial-gradient(circle at bottom, rgba(109, 44, 1,1) 0, rgba(100,44,1,1) 100%)",
            // "border": "1px dashed rgba(0,0,0,1)",
            // "box-shadow": "0px 0px 0px rgba(0, 0, 0, 1)"
            "background": "radial-gradient(circle at bottom, rgba(109, 44, 1,.01) 0, rgba(100,44,1,.01) 100%)",
            "border": "1px dashed rgba(0,0,0,0.01)",
            "box-shadow": "0px 0px 0px rgba(0, 0, 0, 0.01)"
        }
        else return {
            "background": "radial-gradient(circle at bottom, rgba(109, 44, 1,.01) 0, rgba(100,44,1,.01) 100%)",
            "border": "1px dashed rgba(0,0,0,0.01)",
            "box-shadow": "0px 0px 0px rgba(0, 0, 0, 0.01)"
        }
    },
    componentStyles: {
        "prestige-button": {
            background() {
                return (canReset("D")) ? "radial-gradient(#701e87,rgba(112, 30, 135, 0.07))" : "#bf8f8f"
            },
        },
    },

    tabFormat:
        function () {
            let content =

                [["raw-html", "<text style='word-spacing:1.3rem'><anim1><div id='anim1' style='font-size:38px'></div></anim1> <anim2><div id='anim2' style='font-size:38px'></div></anim2> <anim3><div id='anim3' style='font-size:38px'></div></anim3> <anim4><div id='anim4' style='font-size:38px'></div></anim4></text><br><br><br><i><text id='waiting' style='color:#575859;font-size:13px'></text></i>"],
                    "blank",
                    "blank",
                ["display-text", `<i><text style='color:#575859;font-size:9px'>...</text></i><br><br>`]
                ];

            if (player["D"].page > 1) content = [
                ["raw-html", "<text style='word-spacing:1.3rem'><anim1><div id='anim1' style='font-size:38px'></div></anim1> <anim2><div id='anim2' style='font-size:38px'></div></anim2> <anim3><div id='anim3' style='font-size:38px'></div></anim3> <anim4><div id='anim4' style='font-size:38px'></div></anim4></text><br><br><br><i><text id='waiting' style='color:#575859;font-size:13px'></text></i>"],
                "blank",
                "blank",
                "blank",
                "h-line",
                "blank",
                 ["display-text",
                    `<i>May 29th, 2025 - The first sign from the Developers</i><br><i><text style='color:#575859;font-size:9px'>Written & Programmed by Ozvali.</text></i>
                `,
                ],
                "blank",
                ["display-text",
                    `<i>5468657927726520747279696E6720746F20666967757265206F7574207768617420746F20646F2E2E2E</i>
                `,
                ],

                ["display-text",
                    `<i><text style='color:#575859;font-size:9px'>It dtz ymnsp ymjd btzqi zsijwxyfsi ymj lfrj hqtxnsl?</text></i>
                `,],
                ["clickable", 11],
                "blank",
                ["raw-html", "<div id='dialogue' style='font-size:13px'></div>"],
            ]

            return content
        },



























    color: "rgba(100,0,0,.01)",
    baseAmount() { return player.points },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    type: "normal",
    branches: ["F"],

    clickables: {
        11: {
            title() {return "<< Dialogue #" + formatWhole(player[this.layer].dialogue) + "/" + formatWhole(DialogueOneArray.length) + " >>"},
            canClick() {
                let click = true
                if (active == true) click = false
                return click
            },
            onClick() {
                let i = player[this.layer].dialogue
                if (player[this.layer].dialogue >= DialogueOneArray.length) document.getElementById('dialogue').innerHTML = ""
                if (player[this.layer].dialogue >= DialogueOneArray.length) player[this.layer].dialogue = new Decimal(0)
                printOut(DialogueOneArray[i])
                active = true
                document.getElementById("dialogues").disabled = true;
                player[this.layer].dialogue = player[this.layer].dialogue.add(1)

            },
            style() {
                return {
                    'background-color': "#49123d",
                    'width': "240px",
                }
            },
        },
        12: {
            title: "{progressDialogue_button}",
            canClick() {
                let click = true
                if (player[this.layer].page >= 4) click = false
                return click
            },
            onClick() {
                player[this.layer].page = player[this.layer].page.add(0)
            },
            style() {
                return {
                    'background-color': "#49123d",
                    'width': "240px",
                }
            },
        },
    },
})