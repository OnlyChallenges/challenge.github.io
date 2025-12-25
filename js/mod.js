

let modInfo = {
  name: `The clock is ticking... yet again`,
  id: "finale",
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
  num: "0.0.0.1-release ",
  ver: "Changelog",
  name: " @Ozvali",
}

let changelog = `<power><h2>Secret Place...</h2></power><br>`
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

const countDownDate = new Date("2026-04-18T23:00:00.000-04:00").getTime()
const countDownDate2 = new Date("2025-12-06T13:30:00.000-04:00").getTime()
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
  new Audio('music/Singularity.mp3'),
  new Audio('music/hope.mp3'),
  new Audio('music/poweroutage2.mp3'),
  new Audio('music/poweroutage_hallo.mp3'),
  new Audio('music/raymond.mp3'),
  new Audio('music/menu1.ogg'),
  new Audio('music/heart.mp3'),
  new Audio('music/unknown.ogg'),
  new Audio('music/reality.mp3'),
  new Audio('music/church_zone3.ogg'),
];

const playlistName = [
  "Singularity - Rosentwig",
  "Deltarune Ch4 - With Hope Crossed On Our Hearts",
  "FoR - The Foundry Theme",
  "FoR - Power Outage Halloween Theme",
  "FoR - Raymond's Shop! Theme",
  "✺✺✺ - An Unknown Presence Theme",
  "Vs. Kris - Open Your Heart",
  "Facility!Tale - Crystal Caves (Genocide) Theme",
  "FoR - The Slowdown In Development",
  "Deltarune Ch4 - The Third Sanctuary",
];

const songColors = [
  "#1d959eff",
  "#6bfaf5",
  "#ba6e09",
  "#1c368c",
  "#861eba",
  "#3f3d40",
  "#8f8f8f",
  "#000000",
  "#e61c58",
  "#000",
];

const textColors = [
  "#7869fcff",
  "#a39965",
  "#dce627",
  "#2fa0eb",
  "#60f558",
  "#ff0000",
  "#b81f5c",
  "#9c9c9c",
  "#994b62",
  "#000",
];

const nameColors = [
  "linear-gradient(90deg, #06999eff 0.5%, #06999eff 100%)",
  "linear-gradient(90deg,rgb(4, 117, 139) 15%,rgb(175, 21, 21) 100%)",
  "linear-gradient(90deg, #36ff36 0.5%, #36ff36 100%)",
  "linear-gradient(90deg, #36ff36 0.5%, #36ff36 100%)",
  "linear-gradient(90deg, #36ff36 0.5%, #36ff36 100%)",
  "linear-gradient(90deg, #36ff36 0.5%, #36ff36 100%)",
  "linear-gradient(90deg,rgb(255, 61, 54) 0.5%,rgb(54, 215, 255) 100%)",
  "linear-gradient(90deg, #36ff36 0.5%, #36ff36 100%)",
  "linear-gradient(90deg,rgb(152, 15, 216) 22%,rgb(218, 22, 175) 100%)",
  "linear-gradient(90deg,rgb(82, 229, 255) 22%,rgb(53, 121, 247) 100%)",
];


let currentSongIndex = 0;
let ve = true
let Resume = "Resume Music"
function playNextSong() {
  music = true
  if (currentSongIndex < playlist.length) {
    currentSongIndex = currentSongIndex
    playlist[currentSongIndex].play();
  } else {
    currentSongIndex = 0;
    playlist[currentSongIndex].play()
  }
}
function pauseMusic() {
  music = false
  if (ve == false) { playlist[currentSongIndex].pause(); ve = true; Resume = "Resume Music" }
  else { playlist[currentSongIndex].play(); ve = false; Resume = "Pause Music" }
}
function nextSong() {
  playlist[currentSongIndex].pause();
  playlist[currentSongIndex].currentTime = 0;
  if (currentSongIndex == 9) {
    currentSongIndex = 0
  } else {
    currentSongIndex = 0
  };
  playNextSong();
}


// ALL AUDIO SECTION

playlist[0].addEventListener('ended', function () {
     
  nextSong(); // Plays the next song
  updateText();
});
playlist[1].addEventListener('ended', function () {
     
  nextSong(); // Plays the next song
  updateText();
});
playlist[2].addEventListener('ended', function () {
     
  nextSong(); // Plays the next song
  updateText();
});
playlist[3].addEventListener('ended', function () {
     
  nextSong(); // Plays the next song
  updateText();
});
playlist[4].addEventListener('ended', function () {
     
  nextSong(); // Plays the next song
  updateText();
});
playlist[5].addEventListener('ended', function () {
   
  nextSong(); // Plays the next song
  updateText();
});
playlist[6].addEventListener('ended', function () {
   
  nextSong(); // Plays the next song
  updateText();
});
playlist[7].addEventListener('ended', function () {
   
  nextSong(); // Plays the next song
  updateText();
});
playlist[8].addEventListener('ended', function () {
   
  nextSong(); // Plays the next song
  updateText();
});
playlist[9].addEventListener('ended', function () {
   
  nextSong(); // Plays the next song
  updateText();
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



var Pages = "Another Beginning."



// Less important things beyond this point!
var displayThings = [
  function () { return "<br><br>" },
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
        document.getElementById("anim1").innerHTML = days + "d   "
        document.getElementById("anim2").innerHTML = hours + "h   "
        document.getElementById("anim3").innerHTML = minutes + "m   "
        document.getElementById("anim4").innerHTML = seconds + "s   "
        if (countDownDate2 >= maintime) {
          document.getElementById('waiting').innerHTML = "<text style='color:cyan'>Development has started...<br>Facility of Redemption is soon to be much different...</text>"
        }
        else
        {document.getElementById('waiting').innerHTML = "<text style='color:cyan'>Development has started...<br>Facility of Redemption is soon to be much different...</text>"}
        
        if (playlistName[currentSongIndex] == "✺✺✺ - An Unknown Presence Theme") document.title = "✺✺✺✺✺✺✺✺✺"
        else document.title = VERSION.withoutName;
        document.getElementById("version4").innerHTML = formatTime(playlist[currentSongIndex].currentTime) + " / " + formatTime(playlist[currentSongIndex].duration)

      }
      else ""
      // If the count down is finished, write some text
      if (countDownDate <= maintime) {
        document.getElementById("anim1").innerHTML = "Check"
        document.getElementById("anim2").innerHTML = "the"
        document.getElementById("anim3").innerHTML = "game"
        document.getElementById("anim4").innerHTML = "."

      }
    }, 100);
    let a = `<text style='word-spacing:3rem'><anim1><div id='anim1' style='font-size:38px'></div></anim1>   <anim2><div id='anim2' style='font-size:38px'></div></anim2>   <anim3><div id='anim3' style='font-size:38px'></div></anim3>   <anim4><div id='anim4' style='font-size:38px'></div></anim4></text><br><br><div id='waiting' style='font-size:17px'></div></text>`
    if (modInfo.End == 0) return a = ''
    return a
  },
  function () {
    let x = ''
    let a = ''
    let b = ''
    let c = ''
    if (ve == false && playlist[currentSongIndex].currentTime < 11) x = "<i><text style='color:grey;font-size:11px'>The music will progress the text.</text></i><br><text style='color:red'>Something must be said about this...<br><br>"
    else if (ve == false && playlist[currentSongIndex].currentTime >= 11.3 && playlist[currentSongIndex].currentTime < 19.2) x = "<i><text style='color:grey;font-size:11px'>The music will progress the text.</text></i><br><text style='color:red'>Something must be said about this...<br><br>Facility of Redemption will not be the same...<br>"
    else if (ve == false && playlist[currentSongIndex].currentTime >= 19.2 && playlist[currentSongIndex].currentTime < 26.4) x = "<i><text style='color:grey;font-size:11px'>The music will progress the text.</text></i><br><text style='color:red'>Something must be said about this...<br><br>Facility of Redemption will not be the same...<br><br>This has been a tough decision..."
    else if (ve == false && playlist[currentSongIndex].currentTime >= 26.4 && playlist[currentSongIndex].currentTime < 34.5) x = "<i><text style='color:grey;font-size:11px'>The music will progress the text.</text></i><br><text style='color:red'>Something must be said about this...<br><br>Facility of Redemption will not be the same...<br><br>This has been a tough decision...<br><br>But... We... believe this is the right call...<br><br>"
    else if (ve == false && playlist[currentSongIndex].currentTime >= 34.5 && playlist[currentSongIndex].currentTime < 44.4) x = "<i><text style='color:grey;font-size:11px'>The music will progress the text.</text></i><br><text style='color:red'>Something must be said about this...<br><br>Facility of Redemption will not be the same...<br><br>This has been a tough decision...<br><br>But... We... believe this is the right call...<br><br>For my own sake...<br><br>"
    else if (ve == false && playlist[currentSongIndex].currentTime >= 44.4 && playlist[currentSongIndex].currentTime < 51.3) x = "<i><text style='color:grey;font-size:11px'>The music will progress the text.</text></i><br><text style='color:red'>Something must be said about this...<br><br>Facility of Redemption will not be the same...<br><br>This has been a tough decision...<br><br>But... We... believe this is the right call...<br><br>For my own sake...<br><br>And for the rest of the 17 Developers...</text><br><br><text style='color:cyan'>"
    else if (ve == false && playlist[currentSongIndex].currentTime >= 51.3 && playlist[currentSongIndex].currentTime < 57.2) x = "<i><text style='color:grey;font-size:11px'>The music will progress the text.</text></i><br><text style='color:red'>Something must be said about this...<br><br>Facility of Redemption will not be the same...<br><br>This has been a tough decision...<br><br>But... We... believe this is the right call...<br><br>For my own sake...<br><br>And for the rest of the 17 Developers...</text><br><br><text style='color:cyan'>Will you stay with us...<br><br>"
    else if (ve == false && playlist[currentSongIndex].currentTime >= 57.2 && playlist[currentSongIndex].currentTime < 63.4) x = "<i><text style='color:grey;font-size:11px'>The music will progress the text.</text></i><br><text style='color:red'>Something must be said about this...<br><br>Facility of Redemption will not be the same...<br><br>This has been a tough decision...<br><br>But... We... believe this is the right call...<br><br>For my own sake...<br><br>And for the rest of the 17 Developers...</text><br><br><text style='color:cyan'>Will you stay with us...<br>Long enough to see it happen..."
    else if (ve == false && playlist[currentSongIndex].currentTime >= 63.4 && playlist[currentSongIndex].currentTime < 70.2) x = "<i><text style='color:grey;font-size:11px'>The music will progress the text.</text></i><br><text style='color:red'>Something must be said about this...<br><br>Facility of Redemption will not be the same...<br><br>This has been a tough decision...<br><br>But... We... believe this is the right call...<br><br>For my own sake...<br><br>And for the rest of the 17 Developers...</text><br><br><text style='color:cyan'>Will you stay with us...<br>Long enough to see it happen...<br>..."
    else if (ve == false && playlist[currentSongIndex].currentTime >= 70.2 && playlist[currentSongIndex].currentTime < 81.3) x = "<i><text style='color:grey;font-size:11px'>The music will progress the text.</text></i><br><text style='color:red'>Something must be said about this...<br><br>Facility of Redemption will not be the same...<br><br>This has been a tough decision...<br><br>But... We... believe this is the right call...<br><br>For my own sake...<br><br>And for the rest of the 17 Developers...</text><br><br><text style='color:cyan'>Will you stay with us...<br>Long enough to see it happen...<br>...<br>Long enough to see us finish...<br>"
    else if (ve == false && playlist[currentSongIndex].currentTime >= 81.3 && playlist[currentSongIndex].currentTime < 93) x = "<i><text style='color:grey;font-size:11px'>The music will progress the text.</text></i><br><text style='color:red'>Something must be said about this...<br><br>Facility of Redemption will not be the same...<br><br>This has been a tough decision...<br><br>But... We... believe this is the right call...<br><br>For my own sake...<br><br>And for the rest of the 17 Developers...</text><br><br><text style='color:cyan'>Will you stay with us...<br>Long enough to see it happen...<br>...<br>Long enough to see us finish...<br>Long enough... to do the impossible...<br>"
    else if (ve == false && playlist[currentSongIndex].currentTime >= 93 && playlist[currentSongIndex].currentTime < 112) x = "<i><text style='color:grey;font-size:11px'>The music will progress the text.</text></i><br><text style='color:red'>Something must be said about this...<br><br>Facility of Redemption will not be the same...<br><br>This has been a tough decision...<br><br>But... We... believe this is the right call...<br><br>For my own sake...<br><br>And for the rest of the 17 Developers...</text><br><br><text style='color:cyan'>Will you stay with us...<br>Long enough to see it happen...<br>...<br>Long enough to see us finish...<br>Long enough... to do the impossible...<br>...<br>"
    else if (ve == false && playlist[currentSongIndex].currentTime >= 112 && playlist[currentSongIndex].currentTime < 137) x = "<i><text style='color:grey;font-size:11px'>The music will progress the text.</text></i><br><text style='color:cyan'>...Do you... believe?</text><br><br>"
    else if (ve == false && playlist[currentSongIndex].currentTime >= 137 && playlist[currentSongIndex].currentTime < 157) x = "That we can do anything."
    else if (ve == false && playlist[currentSongIndex].currentTime >= 157 && playlist[currentSongIndex].currentTime < 157.7) x = "New Map"
    else if (ve == false && playlist[currentSongIndex].currentTime >= 157.7 && playlist[currentSongIndex].currentTime < 158.5) x = "New Infection Mechanic"
    else if (ve == false && playlist[currentSongIndex].currentTime >= 158.5 && playlist[currentSongIndex].currentTime < 159.4) x = "20+ New Experiments"
    else if (ve == false && playlist[currentSongIndex].currentTime >= 159.4 && playlist[currentSongIndex].currentTime < 160.4) x = "5+ New Weapons"
    else if (ve == false && playlist[currentSongIndex].currentTime >= 160.4 && playlist[currentSongIndex].currentTime < 161.4) x = "An Main Menu"
    else if (ve == false && playlist[currentSongIndex].currentTime >= 161.4 && playlist[currentSongIndex].currentTime < 162.4) x = "New Locker Mechanic"
    else if (ve == false && playlist[currentSongIndex].currentTime >= 162.4 && playlist[currentSongIndex].currentTime < 163.4) x = "Improved UI"
    else if (ve == false && playlist[currentSongIndex].currentTime >= 163.4 && playlist[currentSongIndex].currentTime < 164.4) x = "Official Soundtrack"
    else if (ve == false && playlist[currentSongIndex].currentTime >= 164.4 && playlist[currentSongIndex].currentTime < 165.4) x = "Improved Combat"
    else if (ve == false && playlist[currentSongIndex].currentTime >= 165.4 && playlist[currentSongIndex].currentTime < 166.4) x = "Camera Animations"
    else if (ve == false && playlist[currentSongIndex].currentTime >= 166.4 && playlist[currentSongIndex].currentTime < 167.4) x = "Game Update Trailer"
    else if (ve == false && playlist[currentSongIndex].currentTime >= 167.4 && playlist[currentSongIndex].currentTime < 168.4) x = "Game & Experiment Book"
    else if (ve == false && playlist[currentSongIndex].currentTime >= 168.4 && playlist[currentSongIndex].currentTime < 169.4) x = "Lore"
    else if (ve == false && playlist[currentSongIndex].currentTime >= 168.4 && playlist[currentSongIndex].currentTime < 169.4) x = "Massive Weapon Changes"
    else if (ve == false && playlist[currentSongIndex].currentTime >= 169.4 && playlist[currentSongIndex].currentTime < 172) x = "And So much more to come..."
    else if (ve == false && playlist[currentSongIndex].currentTime >= 172 && playlist[currentSongIndex].currentTime < 180) x = "April 18th."
    else if (ve == false && playlist[currentSongIndex].currentTime >= 180 && playlist[currentSongIndex].currentTime < 184) x = "See you then..."
    else if (ve == true) x = "Start the Music..."
    return "<br>" + x
  },
]

// Style for the background, can be a function
var backgroundStyle = ("background-image: url('supernova.jpg')")

var CurrentSong = ""



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

let Darkness = 0
function darkSanctuary() {
  const secretbutton = document.getElementById('secret');
  // Start Church_Zone3.ogg
  // Determine Special Backgroun Changes
  if ((playlist[currentSongIndex].currentTime <= 25.05) && currentSongIndex == 9) {
    document.body.style.setProperty("--FoR", "#000");
    document.body.style.setProperty("--song", "linear-gradient(90deg,rgb(0, 0, 0) 22%,rgb(0, 0, 0) 100%)");
    document.body.style.setProperty("--None", "#000");
        document.body.style.setProperty("--Stars", "#000");
      Darkness = 0
    // Entering the 3rd Dark World
  }
  else if ((playlist[currentSongIndex].currentTime >= 25.05 && playlist[currentSongIndex].currentTime < 64.13) && currentSongIndex == 9) {
    document.body.style.setProperty("--FoR", "#1a3dd9");
    document.body.style.setProperty("--song", "linear-gradient(90deg,rgb(82, 229, 255) 22%,rgb(53, 121, 247) 100%)");
    document.body.style.setProperty("--None", "#756548");
    document.body.style.setProperty("--Stars", "#fff");

    Darkness = 1
    // The Beginning of the Propechy 
  }
  else if ((playlist[currentSongIndex].currentTime >= 64.13 && playlist[currentSongIndex].currentTime < 123.24) && currentSongIndex == 9) {
    document.body.style.setProperty("--FoR", "#509ea1");
    document.body.style.setProperty("--song", "linear-gradient(90deg,rgb(196, 47, 216) 22%,rgb(105, 195, 255) 100%)");
    document.body.style.setProperty("--None", "#8b61ed");
    document.body.style.setProperty("--Stars", "#faf9a7");
    Darkness = 2
    // Is this the right place Kris?
  }
  else if ((playlist[currentSongIndex].currentTime >= 123.24 && playlist[currentSongIndex].currentTime < 196.33) && currentSongIndex == 9) {
    document.body.style.setProperty("--FoR", "#6483b0");
    document.body.style.setProperty("--song", "linear-gradient(90deg,rgb(19, 147, 170) 22%,rgb(154, 35, 184) 100%)");
    document.body.style.setProperty("--None", "#be29cf");
    document.body.style.setProperty("--Stars", "#50d4b9");
    Darkness = 3
    // Is...Is that a... t-titan?!
  }
  else if ((playlist[currentSongIndex].currentTime >= 196.33 && playlist[currentSongIndex].currentTime < 244.5) && currentSongIndex == 9) {
    document.body.style.setProperty("--FoR", "#be29cf");
    document.body.style.setProperty("--song", "linear-gradient(90deg,rgb(194, 43, 156) 22%,rgb(83, 248, 185) 100%)");
    document.body.style.setProperty("--None", "#756548");
    document.body.style.setProperty("--Stars", "#faf9a7");
    if (player["D"].value == 0) {secretbutton.disabled = false;
    secretbutton.innerHTML = "Secret"};
    Darkness = 4
    // Susie wait up! Don't read it!
  }
  else if ((playlist[currentSongIndex].currentTime >= 244.5 && currentSongIndex == 9)) {
    document.body.style.setProperty("--FoR", "#000");
    document.body.style.setProperty("--song", "linear-gradient(90deg,rgb(2, 2, 2) 22%,rgb(0, 0, 0) 100%)");
    document.body.style.setProperty("--None", "#000");
    document.body.style.setProperty("--Stars", "#000");
    if (player["D"].value == 0) {secretbutton.disabled = true,
    secretbutton.innerHTML = ""};
    Darkness = 0
    // Exiting the 3rd Dark World
  }
}


function updateText() {
  if (player["D"].value == 0) document.getElementById("music").innerHTML = playlistName[currentSongIndex]; // Music change, duh
  document.body.style.setProperty("--FoR", songColors[currentSongIndex]); // Changes Background & Text Colors
  document.body.style.setProperty("--song", nameColors[currentSongIndex]);
  document.body.style.setProperty("--None", textColors[currentSongIndex]);
  document.body.style.setProperty("--Stars", songColors[currentSongIndex]);
  if (playlistName[currentSongIndex] == "FoR - The Slowdown In Development") document.body.style.setProperty("--DEV", `0deg`);
  else if (playlistName[currentSongIndex] == "Open Your Heart - Vs. Kris") document.body.style.setProperty("--DEV", `0deg`);
  else document.body.style.setProperty("--DEV", `180deg`);
  const favicon = document.getElementById("logo");
  if (playlistName[currentSongIndex] == "✺✺✺ - An Unknown Presence Theme") favicon.setAttribute("href", "img/broken_script.png"); // null
  else favicon.setAttribute("href", "img/infected.png");
  if (ve == false) { document.getElementById("music3").innerHTML = "Pause Music?" }
  else { document.getElementById("music3").innerHTML = "Resume Music?" }
  if (currentSongIndex !== 9) {secretbutton.disabled = true,
    secretbutton.innerHTML = ""};
  Darkness = 0
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
window.onloadstart = playlist[currentSongIndex].play();