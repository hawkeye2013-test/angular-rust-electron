const fs = require('fs');
const path = require('path');
const { stderr } = require('process');
const { execSync } = require('child_process');

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
        // Get cargo info
        const cargoFileContents = parseCargoFile(
          path.join(exePath, exeDir, 'Cargo.toml')
        );

        console.log('Made it here');
        // Build EXE
        let process = execSync(
          `cargo build --release --manifest-path=${path.join(
            exePath,
            exeDir,
            'Cargo.toml'
          )}`,
          (err, stdout, stderr) => {
            if (err) {
              console.log('ERROR: ', err);
            }
            if (stderr) {
              console.log('STDERR: ', stderr);
            }
            if (stdout) {
              console.log(stdout);
            }
          }
        );

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
            cargoFileContents.package.name + '.exe'
          );

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

          let toEXEmac = path.join(
            cwd,
            'tools',
            cargoFileContents.package.name
          );

          console.log(`INFO: Copying File from ${targetEXEmac} to ${toEXEmac}`);
          fs.copyFileSync(targetEXEmac, toEXEmac);
        }

        break;
    }
  }
});

process.exit(0);
