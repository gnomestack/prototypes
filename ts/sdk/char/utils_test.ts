import { test, assert } from "vitest";
import { isAscii, isDigit, isLetter, isLetterAt, isLetterUtf16At } from "./utils.ts";

const { isTrue } = assert;

const ok = isTrue<boolean>;

test("char: isLetter", () => {
    const values = "a1#";
    ok(isLetter(values.charCodeAt(0)));
    ok(!isLetter(values.charCodeAt(1)));
    ok(!isLetter(values.charCodeAt(2)));
});

test("char: isLetterAt", () => {
    const values = "a1#";
    ok(isLetterAt(values, 0));
    ok(!isLetterAt(values, 1));
    ok(!isLetterAt(values, 2));
});

test("char: isLetterUtf16At", () => {
    const values = "a1#";
    ok(isLetterUtf16At(values, 0));
    ok(!isLetterUtf16At(values, 1));
    ok(!isLetterUtf16At(values, 2));
});

test("char: isAscii", () => {
    const values = "a1#⇼";
    ok(isAscii(values.charCodeAt(0)));
    ok(isAscii(values.charCodeAt(1)));
    ok(isAscii(values.charCodeAt(2)));
    ok(!isAscii(values.charCodeAt(3)));
});

test("char: isDigit", () => {
    const values = "a1#";
    ok(!isDigit(values.charCodeAt(0)));
    ok(isDigit(values.charCodeAt(1)));
    ok(!isDigit(values.charCodeAt(2)));
});
