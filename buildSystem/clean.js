const fse = require('fs-extra');
const fs = require('fs');
const path = require('path');
const { info } = require('./helpers');

const cwd = process.cwd();

let buildConfig = JSON.parse(
  fs.readFileSync(path.join(cwd, 'build.config.json'), 'utf-8')
);

const exeDest = path.join(cwd, buildConfig.exeDest);

info(`Cleaning folder: ${path.join(process.cwd(), 'dist')}`);
fse.emptyDirSync(path.join(process.cwd(), 'dist'));

info(`Cleaning folder: ${exeDest}`);
fse.emptyDirSync(exeDest);

info(`Cleaning folder: ${path.join(process.cwd(), 'release')}`);
fse.emptyDirSync(path.join(process.cwd(), 'release'));

process.exit(0);
