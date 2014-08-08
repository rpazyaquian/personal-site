(function($) {    // place code in a self-executing wrapper

	// first of all, make the View for our application.

	var EchoView = Backbone.View.extend({  // define our View
		el: $('#backbone-echo'),  // our entire View is in the body

		events: {  // a View that does something on render is all well and good, but we want it to have actions.
			// tie a browser event to the View here (e.g. when a certain button is clicked, when a certain key is pressed)
			'click .echo-submit': 'insertInput',  // when the input element with class .echo-submit is clicked,
																								// call the View's insertInput() function/method/whatever.
																								// this means that now, we have to define what insertInput() is.
		},

		initialize: function() {  // initialization function for View, non-UI logic goes here
			_.bindAll(this, 'render', 'insertInput');  // best practice: "fixes loss of context for 'this' within methods".
																								 // remember to include this. yes, i know, it's a pain to hafta remember it, but still.
																								 // also, something that's really annoying: remember to add every function you define aside from initialize to here!
			this.render();  // when instantiated, our View will render - make sure all Views you define have this!
		},

		render: function() {  // so our initialize() function calls render() on 'this', but what is render()?
													// render() will be code run whenever we want the View to render (update state).
		},

		insertInput: function() {
			// ...uh, okay, so what does insertInput do?
			// i want insertInput to change the text in this.el to the text supplied in .echo-input.

			$('.echo-text').text($('.echo-input').val());
		},


	});  // okay, so we've defined a View!

	// now we need to instantiate our View.
	// remember, we only just defined what is effectively a Class.
	// it's technically not, because Javascript is a prototypal language (which peeves me),
	// but pretend it is, okay?

	var echoView = new EchoView();  // instantiate a new EchoView object called echoView
																	// (yes, the name is repeated. it helps organize stuff. i don't know, just do that.)

})($);

