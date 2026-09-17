import { test } from "node:test";
import assert from "node:assert/strict";
import { isPrime, generatePrimes } from "../src/primes.js";

test('2 is prime', () => {
    assert.strictEqual(isPrime(2, []), true);
});

test('1 is not prime', () => {
    assert.strictEqual(isPrime(1, []), false);
});

test('7 is prime', () => {
    assert.strictEqual(isPrime(7, [2]), true);
});

test('17 is prime', () => {
    assert.strictEqual(isPrime(17, [2, 3]), true);
});

test('9 is not prime', () => {
    assert.strictEqual(isPrime(9, [2, 3]), false);
});

test('15 is not prime', () => {
    assert.strictEqual(isPrime(15, [2, 3]), false);
});

test('0 is not prime', () => {
    assert.strictEqual(isPrime(0, []), false);
});

test('-15 is not prime', () => {
    assert.strictEqual(isPrime(-15, []), false);
});

test('isPrime stops checking once p*p exceeds n, ignoring later entries in knownPrimes', () => {
    // 7's only relevant check is against 2 (3*3 > 7, so it should break
    // before reaching 3). The array includes 7 itself further along
    // if the loop didn't break early and checked it, 7 % 7 === 0 would
    // wrongly report 7 as not prime.
    assert.strictEqual(isPrime(7, [2, 3, 7]), true);
});

test('generatePrimes(5) returns first 5 primes', () => {
    assert.deepStrictEqual(generatePrimes(5), [2, 3, 5, 7, 11]);
});

test('generatePrimes(0) returns empty array', () => {
    assert.deepStrictEqual(generatePrimes(0), []);
});

test('generatePrimes(1) returns first prime', () => {
    assert.deepStrictEqual(generatePrimes(1), [2]);
});

test('generatePrimes(-5) throws RangeError', () => {
    assert.throws(() => generatePrimes(-5), RangeError);
});

test('generatePrimes(null) throws RangeError', () => {
    assert.throws(() => generatePrimes(null), RangeError);
});

test('generatePrimes(2.5) throws RangeError', () => {
    assert.throws(() => generatePrimes(2.5), RangeError);
});

test('generatePrimes("5") throws RangeError', () => {
    assert.throws(() => generatePrimes("5"), RangeError);
});