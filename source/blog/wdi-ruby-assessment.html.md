---
title: WDI - Ruby Assessment
---

# WDI - Ruby Assessment

(Note: There's some weird formatting going on with the code blocks. I have no idea why this is happening.)

### Print out all the numbers from 1 to 100.

Answer:

	(1..100).each { |n| puts n }

### Write a method called greet that takes a person's name as an argument and returns (not prints) "Hello" plus that person's name (i.e. greet("You") ==> "Hello You!").

Answer:

	def greet(name)
		"Hello #{name}!"
	end

	greet("Rebecca")  # "Hello Rebecca!"

### Write a method called double that takes a number num as an argument and returns two times the value of num.

Answer:

	def double(num)
		2*num
	end

	double(10)  # 20
	double(20)  # 40

### Write a method called is_even? that takes a number num as an argument and returns true if it is even and false otherwise.

Answer:

	def is_even?(num)
		if num % 2 == 0
			true
		else
			false
		end
	end

	is_even?(10)  # true
	is_even?(3)  # false

### Write fizzbuzz.

Answer:

	# is this meant to be inclusive or exclusive (i.e. 1 to x-1, or 1 to x?)
	
	def fizzbuzz(x)
		(1..x).each do |x|
			if x % 3 == 0 and x % 5 == 0
				puts "fizzbuzz"
			elsif x % 5 == 0
				puts "buzz"
			elsif x % 3 == 0
				puts "fizz"
			else
				puts x.to_s
			end
		end
	end

	fizzbuzz(16) =>  # 1, 2, 3 ... 16
		1
		2
		fizz
		4
		buzz
		fizz
		7
		8
		fizz
		buzz
		11
		fizz
		13
		14
		fizzbuzz
		16

### Create an array with five different names in it: "Tom", "Alex", "Denise", "Phillip", and "Claire". Then, modify the array to replace "Phillip" with "Michael".

Answer:

	array = ["Tom", "Alex", "Denise", "Phillip", "Claire"]
	array[3] = "Michael"
	array  # ["Tom", "Alex", "Denise", "Michael", "Claire"]

### Create a hash with all of the following key/value pairs:

Answer:

	{tom: "Jerry", peanut_butter: "Jelly", lucy: "Ethel", batman: "Robin", asterix: "Obelix"}

## Define a Ruby class called 'Dog', with a method called bark that returns the string "WOOF"; then, create an new instance of 'Dog' and call its bark method.

Answer:

	class Dog
		def woof
			"WOOF"
		end
	end

	dog = Dog.new
	dog.woof  # "WOOF"