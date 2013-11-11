var input = {
	right: false,
	left: false,
	up: false,
	down: false,
	reset: function() {
		input.right = false;
		input.left = false;
		input.up = false;
		input.down = false;
	},
	dialogueMode: function() {
		keypress.unregister_many(combos_inGame);
		keypress.register_many(combos_dialogue);
	},
	gameMode: function() {
		keypress.unregister_many(combos_dialogue);
		keypress.register_many(combos_inGame);
	},
};

combos_dialogue = [
{
	"keys": "space",
	"on_keyup": function() {
		//here you go Michael
	},
}
]

combos_inGame = [
{
	"keys": "up",
	"on_keydown": function() {
		input.up = true;
	},
	"on_keyup": function() {
		input.up = false;
	}
}, 
{
	"keys": "left",
	"on_keydown": function() {
		input.left = true;
	},
	"on_keyup": function() {
		input.left = false;
	}
},
{
	"keys": "right",
	"on_keydown": function() {
		input.right = true;
	},
	"on_keyup": function() {
		input.right = false;
	}
},
{
	"keys": "down",
	"on_keydown": function() {
		input.down = true;
	},
	"on_keyup": function() {
		input.down = false;
	}
},
{
	"keys": "space",
	"on_keyup": function() {
		world.cyclePlayer();
	},
},
];


