const { spawn } = require('child_process');

exports.runCargoBuild = function (tomlPath) {
  return new Promise((resolve, reject) => {
    let cargoProcess = spawn(
      'cargo',
      ['build', '--release', `--manifest-path=${tomlPath}`],
      { encoding: 'utf-8', shell: true }
    );

    cargoProcess.stdout.on('data', (data) => {
      console.log(data);
    });

    cargoProcess.stderr.on('data', (data) => {
      console.error(data);
      reject();
    });

    cargoProcess.on('close', (code) => {
      if (code !== 0) {
        console.log('ERROR');
        reject();
      }

      resolve();
    });
  });
};
