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

	// declare User collection, Users.
	var Users = Backbone.Collection.extend({
		model: User  // Users is a Collection of User models. <collection name> is a Collection of <model name> models.
	});

	

})($);
