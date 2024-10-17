let modInfo = {
  name: `The Facility`, // game name
  id: "spacebird", // This will run all memory on this id, so any other type of "NG" will not run this id
  author: "vali", // author data
  pointsName: "crystals", // based memory resource (Total Memory Values: 193)
  modFiles: ["tree.js", "layers/thebeginning.js", "layers/achievements.js", "layers/isotopes.js", "layers/experiments.js", "layers/weapons.js", "layers/developers.js", "layers/developerconsole.js"],
  discordName: "Solstice Studios", // Pre-setted to FoR
  discordLink: "https://discord.gg/QjceJTB8uV", // Non-Custom Link
  initialStartPoints: new Decimal(0), // Used for hard resets & Memory loss reset
  memoryLeakProt: null,
  offlineLimit: 1,  // 1 Hours of Offline Time Mode
  demoTime: new Decimal(7000), // 7,000 Seconds
  devTime: new Decimal("1e999"), // Overclocking Infinity;
}

let VERSION = {
  num: "0.1-DEMO", // Version
  ver: "Changelog", // Post-Version
  name: "Weaponizing The Facility", // Version Name Type
}

let changelog = `<h1>Changelog:</h1><br><br>
 <h5 style="opacity:0.5">Tip: Click and hold on a spoiler (White Boxes) to reveal it.</h5><br>

 <h2>v0.1: <h2 style='color:red'>Weaponizing The Facility</h2></h2><br><br>
 - Added <spoiler>Weapons</spoiler><br>
 - Improved <spoiler>Isotope Functions</spoiler><br>
 - Added several other things into content<br>
 - Added 5 Achievements<br>
 - Increased Demotime by 5x<br>
 - Fixed Several Memory Leaks<br>
 - Reduced Offline time to 1 hour<br><br>

 <h2>v0.0.3: <h2 style='color:skyblue'>Challenging Approach</h2></h2><br><br>
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
  if (hasUpgrade('SP', 11)) gain = gain.times(upgradeEffect('SP', 11))
  if (hasUpgrade('F', 13)) gain = gain.pow(1.05)
  if (hasUpgrade('SP', 13)) gain = gain.times(3.33)
  if (hasUpgrade('P', 23)) gain = gain.pow(1.035)
  if (hasMilestone('W', 11)) gain = gain.times(5)
  if (hasUpgrade('W', 11)) gain = gain.pow(1.075)
  if (hasUpgrade('W', 14)) gain = gain.times(upgradeEffect('W', 14))
  if (getBuyableAmount('V', 23).gte(1)) gain = gain.times(buyableEffect('V', 23))
  if (getBuyableAmount('P', 11).gte(1)) gain = gain.times(buyableEffect('P', 11))
  if (player.SP.unlocked) gain = gain.times(tmp.SP.generationEff)
  if (player.A.unlocked) gain = gain.times(tmp.A.effect)
  if (player.V.unlocked) gain = gain.times(tmp.V.infectEff.plus(1).pow(0.6))
  if (player.timePlayed > modInfo.demoTime) gain = gain.div(1e200) // Demo Mode is over
  if (player.Dev.hardmode == 1) gain = gain.pow(0.7)
  if (player.Dev.hardmode == 2) gain = gain.pow(0.65)
  if (player.Dev.hardmode == 3) gain = gain.pow(0.57)
  if (inChallenge("V", 11) && challengeCompletions("V", 11) == 2) gain = gain.pow(0.49)
  if (inChallenge("V", 11) && challengeCompletions("V", 11) == 1) gain = gain.pow(0.7)
  if (inChallenge("V", 11) && challengeCompletions("V", 11) == 0) gain = gain.pow(0.8)
  if (player.V.unlocked) gain = gain.pow(tmp.V.barrierBleed)
  if (inChallenge("V", 12) && player.V.blood > 1) gain = gain.div(player.V.blood).pow(3)
  return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() {
  return { devSpeed: new Decimal(1) }
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

function convertToRoman(num) {
  var roman = {
    M: 1000,
    CM: 900,
    D: 500,
    CD: 400,
    C: 100,
    XC: 90,
    L: 50,
    XL: 40,
    X: 10,
    IX: 9,
    V: 5,
    IV: 4,
    I: 1
    // This took me 3 hours to code
  };
  var str = '';

  for (var i of Object.keys(roman)) {
    var q = Math.floor(num / roman[i]);
    num -= q * roman[i];
    str += i.repeat(q);
  }

  return str;
}

function getSinRat(period = Math.sqrt(488)) {
  let t = new Date().getTime()
  let a = Math.sin(t / 1e3 / period * 2 * Math.PI + 1) + 2
  return a

}


// Display extra things at the top of the page
var displayThings = [
  function () {
    let x = player.Dev.hardmode
    let text = ''
    if (x == 1) text = "You're Currently in <text style='text-shadow: red 2.25px 2.25px 10px; color:yellow;'>Hard Mode</text><br>(^0.7 Crystal Gain Nerf)"
    if (x == 2) text = "You're Currently in <text style='text-shadow: yellow 2.25px 2.25px 10px; color:purple;'>Insane Mode</text><br>(^0.65 Crystal Gain Nerf)"
    if (x == 3) text = "You're Currently in <text style='text-shadow: white 2.25px 2.25px 10px; color:red;'>Impossible Mode</text><br>(^0.57 Crystal Gain Nerf)"
    return text
  },
  function () {
    let x = getUndulatingColor()
    let a = "<logic>Endgame</logic>: " + colorText("b", x, "Blood Moon <text style='text-shadow: orange 1.75px 1.75px 10px; color:red;'>I</text>")
    return a
  },
  function () {
    let x = player.timePlayed
    let y = modInfo.demoTime
    let a = "Demo Mode: <text style='color:skyblue'>" + formatWhole(y - x) + "</text> seconds remaining..."
    if (x > y) a = "Demo is over! Thanks for playing"
    return a
  },
  function () {
    let softs = tmp["V"].softCaps
    let a = "<text style='color:red;text-shadow: white 3.25px 2.25px 3px;'>"+ formatWhole(softs) + "</text> Softcaps Active..."
    if (softs == 1) a = "<text style='color:red;text-shadow: white 3.25px 2.25px 3px;'>"+formatWhole(softs) + "</text> Softcap Active..."
    if (softs == 0) a = ''
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
var backgroundStyle = function () {
  let backSty = { "background-image": "rgb(0, 0, 0)" }
  if (getThemeName() == "default" && player.V.underwater == false) backSty = {
    "color": "grey",
    "text-shadow": "rgb(6, 12, 20) 3px 3px 10px", 
    "background": " black", 
    "background-image": "repeating-radial-gradient(circle at center, hsla(204, 48%, 17%, 0.6), hsla(204, 48%, 17%, 0.842) 15px, transparent 0, transparent 30px)", 
    "animation": "main 240s infinite",
    "z-index": 0.5,
    "background-color": '#0f228a',
    "background-size": "32px 32px,32px 32px",
    "background-position": "" + (player.timePlayed) % 100 + "%"
  }
  if (getThemeName() == "default" && player.V.underwater == true) backSty = {
"color": "grey",
    "text-shadow": "rgb(6, 12, 20) 3px 3px 10px", 
    "background": " black", 
    "background-image": "repeating-radial-gradient(circle at center, hsla(204, 48%, 17%, 0.6), hsla(204, 48%, 17%, 0.842) 15px, transparent 0, transparent 30px)", 
    "animation": "main 240s infinite",
    "z-index": 0.5,
    "background-color": '#0f228a',
    "background-size": "32px 32px,32px 32px",
    "background-position": "" + (player.timePlayed) % 100 + "%"
  }
  if (getThemeName() == "powdery") backSty = {
    'background': 'linear-gradient(135deg, #000000 22px, #361218 22px, #361218 24px, transparent 24px, transparent 67px, #361218 67px, #361218 69px, transparent 69px),linear-gradient(45deg, #000000 22px, #361218 22px, #361218 24px, transparent 24px, transparent 67px, #361218 67px, #361218 69px, transparent 69px)0 64px',
    'background-color': 'black',
    'background-size': '64px 128px',
    "background-position": "100%" + " " + (player.timePlayed % 100) + "%" + " " + (player.timePlayed % 100) + "%"
  }
  return backSty
}

function maxTickLength() {
  return (3600)
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion) {
}
