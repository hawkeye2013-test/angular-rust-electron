import { Injectable } from '@angular/core';

import { ElectronParent } from './electron-parent/electron-parent';

@Injectable({
  providedIn: 'root',
})
export class BackendService extends ElectronParent {
  constructor() {
    super();
  }

  buttonClicked(): void {
    this.sendMessage('button::click');
  }
}
