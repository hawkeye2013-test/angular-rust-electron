import { app, BrowserWindow } from 'electron';
import App from './backend/core/App';

// Imediately passes app off to static app handler class
App.main(app, BrowserWindow);
