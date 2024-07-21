import { WINDOWS } from "jsr:@gnome/os-constants";
import { assertEquals as equal } from "jsr:@std/assert@1.0.0";
import { Utf8StringBuilder } from "../utf8_string_builder.ts";


Deno.test("appendString", () => {
    const sb = new Utf8StringBuilder();
    sb.appendString("test");
    equal(sb.toString(), "test");
});

Deno.test("appendUint8Array", () => {
    const sb = new Utf8StringBuilder();
    sb.appendUtf8Array(new TextEncoder().encode("test"));
    equal(sb.toString(), "test");
});

Deno.test("appendBuilder", () => {
    const sb = new Utf8StringBuilder();
    sb.appendBuilder(new Utf8StringBuilder().appendString("test"));
    equal(sb.toString(), "test");
});

Deno.test("append", () => {
    const sb = new Utf8StringBuilder();
    sb.append("test");
    equal(sb.toString(), "test");
    sb.append(new TextEncoder().encode("test"));
    equal(sb.toString(), "testtest");
    sb.append(new Utf8StringBuilder().appendString("test"));
    equal(sb.toString(), "testtesttest");
});

Deno.test("appendUtf8Code", () => {
    const sb = new Utf8StringBuilder();
    sb.appendUtf8Char(116);
    equal(sb.toString(), "t");
});

Deno.test("appendChar", () => {
    const sb = new Utf8StringBuilder();
    sb.appendChar("t");
    equal(sb.toString(), "t");
});

Deno.test("appendUtf16Char", () => {
    const sb = new Utf8StringBuilder();
    sb.appendUtf16Char("t".charCodeAt(0));
    equal(sb.toString(), "t");
});

Deno.test("appendLine", () => {
    const sb = new Utf8StringBuilder();
    sb.appendLine("test");
    if (WINDOWS) {
        equal(sb.toString(), "test\r\n");
        return;
    }
    equal(sb.toString(), "test\n");
});
