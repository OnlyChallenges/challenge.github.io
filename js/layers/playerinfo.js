addLayer("PG", {
    startData() { return {
        unlocked: true,
    }},
    color: "#d187cF",
    row: "side",
    tooltip: "Player Gain / Layers",
    tabFormat: {
        "Prestiges": {
            content: [
                "blank",
                "blank",
                ["display-text",
                function() {
                  let display = "Prestiges & How they work:<br> Every Row there will be an (letter)P; around 26 times...or more, each new row guarantee 1 new function to the new (letter)P and will bring up new content throughout the rows."
                  return display
                },
                {}],
                "blank",
                ["display-text",
                function() {
                  let display = ""
                  if (player.p.unlocked) display = "Prestige Points (P): "+ formatWhole(player.p.points)
                  return display
                },
                {}],
                "blank",
                ["display-text",
                function() {
                let display = ""
                  if (player.bP.unlocked) display = "Buffed Prestige Points (bP): "+ formatWhole(player.bP.points)
                  return display
                },
                {}],
                "blank",
                ["display-text",
                function() {
                  let display = ""
                  if (player.cP.unlocked) display = "Community Prestige Points (cP): "+ formatWhole(player.cP.points)
                  return display
                },
                {}],
                "blank",
                ["display-text",
                function() {
                  let display = ""
                  if (player.dP.unlocked) display = "Delta Prestige Points (dP): "+ formatWhole(player.dP.points)
                  return display
                },
                {}],
                "blank",
                ["display-text",
                function() {
                  let display = ""
                  if (player.eP.unlocked) display = "Exterior Prestige Points (eP): "+ formatWhole(player.eP.points)
                  return display
                },
                {}],
                "blank",
                ["display-text",
                function() {
                  let display = ""
                  if (player.fP.unlocked) display = "Flattened Prestige Points (fP): "+ formatWhole(player.fP.points)
                  return display
                },
                {}],
                "blank",
                ["display-text",
                function() {
                  let display = ""
                  if (player.gP.unlocked) display = "Golden Prestige Points (gP): "+ formatWhole(player.gP.points)
                  return display
                },
                {}],
                "blank",
                ["display-text",
                function() {
                  let display = ""
                  if (player.hP.unlocked) display = "Happy Prestige Points (hP): "+ formatWhole(player.hP.points)
                  return display
                },
                {}],
                "blank",
                ["display-text",
                function() {
                  let display = ""
                  if (player.iP.unlocked) display = "Interest Prestige Points (iP): "+ formatWhole(player.iP.points)
                  return display
                },
                {}],
                "blank",
                ["display-text",
                function() {
                  let display = ""
                  if (player.jP.unlocked) display = "Juggling Prestige Points (jP): "+ formatWhole(player.jP.points)
                  return display
                },
                {}],
                "blank",
                ["display-text",
                function() {
                  let display = ""
                  if (player.kP.unlocked) display = "Key Prestige Points (kP): "+ formatWhole(player.kP.points)
                  return display
                },
                {}],
                "blank",
                ],
            },
            "Boosters": {
                content: [
                  "blank",
                  "blank",
                  ["display-text",
                  function() {
                    let display = "Boosters & How they work:<br> Every 2 Rows there will be an (letter)B; around 13 times...or more, each new (letter)B will boost the previous (letter)B and will become stronger and stronger for each (letter)B.<br> Also, ALL BOOSTERS WILL NOT RESET ANY PREVIOUS PROGRESS! (be happy)"
                    return display
                  },
                  {}],
                    "blank",
                    ["display-text",
                    function() {
                      let display = ""
                      if (player.b.unlocked) display = "Boosters (B): "+ formatWhole(player.b.points)
                      return display
                    },
                    {}],
                    "blank",
                    ["display-text",
                    function() {
                    let display = ""
                      if (player.bB.unlocked) display = "Buffed Boosters (bB): "+ formatWhole(player.bB.points)
                      return display
                    },
                    {}],
                    "blank",
                    ["display-text",
                    function() {
                      let display = ""
                      if (player.cB.unlocked) display = "Community Boosters (cB): "+ formatWhole(player.cB.points)
                      return display
                    },
                    {}],
                    "blank",
                    ["display-text",
                    function() {
                      let display = ""
                      if (player.dB.unlocked) display = "Delta Boosters (dB): "+ formatWhole(player.dB.points)
                      return display
                    },
                    {}],
                    "blank",
                    ],
            },
            "Generators": {
                content: [
                  "blank",
                  "blank",
                  ["display-text",
                  function() {
                    let display = "Generators & How they work:<br> Every 6 Rows there will be an (letter)G; around 4 times...or more, Each new (letter)G will have a new effect that will have another gain passively with another function each (letter)G.<br> Also, ALL GENERATORS WILL NOT RESET ANY PREVIOUS PROGRESS! (be happy)"
                    return display
                  },
                  {}],
                    "blank",
                    ["display-text",
                    function() {
                      let display = ""
                      if (player.g.unlocked) display = "Generators (G): "+ formatWhole(player.g.points)
                      return display
                    },
                    {}],
                    ["display-text",
                    function() {
                      let display = ""
                      if (player.g.unlocked) display = "Generators Power (Gp): "+ format(player.g.power) + " (Gp Effect: " + format(tmp.g.powerEff)+"x Prestige Point Gain)"
                      return display
                    },
                    {}],
                    "blank",
                ],
            },
    },
})
