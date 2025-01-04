addLayer("D", {
    name: "D", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Janurary", // This appears on the layer's node. Default is the id with the first letter capitalized

    startData() {
        return {
            unlocked: true,
            points: new Decimal(0),
            page: new Decimal(0),
            shown: false,
        }
    },
    tooltip: "Janurary 2025 Solstice Studio Newsletter",
    tooltipLocked: "Locked until Janurary 2025<br>(It is currently <text style='color:cyan'>" + month + " " + day + "</text>,<text style='color:cyan'>" + year + "</text>)",

    layerShown() {
        let shown = player[this.layer].shown
        return shown
    },
    update(diff) {
        if (Jantime <= maintime) player[this.layer].shown = true
        else player[this.layer].shown = false
        // If the Date is Janurary 1st, 2025; set the Newsletter being opened to true, else keep the newsletter locked until Janurary 1st, 2025
        // Updates every 1/60th of a second.
    },
    nodeStyle() {
        return {
            "background": "radial-gradient(circle at bottom, rgb(66, 1, 109) 0, purple 100%)",
	        "border": "1px dashed orange",
        }
    },
    componentStyles: {
        "prestige-button": {
            background() {
                return (canReset("D")) ? "radial-gradient(#701e87, #701e87)" : "#bf8f8f"
            },
        },
    },

    tabFormat:
        function () {
            let content =

                [
                    ["display-text",
                        `
                <text style='color:orange ; font-size: 24px'>Solstice Studio Newsletter</text><br>
                <text style='color:lightgrey ; font-size: 18px'><special>Janurary 2025</special></text><br><br>
                Hey there! Welcome to the Solstice Studios <text style='color:yellow'>Newsletter</text><br>
                We'll be talking about <i>Mechanics, Concepts, Designs</i> and much more!<br>
                By <orion>Orion</orion>, <rory>Rory</rory>, <tidal>Tidal</tidal>, <plasma>Plasma</plasma>, <jj>JJ</jj>, <vali>Vali</vali><br>
                `,
                    ],
                    "blank",
                    "h-line",
                    "blank",
                    ["display-text", `
                <text style='color:red ; font-size: 24px'>Entering 2025</text><br>
                <text style='color:lightgrey ; font-size: 18px'><special>Into the Unknown</special></text><br><br>
                2025... It's been 4 years, hasn't it? It's been an emotional rollercoaster for this past year...<br>
                With the downfall of <text style='color:yellow'>E-205</text> not even releasing, to a change of ownership.<br> This year will hopefully be different as we move into the next year.<br>
                The next huge update is right around the corner, with our developers working very hard on it as new/more inspiration and talented people come up with more ideas... Seems like this game is going down a stable path!<br>
                <vali>Thank you everyone for being here. Even though we've had a struggle through the process. We're striving for a fun development experience while getting to see yours and our favorite experiments be shown off!
                Thank you for even trying out our funny little project. It really keeps us going!</vali><br>
                <plasma> Love all of y'all <3</plasma><br>
                <img src='img/water.png', style='height: 280px ; width 400px'></img><br>
                `],
                    "blank",
                    "h-line",
                    "blank",
                    ["clickable", 12]];

            if (player["D"].page == 1) content = [
                "blank",
                "h-line",
                "blank",
                ["display-text", `
                <text style='font-size: 24px'><water>New Mechanics</water></text><br>
                <text style='color:lightgrey ; font-size: 18px'><special>Always wanted to help each other!</special></text><br><br>
                <tidal><text style='color:cyan'>The Assist System</text> we've wanted to add this for such a long time, that it's slowly coming along!<br>We've released it during the <text style='color:orange'>Halloween Update</text> so we can beta test the feature. Came up buggy so we removed it so we can polish it much more consistantly!<br>
                We know everyone's been dying for it to come back. There's a really high and probable chance of it to be released in the next big update.</tidal><br><vali>
                There are plans to try to expand on a bias towards multiple being able to kill the same person and get rewarded for it rather than them just kill stealing it.</vali><br>
                <jj><power>Power Boxes</power> are a new thing we're planning to add towards <text style='color:yellow'>Power Outage</text> that can either end the event earlier, or to do other things in the mere future<br>
                It's a really intresting concept and we hope we can expand upon it more in later devlogs</jj><br>
                <img src='img/power.png', style='height: 280px ; width 400px'></img><br>
                <corrupt>Ventilation System</corrupt> <vali>will be in the next biggest update, adding a way to teleport to the "Main World" from the Human or Experiment's Safe zones. You heard of the new safe zones right. Well... No Barriers! My Favorite!<br>We're moving away from barriers and implimenting a new way of entering the area. <br>AFK? Just chill in there until you're ready.<br>Regeneration will no longer be disabled inside the safe zone.<br>It does take quite a while to even get back into the safe zones. To prevent trying to use them when in combat. You'll be unable to use them unless you haven't been hit within 10 seconds. I'm talking a bit too much into it, we'll explain more in devlogs</vali>
                <img src='img/vents.png', style='height: 280px ; width 400px'></img><br>
                `],
                "blank",
                "h-line",
                "blank",
                ["clickables", [1]]];


            if (player["D"].page == 2) content = [
                "blank",
                "h-line",
                "blank",
                ["display-text", `
                <text style='color:green ; font-size: 24px'>Experiment Concepts</text><br>
                <text style='color:lightgrey ; font-size: 18px'><special>Spectacular Evolution!</special></text><br><br>
                <text style='color:lime'>Health Protogen</text>,<text style='color:red'> Rage Protogen</text>,<text style='color:orange'> Unstable Protogen</text>,<text style='color:cyan'> Abyssal Protogen</text>
                <br>Designed by <rory>Rory</rory><br>
                <img src='img/protos.png', style='height: 280px ; width 600px'></img>
                <br><br>    
                <text style='color:lightblue'>Funta Redesigns Conception</text><br>Designed by <orion>Orion</orion> & <plasma>Plasma</plasma><br>
                <img src='img/funtas.png', style='height: 280px ; width 290px'></img>
                <img src='img/funtas2.png', style='height: 280px ; width 290px'></img><br><br>
                <text style='color:blue'>Luminara</text><Br>Model'd by <orion>Orion</orion><br>
                <img src='img/firefly.png', style='height: 280px ; width 290px'></img><br>
                `],
                "blank",
                "h-line",
                "blank",
                ["display-text", `
                    <text style='color:lime ; font-size: 24px'>Map Designs</text><br>
                    <text style='color:lightgrey ; font-size: 18px'><special>Once path'd as a track</special></text><br><br>
                    <text style='color:blue'>Underwater Map Design</text>
                    <br>Built/Decor'd by <plasma>Plasma</plasma> & <jj>JJ</jj><br>
                    <img src='img/water1.png', style='height: 280px ; width 200px'></img>
                    <img src='img/aqua.png', style='height: 280px ; width 200px'></img><br><br>
                    <text style='color:blue'>Spawn Area Design</text>
                    <br>Built by <plasma>Plasma</plasma><br>
                    <img src='img/humanspawn.png', style='height: 280px ; width 200px'></img>
                    <img src='img/experimentspawn.png', style='height: 280px ; width 200px'></img>
                    `],
                "blank",
                "h-line",
                "blank",
                ["clickables", [1]]];


            if (player["D"].page == 3) content = [
                "blank",
                "h-line",
                "blank",
                ["display-text",
                    `
                <text style='color:orange ; font-size: 24px'>Progress on next Update</text><br>
                <text style='color:lightgrey ; font-size: 16px'><special>Stable</special></text><br>
                <img src='img/newsletter.png', style='height: 280px ; width 400px'></img><br>
                <vali>Currently, it's smooth sailing! With</vali> <plasma>Plasma</plasma> <vali>&</vali> <orion>Orion</orion> <vali>finishing up the final touches on<br>their amazing experiments! Might get "Prickly" they've been saying...</vali><br>
                <plasma>I added my snail boi, I believe we're doing alright :3</plasma><br><rory>Hey! Let me chime in here! Y'all seen Thorn?! They're a Chupacabra ^-^</rory><br>
                <img src='img/thorn.png', style='height: 280px ; width 400px'></img><br><br><br>
                `,
                ],
                "blank",
                "h-line",
                "blank",
                ["display-text",
                    `
                <vali>Thank you for checking out this Newsletter, I hope you got to see some intresting things!<br>If not, maybe next time!</vali><br>

                <text style='font-size: 24px'><server>Happy New Year!</server></text>
                `,
                ],
                "blank",
                "h-line",
                "blank",
                ["clickables", [1]]];
                if (player["D"].page == 4) content = [
                    "blank",
                    "h-line",
                    "blank",
                    ["display-text",
                        `
                    <text style='color:orange ; font-size: 24px'>Credits</text><br>
                    Website Programming by <vali>vali</vali><br>
                    My emotional support goober: <plasma>Plasma</plasma><br>
                    My Community Manager: <power>Daizy</power><br>
                    All of my Developers.<br>
                    All of my Staff.<br>

                    Thank you for being here...<br>
                    Especially every single one of you.<br><br>

                    If you see this <text style='color:red'>Ari</text>. Thank you for even starting this project. <br>This wouldn't have happen without your decisions.<br>

                    See you for the Feburary Newsletter!
                    `,
                    ],
                    "blank",
                    "h-line",
                    "blank",
                    ["clickable", 11]]

            return content
        },



























    color: "#701e87",
    baseAmount() { return player.points },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    type: "normal",
    branches: ["F"],

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