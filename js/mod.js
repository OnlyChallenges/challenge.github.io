let modInfo = {
	name: "The Experimental Tree",
	id: "experiments",
	author: "Ozvali",
	pointsName: "infects",
	modFiles: ["layers/a.js", "layers/E.js", "layers/c.js", "layers/F.js", "layers/H.js", "tree.js"],

	discordName: "E205 Discord Server",
	discordLink: "https://discord.gg/experiment-205",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.5.1",
	name: "The First Living Soul",
}

let changelog = `<h1>Changelog:</h1><br>
		<h2>vx.y.z_a</h2><br>
		x = major update<br>
		y = minor update<br>
		z = very minor update<br>
		a = bug/mechanic fixes<br><br>

		<h2>v0.5 The First Living Soul </h2><br>
			- Changed Kill > Humans<br>
			- Added 16 Total Upgrades<br>
			- Added 3 Total Milestones<br>
			- Changed Costs, Effects, and Buffs on all Layers<br>
			- Added more Lore in Humans<br>
			- Balanced Up-to Fusions<br>
			- Experiment Milestone 5 & Experiment Challenge 3 is Balanced now<br>
			- Crystal Upgrade 55 broke, causing fixture on js<br>
			- Fixed Achievements<br>
			- Added Some Effects to Achievements<br>
			- Added Text Change to some Achievements<br>
			- Added 2 Keep Milestones<br>
			- Changed more Stuff<br>
			- Endgame: 2 Humans<br><br>

		<h3>v0.4.1 Checks, Saves, and Balancing </h3><br>
			- Added A Savebank to Pre-Fusions (ongod?)<br>
			- Added Another Experiment Milestone to help with the During-Fusion Upgrades<br>
			- Breaking News: Experiment Milestone 13 was 15% E/sec and not 1% E/sec...<br>
			- Added Another Experiment Milestone to improve Breaking News of that Breaking News!<br>
			- Fixed 3 Upgrades having a higher Scale than the other one.<br><br>
			- v0.4.1.1:<br>
			- Changed the 'Foxnay' Upgrade a bit<br>
			- Added 2 Achievement Effects for Pre-Fusion & During-Fusion<br>
			- Fixed 2 Experiment Upgrades<br>
			- Fixed 1 Experiment Milestone<br><br>

		<h2>v0.4 Bloody Facility </h2><br>
			- Added Kills (Another Layer that will Reset Experiments & Crystals but not Fusions!)<br>
			- Changed 2 Upgrades<br>
			- Changed UI Layout<br>
			- Crystals & Experiment Layer's are balanced before Fusion<br>
			- Fusion is getting more attention. Added Lore to the Fusion Layer<br>
			- Fixed Multiple things to Balance all of the Layers<br>
			- Added 1 Crystal Upgrade<br>
			- Experiment Milestone 1 will automatically buy the next 3 hidden upgrades in Crystals (to make it easier for you :3)<br>
			- Fixed 'Experimental Brawl' & 'Immunity' to be more balanced and more of an active-playstyle.<br>
			- Endgame: 1 Kill(s)<br><br>

		<h3>v0.3.3 Someone Deadly </h3><br>
			- Added 2 Fusion Upgrades<br>
			- Changed the 3rd Experiment Challenge Formula & Effects<br>
			- Readjusted Crystals & Experiment to be more balanced Pre-Fusion<br>
			- Fixed Fusion Effect being too overpowered after 1,000 Fusions<br>
			- Fixed Fusion Effect only affecting Crystals after the 5th Upgrade in Fusions<br>
			- Added Another Layer (v0.4 Log lol)<br>
			- Nice Enough to change 'Experimental Brawl' to 1,500,000 Crystals instead of 5,000,000,000 Crystals :3<br>
			- Endgame: Completing Experiment Challenge "Entization"<br><br>


		<h3>v0.3.2 Rebalancing the Balance </h3><br>
			- Adjusted Crystal Gain by a tad bit to prevent inflation (Even though Crystals are higher than Infects).<br>
			- Added 2 Crystal Upgrades<br>
			- Added 2 Fusion Milestones<br>
			- Added 1 Experiment Challenge<br>
			- Rescaled 2 Upgrades in Crystals<br>
			- Rescaled 3 Upgrades in Experiments<br>
			- Max Offline Time is now 1 Hour instead of 5 Hours (Prevents upgrade skipping for later)<br>
		    - Endgame: 7,500 Fusions<br><br>

		<h3>v0.3.1+ Rebalances!?!</h3><br>
			- Adjusted Fusion Gain to make it actually balanced (^0.21 > ^0.111)<br>
			- Adjusted Experiment Gain by a 'small' ammount (^0.245 > ^0.23)<br>
			- Adjusted the 'Goon' Upgrade to avoid Inflation<br>
			- Fixed the 'Vixy' Upgrade showing after Fusion Reset without the required Milestone & Upgrade<br>
			- Added 2 Experiment Upgrades<br>
			- Fixed multiple formula's on Pre-Fusion Upgrades<br>
			- Fixed 3 Crystal Upgrades<br>
			- Fixed 'Fusion Crystals' Cost (250,000 Crystals [lmao] > 1e29 Crystals)<br>
			- Fixed the Newest Experiment Upgrades cost given from '5 Fusion' Milestone to be significantly lower.<br>
			- Endgame: 50 Fusions<br><br>

		<h2>v0.3 Beginning of Combinations</h2><br>
			- Added 1 Crystal Upgrade<br>
			- Added 9 Experiment Upgrades<br>
			- Readded 4 Fusion Upgrades<br>
			- Added Another Fusion Milestones<br>
			- Added 4 Achievements<br>
			- Added Fusion Effect<br>
			- Fixed Fusion Inflation<br>
			- Fixed 8 Softcaps<br>
			- Fixed 3 Challenge Breaks<br>
			- FIxed 'Keep Upgrade' Milestones<br>
			- Fixed Challenge Reward & Description Effects<br>
			- Adjusted Fusion Gain (^0.425 > ^0.21)<br>
			- Changed 13 Experiment Upgrade Effects or Names<br>
			- Endgame: Experiment Upgrade 46<br><br>

		<h3>v0.2.1.1</h3><br>
			- Fixed 'Experimental Brawl' being significantly impossible to progress (Infect /1e10 > Infect /1e6)<br>
			- Fixed 'Experimental Brawl' Milestone Disability<br>
			- Fixed Keeping Upgrades after leaving 'Experimental Brawl'<br>
			- Fixed Fusion Effect<br>
			- Fixed 2 Achievements.<br>
			- v0.2.1.1+<br>
			- Patched 'Experimental Brawl' Bug<br>
			- Fixed Keeping Row 3 Upgrades that makes 'Experimental Brawl' Start impossible to run<br>
			- Refixed Keep Row 3 Upgrades after 'Experimental Brawl' again<br><br>

		<h3>v0.2.1 Fusions are near</h3><br>
			- Added 4 Crystal Upgrades<br>
			- Added 3 Experiment Upgrades<br>
			- Added an Experiment Challenge & Milestone<br>
			- Fixed some upgrades being inflated somehow<br>
			- Balanced Crystals & Experiments<br>
			- Endgame: 2 Fusions<br><br>

		<h2>v0.2 Challenging Approach</h2><br>
			- Added 7 Experiment Upgrades<br>
			- Added 4 Crystal Upgrades<br>
			- Added 2 Experiment Challenges<br>
			- Added 2 Achievements<br>
			- Changed Experiment Base again<br>
			- Changed the 1st Challenge Requirement from 1e9 Crystals > 5e9 Crystals<br>
			- Changed Log Formula's on multiple Upgrades<br>
			- Fixed Experiment Gain Bug<br>
			- Endgame: 1e27 Infects<br><br>

		<h3>v0.1.10 Kryptox's Group</h3><br>
			- Added 2 Experiment Upgrades<br>
			- Added 3 Crystal Upgrades<br>
			- Added Softcaps, some of them with funny names.<br>
			- Changed Achievement Tooltips<br>
			- Changed some Upgrade Effects to balance infects more.<br>
			- Fixed Milestone Passive Bug<br>
			- Changed Log Formulas to make the game balanced.<br>
			- Fixed E205 Theme Again<br>
			- Endgame: 4.99e25 Infects<br><br>


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
	if (hasUpgrade('c', 34)) gain = gain.times(upgradeEffect('c',34))
	if (hasUpgrade('c', 35)) gain = gain.times(upgradeEffect('c',35))
	if (hasUpgrade('c', 45)) gain = gain.times(upgradeEffect('c',45))
	if (hasUpgrade('c', 51)) gain = gain.times(upgradeEffect('c',51))
	if (hasUpgrade('c', 55)) gain = gain.times(upgradeEffect('c',55))
	// E Upgrades
	if (hasUpgrade('E', 11)) gain = gain.times(8.7)
	if (hasUpgrade('E', 12)) gain = gain.times(10)
	if (hasUpgrade('E', 14)) gain = gain.times(5)
	if (hasUpgrade('E', 15)) gain = gain.times(Math.PI)
	if (hasUpgrade('E', 16)) gain = gain.times(upgradeEffect('E',16))
	if (hasUpgrade('E', 22)) gain = gain.times(upgradeEffect('E',22))
	if (hasUpgrade('E', 24)) gain = gain.times(upgradeEffect('E',24))
	if (hasUpgrade('E', 25)) gain = gain.times(upgradeEffect('E',25))
	if (hasUpgrade('E', 31)) gain = gain.times(upgradeEffect('E',31))
	if (hasUpgrade('E', 33)) gain = gain.times(upgradeEffect('E',33))
	if (hasUpgrade('E', 35)) gain = gain.div(1.25)		
	if (hasUpgrade('E', 42)) gain = gain.times(upgradeEffect('E',42))
	if (hasUpgrade('E', 46)) gain = gain.times(1.5)	
	// F Upgrades
	if (hasUpgrade('F', 13)) gain = gain.times(60)
	// H Upgrades
	if (hasUpgrade('H', 12)) gain = gain.times(upgradeEffect('H',12))
	// Layer Effects
	if (player.E.unlocked) gain = gain.times(tmp.E.effect)
	if (player.F.unlocked) gain = gain.times(tmp.F.effect)
	if (player.H.unlocked) gain = gain.times(tmp.H.effect)
	// Challenges
	if (inChallenge('E', 11)) gain = gain.div(5e9)
	if (inChallenge('E', 12)) gain = gain.div(8e12)
	if (inChallenge('E', 21)) gain = gain.div(1e18)
	if (hasChallenge('E',11)) gain = gain.times(10)
	if (inChallenge('H', 11)) gain = gain.div(1e15)
	// Achievement Effects
	if (hasAchievement('a', 26)) gain = gain.times(2.5)
	if (hasAchievement('a', 32)) gain = gain.times(2.5)
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
	"<a>Endgame: 2 Humans</a>",
	"Fangame of Experiment-205",
	"You are on: E205-test_v.1.5"
]

// Determines when the game "ends"
function isEndgame() {
	return player.H.points.gte(2)
}


// Less important things beyond this point!
function colored(layer, text, tag='h2') { return `<${tag} style='color:${temp[layer].color};text-shadow:${temp[layer].color} 0px 0px 10px;'>${text}</${tag}>` }
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
