import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import List from "./List";
import Upload from "./Upload";
import Navbartop from "./Navbartop";

function App() {
  return (
    <div className="App">
      <Routes>
      <Route path="/navbar" element={<Navbartop />} />
      <Route path="/home" element={<Home />} />
      <Route path="/list" element={<List />} />
      <Route path="*" element={<Upload />} />
      </Routes>
    </div>
  );
}

export default App;
