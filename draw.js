var draw = function(ctx, trail, player, aiEntities, floor, gridSize) {
	//iterate through and draw tiles first, then entities
	ctx.globalAlpha = 1;
	for (var y = 0; y < floor.length; y++) {
		for (var x = 0; x < floor[y].length; x++) {
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