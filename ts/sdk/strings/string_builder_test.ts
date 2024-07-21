import { WINDOWS } from "@gnome/os-constants";
import { StringBuilder } from "./string_builder.ts";
import { toCharCodeArray } from "./utils.ts";
import { assert, test } from "vitest";

const { equal } = assert;

test("StringBuilder.appendString", () => {
    const sb = new StringBuilder();
    sb.appendString("test");
    equal(sb.toString(), "test");
});

test("StringBuilder.appendUint8Array", () => {
    const sb = new StringBuilder();
    sb.appendUint8Array(toCharCodeArray("test"));
    equal(sb.toString(), "test");
});

test("StringBuilder.appendLine", () => {
    const sb = new StringBuilder();
    sb.appendLine("test");
    if (WINDOWS) {
        equal(sb.toString(), "test\r\n");
        return;
    }

    equal(sb.toString(), "test\n");
});

test("StringBuilder.appendCode", () => {
    const sb = new StringBuilder();
    sb.appendCode(116);
    equal(sb.toString(), "t");
});

test("StringBuilder.appendChar", () => {
    const sb = new StringBuilder();
    sb.appendChar("t");
    equal(sb.toString(), "t");
});

test("StringBuilder.append", () => {
    const sb = new StringBuilder();
    sb.append("test");
    equal(sb.toString(), "test");
    sb.append(toCharCodeArray("test"));
    equal(sb.toString(), "testtest");
    sb.append(new StringBuilder().appendString("test"));
    equal(sb.toString(), "testtesttest");
});

test("StringBuilder.clear", () => {
    const sb = new StringBuilder();
    sb.append("test");
    sb.clear();
    equal(sb.toString(), "");
    equal(sb.length, 0);
});
