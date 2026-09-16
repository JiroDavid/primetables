import { test } from "node:test";
import assert from "node:assert/strict";
import { formatTable } from "../src/formatTable.js";

test('formatTable([2, 3], [[4, 6], [6, 9]]) formats as aligned grid', () => {
    assert.strictEqual(
        formatTable([2, 3], [[4, 6], [6, 9]]),
        "  2 3\n2 4 6\n3 6 9"
    );
});