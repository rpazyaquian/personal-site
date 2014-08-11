(function($) {

	// today we're going to talk about modelssssss
	// ie stuff what changes and is controlled by input.

	// typically, a model is a singular item, many of which will be used in the application.
	// a model is a kind of data structure, holding together various properties.
	// it generally does not define a one-off instance of data.
	// so, a Jet model doesn't make much sense.
	// make a model a KIND of object, e.g. a class.

	// models are typically accompanied by a collection, a grouping of multiple identical models.
	// a good way to think of a collection is to think in term of plurals.
	// if you have a model named User, for example,
	// its matching collection would be Users.

	// you then typically want a view of that model,
	// and a view for that collection.
	// i.e., "what does an item look like?"
	// and "what does a collection of items look like?"

	// so each model has a view.
	// each controller has a view.

	// lets try implementing this.
	// let's try...users.

	// declare User model.
	var User = Backbone.Model.extend({
		defaults: {
			username: "admin",
			password: "password"
		}
	});

	// declare the View for a User model.

	var UserView = Backbone.View.extend({
		tagName: 'li',  // name of the root tag for a User within this.el
		
		initialize: function() {  // yup, this needs an initializer too!
			_.bindAll(this, 'render'); // bind every function to this etc.
		},

		render: function() {  // okay, let's define how to render a User.
			$(this.el).html('Username: <span class="backbone-username">'+this.model.get('username')+'</span>, Password: <span class="backbone-password">'+this.model.get('password')+'</span>');
			return this;  // for chaining (e.g. render().el)
		}

	});

	// declare User collection, Users.
	var Users = Backbone.Collection.extend({
		model: User  // Users is a Collection of User models. <collection name> is a Collection of <model name> models.
	});

	// now we want to make a view for our collection.
	// cause we want to display our list of users.
	// so, a view has an associated element, events and callbacks,
	// initialization function, render function,
	// and user-implemented methods.

	var UsersView = Backbone.View.extend({
		el: $('#backbone-models'),  // the element where you want the entire view to apply
																// must include everything that an event watches!
		events: {
			// let's say we want a button that adds a new user.
			// 'click #models-submit' - i'm switching to ids for javascript
			// purposes...since styles can be used anywhere.
			'click #models-submit': 'addUser'
		},

		// now create an init
		initialize: function() {
			_.bindAll(this, 'render', 'addUser', 'appendUser');  // remember to implement both addUser and appendUser

			console.log('i really need a debugger');

			this.collection = new Users();
			this.collection.bind('add', this.appendUser);  // bind 'add' and `this.appendUser` to the collection...?

			this.counter = 0;
			this.render();

			// so, when this view is instantiated:
			// 1. this view has `this`, render(), addUser(), and appendUser() bound to it
			// 2. this view's collection is a new instance of the collection Users()
			// 3. the event 'add' is bound to this collection, with the callback being appendUser()
			// 4. the view starts a counter at 0
			// 5. the view renders itself

			// so, what is addUser and appendUser?
			// what are we doing binding something to a collection?
			// well, we want our collection to change when an event happens, right?
			// aside from just the view changing
			// so we want to say, "add something to our collection
			// when this happens, by which i mean call appendUser() when
			// the 'add' event occurs"
			// the 'add' event refers to whenever this.collection.add is called.
		},

		render: function() {  // remember to implement render()!
			var self = this;  // scoping issues, i kinda hate how weird this is in JS

			$(this.el).append('<ul></ul>');  // create an unordered list
			_(this.collection.models).each(function(user) {  // on each model/user in the collection,
				self.appendUser(user);   // call self.appendUser(<model/user>) (`this` cant be used this deep)
				// btw with stuff like .each() you should be passing in an anonymous function
				// consider it something like `do` in ruby
			}, this);
		},

		// now lets implement addUser
		// the behavior when a user is added is something like this:
		// 1. increase the counter
		// 2. instantiate a new user
		// 3. set the parameters for the new user
		// 4. add the user to the collection ( this.collection.add() )

		addUser: function() {
			this.counter++;
			var user = new User();

			user.set({
				username: 'hello',
				password: 'world'
			});

			this.collection.add(user);
		},

		// appendUser: function(user) {
		// 	$('ul', this.el).append('<li>Username: '+user.get('username')+'</li><li>Password: '+user.get('password'));
		// }

		// ^ fuck that shit, it's gross as hell!
		// let's separate the User rendering logic out to its own thing.

		appendUser: function(user) {
			var userView = new UserView({
				model: user  // when instantiating a view (as opposing to defining a new class)
										 // you have to do this for whatever reason blah.
			});
			$('ul', this.el).append(userView.render().el);  // to the <ul> within usersView,
																											// append the result of userView.render()
																											// (which would be two spans within an li element)
		}

	});

	var usersView = new UsersView;

})($);


// so, what have we learned?

// models are data structures that hold properties.

// collections are groups of models, all of the same kind.
// (collections have some events associated with them.)

// views are where the majority of the program logic resides.
// views govern the rendering of data,
// display initialization, events and callbacks,
// and implementation-specific logic
// (e.g. adding a new model to a collection,
// and then rendering that model to the view)

// so if i have more than one data models i want to display,
// the best thing to do is to create a collection to hold them
// and create a view to display that collection.

// that's not too complicated at all, actually.