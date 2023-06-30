import "./App.scss";
import Auth from "./components/Auth";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "react-tiny-fab/dist/styles.css";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
