

let modInfo = {
  name: `The clock is ticking...`,
  id: "clock",
  author: "vali (snor mimi)",
  pointsName: "money",
  modFiles: ["tree.js"],
  discordName: "",
  discordLink: "",
  initialStartPoints: new Decimal(0), // Used for hard resets and new players
  offlineLimit: 0,  // In hours
  changelogfound: false,
}

// Set your version in num and name
let VERSION = {
  num: "0.0.1.1",
  ver: "Changelog",
  name: "Nothing",
}

let changelog = `<power><h2>Secret Place...</h2></power><br>
  How... How did you even find this!?<br><br>...<br><br>You deserve something for finding this I guess...<br><br>...<br><br>
  <vali>Here's a music player :)</vali><br> - The Founder of the Facility<br><br><br>`
let winText = `You've started to make vaccines? Start to make the cure...`

function changeLog(x) {
  return modInfo.changelogfound = x
}

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

  let gain = new Decimal(0)
  return gain
}
const currentDate = new Date();
const maintime = currentDate.getTime();
const Jandate = new Date("2025-01-01T00:00:00.000-05:00");
const Febtime = new Date("2025-02-01T00:00:00.000-05:00").getTime();
const Foolstime = new Date("2025-09-01T00:00:00.000-05:00").getTime();
const Jantime = Jandate.getTime();
const date = currentDate.toLocaleDateString();
const year = currentDate.getFullYear();
const month2 = currentDate.getMonth();
const day = currentDate.getDate();

const countDownDate = new Date("2025-09-01T00:00:00.000-05:00").getTime()
const countDownDate2 = new Date("2025-05-29T00:00:00.000-05:00").getTime()
// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() {
  return {
  }
}

// Display extra things at the top of the page


// Determines when the game "ends"
function isEndgame() {
  return player.points.gte("1e5000")
}

function convertToB16(n) {
  let codes = {
    0: "0",
    1: "1",
    2: "2",
    3: "3",
    4: "4",
    5: "5",
    6: "6",
    7: "7",
    8: "8",
    9: "9",
    10: "A",
    11: "B",
    12: "C",
    13: "D",
    14: "E",
    15: "F",
  }
  let x = n % 16
  return codes[(n - x) / 16] + codes[x]
}
function getUndulatingColor(period = Math.sqrt(760)) {
  let t = new Date().getTime()
  let a = Math.sin(t / 1e3 / period * 2 * Math.PI + 0)
  let b = Math.sin(t / 1e3 / period * 2 * Math.PI + 2)
  let c = Math.sin(t / 1e3 / period * 2 * Math.PI + 4)
  a = convertToB16(Math.floor(a * 128) + 128)
  b = convertToB16(Math.floor(b * 128) + 128)
  c = convertToB16(Math.floor(c * 128) + 128)
  return "#" + String(a) + String(b) + String(c)
}

const playlist = [
  new Audio('music/menu1.ogg'),

];
let currentSongIndex = 0;
function playNextSong() {
  music = true
  if (currentSongIndex < playlist.length) {
    playlist[currentSongIndex].play();
  } else {
    currentSongIndex = 0;
    playlist[currentSongIndex].play()
  }
}
function pauseMusic() {
  music = false
  playlist[currentSongIndex].pause()
}
function nextSong() {
  playlist[currentSongIndex].pause();
  playlist[currentSongIndex].currentTime = 0;
  if (currentSongIndex == 4) {
    currentSongIndex = 0
  } else {
    currentSongIndex++
  };
  playNextSong();
}
playlist[currentSongIndex].addEventListener('ended', function () {
  if (currentSongIndex == 4) {
    currentSongIndex = 0
  } else {
    currentSongIndex++
  };
  playNextSong();
});

let music = false

// Less important things beyond this point!
var displayThings = [
     function () { return "<br><br><br><br><br><br><br><br><br><br><br><br>" },
  // function () {
  //   let base = `<button class="longUpg can" style="color:red" onclick="playNextSong()">Start Article...</button>`
  //   if (music == true && modInfo.End == 0) base = '<button class="longUpg can" style="color:red" onclick="proceed()">Proceed...</button>'
  //   if (modInfo.End == 1) base = ''
  //   return base
  // },
  function () {
    var x = setInterval(function () {

      // Get today's date and time
      var now = new Date().getTime();

      // Find the distance between now and the count down date
      var distance = countDownDate - now;
      var specialdistance = countDownDate2 - now;

      // Time calculations for days, hours, minutes and seconds
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      var days2 = Math.floor(specialdistance / (1000 * 60 * 60 * 24));
      var hours2 = Math.floor((specialdistance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes2 = Math.floor((specialdistance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds2 = Math.floor((specialdistance % (1000 * 60)) / 1000);

      // Display the result in the element with id="demo"
      document.getElementById("anim1").innerHTML = days + "d "
      document.getElementById("anim2").innerHTML = hours + "h "
      document.getElementById("anim3").innerHTML = minutes + "m "
      document.getElementById("anim4").innerHTML = seconds + "s "
      document.getElementById('waiting').innerHTML = days2 + "d " + hours2 + "h "
        + minutes2 + "m " + seconds2 + "s" + " remaining"
        document.title = days + "d " + hours + "h "
        + minutes + "m " + seconds + "s ";

      // If the count down is finished, write some text
      if (Foolstime  <= maintime) {
        document.getElementById("anim1").innerHTML = ""
        
      }
    }, 100);
    let a = `<text style='word-spacing:1.3rem'><anim1><div id='anim1' style='font-size:38px'></div></anim1> <anim2><div id='anim2' style='font-size:38px'></div></anim2> <anim3><div id='anim3' style='font-size:38px'></div></anim3> <anim4><div id='anim4' style='font-size:38px'></div></anim4></text>`
    if (modInfo.End == 0) return a = ''
    return a
  },
  function () { return "<br><i><text style='color:#575859;font-size:9px'>We'll see you soon.</text></i><br><br>" },
  function() { 
    let x = getUndulatingColor()
		let a = colorText("b", x, "<i><text style='font-size:15px'>Every 5 Days starting from May 24th a new update on this website will occur.</text></i> ")
    return a },
  function() { return "<i><text id='waiting' style='color:#575859;font-size:13px'></text></i>"
  }
]

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const d = new Date();
let month = months[d.getMonth()];

// Style for the background, can be a function
var backgroundStyle = ("background-image: url('supernova.jpg')")

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
  return (3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion) {
}