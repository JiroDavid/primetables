# Prime Multiplication Table

A small CLI tool that prints a multiplication table for the first N prime numbers.

## Requirements

Node 18 or later (the built-in test runner needs it). Built and tested on v20.20.2. No npm packages to install, it's plain ESM Node.

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

Currently 17 tests, all passing, 100% line/branch/function coverage across `primes.js`, `grid.js`, and `formatTable.js`. `index.js` isn't covered yet — it's the part that touches `process.argv` and `readline` (see "what I'd do with more time").

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

`primes.js`, `grid.js`, and `formatTable.js` don't touch any I/O. No console, no stdin. That made them easy to test with plain `assert.deepStrictEqual` calls. All the I/O, reading `process.argv`, prompting with `readline`, printing, lives in `index.js`.

`isPrime` checks n against the primes found so far, rather than every integer up to √n. Every composite number has a smallest prime factor, and that factor can't be bigger than √n, so testing n against primes up to √n is enough. Checking even numbers other than 2 was always redundant, since anything divisible by 4, 6, or 8 is already divisible by 2. `isPrime` now takes a second argument, `knownPrimes`, the array `generatePrimes` builds up as it goes, and loops over that instead of over every integer, stopping once a candidate prime's square exceeds n.

`isPrime` used to give a correct answer for any n on its own. Now it depends on `knownPrimes` containing every prime up to √n. Leave one out and it can wrongly call a composite number prime. `generatePrimes` always passes an accurate list, and the real code is fine as a result. It's still a genuine precondition, which I noted as a comment above the function for anyone calling it directly.

`formatTable` checks both primes and products when working out column width, even though products are always bigger than or equal to their factors and checking products alone would be enough. I left the primes check in on purpose: that shortcut only holds because of a fact specific to primes, and I didn't want the function's correctness to depend on something a reader wouldn't notice from the signature.

## What I'm pleased with

Catching the coverage gap in `formatTable.js`, and knowing why it was there rather than writing a test just to move the percentage. No test used a product wider than any prime, so the branch that widens columns for that case never ran. `[7, 11]` (121 is three digits, no prime is) was picked specifically to hit it.

The pure function / I/O split. `primes.js`, `grid.js`, and `formatTable.js` have no console or stdin calls, which is most of why they were easy to test, and it kept `index.js`, the one place that does need I/O, small.

The readline callback. `answer` doesn't exist until the user types something and hits enter, so anything using it has to sit inside that callback, the same reason you can't read a variable before it's assigned, just on a delay instead of instantly.

Changing `isPrime` after it already worked. The old version, checking every integer up to √n, was already correct and passed every test. Being able to explain why the new version still works is what made me confident enough to rewrite it.

## What I'd do with more time

Pull `isValidCount` and the argv-vs-readline branching apart from the `console.log`/`readline` wiring in `index.js`, so the decision logic can be unit tested on its own. The thin I/O shell left over could be tested separately by spawning the script as a child process and checking stdout.

Exploit the grid's symmetry. `buildGrid` currently computes every cell, including the ones below the diagonal that just mirror ones above it. Only computing the upper triangle and mirroring it would save real work for a large table.

A full Sieve of Eratosthenes instead of the primes-only trial division `isPrime` does now. It's asymptotically faster for generating a batch of primes. It also needs an array sized to an estimated upper bound up front, and picking a bound that's safely large without wildly overshooting adds complexity of its own. Trial division against known primes is simple and fast enough for the sizes this tool runs at, which is why I went with it. Worth revisiting if N ever needs to get large.

CI running the test suite on every push. At one point I thought I'd written and saved a test that wasn't actually on disk, and nothing caught it until I ran the suite and the count was off. CI would catch that kind of thing automatically instead of relying on me noticing.
