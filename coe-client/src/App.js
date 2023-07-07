import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { MainPage } from "./DD/components/MainPage";

function App() {
  return (
    <div className="App">
      <Router>

        <Routes>
          {/* <Route exact path="/" element={} /> */}
          <Route exact path="/landingpage" element={<MainPage />} />
          {/* <Route exact path="/flowmanager" element={} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
