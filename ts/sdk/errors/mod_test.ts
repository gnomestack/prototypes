import { ArgumentError, collect, SystemError, TimeoutError } from "./mod.ts";
import { test, assert } from "vitest";

const { equal, isTrue, isFalse, instanceOf } = assert;

const ok = isTrue<boolean>;
const no = isFalse<boolean>;
const exists = function(x: any, message?: string): void {
    ok(x !== undefined && x !== null, message ?? "Expected value not be undefined.");
}

test("SystemError", () => {
    const x = new SystemError("test");
    instanceOf(x, Error);
    equal(x.message, "test");
    equal(x.name, "SystemError");
    ok(x.stack !== undefined);
    equal(x.code, "SystemError");
    ok(x.stackTrace !== undefined);
    ok(x.stackTrace.length > 0);

    exists(x.toObject(), "Expected toObject to return a value.");
});

test("TimeoutError", () => {
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

test("ArgumentError", () => {
    const x = new ArgumentError("arg1");
    instanceOf(x, Error);
    equal(x.message, "Argument arg1 is invalid.");
    equal(x.name, "ArgumentError");
    exists(x.stack);
    equal(x.code, "ArgumentError");
    exists(x.stackTrace);
    ok(x.stackTrace.length > 0);
    exists(x.toObject());
});

test("collectError", () => {
    const x = new Error("test");
    const y = new SystemError("test", x);
    const errors = collect(y);

    equal(errors.length, 2);
});
