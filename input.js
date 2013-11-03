var input = {
	right: 39,
	up: 38,
	left: 37,
	down: 40,
	space: 32,
	keys: [],
	init: function() {
		window.addEventListener('keydown',this.keyDown,false);
		window.addEventListener('keyup',this.keyUp,false);
		for(var i=0; i<128; i++)
			input.keys.push(false);
	},
	keyDown: function(e) {
		var code = e.keyCode;
		input.keys[code] = true;
		return false;
	},
	keyUp: function(e) {
		var code = e.keyCode;
		input.keys[code] = false;
		return false;
	}
	
}