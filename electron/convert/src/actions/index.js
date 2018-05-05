import { ADD_VIDEO, ADD_VIDEOS, REMOVE_VIDEO, REMOVE_ALL_VIDEOS, VIDEO_PROGRESS, VIDEO_COMPLETE } from "./types";
import { ipcRenderer } from 'electron';

// TODO: Communicate to MainWindow process that videos
// have been added and are pending conversion
export const addVideos = videos => dispatch => {
  ipcRenderer.send('videos:added', videos);
  ipcRenderer.on('metadata:complete', (event, videos_with_metadata) => {
    dispatch({
      type: ADD_VIDEOS,
      payload: videos_with_metadata
    });
  });
};


// TODO: Communicate to MainWindow that the user wants
// to start converting videos.  Also listen for feedback
// from the MainWindow regarding the current state of
// conversion.
export const convertVideos = videos => (dispatch, getState) => {
  ipcRenderer.send('conversion:start', videos);

  ipcRenderer.on('conversion:progress', (event, {video, timemark}) => {
    dispatch({
      type: VIDEO_PROGRESS,
      payload: {...video, timemark }
    })
  });

  ipcRenderer.on('conversion:ended', (event, {video, output_path}) => {
    dispatch({
      type: VIDEO_COMPLETE,
      payload: { ...video, output_path }
    })
  });
};

// TODO: Open the folder that the newly created video
// exists in
export const showInFolder = outputPath => dispatch => {
  ipcRenderer.send('folder:open', outputPath);
};

export const addVideo = video => {
  return {
    type: ADD_VIDEO,
    payload: { ...video }
  };
};

export const setFormat = (video, format) => {
  return {
    type: ADD_VIDEO,
    payload: { ...video, format, err: "" }
  };
};

export const removeVideo = video => {
  return {
    type: REMOVE_VIDEO,
    payload: video
  };
};

export const removeAllVideos = () => {
  return {
    type: REMOVE_ALL_VIDEOS
  };
};
