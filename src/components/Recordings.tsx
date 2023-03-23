import React from "react";
import ReactPlayer from "react-player";
import { useState } from "react";
import album from "../images/IMG_6718.jpg";

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
      <h2 className="text-4xl">Recordings</h2>
      <div className="flex flex-col items-center gap-20">
        <ul className="lg:grid grid-cols-2 lg:gap-16 gap-10 mx-0 items-center w-full">
          {recordingsURL.map((recording, index) => {
            return (
              <div key={recording.id}>
                <ReactPlayer
                  url={recording.url}
                  controls
                  width="100%"
                  height="100%"
                  playing={current === recording.id ? true : false}
                  className="aspect-video"
                  onPlay={() => onPlay(recording.id)}
                />
              </div>
            );
          })}
        </ul>
        <img src={album} className="shadow-lg w-[50%]" />
      </div>
    </section>
  );
};

export default Recordings;
