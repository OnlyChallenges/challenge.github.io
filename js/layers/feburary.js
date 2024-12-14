addLayer("F", {
    name: "F", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Solstice S-2", // This appears on the layer's node. Default is the id with the first letter capitalized
    startData() {
        return {
            unlocked: false,
        }
    },
    tooltip: "Feburary 2025 Solstice Studio Newsletter",
    tooltipLocked: "Locked until Feburary 2025<br>(It is currently <text style='color:cyan'>" + month + " " + day + "</text>,<text style='color:cyan'>" + year + "</text>)",
    requires() {
        let requirement = new Decimal(25)
        return requirement

    },

    update(diff) {
        if (Febtime <= maintime) player[this.layer].unlocked = true
        else player[this.layer].unlocked = false
        // If the Date is Janurary 1st, 2025; set the Newsletter being opened to true, else keep the newsletter locked until Janurary 1st, 2025
        // Updates every 1/60th of a second.
    },


    nodeStyle() {
        return {
            "background": (player.F.unlocked || canReset("F")) ? "radial-gradient(#77CCDD, #492312)" : "#bf8f8f",
        }
    },
    componentStyles: {
        "prestige-button": {
            background() {
                return (canReset("F")) ? "radial-gradient(#33AACC, #1703fc)" : "#bf8f8f"
            },
        },
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
    hotkeys: [
        { key: "1", description: "1: Reset for Floor 1", onPress() { if (canReset(this.layer) && player.F1.unlocked) doReset(this.layer) } },
    ],
    layerShown() { return true },
    doReset(resettingLayer) {
        if (layers[resettingLayer].row > this.row) layerDataReset(this.layer);
    },
})
