import readline from 'node:readline';
import { generatePrimes } from './src/primes.js';
import { buildGrid } from './src/grid.js';
import { formatTable } from './src/formatTable.js';

function runWithCount(count) {
    const primes = generatePrimes(count);
    const grid = buildGrid(primes);
    console.log(formatTable(primes, grid));
}

function isValidCount(value) {
    const n = Number(value);
    return Number.isInteger(n) && n >= 1;
}

const arg = process.argv[2];

if (arg !== undefined) {
    if (isValidCount(arg)) {
        runWithCount(Number(arg));
    } else {
        console.error(`Invalid count: "${arg}". Please provide a whole number of 1 or more.`);
        process.exitCode = 1;
    }
} else {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    rl.question('Enter N: ', (answer) => {
        rl.close();
        if (isValidCount(answer)) {
            runWithCount(Number(answer));
        } else {
            console.error(`Invalid count: "${answer}". Please provide a whole number of 1 or more.`);
            process.exitCode = 1;
        }
    });
}