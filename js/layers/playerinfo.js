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
                ["display-text",
                function() {
                  let display = ""
                  if (player.p.unlocked) display = "Prestige Points (P): "+ format(tmp.p.points)
                  return display
                },
                {}],
                "blank",
                ["display-text",
                function() {
                let display = ""
                  if (player.bP.unlocked) display = "Buffed Prestige Points (bP): "+ format(tmp.bP.points)
                  return display
                },
                {}],
                "blank",
                ["display-text",
                function() {
                  let display = ""
                  if (player.cP.unlocked) display = "Community Prestige Points (cP): "+ format(tmp.cP.points)
                  return display
                },
                {}],
                "blank",
                ["display-text",
                function() {
                  let display = ""
                  if (player.dP.unlocked) display = "Delta Prestige Points (dP): "+ format(tmp.dP.points)
                  return display
                },
                {}],
                "blank",
                ["display-text",
                function() {
                  let display = ""
                  if (player.eP.unlocked) display = "Exterior Prestige Points (eP): "+ format(tmp.eP.points)
                  return display
                },
                {}],
                "blank",
                ["display-text",
                function() {
                  let display = ""
                  if (player.fP.unlocked) display = "Flattened Prestige Points (fP): "+ format(tmp.fP.points)
                  return display
                },
                {}],
                "blank",
                ["display-text",
                function() {
                  let display = ""
                  if (player.gP.unlocked) display = "Golden Prestige Points (gP): "+ format(tmp.gP.points)
                  return display
                },
                {}],
                "blank",
                ],
            },
            "Boosters": {
                content: [
                    "blank",
                    ["display-text",
                    function() {
                      let display = ""
                      if (player.b.unlocked) display = "Boosters (B): "+ format(tmp.b.points)
                      return display
                    },
                    {}],
                    "blank",
                    ["display-text",
                    function() {
                    let display = ""
                      if (player.bB.unlocked) display = "Buffed Boosters (bB): "+ format(tmp.bB.points)
                      return display
                    },
                    {}],
                    "blank",
                    ["display-text",
                    function() {
                      let display = ""
                      if (player.cB.unlocked) display = "Community Boosters (cB): "+ format(tmp.cB.points)
                      return display
                    },
                    {}],
                    "blank",
                    ],
            },
            "Generators": {
                content: [
                    "blank",
                    ["display-text",
                    function() {
                      let display = ""
                      if (player.g.unlocked) display = "Generators (G): "+ format(tmp.g.points)
                      return display
                    },
                    {}],
                    "blank",
                ],
            },
    },
})
