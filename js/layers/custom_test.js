addLayer("L", {
    name: "Battle", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "L", // This appears on the layer's node. Default is the id with the first letter capitalized
    startData() { return {
        unlocked: true,
        level: new Decimal(1),
        health: new Decimal(20),
        healthMax: new Decimal(20),
        attack: new Decimal(2),
        Wattack: new Decimal(1),
        defense: new Decimal(1),
        Wdefense: new Decimal(0),
        exp: new Decimal(0),
        expMax: new Decimal(10),
        randomizer: new Decimal(1),
    }},
    color: "#8A422A",
    tooltip: "Battle",
    row: 5, // Row the layer is in on the tree (0 is the first row)
    type: "none",
    layerShown(){return true},
    tabFormat: {
            "Seem Familiar...?":{
            content: [
                "blank",
                "blank",
                ["display-text",function(){
let func = "Zone: <rainbow>???</rainbow>"
return func

},{}],
                "blank",
                ["display-text",function(){
let func = "LV " + formatWhole(player.L.level)
return func

},{}],
                ["display-text",function(){
let func = "HP <logic>" + formatWhole(player.L.health) + "</logic> / <logic>" + formatWhole(player.L.healthMax) + "</logic>"
return func

},{}],
                ["display-text",function(){let func = "ATK: " +formatWhole(player.L.attack)+" ("+formatWhole(player.L.Wattack)+ ") ==== DEF: " + formatWhole(player.L.defense) + " ("+formatWhole(player.L.Wdefense)+")"
return func
},{}],
                ["display-text",function(){let func = "EXP: "+format(player.L.exp)+" / " +format(player.L.expMax)
return func
},{}],
                "blank",
                ["display-text",function(){let func = ""
 if (player.L.randomizer.gte(80)) func = "* You Stepped On Some Leaves"
 if (player.L.randomizer = (60, 61, 62, 63, 64, 65, 66, 67. 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79)) func = "* You Stepped On Some Rocks"
 if (player.L.randomizer = (30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59)) func = "* You Walked Across A Room"
 if (player.L.randomizer.lte(29)) func = "*[Battle_Function1]"
 return func
},{}],
                "blank",
                ["display-text",function(){let func = "<help>(EXP means Execution Points)<br>(LV stands for Level of Violence)</help>"
return func
},{}],
                ],
            },
        },
        clickables:{
        11: {
            title: "Explore",
            display: "Look Around",
            canClick: true,
            onClick() {1
                player.L.randomizer = Math.random(1,100)
            },
            style() {return{
                'background-color': tmp.L.color,
            }},
        },
     },
})