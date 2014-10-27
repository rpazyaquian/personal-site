# Personal Site

This is the application code for my own personal/professional website, where I keep my resume, portfolio, etc.

# Planned Sections

## About

A short introduction to who I am, what I have done, and what I am currently involved in.

## Resume

A resume drawn up in Markdown with a matching PDF/DOCX download. Consider figuring out a way to make the PDF dynamically generated from the current page.

## Portfolio

This is where links to my work and simple, proof-of-concept applications will be kept. The applications I want to include are:

* Stock Chart Generator
	A tool that generates a stock chart for a given symbol. Include an appropriate Javascript library.
* Job Application Tracker
	A tool for keeping track of what job applications you've submitted, how often you are submitting them, whether or not you've had an interview, and other statistics. Consider writing this in Ember, it should be simple.
* CHIP-8 Emulator
	A CHIP-8 (old games programming language) emulator, written in plain Javascript. Include some explanation to what that is.

# Controllers and Resources

Do I want to implement a basic authentication/authorization framework? On the one hand, it would show that I am capable of doing so - on the other hand, I am certainly not experienced enough to make it particularly impressive. Maybe I will avoid authentication for now - and have the Job App information stored in localstorage instead.

In that case:

## Job Tracker

I will need Ember to implement my Tracker application, so I will naturally need to include Ember as gem file. As such, the resources will be:

* Job Application
	Includes a job title, job description, company, offering, date submitted, whether or not you have sent a thank-you letter. JobApps controller, JobApp model, jobapp resource. Wait, if I'm not implementing authentication, should I bother making a Rails controller, since I'm not gonna be using the database? In that case, should I make something that DOES use the database?