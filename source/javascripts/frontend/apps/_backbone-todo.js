// define a Todo model

var Todo = Backbone.Model.extend({
	defaults: {
		title: '',
		completed: false
	}
});

// instantiate the model, oh okay

var myTodo = new Todo({
	title: 'New Todo'
});

var TodoView = Backbone.View.extend({
	tagName: 'li',

	// reference to the todo item template
	todoTpl: _.template( $('#item-template').html() ),

	// events
	events: {
		'dblclick label': 'edit',  // call edit function when label element is double clicked
		'keypress .edit': 'updateOnEnter',  // call updateOnEnter function when a keypress is detected within an .edit class
		'blur .edit': 'close'  // call close function when blur happens on .edit, idk what blur is
	},

	// initializer
	initialize: function() {
		_.bindAll(this, 'render', 'edit', 'close', 'updateOnEnter');
		this.$el = $('#todo');  // the element associated with the entire application
		this.render();
	},

	render: function() {
		this.$el.html(this.todoTpl(this.model.attributes));
		this.input = this.$('.edit');  // set the input for this as the result of the '.edit' jquery search
		return this;  // for chaining
	},

	edit: function() {
		// executed when label is dblclicked
	},

	close: function() {
		// when todo loses focus
	},

	updateOnEnter: function() {
		// stuff
	}

});

var todoView = new TodoView({model: myTodo});