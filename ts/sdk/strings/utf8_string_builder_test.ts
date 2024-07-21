import { WINDOWS } from "@gnome/os-constants";
import { Utf8StringBuilder } from "./utf8_string_builder.ts";
import { assert, test } from "vitest";

const { equal } = assert; 

test("appendString", () => {
    const sb = new Utf8StringBuilder();
    sb.appendString("test");
    equal(sb.toString(), "test");
});

test("appendUint8Array", () => {
    const sb = new Utf8StringBuilder();
    sb.appendUtf8Array(new TextEncoder().encode("test"));
    equal(sb.toString(), "test");
});

test("appendBuilder", () => {
    const sb = new Utf8StringBuilder();
    sb.appendBuilder(new Utf8StringBuilder().appendString("test"));
    equal(sb.toString(), "test");
});

test("append", () => {
    const sb = new Utf8StringBuilder();
    sb.append("test");
    equal(sb.toString(), "test");
    sb.append(new TextEncoder().encode("test"));
    equal(sb.toString(), "testtest");
    sb.append(new Utf8StringBuilder().appendString("test"));
    equal(sb.toString(), "testtesttest");
});

test("appendUtf8Code", () => {
    const sb = new Utf8StringBuilder();
    sb.appendUtf8Char(116);
    equal(sb.toString(), "t");
});

test("appendChar", () => {
    const sb = new Utf8StringBuilder();
    sb.appendChar("t");
    equal(sb.toString(), "t");
});

test("appendUtf16Char", () => {
    const sb = new Utf8StringBuilder();
    sb.appendUtf16Char("t".charCodeAt(0));
    equal(sb.toString(), "t");
});

test("appendLine", () => {
    const sb = new Utf8StringBuilder();
    sb.appendLine("test");
    if (WINDOWS) {
        equal(sb.toString(), "test\r\n");
        return;
    }
    equal(sb.toString(), "test\n");
});
