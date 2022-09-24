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
  const [current, setCurrent] = useState(null);

  const onPlay = (recordingId) => {
    setCurrent(recordingId);
  };

  return (
    <section className="recordings-section content-padding">
      <h3>Recordings</h3>
      <ul className="recordings-videos-container">
        {recordingsURL.map((recording, index) => {
          return (
            <div key={index} className={`recordings-video-container`}>
              <ReactPlayer
                url={recording.url}
                width="560"
                height="315"
                controls
                playing={current === recording.id ? true : false}
                className={`recordings-youtube-video recordings-youtube-video-${recording.id}`}
                onPlay={() => onPlay(recording.id)}
              />
            </div>
          );
        })}
      </ul>
    </section>
  );
};

export default Recordings;
