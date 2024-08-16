let modInfo = {
  name: `The FoR Tree`,
  id: "anothermod2",
  author: "vali",
  pointsName: "crystals",
  modFiles: ["tree.js", "layers/custom_test.js", "layers/achievements.js", "layers/feed.js", "layers/super_powder.js", "layers/vaccine.js", "layers/water.js"],
  discordName: "",
  discordLink: "",
  initialStartPoints: new Decimal(0), // Used for hard resets and new players
  offlineLimit: 0,  // In hours
  demoTime: new Decimal(1200),
}
// Set your version in num and name
let VERSION = {
  num: "0.0.3-DEMO",
  ver: "Changelog",
  name: "Challenging Approach",
}

let changelog = `<h1>Changelog:</h1><br><br>
 <h5 style="opacity:0.5">Tip: Click and hold on a spoiler (White Boxes) to reveal it.</h5><br>

 <h2>v0.0.3: <h2 style='color:skyblue'>Challenging Approach</h2></h2><br><br>
 - Added Two <spoiler>Challenges past Vaccines</spoiler><br>
 - Improved <spoiler>Experiment</spoiler> information shown<br>
 - Hidden all aspects of spoilers in changelog & ingame by adding ??????<br>
 - Improved crystal gain slightly<br><br>


 <h2>v0.0.2: <h2 style='color:orange'>Isotopic Change</h2></h2><br><br>
 - Added five <spoiler>Isotope</spoiler> Upgrades<br>
 - Added Demo Mode which lasts for 1,200 Seconds<br>
 - Added <spoiler>Improved Layer 2 Mechanics</spoiler><br>
 - Renamed <spoiler>Feed to Isotopes & Super Powder to Experiments</spoiler><br>
 - Improved Pre-<spoiler>Isotope</spoiler> Formulas<br><br>

 <h2>v0.0.1: <h2 style='color:purple'>Crystalized</h2></h2><br><br>
 - Added three <spoiler>Chemical</spoiler> Upgrades<br>
 - Added <spoiler>Facility of Redemption RNG</spoiler><br>
 - Added Animated Red Dot Background depending on time<br>
 - Added <spoiler>Feed</spoiler> and <spoiler>Infection</spoiler><br>
 - Improved <text style='color:skyblue'>P-3</text> and <text style='color:skyblue'>P-7</text> Effects<br>

	`
let winText = `This concludes the demo...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints() {
  return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints() {
  return true
}

// Calculate points/sec!
function getPointGen() {
  if (!canGenPoints())
    return new Decimal(0)

  let gain = new Decimal(1.5)
  if (hasUpgrade('P', 11)) gain = gain.times(1.35)
  if (hasUpgrade('P', 13)) gain = gain.times(1.666)
  if (hasUpgrade('P', 14)) gain = gain.times(upgradeEffect('P', 14))
  if (hasUpgrade('P', 15)) gain = gain.times(1.9)
  if (hasUpgrade('P', 21)) gain = gain.times(upgradeEffect('P', 21))
  if (hasUpgrade('P', 24)) gain = gain.times(upgradeEffect('P', 24))
  if (hasUpgrade('F', 24)) gain = gain.times(upgradeEffect('F', 24))
  if (hasUpgrade('F', 33)) gain = gain.times(upgradeEffect('F', 33))
  if (hasUpgrade('SP', 23)) gain = gain.times(upgradeEffect('SP', 23))
  if (hasUpgrade('F', 11)) gain = gain.times(1.75)
  if (hasUpgrade('SP', 11)) gain = gain.times(1.5)
  if (hasUpgrade('F', 13)) gain = gain.pow(1.05)
  if (hasUpgrade('SP', 13)) gain = gain.times(2.5)
  if (hasUpgrade('V', 11)) gain = gain.times(7.5)
  if (hasUpgrade('P', 23)) gain = gain.pow(1.035)
  if (hasUpgrade('F', 34)) gain = gain.times(1.3)
  if (hasUpgrade('F', 34)) gain = gain.times(1.6)
  if (hasMilestone('W', 11)) gain = gain.times(5)
  if (hasUpgrade('W', 11)) gain = gain.pow(1.075)
  if (hasUpgrade('W', 14)) gain = gain.times(upgradeEffect('W', 14))
  if (getBuyableAmount('P', 11).gte(1)) gain = gain.times(buyableEffect('P', 11))
  if (player.SP.unlocked) gain = gain.times(tmp.SP.generationEff)
  if (player.A.unlocked) gain = gain.times(tmp.A.effect)
  if (player.timePlayed > modInfo.demoTime) gain = gain.div(1e200) // Demo Mode is over
  return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() {
  return { devSpeed : new Decimal(1)}
}

function convertToB16(n) {
  let codes = {
    0: "0",
    1: "1",
    2: "2",
    3: "3",
    4: "4",
    5: "5",
    6: "6",
    7: "7",
    8: "8",
    9: "9",
    10: "A",
    11: "B",
    12: "C",
    13: "D",
    14: "E",
    15: "F",
  }
  let x = n % 16
  return codes[(n - x) / 16] + codes[x]
}
function getUndulatingColor(period = Math.sqrt(760)) {
  let t = new Date().getTime()
  let a = Math.sin(t / 1e3 / period * 2 * Math.PI + 0)
  let b = Math.sin(t / 1e3 / period * 2 * Math.PI + 2)
  let c = Math.sin(t / 1e3 / period * 2 * Math.PI + 4)
  a = convertToB16(Math.floor(a * 128) + 128)
  b = convertToB16(Math.floor(b * 128) + 128)
  c = convertToB16(Math.floor(c * 128) + 128)
  return "#" + String(a) + String(b) + String(c)
}

function getSinRat(period = Math.sqrt(488)) {
  let t = new Date().getTime()
  let a = Math.sin(t / 1e3 / period * 2 * Math.PI + 1) + 2
  return a

}


// Display extra things at the top of the page
var displayThings = [
  function () {
    let x = getUndulatingColor()
    let a = "<logic>Endgame</logic>: " + colorText("b", x, "133 ???????")
    return a
  },
  function () {
    let x = player.timePlayed
    let y = modInfo.demoTime
    let a = "Demo Mode: <text style='color:skyblue'>" + formatWhole(y-x) + "</text> seconds remaining..."
    if (x > y) a = "Demo is over! Thanks for playing"
    return a
  },
]

// "<logic>Endgame</logic>: " + colorText("b", x, "45,000 Chemicals"

// Determines when the game "ends"
function isEndgame() {
  return player.timePlayed > modInfo.demoTime
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = function(){
  let backSty = {"background-image": "rgb(0, 0, 0)"}
    if (getThemeName() == "default") backSty = {
            "background-image":
            "linear-gradient(#000 30px,transparent 0),linear-gradient(270deg,red 1px,transparent 0)",
            "z-index" : 0.5,
            "background-size":"32px 32px,32px 32px",
            "background-position":""+(player.timePlayed)%100+"%"
      }
    if (getThemeName() == "powdery") backSty = {
        'background': 'linear-gradient(135deg, #000000 22px, #361218 22px, #361218 24px, transparent 24px, transparent 67px, #361218 67px, #361218 69px, transparent 69px),linear-gradient(45deg, #000000 22px, #361218 22px, #361218 24px, transparent 24px, transparent 67px, #361218 67px, #361218 69px, transparent 69px)0 64px',
        'background-color':'black',
        'background-size':'64px 128px',
        "background-position":"100%"+" "+(player.timePlayed%100)+"%"+" "+(player.timePlayed%100)+"%"
      }
  return backSty
}

function maxTickLength() {
  return(3600)
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion) {
}
