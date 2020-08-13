import { ipcRenderer } from 'electron';

export class ElectronParent {
  ipcRenderer: typeof ipcRenderer;
  constructor() {
    if (this.isElectron()) {
      this.ipcRenderer = window.require('electron').ipcRenderer;
      this.ipcRenderer.on('app-data', (event, args) => {
        console.log(event, args);
      });
    }
  }

  sendMessage(channel: string, data?: any): void {
    if (this.isElectron()) {
      if (data) {
        this.ipcRenderer.send(channel, data);
      } else {
        this.ipcRenderer.send(channel);
      }
    } else {
      console.log(
        `Command on channel ${channel} not executed.  Not running in Electron Context.`
      );
    }
  }

  isElectron(): boolean {
    // Renderer process
    if (
      typeof window !== 'undefined' &&
      typeof window.process === 'object' &&
      window.process.type === 'renderer'
    ) {
      return true;
    }

    // Main process
    if (
      typeof process !== 'undefined' &&
      typeof process.versions === 'object' &&
      !!process.versions.electron
    ) {
      return true;
    }

    // Detect the user agent when the `nodeIntegration` option is set to true
    if (
      typeof navigator === 'object' &&
      typeof navigator.userAgent === 'string' &&
      navigator.userAgent.indexOf('Electron') >= 0
    ) {
      return true;
    }

    return false;
  }
}
