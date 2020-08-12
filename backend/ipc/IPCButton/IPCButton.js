"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IPCButton = void 0;
var electron_1 = require("electron");
var threadCount = require('../../../tools/thread-count');
var IPCButton = /** @class */ (function () {
    function IPCButton() {
        this.watchIPCChannels();
    }
    IPCButton.prototype.watchIPCChannels = function () {
        electron_1.ipcMain.on('button::click', this.handleButtonClick);
    };
    IPCButton.prototype.handleButtonClick = function (event, args) {
        console.log('Handle Button Click');
        // console.log(event, args);
        console.log(threadCount());
    };
    return IPCButton;
}());
exports.IPCButton = IPCButton;
//# sourceMappingURL=IPCButton.js.map