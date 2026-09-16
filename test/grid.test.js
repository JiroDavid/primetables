import { test } from "node:test";
import assert from "node:assert/strict";
import { buildGrid } from "../src/grid.js";

test('buildGrid([2, 3, 5]) returns products grid', () => {
    assert.deepStrictEqual(buildGrid([2, 3, 5]), [[4, 6, 10], [6, 9, 15], [10, 15, 25]]);
});

test('buildGrid([2]) returns single-cell grid', () => {
    assert.deepStrictEqual(buildGrid([2]), [[4]]);
});

test('buildGrid([]) returns empty grid', () => {
    assert.deepStrictEqual(buildGrid([]), []);
});