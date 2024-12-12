

let modInfo = {
  name: `Solstice Studios`,
  id: "anothermod2",
  author: "vali (snor mimi)",
  pointsName: "money",
  modFiles: ["tree.js", "layers/newspaper.js", "layers/feburary.js"],
  discordName: "",
  discordLink: "",
  initialStartPoints: new Decimal(0), // Used for hard resets and new players
  offlineLimit: 0,  // In hours
}

// Set your version in num and name
let VERSION = {
  num: "0.0.1.1",
  ver: "Changelog",
  name: "Nothing",
}

let changelog = `<h1>Changelog:</h1><br><br>
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

  let gain = new Decimal(0)
  return gain
}
const currentDate = new Date();
const maintime = currentDate.getTime();
const Jandate = new Date("2025-01-01");
const Febtime = new Date("2025-02-01");
const Jantime = Jandate.getTime();
const date = currentDate.toLocaleDateString();
const year = currentDate.getFullYear();
const month2 = currentDate.getMonth();
const day = currentDate.getDate();
// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() {
  return {
  }
}

// Display extra things at the top of the page


// Determines when the game "ends"
function isEndgame() {
  return player.points.gte("1e5000")
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


// Less important things beyond this point!
var displayThings = [
  function () {
    let x = getUndulatingColor()
    let a = "Next Newsletter: " + colorText("b", x, "Janurary 2025")
    return a
  }
]

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const d = new Date();
let month = months[d.getMonth()];

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