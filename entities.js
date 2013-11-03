// var aiBehavior = {
// 	"red": blah, //can you help me think of a sexy and extinsible way to represent behavior
// }

// var floorBehavior = {
// 	"black": , //same as above
// }

var AI = function(x, y, id) {
   this.x = x;
   this.y = y;

	// this.behavior = aiBehavior[color]; //can you help me think of a sexy and extensible way to represent behavior?
	// this.color = color;
	
	this.id = id;
	switch(this.id) {
		case -1: this.color = "rgba(0, 10, 200, 0.4)";break;
		default: this.color = "white";
	}
}

var Tile = function(id) {
// var Tile = function(color) {
	//this doesn't need positional stuff because it's in an array
	// this.behavior = floorBehavior[color]; to stupid to implement yet

	// this.color = color;
	this.id = id; // i think numbers will be nicer than colors because we can more easily change colors

	switch(this.id) {
		case 1: this.color = "grey"; break;
		default: this.color = "white"; 
	}
}



