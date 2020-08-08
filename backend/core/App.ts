import { IpcController } from '../ipc/IpcController';
import { BrowserWindow } from 'electron';
import * as url from 'url';
import * as path from 'path';

let isDevEnv = false;
export default class App {
  static mainWindow: Electron.BrowserWindow;
  static ipcController: IpcController;
  static application: Electron.App;
  static BrowserWindow;

  private static onWindowAllClosed(): void {
    if (process.platform !== 'darwin') {
      App.application.quit();
    }
  }

  private static onClose(): void {
    // Dereference the window object.
    App.mainWindow = null;
  }

  private static onReady(): void {
    console.log(isDevEnv);
    App.mainWindow = new App.BrowserWindow({
      width: 1200,
      height: 800,
      webPreferences: {
        nodeIntegration: true,
        allowRunningInsecureContent: isDevEnv ? true : false,
      },
    });

    if (isDevEnv) {
      App.mainWindow.webContents.openDevTools();

      require('electron-reload')(__dirname, {
        electron: require(path.join(process.cwd(), 'node_modules', 'electron')),
      });
      App.mainWindow.loadURL('http://localhost:4200');
    } else {
      switch (process.platform) {
        case 'win32':
          App.mainWindow.loadURL(
            url.format({
              pathname: path.join(
                process.cwd(),
                'resources',
                'app.asar',
                'dist',
                'index.html'
              ),
              protocol: 'file:',
              slashes: true,
            })
          );
          break;

        case 'darwin':
          App.mainWindow.loadURL(
            url.format({
              pathname: path.join(
                App.application.getAppPath(),
                'dist',
                'index.html'
              ),
              protocol: 'file:',
              slashes: true,
            })
          );
          break;
      }
    }
    App.mainWindow.on('closed', App.onClose);
  }

  static main(app: Electron.App, browserWindow: typeof BrowserWindow): void {
    if (process.argv.includes('--dev')) {
      isDevEnv = true;
    }

    App.ipcController = new IpcController();

    App.BrowserWindow = browserWindow;
    App.application = app;

    App.application.on('window-all-closed', App.onWindowAllClosed);
    App.application.on('ready', App.onReady);
  }
}
