const fs = require('fs');
const { parse } = require('path');
const { split } = require('ts-node');

exports.parseCargoFile = (filePath) => {
  const platform = process.platform;
  const cargoFile = fs.readFileSync(filePath, 'utf-8');
  let cargoFileSplit = cargoFile.split('\n');

  const parsedFile = {};

  let currentSubTarget = null;

  cargoFileSplit.forEach((element) => {
    if (element[0] === '[') {
      currentSubTarget = element.substring(
        1,
        element.length - (platform === 'win32' ? 2 : 1)
      );
      parsedFile[currentSubTarget] = {};
    } else {
      if (element[0] !== '' && element[0] !== '\r' && element.length > 0) {
        let splitLine = element.split(' = ');

        parsedFile[currentSubTarget][splitLine[0]] = splitLine[1].substring(
          1,
          splitLine[1].length - (platform === 'win32' ? 2 : 1)
        );
      }
    }
  });

  return parsedFile;
};
