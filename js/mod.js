let modInfo = {
	name: "The ??? Tree",
	id: "mymod",
	author: "nobody",
	pointsName: "points",
	modFiles: ["layers/challenge.js","layers/achievements.js","layers/thenextevent.js","layers/urban.js", "tree.js"],
	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (1), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.0.0.0.1.3",
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
	if (hasChallenge('d', 15)) gain = gain.times(challengeEffect('d', 17))
	if (hasChallenge('d', 18)) gain = gain.times(challengeEffect('d', 18))
	if (hasChallenge('d', 19)) gain = gain.times(challengeEffect('d', 19))
	if (hasChallenge('u', 11)) gain = gain.times(50)
	if (hasChallenge('u', 12)) gain = gain.times(challengeEffect('u', 12))
 if (hasChallenge('u', 14)) gain = gain.times(challengeEffect('u', 14))
 if (hasChallenge('u', 15)) gain = gain.times(challengeEffect('u', 15))

	// Achievement Effects
	if (hasAchievement('A', 11)) gain = gain.add(2.5)
	if (hasAchievement('A', 12)) gain = gain.add(8)
	if (hasAchievement('A', 17)) gain = gain.times(50)

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
    if (inChallenge('d', 18)) gain = gain.div(new Decimal.pow(3.72, tmp.d.challengeLook).max(1))
	if (inChallenge('d', 19)) gain = gain.pow(0.7)
	if (inChallenge('u', 11)) gain = gain.pow(1.5)
	if (inChallenge('u', 12)) gain = gain.times(new Decimal.pow(2.77, tmp.u.challengeSafe).max(1))
	if (inChallenge('u', 13)) gain = gain.pow(0.7)
	if (inChallenge('u', 14)) gain = gain.times(player.u.population.max(0.0000001))
	if (inChallenge('u', 15)) gain = gain.div(player.u.population.pow(0.5).min(1e15))
	if (inChallenge('u', 16)) gain = gain.times(player.u.population.max(0.0000001))
	if (inChallenge('u', 16)) gain = gain.div(player.u.infected.pow(0.8).max(0.0001).min(1e50))
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
	function(){
		let func = ""
		if (inChallenge('u', 14)) func = "<rainbow><sideline>Your</sideline> Population is Infected!</rainbow>"
		if (inChallenge('u', 14) && player.u.population.lte(0.1)) func = "<rainbow>Your Population is Infected!</rainbow><br><fail>You have failed to complete the challenge; restart the challenge to try again</fail>"
		if (inChallenge('u', 15)) func = "<rainbow>Your Population is Exploding</rainbow>"
		if (inChallenge('u', 15) && player.u.population.gte(1e10)) func = "<logic>Your Population is Infected!</logic><br><fail>You have failed to complete the challenge; restart the challenge to try again</fail>"
		if (inChallenge('u', 16)) func = "<logic>Infectious Outbreak!</logic>"
		if (inChallenge('u', 16) && player.u.population.lte(0.1)) func = "<logic>Infectious Outbreak!</logic><br><fail>You have failed to complete the challenge; restart the challenge to try again</fail>"
		return func
	},
	function(){
		let func2 = ""
		if (inChallenge('u', 14)) func2 = "Population: <red>" + format(player.u.population) +"</red> (-<logic>1.27%</logic>/<a>tick</a>)"
		if (inChallenge('u', 15)) func2 = "Population: <red>" + format(player.u.population) +"</red> (+<logic>2.85%</logic>/<a>tick</a>)"
		if (inChallenge('u', 16)) func2 = "Population: <a>" +format(player.u.population.max(0.000001)) + "</a><br>Infected: <red>" + format(player.u.infected.min(1e50)) + "</red>"
		return func2
	
	},
	function(){
		let func3 = ""
		if (inChallenge('u', 14)) func3 = "<a>Can you save them all?</a>"
		if (inChallenge('u', 16)) func3 = "You are losing <logic>" + format(player.u.infected) +"</logic> Population every tick<br>You are also gaining <red>" + format(player.u.infected.pow(0.17)) + "</red> Infected every tick"
		if (inChallenge('u', 16) && player.u.population.lte(0.1)) func3 = "You are losing <logic>0.00</logic> Population every tick<br>You are also gaining <red>" + format(player.u.infected.pow(0.17)) + "</red> Infected every tick"
		return func3
	
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