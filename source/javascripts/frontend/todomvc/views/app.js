// now lets define the view for the entire application.
// meaning, the view for the Todo Collection.

var app = app || {};  // namespacing

// AppView is our top UI

app.AppView = Backbone.View.extend({

	// bind AppView to the #todoapp ID, and therefore to our HTML skeleton
	el: '#todoapp',

	// the statistics template supplied at the bottom of the page.
	statsTemplate: _.template( $('#stats-template').html() ),

	// events!

	events: {
		'keypress #new-todo': 'createOnEnter',
		'click #clear-completed': 'clearCompleted',
		'click #toggle-all': 'toggleAllComplete'  // ughhhh this is gonna be a huge app isn't it.
	},

	// okay, we're initializing THIS view!
	// ...oh dear. this is gonna suck.
	initialize: function() {  // we're gonna be binding a whole bunch of stuff to our collection!!! yayyyyyy ugh
		this.allCheckbox = this.$('#toggle-all')[0];  // the #toggle-all checkbox is know as the allCheckbox to the view.
		this.$input = this.$('#new-todo');  // jquery alias for the new todo input element
		this.$footer = this.$('#footer');  // jquery alias for footer
		this.$main = this.$('#main');  // i think you get it by now

		this.listenTo(app.Todos, 'add', this.addOne);  // so, why are we using listenTo here?
		this.listenTo(app.Todos, 'reset', this.addAll)  // no idea if i wouldn't have known to use this if i was on my own here...
		// anyway: the view listens to the app.Todos collection for its 'add' event, and calls view.addOne() as a trigger.
		// repeat for the 'reset' event.
		// this ties the state of the view to the state of the collection.

		this.listenTo(app.Todos, 'change:completed', this.filterOne);  // when a Todo is set to completed, call filterOne (what is that)
		this.listenTo(app.Todos, 'filter', this.filterAll);  // on the collection's filter event, call filterAll (what)
		this.listenTo(app.Todos, 'all', this.render);  // on the collection's all event, call render (ok)

		app.Todos.fetch();  // ???????
	},

	render: function() {  // HOORAYYYYYYYYYYYYY MORE STUFF
		var completed = app.Todos.completed().length;
		var remaining = app.Todos.remaining().length;

		if ( app.Todos.length ) {  // oh god
			this.$main.show();
			this.$footer.show();  // what is show() what

			this.$footer.html(this.statsTemplate({
				completed: completed,  // ok so pass completed and remaining into the stats template.
				remaining: remaining
			}));

			this.$('#filters li a')  // umwhat
				.removeClass('selected')
				.filter('[href="#/' + ( app.TodoFilter || '' ) + '"]')  // you know what, i'll just take your word for it.
				.addClass('selected');
		} else {
			this.$main.hide();  // hide stuff when the list is empty i guess
			this.$footer.hide();
		}

		this.allCheckbox.checked = !remaining;

		// eugh, logic.
		// it's not so bad if i knew what i was trying to do,
		// but just copying logic into a file without knowing what's going on
		// bugs the hell out of me.
	},

	// so now we need to define addOne and addAll.
	addOne: function(todo) {  // so we're passing in a todo parameter...?
		var view = new app.TodoView({ model: todo });  // woah hey what?? what is TodoView. that doesnt exist yet
		$('#todo-list').append(view.render().el);
		// okay, so what this function does is
		// it instantiates a new view for the todo object it is passed
		// by passing in the todo parameter as an argument (i.e. {model: todo})
		// it then selects the #todo-list element, and appends the HTML rendering of the TodoView to it.
		// so basically, when a model is added to a collection,
		// the view creates a view for that specific model,
		// renders it, and adds the markup to the #todo-list element.
		// tl;dr: "render a new todo when it is added to the collection."
	},

	addAll: function() {  // hay guys whats going on in this thread???
		this.$('#todo-list').html('');  // ooooh. okay, so the todo list is wiped,
		app.Todos.each(this.addOne, this);  // and then the collection is rendered.
		// basically this is saying "rerender the entire collection upon a 'reset' event".
	},

	filterOne: function(todo) {
		todo.trigger('visible');  // this doesn't make sense until you look at the next function ---v
	},

	filterAll: function() {
		app.Todos.each(this.filterOne, this);  // this doesn't make sense until you look back at the previous function ---^
	},

	newAttributes: function() {  // i dont really have any more comments
		return {
			title: this.$input.val().trim(),
			order: app.Todos.nextOrder(),
			completed: false
		};
	},

	createOnEnter: function(event) {  // goddammit, is there a nicer way to organize this code? automate some of it? please?
		if ( event.which !== ENTER_KEY || !this.$input.val().trim() ) {  // oh my god
			return;
		}

		app.Todos.create(this.newAttributes() );
		this.$input.val('');

		// okay so basically if either it is not the enter key that is pressed, or the value is empty string,
		// don't make a new todo.
	},

	clearCompleted: function() {
		_.invoke(app.Todos.completed(), 'destroy'); 
		return false;  // oooookay.
	},

	toggleAllComplete: function() {  // make everything completed.
		var completed = this.allCheckbox.checked;

		app.Todos.each(function(todo) {
			todo.save({
				'completed': completed
			});
		});
	}

});