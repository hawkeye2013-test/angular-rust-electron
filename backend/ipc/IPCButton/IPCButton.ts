import { ipcMain, IpcMainEvent } from 'electron';
import App from '../../core/App';
const threadCount = require('../../../tools/thread-count');

export class IPCButton {
  constructor() {
    this.watchIPCChannels();
  }

  watchIPCChannels() {
    ipcMain.on('button::click', this.handleButtonClick);
  }

  handleButtonClick(event: IpcMainEvent, args: any) {
    console.log('Handle Button Click');
    console.log(event, args);
    console.log(threadCount());
  }
}
