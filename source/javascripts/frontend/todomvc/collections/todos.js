// let's define our todo list collection

var app = app || {};  // yep, this is here too!

// do note that this collection will make use of backbone-localstorage.
// it's separate from backbone, i.e. it's a dependency
// which is annoying, but i included a CDN link in the layout.
// so we should be golden.

var TodoList = Backbone.Collection.extend({  // new collection
	// this collection governs the Todo models.

	model: app.Todo,

	// this collection saves data to localstorage.

	localStorage: new Backbone.LocalStorage('todos-backbone'),

	// this collection has these functions:

	// return todos that are marked as complete.

	completed: function() {  // the completed property is a function that returns something, rather than a static property.
		return this.filter(function() {  // we pass in a function to filter out items...
			return todo.get('completed');  // ...based on whether completed is true or false.
		})
	},

	remaining: function() {
		return this.filter(function() {
			return this.without.apply(this, this.completed())  // makes use of the logic in completed() to avoid repetition of code
		});
	},

	// we want to keep the todo items in order.
	// since we can't rely on id or cid, we generate the
	// order number for the next item. 
	nextOrder: function() {
		if (!this.length) {  // if the collection is empty
			return 1;  // the order number of the next todo is 1.
		}
		return this.last().get('order') + 1;  // if not, then the order number of the next todo is the number of the most recent todo plus 1.
	},

	// this function is part of the Collection namespace
	// it is used to determine in what order todos are sorted
	// when using functions like completed and remaining
	// that return an array.
	// it's basically saying "order todos by their order number".
	comparator: function(todo) {
		return todo.get('order');  // returns an integer
	}

	// huh. we didn't initialize the collection here. i wonder why.

});

// create the global Todos collection
app.Todos = new TodoList();