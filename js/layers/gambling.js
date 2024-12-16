addLayer("D", {
    name: "D", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Game of Chance", // This appears on the layer's node. Default is the id with the first letter capitalized

    startData() {
        return {
            unlocked: true,
            correct: false,
            incorrect: false,
            points: new Decimal(0),
            number: new Decimal(50),
            highlowNum: new Decimal(0),
            simulation: new Decimal(1),
        }
    },
    tooltip: "Game of Chance",
    tooltipLocked: "Game of Chance",
    requires() {
        let requirement = new Decimal(1)
        return requirement

    },

    RollNumber(){
        player[this.layer].number = Math.floor((Math.random() * 100) + 1)
        return player[this.layer].number
    },

    RollHighOrLow(){
        player[this.layer].highlowNum = Math.floor((Math.random() * 100) + 1)
        return player[this.layer].highlowNum   
    }
    layerShown() {
        let shown = true
        return shown
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
        "Game of Chance": {
        content: [
            ["infobox", "lore"],
            ["infobox", "chances"],
            "blank",
            "blank",
            "blank",
            ["display-text", function() {return "<orion>Simulation " + simulation + "/100</orion>"}],
            ["display-text", function() {return "You need 1e10 $ to unlock the next feature}],
            ["display-text", function() {
                // This will show what the number is current from what you've gotten"
                let basetext = "High or Low? The Current Number is " + number
                if (player[this.layer].incorrect) basetext = "That is incorrect! The Hidden Number was " + highlowNum + "! Let's try again...<br>High or Low? The Current Number is " + number + "!"
                if (player[this.layer].correct) basetext = "You guessed right! The Hidden Number was " + highlowNum + "!<br>High or Low? The Current Number is " + number + "!"
                return basetext

            },],
            ["clickables", [1]],
            ],
    },
    
    },

    infoboxes: {
        lore: {
            title: "How to Play",
            body: 
            `
                You start with 100$, which you can use upon to take a <special>chance</special> of earning more, or lose some of it.<br>
                You only have <orion>100 Simulations/Tries</orion> to get as much as possible, will you take the risk?
            `,
        },
        chances: {
            title: "Chances",
            body: 
            `
                High or Low has a dependancy chance depending on the current number, and the hidden number, ranging from 1%~99%, depending on what side you choose from. It is best to go with the side that has the highest chance.<br>Jackpot is always 1% so it's luck of getting that.<br>At the end of the simulations, I will show a counter of the amount of times of each side has happened.
            `,

        }
    },











    clickables: {
        11: {
            title: "Low Number",
            display() {
                let dis = "The Hidden Number is lower than the Base Number<br>(EX: 19 < 50)"
                return dis
            },
            canClick() {
                let click = true
                return click
            },
            onClick() {
                player[this.layer].simulation++
                player[this.layer].correct = false 
                player[this.layer].incorrect = false
                RollHighOrLow()
                if (player[this.layer].highlowNum < player[this.layer].number) {(Math.floor(player.points.times(2)))},
                if (player[this.layer].highlowNum < player[this.layer].number) {(player[this.layer].correct = true)},
                if (player[this.layer].highlowNum >= player[this.layer].number) {(Math.floor(player.points.div(3)))},
                if (player[this.layer].highlowNum >= player[this.layer].number) {(player[this.layer].incorrect = true)},

                RollNumber()
                
            },
            style() { return { 'background-color': tmp[this.layer].color, } },
        },
        12: {
            title: "Jackpot!",
            display() {
                let dis = "THe Hidden Number is EXACTLY the same as the Base Number<br>(EX: 40 = 40)<br> <special>You'll lose 90% of your money if it's wrong... but get it right and you'll earn ^1.5 back!</special>"
                return dis
            }
            canClick() {
                let click = true
                return click
            },
            onClick() {
                player[this.layer].simulation++
                player[this.layer].correct = false 
                player[this.layer].incorrect = false
                RollHighOrLow()
                
                if (player[this.layer].highlowNum == player[this.layer].number) {(Math.floor(player.points.pow(1.5)))},
                if (player[this.layer].highlowNum == player[this.layer].number) {(player[this.layer].correct = true)},
                if (player[this.layer].highlowNum !== player[this.layer].number) {(Math.floor(player.points.times(0.1)))},
                if (player[this.layer].highlowNum !== player[this.layer].number) {(player[this.layer].incorrect = true)},
                // Money^1.5 boost

                RollNumber()
            }
            style() { return { 'background-color': tmp[this.layer].color}}
        }
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
    doReset(resettingLayer) {
        if (layers[resettingLayer].row > this.row) layerDataReset(this.layer);
    },
})
