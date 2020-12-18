#!/usr/bin/env node

const batchSvg2Img = require('.');
const minimist = require('minimist');
const argv = minimist(process.argv.slice(2), {
  alias: {
    help: 'h',
    format: 'f'
  },
  default: {
    format: 'png'
  }
});

function pickProperties(obj, props) {
  const newObj = {};

  props.forEach((prop) => {
    if (Object.prototype.hasOwnProperty.call(obj, prop)) {
      newObj[prop] = obj[prop];
    }
  });

  return newObj;
}

if (argv.help) {
  console.log(`
Usage:
  $ npx batch-svg2img [source_folder] [dest_folder]

Arguments:
  -h, --help
  -f, --format
  --width
  --height
  --quality
  --preserveAspectRatio
  `);
} else if (argv._.length === 0) {
  console.error('Source folder not specified');
} else if (!['png', 'jpg', 'jpeg'].includes(argv.format)) {
  console.error('Only \'png\', \'jpg\', and \'jpeg\' format supported');
} else {
  const src = argv._[0];
  const dest = argv._[1] || 'dest';

  batchSvg2Img(src, dest, pickProperties(argv, [
    'format',
    'width',
    'height',
    'quality',
    'preserveAspectRatio'
  ]));
}
