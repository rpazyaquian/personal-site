---
title: First Post
---

# First Post

Hello! This is the first post in my really really basic, not-dynamic-at-all implementation of a weblog using Middleman. All the posts are written in Markdown.

By the way, I'm a little confused on how I could use dynamic pages... I understand the whole "pass in a variable" thing:

	# omg why is this not indented
	# why is THIS indented
	# this is not supposed to be indented!!!!
	# or is it, i dont know!!!
	["tom", "dick", "harry"].each do |name|
	  proxy "/about/#{name}.html", "/about/template.html", :locals => { :person_name => name }
	end

...but am I seriously gonna be passing in all my post data that way? It sounds like a pain in the ass compared to just making a .md file. Also, what is with that alignment!? That looks really frickin weird.

Oh, and: yes, there's an official Middleman plugin for making a static blog. In my experience, though, going directly to a plugin without trying to understand the workings behind it (and ideally trying to implement it myself) just makes me completely lost. I'll refactor this site to use that sometime.