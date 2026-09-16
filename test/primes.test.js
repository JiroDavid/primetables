import { test } from "node:test";
import assert from "node:assert/strict";
import { isPrime, generatePrimes } from "../src/primes.js";

test('2 is prime', () => {
    assert.strictEqual(isPrime(2), true);
});

test('1 is not prime', () => {
    assert.strictEqual(isPrime(1), false);
});

test('7 is prime', () => {
    assert.strictEqual(isPrime(7), true);
});

test('17 is prime', () => {
    assert.strictEqual(isPrime(17), true);
});

test('9 is not prime', () => {
    assert.strictEqual(isPrime(9), false);
});

test('15 is not prime', () => {
    assert.strictEqual(isPrime(15), false);
});

test('0 is not prime', () => {
    assert.strictEqual(isPrime(0), false);
});

test('-15 is not prime', () => {
    assert.strictEqual(isPrime(-15), false);
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