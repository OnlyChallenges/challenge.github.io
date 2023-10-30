let modInfo = {
	name: "The Experimental Tree",
	id: "experiments",
	author: "Ozvali",
	pointsName: "infects",
	modFiles: ["layers/a.js", "layers/E.js", "layers/c.js", "layers/F.js", "layers/p.js", "tree.js"],

	discordName: "E205 Discord Server",
	discordLink: "https://discord.gg/experiment-205",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	offlineLimit: 5,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.1.9",
	name: "Passive Crystals",
}

let changelog = `<h1>Changelog:</h1><br>
		<h2>vx.y.z.a</h2><br>
		<h3>x = major update</h3><br>
		<h3>y = minor update</h3><br>
		<h3>z = very minor update</h3><br>
		<h3>a = bug/mechanic fixes</h3><br><br>

		<h3>v0.1.9: Passive Crystals</h3><br>
			- Added Total & Best to Crystals to see progres!!<br>
			- Fixed some Caps on Crystals (They aren't changing, deal with it.)<br>
			- Experiment effect has been increased (^0.22 -> ^0.28).<br>
			- Added 2 New Upgrades<br>
			- Changed 40% of Upgrade Names<br>
			- Added a new Milestone in Experiments!<br><br>

		<h3>v0.1.8.1</h3><br>
			- Decreased Infect Gain on 5 Upgrades to make the game more stable.<br>
			- Fixed base gain being overpowered.<br>
			- Changed 'Azure' - ^1.075 -> ^1.005.<br>
			- Endgame Changed to 2.66e24 Infects instead of 1.33e27 Infects. <br><br>

		<h3>v0.1.8: Experimental Push</h3><br>
			- Added 2 Experiment Upgrades.<br>
			- Changed Experiment Upgrade Effects.<br>
			- Added Experiment Upgrade Effect Base & Exp<br>
			- Readded Fusions but has 4 upgrades. (Can't reach currently)<br>
			- Fixed 'E205' Theme.<br>
			- Fixed 2 Achievements.<br>
			- Added an Achievement.<br><br>

		<h3>v0.1.7: Theme & Compression</h3><br>
			- Added 1 Crystal Upgrade.<br>
			- Changed Crystal Formula Expo (.92^ -> .85^).<br>
			- Added a Milestone in Experiments.<br>
			- Pushed Fusion Layer to e30 Infects instead of e25 Infects.<br>
			- Added a Milestone in Fusions<br>
			- Endgame: 1.33e27 Infects<br><br>

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
			- Added 2 Upgrades in Experiments (E)<br>
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

let winText = `Uh oh, you've infected too many! Thanks for playing the 1st beta!`

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
	// C Upgrades
	if (hasUpgrade('c', 11)) gain = gain.times(upgradeEffect('c', 11))
    if (hasUpgrade('c', 12)) gain = gain.times(upgradeEffect('c', 12))
	if (hasUpgrade('c', 13)) gain = gain.times(upgradeEffect('c', 13))
	if (hasUpgrade('c', 14)) gain = gain.times(3)
	if (hasUpgrade('c', 15)) gain = gain.times(4.5)
	if (hasUpgrade('c', 21)) gain = gain.times(3.5)
	if (hasUpgrade('c', 22)) gain = gain.times(upgradeEffect('c',22))
	if (hasUpgrade('c', 23)) gain = gain.times(upgradeEffect('c',23))
	if (hasUpgrade('c', 24)) gain = gain.times(upgradeEffect('c',24))
	if (hasUpgrade('c', 25)) gain = gain.times(4.2)
	if (hasUpgrade('c', 31)) gain = gain.times(2.5)
	if (hasUpgrade('c', 32)) gain = gain.times(upgradeEffect('c',32))
	if (hasUpgrade('c', 33)) gain = gain.times(upgradeEffect('c',33))
	// E Upgrades
	if (hasUpgrade('E', 11)) gain = gain.times(8.7)
	if (hasUpgrade('E', 12)) gain = gain.times(10)
	if (hasUpgrade('E', 14)) gain = gain.times(5)
	if (hasUpgrade('E', 15)) gain = gain.times(6.5)
	if (hasUpgrade('E', 22)) gain = gain.times(upgradeEffect('E',22))
	if (hasUpgrade('E', 24)) gain = gain.times(upgradeEffect('E',24))
	if (hasUpgrade('E', 25)) gain = gain.times(upgradeEffect('E',25))
	// F Upgrades
	if (hasUpgrade('F', 11)) gain = gain.times(50)
	if (hasUpgrade('F', 12)) gain = gain.times(33.33)
	if (hasUpgrade('F', 13)) gain = gain.times(60)
	// Layer Effects
	if (player.E.unlocked && player.E.points.gte(1)) gain = gain.times(tmp.E.effect)
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
	"Endgame: 2.66e24 Infects"
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal(2.66e24))
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
