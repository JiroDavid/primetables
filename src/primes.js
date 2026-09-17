// Precondition: knownPrimes must contain every prime up to sqrt(n) (as
// generatePrimes always ensures when it calls this). If it's missing a
// prime that should have been checked, isPrime can return a wrong answer.
export function isPrime(n, knownPrimes) {
    if (n < 2) {
        return false;
    }
    for (let i = 0; i < knownPrimes.length; i = i + 1) {
        const p = knownPrimes[i];
        if (p * p > n) {
            break;
        }
        if (n % p === 0) {
            return false;
        }
    }
    return true;
}

export function generatePrimes(count) {
    if (!Number.isInteger(count) || count < 0) {
        throw new RangeError(`count must be a non-negative integer, got: ${count}`);
    }

    const primes = [];

    for (let i = 2; primes.length < count; i = i + 1) {
        if (isPrime(i, primes)) {
            primes.push(i);
        }
    }
    return primes;
}