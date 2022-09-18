import Div100vh from "react-div-100vh";
import Navigation from "./Navigation";
import Hero from "./Hero";
import About from "./About";
import Recordings from "./Recordings";
import Photos from "./Photos";
import Contact from "./Contact";

function App() {
  return (
    <Div100vh>
      <Navigation />
      <Hero />
      <About />
      <Recordings />
      <Photos />
      <Contact />
    </Div100vh>
  );
}

export default App;
