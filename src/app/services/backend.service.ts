import { Injectable } from '@angular/core';

import { ElectronParent } from './electron-parent/electron-parent';

@Injectable({
  providedIn: 'root',
})
export class BackendService extends ElectronParent {
  constructor() {
    super();
    console.log(this.isElectron());
  }

  triggerWindowClose(): void {
    this.sendMessage('topbar:window:close');
  }
}
