const electron = require('electron');
const path = require('path');

const { app, BrowserWindow, Menu, ipcMain } = electron;

let main_window;
let add_popup;

app.on('ready', () => {
  main_window = new BrowserWindow({});
  main_window.loadURL(`file://${path.join(__dirname, 'main.html')}`);

  main_window.on('closed', app.quit);

  const main_menu = Menu.buildFromTemplate(menu_template);
  Menu.setApplicationMenu(main_menu);
});

function createAddWindow() {
  add_popup = new BrowserWindow({
    width: 300,
    height: 200,
    title: 'Add New Todo'
  });

  add_popup.loadURL(`file://${path.join(__dirname, 'add_popup.html')}`);

  add_popup.on('close', () => {
    add_popup = null;
  });
}

ipcMain.on('todo:add', (event, new_todo) => {
  main_window.webContents.send('todo:add', new_todo);
  add_popup.close();
});

const menu_template = [
  {
    label: 'File',
    submenu: [
      {
        label: 'New Todo',
        accelerator: (() => {
          if (process.platform === 'darwin') { // Support for OSx
            return 'Command+N';
          } else {
            return 'Ctrl+N';
          }
        })(),
        click() {
          createAddWindow();
        }
      },
      {
        label: 'Clear Todos',
        accelerator: 'Ctrl+C',
        click() {
          main_window.webContents.send('todo:clear');
        }
      },
      {
        label: 'Quit',
        accelerator: (() => {
          if (process.platform === 'darwin') { // Support for OSx
            return 'Command+Q';
          } else {
            return 'Ctrl+Q';
          }
        })(),
        click() {
          app.quit();
        }
      }
    ]
  }
]

// Supports OSx behavior for applications menu
if (process.platform === 'darwin') {
  menu_template.unshift({});
}

if (process.env.NODE_ENV !== 'production') {
  menu_template.push({
    label: 'Development',
    submenu: [
      { role: 'reload' },
      {
        label: 'Developer Tools',
        accelerator: 'F12',
        click(item, focusedWindow) {
          focusedWindow.toggleDevTools();
        }
      }
    ]
  });
}