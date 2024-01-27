let modInfo = {
	name: "The Normal Tree",
	id: "normal",
	author: "Ozvali",
	pointsName: "points",
	modFiles: ["layers/prestige.js","layers/layer2.js","layers/layer3.js","layers/layer4.js","layers/b_layer1.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (10), // Used for hard resets and new players
	offlineLimit: 0.001,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.0",
	name: "Literally nothing",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v0.0</h3><br>
		- Normal Stuff<br>
`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(1)
	if (hasUpgrade('p', 11)) gain = gain.times(2)
	if (hasUpgrade('p', 13)) gain = gain.times(10)
if (hasMilestone('bP', 11)) gain = gain.times(3)
if (hasMilestone('dP', 12)) gain = gain.times(10)
if (player.b.unlocked) gain = gain.times(tmp.b.effect)
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
	function(){
		let prestiges = "Prestiges: "+ formatWhole(player.p.points)+" P"
 if (player.bP.unlocked) prestiges = "Prestiges: "+ formatWhole(player.p.points)+" P, " + formatWhole(player.bP.points)+" BP,"
if (player.cP.unlocked) prestiges = "Prestiges: "+ formatWhole(player.p.points)+" P, " + formatWhole(player.bP.points)+" BP, " + formatWhole(player.cP.points)+" CP"
if (player.dP.unlocked) prestiges = "Prestiges: "+ formatWhole(player.p.points)+" P, " + formatWhole(player.bP.points)+" BP, " + formatWhole(player.cP.points)+" CP, " + formatWhole(player.dP.points)+" DP"
return prestiges
	},
 function(){
 let boosters = ""
 if (player.b.unlocked) boosters = "Boosters: "+ formatWhole(player.b.points)+" B"
return boosters
},
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("e280000000"))
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}