addLayer("D", {
    name: "D", // This is optional, only used in a few places, If absent it just uses the layer id.

    symbol() {
        if (playlistName[currentSongIndex] == "Facility!Tale - Crystal Caves (Genocide) Theme") return "May 29"
         else if (playlistName[currentSongIndex] == "FoR - Raymond's Shop! Theme") return "June 3"
         else if (playlistName[currentSongIndex] == "Deltarune Ch4 - With Hope Crossed On Our Hearts") return "June 10"
         else if (playlistName[currentSongIndex] == "FoR - The Slowdown In Development") return "June 15"
         else if (playlistName[currentSongIndex] == "Deltarune Ch4 - The Third Sanctuary" && playlist[currentSongIndex].currentTime >= 25.05) return "June 20"
         else if (playlistName[currentSongIndex] == "Vs. Kris - Open Your Heart") return "June 25"
        else return ""
        return ""
    }, // This appears on the layer's node. Default is the id with the first letter capitalized

    startData() {
        return {
            unlocked: true,
            points: new Decimal(0),
            page: new Decimal(-1),
            shown: true,
            dialogue: new Decimal(0),
            value: new Decimal(0),
        }
    },
    tooltip: "∅",
    tooltipLocked: "∅",

    layerShown() {
        let shown = player[this.layer].shown
        return shown
    },
    requires() {
        return player.points.gte(1000)
    },
    update(diff) {
        if (playlistName[currentSongIndex] == "Facility!Tale - Crystal Caves (Genocide) Theme") player[this.layer].page = 1
        else if (playlistName[currentSongIndex] == "FoR - Raymond's Shop! Theme") player[this.layer].page = 2
        else if (playlistName[currentSongIndex] == "Deltarune Ch4 - With Hope Crossed On Our Hearts") player[this.layer].page = 3
        else if (playlistName[currentSongIndex] == "FoR - The Slowdown In Development") player[this.layer].page = 4
        else if (playlistName[currentSongIndex] == "Deltarune Ch4 - The Third Sanctuary" && playlist[currentSongIndex].currentTime >= 25.05) player[this.layer].page = 5
        else if (playlistName[currentSongIndex] == "Vs. Kris - Open Your Heart") player[this.layer].page = 6
        else player[this.layer].page = 0

        darkSanctuary()
        // If the Date is Janurary 1st, 2025; set the Newsletter being opened to true, else keep the newsletter locked until Janurary 1st, 2025
        // Updates every 1/60th of a second.
    },
    nodeStyle() {
        if (playlistName[currentSongIndex] == "Facility!Tale - Crystal Caves (Genocide) Theme") return {
            "background": "radial-gradient(circle at bottom, rgba(109, 44, 1,1) 0, rgba(100,44,1,1) 100%)",
            "border": "1px dashed rgba(0,0,0,1)",
            "box-shadow": "0px 0px 0px rgba(0, 0, 0, 1)"
        }
        else if (playlistName[currentSongIndex] == "FoR - Raymond's Shop! Theme") return {
            "background": "radial-gradient(circle at bottom, rgb(69, 207, 27) 0, rgb(50, 241, 82) 100%)",
            "border": "1px dashed rgba(0,0,0,1)",
            "box-shadow": "0px 0px 0px rgba(0, 0, 0, 1)"
        }
        else if (playlistName[currentSongIndex] == "Deltarune Ch4 - With Hope Crossed On Our Hearts") return {
            "background": "radial-gradient(circle at bottom, rgb(54, 27, 207) 0, rgb(37, 6, 212) 100%)",
            "border": "1px dashed rgba(0,0,0,1)",
            "box-shadow": "0px 0px 0px rgba(0, 0, 0, 1)"
        }
        else if (playlistName[currentSongIndex] == "FoR - The Slowdown In Development") return {
            "background": "radial-gradient(circle at bottom, rgb(165, 22, 209) 0, rgb(122, 4, 146) 100%)",
            "border": "1px dashed rgba(0,0,0,1)",
            "box-shadow": "0px 0px 0px rgba(0, 0, 0, 1)"
        }
        else if (playlistName[currentSongIndex] == "Deltarune Ch4 - The Third Sanctuary" && (playlist[currentSongIndex].currentTime >= 25.05)) return {
            "background": "radial-gradient(circle at bottom, rgb(58, 181, 230) 0, rgb(25, 4, 146) 100%)",
            "border": "1px dashed rgba(0,0,0,1)",
            "box-shadow": "0px 0px 0px rgba(0, 0, 0, 1)"
        }
        else if (playlistName[currentSongIndex] == "Vs. Kris - Open Your Heart") return {
            "background": "radial-gradient(circle at bottom, rgb(80, 79, 79) 0, rgb(146, 4, 4) 100%)",
            "border": "1px dashed rgba(0,0,0,1)",
            "box-shadow": "0px 0px 0px rgba(0, 0, 0, 1)"
        }
        else return {
            "background": "radial-gradient(circle at bottom, rgba(109, 44, 1,.01) 0, rgba(100,44,1,.01) 100%)",
            "border": "1px dashed rgba(0,0,0,0.01)",
            "box-shadow": "0px 0px 0px rgba(0, 0, 0, 0.01)"
        }
    },
    componentStyles: {
        "prestige-button": {
            background() {
                return (canReset("D")) ? "radial-gradient(#701e87,rgba(112, 30, 135, 0.07))" : "#bf8f8f"
            },
        },
    },

    tabFormat:
        function () {
            let content =
                [
                ["display-text", `<i><text style='color:#575859;font-size:9px'>...</text></i><br><br>`],
                ];

            if (player["D"].page == 1) content = [
                 ["display-text",
                    `<i>May 29th, 2025 - The first sign from the Developers</i><br><i><text style='color:#575859;font-size:9px'>Written & Programmed by Ozvali.</text></i>
                `,
                ],
                "blank",
                ["display-text",
                    `<i>5468657927726520747279696E6720746F20666967757265206F7574207768617420746F20646F2E2E2E</i>
                `,
                ],

                ["display-text",
                    `<i><text style='color:#575859;font-size:9px'>It dtz ymnsp ymjd btzqi zsijwxyfsi ymj lfrj hqtxnsl?</text></i>
                `,],
                ["clickable", 11],
                "blank",
                ["raw-html", "<div id='dialogue' style='font-size:12.5px'></div>"],
            ];
            else if (player["D"].page == 2) content = [
                "blank",
                 ["display-text",
                    `<i>June 3rd, 2025 - Progression leads to Infection</i><br><i><text style='color:#575859;font-size:9px'>Written & Programmed by Ozvali.</text></i>
                `,
                ],
                "blank",
                "blank",
                ["display-text",
                    `I'll be honest here, I've barely touched the game since May 29th, probably fixing some stuff...<br> improving some things. But not alot...<br>I've been playing <i>SaR-P Minecraft w/Tidal</i> and been taking a break on the game for a little..<br> I know you want to see content updates. It'll be here SOON I promise!!<br>Just taking a break and enjoying my summer before getting hammed with reality.<br>
                     <img src='img/minecraft.png', style='height: 280px ; width: 480px'></img><br><br>
                     Huh? The text cut off in the May 29th Page? Oh! I'll tell you.<br>Shop GUI! I seriously wanted to add this for a while, and wanted to add skins towards weapons!!<br>Also hopefully fix the database bugs.. many things to do! Summer has just started! See you on the 8th!
                `,
                ],
            ];
            else if (player["D"].page == 3) content = [
                 ["display-text",
                    `<i>June 10th, 2025 - Real-life Retentions</i><br><i><text style='color:#6bfaf5'>An incredible light shines through the facility</text></i><br><i><text style='color:#575859;font-size:9px'>Written & Programmed by Ozvali.</text></i>
                `,
                ],
                "blank",
                "blank",
                ["display-text",
                    `<text style='color:#a35bf5'>My motivation is slowly becoming lost as I'm dealing with IRL Relations<br>I'm trying my best to work on the game whenever I can, even though I want to enjoy my summer..<br>It's extremely stressful to find Modelers to work on the game..<br>If you're a modeler and you see this, you can message me...<br>but that isn't really important... when will the game reopen?<br>Hopefully around September... if everything goes well<br>
                    If not... it'll be open around October with alot of content either added or near removed.<br>Trying my best here...<br></text>
                    <img src='img/anhouse.png', style='height: 360px ; width: 560px'></img><br>
                    <i><text style='color:black;font-size:12px'>~<text style='color:#a35bf5'>Ozvali's</text> & <text style='color:orange'>Tidal's</text> Room in a Group House~</text></i><br><br>
                    <text style='color:orange'>We're honestly trying to get this stuff fixed, can't really blame him for wanting time off<br>Game Development is stressful, y'all need to understand this slightly<br>He wants to add this and that, but is struggling to do so with this modeling issue in hand...<br>I'm here for him...</text><br><br><br>
                    <text style='color:pink'>Hey! Kris, It'll be alright! I promise we'll get through this together, with Ralsei with us by our side!</text><br>
                    <text style='color:#3de823'>Yeah Kris! We're here for you, no matter the pain you take, we'll be here to take it, okay?</text><br>
                    <text style='color:#a35bf5'>(* Your <text style='color:red'>SOUL</text> shines with passion and light.)<br></text>
                    <text style='color:#a35bf5'>(* You nod and smile.)<br></text>
                    <text style='color:#a35bf5'>(* You calm down and breathe.)<br></text>
                    <seeme>Can I keep this game alive...?<br><br><br></seeme>
                `,
                ],
            ];
            else if (player["D"].page == 4) content = [
                 ["display-text",
                    `<i>June 15th, 2025 - ...</i><br><i><text style='color:#575859;font-size:9px'>Written & Programmed by Ozvali.</text></i>
                `,
                ],
                "blank",
                "blank",
                ["display-text",
                    `Development isn't going so well. I'm struggling to even code with Lua. Might be a burn out on that language...<br>
                    What do I do? This is mentally challenging.<br>
                    There's only so many days within a summer that I can finish this. Am I able to even get this back open?<br>
                    Can people really play with this? Do I have to close some of the map to even... let people play?<br>
                    Why do we have to revolve around a single issue, which becomes <text style='color:yellow'>"Game Threatening"</text>.<br>
                    "Reputation", there's way too much on my shoulder. Real life is getting to me, and I want to enjoy the last moments before...<br>
                    I can't...<br>
                    ...<br>
                    I just can't...<br>
                    ...<br>
                    <text style='color:red'>Couldn't listen, could you?</text><br>
                    ...<br>
                    Only a single person would understand what that ment...<br><br>
                    June 20th will hopefully bring better news...<br>
                `,
                ],
            ];
            else if (player["D"].page == 5 && Darkness == 1) content = [
                ["display-text", `
                <text style='color:blue ; font-size: 24px'>Section 1</text><br>
                <text style='color:lightgrey ; font-size: 18px'><special>The beginning of ????</special></text><br><br>
                <text style='color:#ac1dc2'>W-whoa... there's a lot of stuff here...<br>Kris... Do you know where we should go?<br>Yeah... you're probably right... we need to find Ralsei.</text><br>
                <text style='color:red'>(* You proceed through the facility, looking for a Prince of Darkness. . .)</text><br>
                <text style='color:red'>(* You search through rooms, offices, windows, looking for them. . .)</text><br>
                <text style='color:#ac1dc2'>Where is he? I figured he would be here by now... We saw him in Castle Town not even two minutes ago!</text><br>
                <text style='color:red'>(* You hear a faint call for <text style='color:cyan'>Kris's</text> name.)</text><br>
                <text style='color:#ac1dc2'>Ralsei?! Where are you?</text><br><br>
                `],
            ];
            else if (player["D"].page == 5 && Darkness == 2) content = [
                ["display-text", `
                <text style='color:blue ; font-size: 24px'>Section 1</text><br>
                <text style='color:lightgrey ; font-size: 18px'><special>The beginning of the Facility</special></text><br><br>
                <text style='color:#ac1dc2'>W-whoa... there's a lot of stuff here...<br>Kris... Do you know where we should go?<br>Yeah... you're probably right... we need to find Ralsei.</text><br>
                <text style='color:red'>(* You proceed through the facility, looking for a Prince of Darkness. . .)</text><br>
                <text style='color:red'>(* You search through rooms, offices, windows, looking for them. . .)</text><br>
                <text style='color:#ac1dc2'>Where is he? I figured he would be here by now... We saw him in Castle Town not even two minutes ago!</text><br>
                <text style='color:red'>(* You hear a faint call for <text style='color:cyan'>Kris's</text> name.)</text><br>
                <text style='color:#ac1dc2'>Ralsei?! Where are you?</text><br><br>
                `],
                "h-line",
                "blank",
                ["display-text", `
                <text style='color:cyan ; font-size: 24px'>Section 2</text><br>
                <text style='color:lightgrey ; font-size: 18px'><special>Into the Facility</special></text><br><br>
                <text style='color:lime'>I'm over here! Near the Office area... I believe...</text><br>
                <text style='color:red'>(* You are Susie go to the Offices are discover Ralsei leaning down look at one of the vents)</text><br>
                <text style='color:#ac1dc2'>R-Ralsei...? What are you doing?</text><br>
                <text style='color:lime'>O-oh! N-nothing Susie... Well.. Doing something...<br>I saw something move inside the vents and I couldn't figure out what...</text><br>
                <text style='color:red'>(* Your hand shakes slightly, wanting to move Ralsei away from it.)</text><br>
                <text style='color:#ac1dc2'>Kris...? Are you ok? Your hand is shaking a little.</text><br>
                <text style='color:red'>(* All you could do is stand there. . .)</text><br><br>
                `],
            ];
            else if (player["D"].page == 5 && Darkness == 3) content = [
                ["display-text", `
                <text style='color:blue ; font-size: 24px'>Section 1</text><br>
                <text style='color:lightgrey ; font-size: 18px'><special>The beginning of the Facility</special></text><br><br>
                <text style='color:#ac1dc2'>W-whoa... there's a lot of stuff here...<br>Kris... Do you know where we should go?<br>Yeah... you're probably right... we need to find Ralsei.</text><br>
                <text style='color:red'>(* You proceed through the facility, looking for a Prince of Darkness. . .)</text><br>
                <text style='color:red'>(* You search through rooms, offices, windows, looking for them. . .)</text><br>
                <text style='color:#ac1dc2'>Where is he? I figured he would be here by now... We saw him in Castle Town not even two minutes ago!</text><br>
                <text style='color:red'>(* You hear a faint call for <text style='color:cyan'>Kris's</text> name.)</text><br>
                <text style='color:#ac1dc2'>Ralsei?! Where are you?</text><br><br>
                `],
                "h-line",
                "blank",
                ["display-text", `
                <text style='color:cyan ; font-size: 24px'>Section 2</text><br>
                <text style='color:lightgrey ; font-size: 18px'><special>Into the Facility</special></text><br><br>
                <text style='color:lime'>I'm over here! Near the Office area... I believe...</text><br>
                <text style='color:red'>(* You are Susie go to the Offices are discover Ralsei leaning down look at one of the vents)</text><br>
                <text style='color:#ac1dc2'>R-Ralsei...? What are you doing?</text><br>
                <text style='color:lime'>O-oh! N-nothing Susie... Well.. Doing something...<br>I saw something move inside the vents and I couldn't figure out what...</text><br>
                <text style='color:red'>(* Your hand shakes slightly, wanting to move Ralsei away from it.)</text><br>
                <text style='color:#ac1dc2'>Kris...? Are you ok? Your hand is shaking a little.</text><br>
                <text style='color:red'>(* All you could do is stand there. . .)</text><br><br>
                
                `],
                "h-line",
                "blank",
                ["display-text", `
                <text style='color:purple ; font-size: 24px'>Section 3</text><br>
                <text style='color:lightgrey ; font-size: 18px'><special>An Unknown Encounter</special></text><br><br>
                <text style='color:red'>(* You sense something coming out of the vent, you pull your baseball bat out.)</text><br>
                <text style='color:lime'>Kris...? W-What are you doing with t-that?</text><br>
                <text style='color:cyan'>(* Kris attacks the vent with the baseball bat. Something's moving!)</text><br>
                <text style='color:#ac1dc2'>W-What the?!</text><br>
                <text style='color:grey'>* Nyko appears out of the vent!</text><br>
                <text style='color:#ac1dc2'>K-Kris... W-What is that thing???</text><br>
                <text style='color:lime'>L-looks like a c-creature...? We s-should spare it...</text><br>
                <text style='color:cyan'>N-no... W-we need to <text style='color:red'>kill</text> it.</text><br>
                <text style='color:#ac1dc2'>Already ahead of you Kris...</text><br>
                `],
            ];
            else if (player["D"].page == 5 && Darkness == 4) content = [
                ["display-text", `
                <text style='color:blue ; font-size: 24px'>Section 1</text><br>
                <text style='color:lightgrey ; font-size: 18px'><special>The beginning of the Facility</special></text><br><br>
                <text style='color:#ac1dc2'>W-whoa... there's a lot of stuff here...<br>Kris... Do you know where we should go?<br>Yeah... you're probably right... we need to find Ralsei.</text><br>
                <text style='color:red'>(* You proceed through the facility, looking for a Prince of Darkness. . .)</text><br>
                <text style='color:red'>(* You search through rooms, offices, windows, looking for them. . .)</text><br>
                <text style='color:#ac1dc2'>Where is he? I figured he would be here by now... We saw him in Castle Town not even two minutes ago!</text><br>
                <text style='color:red'>(* You hear a faint call for <text style='color:cyan'>Kris's</text> name.)</text><br>
                <text style='color:#ac1dc2'>Ralsei?! Where are you?</text><br><br>
                `],
                "h-line",
                "blank",
                ["display-text", `
                <text style='color:cyan ; font-size: 24px'>Section 2</text><br>
                <text style='color:lightgrey ; font-size: 18px'><special>Into the Facility</special></text><br><br>
                <text style='color:lime'>I'm over here! Near the Office area... I believe...</text><br>
                <text style='color:red'>(* You are Susie go to the Offices are discover Ralsei leaning down look at one of the vents)</text><br>
                <text style='color:#ac1dc2'>R-Ralsei...? What are you doing?</text><br>
                <text style='color:lime'>O-oh! N-nothing Susie... Well.. Doing something...<br>I saw something move inside the vents and I couldn't figure out what...</text><br>
                <text style='color:red'>(* Your hand shakes slightly, wanting to move Ralsei away from it.)</text><br>
                <text style='color:#ac1dc2'>Kris...? Are you ok? Your hand is shaking a little.</text><br>
                <text style='color:red'>(* All you could do is stand there. . .)</text><br><br>
                
                `],
                "h-line",
                "blank",
                ["display-text", `
                <text style='color:purple ; font-size: 24px'>Section 3</text><br>
                <text style='color:lightgrey ; font-size: 18px'><special>An Unknown Encounter</special></text><br><br>
                <text style='color:red'>(* You sense something coming out of the vent, you pull your baseball bat out.)</text><br>
                <text style='color:lime'>Kris...? W-What are you doing with t-that?</text><br>
                <text style='color:cyan'>(* Kris attacks the vent with the baseball bat. Something's moving!)</text><br>
                <text style='color:#ac1dc2'>W-What the?!</text><br>
                <text style='color:grey'>* Nyko appears out of the vent!</text><br>
                <text style='color:#ac1dc2'>K-Kris... W-What is that thing???</text><br>
                <text style='color:lime'>L-looks like a c-creature...? We s-should spare it...</text><br>
                <text style='color:cyan'>N-no... W-we need to <text style='color:red'>kill</text> it.</text><br>
                <text style='color:#ac1dc2'>Already ahead of you Kris...</text><br>
                
                
                `],
                "h-line",
                "blank",
                ["display-text", `
                <text style='color:pink ; font-size: 24px'>Section 4</text><br>
                <text style='color:lightgrey ; font-size: 18px'><special>...?</special></text><br><br>
                <text style='color:red'>(* You sense a determined soul speak to you.)</text><br><br>

                Heyo! Thanks for checking back onto the website, Development... How's it going?<br>
                It's going alright. My mindset is tackling Lua again and I'm still searching for people!<br>
                I've been very motivated to do stuff recently as I'm going through a process of moving out sometime next month or the month afterwards.<br>
                Doesn't mean I won't stop sharing stuff, or showing any leaks... Hopefully<br>
                Hope everyone has a good weekend and I will talk to you shortly (or soon, either or!)<br><br>
                `],
                "blank",
            ];
            else if (player["D"].page == 6) content = [
                ["display-text", `
                ... Damn this is a disappointing 5 day wait... just for this?<br>
                Are you actually serious? I know I know...<br>
                We're all a bit curious, it'll be a bit...<br>
                But... you might be looking for something you seem to be missing on this website...<br>
                It's not on this page...</br>
                <text style='color:red'>maybe... "/secret.js" will help...?</text><br>
                Huh? Try typing that in into the search bar... keep the website link in!</br>
                `],


            ];
            return content
        },



























    color: "rgba(100,0,0,.01)",
    baseAmount() { return player.points },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    type: "normal",
    branches: ["F"],

    clickables: {
        11: {
            title() {return "<< Dialogue #" + formatWhole(player[this.layer].dialogue) + "/" + formatWhole(DialogueOneArray.length) + " >>"},
            canClick() {
                let click = true
                if (active == true) click = false
                return click
            },
            onClick() {
                let i = player[this.layer].dialogue
                if (player[this.layer].dialogue >= DialogueOneArray.length) document.getElementById('dialogue').innerHTML = ""
                if (player[this.layer].dialogue >= DialogueOneArray.length) player[this.layer].dialogue = new Decimal(0)
                printOut(DialogueOneArray[i])
                active = true
                document.getElementById("dialogues").disabled = true;
                player[this.layer].dialogue = player[this.layer].dialogue.add(1)

            },
            style() {
                return {
                    'background-color': "#49123d",
                    'width': "240px",
                }
            },
        },
        12: {
            title: "{progressDialogue_button}",
            canClick() {
                let click = true
                if (player[this.layer].page >= 4) click = false
                return click
            },
            onClick() {
                player[this.layer].page = player[this.layer].page.add(0)
            },
            style() {
                return {
                    'background-color': "#49123d",
                    'width': "240px",
                }
            },
        },
    },
})