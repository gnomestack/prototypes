import { assertEquals as equal } from "jsr:@std/assert@1.0.0";
import { ARCH, DARWIN, IS_64BIT, LINUX, PLATFORM, WINDOWS } from "../mod.ts";

Deno.test("os-constants: platform", () => {
    console.log("platform:", PLATFORM);
    console.log("arch: ", ARCH);
    switch (PLATFORM) {
        case "darwin":
            {
                equal(DARWIN, true);
                equal(LINUX, false);
                equal(WINDOWS, false);
                equal(IS_64BIT, true);
            }

            break;

        case "windows":
            {
                equal(DARWIN, false);
                equal(LINUX, false);
                equal(WINDOWS, true);
                equal(IS_64BIT, true);
            }
            break;

        case "linux":
            {
                equal(DARWIN, false);
                equal(LINUX, true);
                equal(WINDOWS, false);
                equal(IS_64BIT, true);
            }
            break;
    }
});

