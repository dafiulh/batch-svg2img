#!/usr/bin/env node

const argv = require('minimist')(process.argv.slice(2));
const batchSvg2Img = require(".");

function pickProperties(obj, props) {
  let newObj = {};

  props.forEach((prop) => {
    if (obj.hasOwnProperty(prop)) {
      newObj[prop] = obj[prop];
    }
  });

  return newObj;
}

if (argv.h) argv.help = argv.h;
if (argv.f) argv.format = argv.f;

if (argv.help === true) {
  console.log(`
Usage:
  $ npx batch-svg2img [source_folder] [dest_folder]

Arguments:
  -H, --help
  -F, --format
  --width
  --height
  --quality
  --preserveAspectRatio
  `);
} else if (argv._.length === 0) {
  console.error("Source folder not specified");
} else if (argv.format && !["png", "jpg", "jpeg"].includes(argv.format)) {
  console.error("Only 'png', 'jpg', and 'jpeg' format supported");
} else {
  const src = argv._[0];
  const dest = argv._[1] || "dest";

  argv.format = argv.format || "png";

  batchSvg2Img(src, dest, pickProperties(
    argv,
    ["format", "width", "height", "quality", "preserveAspectRatio"]
  ));
}
