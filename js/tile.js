var switchedTiles = [];
switchedTiles.length = 10;

var Tile = {
	update: function() {},
	onCollide: function(ai) {},
	blocksMovement: false,
	color: "white",
};

var WhiteTile = function(){};
WhiteTile.prototype = Object.create(Tile);

var RedTile = function(){};
RedTile.prototype = Object.create(Tile);
RedTile.prototype.onCollide = function(ai) {
	world.death();
}
RedTile.prototype.color = "red";

var GreenTile = function(){};
GreenTile.prototype = Object.create(Tile);
GreenTile.prototype.onCollide = function(ai) {
	world.victory();
}
GreenTile.prototype.color = "rgba(95, 255, 80, 1.0)";

var GrayTile = function(){};
GrayTile.prototype = Object.create(Tile);
GrayTile.prototype.blocksMovement = true;
GrayTile.prototype.color = "grey";

var SwitchedTile = function(){};
SwitchedTile.prototype = Object.create(Tile);
SwitchedTile.prototype.blocksMovement = true;
SwitchedTile.prototype.color = "orange";
SwitchedTile.prototype.onCollide = function(ai) {
	this.touchingAI = true;
	this.justTouching = true;
}
SwitchedTile.prototype.update = function(ai) {
	if(!this.justTouching)
		this.touchingAI = false;
	this.justTouching = false;
}

var SwitchTile = function(id){
	this.switchingId = id;
}
SwitchTile.prototype = Object.create(Tile);
SwitchTile.prototype.color = "yellow";
SwitchTile.prototype.onCollide = function(ai) {
	this.down = true;
	switchedTiles[this.switchingId].blocksMovement = false;
	switchedTiles[this.switchingId].color = "white";
}
SwitchTile.prototype.update = function() {
	if(!this.down) {
		if(!switchedTiles[this.switchingId].touchingAI) {
			switchedTiles[this.switchingId].blocksMovement = true;
			switchedTiles[this.switchingId].color = "orange";
		}
	}
	this.down = false;
}

var getTile = function(id) {
	if(19<id && id<30) {
		t = new SwitchedTile()
		switchedTiles[id-20] = t;
		return t;
	}
	else if(9<id && id<20) {
		return new SwitchTile(id-10);
	}
	else {
		switch(id) {
			case 1:
				return new GrayTile();
			case 2:
				return new GreenTile();
			case 3:
				return new RedTile();
			default:
				return new WhiteTile();
		}
	}
}

