
// ************ Themes ************

var colors = {
	default: {
		1: "#ffffff",//Branch color 1
		2: "#bfbfbf",//Branch color 2
		3: "#7f7f7f",//Branch color 3
		color: "#dfdfdf",
		points: "#ffffff",
		locked: "#bf8f8f",
		background: "#0f0f0f",
		background_tooltip: "rgba(0, 0, 0, 0.75)",
	},
	E205: {
		1: "#8f1810",
		2: "#a1271f",
		3: "#732a25",
		color: "#a35d71",
		points: "#3529ba",
		locked: "#4b4a4f",
		background: "#663241",
		background_tooltip: "rgba(77, 13, 31, 0.75)",
	},
}

function changeTheme() {
	colors_theme = colors[meta.options.theme] || colors[0]
	document.body.style.setProperty('--background', themes[meta.options.theme] ? themes[meta.options.theme][1] : "#0f0f0f")
	document.body.style.setProperty('--background_tooltip', themes[meta.options.theme] ? themes[meta.options.theme][2] : "#000000b0")
	document.body.style.setProperty('--color', themes[meta.options.theme] ? themes[meta.options.theme][3] : "#dfdfdf")
	document.body.style.setProperty('--points', themes[meta.options.theme] ? themes[meta.options.theme][4] : "#ffffff")
	document.body.style.setProperty("--locked", themes[meta.options.theme] ? themes[meta.options.theme][5] : "#bf8f8f")
}

function getThemeName() {
	return options.theme? options.theme : "default";
}
function switchTheme() {
let index = themes.indexOf(options.theme)
if (options.theme === null || index >= themes.length-1 || index < 0) {
	options.theme = themes[0];
}
else {
	index ++;
	options.theme = themes[index];
	options.theme = themes[1];
}
}
changeTheme();
resizeCanvas();
