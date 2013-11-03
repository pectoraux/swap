var world = function() {	
	var c;

	var aiEntities = [];
	var player;

	var floor = [];
	var width, height;
	var gridSize = 30;

	var initLevel = function(level, canvasId) {
		// inits level, restarts game
		var canvas = document.getElementById(canvasId);
		if (canvas.getContext) {
			ctx = canvas.getContext("2d");
			var width = canvas.width;
			var height = canvas.height
			loadLevel(level);
			draw(ctx);
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
						player = new AI(x, y, currentLevel.tiles[y][x]);
					else {
						aiEntities.push(new AI(x, y, currentLevel.tiles[y][x]));
					}
				}
			}
		}
	}

	var update = function() {

	}

	var draw = function(ctx) {
		//iterate through and draw tiles first, then entities
		// physics(); //yes please recursion
		update();
		for (var y = 0; y < height; y+=gridSize) {
			for (var x = 0; x < width; x+=gridSize) {
				ctx.fillStyle = floor[y][x].color;
				ctx.fillRect(x, y, x + gridSize, y + gridSize);
			}
		}
		for (var i = 0; i < aiEntities.size; i++) {
			ctx.fillStyle = aiEntities[i].color;
			ctx.beginPath();
			ctx.arc(aiEntities[i].x / 2, aiEntities.y / 2, gridSize / 2 - 5, 0, 2*Math.PI);
			ctx.fill();
		}
		if (typeof player != "undefined") {
			ctx.fillStyle = player.color;
			ctx.beginPath();
			ctx.arc(player.x / 2, player.y / 2, gridSize / 2 - 5, 0, 2*Math.PI);
			ctx.fill();
		}
		else {
			console.log("Fiddlesticks -- no player instance! Check level for startX and startY?");
		}
	}

	var physics = function() {
		// draw(); //mhm wtf
	}

	var cyclePlayer = function() {
		aiEntities.push(player);
		player = aiEntities.shift();
	}

	return {
		initLevel: initLevel,
	}
}();