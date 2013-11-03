function Game(canvas) {
	c = document.getElementById(canvas);
	this.width = c.width;
	this.height = c.height;
	this.canvas = c.getContext('2d');
}

Game.prototype.drawSprite = function(sprite) {
	console.log(sprite);
	this.canvas.drawImage(sprite.image, sprite.x, sprite.y);
}

function Sprite(imgsrc, x, y, callback) {
	this.x = x;
	this.y = y;
	this.image = new Image();
	this.image.src = imgsrc;
	this.image.addEventListener("load", callback);
}

Sprite.prototype.translate = function(x, y) {
	this.x += x;
	this.y += y;
}