import { IPCButton } from './IPCButton/IPCButton';

export class IpcController {
  private ipcButton: IPCButton;

  constructor() {
    this.ipcButton = new IPCButton();
  }
}
