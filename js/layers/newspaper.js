addLayer("D", {
    name: "D", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "", // This appears on the layer's node. Default is the id with the first letter capitalized

    startData() {
        return {
            unlocked: false,
            points: new Decimal(0),
            page: new Decimal(-1),
            shown: true,
        }
    },
    tooltip: "Janurary 2025 Solstice Studio Newsletter",
    tooltipLocked: "∅",

    layerShown() {
        let shown = player[this.layer].shown
        return shown
    },
    requires() {
        return player.points.gte(1000)
    },
    update(diff) {
        if (countDownDate <= maintime) player[this.layer].unlocked = true
        else player[this.layer].unlocked = false
        // If the Date is Janurary 1st, 2025; set the Newsletter being opened to true, else keep the newsletter locked until Janurary 1st, 2025
        // Updates every 1/60th of a second.
    },
    nodeStyle() {
        return {
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
                
                [["raw-html", "<text style='word-spacing:1.3rem'><anim1><div id='anim1' style='font-size:38px'></div></anim1> <anim2><div id='anim2' style='font-size:38px'></div></anim2> <anim3><div id='anim3' style='font-size:38px'></div></anim3> <anim4><div id='anim4' style='font-size:38px'></div></anim4></text>"],
                "blank",
                "blank",
                "blank",
                "h-line",
                "blank",
                "blank",
                    ["display-text",
                        `{dialogueParagraph_Title}<i><text style='color:#575859;font-size:9px'>Raymond</text></i><br><br>{dialogueParagraph_Info<i><text style='color:#575859;font-size:9px'>May 29th</text></i>}
                `,
                    ],
                    "blank",
                    "h-line",
                    "blank",
                    ["clickable", 12],
                    "blank",
                    "blank",
                    ["display-text", `<i><text style='color:#575859;font-size:9px'>Seems like there's nothing here...</text></i><br><br>`]
                ];

            if (player["D"].page == 0) content = [
                    ["display-text",
                        `What are you doing?
                `,],]
            if (player["D"].page == 1) content = [
                                    ["display-text",
                        `What are you doing?
                `,],]

            if (player["D"].page == 2) content = [
                                    ["display-text",
                        `What are you doing?
                `,],]
            if (player["D"].page == 3) content = [
                                   ["display-text",
                        `What are you doing?
                `,],]
                if (player["D"].page == 4) content = [
                                    ["display-text",
                        `What are you doing?
                `,],]

            return content
        },



























    color: "rgba(100,0,0,.01)",
    baseAmount() { return player.points },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    type: "normal",
    branches: ["F"],

    clickables: {
        11: {
            title: "Go back",
            canClick() {
                let click = true
                if (player[this.layer].page <= 0) click = false
                return click
            },
            onClick() {
                player[this.layer].page = player[this.layer].page.minus(1)
            },
            style() {
                return {
                    'background-color': tmp.D.color,
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