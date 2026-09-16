import { test } from "node:test";
import assert from "node:assert/strict";
import { formatTable } from "../src/formatTable.js";

test('formatTable([2, 3], [[4, 6], [6, 9]]) formats as aligned grid', () => {
    assert.strictEqual(
        formatTable([2, 3], [[4, 6], [6, 9]]),
        "  2 3\n-----\n2 4 6\n3 6 9"
    );
});

test('formatTable([7, 11], [[49, 77], [77, 121]]) widens columns to fit a product wider than any prime', () => {
    assert.strictEqual(
        formatTable([7, 11], [[49, 77], [77, 121]]),
        "      7  11\n-----------\n  7  49  77\n 11  77 121"
    );
});