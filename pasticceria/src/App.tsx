import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Vetrina from "./pages/VetrinaPage";
import Login from "./pages/LoginPage";
import Register from "./pages/RegisterPage";
import Backoffice from "./pages/BackofficePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Vetrina />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/backoffice" element={<Backoffice />} />
      </Routes>
    </Router>
  );
}

export default App;
