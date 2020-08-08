const fse = require('fs-extra');
const path = require('path');

fse.emptyDirSync(path.join(process.cwd(), 'dist'));

process.exit(0);
