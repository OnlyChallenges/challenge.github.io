let modInfo = {
  name: format(player.points) + ` particles`,
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
  num: "0.2 || Changelog",
  name: "Some Channges",
}

let changelog = `<h1>Changelog:</h1><br><br>
 <h2>v0.2: Some Changes</h2><br><br>
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
  if (hasMilestone('W', 11)) gain = gain.times(3)
  if (hasUpgrade('W', 11)) gain = gain.pow(1.075)
  if (player.SP.unlocked) gain = gain.times(tmp.SP.generationEff)
  if (player.A.unlocked) gain = gain.times(tmp.A.effect)
  return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() {
  return {
  }
}

// Display extra things at the top of the page
var displayThings = [
  `<logic>Endgame: 3 Vaccines</logic><br>:)`
]

// Determines when the game "ends"
function isEndgame() {
  return player.V.points.gte(3)
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
  return (3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion) {
}
