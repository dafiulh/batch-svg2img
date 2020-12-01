#!/usr/bin/env node

const meow = require("meow");
const batchSvg2Img = require(".");

const cli = meow(`
Usage:
  $ npx batch-svg2img [source_folder] [dest_folder]

Arguments:
  -H, --help
  -F, --format
  --width
  --height
  --quality
  --preserveAspectRatio
`, {
    flags: {
        format: {
            type: "string",
            alias: "f",
            default: "png"
        },
        width: {
            type: "number"
        },
        height: {
            type: "number"
        },
        preserveAspectRatio: {
            type: "string"
        },
        quality: {
            type: "number"
        }
    }
});

if (cli.flags.h) {
    cli.showHelp();
} else if (cli.input.length === 0) {
    console.error("Source folder not specified")
} else if (!["png", "jpg", "jpeg"].includes(cli.flags.format)) {
    console.error("Only 'png', 'jpg', and 'jpeg' supported")
} else {
    const src = cli.input[0];
    const dest = cli.input[1] || "dest";

    batchSvg2Img(src, dest, cli.flags);
}
