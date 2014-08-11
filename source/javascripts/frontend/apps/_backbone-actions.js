// i'm gonna move some stuff out of the jquery ondom thing.

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
	
	// let's add some event callbacks to our User view.
	events: {
		'click #actions-swap': 'swap',  // tie a click on <span class='swap'>
																// to the swap() function
		'click #delete': 'delete'
	},

	initialize: function() {  
		_.bindAll(this, 'render', 'unrender', 'swap', 'remove'); // bind every function to this etc.
		
		this.model.bind('change', this.render);  // on 'change' event, call render()
		this.model.bind('remove', this.render);  // rerender on 'remove' event
	},

	render: function() {  
		$(this.el).html('Username: <span class="backbone-username">'+this.model.get('username')+'</span>, Password: <span class="backbone-password">'+this.model.get('password')+'</span>');
		return this;  
	}

});

// declare User collection, Users.
var Users = Backbone.Collection.extend({
	model: User  
});

var UsersView = Backbone.View.extend({
	el: $('#backbone-actions'),
	events: {
		'click #actions-submit': 'addUser'
	},

	initialize: function() {
		_.bindAll(this, 'render', 'addUser', 'appendUser');

		this.collection = new Users();
		this.collection.bind('add', this.appendUser);

		this.counter = 0;
		this.render();
	},

	render: function() { 
		var self = this;

		$(this.el).append('<ul></ul>');
		_(this.collection.models).each(function(user) { 
			self.appendUser(user);
		}, this);
	},

	addUser: function() {
		this.counter++;
		var user = new User();

		user.set({
			username: 'hello',
			password: 'world'
		});

		this.collection.add(user);
	},

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

// end


(function($) {

	// alright, we can add stuff to a collection.
	// what about other actions?
	// like deleting?

	// let's modify our code from last time.

	Backbone.sync = function(method, model, success, error){  // what the fuck?
		success();  // "Backbone.sync: Overrides persistence storage with dummy function.
								// This enables use of Model.destroy() without raising an error."
	}

	var usersView = new UsersView;

})($);