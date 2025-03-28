addLayer("U", {
    name: "U", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol() {return "<metabox>April 1st</metabox>"}, // This appears on the layer's node. Default is the id with the first letter capitalized
    startData() {
        return {
            unlocked: true,
            shown: true,
            page: new Decimal(0),
        }
    },
    tooltip: "<fatigue>The April Fools Update!</fatigue>",
    tooltipLocked: "<fatigue>You're not allowed to look in here...</fatigue>",
    requires() {
        let requirement = new Decimal(1)
        return requirement

    },


    // what the fuck do i do, feburary is tmr and I didn't even start coding the website

    layerShown() { return true},

    nodeStyle() {
        return {
            "background": "radial-gradient(circle at bottom, rgb(136, 136, 136) 0, black 100%)",
	        "border": "1.5px dashed yellow",
        }
    },
    color: "#33AACC",
    resource: "Floor 1",
    baseResource: "money",
    baseAmount() { return player.points },
    row: 2, // Row the layer is in on the tree (0 is the first row)
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
                <metabox style='color:orange ; font-size: 24px'>April Fools Update</metabox><br>
                <text style='color:lightgrey ; font-size: 18px'><special>Fools Madness!</special></text><br><br>
                `,
                    ],
                    "blank",
                    ["display-text", `<text style='color:pink ; font-size: 19px'>
                You can't obtain any type of stat changes during the entire event<br>
                All Weapons can be obtained by experiments<br>
                Unstable Stim Defense stat is even like Swat Armor<br>
                Add 35% of the new content for testing purposes / removing barriers<br>
                Experimental Weapons spawn 1000% more frequently.<br>
                All Weapon Durability is tripled<br>
                Bloodmoom & Abyssal are disabled<br>
                Events are 50% more frequent to occur<br>
                All Experiments are now Bunpups & Hyena Pup, Shenzi is the only obtainable experiment from items<br>
                Bleeding lasts for a second, it does 1500 damage, but the chances are significantly reduced<br>
                Black Cube<br></text><br><br><br><br><br><br><br><br><br><br><br><br><br>
                <nullwashere>err.cube err.cube err.cube err.cube err.cube err.cube err.cube err.cube</nullwashere><br><br>
                <nullwashere>err.cube err.cube err.cube err.cube err.cube err.cube err.cube err.cube</nullwashere><br><br>
                <nullwashere>err.cube err.cube err.cube err.cube err.cube err.cube err.cube err.cube</nullwashere><br><br>
                <nullwashere>err.cube err.cube err.cube err.cube err.cube err.cube err.cube err.cube</nullwashere><br><br>
                <nullwashere>err.cube err.cube err.cube err.cube err.cube err.cube err.cube err.cube</nullwashere><br><br>
                <nullwashere>err.cube err.cube err.cube err.cube err.cube err.cube err.cube err.cube</nullwashere><br><br>
                <nullwashere>err.cube err.cube err.cube err.cube err.cube err.cube err.cube err.cube</nullwashere><br><br>
                <nullwashere>err.cube err.cube err.cube err.cube err.cube err.cube err.cube err.cube</nullwashere><br><br>
                <nullwashere>err.cube err.cube err.cube err.cube err.cube err.cube err.cube err.cube</nullwashere><br><br>
                <nullwashere>err.cube err.cube err.cube err.cube err.cube err.cube err.cube err.cube</nullwashere><br><br>
                <nullwashere>err.cube err.cube err.cube err.cube err.cube err.cube err.cube err.cube</nullwashere><br><br>
                <nullwashere>err.cube err.cube err.cube err.cube err.cube err.cube err.cube err.cube</nullwashere><br><br>
                <nullwashere>err.cube err.cube err.cube err.cube err.cube err.cube err.cube err.cube</nullwashere><br><br>
                <nullwashere>err.cube err.cube err.cube err.cube err.cube err.cube err.cube err.cube</nullwashere><br><br>
                <nullwashere>err.cube err.cube err.cube err.cube err.cube err.cube err.cube err.cube</nullwashere><br><br>
                <nullwashere>err.cube err.cube err.cube err.cube err.cube err.cube err.cube err.cube</nullwashere><br><br>
                <nullwashere>err.cube err.cube err.cube err.cube err.cube err.cube err.cube err.cube</nullwashere><br><br>
                <nullwashere>err.cube err.cube err.cube err.cube err.cube err.cube err.cube err.cube</nullwashere><br><br>
                <nullwashere>err.cube err.cube err.cube err.cube err.cube err.cube err.cube err.cube</nullwashere><br><br>
                <nullwashere>err.cube err.cube err.cube err.cube err.cube err.cube err.cube err.cube</nullwashere><br><br>
                <nullwashere>err.cube err.cube err.cube err.cube err.cube err.cube err.cube err.cube</nullwashere><br><br>
                <nullwashere>err.cube err.cube err.cube err.cube err.cube err.cube err.cube err.cube</nullwashere><br><br>
                <nullwashere>err.cube err.cube err.cube err.cube err.cube err.cube err.cube err.cube</nullwashere><br><br>
                <nullwashere>err.cube err.cube err.cube err.cube err.cube err.cube err.cube err.cube</nullwashere><br><br>
                <nullwashere>err.cube err.cube err.cube err.cube err.cube err.cube err.cube err.cube</nullwashere><br><br>
                <nullwashere>err.cube err.cube err.cube err.cube err.cube err.cube err.cube err.cube</nullwashere><br><br>
                <nullwashere>err.cube err.cube err.cube err.cube err.cube err.cube err.cube err.cube</nullwashere><br><br>
                <nullwashere>err.cube err.cube err.cube err.cube err.cube err.cube err.cube err.cube</nullwashere><br><br>
                <nullwashere>err.cube err.cube err.cube err.cube err.cube err.cube err.cube err.cube</nullwashere><br><br>
                <nullwashere>err.cube err.cube err.cube err.cube err.cube err.cube err.cube err.cube</nullwashere><br><br>
                <nullwashere>err.cube err.cube err.cube err.cube err.cube err.cube err.cube err.cube</nullwashere><br><br>
                <nullwashere>err.cube err.cube err.cube err.cube err.cube err.cube err.cube err.cube</nullwashere><br><br>
                <nullwashere>err.cube err.cube err.cube err.cube err.cube err.cube err.cube err.cube</nullwashere><br><br>
                <nullwashere>err.cube err.cube err.cube err.cube err.cube err.cube err.cube err.cube</nullwashere><br><br>
                <nullwashere>err.cube err.cube err.cube err.cube err.cube err.cube err.cube err.cube</nullwashere><br><br>
                <nullwashere>err.cube err.cube err.cube err.cube err.cube err.cube err.cube err.cube</nullwashere><br><br>
                <nullwashere>err.cube err.cube err.cube err.cube err.cube err.cube err.cube err.cube</nullwashere><br><br>
                <nullwashere>err.cube err.cube err.cube err.cube err.cube err.cube err.cube err.cube</nullwashere><br><br><br><br>
                <seeme>We can see you. Can you see me?</seeme>
                `],
                    ]
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
                    'background-color': tmp.U.color,
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
                    'background-color': tmp.U.color,
                }
            },
        },
    },
})
