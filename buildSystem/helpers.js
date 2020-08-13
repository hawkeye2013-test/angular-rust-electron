const chalk = require('chalk');
const fs = require('fs');

const info = (exports.info = function (contentToPrint) {
  console.log(
    `${chalk.blueBright('INFO::')}${chalk.whiteBright(contentToPrint)}`
  );
});

const error = (exports.error = function (contentToPrint) {
  console.log(`${chalk.yellowBright(`ERROR::${contentToPrint}`)}`);
});

const warning = (exports.warning = function (contentToPrint) {
  console.log(`${chalk.yellowBright(`WARNING::${contentToPrint}`)}`);
});

const success = (exports.success = function (contentToPrint) {
  console.log(`${chalk.greenBright(`SUCCESS::${contentToPrint}`)}`);
});

exports.cpFile = function (fromFile, toFile) {
  info(`Copying File from ${fromFile} to ${toFile}`);

  fs.copyFileSync(fromFile, toFile);
};
