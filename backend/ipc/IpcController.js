"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IpcController = void 0;
var IPCButton_1 = require("./IPCButton/IPCButton");
var IpcController = /** @class */ (function () {
    function IpcController() {
        this.ipcButton = new IPCButton_1.IPCButton();
    }
    return IpcController;
}());
exports.IpcController = IpcController;
//# sourceMappingURL=IpcController.js.map