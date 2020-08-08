"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var App_1 = require("./backend/core/App");
// Imediately passes app off to static app handler class
App_1.default.main(electron_1.app, electron_1.BrowserWindow);
//# sourceMappingURL=main.js.map