addLayer("P", {
    name: "Powder", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    startData() {
        return {
            unlocked: true,
            points: new Decimal(0),
        }
    },
    requires: new Decimal(5),

    color: "#FFFFFF",
    resource: "powder",
    baseResource: "particles",
    baseAmount() { return player.points },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    type: "normal",
    exponent(){
        let ex = new Decimal(1.1)
        return ex
    },
    gainMult(){
        let gain = new Decimal(1)
        return gain
    },
    gainExp(){
        let exp = new Decimal(1)
        return exp
    },
    hotkeys: [
        {key: "p", description: "p: Reset for Powder", onPress(){if (canReset(this.layer) && player.P.unlocked) doReset(this.layer)}},
    ],
    layerShown() { return true },
    doReset(resettingLayer) {
        if (layers[resettingLayer].row > this.row) layerDataReset(this.layer)
    },

    infoboxes: {
        lore: {
            title: "Some stuff",
            body: `
            Hello!; Welcome to <ruinsAbyssal Demise</ruins>, I would like to clarify that this is indeed, still in beta.<br> 
            There will be multiple bugs, issues, and occurences as the game update, so please be patient!
            
            `,
        },
    },




    //Build Content
    upgrades: {
        11: {
            title: "Normal Powder",
            description: "Some Simple Powder, boost point gain by 20%",
            cost: new Decimal(10),
        },
    },
})
