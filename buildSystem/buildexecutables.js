const fs = require('fs');
const path = require('path');
const { stderr } = require('process');
const { execSync, spawnSync } = require('child_process');

const { parseCargoFile } = require('./parsers');

const cwd = process.cwd();

const exePath = path.join(cwd, 'executables');

const exeDirs = fs.readdirSync(exePath);

const platform = process.platform;

console.log('PLATFORM: ', platform);

// make the destination directory
// fs.mkdirSync(path.join(process.cwd(), 'dist', 'executables'));

exeDirs.forEach((exeDir) => {
  let configPath = path.join(exePath, exeDir, 'config.json');

  try {
    let config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

    if (config.build) {
      console.log(
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
              runCargoBuild(exePath, exeDir);
              break;

            case 'neon':
              runNeonBuild(exePath, exeDir);
              break;

            default:
              console.log(`Unknown Tooling - ${config.tooling}`);
              break;
          }

          break;
      }
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
  }
});

process.exit(0);

function runCargoBuild(exePath, exeDir) {
  // Get cargo info
  const cargoFileContents = parseCargoFile(
    path.join(exePath, exeDir, 'Cargo.toml')
  );

  // Build EXE
  let cargoProcess = execSync(
    `cargo build --release --manifest-path=${path.join(
      exePath,
      exeDir,
      'Cargo.toml'
    )}`,
    { encoding: 'utf-8' }
  );

  console.log(cargoProcess);

  if (platform === 'win32') {
    // Copy EXE to dist directory
    let targetEXEwin = path.join(
      exePath,
      exeDir,
      'target',
      'release',
      cargoFileContents.package.name + '.exe'
    );

    let toEXEwin = path.join(
      cwd,
      'tools',
      cargoFileContents.package.name,
      cargoFileContents.package.name + '.exe'
    );

    if (
      !fs.existsSync(path.join(cwd, 'tools', cargoFileContents.package.name))
    ) {
      fs.mkdirSync(path.join(cwd, 'tools', cargoFileContents.package.name));
    }

    console.log(`INFO: Copying File from ${targetEXEwin} to ${toEXEwin}`);
    fs.copyFileSync(targetEXEwin, toEXEwin);
  } else {
    // Copy Executable to dist directory
    let targetEXEmac = path.join(
      exePath,
      exeDir,
      'target',
      'release',
      cargoFileContents.package.name
    );

    let toEXEmac = path.join(cwd, 'tools', cargoFileContents.package.name);

    console.log(`INFO: Copying File from ${targetEXEmac} to ${toEXEmac}`);
    fs.copyFileSync(targetEXEmac, toEXEmac);
  }
}

function runNeonBuild(exePath, exeDir) {
  console.log('Running with neon');

  const neonProcess = execSync(
    `cd ${path.join(exePath, exeDir)} && neon build --release`,
    {
      encoding: 'utf-8',
    }
  );

  // TODO(TUCKER) - add some error handling here if there are mistakes
  console.log(neonProcess);

  if (!fs.existsSync(path.join(cwd, 'tools', exeDir))) {
    fs.mkdirSync(path.join(cwd, 'tools', exeDir));
  }

  if (!fs.existsSync(path.join(cwd, 'tools', exeDir, 'lib'))) {
    fs.mkdirSync(path.join(cwd, 'tools', exeDir, 'lib'));
  }

  if (!fs.existsSync(path.join(cwd, 'tools', exeDir, 'native'))) {
    fs.mkdirSync(path.join(cwd, 'tools', exeDir, 'native'));
  }

  let targetPkgFileFrom = path.join(exePath, exeDir, 'package.json');
  let targetPkgFileTo = path.join(cwd, 'tools', exeDir, 'package.json');

  fs.copyFileSync(targetPkgFileFrom, targetPkgFileTo);

  let targetLibFileFrom = path.join(exePath, exeDir, 'lib', 'index.js');
  let targetLibFileTo = path.join(cwd, 'tools', exeDir, 'lib', 'index.js');

  fs.copyFileSync(targetLibFileFrom, targetLibFileTo);

  let targetNodeFileFrom = path.join(exePath, exeDir, 'native', 'index.node');
  let targetNodeFileTo = path.join(
    cwd,
    'tools',
    exeDir,
    'native',
    'index.node'
  );

  fs.copyFileSync(targetNodeFileFrom, targetNodeFileTo);
}
