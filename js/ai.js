var AI = {
	x:0,
	y:0,
	vx:0,
	vy:0,
	color: "rgb(125,167,217)",//"rgba(0, 10, 200, 0.4)",
	init: function(x, y) {
		this.x = x;
		this.y = y;
	},
	update: function(gridSize) {
		if(!this.hitWall) {
			if(this.vx!=0)
				this.x += gridSize / this.vx;
			if(this.vy!=0)
				this.y += gridSize / this.vy;
		}
		this.hitWall = false;
	}, 
	onCollide: function(tile) {
		if(tile.blocksMovement)
			this.hitWall = true;
	},
};

var StationaryAI = function(x, y) {
	this.init(x, y);
}
StationaryAI.prototype = Object.create(AI);

var RightAI = function(x, y) {
	this.init(x, y);
	this.vx = 7;
	this.hitWall = false;
}
RightAI.prototype = Object.create(AI);

var RightBounceAI = function(x, y) {
	this.init(x, y);
	this.vx = 7;
	this.hitWall = false;
}
RightBounceAI.prototype = Object.create(AI);
RightBounceAI.prototype.onCollide = function(tile) {
	if(tile.blocksMovement && !this.hitWall) {
		this.vx *= -1;
		this.hitWall = true;
	}
}

RightBounceAI.prototype.update = function(gridSize) {
	this.hitWall = false;

	if(this.vx!=0)
		this.x += gridSize/this.vx;
	if(this.vy!=0)
		this.y += gridSize/this.vy; 
}

var FollowAI = function(x, y) {
	this.init(x, y);
}
FollowAI.prototype = Object.create(AI);
FollowAI.prototype.update = function(gridSize) {
	this.x += player.getVelocity().x;
	this.y += player.getVelocity().y;
}
FollowAI.prototype.onCollide = function(tile) {
	// fix this!
	this.vx *= -0.3;
	this.vy *= -0.3;
}

var LeftTurnRightAI = function(x, y) {
	this.init(x, y);
	this.vx = 7;
}
LeftTurnRightAI.prototype = Object.create(AI);
LeftTurnRightAI.prototype.update = function(gridSize) {
	if(this.vx!=0)
		this.x += gridSize/this.vx;
	if(this.vy!=0)
		this.y += gridSize/this.vy; 
	this.hitWall = false;
}
LeftTurnRightAI.prototype.onCollide = function(tile) {
	// fix this! collision is quite funky
	// goes into wall before changing dir, so onCollide still runs
	// making it go in a U turn
	if(tile.blocksMovement && !this.hitWall) {
		this.vxo = this.vx;
		this.vyo = this.vy;
		this.vx = 0;
		this.vy = 0;
		if (this.vxo > 0) this.vy = -7;
		else if (this.vxo < 0) this.vy = 7; 
		else if (this.vyo > 0) this.vx = 7;
		else if (this.vyo < 0) this.vx = -7;
	}
	this.hitWall = true;
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
		case -5:
			return new LeftTurnRightAI(x, y);
	}
}
