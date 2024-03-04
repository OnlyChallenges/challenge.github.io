let modInfo = {
	name: "Tree of Abyssal Demise",
	id: "mymod",
	author: "vali (snor mimi)",
	pointsName: "points",
	modFiles: ["tree.js", "layers/custom_test.js", "layers/achievements.js"],
	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	offlineLimit: 0,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "1.2",
	name: "Observations...",
}

let changelog = `<h1>Changelog:</h1><br><br>
<h3>v1.2: Zone 5</h3><br>
- Added Zone 5 (<obs>Observatory</obs>)<br>[Level 27 - 30~]<br>
> Added <obs>Vixtra</obs><br>
> Added <obs>Wenyi</obs><br>
> Added <obs>Deep</obs><br>
- Increased Level Cap to Level 30 (For now)<br>
- Readjusted Max Damage Pre-20<br>
- Fixed Sheild Manipluation<br>
- Added Thousands Format (Used to make it easier for myself instead of seeing a number like 139,392,139,402,130,000 or 1.4e12...<br>
- Refixed Storyline to end at Zone 4<br><br>
- [WIP] <ruins>Added An Debuff</ruins><br>
- [WIP] <ruins>Bonus Sheild Mechanics</ruins><br>
- [WIP] <ruins>Bonus Attack Damage on Critical Change Impact</ruins><br><br>
- <help> Bro I am not canonically an Avali (ongosh)</help>

 <h3>v1.1: Zone 4</h3><br>
  - Added Zone 4 (<rainbow>Garden</rainbow>)<br>[Level 19 - 26]<br>
  > Added <server>Morgan</server><br>
  > Added <server>Lovebeast</server><br>
  > Added <server>Deep</server><br>
  - Increased Level Cap to Level 26<br>
  - Refixed Attack & Heal Vectors<br>
  - Added Experiment Boost Damage<br>
  _ Readjusted Experience & Experiment Health<br>
  - Added Storyline & Experiment Log<br><br>
  - [WIP] Added 3 NPC Dialogues for Zone 4 [<ruins>...It's a secret</ruins>]<br>
  - [WIP] Experiment Coating (Sheild)<br>
  - [WIP] Weapon Critting% (2.5x Damage)<br><br>


 <h3>v1.0: Zone 3</h3><br>
  - Added Zone 3 (<server>Server Room</server>)<br>[Level 11 - 18]<br>
  > Added <rainbow>Hallow</rainbow><br>
  > Added <rainbow>Virux</rainbow><br>
  > Added <rainbow>Cyberruin</rainbow><br><br>
  - Increased the level cap to 18<br>
  - Added Attack Cooldown<br>
  - Added Secret Hug Ability<br> that will hug plasma because I want it there >:D<br><br>


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

	let gain = new Decimal(5.6)
	
 if (player.points > 2.5) gain = new Decimal (0.0001)
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
"Battling & Achievements Only :)"
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