import "./Media.css";
import image1 from "../images/IMG_4645.jpg";
import image2 from "../images/IMG_4650.jpeg";
import image3 from "../images/IMG_4651.jpeg";
import image4 from "../images/IMG_4655.jpeg";
import image5 from "../images/IMG_4647.jpeg";

const recordingOne = {
  id: 1,
  name: "Cereusle",
  url: "https://www.youtube.com/embed/m_oA5_T2_UE",
};
const recordingTwo = {
  id: 2,
  name: "A Sense of Loss",
  url: "https://www.youtube.com/embed/DuvWZ6DD7zc",
};
const recordingsURL = [recordingOne, recordingTwo];

const Media = () => {
  return (
    <section className="media-section content-padding">
      <h3>Media</h3>
      <div className="media">
        <div className="recordings">
          {recordingsURL.map((recording, index) => {
            return (
              <div className="recordings-container">
                <iframe
                  src={recording.url}
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                  className="recordings-video"
                ></iframe>
              </div>
            );
          })}
        </div>
        <div className="photos">
          <img className="photo photo1" src={image1} alt="collin-and-luke" />
          <img className="photo photo2" src={image2} alt="collin-and-luke" />
          <img className="photo photo3" src={image3} alt="collin-and-luke" />
          <img className="photo photo4" src={image4} alt="collin-and-luke" />
          <img className="photo photo5" src={image5} alt="collin-and-luke" />
        </div>
      </div>
    </section>
  );
};

export default Media;
