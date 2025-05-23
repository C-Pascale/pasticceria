import { Routes, Route } from "react-router-dom";
import Vetrina from "./pages/VetrinaPage";
import Login from "./pages/LoginPage";
import Register from "./pages/RegisterPage";
import Backoffice from "./pages/BackofficePage";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Vetrina />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/backoffice"
        element={
          <PrivateRoute>
            <Backoffice />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
