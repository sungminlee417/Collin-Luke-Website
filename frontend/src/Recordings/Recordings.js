import "./Recordings.css";
import ReactPlayer from "react-player";
import { useState } from "react";

const recordingOne = {
  id: 1,
  name: "Cereusle",
  url: "https://youtu.be/m_oA5_T2_UE",
};
const recordingTwo = {
  id: 2,
  name: "A Sense of Loss",
  url: "https://youtu.be/DuvWZ6DD7zc",
};
const recordingsURL = [recordingOne, recordingTwo];

const Recordings = () => {
  const [current, setCurrent] = useState(0);

  const onPlay = (recordingId) => {
    setCurrent(recordingId);

    const currentRecording = document.querySelector(
      `.recordings-video-container-${recordingId}`
    );
    if (!currentRecording.classList.contains("enlarge-video")) {
      currentRecording.classList.add("enlarge-video");
    }
    if (currentRecording.classList.contains("shrink-video")) {
      currentRecording.classList.remove("shrink-video");
    }

    recordingsURL.forEach((recording) => {
      if (recordingId !== recording.id) {
        const pausedRecording = document.querySelector(
          `.recordings-video-container-${recording.id}`
        );
        pausedRecording.classList.add("shrink-video");
      }
    });
  };

  const resizeVideo = (recordingId) => {
    if (current === recordingId) {
      recordingsURL.forEach((recordingData) => {
        const recording = document.querySelector(
          `.recordings-video-container-${recordingData.id}`
        );
        recording.classList.remove("shrink-video");
        recording.classList.remove("enlarge-video");
      });
    }
  };

  const onPause = (recordingId) => {
    resizeVideo(recordingId);
  };

  return (
    <section className="recordings-section content-margin">
      <h3>Recordings</h3>
      <ul className="recordings-videos-container">
        {recordingsURL.map((recording, index) => {
          return (
            <div
              key={index}
              className={`recordings-video-container recordings-video-container-${recording.id}`}
            >
              <ReactPlayer
                url={recording.url}
                width="100%"
                height="100%"
                controls
                playing={current === recording.id ? true : false}
                className={`recordings-youtube-video recordings-youtube-video-${recording.id}`}
                onPlay={() => onPlay(recording.id)}
                onPause={() => onPause(recording.id)}
              />
            </div>
          );
        })}
      </ul>
    </section>
  );
};

export default Recordings;
