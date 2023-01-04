const { app, BrowserWindow } = require('electron')
const path = require('path')

function createWindow() {
  // Create the browser window
  let win = new BrowserWindow({
    width: 1400,
    height: 850,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app
  win.loadFile(path.join(__dirname, '../dist/index.html'));
  //win.webContents.openDevTools();
}

app.on('ready', createWindow);