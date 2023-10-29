let modInfo = {
	name: "The Experimental Tree",
	id: "experiments",
	author: "Ozvali",
	pointsName: "infects",
	modFiles: ["layers/a.js", "layers/E.js", "layers/c.js", "layers/F.js", "tree.js"],

	discordName: "E205 Discord Server",
	discordLink: "https://discord.gg/experiment-205",
	initialStartPoints: new Decimal (5), // Used for hard resets and new players
	offlineLimit: 5,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.1.6",
	name: "New Experiments",
}

let changelog = `<h1>Changelog:</h1><br><br>
		<h3>v0.1.6: New Experiments</h3><br>
			- Added 3 Experiment Upgrades<br>
			- Added an Effect Buff to Experiments<br>
			- Added 2 Crystal Upgrades<br>
			- Added 1 Fusion Upgrade<br>
			- Fixed Upgrades being Visible Again<br>
			- Fixed minor inflation at 'Aida'<br><br>

		<h3>v0.1.5: Experimental Growth</h3><br>
			- Added 6 Upgrades in Crystals<br>
			- Added 4 Upgrades in Experiments (E)<br>
			- Added Softcaps to the first three upgrades in Crystals<br>
			- Fixed Upgrades appearing and not being hidden.<br>
			- Fixed Layers not being Hidden & not in the correct row.<br>
			- Endgame: 1e22 Infects<br><br>

		<h3>v0.1.4: Experiments are forming</h3><br>
			- Added 2 Upgrades in Crystals<br>
			- Added 2 Updates in Experiments (E)<br>
			- Balanced 2 Updates in Crystals<br><br>

		<h3>v0.1.3: New Layers?</h3><br>
			- Added 1 more Upgrade in Crystals<br>
			- Added Experiments (E)<br>
			- Added Fusions (F)<br>
			- Added 3 Experiment Upgrades<br>
			- Added 3 Fusions Upgrades<br><br>

		<h3>v0.1.2 Crystals Reunited</h3><br>
			- Added 2 New Rows of Upgrades <br>
			- Endgame: 10,000,000 Infects<br><br>

		<h3>v0.1.1 The Facility</h3><br>
			- Added 3 Upgrades <br>
			- Added some...lore.<br>
			- Endgame: None Currently<br><br>

        <h2>v0.1 Crystals</h2><br>
	        - Added 2 Upgrades <br>
	        - Added the first layer, Crystals.<br>
	        - Endgame: None.<br>`

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
	if (hasUpgrade('c', 11)) gain = gain.times(upgradeEffect('c', 11))
    if (hasUpgrade('c', 12)) gain = gain.times(upgradeEffect('c', 12))
	if (hasUpgrade('c', 13)) gain = gain.times(upgradeEffect('c', 13))
	if (hasUpgrade('c', 14)) gain = gain.times(3)
	if (hasUpgrade('c', 15)) gain = gain.times(4.5)
	if (hasUpgrade('c', 21)) gain = gain.times(3.5)
	if (hasUpgrade('c', 22)) gain = gain.times(upgradeEffect('c',22))
	if (hasUpgrade('c', 23)) gain = gain.times(upgradeEffect('c',23))
	if (hasUpgrade('c', 24)) gain = gain.times(upgradeEffect('c',24))
	if (hasUpgrade('c', 25)) gain = gain.times(6.5)
	if (hasUpgrade('c', 31)) gain = gain.times(5)
	if (hasUpgrade('c', 32)) gain = gain.times(upgradeEffect('c',32))
	if (hasUpgrade('c', 33)) gain = gain.times(upgradeEffect('c',33))
	if (hasUpgrade('E', 11)) gain = gain.times(9.5)
	if (hasUpgrade('E', 12)) gain = gain.times(13)
	if (hasUpgrade('E', 13)) gain = gain.times(3)
	if (hasUpgrade('E', 14)) gain = gain.times(5)
	if (hasUpgrade('E', 15)) gain = gain.times(6.5)
	if (hasUpgrade('E', 21)) gain = gain.times(4)
	if (hasUpgrade('E', 24)) gain = gain.times(upgradeEffect('E',24))
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
	"Endgame: 1e22 Infects"
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal(1e22))
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
