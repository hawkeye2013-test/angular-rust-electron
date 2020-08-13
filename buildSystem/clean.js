const fse = require('fs-extra');
const fs = require('fs');
const path = require('path');
const { info } = require('./resources/helpers');

const cwd = process.cwd();

let buildConfig = JSON.parse(
  fs.readFileSync(path.join(cwd, 'build.config.json'), 'utf-8')
);

const exeDest = path.join(cwd, buildConfig.exeDest);

const dist = path.join(process.cwd(), 'dist');

info(`Cleaning folder: ${dist}`);
fse.emptyDirSync(dist);
fse.removeSync(dist);

const distBackend = path.join(process.cwd(), 'dist-backend');

info(`Cleaning folder: ${distBackend}`);
fse.emptyDirSync(distBackend);
fse.removeSync(distBackend);

info(`Cleaning folder: ${exeDest}`);
fse.emptyDirSync(exeDest);
fse.removeSync(exeDest);

const release = path.join(process.cwd(), 'release');

info(`Cleaning folder: ${release}`);
fse.emptyDirSync(release);
fse.removeSync(release);

process.exit(0);
