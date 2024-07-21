import { test, assert } from "vitest";
import * as runtimeConstants from "./mod.ts";

// deno-lint-ignore no-explicit-any
const g = globalThis as any;
const { ok, equal } = assert;


test("runtime constants", () => {

    if (g.Bun !== undefined) {
        equal(runtimeConstants.BUN, true, "runtime should be bun");
        equal(runtimeConstants.RUNTIME, 'bun', "runtime should be bun");
        equal(runtimeConstants.CLOUDFLARE, false, "runtime should not be cloudflare");
        equal(runtimeConstants.BROWSER, false, "runtime should not be browser");
        equal(runtimeConstants.NODE, false, "runtime should not be node");
        equal(runtimeConstants.DENO, false, "runtime should not be deno");
    }

    if (g.Deno !== undefined) {
        equal(runtimeConstants.DENO, true, "runtime should be deno");
        equal(runtimeConstants.RUNTIME, 'deno', "runtime should be deno");
        equal(runtimeConstants.CLOUDFLARE, false, "runtime should not be cloudflare");
        equal(runtimeConstants.BROWSER, false, "runtime should not be browser");
        equal(runtimeConstants.NODE, false, "runtime should not be node");
        equal(runtimeConstants.BUN, false, "runtime should not be bun");
    }

    if (g.navigator && g.navigator.userAgent && g.navigator.userAgent.includes("Cloudflare-Workers")) {
        equal(runtimeConstants.CLOUDFLARE, true, "runtime should be cloudflare");
        equal(runtimeConstants.RUNTIME, 'cloudflare', "runtime should be cloudflare");
        equal(runtimeConstants.BROWSER, false, "runtime should not be browser");
        equal(runtimeConstants.NODE, false, "runtime should not be node");
        equal(runtimeConstants.DENO, false, "runtime should not be deno");
        equal(runtimeConstants.BUN, false, "runtime should not be bun");
    }

    if (g.window !== undefined && !runtimeConstants.NODELIKE && !runtimeConstants.DENO && !runtimeConstants.CLOUDFLARE) {
        equal(runtimeConstants.BROWSER, true, "runtime should be browser");
        equal(runtimeConstants.RUNTIME, 'browser', "runtime should be browser");
        equal(runtimeConstants.CLOUDFLARE, false, "runtime should not be cloudflare");
        equal(runtimeConstants.NODE, false, "runtime should not be node");
        equal(runtimeConstants.DENO, false, "runtime should not be deno");
        equal(runtimeConstants.BUN, false, "runtime should not be bun");
    }

    if (g.process !== undefined && g.Bun === undefined) {
        equal(runtimeConstants.NODE, true, "runtime should be node");
        equal(runtimeConstants.RUNTIME, 'node', "runtime should be node");
        equal(runtimeConstants.CLOUDFLARE, false, "runtime should not be cloudflare");
        equal(runtimeConstants.BROWSER, false, "runtime should not be browser");
        equal(runtimeConstants.DENO, false, "runtime should not be deno");
        equal(runtimeConstants.BUN, false, "runtime should not be bun");
    }

});