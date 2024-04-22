let modInfo = {
  name: `The Powder Tree v0.2.1.1 - BETA`,
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
  num: "0.2.1.1",
  ver: "Changelog",
  name: "Secrets",
}

let changelog = `<h1>Changelog:</h1><br><br>
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
  if (hasMilestone('W', 11)) gain = gain.times(3)
  if (hasUpgrade('W', 11)) gain = gain.pow(1.075)
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

// Display extra things at the top of the page
var displayThings = [
  `<logic>Endgame: 10 Water</logic><br>Please check <rainbow>Changelog</rainbow> for update information!`
]

// Determines when the game "ends"
function isEndgame() {
  return player.W.points.gte(10)
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





// I'm currently sleeping or at school, you can talk and do what you want in vc. 
// I will be back online when the clock says 4:30 PM.

