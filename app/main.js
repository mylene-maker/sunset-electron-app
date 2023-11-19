const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1920,
    height:1080,
    resizable: false
  })
  win.loadURL(
    url.format({
    pathname: path.join(
      __dirname,
      '..',
      'dist',
      'business-case-electron-app',
      'index.html'),
    protocol: 'file:',
    slashes: true
  }))
}

// app.whenReady(() => createWindow())
app.whenReady().then(createWindow)

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
