import App from '../core/App';
import * as path from 'path';

export class EXEBridge {
  private devLocation = '../../../dist-exe';
  private prodLocation = path.join(
    this.getProdLocation(),
    'app.asar.unpacked',
    'dist-exe'
  );

  getLocation(): string {
    if (App.getDevEnv()) {
      return this.devLocation;
    } else {
      return this.prodLocation;
    }
  }

  private getProdLocation() {
    let splitPath = App.application.getAppPath().split(path.sep);

    splitPath.pop();

    return splitPath.join(path.sep);
  }
}
