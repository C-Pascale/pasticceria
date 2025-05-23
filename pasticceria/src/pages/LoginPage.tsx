import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // importa il context
import LoginForm from "../components/LoginForm";
import NavigationBar from "../components/NavigationBar";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth(); // usa il login dal context

  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await login(user, pass); // usa la funzione dal context
      if (result) {
        setSuccess(true);
        setTimeout(() => navigate("/backoffice"), 1500);
      } else {
        setError("Credenziali non valide");
      }
    } catch (err) {
      setError("Errore durante il login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <NavigationBar>
      <title>Login - Backoffice</title>

      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          minHeight: "100vh",
          background: "linear-gradient(to bottom, #fff0e5, #ffe6dc)",
        }}
      >
        <div
          className="card shadow-lg rounded-4 p-4"
          style={{
            maxWidth: "420px",
            width: "100%",
            backgroundColor: "#fff",
            border: "3px solid #9e5c43",
          }}
        >
          <h2
            className="text-center mb-4"
            style={{
              color: "#c94f4f",
              fontWeight: "700",
              fontFamily: "'Playfair Display', serif",
            }}
          >
            🎂 Area Riservata
          </h2>

          <LoginForm
            user={user}
            pass={pass}
            error={error}
            success={success}
            loading={loading}
            onUserChange={setUser}
            onPassChange={setPass}
            onSubmit={handleSubmit}
            onRegisterClick={() => navigate("/register")}
          />

          <div className="text-center mt-4">
            <button
              className="btn btn-link p-0"
              style={{
                color: "#b85c38",
                textDecoration: "underline",
                fontWeight: 500,
              }}
              onClick={() => navigate("/register")}
              disabled={loading}
            >
              Registra qui un nuovo utente!
            </button>
          </div>
        </div>
      </div>
    </NavigationBar>
  );
}
