import { assertEquals as equal } from "jsr:@std/assert@1.0.0";
import * as runtimeConstants from "../mod.ts";


Deno.test("runtime constants", () => {

    equal(runtimeConstants.DENO, true, "runtime should be deno");
    equal(runtimeConstants.RUNTIME, 'deno', "runtime should be deno");
    equal(runtimeConstants.CLOUDFLARE, false, "runtime should not be cloudflare");
    equal(runtimeConstants.BROWSER, false, "runtime should not be browser");
    equal(runtimeConstants.NODE, false, "runtime should not be node");
    equal(runtimeConstants.BUN, false, "runtime should not be bun");

});