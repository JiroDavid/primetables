export function formatTable(primes, grid) {
    let maxWidth = 0;

    for (let i = 0; i < primes.length; i = i + 1) {
        const len = String(primes[i]).length;
        if (len > maxWidth) {
            maxWidth = len;
        }
    }

    for (let i = 0; i < grid.length; i = i + 1) {
        for (let j = 0; j < grid[i].length; j = j + 1) {
            const len = String(grid[i][j]).length;
            if (len > maxWidth) {
                maxWidth = len;
            }
        }
    }

    const headerCells = [' '.repeat(maxWidth)];
    for (let i = 0; i < primes.length; i = i + 1) {
        headerCells.push(String(primes[i]).padStart(maxWidth));
    }
    const headerRow = headerCells.join(' ');

    const dataRows = [];
    for (let i = 0; i < grid.length; i = i + 1) {
        const rowCells = [String(primes[i]).padStart(maxWidth)];
        for (let j = 0; j < grid[i].length; j = j + 1) {
            rowCells.push(String(grid[i][j]).padStart(maxWidth));
        }
        dataRows.push(rowCells.join(' '));
    }

    return [headerRow, ...dataRows].join('\n');
}