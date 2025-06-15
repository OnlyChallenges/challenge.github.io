

let modInfo = {
  name: `The clock is ticking...`,
  id: "clock",
  author: "vali (snor mimi)",
  pointsName: "money",
  modFiles: ["tree.js", "layers/newspaper.js"],
  discordName: "",
  discordLink: "",
  initialStartPoints: new Decimal(0), // Used for hard resets and new players
  offlineLimit: 0,  // In hours
  changelogfound: false,
}

// Set your version in num and name
let VERSION = {
  num: "0.3.0-release ",
  ver: "Changelog",
  name: " @Ozvali",
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

const countDownDate = new Date("2025-09-01T00:00:00.000-04:00").getTime()
const countDownDate2 = new Date("2025-06-15T00:00:00.000-04:00").getTime()
// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() {
  return {
  }
}

// Display extra things at the top of the page



function valuecheck(x) {
  player["D"].value = new Decimal(x)
}


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
  new Audio('music/mainmusic.mp3'),
  new Audio('music/hope.mp3'),
  new Audio('music/poweroutage2.mp3'),
  new Audio('music/poweroutage_hallo.mp3'),
  new Audio('music/raymond.mp3'),
  new Audio('music/menu1.ogg'),
  new Audio('music/wrong.ogg'),
  new Audio('music/unknown.ogg'),
  new Audio('music/reality.mp3'),
];

const playlistName = [
  "FoR - Main Music Theme (33% slower)",
  "Deltarune Ch4 - With Hope Crossed On Our Hearts",
  "FoR - The Foundry Theme",
  "FoR - Power Outage Halloween Theme",
  "FoR - Raymond's Shop! Theme",
  "✺✺✺ - An Unknown Presence Theme",
  "Facility!Tale- Crystal Caves Theme",
  "Facility!Tale - Crystal Caves (Genocide) Theme",
  "FoR - The Slowdown In Development",
];

const songColors = [
  "#ff0000",
  "#6bfaf5",
  "#ba6e09",
  "#1c368c",
  "#861eba",
  "#3f3d40",
  "#8f8f8f",
  "#000000",
  "#e61c58",
];

const textColors = [
  "#fff",
  "#a39965",
  "#dce627",
  "#2fa0eb",
  "#60f558",
  "#ff0000",
  "#b81f5c",
  "#9c9c9c",
  "#994b62",
];

const nameColors = [
  "linear-gradient(90deg, #36ff36 0.5%, #36ff36 100%)",
  "linear-gradient(90deg,rgb(4, 117, 139) 15%,rgb(175, 21, 21) 100%)",
  "linear-gradient(90deg, #36ff36 0.5%, #36ff36 100%)",
  "linear-gradient(90deg, #36ff36 0.5%, #36ff36 100%)",
  "linear-gradient(90deg, #36ff36 0.5%, #36ff36 100%)",
  "linear-gradient(90deg, #36ff36 0.5%, #36ff36 100%)",
  "linear-gradient(90deg, #36ff36 0.5%, #36ff36 100%)",
  "linear-gradient(90deg, #36ff36 0.5%, #36ff36 100%)",
  "linear-gradient(90deg,rgb(152, 15, 216) 22%,rgb(218, 22, 175) 100%)",
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
  if (currentSongIndex == 8) {
    currentSongIndex = 0
  } else {
    currentSongIndex++
  };
  playNextSong();
}
playlist[currentSongIndex].addEventListener('ended', function () {
  if (currentSongIndex == 8) {
    currentSongIndex = 0
  } else {
    currentSongIndex++
  };
  playNextSong();
});

let music = false

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const d = new Date();

function concatZero(timeFrame) {
  return timeFrame < 10 ? '0'.concat(timeFrame) : timeFrame
}

setInterval(() => {
  let date = new Date()
  let d1 = date.getDate()
  let month = months[date.getMonth()];
  let sec = date.getSeconds()
  let mon = date.getMinutes()
  let hr = date.getHours()
  if (player["D"].value == 1) return 'CLOCK DISABLED'
  else document.getElementById('version3').innerHTML = ` ${month} ${d1} | ${concatZero((hr % 12) || 12)}:${concatZero(mon)}:${concatZero(sec)} ${hr >= 12 ? 'PM' : 'AM'}`
  // 24 hour time

}, 1000);
  


var Pages = "Pages: 4"



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

      if (player["D"].value == 0) {
      document.getElementById("anim1").innerHTML = days + "d "
      document.getElementById("anim2").innerHTML = hours + "h "
      document.getElementById("anim3").innerHTML = minutes + "m "
      document.getElementById("anim4").innerHTML = seconds + "s "
      document.getElementById('waiting').innerHTML = days2 + "d " + hours2 + "h "
        + minutes2 + "m " + seconds2 + "s" + " remaining"
      if (playlistName[currentSongIndex] == "✺✺✺ - An Unknown Presence Theme") document.title = "✺✺✺✺✺✺✺✺✺"
      else document.title = "FoR Page: " + VERSION.withoutName;
      }
      else ""

      // If the count down is finished, write some text
      if (Foolstime <= maintime) {
        document.getElementById("anim1").innerHTML = ""

      }
    }, 100);
    let a = `<text style='word-spacing:1.3rem'><anim1><div id='anim1' style='font-size:38px'></div></anim1> <anim2><div id='anim2' style='font-size:38px'></div></anim2> <anim3><div id='anim3' style='font-size:38px'></div></anim3> <anim4><div id='anim4' style='font-size:38px'></div></anim4></text>`
    if (modInfo.End == 0) return a = ''
    return a
  },
  function () { return `<i><text style='color:var(--None);font-size:9px'>We'll see you soon.</text></i><br>` },
  // function () {
  //   let x = getUndulatingColor()
  //   let a = colorText("b", x, "<i><text style='font-size:15px'>Every 5 Days starting from May 24th a new update on this website will occur.</text></i> ")
  //   return a
  // },
  function () {
    return "<i><text id='waiting' style='color:#575859;font-size:13px'></text></i>"
  },
  function () {
    return `<i><text style='color:#575859;font-size:9px'>Change the song until something appears here...</text></i><br>`
  }
]

// Style for the background, can be a function
var backgroundStyle = ("background-image: url('supernova.jpg')")

var CurrentSong = "Play Next Song"



var timePerLetter = 40;
var newLineCharacter = '|';
var newLineCharacter2 = '~';
var active = false;
function printOut(text) {
  for (var i = 0; i < text.length; i++) {

    setTimeout(
      function (j) {
        return function () {
          switch (text[j]) {
            case newLineCharacter:
              setTimeout($('#dialogue').append('<br>'), timePerLetter);
              active = false
              document.getElementById("dialogues").disabled = false;
              break;
            case newLineCharacter2:
              setTimeout($('#dialogue').append('<br>'), timePerLetter);
              break;
            default:
              setTimeout($('#dialogue').append(text[j]), timePerLetter);
          }
        }
      }(i),
      timePerLetter * i
    );

  }
}

function RestartDialogues() {
  player["D"].dialogue = new Decimal(0)
}

function updateText() {
  document.getElementById("music").innerHTML = playlistName[currentSongIndex]; // Music change, duh
  document.body.style.setProperty("--FoR", songColors[currentSongIndex]); // Changes Background & Text Colors
  document.body.style.setProperty("--song", nameColors[currentSongIndex]);
  document.body.style.setProperty("--None", textColors[currentSongIndex]);

  if (playlistName[currentSongIndex] == "FoR - The Slowdown In Development") document.body.style.setProperty("--DEV", `0deg`);
  else document.body.style.setProperty("--DEV", `180deg`);
  const favicon = document.getElementById("logo");
  if (playlistName[currentSongIndex] == "✺✺✺ - An Unknown Presence Theme") favicon.setAttribute("href", "img/broken_script.png"); // null
  else favicon.setAttribute("href", "img/infected.png");
}


const DialogueOneArray = [
  "5261796D6F6E643A204361727465722E2E2E20596F7520646F206B6E6F7720746861742065766572797468696E67206D61747465727320686572652E2E2E2072696768743F|",
  "4361727465723A205965616820596561682E2E2E2049206B6E6F772E2E2E|",
  "5261796D6F6E643A20496620796F75206B6E6F772E2E2E207768792064696420796F7520626F7468657220746865206578706572696D656E74732E2E2E|",
  "4361727465723A204875683F205768617420646F20796F75206D65616E20627920746861742E2E2E|",
  "5261796D6F6E643A20447564652E2E2E20596F75206B6E6F7720746861742077652068617665206120636F75706C65206D6F6E7468732066726F6D206E6F7720746F206D616B6520737572652074686520706C61636520697320636C65616E2E2E2E|",
  "4361727465723A202E2E2E592D796561682E2E2E|",
  "546F6E793A204C6F6F6B206D616E2C20646F6E277420626520736F2073747265737365642061626F75742069742E2E2E2069742773206A757374206120666577207765656B732E2E2E7C|",
  "4361727465723A20592D796F752772652072696768742E2E2E7C|",
  "546F6E793A2057652063616E2072656C617820666F722061206C6974746C65206269742E2E2E20776F6E2774206875727420616E796F6E652E|",
  "5261796D6F6E643A205468657927726520676F696E6720746F206265206174206F75722062757474732061626F75742069742E2E2E20616E6420796F75206B6E6F772069742E|",
  "546F6E793A204F6B2E2E2E204F6B2E2E2E2049742773206E6F74207468617420626967206F662061206465616C20616C72696768743F|",
  "5261796D6F6E643A2E2E2E|",
  "~The Reason the game was closed: ~This was so that the developers could take a break.~Due to 'model based issues' we were forced to close the game until we can get new models into the game.~We are trying our best to make sure that the game can be running properly.~This also gives us time to work on some new things!~The biggest one being--.~ERROR.June3rd.js missing~~You may click on the Dialogue Box again or Leave this tab to refresh the dialogues|",
]

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
  return (3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion) {
}