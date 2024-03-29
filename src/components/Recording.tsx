import React from "react";
import ReactPlayer from "react-player";

interface RecordingType {
  id: number;
  name: string;
  url: string;
}

interface RecordingProps {
  recording: RecordingType;
}

const Recording = ({ recording }: RecordingProps) => {
  return (
    <div className="duration-200 flex sm:h-144 h-128 flex-col justify-center bg-white sm:p-12 p-4 my-4 gap-4 absolute w-full">
      <p className="text-2xl text-[#EE2E31] sm:text-3xl">
        {recording.name}
      </p>
      <div className="h-fit">
        <ReactPlayer
          url={recording.url}
          controls
          width="100%"
          height="100%"
          className="aspect-video"
        />
      </div>
    </div>
  );
};

export default Recording;
