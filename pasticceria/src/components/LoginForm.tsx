import { Alert } from "react-bootstrap";
import PasswordInput from "./PasswordInput";

//Form di login

type LoginFormProps = {
  user: string;
  pass: string;
  error: string;
  success: boolean;
  loading: boolean;
  onUserChange: (value: string) => void;
  onPassChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onRegisterClick: () => void;
};

export default function LoginForm({
  user,
  pass,
  error,
  success,
  onUserChange,
  onPassChange,
  onSubmit,
}: LoginFormProps) {
  return (
    //Form di login
    <form onSubmit={onSubmit}>
      {/*Usarname Login*/}
      <div className="mb-3">
        <label className="form-label fw-semibold text-secondary">
          Nome utente
        </label>
        <input
          type="text"
          className={`form-control shadow-sm ${error ? "is-invalid" : ""}`}
          value={user}
          onChange={(e) => onUserChange(e.target.value)}
          required
        />
      </div>

      {/*Password Login*/}
      <PasswordInput label="Password" value={pass} onChange={onPassChange} />

      {/*Gestione errori Login*/}
      {error && (
        <Alert variant="danger" className="mt-3">
          {error}
        </Alert>
      )}
      {success && (
        <Alert variant="success" className="mt-3">
          ✅ Accesso effettuato! Reindirizzamento...
        </Alert>
      )}

      {/*Pulsante Login*/}
      <div className="d-flex gap-2 mt-4">
        <button
          type="submit"
          className="btn w-100 text-white fw-semibold"
          style={{
            backgroundColor: "#e2725b",
            borderColor: "#e2725b",
          }}
        >
          Accedi
        </button>
      </div>
    </form>
  );
}
