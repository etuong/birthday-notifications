import "./App.scss";
import Authentication from "./components/Authentication";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Authentication />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
