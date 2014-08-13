// our view for an individual todo model/object

app.TodoView = Backbone.View.extend({
	tagName: 'li',

	template: _.template( $('#item-template').html() ),

	events: {
		'dblclick label': 'edit',
		'keypress .edit': 'updateOnEnter',
		'blur .edit': 'close'
	},

	// the todo view listens for changes to its associated model
	// and rerenders upon change.
	// there is a one-to-one correspondence between a Todo and a TodoView,
	// so we directly set TodoView to listen to Todo.

	initialize: function() {
		this.listenTo(this.model, 'change', this.render);
	},

	// rerenders the title of a todo
	render: function() {
		this.$el.html( this.template( this.model.attributes ) );
		this.$input = this.$('edit');
		return this;
	},

	// sets the view into "editing" mode, displaying input field.
	edit: function() {
		this.$el.addClass('editing');
		this.$input.focus();
	},

	close: function() {
		var value = this.$input.val().trim();

		if (value) {  // if the value isn't an empty string
			this.model.save({title: value});
		}

		this.$el.removeClass('editing');  // remove .editing from the element
	},

	// on hitting the enter key, editing is complete
	updateOnEnter: function(e) {
		if (e.which === ENTER_KEY) {
			this.close();
		}
	}
});