const path = require('path');
const fs = require('fs');
const fg = require('fast-glob');
const svg2img = require('svg2img');

function batchSvg2Img(srcDir, destDir, options = {}) {
  const cwd = process.cwd();
  srcDir = path.join(cwd, srcDir);
  destDir = path.join(cwd, destDir);
  const svgPattern = path.join(srcDir, '*.svg').replace(/\\/g, '/');

  fg(svgPattern).then((entries) => {
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir);
    }

    entries.forEach((filePath) => {
      svg2img(filePath, options, (err, buffer) => {
        if (err) {
          return console.log(err);
        }

        const fileName = path.basename(filePath);
        const outputFileName = fileName.replace(/\.svg$/, `.${options.format}`);
        const outputFilePath = path.join(destDir, outputFileName);

        console.log(`Writing "${outputFilePath}"`);

        fs.writeFileSync(outputFilePath, buffer);
      });
    });
  });
}

module.exports = batchSvg2Img;
