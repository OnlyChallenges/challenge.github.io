addLayer("D", {
    name: "D", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Solstice S-1", // This appears on the layer's node. Default is the id with the first letter capitalized

    startData() {
        return {
            unlocked: false,
            points: new Decimal(0),
            shown: false,
        }
    },
    haveTime() {
        let unlock = player[this.layer].unlocked
        return unlock
    },
    tooltip: "Janurary 2025 Solstice Studio Newsletter",
    tooltipLocked: "Locked until Janurary 2025<br>(It is currently <text style='color:cyan'>" + month + " " + day + "</text>,<text style='color:cyan'>" + year + "</text>)",
    requires() {
        let requirement = new Decimal(25)
        return requirement

    },
    layerShown() {
        let shown = player[this.layer].shown
        return shown
    },
    update(diff) {
        if (Jantime <= maintime) player[this.layer].shown = true
        else player[this.layer].shown = false

        if (Jantime <= maintime) player[this.layer].unlocked = true
        else player[this.layer].unlocked = false
        // If the Date is Janurary 1st, 2025; set the Newsletter being opened to true, else keep the newsletter locked until Janurary 1st, 2025
        // Updates every 1/60th of a second.
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
        "News Letter": {
        content: [
            ["display-text",
                `
                <text style='color:orange ; font-size: 24px'>Solstice Studio Newsletter</text><br>
                <text style='color:lightgrey ; font-size: 18px'><special>Janurary 2025</special></text><br><br>
                Hey there! Welcome to the Solstice Studios <text style='color:yellow'>Newsletter</text><br>
                We'll be talking about <i>Mechanics, Concepts, Designs</i> and much more!<br>
                By <orion>Orion</orion>, <rory>Rory</rory>, <tidal>Tidal</tidal>, <plasma>Plasma</plasma>, <jj>JJ</jj>, <vali>Vali</vali><br>
                `
            ],
            ["blank", "70px"],
            ["display-text",
                `
                <text style='color:orange ; font-size: 24px'>The Development Process</text><br>
                <text style='color:lightgrey ; font-size: 16px'><special>Watch out for those mechanics!</special></text><br>
                <img src='img/newsletter.png', style='height: 280px ; width 400px'></img><br>
                <vali>Currently, it's smooth sailing! With</vali> <plasma>Plasma</plasma> <vali>&</vali> <orion>Orion</orion> <vali>finishing up the final touches on<br>their amazing experiments! Might get "Prickly" they've been saying...</vali><br>
                <plasma>I added my snail boi, I believe we're doing alright :3</plasma><br><rory>Hey! Let me chime in here! Y'all seen Thorn?! They're a Chupacabra ^-^</rory><br>
                <img src='img/thorn.png', style='height: 280px ; width 400px'></img><br><br>
                <vali>Alright Alright, we know y'all love your goobers, and I believe they will too soon...</vali><br>
                <vali>Mechanics... We have a few of them in mind or is already in the process of doing it. <br>My personal favorite:</vali> <power>Power Boxes</power><br>
                <tidal>Heyyyyy... don't forget about the <text style='color:cyan'>Assist System</text>!</tidal><br><vali>Don't worry <tidal>Tidal</tidal> I didn't forget! How about you explain it to them. Again perhaps?</vali><br>
                <tidal>Sure,</tidal>
                <jj>Fortnite, Specifically OG Fortnite</jj>
                `
            ]
        ],
    },
    
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
    branches: ["F"],
    doReset(resettingLayer) {
        if (layers[resettingLayer].row > this.row) layerDataReset(this.layer);
    },
})
