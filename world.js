var world = function() {	
	var c;

	var aiEntities = [];
	var player;

	var floor = [[]];
	var width, height;

	var initLevel = function(level, canvasId) {
		//restarts game
		var canvas = document.getElementById(canvasId);
		c = canvas.getContext("2d");
		var width = canvas.width;
		var height = canvas.height
		loadLevel(level);
		draw();
	}

	var loadLevel = function(index) {
		//loads level from level file
		var curLevel = levels[index];

		for(var x=0; x<curLevel.size; x++) {
			for(var y=0; y<curLevel.size; y++) {
				if(curLevel.tiles[x][y]<1)
					floor[x][y] = getTile(curLevel.tiles[x][y])
				else {
					if(x==curLevel.startX && y==curLevel.startY)
						player = getAI(x, y, curLevel.tiles[x][y]);
					else
						aiEntities.push(getAI(x, y, curLevel.tiles[x][y]))
				}
			}
		}
	}

	var getTile = function(id) {
		switch(id) {
			case 0:
				return new Tile("white");
			case 1:
				return new Tile("black");
		}
	}

	var getAI = function(x, y, id) {
		switch(id) {
			case -1:
				return new AI(x, y, "black")
			case -2:
				return new AI(x, y, "green")
		}
	}

	var draw = function() {
		//iterate through and draw tiles first, then entities
		physics(); //yes please recursion
	}

	var physics = function() {
		draw(); //mhm
	}

	var swapPlayer = function() {
		aiEntities.push(player);
		player = aiEntities.shift();
	}

	return {
		initLevel: initLevel,
	}
}();