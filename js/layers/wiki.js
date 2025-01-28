const imgar = "<img src='img/Bat_2_Idle.webp', style='height: 280px ; width 400px'></img>"

addLayer("W", {
    name: "W", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Wiki", // This appears on the layer's node. Default is the id with the first letter capitalized

    startData() {
        return {
            unlocked: true,
            points: new Decimal(0),
            page: new Decimal(0),
            shown: true,
        }
    },
    tooltip: "Solstice Studio Wiki",
    tooltipLocked: "Working <i><text style='color:orange'>VERY</text></i> hard on this with Wot.<br>[[BOOTING STAT GRAPHS]]",
    layerShown() {
        let shown = player[this.layer].shown
        return shown
    },
    update(diff) {

    },
    nodeStyle() {
        return {
            "background": (player.W.unlocked||canReset("W"))?"radial-gradient(circle at bottom, rgba(134, 9, 9, 1) 0, red 100%)":"#bf8f8f",
            "border": (player.W.unlocked||canReset("W")) ? "1px dashed red":"",
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

    infoboxes: {
        lore: {
            title: "Website Developer Notice",
            body: `
            This is a heads up for everyone here.<br>
            This wiki is in beta and is only being progammed by a single web designer<br>
            <text style='color:red'>Stuff will be added over time.</text>
            `,
        },
    },


    microtabs: {
        
        "Contents": {
            "Bat": {
                content: [
                    ["microtabs", "Stack"],
                    ],
                buttonStyle() { return { 'background': 'grey', 'color':'black'} },
            },
            "Pipe": {
                content: [
                    ["display-text",
                        function () { return "This is the Pipe SubSubPage" },
                        {}],
                    ],
                buttonStyle() { return { 'background': 'grey', 'color':'black'} },
            },
        },
        "Stack": {
            "Bat_MainTestPage": {
                content: [
                        "h-line",
                        ["row", [["blank",['30px','50px']],
                            ["column", [["display-text",imgar], ["display-text", "<i><text style='color:grey'>Bat Idle Animation</text></i>"]]],
                            ["blank",['90px','50px']],
                            ["column", [
                                ["row", [
                                    ["display-text","<i>Role</i><br><text style='color:lime'>Human</text>"],
                                    "blank",
                                    "blank",
                                    ["display-text","<i>Type</i><br><text style='color:grey'>Light Weapon</text>"],
                                    "blank",
                                    "blank",
                                    "blank",
                                    "blank",
                                    ["display-text","<i>Description</i><br><bat>Batters Up!</bat>"],
                                    
                                ]],
                                "h-line",
                                ["infobox","lore"],
                                ["display-text",`
                                    The Bat is the most common and easiest weapon to obtain for all Players.
                                    <br>It is located in the Main Lobby or in the.
                                    <br> Due to its accessibility, it poses as a great weapon against the Experiments; making quick work of them when used by several players.
                                    <br>The Bat can be purchased for 10 coins at the Showork Shop, or 15 coins at the Crystal Containment Spawn.`
                                ],   
                            ],
                                
                            ],
                            ["blank",['30px','50px']]]
                        ],
                    ],
                buttonStyle() { return { 'background': 'linear-gradient(to right, grey 20%, white 80%', 'color':'black'} },
                style() {return { 'background' : 'rgba(0,0,0,0.6)'}}, 
            },
            "Bat_GalleryStatPage": {
                content: [
                    ],
                buttonStyle() { return { 'background': 'linear-gradient(to left, grey 20%, white 80%', 'color':'black'} },
                style() {return { 'background' : 'rgba(0,0,0,0.6)'}}, 
            },
        },

    },


    tabFormat: {
        "Staff": { 
            content: [
            ["display-text",
                function () { return "Staff & Developer Subpage" },
                {}],
            ],
            buttonStyle() { return { 'background': 'orange', 'color':'black'} },
        },

        "Experiments": { 
            content: [
            ["display-text",
                function () { return "Experiment Subpage" },
                {}],
            ],
            buttonStyle() { return { 'background': 'orange', 'color':'black'} },
        },
        "Main/Home": { 
            content: [
            ["display-text",
                function () { return "Home Base Subpage" },
                {}],
            ],
            buttonStyle() { return { 'background': 'linear-gradient(to right,orange 33%, red 66%)', 'color': 'black', 'box-shadow': '2px 2px 2px yellow' } },
        },
        "Weapons": { 
            content: [
            ["display-text",
                function () { return "Weapon Subpage" },
                {}],
            "blank",
            "blank",
            "blank",
            ["microtabs", "Contents"]

            ],
            buttonStyle() { return { 'background': 'red', 'color':'black'} },
        },
        "Areas": { 
            content: [
            ["display-text",
                function () { return "Area Subpage" },
                {}],
            ],
            
            buttonStyle() { return { 'background': 'red', 'color':'black'} },
        },
    },




















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