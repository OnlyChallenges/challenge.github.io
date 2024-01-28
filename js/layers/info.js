addLayer("At", {
        startData() { return {
            unlocked: true,
        }},
        color: "#2A87cF",
        row: "side",
        tooltip: "Passives/Automation",
        tabFormat: {
            "Automation": {
                content: [
                    "blank",
                    ["display-text",
                    function() {
                      let display = ""
                      if (player.p.unlocked) display = "P Point Passive%: "+ format(tmp.p.passiveGeneration.times(100))+"%"
                      return display
                    },
                    {}],
                    "blank",
                    ["display-text",
                    function() {
                    let display = ""
                      if (player.bP.unlocked) display = "BP Point Passive%: "+ format(tmp.bP.passiveGeneration.times(100))+"%"
                      return display
                    },
                    {}],
                    "blank",
                    ["display-text",
                    function() {
                      let display = ""
                      if (player.cP.unlocked) display = "CP Point Passive%: "+ format(tmp.cP.passiveGeneration.times(100))+"%"
                      return display
                    },
                    {}],
                    "blank",
                    ["display-text",
                    function() {
                      let display = ""
                      if (player.dP.unlocked) display = "DP Point Passive%: "+ format(tmp.dP.passiveGeneration.times(100))+"%"
                      return display
                    },
                    {}],
                    "blank",
                    ["display-text",
                    function() {
                      let display = ""
                      if (player.eP.unlocked) display = "EP Point Passive%: "+ format(tmp.eP.passiveGeneration.times(100))+"%"
                      return display
                    },
                    {}],
                    "blank",
                    ["display-text",
                    function() {
                      let display = ""
                      if (player.fP.unlocked) display = "FP Point Passive%: "+ format(tmp.fP.passiveGeneration.times(100))+"%"
                      return display
                    },
                    {}],
                    "blank",
                    ],
            },
          
        },
})
