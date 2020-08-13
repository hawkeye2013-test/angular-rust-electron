# Angular Rust Electron Boilerplate

Angular Rust Electron provides a plug-and-play workflow for creating and building [Electron](https://www.electronjs.org/) apps with an [Angular](https://angular.io/) front-end and [Rust](https://www.rust-lang.org/) working under the hood. Angular and Electron are wonderful tools, but fall short when large amounts of data are needed to be processed. JavaScript is not the fastest language out there, but Rust is! Click the `Use this template` button to create a repository that has a complete build system for using these three technologies together.

## Prerequisites

This repo relies on a few things installed on your system to work properly. First, Electron and Angular both rely on [Node](https://nodejs.org/en/). Rust needs, well... [Rust](https://www.rust-lang.org/). If building just executables with Rust, this is all you need installed. See the `src-exe/hello-world` folder on how to layout the executable project. If your goal is to build native modules with rust one more prerequisite is nessisary. This project uses the [Neon](https://neon-bindings.com/docs/intro) bindings to compile rust code into a native addon. Please make sure to follow the [Neon Getting Started](https://neon-bindings.com/docs/getting-started) and [Hello World](https://neon-bindings.com/docs/hello-world) docs so you know you can run a Neon project successfully.

Whew! That's it for the prerequisites...

## Installation

Once everything is set up from the prerequsites section, a simple [`use this template`](https://github.com/hawkeye2013/angular-rust-electron/generate) or

```
git clone https://github.com/hawkeye2013/angular-rust-electron
```

and

```
npm install
```

will install everything!

## Running

There are tons of scripts available via `npm` for this project. There are really only three main ones, which run all the others.

`npm start` - In order, builds all the executables and copies them to the dist folder. Then runs a development Angular build. Electron launches the window and loads localhost:4200 in the window.

`npm run clean` - This cleans the folders that are ignored by the `.gitignore` file.

`npm run electron:build` - This command will run a production build of the app and package it using [`electron-builder`](https://www.electron.build/).

## Project Structure

The project has three main code locations:

`src` - Contains the Angular Application, the front end

`src-backend` - Contains the Electron application - entry point is main.ts

`src-exe` - Contains the executable projects. Can build unlimited executables. Just drop them in there (with a `config.json` file) and run away

## `Config.json` Files

The config files are in the root of the executable project. Each project should have its own folder in the src-exe directory. The config file should live in the root of the project. For example

```
src-exe/
| - hello-world/ <-- A Cargo Project
| | - config.json
| | - Cargo.toml
| - thread-count/ <-- A Neon Project
| | - config.json
| | - package.json
```

Below is an example `config` file:

```json
{
  "build": true,
  "language": "rust",
  "tooling": "cargo"
}
```

`build` : `true` - builds project, `false` - does not

`language` : Only `rust` works for now - eventually would like others

`tooling` : Either `cargo` or `neon`. This determines which tooling will attempt to build the project.

## Troubleshooting

If the problem is an Electron load error, try deleting the `electron` directory out of the `node_modules` and running `npm install` again. Neon rebuilds targeting the version of electron in the `package.json`, but ocasionally things get weird. This resets it, solves 90% of my problems. Give it a shot...

### Resources

Build system based on a highly modified version of [Angular-Electron by miximegris](https://github.com/maximegris/angular-electron). Check it out if you just need the Angular Electron portion!
