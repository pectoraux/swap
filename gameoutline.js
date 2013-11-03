//array of levels so they can be loaded based on index
var levels = [ 
	{
		size: 10,
		startingPlayer: [2, 8],
		tiles: [
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		[1, 0, 0, 0, 0, 0, 0, 0,-2, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0,-1, 0, 0, 0, 0, 0, 0, 1],
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		],
	}
]

var aiBehavior = {
	"red": blah, //can you help me think of a sexy and extinsible way to represent behavior
}

var floorBehavior = {
	"red": blah, //same as above
}

var AI = function(x, y, color) { //I discovered functions work like objects in JS (e.g. ai[0][1] = new AI(0, 1, "red"))
	//x = x square, y = y square, color = string of color
	this.isPlayer = false; //holds whether this is the one in control
	this.x = squareToCoord(x); //this function will convert the starting square to a coordinate (the actual coordinate depends on screen size, so we can scale the canvas)
	this.y = squareToCoord(y);

	this.behavior = aiBehavior[color]; //can you help me think of a sexy and extensible way to represent behavior?
	this.color = color;
}

var Tile = function(color) {
	//this doesn't need positional stuff because it's in an array
	this.behavior = floorBehavior[color];
	this.color = color;
}


