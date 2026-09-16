# Prime Multiplication Table

A small CLI tool that prints a multiplication table for the first N prime numbers.

## Requirements

Node 18 or later, since the built-in test runner needs it. Built and tested on v20.20.2. No npm packages to install, it's plain ESM Node.

## Usage

Give it a number on the command line:

```
node index.js 4
```

```
    2  3  5  7
--------------
 2  4  6 10 14
 3  6  9 15 21
 5 10 15 25 35
 7 14 21 35 49
```

If you don't pass a number, it'll ask you for one instead:

```
node index.js
Enter N: 4
```

Type something that isn't a whole number of 1 or more and it prints an error and exits with a non-zero code instead of crashing or printing garbage. Same behaviour whether you passed the number as an argument or typed it in.

## Running tests

```
npm test
```

or just

```
node --test
```

To see coverage:

```
node --test --experimental-test-coverage
```

Currently 16 tests, all passing, 100% line/branch/function coverage, but only across `primes.js`, `grid.js`, and `formatTable.js`. `index.js` isn't covered by the test suite since it's the part that touches `process.argv` and `readline`, and I didn't get to writing tests for that (see "what I'd do with more time").

## Project structure

```
prime-tables/
├── index.js            CLI entry point, wires everything together
├── src/
│   ├── primes.js       isPrime, generatePrimes
│   ├── grid.js          builds the N×N grid of products
│   └── formatTable.js  turns primes + grid into a printable string
└── test/
    ├── primes.test.js
    ├── grid.test.js
    └── formatTable.test.js
```

## A few design notes

I split things up so the actual logic (`primes.js`, `grid.js`, `formatTable.js`) doesn't touch any I/O at all, no console, no stdin, nothing. That's what made them easy to test with plain `assert.deepStrictEqual` calls. All the messy stuff, reading `process.argv`, prompting with `readline`, printing, lives in `index.js` and only there.

`isPrime` only checks divisors up to `√n` instead of all the way to `n`, since any factor bigger than `√n` would have to pair with one smaller than `√n`. If nothing smaller divides it, nothing bigger will either.

One thing worth calling out: in `formatTable` I could have just used the widest product as the column width instead of checking both primes and products. Products are always bigger than or equal to their factors, so it would work fine for this specific case. I didn't do that on purpose. It only works because of something true about primes specifically, and I didn't want `formatTable` to quietly depend on that. Checking both costs one extra loop and keeps the function correct for whatever it's actually given, not just correct by coincidence for this one use.

## What I'm pleased with

Catching the coverage gap in `formatTable.js` and actually understanding why it was there, rather than just writing a test to make the percentage go up. The gap was specific: no test exercised a product wider than any prime, so that branch in the maxWidth loop never ran. Once I saw that, picking `[7, 11]` (where 121 is three digits wide but no prime is) wasn't a random guess, it directly targeted the untested branch. That felt different from padding out coverage for its own sake.

The pure function / I/O split. Keeping `primes.js`, `grid.js`, and `formatTable.js` completely free of any console or stdin calls is why they were so easy to test with plain `assert.deepStrictEqual`, no mocking, no setup. It also made the one place that does need I/O, `index.js`, obvious and small by comparison, rather than tangled through everything.

Actually understanding the readline callback timing, not just getting it to work. `answer` only exists once the user has typed something and hit enter, so anything that depends on it has to live inside that callback. It's the same shape of bug as reading a variable before it's assigned, just async instead of synchronous, and it clicked properly rather than being something I copied without thinking about why.

## What I'd do with more time

Test `index.js` properly. Right now it's the one file with zero coverage, and that's a real gap, not a cosmetic one, since it's where user input actually enters the program. The fix I'd want is pulling `isValidCount` and the argv-vs-readline branching apart from the actual `console.log`/`readline` wiring, so the decision logic can be unit tested directly, and only the thin I/O shell is left untested (or tested separately by spawning the script as a child process and asserting on stdout).

Exploit the grid's symmetry. `buildGrid` currently computes every cell, including the ones below the diagonal that just mirror ones above it, which is wasted work that gets worse as N grows. For a large table it would be worth only computing the upper triangle and mirroring it into the rest.

CI running the test suite on every push, so a broken test can't sit unnoticed between commits. Right now it's on me to remember to run `node --test` before pushing, which doesn't scale past a solo project.
