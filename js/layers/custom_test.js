addLayer("L", {
    name: "Battle", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "L", // This appears on the layer's node. Default is the id with the first letter capitalized
    startData() { return {
        unlocked: true,
        level: new Decimal(1),
        attack: new Decimal(2),
        defense: new Decimal(1),
        exp: new Decimal(0),
        expMax: new Decimal(10),
    }},
    color: "#8A422A",
    tooltip: "Battle",
    row: 5, // Row the layer is in on the tree (0 is the first row)
    type: "none",
    layerShown(){return true},
    tabFormat: {
            "Achievements":{
            content: [
                "blank",
                "blank",
                "blank",
                ["display-text",function(){
let func = "Level " + formatWhole(player.L.level)
return func

},{}],
                ["display-text",function(){let func = "ATK: " +formatWhole(player.L.attack)+ " ==== DEF: " + formatWhole(player.L.defense)
return func
},{}],
                ["display-text",function(){let func = "EXP: "+format(player.L.exp)+" / " +format(player.L.expMax)
return func
},{}],
                ],
            },
        },
})