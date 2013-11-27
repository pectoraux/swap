var switchedTiles = [];
switchedTiles.length = 10;

var Tile = {
	init: function(x, y){
		this.x = x;
		this.y = y;
	},
	update: function() {},
	onCollide: function(ai) {},
	blocksMovement: false,
	//color: "rgb(235, 235, 235)",
	color:"white",
};

var FloorTile = function(x, y){
	this.init(x, y);
};
FloorTile.prototype = Object.create(Tile);

var LavaTile = function(x, y){
	this.init(x, y);
};
LavaTile.prototype = Object.create(Tile);
LavaTile.prototype.onCollide = function(ai) {
	world.death();
}
LavaTile.prototype.color = "red";

var VictoryTile = function(x, y){
	this.init(x, y);
};
VictoryTile.prototype = Object.create(Tile);
VictoryTile.prototype.onCollide = function(ai) {
	world.victory();
}
VictoryTile.prototype.color = "rgb(163, 211, 156)"; //"rgba(95, 255, 80, 1.0)";

var WallTile = function(x, y){
	this.init(x, y);
};
WallTile.prototype = Object.create(Tile);
WallTile.prototype.blocksMovement = true;
WallTile.prototype.color = "grey";

var SwitchedTile = function(x, y){
	this.init(x, y);
};
SwitchedTile.prototype = Object.create(Tile);
SwitchedTile.prototype.blocksMovement = true;
SwitchedTile.prototype.color = "rgb(253, 198, 137)";
SwitchedTile.prototype.onCollide = function(ai) {
	this.touchingAI = true;
	this.justTouching = true;
}
SwitchedTile.prototype.update = function(ai) {
	if(!this.justTouching)
		this.touchingAI = false;
	this.justTouching = false;
}

var SwitchTile = function(x, y, id){
	this.init(x, y);
	this.switchingId = id;
}
SwitchTile.prototype = Object.create(Tile);
SwitchTile.prototype.color = "rgb(255, 247, 153)";
SwitchTile.prototype.onCollide = function(ai) {
	this.down = true;
	switchedTiles[this.switchingId].blocksMovement = false;
	switchedTiles[this.switchingId].color = "rgb(235, 235, 235)";
}
SwitchTile.prototype.update = function() {
	if(!this.down) {
		if(!switchedTiles[this.switchingId].touchingAI) {
			switchedTiles[this.switchingId].blocksMovement = true;
			switchedTiles[this.switchingId].color = "rgb(253, 198, 137)";
		}
	}
	this.down = false;
}

var getTile = function(x, y, id) {
	if(19<id && id<30) {
		t = new SwitchedTile(x, y)
		switchedTiles[id-20] = t;
		return t;
	}
	else if(9<id && id<20) {
		return new SwitchTile(x, y, id-10);
	}
	else {
		switch(id) {
			case 1:
				return new WallTile(x, y);
			case 2:
				return new VictoryTile(x, y);
			case 3:
				return new LavaTile(x, y);
			default:
				return new FloorTile(x, y);
		}
	}
}

