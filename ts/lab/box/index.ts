import * as apt from "@gnome/iac-linux/apt";

new apt.AptPackage("micro", {
    name: "micro",
    environment: {
        DEBIAN_FRONTEND: "noninteractive",
    },
});



// No resources are created or modified in this program.