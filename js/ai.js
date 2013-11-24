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
		if(this.vx!=0)
			this.x += gridSize/this.vx;
		if(this.vy!=0)
			this.y += gridSize/this.vy; 
	}, 
	onCollide: function(tile) {

	},
};

var StationaryAI = function(x, y) {
	this.init(x, y);
}
StationaryAI.prototype = Object.create(AI);

var RightAI = function(x, y) {
	this.init(x, y);
}
RightAI.hitWall = false;
RightAI.prototype = Object.create(AI);
RightAI.prototype.vx = 7;
RightAI.prototype.update = function(gridSize) {
	if(!this.hitWall) {
		if(this.vx!=0)
			this.x += gridSize/this.vx;
		if(this.vy!=0)
			this.y += gridSize/this.vy; 
	}
	this.hitWall = false;
}
RightAI.prototype.onCollide = function(tile){
	if(tile.blocksMovement)
		this.hitWall = true;
}

var RightBounceAI = function(x, y) {
	this.init(x, y);
}
RightBounceAI.prototype = Object.create(AI);
RightBounceAI.prototype.vx = 7;
RightBounceAI.hitWall = false;
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
	if(tile.blocksMovement) 
		world.death();
}

var LeftTurnAI = function(x, y) {
	this.init(x, y);
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
