import { useState } from "react";
import { register } from "../services/api";
import { useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap";
import PasswordInput from "../components/PasswordInput";
import NavigationBar from "../components/NavigationBar";

//Pagina di Registrazione

export default function RegisterPage() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errore, setErrore] = useState("");
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrore("");

    if (pass !== confirm) {
      setErrore("Le password non coincidono");
      return;
    }

    const result = await register(user, pass);
    if (result) {
      setSuccess(true);
      setTimeout(() => navigate("/login"), 2000);
    } else {
      setErrore("Username già in uso. Scegline un altro.");
    }
  };

  return (
    <NavigationBar>
      <title>Registrazione</title>

      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          minHeight: "100vh",
          background: "linear-gradient(to right, #fff3e0, #ffe0b2)",
          fontFamily: "'Inter', sans-serif",
        }}
      >
        <div
          className="card shadow-lg p-5 rounded-5"
          style={{
            maxWidth: "460px",
            width: "100%",
            background: "#fffdf7",
            border: "2px solid #ffb74d",
            boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
            transition: "transform 0.3s ease",
          }}
        >
          <h2
            className="text-center mb-4"
            style={{
              color: "#d84315",
              fontWeight: "700",
              fontFamily: "'Playfair Display', serif",
              letterSpacing: "1px",
              fontSize: "2rem",
            }}
          >
            Registra un nuovo account
          </h2>

          {/*Form di registrazione*/}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label
                className="form-label fw-semibold"
                style={{ color: "#5d4037", fontSize: "0.95rem" }}
              >
                Username
              </label>
              <input
                type="text"
                className="form-control rounded-3"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                required
              />
            </div>

            <PasswordInput
              label="Password"
              value={pass}
              onChange={setPass}
              labelColor="#5d4037"
            />

            <PasswordInput
              label="Conferma Password"
              value={confirm}
              onChange={setConfirm}
              labelColor="#5d4037"
            />

            {errore && (
              <Alert variant="danger" className="mt-3 text-center">
                {errore}
              </Alert>
            )}
            {success && (
              <Alert variant="success" className="mt-3 text-center">
                Registrazione completata! Reindirizzamento...
              </Alert>
            )}

            {/*Pulsante di Submit*/}
            <button
              type="submit"
              className="btn w-100 mt-4 fw-bold rounded-pill"
              style={{
                backgroundColor: "#ff7043",
                border: "none",
                color: "#fff",
                fontSize: "1.1rem",
                transition: "background 0.3s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#f4511e")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#ff7043")
              }
            >
              Crea Account
            </button>

            {/*Passaggio al Login*/}
            <button
              type="button"
              className="btn btn-link w-100 mt-3"
              onClick={() => navigate("/login")}
              style={{
                color: "#8d6e63",
                fontWeight: "500",
                textDecoration: "underline",
              }}
            >
              L'utente esiste già? Accedi qui!
            </button>
          </form>
        </div>
      </div>
    </NavigationBar>
  );
}
