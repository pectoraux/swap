var world = function() {	
	var ctx;

	var aiEntities = [];
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
		if(input.keys[input.right])
			player.x+=gridSize/10;
		if(input.keys[input.left])
			player.x-=gridSize/10;
		if(input.keys[input.up])
			player.y-=gridSize/10;
		if(input.keys[input.down])
			player.y+=gridSize/10;
		if(input.keys[input.space]==false && hitSpace==true)
			cyclePlayer();
		if(input.keys[input.space])
			hitSpace = true;
		else
			hitSpace = false;
	}

	var draw = function() {
		//iterate through and draw tiles first, then entities
		for (var y = 0; y < sizeY; y++) {
			for (var x = 0; x < sizeX; x++) {
				ctx.fillStyle = floor[y][x].color;
				ctx.fillRect(x*gridSize, y*gridSize, gridSize, gridSize);
			}
		}
		for (var i = 0; i < aiEntities.length; i++) {
			ctx.fillStyle = aiEntities[i].color;
			ctx.beginPath();
			ctx.arc(aiEntities[i].x, aiEntities[i].y, gridSize / 2, 0, 2*Math.PI);
			ctx.fill();
		}
		if (player) {
			ctx.fillStyle = player.color;
			ctx.beginPath();
			ctx.arc(player.x, player.y, gridSize / 2, 0, 2*Math.PI);
			ctx.fill();
			//highlight player
			ctx.lineWidth = 2;
			ctx.strokeStyle = '#FF8000';
			ctx.stroke();
		}
		else {
			console.log("Fiddlesticks -- no player instance! Check level for startX and startY?");
		}
	}

	var cyclePlayer = function() {
		aiEntities.push(player);
		player = aiEntities.shift();
	}

	return {
		initLevel: initLevel,
	}
}();