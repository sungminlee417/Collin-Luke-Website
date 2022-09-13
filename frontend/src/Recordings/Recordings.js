import "./Recordings.css";
import YouTube from "react-youtube";

const recordingOne = {
  name: "Cereusle",
  url: "m_oA5_T2_UE",
};
const recordingTwo = {
  name: "A Sense of Loss",
  url: "DuvWZ6DD7zc",
};
const recordingsURL = [recordingOne, recordingTwo];

const Recordings = () => {
  return (
    <section className="recordings-section content-margin">
      <h3>(2) Recordings</h3>
      <ul className="recordings-video-container">
        {recordingsURL.map((recording, index) => {
          const opts = {
            height: "100%",
            width: "100%",
          };
          return (
            <YouTube
              videoId={recording.url}
              opts={opts}
              className="recordings-youtube-video"
              // iframeClassName={string}          // defaults -> ''
              // style={object}                    // defaults -> {}
              // title={string}                    // defaults -> ''
              // loading={string}                  // defaults -> undefined
              // opts={obj}                        // defaults -> {}
              // onReady={func}                    // defaults -> noop
              // onPlay={func}                     // defaults -> noop
              // onPause={func}                    // defaults -> noop
              // onEnd={func}                      // defaults -> noop
              // onError={func}                    // defaults -> noop
              // onStateChange={func}              // defaults -> noop
              // onPlaybackRateChange={func}       // defaults -> noop
              // onPlaybackQualityChange={func}    // defaults -> noop
            />
          );
        })}
      </ul>
    </section>
  );
};

export default Recordings;
