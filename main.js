const fs = require('fs');
const path = require('path');
const svg2img = require('svg2img');

function batchSvg2Img(srcDir, destDir, options = {}) {
  const cwd = process.cwd();
  srcDir = path.join(cwd, srcDir);
  destDir = path.join(cwd, destDir);

  const svgFilesPath = fs.readdirSync(srcDir).filter((file) => {
    const filePath = path.join(srcDir, file);

    if (fs.statSync(filePath).isDirectory()) {
      return false;
    }

    return filePath.endsWith('.svg');
  }).map((file) => {
    return path.join(srcDir, file);
  });

  console.log(svgFilesPath);

  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir);
  }

  svgFilesPath.forEach((filePath) => {
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
}

module.exports = batchSvg2Img;
