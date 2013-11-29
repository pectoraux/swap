var player = function() {
	var x,y;
	var prevX, prevY;
	var vx = 0, vy = 0;
	var currentAI;
	var friction = 1.5;
	var trail = [];
	var gridSize;

	var init = function(gSize) {
		gridSize = gSize;
		vx = 0;
		vy = 0;
		this.trail.length = 0;
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
	var update = function(gridSize) { // weird inconsistent speed cap issue
		prevX = x;
		prevY = y;
		this.trail.push([this.x, this.y]);
		if (this.trail.length >= 5) this.trail.shift();

		if(input.right) {
            if (vx <= gridSize / 10) vx += (Math.abs(vx) + 1) / friction;
		}
        else if(input.left) {
            if (vx >= -gridSize / 10) vx -= (Math.abs(vx) + 1) / friction;
        }

        if(input.up){
            if (vy >= -gridSize / 10) vy -= (Math.abs(vy) + 1) / friction;
        }
        else if(input.down) {
            if (vy <= gridSize / 10) vy += (Math.abs(vy) + 1) / friction;
        }
        if(!input.right && !input.left) {
        	vx = vx / friction;
        }
        if(!input.up && !input.down) {
        	vy = vy / friction;
        }
        if(vx>7)
        	vx=7;
        else if(vx<-7)
        	vx=-7;
        if(vy>7)
        	vy=7;
        else if(vy<-7)
        	vy=-7;
		this.x += vx;
		this.y += vy;
	}

	var hitWall = function() {
		if(this.trail[1]) {
			this.x = this.trail[1][0];
			this.y = this.trail[1][1];
		}


		// vx *= -0.3;
		// vy *= -0.3;
		// var cornerX = this.x - (gridSize/2);
		// var cornerY = this.y - (gridSize/2);
		// if(x+gridSize>cornerX || x<cornerX+gridSize) {
		// 	x = trail[1][0];
		// 	console.log("hacks");
		// }
		// if(y+gridSize>cornerY || y<cornerY+gridSize)
		// 	y = trail[1][1];
	}

	var getVelocity = function() {
		return {
			x:vx,
			y:vy,
		}
	}

	return {
		x: x,
		y: y,
		color: "rgb(125,167,217)",//"rgba(0, 10, 200, 0.4)",
		trail: trail,
		getVelocity: getVelocity,
		init: init,
		setAI: setAI,
		getAI: getAI, 
		update: update,
		hitWall: hitWall,
	}
}();