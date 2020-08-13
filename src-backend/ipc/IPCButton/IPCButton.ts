import { ipcMain, IpcMainEvent } from 'electron';
import * as path from 'path';
import { EXEBridge } from '../../exeBridge/EXEBridge';
import App from '../../core/App';

export class IPCButton {
  constructor() {
    this.watchIPCChannels();
  }

  watchIPCChannels() {
    ipcMain.on('button::click', this.handleButtonClick);
  }

  handleButtonClick(event: IpcMainEvent, args: any) {
    console.log('Handle Button Click');
    const threadCount = require(path.join(
      new EXEBridge().getLocation(),
      'thread-count'
    ));

    App.mainWindow.webContents.send(
      'app-data',
      `CPU Threads: ${threadCount()}`
    );
    console.log(threadCount());
  }
}
