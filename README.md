# Paint shop coding exercise

Here you will find my solution for the 'Paint shop coding exercise'. I decided to write the solution in node since I am most familiar with JS (and also the job posting requires the candidate to have knowledge of node so this made sense).

## Set up

It is assumed that the system running the test suite for my code will have node installed. If this isn't the case, please visit https://nodejs.org/en/download to install it. 

If the system has node installed, simply:

1. Clone the git repository
2. Run the program by passing input (see below)

## Passing input

As I wasn't entirely sure how the test suite will be calling my program with stdin, this program was built to be able to handle input by two different methods, as shown in the examples below.

Method 1 - line by line where <CTRL-D> represents EOT:
```
node paint.js
2
1 G 2 M
1 M
<CTRL-D>
```

Method 2 - piping a String with '\n' as a line terminator:
```
echo "2\n1 G 2 M\n1 M" | node paint.js
```
