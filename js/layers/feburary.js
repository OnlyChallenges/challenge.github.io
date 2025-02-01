addLayer("F", {
    name: "F", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Feburary", // This appears on the layer's node. Default is the id with the first letter capitalized
    startData() {
        return {
            unlocked: false,
            shown: false,
            page: new Decimal(0),
        }
    },
    tooltip: "Feburary 2025 Solstice Studio Newsletter",
    tooltipLocked: "Locked until Feburary 2025<br>(It is currently <text style='color:cyan'>" + month + " " + day + "</text>,<text style='color:cyan'>" + year + "</text>)",
    requires() {
        let requirement = new Decimal(25)
        return requirement

    },


    // what the fuck do i do, feburary is tmr and I didn't even start coding the website

    layerShown() {
        let shown = player[this.layer].shown
        return shown
    },

    update(diff) {
        if (Jantime <= maintime) player[this.layer].shown = true
        else player[this.layer].shown = true

        if (Jantime <= maintime) player[this.layer].unlocked = true
        else player[this.layer].unlocked = false
        // If the Date is Janurary 1st, 2025; set the Newsletter being opened to true, else keep the newsletter locked until Janurary 1st, 2025
        // Updates every 1/60th of a second.
    },


    nodeStyle() {
        return {
            "background": "radial-gradient(circle at bottom, rgb(64, 168, 4) 0, darkgreen 100%)",
	        "border": "1.5px dashed red",
        }
    },
    color: "#33AACC",
    resource: "Floor 1",
    baseResource: "money",
    baseAmount() { return player.points },
    row: 1, // Row the layer is in on the tree (0 is the first row)
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


    tabFormat:
        function () {
            let content =

                [
                    ["display-text",
                        `
                <text style='color:orange ; font-size: 24px'>Solstice Studio Newsletter</text><br>
                <text style='color:lightgrey ; font-size: 18px'><special>Feburary 2025</special></text><br><br>
                `,
                    ],
                    "blank",
                    "h-line",
                    "blank",
                    ["display-text", `
                <text style='color:red ; font-size: 24px'>The Final Update</text><br>
                <text style='color:lightgrey ; font-size: 18px'><special>Loss of Motivation</special></text><br><br>
                Currently, the game is going into a process of decay<br>I've started to lose my motivation to progress on the game, but that doesn't mean I haven't finished<br>nor quit the final update<br>
                The Vent System has finally been finished, same with fixing the Crystals by removing camping<br> ontop of them by adding passive damage, no matter what you are, experiment or not<br>
                The UI for the players have been changed and improved, same with music & events entirely<br><text style='color:yellow'>(Two moons will be the end of human advantage)</text><br>
                It's kind of an surprise to see that the game had alot of potential,<br>to only a couple of words that shouldn't have been said. 
                `],
                    "blank",
                    "h-line",
                    "blank",
                    ["clickable", 12]];

            if (player["F"].page == 1) content = [
                "blank",
                "h-line",
                "blank",
                ["display-text", `
                <text style='font-size: 24px'><server>Update Progress</server></text><br>
                <text style='color:cyan'>Underwater Area: 100% Complete</text><br>
                <text style='color:blue'>Experiment & Human Spawns: 100% Complete</text><br>
                <text style='color:orange'>Vent System Implimented: 60% Complete</text><br>
                <text style='color:lime'>Assist System: ??% Complete</text><br>
                <text style='color:red'>Intergration of New Chat UI: 80% Complete</text><br>
                <text style='color:purple'>New Infection System: 39% Complete</text><br>
                <text style='color:yellow'>New Moon Event: 0% Complete</text><br><br><br>
                <ruins>Total Bugs Fixed Through This Update: 44</ruins><br>
                I know there isn't a-lot, sorry.
                `],
                "blank",
                "h-line",
                "blank",
                ["clickable", 11]];
            return content
        },





    // Im way to fucking lazy to recode this
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
                    'background-color': tmp.F.color,
                }
            },
        },
        12: {
            title: "Next",
            canClick() {
                let click = true
                if (player[this.layer].page >= 1) click = false
                return click
            },
            onClick() {
                player[this.layer].page = player[this.layer].page.add(1)
            },
            style() {
                return {
                    'background-color': tmp.F.color,
                }
            },
        },
    },
})
