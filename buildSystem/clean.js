const fse = require('fs-extra');
const path = require('path');
const { info } = require('./helpers');

info(`Cleaning folder: ${path.join(process.cwd(), 'dist')}`);
fse.emptyDirSync(path.join(process.cwd(), 'dist'));

info(`Cleaning folder: ${path.join(process.cwd(), 'tools')}`);
fse.emptyDirSync(path.join(process.cwd(), 'tools'));

info(`Cleaning folder: ${path.join(process.cwd(), 'release')}`);
fse.emptyDirSync(path.join(process.cwd(), 'release'));

process.exit(0);
