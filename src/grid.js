export function buildGrid(primes) {
    const grid = [];

    for (let i = 0; i < primes.length; i = i + 1) {
        const row = [];
        for (let j = 0; j < primes.length; j = j + 1) {
            row.push(primes[i] * primes[j]);
        }
        grid.push(row);
    }

    return grid;
}