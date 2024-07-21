import { test, assert } from "vitest";
import * as str from "./utils.ts";

const { equal, deepEqual } = assert;

const ok = assert.isTrue<boolean>;
const no = assert.isFalse<boolean>;

test("trim", () => {
    equal(str.trim("  abc  "), "abc");
    equal(str.trim("  abc  ", " "), "abc");
    equal(str.trim("  abc  ", " a"), "bc");
    equal(str.trim("  abc  ", " a b c"), "");
});

test("trimStart", () => {
    equal(str.trimStart("  abc  "), "abc  ");
    equal(str.trimStart("  abc  ", " "), "abc  ");
    equal(str.trimStart("  abc  ", " a"), "bc  ");
    equal(str.trimStart("  abc  ", " a b c"), "");
});

test("trimEnd", () => {
    equal(str.trimEnd("  abc  "), "  abc");
    equal(str.trimEnd("  abc  ", " "), "  abc");
    equal(str.trimEnd("  abc  ", " c"), "  ab");
    equal(str.trimEnd("  abc  ", " a b c"), "");
});

test("endsWithIgnoreCase", () => {
    ok(str.endsWithIgnoreCase("abc", "c"));
    ok(str.endsWithIgnoreCase("abc", "C"));
    ok(str.endsWithIgnoreCase("abc", "Bc"));
    no(str.endsWithIgnoreCase("abc", "b"));
    no(str.endsWithIgnoreCase("abc", "a"));
    no(str.endsWithIgnoreCase("abc", "cab"));
});

test("startsWithIgnoreCase", () => {
    ok(str.startsWithIgnoreCase("abc", "a"));
    ok(str.startsWithIgnoreCase("abc", "A"));
    ok(str.startsWithIgnoreCase("abc", "Ab"));
    no(str.startsWithIgnoreCase("abc", "b"));
    no(str.startsWithIgnoreCase("abc", "c"));
    no(str.startsWithIgnoreCase("abc", "cab"));
});

test("indexOfIgnoreCase", () => {
    equal(str.indexOfIgnoreCase("abc", "a"), 0);
    equal(str.indexOfIgnoreCase("abc", "A"), 0);
    equal(str.indexOfIgnoreCase("abc", "Ab"), 0);
    equal(str.indexOfIgnoreCase("abc", "b"), 1);
    equal(str.indexOfIgnoreCase("abc", "bc"), 1);
    equal(str.indexOfIgnoreCase("acdb", "bc"), -1);
    equal(str.indexOfIgnoreCase("abc", "c"), 2);
    equal(str.indexOfIgnoreCase("abc", "cab"), -1);
});

test("includesIgnoreCase", () => {
    ok(str.includesIgnoreCase("abc", "a"));
    ok(str.includesIgnoreCase("abc", "A"));
    ok(str.includesIgnoreCase("abc", "Ab"));
    ok(str.includesIgnoreCase("abc", "b"));
    ok(str.includesIgnoreCase("abc", "bc"));
    no(str.includesIgnoreCase("acdb", "bc"));
    ok(str.includesIgnoreCase("abc", "c"));
    no(str.includesIgnoreCase("abc", "cab"));
});

test("equalsIgnoreCase", () => {
    ok(str.equalsIgnoreCase("abc", "abc"));
    ok(str.equalsIgnoreCase("abc", "ABC"));
    ok(str.equalsIgnoreCase("abc", "AbC"));
    no(str.equalsIgnoreCase("abc", "ab"));
    ok(str.equalsIgnoreCase("abc", "abC"));
    no(str.equalsIgnoreCase("abc", "cab"));
});

test("toCharCodeArray", () => {
    deepEqual(str.toCharCodeArray("abc"), new Uint8Array([97, 98, 99]));
    deepEqual(str.toCharCodeArray("a b c"), new Uint8Array([97, 32, 98, 32, 99]));
});

test("isWhiteSpaceAt", () => {
    ok(str.isWhiteSpace(" "));
    ok(str.isWhiteSpace("\t"));
    ok(str.isWhiteSpace("\n"));
    ok(str.isWhiteSpace("\r"));
    ok(str.isWhiteSpace("\n \t\n\r"));
    no(str.isWhiteSpace("a"));
    no(str.isWhiteSpace("1"));
    no(str.isWhiteSpace("A"));
});

test("split", () => {
    deepEqual(str.split("a b c", " "), ["a", "b", "c"]);
    deepEqual(str.split("a b c", " "), ["a", "b", "c"]);
    deepEqual(str.split("a b c", "b"), ["a ", " c"]);
    deepEqual(str.split("a b c", "c"), ["a b ", ""]);
    deepEqual(str.split("a b c", "d"), ["a b c"]);

    deepEqual(str.split("a:=b c", ":="), ["a", "b c"]);
    deepEqual(str.split(new TextEncoder().encode("a b d"), " "), ["a", "b", "d"]);
});

test("isNullOrEmpty", () => {
    ok(str.isNullOrEmpty(""));
    ok(str.isNullOrEmpty(null));
    ok(str.isNullOrEmpty(undefined));
    no(str.isNullOrEmpty("a"));
    no(str.isNullOrEmpty(" "));
    no(str.isNullOrEmpty("  "));
});

test("isNullOrWhiteSpace", () => {
    ok(str.isNullOrWhiteSpace(""));
    ok(str.isNullOrWhiteSpace(null));
    ok(str.isNullOrWhiteSpace(undefined));
    ok(str.isNullOrWhiteSpace(" "));
    ok(str.isNullOrWhiteSpace("  "));
    no(str.isNullOrWhiteSpace("a"));
    no(str.isNullOrWhiteSpace(" a"));
    no(str.isNullOrWhiteSpace(" a "));
});

test("toCharacterArray", () => {
    deepEqual(str.toCharacterArray("abc"), ["a", "b", "c"]);
    deepEqual(str.toCharacterArray("a b c"), ["a", " ", "b", " ", "c"]);
});
