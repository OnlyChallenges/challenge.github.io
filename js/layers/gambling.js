addLayer("D", {
    name: "D", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Game of Chance", // This appears on the layer's node. Default is the id with the first letter capitalized

    startData() {
        return {
            unlocked: true,
            points: new Decimal(0),
            even: false,
            black: false,
        }
    },
    tooltip: "Game of Chance",
    tooltipLocked: "Game of Chance",
    requires() {
        let requirement = new Decimal(1)
        return requirement

    },
    layerShown() {
        let shown = true
        return shown
    },
    nodeStyle() {
        return {
            "background": (player.D.unlocked || canReset("D")) ? "radial-gradient(#33AACC, #1703fc)" : "#bf8f8f",
        }
    },
    componentStyles: {
        "prestige-button": {
            background() {
                return (canReset("D")) ? "radial-gradient(#33AACC, #1703fc)" : "#bf8f8f"
            },
        },
    },

    tabFormat: {
        "Game of Chance": {
            content: [
                ["infobox", "lore"],
                ["infobox", "chances"],
                "h-line",
                "blank",
                ["display-text", function() 
                    {
                        let info = ''
                        if (player[this.layer].black == false && player[this.layer].even == false) info = "You're rolling for Red & Odd"
                        return info
                }],
                ["raw-html", ` <input type='checkbox' id='even' name='check' value='player[this.layer].even'style="margin:5px 0;width:30px;"> <label for="even">Roll for Even</label>`],
                ["raw-html", ` <input type='checkbox' id='black' name='check' value='player[this.layer].black' style="margin:5px 0;width:30px;"> <label for="black">Roll for Black</label>`],
                ["raw-html", ` <button type='submit'>Test</button>`],
                ],
        },

    },

    infoboxes: {
        lore: {
            title: "How to Play",
            body:
                `
                You start with 100$, which you can use upon to take a <special>chance</special> of earning more, or lose some of it.<br>
                You only have <orion>100 Simulations/Tries</orion> to get as much as possible, will you take the risk?
            `,
        },
        chances: {
            title: "Chances",
            body:
                `
                Red or Black: 50%<br>
                Odd or Even: 50%<br>
                Red & Odd: 25% --- etc.<br>
                Number (1 - 100): 1%<br>
                Green: 1%<br>
                Perfect Outcome (Green, Number, Even/Odd): 0.005%
            `,

        }
    },
    color: "#33AACC",
    baseAmount() { return player.points },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    type: "normal",
    exponent() {
        let ex = new Decimal(1.077)
        return ex
    },
    gainMult() {
        let gain = new Decimal(1)
        return gain
    },
    gainExp() {
        let exp = new Decimal(1)
        return exp
    },
    doReset(resettingLayer) {
        if (layers[resettingLayer].row > this.row) layerDataReset(this.layer);
    },
})
