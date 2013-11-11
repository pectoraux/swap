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
	this.x += player.getVelocity().x;
	this.y += player.getVelocity().y;
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
