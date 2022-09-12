import "./Recordings.css";

const recordingOne = {
  name: "Cereusle",
  url: "https://www.youtube.com/embed/m_oA5_T2_UE",
};
const recordingTwo = {
  name: "A Sense of Loss",
  url: "https://www.youtube.com/embed/DuvWZ6DD7zc",
};
const recordingsURL = [recordingOne, recordingTwo];

const Recordings = () => {
  return (
    <section id="recordings-section">
      <ul className="recordings-video-container">
        {recordingsURL.map((recording) => {
          return (
            <iframe
              width="560"
              height="315"
              src={recording.url}
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
              className="recordings-video"
            ></iframe>
          );
        })}
      </ul>
    </section>
  );
};

export default Recordings;
