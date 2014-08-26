$ ->

	# OKAY

	# so right now, i've managed to get it to delete a new app.


	# define the models

	class JobApp extends Backbone.Model

		# describe the default fields
		defaults:
			title: "Typewriter Monkey"
			description: "Write Shakespeare. Eventually."
			company: "Globe Theatre"
			date: "10/20/2014"



	# define the collections

	class JobApps extends Backbone.Collection

		# JobApps is a collection of more than one JobApp
		model: JobApp



	# define the views


	# model's view

	class JobAppView extends Backbone.View

		tagName: 'tr'

		# don't forget to initialize.
		initialize: ->
			_.bindAll @

			@model.bind 'change', @render
			@model.bind 'remove', @unrender  # what is unrender?

		render: ->

			$(@el).append("
			<td>#{@model.get 'title'}</td>
			<td>#{@model.get 'description'}</td>
			<td>#{@model.get 'company'}</td>
			<td>#{@model.get 'date'}</td>
			<td class='edit'>edit</td>
			<td class='delete'>delete</td>
			")

			# return the view itself for chaining
			@

		unrender: ->
			$(@el).remove()

		remove: ->
			@model.destroy()

		events: ->
			# 'click .edit': 'edit'
			'click .delete': 'remove'


	# model's edit view

	class JobAppEditView extends Backbone.View

		tagName: 'tr'

		initialize: ->
			_.bindAll(@)

		render: ->

			$(@el).append("
			<td><input type='text'>#{@model.get 'title'}</input></td>
			<td><input type='text'>#{@model.get 'description'}</input></td>
			<td><input type='text'>#{@model.get 'company'}</input></td>
			<td><input type='text'>#{@model.get 'date'}</input></td>
			<td class='save'>save</td>
			<td class='delete'>delete</td>
			")

			@


	# collection's view

	class JobAppsView extends Backbone.View

		el: '#tracker'

		initialize: ->

			# we must bind all this view's methods to its initializer
			_.bindAll @  # `@` = `this`, so `bindAll(this);`

			# this view's collection is an instance of JobApps
			@collection = new JobApps
			@collection.bind 'add', @appendJobApp

			@render()

		render: ->

			# %section#tracker
			# 	%table
			# 		%tr
			# 			%th Job Title
			# 			%th Job Description
			# 			%th Company
			# 			%th Date Submitted
			# 	%button Add New Job App

			$(@el).append "<table class='tracker-display'><tr><th>Job Title</th><th>Job Description</th><th>Company</th><th>Date Submitted</th></tr></table>"
			$(@el).append "<button>Add New Job App</button>"


		appendJobApp: (app) ->

			jobAppView = new JobAppView model: app

			$('table').append jobAppView.render().el


		addJobApp: ->

			jobApp = new JobApp

			jobApp.set description: "I changed this in the addJobApp method!"

			@collection.add jobApp

		events: 'click button': 'addJobApp'



	# app setup.

	Backbone.sync = (method, model, success, error) ->

		success()

	# instatiate the view.

	jobAppsView = new JobAppsView