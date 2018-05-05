const electron = require('electron');
const path = require('path');

const { app, BrowserWindow, Tray, Menu } = electron;

let main_window;
let tray;

app.on('ready', () => {
  main_window = new BrowserWindow({
    height: 500,
    width: 300,
    frame: false,
    resizable: false,
    show: false,
  });

  main_window.loadURL(`file://${path.join(__dirname, 'src', 'index.html')}`);

  main_window.on('closed', app.quit);

  const icon_name = process.platform === 'win32' ? 'windows-icon.png' : 'iconTemplate.png';
  tray = new Tray(path.join(__dirname, 'src', 'assets', icon_name));

  buildTrayMenu(tray);
});

function buildTrayMenu(tray) {
  tray.setContextMenu(Menu.buildFromTemplate([
    {
      label: main_window.isVisible() ? 'Close' : 'Open',
      click(event) {
        const { x , y } = tray.getBounds();
        const { height, width } = main_window.getBounds();

        main_window.setBounds({
          x: x - (width / 2),
          y: process.platform === 'win32' ? y - height : y,
          height, // ES6 syntax for same key value names
          width,
        });

        main_window.isVisible() ? main_window.hide() : main_window.show();
        buildTrayMenu(tray);
      }
    }
  ]));
}