import Nav from "./components/Nav";
import Bio from "./components/Bio";
import Gallery from "./components/Gallery";
import "./App.css";

const App = () => {
  return (
    <>
      <Nav />
      <div className="container">
        <Bio />
        <Gallery />
      </div>
    </>
  );
};

export default App;
