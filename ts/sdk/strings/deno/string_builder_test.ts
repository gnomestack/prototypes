import { WINDOWS } from "jsr:@gnome/os-constants";
import { assertEquals as equal } from "jsr:@std/assert@1.0.0";
import { StringBuilder } from "../string_builder.ts";

import { toCharCodeArray } from "../utils.ts";

Deno.test("appendString", () => {
    const sb = new StringBuilder();
    sb.appendString("test");
    equal(sb.toString(), "test");
});

Deno.test("appendUint8Array", () => {
    const sb = new StringBuilder();
    sb.appendUint8Array(toCharCodeArray("test"));
    equal(sb.toString(), "test");
});

Deno.test("appendLine", () => {
    const sb = new StringBuilder();
    sb.appendLine("test");
    if (WINDOWS) {
        equal(sb.toString(), "test\r\n");
        return;
    }
    equal(sb.toString(), "test\n");
});

Deno.test("appendCode", () => {
    const sb = new StringBuilder();
    sb.appendCode(116);
    equal(sb.toString(), "t");
});

Deno.test("appendChar", () => {
    const sb = new StringBuilder();
    sb.appendChar("t");
    equal(sb.toString(), "t");
});

Deno.test("append", () => {
    const sb = new StringBuilder();
    sb.append("test");
    equal(sb.toString(), "test");
    sb.append(toCharCodeArray("test"));
    equal(sb.toString(), "testtest");
    sb.append(new StringBuilder().appendString("test"));
    equal(sb.toString(), "testtesttest");
});

Deno.test("clear", () => {
    const sb = new StringBuilder();
    sb.append("test");
    sb.clear();
    equal(sb.toString(), "");
    equal(sb.length, 0);
});
