const { execSync } = require('child_process');
const { stat } = require('fs');
const { ConsoleReporter } = require('jasmine');

exports.runCargoBuild = function (tomlPath) {
  console.log('Running `Cargo Build`...');

  let cargoProcess = execSync(
    `cargo build --release --manifest-path=${tomlPath}`,
    { encoding: 'utf-8' }
  );

  console.log(cargoProcess);
};

exports.runNeonBuild = function (executePath) {
  console.log('Running `Neon Build --release`...');
  const neonProcess = execSync(
    `cd ${executePath} && npx electron-build-env neon build --release`,
    {
      encoding: 'utf-8',
    }
  );

  // TODO(TUCKER) - add some error handling here if there are mistakes
  console.log(neonProcess);
};
