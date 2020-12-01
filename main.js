const path = require("path");
const fs = require("fs");
const fg = require("fast-glob");
const mkdirp = require("mkdirp");
const svg2img = require("svg2img");

function batchSvg2Img(srcDir, destDir, options = {}) {
  const cwd = process.cwd();
  const svgPattern = path.join(cwd, srcDir, "*.svg").replace(/\\/g, "/");

  fg(svgPattern).then((entries) => {
    mkdirp.sync(path.join(cwd, destDir));

    entries.forEach((filePath) => {
      svg2img(filePath, options, (err, buffer) => {
        if (err) {
          return console.log(err);
        }

        const fileName = path.basename(filePath);
        const outputFileName = fileName.replace(/\.svg$/, `.${options.format}`);
        const outputFilePath = path.join(cwd, destDir, outputFileName);

        console.log(`Writing "${outputFilePath}"`);
        
        fs.writeFileSync(outputFilePath, buffer);
      });
    });
  });
}

module.exports = batchSvg2Img;
