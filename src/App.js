import TopBar from "./components/tobar/TopBar"
import Home from "./pages/home/Home"
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import Settings from "./pages/settings/Settings";

function App() {
  return (
    // react fragments
    <> 
      <TopBar/> 
      {/* <Home/> */}
      {/* <Single/> */}
      {/* <Write/> */}
      <Settings/>
    </>
  );
}

export default App;
