let modInfo = {
  name: `The Powder Tree v0.2.2.1`,
  id: "anothermod2",
  author: "vali (snor mimi)",
  pointsName: "particles",
  modFiles: ["tree.js", "layers/custom_test.js", "layers/achievements.js", "layers/feed.js", "layers/super_powder.js", "layers/vaccine.js", "layers/water.js"],
  discordName: "",
  discordLink: "",
  initialStartPoints: new Decimal(0), // Used for hard resets and new players
  offlineLimit: 0,  // In hours
}

// Set your version in num and name
let VERSION = {
  num: "0.2.2.1",
  ver: "Changelog",
  name: "Liquidation",
}

let changelog = `<h1>Changelog:</h1><br><br>
 <h2>v0.2.2: Liquidation</h2><br>
 - Added Two Water Buyables<br>
 - Added 'Liquid' to Water to have an effect an previous generation<br>
 - Added 4 Secret Bars (Powder, Water Buyables, Points, & Super Power)<br>
 - Added One Secret Achievement<br><br>
 -> <logic>Hint</logic>: <fail>Click on a button 1,000 times to achieve this goal of hugification...</fail><br><br>
 - Added 4 Upgrades to Water<br>
 - Improved Two Upgrades in Super Powder<br>
 - Fixed Ultra Generation being too strong.<br>
 - Improved Rainbow Text Speed<br>
 - Improved Particle Gain on Powder Layer<br>
 - Imporved Three Upgrades in Feed Layer to make the game more balanced and self-paced<br>
 - Improved Super Power (Idle) & Feed (Active) to be correspond to their co-op layers<br><br>

 <rainbow>=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+</rainbow><br><br>

 <h2>v0.2.1: Secrets</h2><br>
 - Added Water<br><br>
 -> <logic>Added 2 Milestones</logic><br>
 -> <logic>Added 2 Upgrades</logic><br><br>
 - Added 3 Feed Upgrades<br>
 - Fixed Vaccination Balancing<br>
 - Fixed 2 Pre-Super Powder Upgrades<br>
 - Changed Begin Feed once again and improved past that<br>
 - Added Achievement Points & Achievement Bonus Effects<br>
 - Added 3 Secret Achievements that are given subtle hints for all three.<br><br>
 -> <logic>Hint 1</logic>: <fail>The 1st row on the 2nd row would be pretty nice of upgrades...?</fail><br>
 -> <logic>Hint 2</logic>: <fail>A secret button, under the secret area...?</fail><br>
 -> <logic>Hint 3</logic>: <fail>I hear that No H²0 and 10 powers of 25 that causes powdery blindness;<br>would bring a box of points...?</fail><br><br>
 - Improved Hover UI Again for several Upgrades & Achievements<br><br>

 <h3>v0.2.1.1</h3><br>
 - Fixed Super Powder Effect<br>
 - Fixed Vaccine Super III not giving an effect.<br>
 - Fixed Achievement Points giving no effect or was super unbalanced.<br>
 - Changed Achievement Point Formula from '1.05^AP' -> '(1.0125^AP)/???'<br><br>
 
  <rainbow>=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+</rainbow><br><br>

 <h2>v0.2: Some Changes</h2><br>
 - Added 14 Upgrades<br>
 - Improved Pre-Feed/Pre-Super Powder Formulas & Costs<br>
 - Improved Point Gain on 3 Upgrades<br>
 - Revamped Feed Costs & Differences<br><br>
 - Hovering over; will now pop out more so it's easier to read<br>
 - > Upgrades<br>
 - > Milestones<br>
 - > Achievements<br><br>
 - Added 2 Milestones<br>
 - Changed 2 Vaccine Upgrades<br>
 - Changed Super Power Effect Slightly & Power Difference to 0.4 instead of 0.22<br>
 - Changed Begin Feed route to make it a better Active-Playstyle.<br><br>

	`
let winText = `You've started to make vaccines? Start to make the cure...`

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
  if (hasUpgrade('P', 11)) gain = gain.times(1.2)
  if (hasUpgrade('P', 13)) gain = gain.times(1.45)
  if (hasUpgrade('P', 14)) gain = gain.times(upgradeEffect('P', 14))
  if (hasUpgrade('P', 15)) gain = gain.times(1.7)
  if (hasUpgrade('P', 21)) gain = gain.times(upgradeEffect('P', 21))
  if (hasUpgrade('P', 24)) gain = gain.times(upgradeEffect('P', 24))
  if (hasUpgrade('F', 24)) gain = gain.times(upgradeEffect('F', 24))
  if (hasUpgrade('F', 33)) gain = gain.times(upgradeEffect('F', 33))
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
  if (getBuyableAmount('W', 11).gte(1)) gain = gain.times(buyableEffect('W', 11))
  if (player.SP.unlocked) gain = gain.times(tmp.SP.generationEff)
  if (player.A.unlocked) gain = gain.times(tmp.A.effect)
  return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() {
  return {
  }
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


// Display extra things at the top of the page
var displayThings = [
  function () {
    let x = getUndulatingColor()
    let a = "<logic>Endgame</logic>: " + colorText("b", x, "1,000,000 Liquid")
    return a
  }
]

// Determines when the game "ends"
function isEndgame() {
  return player.W.generation.gte(1000000)
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = function(){
  let backSty = {"background-image": "linear-gradient(rgb(0, 90, 25), rgb(140, 20, 25))"}
  return backSty
}

function maxTickLength() {
  return(3600)
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion) {
}
