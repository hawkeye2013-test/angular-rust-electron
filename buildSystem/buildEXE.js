const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const chalk = require('chalk');
const { parseCargoFile } = require('./resources/parsers');
const {
  info,
  error,
  warning,
  cpFile,
  success,
} = require('./resources/helpers');
const { runCargoBuild, runNeonBuild } = require('./resources/Builders');

const cwd = process.cwd();

let buildConfig = JSON.parse(
  fs.readFileSync(path.join(cwd, 'build.config.json'), 'utf-8')
);

const exePath = path.join(cwd, buildConfig.exeSrc);
const exeDest = path.join(cwd, buildConfig.exeDest);
const exeDirs = fs.readdirSync(exePath);
const platform = process.platform;

exeDirs.forEach((exeDir) => {
  info(`Processing Project: ${chalk.whiteBright(exeDir)}`);
  console.log(`---------------------------------------------`);

  let configPath = path.join(exePath, exeDir, 'config.json');

  try {
    let config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

    if (config.build) {
      info(
        `Building ${path.join(
          exePath,
          exeDir,
          'Cargo.toml'
        )} with ${config.language.toUpperCase()}`
      );
      switch (config.language) {
        case 'rust':
          switch (config.tooling) {
            case 'cargo':
              buildWithCargo(exePath, exeDir);
              break;

            case 'neon':
              buildWithNeon(exePath, exeDir);
              break;

            default:
              error(`Unknown Tooling - ${config.tooling}`);
              break;
          }

          break;
      }
    } else {
      warning('Build flag set to false - skipping build');
    }
  } catch (err) {
    switch (err.code) {
      case 'ENOENT':
        console.log(
          `ERROR: Could not find ${err.path}. Please add file and try again.`
        );
        break;

      default:
        console.log(err);
        console.log('Could not complete action.  ERROR: UNKNOWN');

        break;
    }
    process.exit(1);
  }

  success(`Build Completed for ${exeDir}\n\n`);
});

process.exit(0);

function buildWithCargo(exePath, exeDir) {
  info('Running With Cargo');

  // Get cargo info
  const cargoFileContents = parseCargoFile(
    path.join(exePath, exeDir, 'Cargo.toml')
  );

  runCargoBuild(path.join(exePath, exeDir, 'Cargo.toml'));

  let targetDirFrom;
  let targetDirTo;
  let targetEXEName;

  if (platform === 'win32') {
    targetDirFrom = path.join(exePath, exeDir, 'target', 'release');

    targetDirTo = path.join(exeDest, cargoFileContents.package.name);

    targetEXEName = cargoFileContents.package.name + '.exe';
  } else {
    // Copy Executable to dist directory
    targetDirFrom = path.join(exePath, exeDir, 'target', 'release');

    targetDirTo = path.join(exeDest, cargoFileContents.package.name);

    targetEXEName = cargoFileContents.package.name;
  }

  if (!fs.existsSync(exeDest)) {
    info(`Directory ${exeDest} does not exist, creating it now.`);
    fs.mkdirSync(exeDest);
  }

  if (!fs.existsSync(targetDirTo)) {
    info(`Directory ${targetDirTo} does not exist, creating it now.`);
    fs.mkdirSync(targetDirTo);
  }

  cpFile(
    path.join(targetDirFrom, targetEXEName),
    path.join(targetDirTo, targetEXEName)
  );
}

function buildWithNeon(exePath, exeDir) {
  info('Running With Neon');

  runNeonBuild(path.join(exePath, exeDir));

  let projectDirTo = path.join(exeDest, exeDir);

  let projectDirFrom = path.join(exePath, exeDir);

  makeDirs(projectDirTo);

  cpFile(
    path.join(projectDirFrom, 'package.json'),
    path.join(projectDirTo, 'package.json')
  );

  cpFile(
    path.join(projectDirFrom, 'lib', 'index.js'),
    path.join(projectDirTo, 'lib', 'index.js')
  );

  cpFile(
    path.join(projectDirFrom, 'native', 'index.node'),
    path.join(projectDirTo, 'native', 'index.node')
  );
}

function makeDirs(projectDirTo) {
  try {
    let parentDir = getParentDirectory(projectDirTo);

    if (!fs.existsSync(parentDir)) {
      fs.mkdirSync(parentDir);
    }

    if (!fs.existsSync(projectDirTo)) {
      fs.mkdirSync(projectDirTo);
    }

    if (!fs.existsSync(path.join(projectDirTo, 'lib'))) {
      fs.mkdirSync(path.join(projectDirTo, 'lib'));
    }

    if (!fs.existsSync(path.join(projectDirTo, 'native'))) {
      fs.mkdirSync(path.join(projectDirTo, 'native'));
    }
  } catch (err) {
    console.log(err);
  }
}

function getParentDirectory(directory) {
  const splitDirs = directory.split(path.sep);
  splitDirs.pop();

  return splitDirs.join(path.sep);
}
