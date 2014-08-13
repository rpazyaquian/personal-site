// app.js is used to house central initialization code.

var app = app || {};
var ENTER_KEY = 13;

$(function() {
	// create the main app's view. this is where everything starts off.
	new app.AppView();

	app.Todos.create({ title: 'My first Todo item'});
});