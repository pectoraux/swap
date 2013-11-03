// var aiBehavior = {
// 	"red": blah, //can you help me think of a sexy and extinsible way to represent behavior
// }

// var floorBehavior = {
// 	"black": , //same as above
// }

var AI = function(x, y, color) { //I discovered functions work like objects in JS (e.g. ai[0][1] = new AI(0, 1, "red"))
	//x = x square, y = y square, color = string of color
	this.x = squareToCoord(x); //this function will convert the starting square to a coordinate (the actual coordinate depends on screen size, so we can scale the canvas)
	this.y = squareToCoord(y);

	// this.behavior = aiBehavior[color]; //can you help me think of a sexy and extensible way to represent behavior?
	this.color = color;
}

var Tile = function(color) {
	//this doesn't need positional stuff because it's in an array
	// this.behavior = floorBehavior[color]; to stupid to implement yet
	this.color = color;
}


