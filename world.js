var world = function() {	
	var ctx;

	var aiEntities = [];
	var trail = [];
	var player;

	var floor = [];
	var width, height, sizeX, sizeY;
	var gridSize;

	var curLevel;
	var canvas;
	var tip;

	var intervalId;

	var fps = 30;

	var hitSpace = false;

	var init = function(level, canvasId, tipId) {
		canvas = document.getElementById(canvasId);
		tip = document.getElementById(tipId);
		initLevel(level);
	}

	var initLevel = function(level) {
		curLevel = level;

		if(level==levels.length) {
			alert("That's all folks!");
			clearInterval(intervalId);
			return;
		}

		// inits level, restarts game
		if(intervalId)
			clearInterval(intervalId); //makes sure we don't run dual loops
		nextLevel = level+1;

		tip.innerHTML = levels[level].tip;
		input.init();
		console.log(input.keys);
		if (canvas.getContext) {
			ctx = canvas.getContext("2d");
			width = canvas.width;
			height = canvas.height
			ctx.clearRect(0, 0, width, height);
			sizeX = levels[level].sizeX;
			sizeY = levels[level].sizeY;
			gridSize = width/sizeX < height/sizeY ? width/sizeX : height/sizeY;
			console.log(gridSize);
			loadLevel(level);

			intervalId = setInterval(run, 1000 / fps);
			run();
		}
	}

	var victory = function() {
		alert("You win!");
		initLevel(curLevel+1);
	}

	var death = function() {
		alert("You died! :O");
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
		draw();
	}	

	var update = function() {
		var keyUp = true;
		var prevX = player.x;
		var prevY = player.y;
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

		for(var i=0; i<aiEntities.length; i++) {
			aiEntities[i].onUpdate(gridSize);
			var touchingTiles = collide(aiEntities[i]).tiles;
			for(var j=0; j<touchingTiles.length; j++) {
				aiEntities[i].onCollide(touchingTiles[j]);
				touchingTiles[j].onCollide(aiEntities[i]);
			}
		}

		var touchingTiles = collide(player).tiles;
		for(var i=0; i<touchingTiles.length; i++) {
			if(touchingTiles[i].id==1) {
				player.x = prevX;
				player.y = prevY;
			}
			else {
				touchingTiles[i].onCollide(player);
			}
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
			if (trail.length >= 3)	trail.shift();
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
		// ai.x = (Math.round(ai.x / gridSize) - 0.5) * gridSize;
		// ai.y = (Math.round(ai.y / gridSize) - 0.5) * gridSize; 
	}

	var collide = function(ai) { 
		var touching = {
			tiles: [],
			ai: [],
		}
		gridX = (ai.x - gridSize/2)/gridSize;
		gridY = (ai.y - gridSize/2)/gridSize;
		if(gridX<0)
			gridX=0;
		if(gridX>sizeX-1)
			gridX=sizeX-1;
		if(gridY<0)
			gridY=0;
		if(gridY>sizeY-1)
			gridY=sizeY-1;
		touching.tiles.push(floor[Math.floor(gridY)][Math.floor(gridX)])

		if(ai.x%gridSize!=0) 
			touching.tiles.push(floor[Math.floor(gridY)][Math.ceil(gridX)])
		if(ai.y%gridSize!=0)
			touching.tiles.push(floor[Math.ceil(gridY)][Math.floor(gridX)])
		if(ai.x%gridSize!=0 && ai.y%gridSize!=0)
			touching.tiles.push(floor[Math.ceil(gridY)][Math.ceil(gridX)])
		
		return touching;
	}

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