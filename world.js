var world = function() {	
	var ctx;

	var aiEntities = [];
	var trail = [];
	var player;

	var floor = [];
	var width, height, sizeX, sizeY;
	var gridSize;

	var fps = 30;

	var hitSpace = false;

	var initLevel = function(level, canvasId) {
		// inits level, restarts game
		var canvas = document.getElementById(canvasId);
		input.init();
		if (canvas.getContext) {
			ctx = canvas.getContext("2d");
			width = canvas.width;
			height = canvas.height
			sizeX = levels[level].sizeX;
			sizeY = levels[level].sizeY;
			gridSize = width/sizeX;
			console.log(gridSize);
			loadLevel(level);

			intervalId = setInterval(run, 1000 / fps);
		}
	}

	var loadLevel = function(index) {
		// loads level from level file
		var currentLevel = levels[index];
		for (var y = 0; y < currentLevel.sizeY; y++) {
			floor.push([]);
			for (var x = 0; x < currentLevel.sizeX; x++) {
				if (currentLevel.tiles[y][x] >= 0) {
					floor[y].push(new Tile(currentLevel.tiles[y][x]));
				}
				else {
					floor[y].push(new Tile(0));	
					if(x==currentLevel.startX && y==currentLevel.startY)
						player = new AI(x*gridSize+gridSize/2, y*gridSize+gridSize/2, currentLevel.tiles[y][x]);
					else {
						aiEntities.push(new AI(x*gridSize+gridSize/2, y*gridSize+gridSize/2, currentLevel.tiles[y][x]));
					}
				}
			}
		}
	}

	var run = function() {
		update();
		draw();
	}	

	var update = function() {
		var keyUp = true;
		trail.push([player.x, player.y]);
		if(input.keys[input.right]) {
			keyUp = false;
			player.x+=gridSize/10;
		}
		if(input.keys[input.left]) {
			keyUp = false;
			player.x-=gridSize/10;
		}
		if(input.keys[input.up]) {
			keyUp = false;
			player.y-=gridSize/10;
		}
		if(input.keys[input.down]) {
			keyUp = false;
			player.y+=gridSize/10;
		}
		if(input.keys[input.space]==false && hitSpace==true) {
			cyclePlayer();
		}
		if(input.keys[input.space]) {
			keyUp = false;
			hitSpace = true;
		}
		else { 
			hitSpace = false;
		}
		if (keyUp) {
			toGrid(player);
		}
	}

	var draw = function() {
		//iterate through and draw tiles first, then entities
		ctx.globalAlpha = 1;
		for (var y = 0; y < sizeY; y++) {
			for (var x = 0; x < sizeX; x++) {
				ctx.fillStyle = floor[y][x].color;
				ctx.fillRect(x*gridSize, y*gridSize, gridSize, gridSize);
			}
		}
		for (var i = 0; i < aiEntities.length; i++) {
			ctx.globalAlpha = 0.65;
			ctx.fillStyle = aiEntities[i].color;
			ctx.beginPath();
			ctx.arc(aiEntities[i].x, aiEntities[i].y, gridSize / 2, 0, 2*Math.PI);
			ctx.fill();
		}
		ctx.globalAlpha = 1;
		for (var i = 0; i < trail.length; i++) { 
			ctx.globalAlpha = 1 - ((trail.length - i) / trail.length);		
			ctx.fillStyle = player.color;
			ctx.beginPath();
			ctx.arc(trail[i][0], trail[i][1], gridSize / 2 - (trail.length - i), 0, 2*Math.PI);
			ctx.fill();
			if (trail.length >= 7)	trail.shift();
		}
		ctx.globalAlpha = 1;
		if (player) {
			ctx.fillStyle = player.color;
			ctx.beginPath();
			ctx.arc(player.x, player.y, gridSize / 2, 0, 2*Math.PI);
			ctx.fill();
			//highlight player
			// ctx.lineWidth = 3;
			// ctx.strokeStyle = '#FF8000';
			// ctx.stroke();
		}
		else {
			console.log("Fiddlesticks -- no player instance! Check level for startX and startY?");
		}
	}

	var toGrid = function(ai) { // rounds funny, seems to round down
		// perhaps due to the fact that circle is drawn from center of grid?
		ai.x = (Math.round(ai.x / gridSize) - 0.5) * gridSize;
		ai.y = (Math.round(ai.y / gridSize) - 0.5) * gridSize; 
	}

	var collide = function() { // implement me!
		// should return null if nothing is in way, otherwise should return obj in way
		return null;
	}

	var cyclePlayer = function() {
		aiEntities.push(player);
		player = aiEntities.shift();
	}

	return {
		initLevel: initLevel,
	}
}();