let modInfo = {
	name: "The Normal Tree",
	id: "normal",
	author: "Ozvali",
	pointsName: "points",
	modFiles: ["layers/prestige.js","layers/layer2.js","layers/layer3.js","layers/layer4.js","layers/b_layer1.js","layers/b_layer2.js", "layers/info.js","layers/layer5.js","layers/layer6.js","layers/layer7.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (10), // Used for hard resets and new players
	offlineLimit: 0.001,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.1.1",
	name: "Normal Flattening",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v0.1.1:</h3><br>
	- Added Another Layer & Refixed 2 Milestones<br><br>
	<h3>v0.1: Normal Flattening</h3><br>
		- Added 8 Layers worth of <a>normal</a> content<br>
 - <a>Endgame: 25 Flattened Prestige Points</a><br>
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
if (hasUpgrade('eP', 14)) gain = gain.times(100)
if (player.b.unlocked) gain = gain.times(tmp.b.effect)
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
function(){
 let endgame = "<a>Endgame: 50 Golden Points Prestige Points"
return endgame
},
	function(){
		let prestiges = "Prestiges: "+ formatWhole(player.p.points)+" P"
 if (player.bP.unlocked) prestiges = "Prestiges: "+ formatWhole(player.p.points)+" P, " + formatWhole(player.bP.points)+" BP"
if (player.cP.unlocked) prestiges = "Prestiges: "+ formatWhole(player.p.points)+" P, " + formatWhole(player.bP.points)+" BP, " + formatWhole(player.cP.points)+" CP"
if (player.dP.unlocked) prestiges = "Prestiges: "+ formatWhole(player.p.points)+" P, " + formatWhole(player.bP.points)+" BP, " + formatWhole(player.cP.points)+" CP, " + formatWhole(player.dP.points)+" DP"
if (player.eP.unlocked) prestiges = "Prestiges: "+ formatWhole(player.p.points)+" P, " + formatWhole(player.bP.points)+" BP, " + formatWhole(player.cP.points)+" CP, " + formatWhole(player.dP.points)+" DP, " + formatWhole(player.eP.points)+" EP"
if (player.fP.unlocked) prestiges = "Prestiges: "+ formatWhole(player.p.points)+" P, " + formatWhole(player.bP.points)+" BP, " + formatWhole(player.cP.points)+" CP, " + formatWhole(player.dP.points)+" DP, " + formatWhole(player.eP.points)+" EP, " + formatWhole(player.fP.points)+" FP"
return prestiges
	},
	function(){
		let prestiges = ""
 if (player.gP.unlocked) prestiges = "Prestiges II: "+ formatWhole(player.gP.points)+" GP"
return prestiges
	},
 function(){
 let boosters = ""
 if (player.b.unlocked) boosters = "Boosters: "+ formatWhole(player.b.points)+" B"
 if (player.bB.unlocked) boosters = "Boosters: "+ formatWhole(player.b.points)+" B, " + formatWhole(player.bB.points)+" BB"
return boosters
},
]

// Determines when the game "ends"
function isEndgame() {
	return player.gP.points.gte(new Decimal(50))
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