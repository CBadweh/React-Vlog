import TopBar from "./components/tobar/TopBar"
import Home from "./pages/home/Home"
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";

function App() {
  return (
    // react fragments
    <> 
      <TopBar/> 
      {/* <Home/> */}
      {/* <Single/> */}
      <Write/>
    </>
  );
}

export default App;
