var player = function() {
	var x, y;
	var vx = 0, vy = 0;
	var currentAI;
	var friction = 1.25;
	var trail = [];

	var init = function() {
		vx = 0;
		vy = 0;
		trail.length = 0;
	}

	var setAI = function(ai){
		this.trail.length = 0;
		this.x = ai.x;
		this.y = ai.y;
		this.currentAI = ai;
	}

	var getAI = function() {
		this.currentAI.x = this.x;
		this.currentAI.y = this.y;
		return this.currentAI;
	}
	var update = function(gridSize) {
		this.trail.push([this.x, this.y]);
		if (this.trail.length >= 5) this.trail.shift();

		var keyUp = true;

		if(input.keys[input.right]) {
			keyUp = false;
			// vx = gridSize / 10;
			// for fluid acceleration
			if (vx <= gridSize / 10) vx += (Math.abs(vx) + 1) / friction;
		}
		else if(input.keys[input.left]) {
			keyUp = false;
			if (vx >= -gridSize / 10) vx -= (Math.abs(vx) + 1) / friction;
		}
		if(input.keys[input.up]) {
			keyUp = false;
			if (vy >= -gridSize / 10) vy -= (Math.abs(vy) + 1) / friction;
			//vy = -gridSize/10;
		}
		else if(input.keys[input.down]) {
			keyUp = false;
			// vy = gridSize/10;
			if (vy <= gridSize / 10) vy += (Math.abs(vy) + 1) / friction;
		}
		if (keyUp) {
			vx = vx / friction; 
			vy = vy / friction; 
		}
		this.x += vx;
		this.y += vy;
	}

	var onCollide = function(tile){

	}
	var hitWall = function() {
		this.x = this.trail[2][0] || this.x;
		this.y = this.trail[2][1] || this.y;
		vx *= -1;
		vy *= -1;
	}

	return {
		x: x,
		y: y,
		color: "rgba(0, 10, 200, 0.4)",
		trail: trail,
		onCollide: onCollide,
		init: init,
		setAI: setAI,
		getAI: getAI, 
		update: update,
		hitWall: hitWall,
	}
}();

var AI = {
	x:0,
	y:0,
	vx:0,
	vy:0,
	color: "rgba(0, 10, 200, 0.4)",
	update: function(gridSize) {
		this.x += this.vx/gridSize;
		this.y += this.vy/gridSize; 
	}, 
	onCollide: function(tile) {

	},
};

var StationaryAI = function(x, y) {
	this.x = x;
	this.y = y;
}
StationaryAI.prototype = Object.create(AI);

var RightAI = function(x, y) {
	this.x = x;
	this.y = y;
}
RightAI.prototype = Object.create(AI);
RightAI.prototype.vx = 640;

var RightBounceAI = function(x, y) {
	this.x = x;
	this.y = y;
}
RightBounceAI.prototype = Object.create(AI);
RightBounceAI.prototype.vx = 640;
RightBounceAI.prototype.onCollide = function(tile) {
	if(tile.blocksMovement)
		this.vx *= -1;
}


var FollowAI = function(x, y) {
	this.x = x;
	this.y = y;
}
FollowAI.prototype = Object.create(AI);
FollowAI.prototype.update = function(gridSize) {
	var friction = 1.25;
	var keyUp = true;
	if(input.keys[input.right]) {
		keyUp = false;
		// vx = gridSize / 10;
		// for fluid acceleration
		if (this.vx <= gridSize / 10) this.vx += (Math.abs(this.vx) + 1) / friction;
	}
	else if(input.keys[input.left]) {
		keyUp = false;
		if (this.vx >= -gridSize / 10) this.vx -= (Math.abs(this.vx) + 1) / friction;
	}
	if(input.keys[input.up]) {
		keyUp = false;
		if (this.vy >= -gridSize / 10) this.vy -= (Math.abs(this.vy) + 1) / friction;
		//vy = -gridSize/10;
	}
	else if(input.keys[input.down]) {
		keyUp = false;
		// vy = gridSize/10;
		if (this.vy <= gridSize / 10) this.vy += (Math.abs(this.vy) + 1) / friction;
	}
	if (keyUp) {
		this.vx = this.vx / friction; 
		this.vy = this.vy / friction; 
	}
	this.x += this.vx;
	this.y += this.vy;
}
FollowAI.prototype.onCollide = function(tile) {
	if(tile.blocksMovement)
		world.death();
}

var getAI = function(x, y, id) {
	switch(id) {
		case -1:
			return new StationaryAI(x, y);
		case -2:
			return new RightAI(x, y);
		case -3:
			return new RightBounceAI(x, y);
		case -4: 
			return new FollowAI(x, y);
	}
}

var Tile = {
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
GreenTile.prototype.color = "green";

var GrayTile = function(){};
GrayTile.prototype = Object.create(Tile);
GrayTile.prototype.blocksMovement = true;
GrayTile.prototype.color = "grey";

var getTile = function(id) {
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


