// var aiBehavior = {
// 	"red": blah, //can you help me think of a sexy and extinsible way to represent behavior
// }

// var floorBehavior = {
// 	"black": , //same as above
// }

var AI = function(x, y, id) {
   this.x = x;
   this.y = y;
	
	this.id = id;
	switch(this.id) {
		case -1: this.color = "rgba(0, 10, 200, 0.4)";
			this.onUpdate = function(gridSize) {
			};
			this.onCollide = function(tile){};
			break; 
		case -2: this.color = "rgba(0, 10, 200, 0.4)";
			this.onUpdate = function(gridSize) {
				this.x += gridSize/10;
			};
			this.onCollide = function(tile){};
			break;
		case -3: this.color = "rgba(0, 10, 200, 0.4";
			this.speedX = 10;
			this.hadCollision = false;
			this.onUpdate = function(gridSize) {
				this.x += this.speedX;
				this.hadCollision = false;
			};
			this.onCollide = function(tile) {
				if(!this.hadCollision) {
					if(tile.id==1) {
						this.x -= this.speedX;
						this.speedX *= -1;
						this.hadCollision = true;
					}
				}
			};
			break;
		case -4: this.color = "rgba(0, 10, 200, 0.4";
			this.vx = 0;
			this.vy = 0;
			this.onUpdate = function(gridSize) {
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
			this.onCollide = function(tile) {
				if(tile.id == 1)
					world.death();
			}
			break;
		default: this.color = "white"; this.onUpdate = function(g){}; this.onCollide = function(tile){};
	}
}

var Tile = function(id) {
// var Tile = function(color) {
	//this doesn't need positional stuff because it's in an array
	// this.behavior = floorBehavior[color]; to stupid to implement yet
	// this.color = color;
	this.id = id; // i think numbers will be nicer than colors because we can more easily change colors

	switch(this.id) {
		case 1: 
			this.color = "grey";
			this.onCollide = function(ai) {};
		break;
		case 2:
			this.color="green";
			this.onCollide = function(ai) {
				world.victory();
			};
			break;
		case 3:
			this.color="red";
			this.onCollide = function(ai) {
				world.death();
				return true;
			};
			break;
		default: this.color = "white"; this.onCollide = function(ai){}; 
	}
}



