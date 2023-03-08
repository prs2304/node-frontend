import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import List from "./List";
import Upload from "./Upload";
import Navbartop from "./Navbartop";
import Login from "./Login";
import Register from "./Register";
import PrivateComponent from './PrivateComponent';
import NoAuth from "./NoAuth";
import Users from "./Users";

function App() {
  return (
    <div className="App">
      <Routes>

      <Route element={<PrivateComponent/>}>
      <Route path="/navbar" element={<Navbartop />} />
      <Route path="/home" element={<Home />} />
      <Route path="/list" element={<List />} />
      <Route path="/users" element={<Users />} />
      <Route path="/upload" element={<Upload />} />
      </Route>
      <Route path="/noauth" element={<NoAuth />} />
      <Route path="*" element={<Login />} />
      <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
