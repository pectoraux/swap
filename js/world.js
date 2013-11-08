var world = function() {
	var aiEntities = [];
	var floor = [];
	var gridSize;
	var curLevel;
	var intervalId;
	var fps = 30;
	var hitSpace = false;

	var init = function(level, canvasId, tipId) {
		renderer.init(canvasId, tipId);
		initLevel(level);
	}

	var initLevel = function(level) {
		if(intervalId)
			clearInterval(intervalId); //makes sure we don't run dual loops

		curLevel = level;
		if(level==levels.length) {
			alert("That's all folks!");
			return;
		}

		input.init();
		renderer.initLevel(levels[level]);
		player.init();
		
		gridSize = renderer.gridSize;
		loadLevel(level);

		intervalId = setInterval(run, 1000 / fps);
		run();
	}

	var victory = function() {
		alert("You win!");
		initLevel(curLevel+1);
	}

	var death = function() {
		alert("You died! :O");
		clearInterval(intervalId); 
		initLevel(curLevel);
	}

	var loadLevel = function(index) {
		// loads level from level file
		var currentLevel = levels[index];
		floor.length = 0;
		aiEntities.length = 0;
		for (var y = 0; y < currentLevel.sizeY; y++) {
			floor.push([]);
			for (var x = 0; x < currentLevel.sizeX; x++) {
				if (currentLevel.tiles[y][x] >= 0) {
					floor[y].push(getTile(currentLevel.tiles[y][x]));
				}
				else {
					floor[y].push(getTile(0));	
					if(x==currentLevel.startX && y==currentLevel.startY)
						player.setAI(getAI(x*gridSize+gridSize/2, y*gridSize+gridSize/2, currentLevel.tiles[y][x]));
					else {
						aiEntities.push(getAI(x*gridSize+gridSize/2, y*gridSize+gridSize/2, currentLevel.tiles[y][x]));
					}
				}
			}
		}
		console.log(aiEntities);
	}

	var run = function() {
		update();
		renderer.draw(aiEntities, floor);
	}	

	var update = function() {
		//update player and player collision
		player.update(gridSize);
		if(input.keys[input.space]==false && hitSpace==true) {
			cyclePlayer();
		}
		hitSpace = input.keys[input.space];
		var touchingTiles = collide(player).tiles;
		var hitWall = false;
		for(var i=0; i<touchingTiles.length; i++) {
			if(touchingTiles[i].blocksMovement) {
				hitWall = true;
			}
			else {
				touchingTiles[i].onCollide(player);
			}
		}
		if(hitWall) 
			player.hitWall();

		//update AIs and AI collisions
		for(var i=0; i<aiEntities.length; i++) {
			aiEntities[i].update(gridSize);
			var touchingTiles = collide(aiEntities[i]).tiles;
			for(var j=0; j<touchingTiles.length; j++) {
				aiEntities[i].onCollide(touchingTiles[j]);
				if(touchingTiles[j].onCollide(aiEntities[i]))
					break;
			}
		}

	}

	var collide = function(ai) {
		var touching = {
			tiles: [],
		}
		var x = (ai.x - gridSize/2) + 5;
		var y = (ai.y - gridSize/2) + 5;
		addToArray(touching.tiles, floor[coordToGrid(x, y).y][coordToGrid(x, y).x]);
		addToArray(touching.tiles, floor[coordToGrid(x+gridSize-10, y).y][coordToGrid(x+gridSize-10, y).x]);
		addToArray(touching.tiles, floor[coordToGrid(x, y+gridSize-10).y][coordToGrid(x, y+gridSize-10).x]);
		addToArray(touching.tiles, floor[coordToGrid(x+gridSize-10, y+gridSize-10).y][coordToGrid(x+gridSize-10, y+gridSize-10).x]);
		return touching;
	}	

	var coordToGrid = function(x, y) {
		var grid = {};
		grid.x = Math.round((x-gridSize/2)/gridSize);
		grid.y = Math.round((y-gridSize/2)/gridSize);
		return grid;
	}

	var addToArray = function(array, obj) {
		if(array.indexOf(obj)==-1) 
			array.push(obj);
	}

	var cyclePlayer = function() {
		aiEntities.push(player.getAI());		
		player.setAI(aiEntities.shift());
	}

	return {
		init: init,
		victory: victory,
		death: death,
	}
}();