const fs = require('fs');
const path = require('path');
const { stderr } = require('process');
const { execSync } = require('child_process');

const { parseCargoFile } = require('./buildSystem/parsers');

const cwd = process.cwd();

const exePath = path.join(cwd, 'executables');

const exeDirs = fs.readdirSync(exePath);

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
            console.log(stdout);
          }
        );

        // Copy EXE to dist directory
        let targetEXE = path.join(
          exePath,
          exeDir,
          'target',
          'release',
          cargoFileContents.package.name + '.exe'
        );

        let toEXE = path.join(
          cwd,
          'dist',
          'executables',
          cargoFileContents.package.name + '.exe'
        );

        console.log(`INFO: Copying File from ${targetEXE} to ${toEXE}`);
        let copySuccess = fs.copyFileSync(targetEXE, toEXE);

        break;
    }
  }
});

process.exit(0);
