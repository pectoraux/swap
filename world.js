var world = function() {
	var aiEntities = [];
	var trail = [];
	var player;
	var vx = 0;
	var vy = 0;
	var friction = 1.25;

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
		vx = 0;
		vy = 0;
		curLevel = level;
		trail.length = 0;
		if(level==levels.length) {
			alert("That's all folks!");
			clearInterval(intervalId);
			return;
		}

		// inits level, restarts game
		if(intervalId)
			clearInterval(intervalId); //makes sure we don't run dual loops
		nextLevel = level+1;

		input.init();
		renderer.initLevel(levels[level]);
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
		renderer.draw(trail, player, aiEntities, floor);
	}	

	var update = function() {
		trail.push([player.x, player.y]);
		if (trail.length >= 5) trail.shift();

		var keyUp = true;
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

		if(!hitWall) { //don't be that guy who drifts into the wall
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
		}



		for(var i=0; i<aiEntities.length; i++) {
			aiEntities[i].onUpdate(gridSize);
			var touchingTiles = collide(aiEntities[i]).tiles;
			for(var j=0; j<touchingTiles.length; j++) {
				aiEntities[i].onCollide(touchingTiles[j]);
				if(touchingTiles[j].onCollide(aiEntities[i]))
					break;
			}
		}


		var touchingTiles = collide(player).tiles;
		var hitWall = false;
		for(var i=0; i<touchingTiles.length; i++) {
			if(touchingTiles[i].id==1) {
				hitWall = true;
			}
			else {
				touchingTiles[i].onCollide(player);
			}
		}
		if(hitWall) {
			vx *= -1;
			vy *= -1;
			player.x = trail[2][0] || player.x;
			player.y = trail[2][1] || player.y;
		}
		player.x += vx;
		player.y += vy;
	}

	// var toGrid = function(ai) { // rounds funny, seems to round down
		// perhaps due to the fact that circle is drawn from center of grid?
		// ai.x = (Math.round(ai.x / gridSize) - 0.5) * gridSize;
		// ai.y = (Math.round(ai.y / gridSize) - 0.5) * gridSize; 
	// }

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

	// var collide = function(ai) { 
	// 	var touching = {
	// 		tiles: [],
	// 		ai: [],
	// 	}
	// 	var gridX = (ai.x - gridSize/2+5)/gridSize;
	// 	var gridY = (ai.y - gridSize/2+5)/gridSize;
	// 	if(gridX<0)
	// 		gridX=0;
	// 	if(gridX>sizeX-1)
	// 		gridX=sizeX-1;
	// 	if(gridY<0)
	// 		gridY=0;
	// 	if(gridY>sizeY-1)
	// 		gridY=sizeY-1;
	// 	touching.tiles.push(floor[Math.floor(gridY)][Math.floor(gridX)])

	// 	if(ai.x%gridSize!=0) 
	// 		touching.tiles.push(floor[Math.floor(gridY)][Math.ceil(gridX)])
	// 	if(ai.y%gridSize!=0)
	// 		touching.tiles.push(floor[Math.ceil(gridY)][Math.floor(gridX)])
	// 	if(ai.x%gridSize!=0 && ai.y%gridSize!=0)
	// 		touching.tiles.push(floor[Math.ceil(gridY)][Math.ceil(gridX)])
		
	// 	return touching;
	// }

	var cyclePlayer = function() {
		aiEntities.push(player);		
		player = aiEntities.shift();
	}

	return {
		init: init,
		victory: victory,
		death: death,
	}
}();