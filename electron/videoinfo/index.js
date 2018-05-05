const electron = require('electron');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');

const { app, BrowserWindow, ipcMain } = electron;

let main_window;

app.on('ready', () => {
  main_window = new BrowserWindow({});
  main_window.loadURL(`file://${path.join(__dirname, 'index.html')}`);
});

ipcMain.on('video:submit', (event, video_path) => {
  ffmpeg.ffprobe(video_path, (err, metadata) => {
    main_window.webContents.send('video:duration', metadata.format.duration);
  });
});