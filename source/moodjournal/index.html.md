---
title: Mood Journal
---

# Mood Journal

This is something a friend and I were thinking about.

As a way of becoming more familiar with MVC frameworks, I've decided to start a simple MVC-based application. My friend suggested to me that I start a Mood Journal application.

A Mood Journal is a journal where you keep track of your feelings throughout each day. For example, you feel sad - so you write in your Mood Journal, "right now I feel sad.". That's a Mood Entry. A Mood Journal is a collection of all these Mood Entries.

A Mood Entry itself is basically a short description, a date-time stamp, and a "Mood". The short description is a very short, ~140 character-limited blurb about how you curently feel. The date-time stamp is self-explanatory, it's a way of tracking how you felt at X time of day. The "Mood" is a little bit more complicated, and might merit its own model.

What is a Mood? A Mood has a name, e.g. "happy", "sad", "angry". Maybe those might even be larger categories - you can feel "glad", "peaceful", "dreamy", which might all be variations of "happy". A Mood might also have an intensity or at least some sort of numerical value associated with it - a sort of "strength" of how strongly you felt that emotion at that point in time. Maybe a Mood has a color, too? Is that color related to categories?

How about an Energy model? It might be another component of a Mood Entry where you can also keep track of your energy level throughout a day, week, month, etc. This could be a flat numerical scale - "I feel exhausted, I'm like a 1 on energy". Or maybe that should be a property tied to Mood Entry? Since all I can really think of is an integer to represent it. Hmmm...yeah, maybe I'll make an Energy model too.

I also need to think about defining behavior. Let me figure that out once I've implemented a view/template, though.

## WUH OH

I may need to rethink my approach. Does a Mood really deserve a model of its own? Do I really have a need to store each Mood every user makes in its own database? Can't I just iterate over each Mood Entry and say, "get me the mood and the intensity from X date to Y date"?

In fact, what ARE moods?

Okay, a mood is a particular emotional state.
A mood has a "what" (happy, angry, sad), and a "how much"(very, somewhat, a little).
I think I can do something like, the description of an entry describes the "what", and the mood intensity describes the "how much".

I think I'm getting too abstract with defining a mood. For now, I'm going to stay simple:

A Mood Journal has many Mood Entries.
A Mood Entry has a description, a datetime, and a mood intensity.
The description is "What are you feeling?"
The intensity is "How intense is this feeling?"
The intensity scale would basically be "how do you feel on a scale of 1 to 10?"
I'm not sure if this would be "Bad: 1, Good: 10" or something.

So a sample mood entry would be:

"I'm sick of my parents bugging me!"
Mood: 2

...does that make any sense?
Here's the thing: regardless of whether you're jumpy, lethargic, or pissy, if you feel bad, you feel bad.
So, should the scale focus on determining whether your mood is pleasant or unpleasant?

All I want to know is, sometimes I feel like shit, and sometimes I feel pretty great. I like feeling pretty great, and I do not like feeling like shit. I want to know what makes me feel like shit so I can avoid it, and what makes me feel pretty great so I can do more of that. I think that if I can record my thoughts alongside whether I feel pretty great or like shit, then I can identify what makes me feel pretty great or like shit.

In that case, do I even need a graph?

What is this tool even FOR?

---

# Gems I'll Need

Devise
Haml-Rails (or maybe slim?)
Ember-Rails (what's the deal with the ember:install and all that?)
Emblem-Rails (for Ember templates)

---

# Defining Models

So, for now, let's define our top three models:

MoodJournal:
has_many MoodEntry
belongs_to User

MoodEntry:
has_a description String (charlimit: 140-240?)
has_a datetime Datetime
has_a Mood
has_an Energy

Mood:
has_a name String(? or will we be going by categories?)
has_an intensity Integer

Energy:
has_a name String
has_an intensity Integer

We will also have to define Users.
This implies implementing a User model, as well as Sessions!
Maybe I'll use Devise?

User:
has_a username String
has_a passwordhash String
has_a MoodJournal

## WUH OH 2

Hey, should I really be making individual Mood/Energy models? Should they 

-----

# Notes and Conversations

mood journal? you make entries every so often (either at will or at intervals) and you can bring up your past stuff on like, a graph or some other visual display

mood journal huh
so it's like a blog, but with statistics?
and you can be like, "oh my mood is like a 7 today"

Yeah
or you can choose from preset moods (happy, sad, etc), or fill in your own
you could use a numerical ranking system or something color-based or etc

hmmmm

regarding a journal part, my suggestion would be to keep it short. You've got, idk, 240 characters to sum up how you feel at this minute/hour/day/etfc
-f

so a mood journal would consist of multiple mood entries
?
and for a mood entry
it'd consist of a mood and a description
you have, let's say, a body - the 240 character limit - the mood (on a scale like you mentioned?), and the date and time
ok

and i guess yeah the date and time
like im thinking of this in terms of data models

It'd be like, if Twitter had the function that facebook has where you can tag how you're feeling or hwat you're eating or etc

aye, yeah, that's the impression i got 
rite
cause thats how everything works
and im fucked if i dont start from the ground up D:
so the pieces of the mood journal would be
1. your MoodJournal, which is basically: an array of MoodEntries
2. a MoodEntry, which has the following fields:

datetime, mood, "explanation"/"description"/whateverothertermyouwannause
1) a text area for current mood and feelings, 2) a mood, which might be a data model of its own, 3) a datetime
right
what is a mood?
like, what would its structure be
i know what a mood is 
like, a mood would have a name - "happy" or "sad" or "angry"
but we want statistics, and we want to be able to chart it

hm
what exactly are we charting, though? highs and lows? how many times you felt sad in a day, how many times you felt happy?

it's up to you but
rite rite
you have good ideas tho, i figured id bounce it off of you

maybe a name, a color (actually maybe not b/c colorblind idk)

as well as a general feeling?

so you might be feeling tired but happy

or you might be excited about a concert but still feeling down

or maybe you could rank like,

have a mood scale, and an energy scale, and etc
hmmmm

so im feeling good but worn out

energy vs. mood sounds interesting

or im feeling ok but im zooming around the house
there might be other relevant "scales" that aren't coming to my mind

what do you think this mood journal could help with?
like, what would you want out of a mood journal?

Keeping track of your mood can be really important in terms of understanding what makes you feel good and what doesn't, keeping tabs on mental/emotional problems,

It's also really nice to look back through recent times where you were feeling great if you need a pick-me-up

right
so i can look back and be like, huh. i was feeling pretty good for a couple days, but now that it's monday, my mood has tanked.

yeah

and the microblogs/whatever could shed some light on why you're feeling that way

plus you could set it up so that it polls you every hour or two hours or whatever, only during certain parts of the day, etc

hmm, iunno about being kept to a schedule. the thing about twitter and social media is that its freeform and entirely self-directed.

yeah but it's also nice to have reminders
like: you may not like the idea, but some would find it useful

for me, not having it could very well mean i never remember to plot my moods, or only do so when i'm feeling especially moody
skewing the results

thats a good point
okay, i can add that as an option
this mood journal can also poll you at a specific (or random!) time to ask you how you're feeling, in order to get unbiased sampling.
alright, that's some cool behavior

yeah
how am i feeling at the end of my school/work day
how am i feeling at the start
how am i feeling randomly

cool. these times can be set, or random, im guessing?