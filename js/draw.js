var renderer = function() {
	var ctx;
	var gridSize;
	var width, height;
	var tipDisplay;

	var init = function(canvasId, tipId, level) {
		var canvas = document.getElementById(canvasId);
		tipDisplay = document.getElementById(tipId);
		ctx = canvas.getContext("2d");
		width = canvas.width;
		height = canvas.height;
	}

	var initLevel = function(level) {
		tipDisplay.innerHTML = level.tip;
		var sizeX = level.sizeX;
		var sizeY = level.sizeY;
		this.gridSize = width/sizeX<height/sizeY ? width/sizeX : height/sizeY;
		ctx.clearRect(0, 0, width, height);
	}

	var draw = function(aiEntities, floor) {
		//iterate through and draw tiles first, then entities
		var gridSize = this.gridSize;
		ctx.globalAlpha = 1;
		ctx.strokeStyle = "rgb(0, 0, 0)";
		ctx.lineWidth = 0.2;
		for (var y = 0; y < floor.length; y++) {
			for (var x = 0; x < floor[y].length; x++) {
				ctx.fillStyle = floor[y][x].color;
				ctx.fillRect(x*gridSize, y*gridSize, gridSize, gridSize);
				ctx.strokeRect(x*gridSize, y*gridSize, gridSize, gridSize);
			}
		}
		for (var i = 0; i < aiEntities.length; i++) {
			ctx.globalAlpha = 0.65;
			ctx.fillStyle = aiEntities[i].color;
			// ctx.fillRect(aiEntities[i].x, aiEntities[i].y, gridSize-5, gridSize-5);
			ctx.beginPath();
			ctx.arc(aiEntities[i].x, aiEntities[i].y, gridSize / 2, 0, 2*Math.PI);
			ctx.fill();
		}
		ctx.globalAlpha = 1;
		var trail = player.trail;
		for (var i = 0; i < trail.length; i++) { 
			ctx.globalAlpha = 1 - ((trail.length - i) / trail.length);		
			ctx.fillStyle = player.color;
			// ctx.fillRect(trail[i][0], trail[i][1], gridSize-5, gridSize-5);

			ctx.beginPath();
			ctx.arc(trail[i][0], trail[i][1], gridSize / 2 - (trail.length - i), 0, 2*Math.PI);
			ctx.fill();
		}
		ctx.globalAlpha = 1;
		if (player) {
			ctx.fillStyle = player.color;
			// ctx.fillRect(player.x, player.y, gridSize-5, gridSize-5);

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

	var showDialogue = function(info) {
		ctx.fillStyle = "rgba(255, 255, 255, 0.75)";
		ctx.strokeStyle = "black";
		ctx.fillRect(width / 2 - 150, height / 2 - 150, 300, 300);
		ctx.strokeRect(width / 2 - 150, height / 2 - 150, 300, 300);
		ctx.fillStyle = "black";
		ctx.font = "bold 35px sans-serif";
		ctx.textAlign = "center";
		ctx.fillText(info, width / 2, height / 2);    
		ctx.font = "20px sans-serif";
		ctx.fillText("(Space to continue)", width/2, height/2+40);
                 
	}

	return {
		init: init,
		initLevel: initLevel,
		draw: draw,
		gridSize: gridSize,
		showDialogue: showDialogue,
	}
}();

