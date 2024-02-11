let modInfo = {
	name: "The ??? Tree",
	id: "mymod",
	author: "nobody",
	pointsName: "points",
	modFiles: ["layers/challenge.js","layers/achievements.js","layers/thenextevent.js", "tree.js"],
	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (1), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.0.0.0.1",
	name: "Wtf how many 0's are you adding?",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v0.0</h3><br>
		- Flipping nothing bruh

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
	// Has Challenge Effects
	if (hasChallenge('p', 11)) gain = gain.add(1)
	if (hasChallenge('p', 12)) gain = gain.add(3)
	if (hasChallenge('p', 13)) gain = gain.add(7)
	if (hasChallenge('p', 14)) gain = gain.times(2)
	if (hasChallenge('p', 15)) gain = gain.times(challengeEffect('p', 15))
	if (hasChallenge('p', 16)) gain = gain.times(challengeEffect('p', 16))
	if (hasChallenge('p', 17)) gain = gain.times(challengeEffect('p', 17))
	if (hasChallenge('d', 11)) gain = gain.pow(1.1)
	if (hasChallenge('d', 13)) gain = gain.times(3)
 if (hasChallenge('d', 15)) gain = gain.times(player.points.pow(0.3).add(1))
if (hasChallenge('d', 18)) gain = gain.times(player.points.pow(0.1).add(1))

	// Achievement Effects
	if (hasAchievement('A', 11)) gain = gain.add(2.5)
	if (hasAchievement('A', 12)) gain = gain.add(8)

	// In Challenge Effects
	if (inChallenge('p', 11)) gain = gain.minus(0.5)
	if (inChallenge('p', 12)) gain = gain.minus(1.4)
	if (inChallenge('p', 13)) gain = gain.div(1.2)
	if (inChallenge('p', 14)) gain = gain.div(1.7)
	if (inChallenge('p', 15)) gain = gain.log10().max(0.1)
	if (inChallenge('p', 16)) gain = gain.log10().log10().log10().max(0.01)
	if (inChallenge('p', 17)) gain = gain.pow(0.25)
	if (inChallenge('p', 18)) gain = gain.pow(0.5)
	if (inChallenge('p', 18) && player.points.gte(1.1)) gain = gain.div(player.points.log10().add(1))
	if (inChallenge('p', 19)) gain = gain.pow(0.1)
	if (inChallenge('p', 19) && player.points.gte(1.1)) gain = gain.div(player.points.log10().add(3))
	if (inChallenge('p', 19)) gain = gain.log10().max(0.36)
	if (inChallenge('d', 12)) gain = gain.div(3)
	if (inChallenge('d', 14)) gain = gain.div(player.p.points.pow(0.8).add(1))
 if (inChallenge('d', 15)) gain = gain.div(75)
 if (inChallenge('d', 15)) gain = gain.div(player.points.pow(0.08).add(1))
 if (inChallenge('d', 17)) gain = gain.div(player.p.points.pow(0.7).add(1))
        if (inChallenge('d', 18)) gain = gain.div(new Decimal.pow(3, player.d.challenges['18'].challengeLook).max(1))
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
	"My best advice is to go Single-Tab Mode"
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