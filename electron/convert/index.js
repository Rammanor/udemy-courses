const electron = require('electron');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');
const _ = require('lodash')

const { app, BrowserWindow, ipcMain, shell } = electron;

let main_window;

app.on('ready', () => {
  main_window = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      backgroundThrottling: false,
    }
  });

  main_window.loadURL(`file://${path.join(__dirname, 'src', 'index.html')}`);
});

ipcMain.on('videos:added', (event, videos) => {
  Promise.all(_.map(videos, getVideoDurationPromise))
  .then((videos_metadata) => {
    main_window.webContents.send('metadata:complete', videos_metadata);
  })
  .catch((err) => {
    console.error(err);
  });
});

function getVideoDurationPromise(video) {
  return new Promise((resolve, reject) => {
    ffmpeg.ffprobe(video_path, (err, metadata) => {
      if (eer) { return reject(err); }
      video.duration = metadata.format.duration;
      video.format = 'avi';
      resolve(video);
    });
  });
}

ipcMain.on('conversion:start', (event, videos) => {
  _.each(videos, convertVideo);
});

function convertVideo(video) {
  const output_dir = video.path.split(video.name)[0];
  const output_name = video.name.split('.')[0];
  const output_path = `${output_dir}${output_name}.${video.format}`;

  ffmpeg(video.path)
    .output(output_path)
    .on('end', () => {
      main_window.webContents.send('conversion:ended', {video, output_path});
    })
    .on('progress', ({ timemark }) => {
      main_window.webContents.send('conversion:progress', {video, timemark});
    })
    .run();
}

ipcMain.on('folder:open', (event, folder_path) => {
  shell.showItemInFolder(folder_path);
});