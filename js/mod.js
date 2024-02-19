let modInfo = {
	name: "Tree of Abyssal Demise",
	id: "mymod",
	author: "vali (snor mimi)",
	pointsName: "points",
	modFiles: ["tree.js", "layers/custom_test.js", "layers/achievements.js"],
	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.0.0.0.1.3.1",
	name: "Wtf how many 0's are you adding?",
}

let changelog = `<h1>Changelog:</h1><br><br>
 <h3>v0.0.0.0.1.3: Logicality</h3><br>
  - Added 2 Urban Challenges<br>
  - Inflative Difference?<br>
  - Refixed Dust Formula<br>
  - Added <a>Logicality</a> for Urban Challenge Two Key<br>
  <red> Evkzg's ltpyjg g ajozb mmy cl xgoatx gy hnqu wzzeb.</red><br>
  <red> Dcsmvixml qzqomvy hqej noaag idancd huecroa rmffymnf</red><br>
  <red> Hqej jca jg tsm hlp hu kjayox fzk zpg wzzeb hcxsu?</red><br>
  <red> Oc ikc jca oqiyo mm ms zpg oym pfz'g mwknr bh dlwr bjex iej...</red><br><br>


 <h3>v0.0.0.0.1.2a: Multipuzzle</h3><br>
  - Refixed 3 Dust Challenges<br>
  - Adjusted funcMat2 & added funcMat3<br>
  - Added Reality Key to Urbans<br>
  - Removed False Positivity<br>
  <red>Rsljt ix lz zmrh yftuy ps yfp ajjtm.</red><br>
  <red>Mysq noz alu kte yfp ywplnrj.</red><br>
  <red>Jsc yts dogl stkpvft tmc eymt lnesa ac tmc ohq?</red><br>
  <red>Dr fpp fgj osjj jseagjp vx cilfe pf ihj blyc?</red><br><br>
  
 <h3>v0.0.0.0.1.2:</h3><br>
  - Unknown Fate<br>
  - Urban Re-side Effects (Refix Boost of U-12 by 0.2)<br>
  - Another Medium in D-17<br>
  - Reduce FuncMet2 Formula Effect<br>
  - Dust Base is increased by 0.07<br>
  - <red>Understanding</red> <a>false</a> <red>positives</red> <a>in</a> <red>the</red> <a>community</a><red>.</red><br><br>

 <h3>v0.0.0.0.1.1:</h3><br>
  - Companic Distress<br>
  - Added FuncMet1 & FuncMet2 for Dust & Urbans<br>
  - Changed Refunc1 > chalLookSubj<br>
  - Fixed log³(points) formula to have a low-cap of 0.01/s<br>
  - Resubjectated 20 Challenges<br>
  - <red> You will never understand...</red> <a>will you?</a><br><br>
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

	let gain = new Decimal(2.3)
	
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