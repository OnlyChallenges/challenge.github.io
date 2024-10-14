let modInfo = {
<<<<<<< HEAD
<<<<<<< HEAD
	name: "The Experimental Tree",
	id: "experiments",
	author: "Ozvali",
	pointsName: "infects",
	modFiles:["layers/a.js", "layers/c.js", "layers/E.js", "layers/F.js", "layers/H.js", "layers/R.js", "layers/W.js", "layers/timeline.js", "layers/timeline_FL.js", "layers/timeline_EX.js", "layers/timeline_SL.js", "tree.js"],
	discordName: "The Modding Tree Discord Server",
	discordLink: "https://discord.com/invite/F3xveHV",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	offlineLimit: 0,  // In hours
=======
	name: "The Normal Tree",
	id: "normal",
	author: "Ozvali",
	pointsName: "points",
	modFiles: ["layers/prestige.js","layers/layer2.js","layers/layer3.js","layers/layer4.js","layers/b_layer1.js","layers/b_layer2.js", "layers/info.js","layers/layer5.js","layers/layer6.js","layers/layer7.js","layers/b_layer3.js","layers/g_layer1.js", "layers/playerinfo.js","layers/layer8.js","layers/layer9.js","layers/b_layer4.js","layers/layer10.js","layers/Ascend.js","layers/Ascend_b.js","layers/layer11.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (1), // Used for hard resets and new players
	offlineLimit: 0.001,  // In hours
>>>>>>> 9e46e8a36312723afcba7370a0f30f267d5289a7
=======
  name: "Tree of Abyssal Demise",
  id: "mymod",
  author: "vali (snor mimi)",
  pointsName: "points",
  modFiles: ["tree.js", "layers/custom_test.js", "layers/achievements.js"],
  discordName: "",
  discordLink: "",
  initialStartPoints: new Decimal(0), // Used for hard resets and new players
  offlineLimit: 0,  // In hours
>>>>>>> c64a7f351b7e4790f3d78de86f1ba72cf8a4fbe7
}

// Set your version in num and name
let VERSION = {
<<<<<<< HEAD
<<<<<<< HEAD
	num: "2.0_betatest_1",
	name: "Another World?",
}

let changelog = `<h1>Changelog:</h1><br>
		<h2>vx.y.z_a</h2><br>
		x = major update<br>
		y = minor update<br>
		z = very minor update<br>
		a = bug/mechanic fixes<br><br>
=======
	num: "0.1.4",
	name: "Ascending Normality",
}

let changelog = `<h1>Changelog:</h1><br>
 <h3>v0.1.4:</h3><br>
 - Added 2 Layers<br>
 - Added 4 Ascension Challenges<br>
 - Refixed Balancing during Ascension Pre-150<br>
 - Fixed Ascension Scaling<br>
 - Refixed some formulas<br>
 - Added Generator Scaler<br>
 - <a>Endgame: 40 Key Prestige Points</a><br><br>
 <h3>v0.1.3: Ascending Normality</h3><br>
 - Added Ascension...<br>
 - Fixed 3 Milestones<br>
 - Readjusted iP & cB slightly<br>
 - Added 3 Scalers<br>
 - <a>Endgame: 150 Ascension Points</a><br><br>
	<h3>v0.1.2:</h3><br>
	- Added 4 Layers<br>
	- Fixed playerinfo.js without bugs on opening the Node<br>
	- Fixed fP & gP slightly.<br>
	- Added Generator Upgrades for later use.<br>
	- <a>Endgame: 70 Juggling Prestige Points</a><br><br>
	<h3>v0.1.1:</h3><br>
	- Added 3 Layers (Another Type of Layer)<br>
	- Moved All 'Prestige' and 'Booster' Content to Side-Layer (Also Info about the three types)<br>
	- Fixed 4 Milestones<br>
	- Adjusted 2 Milestones<br>
	- Fixed 1st Buffed Booster giving inflated points which caused the game into heavy inflation<br>
	- <a>Endgame: 50 Golden Prestige Points</a><br><br>
	
	<h3>v0.1: Normal Flattening</h3><br>
		- Added 8 Layers worth of <a>normal</a> content<br>
 - <a>Endgame: 25 Flattened Prestige Points</a><br>
`
>>>>>>> 9e46e8a36312723afcba7370a0f30f267d5289a7

		<h1>v2.0: Another World?</h1><br>
			- Added 4 Layers<br> 
			- Added 6 Achievements<br> 
			- Added Balancing Before Timeline 1<br> 
			- Introducing Timeline 2 (Another World...)<br> 
			- Added 3 Challenges<br> 
			- Added Formula Balancing on Newer Content<br> 
			- Fixed Multiple bugs<br> 
			- Feedback is needed for slow'd gameplay...too fast gameplay...or unbalanced entirely...<br> 
			- Endgame: 1 Soul - Timeline 2<br> <br> 

		<h3>v1.1.4_stable</h3><br>
			- Added 2 Room Upgrades<br>
			- Removed Room Softcap but decreased the Room Effect significantly<br>
			- Changed Room Formula (^0.05 > ^0.046)<br>
			- Changed Weapon Formula (^0.03 > ^0.025)<br> 
			- Fixed Weapon Milestone<br>
			- Fixed 3 Crystal Upgrades<br>
			- Fixed 2 Experiment Upgrades<br>
			- Fixed 2 Room Upgrades being Inflated<br>
			- Fixed 4 Room Upgrades not giving effects<br><br>

 		<h3>v1.1.3_stable</h3><br>
   			- Added 2 Weapon Milestones<br>
   			- Pushed Crystal Upgrades on Fusion & Humans to be early.<br>
   			- Rooms will automatically make it easier to progress through Fusions & Humans.<br>
   			- Fixed CSS by a minor bit.<br>
   			- Fixed 3 Upgrades in Weapons being Faulty.<br>
			- Rebalanced Experiment Costs & Effects<br>
			-> Changed 'Snapper' and 'Somby' Effects significantly<br>
			- Reordered 5 Achievements<br>
   			- Decreased Goon Cost to make pre-fusions easier.<br>
			- Fixed a bug of Fusions that kept the 5th row of Crystal Upgrades when it isn't suppost to.<br>
			- Balanced more Crystal Upgrades.<br>
			- Made Fusion Milestone 1 require 1 Fusion instead of 2 Fusions due to progression.<br><br>

		<h3>v1.1.2_stable: Weapons, Weapons, Weapons!</h3><br>
			- Added 2 Weapon Upgrades.<br>
			- Added 1 Room Upgrade.<br>
			- Changed Milestone, Upgrades, Achievements, and Version Looks.<br>
			- Fixed Rooms becoming broken after reaching 3.<br>
			- Fixed Humans Gain Formula.<br>
			- Fixed Keep Milestones Again...<br>
			- Revamped 2 Crystal Upgrades.<br>
			- Revamped 1 Human Upgrade.<br>
			- Endgame: 8 Weapons<br><br>


		<h3>v1.1.1</h3><br>
			- Fixed Experiment Milestone 1 giving 2 Upgrades that weren't unlocked yet. (Subsited with a Upgrade.)<br>
			- Added 2 Weapon Upgrades that will make Crystal Upgrades more useful.<br>
			- Fixed Rooms breaking past the 3rd Room Upgrade<br>
			- Fixed All Fusion & Human Milestones to have the same effects.<br>
			- Humans now will not reset Crystal Upgrades if you get a Room.<br>
			- Secret Achievement has been fixed again.<br>
			- Fixed 2 Achievements giving the wrong Reward effect.<br>
			- Fixed 4 Crystal Upgrades giving faulty or weak effects. <br>
			- Thank you to a lot of players for playtesting this!<br>
			- Endgame: 7 Weapons<br><br>


		<h2>v1.1 The Battle Begins </h2><br>
			- Added Weapons.<br>
			- Added 6 Fusion Upgrades<br>
			- Added 5 Human Upgrades<br>
			- Added 3 Room Upgrades<br>
			- Added 2 Room Milestones<br>
			- Added 3 Weapon Upgrades<br>
			- Added 2 Weapon Milestones (WIP)<br>
			- Fixed 3 Upgrades not giving effects or nulling<br>
			- Fixed 5 Milestones not giving effects<br>
			- Fixed Weapons Layer Placement being on Row 3 rather than Row 2<br>
			- Fixed Multiple Bugs causing errors upon buying a certain upgrade.<br>
			- Fixed Room Gain going from 3 => 9 after buying the 3rd Room Upgrade.<br>
			- Steady Capped Room Gain<br>
			- Capped Multiple Upgrades to make the game balanced<br>
			- Achievements will be added in v1.2!<br>
			- Weapons now reset all previous layers.<br>
			- Weapons will now buff all previous layers except rooms.<br>
			- Some Weapon Upgrades will increase the game balancing making it easier to reach the Weapons Layer.<br>
			- Endgame: 4 Weapons<br><br>

		<h1>v1.0 The True Beginning </h1><br>
  			- Added Rooms.<br>
   			- Added 8 Fusion Upgrades.<br>
   			- Added 10 Human Upgrades.<br>
   			- Added 5 Human Milestones.<br>
  			- Added 3 Fusion Milestones.<br>
  			- Fixed Keeping Function.<br>
   			- Rebalanced all Functions & Formulas.<br>
   			- Rebalanced Humans going to e100 to early.<br>
  			- Changed Rooms to be Static rather than Normal to make better formulas for later.<br>
  			- Added Cos, Sine, and Ln Formulas.<br>
   			- Added 7 Achievements.<br>
   			- Fixed Multiple Bugs causing either; Crashes, incorrect formulas, or failure to keep.<br>
   			- Fixed 7 Fusion Upgrades having Custom Experiment Names.<br>
   			- Fixed 2 Fusion Upgrads having Actual Experiment Names.<br>
   			- Removed Challenges for Experiments & Humans.<br>
			- Rooms will have lore in v1.1!<br>
 			- Endgame: 1 Room<br><br>

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

let winText = `You've reached the end! Thanks for playtesting!`
=======
  num: "1.3.1",
  name: "Some more stuff",
}

let changelog = `<h1>Changelog:</h1><br><br>
<h2>v1.3.1: New Content</h2><br>
- Added Crit at Zone 4<br>
- Added Counter at Zone 4<br>
- Added Regen at Zone 6<br>
- Rebalanced XP Requirement past level 27<br>
- Fixed Attack & Defense Stats<br>
- Readjusted Shield Effects from Enemies<br>
- Added 4 Achievements<br><br>

<h3>v1.3: Zone 6</h3><br>
- Added Zone 6 (<ruins>Reality</ruins>)<br>[Level 30 - 39]<br>
> Added 3 Enemies<br>
- Fixed some Pre-L30 Bugs<br>
- Fixed Enemy Damage<br>
- Fixed Shield Protection Damage<br>
- Fixed 2 Achievements<br><br>

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
- <help> Bro I am not canonically an Avali</help><br>

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
>>>>>>> c64a7f351b7e4790f3d78de86f1ba72cf8a4fbe7

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

<<<<<<< HEAD
	let gain = new Decimal(1)
<<<<<<< HEAD
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
	if (hasUpgrade('E', 35)) gain = gain.times(1.25)		
	if (hasUpgrade('E', 42)) gain = gain.times(upgradeEffect('E',42))
	if (hasUpgrade('E', 46)) gain = gain.times(1.5)	
	// F Upgrades
	if (hasUpgrade('F', 13)) gain = gain.times(60)
	if (hasUpgrade('F', 25)) gain = gain.times(upgradeEffect('F',25))
	// H Upgrades
	if (hasUpgrade('H', 12)) gain = gain.times(upgradeEffect('H',12))
	if (hasUpgrade('H', 13)) gain = gain.times(upgradeEffect('H',13))
	if (hasUpgrade('H', 21)) gain = gain.times(upgradeEffect('H',21))
	if (hasUpgrade('H', 35)) gain = gain.times(15)
	// R Upgrades
	if (hasUpgrade('R', 16)) gain = gain.times(upgradeEffect('R', 16))
	// All Milestones
	if (hasMilestone('W', 11)) gain = gain.times(2.2)
	// Layer Effects
	if (player.E.unlocked) gain = gain.times(tmp.E.effect)
	if (player.F.unlocked) gain = gain.times(tmp.F.effect)
	if (player.H.unlocked) gain = gain.times(tmp.H.effect)
	if (player.R.unlocked) gain = gain.times(tmp.R.effect)
	if (player.W.unlocked) gain = gain.times(tmp.W.effect)
	// Achievement Effects
	if (hasAchievement('a', 26)) gain = gain.times(2.5)
	if (hasAchievement('a', 32)) gain = gain.times(2.5)
	if (hasAchievement('a', 36)) gain = gain.times(3)
	// Prevents Devspeed changes
	if (player.devSpeed>=1.01) gain = gain.div(1e300)


	// ~~~~~~~~~~~~~~~Chapter 2 - 1st Collapsed Timeline~~~~~~~~~~~~~~~~~~~~~~~


	// FL Upgrades (# Order)
	if (hasUpgrade('FL', 12)) gain = gain.times(upgradeEffect('FL', 12))
	if (hasUpgrade('FL', 21)) gain = gain.times(upgradeEffect('FL', 21))
	// EX Upgrades (# Order)
	if (hasUpgrade('EX', 11)) gain = gain.times(upgradeEffect('EX', 11))
	if (hasUpgrade('EX', 12)) gain = gain.times(upgradeEffect('EX', 12))
	if (hasUpgrade('EX', 21)) gain = gain.times(upgradeEffect('EX', 21))
	if (hasUpgrade('EX', 23)) gain = gain.times(upgradeEffect('EX', 23))

	// Milestones (# Order)
	if (hasMilestone('FL', 11)) gain = gain.times(player.points.add(1).pow(0.07))
	// Challenges (# Order)
	if (inChallenge('CT', 11)) gain = gain.div(2.5)
	if (inChallenge('CT', 12)) gain = gain.div(4)
	if (inChallenge('CT', 21)) gain = gain.div(10)
	if (hasChallenge('CT', 21)) gain = gain.times(player.FL.points.add(1).pow(0.066))
=======
	if (hasUpgrade('p', 11)) gain = gain.times(2)
	if (hasUpgrade('p', 13)) gain = gain.times(10)
if (hasMilestone('bP', 11)) gain = gain.times(3)
if (hasMilestone('dP', 12)) gain = gain.times(10)
if (hasUpgrade('eP', 14)) gain = gain.times(100)
if (player.b.unlocked) gain = gain.times(tmp.b.effect)
if (hasUpgrade('hP', 16)) gain = gain.pow(1.1)
if (hasUpgrade('Ab', 14)) gain = gain.pow(1.2)
if (hasMilestone('iP', 15)) gain = gain.times(1000000)
if (inChallenge('Ab', 11)) gain = gain.pow(0.06)
if (inChallenge('Ab', 12)) gain = gain.pow(0.001).minus(0.937)
if (inChallenge('Ab', 21)) gain = gain.pow(0.005).minus(0.877)
if (inChallenge('Ab', 21) && player.points.gte(1.5)) gain = gain.div(player.points.log10().add(1.1))
if (inChallenge('Ab', 11) && hasUpgrade('Ab', 22)) gain = gain.pow(1.3)
if (hasUpgrade('kP', 14)) gain = gain.pow(1.2)
>>>>>>> 9e46e8a36312723afcba7370a0f30f267d5289a7
	return gain
=======
  let gain = new Decimal(5.6)

  if (player.points > 2.5) gain = new Decimal(0.0001)
  return gain
>>>>>>> c64a7f351b7e4790f3d78de86f1ba72cf8a4fbe7
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() {
  return {
  }
}

// Display extra things at the top of the page
var displayThings = [
<<<<<<< HEAD
<<<<<<< HEAD
	"<a>Endgame: 1 Soul - Timeline 2</a><br>"
	
=======
function(){
 let endgame = "<a>Endgame: 40 Key Prestige Points"
return endgame
},
function(){
 let cha = ""
 if (inChallenge('Ab', 21)) cha = "Point nerf formula: /1.1+log(points)"
return cha
},
>>>>>>> 9e46e8a36312723afcba7370a0f30f267d5289a7
=======
  "Battling & Achievements Only :)"
>>>>>>> c64a7f351b7e4790f3d78de86f1ba72cf8a4fbe7
]


// Determines when the game "ends"
function isEndgame() {
<<<<<<< HEAD
<<<<<<< HEAD
	return player.SL.points.gte(1)
=======
	return player.kP.points.gte(new Decimal(40))
>>>>>>> 9e46e8a36312723afcba7370a0f30f267d5289a7
=======
  return player.points.gte(new Decimal("e280000000"))
>>>>>>> c64a7f351b7e4790f3d78de86f1ba72cf8a4fbe7
}


// Less important things beyond this point!
function colored(layer, text, tag='h2') { return `<${tag} style='color:${temp[layer].color};text-shadow:${temp[layer].color} 0px 0px 10px;'>${text}</${tag}>` }
// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
  return (3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
<<<<<<< HEAD
function fixOldSave(oldVersion){
}
=======
function fixOldSave(oldVersion) {
}
>>>>>>> c64a7f351b7e4790f3d78de86f1ba72cf8a4fbe7
