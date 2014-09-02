# 1.1

# hours in a year: 365 days * 24 hrs
hrs_per_year = 365 * 24
puts "There are #{hrs_per_year} hours in a year."

# minutes in a decade: hrs_per_year * min_per_hrs * 10
mins_per_hrs = 60
mins_per_decade = hrs_per_year * mins_per_hrs * 10
puts "There are #{mins_per_decade} minutes in a decade."

# my age in seconds: 24 y/o * hrs_per_year * mins_per_hrs * secs_per_min
age = 24
age_in_seconds = age * hrs_per_year * mins_per_hrs * 60
puts "I am #{age_in_seconds} seconds old."

# assuming it takes me about 15 seconds to eat a piece of Dove chocolate,
# and i live to about 80 years old (fat chance, if I'm eating that much chocolate):
choc_per_life = (80 * hrs_per_year * mins_per_hrs * 60) / 15
puts "I could conceivably eat #{choc_per_life} chocolates in my entire life."

# 1,031,000,000 sec * 1min/60sec * 1hr/60min * 1day/24hr * 1yr/365day
sec_to_year = 1031000000 / (60*60*24*365)
puts "1,031,000,000 seconds is #{sec_to_year} years."

# output:
# There are 8760 hours in a year.
# There are 5256000 minutes in a decade.
# I am 756864000 seconds old.
# I could conceivably eat 168192000 chocolates in my entire life.
# 1,031,000,000 seconds is 32 years.

puts "What is your first name?"
first_name = gets.chomp
puts "What is your middle name?"
middle_name = gets.chomp
puts "What is your last name?"
last_name = gets.chomp
puts "Hello, #{first_name} #{middle_name} #{last_name}."
puts "What is your favorite number?"
favorite_number = gets.chomp.to_i
puts "Don't you think #{favorite_number+1} would be a better choice?"