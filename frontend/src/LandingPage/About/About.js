import "./About.css";
import image from "../../images/IMG_4655.jpeg";

const About = () => {
  return (
    <section id="about-section">
      <header id="about-section-header">(1) About</header>
      <h1 id="about-large-text">Lorem ipsum dolor sit</h1> 
      <h2 id="about-small-text">amet consectetur adipisicing elit. Culpa repellendus totam consequatur sed labore at ipsum dolorem commodi sequi cum! Error minima quam suscipit id placeat fuga, ipsa commodi repellat?</h2>
      <div id="box-behind-duo"></div>
      <div class="about-image-duo">
        <img src= {image} alt="Collin and Luke"></img>
      </div>
    </section>
  );
};

export default About;
