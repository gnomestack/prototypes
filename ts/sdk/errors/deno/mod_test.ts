import { ArgumentError, collect, SystemError, TimeoutError } from "../mod.ts";
import { assert as ok, assertEquals as equal, assertInstanceOf as instanceOf, assertExists as exists } from "jsr:@std/assert";

Deno.test("SystemError", () => {
    const x = new SystemError("test");
    instanceOf(x, Error);
    equal(x.message, "test");
    equal(x.name, "SystemError");
    exists(x.stack);
    equal(x.code, "SystemError");
    exists(x.stackTrace);
    ok(x.stackTrace.length > 0);

    ok(x.toObject());
});

Deno.test("TimeoutError", () => {
    const x = new TimeoutError("test");
    instanceOf(x, Error);
    equal(x.message, "test");
    equal(x.name, "TimeoutError");
    exists(x.stack);
    equal(x.code, "TimeoutError");
    exists(x.stackTrace);
    ok(x.stackTrace.length > 0);

    exists(x.toObject());
});

Deno.test("ArgumentError", () => {
    const x = new ArgumentError("arg1");
    instanceOf(x, Error);
    equal(x.message, "Argument arg1 is invalid.");
    equal(x.name, "ArgumentError");
    ok(x.stack);
    equal(x.code, "ArgumentError");
    exists(x.stackTrace);
    ok(x.stackTrace.length > 0);

    exists(x.toObject());
});

Deno.test("collectError", () => {
    const x = new Error("test");
    const y = new SystemError("test", x);
    const errors = collect(y);

    equal(errors.length, 2);
});
