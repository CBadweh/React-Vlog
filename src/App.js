import TopBar from "./components/tobar/TopBar"
import Home from "./pages/home/Home"
import Single from "./pages/single/Single";

function App() {
  return (
    // react fragments
    <> 
      <TopBar/> 
      {/* <Home/> */}
      <Single/>
    </>
  );
}

export default App;
