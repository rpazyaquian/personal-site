// okay, now we start!

// first things first: define the Todo model.

var app = app || {};  // wtf is this? eh just remember to keep it in.

// Todo has a 'title' and 'completed' attributes.
// 'title': String
// 'completed': Bool

app.Todo = Backbone.Model.extend({  // namespacing!
	defaults: {
		title: '',  // should be self-explanatory by now
		completed: false
	},

	// add a 'toggle' function to the data model (why is this on the data model?)
	// hmm maybe it's so i can do like when button clicked --> `myTodo.toggle()`
	toggle: function() {
		this.save({  // okay, so toggle() saves the model with certain parameters:
			completed: !this.get('completed')  // save the model with completed as the opposite of its current setting. t->f etc
		});
	}

});

// now we need to define the collection that houses our Todos, the TodoList.