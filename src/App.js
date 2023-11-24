import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { ReactMediaRecorder } from 'react-media-recorder';

const App = () => {
  const webcamRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const [previewVideo, setPreviewVideo] = useState(null);

  const handleStartRecording = () => {
    setIsRecording(true);
    setPreviewVideo(null);
  };

  const handleStopRecording = (blobUrl) => {
    setIsRecording(false);
    setPreviewVideo(blobUrl);
  };

  return (
    <div className="App">
      <h1>Video Recording App</h1>
      <div>
        <Webcam audio={false} ref={webcamRef} />
      </div>
      <div>
        <ReactMediaRecorder
          video
          render={({ status, startRecording, stopRecording, mediaBlobUrl }) => (
            <div>
              <p>{status}</p>
              {!isRecording ? (
                <button onClick={() => startRecording()}>Start Recording</button>
              ) : (
                <button onClick={() => stopRecording()}>Stop Recording</button>
              )}
            </div>
          )}
          onStop={(mediaBlobUrl) => handleStopRecording(mediaBlobUrl)}
        />
      </div>
      {isRecording && <p>Recording...</p>}
      {!isRecording && (
        <div>
          <button onClick={handleStartRecording}>Start Recording</button>
        </div>
      )}
      {isRecording && (
        <div>
          <button onClick={() => handleStopRecording()}>Stop Recording</button>
        </div>
      )}
      {previewVideo && (
        <div>
          <p>Preview:</p>
          <video controls width="400" src={previewVideo} />
        </div>
      )}
    </div>
  );
};

export default App;
