addLayer("W", {
    name: "W", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Wiki", // This appears on the layer's node. Default is the id with the first letter capitalized

    startData() {
        return {
            unlocked: false,
            points: new Decimal(0),
            page: new Decimal(0),
            shown: true,
        }
    },
    tooltip: "Solstice Studio Wiki",
    tooltipLocked: "Working <i><text style='color:orange'>VERY</text></i> hard on this with Wot.<br>[[BOOTING STAT GRAPHS]]",
    requires: new Decimal(1e99),
    layerShown() {
        let shown = player[this.layer].shown
        return shown
    },
    update(diff) {
        // If the Date is Janurary 1st, 2025; set the Newsletter being opened to true, else keep the newsletter locked until Janurary 1st, 2025
        // Updates every 1/60th of a second.
    },
    nodeStyle() {
        return {
            "background": (player.W.unlocked)?"radial-gradient(circle at bottom, rgba(134, 9, 9, 1) 0, red 100%)":"#bf8f8f",
            "border": (player.W.unlocked)?"1px dashed red":"",
            "width": "150px",
            "height": "100px",
            }
    },

    componentStyles: {
        "prestige-button": {
            background() {
                return (canReset("D")) ? "radial-gradient(#701e87, #701e87)" : "#bf8f8f"
            },
        },
    },

    tabFormat: [],




















    color: "#701e87",
    baseAmount() { return player.points },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    position: -1,
    type: "normal",
    branches: ["D"],

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
            title: "Next",
            canClick() {
                let click = true
                if (player[this.layer].page >= 4) click = false
                return click
            },
            onClick() {
                player[this.layer].page = player[this.layer].page.add(1)
            },
            style() {
                return {
                    'background-color': tmp.D.color,
                }
            },
        },
    },
})