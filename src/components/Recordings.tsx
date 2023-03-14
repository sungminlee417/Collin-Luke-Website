import React from "react";
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

  const onPlay = (recordingId: number): void => {
    setCurrent(recordingId);
  };

  return (
    <section className="recordings-section flex flex-col gap-14 md:m-20 m-12">
      <h3>Recordings</h3>
      <ul className="flex flex-col gap-10 py-12">
        {recordingsURL.map((recording, index) => {
          return (
            <div key={index} className="relative h-0 lg:pb-208 md:pb-160 pb-96">
              <ReactPlayer
                url={recording.url}
                width="560"
                height="315"
                controls
                playing={current === recording.id ? true : false}
                className="absolute top-0 left-0 w-full h-full"
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
