import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom"; // importa useNavigate
import { v4 as uuidv4 } from "uuid";
import type { Dolce } from "../types";
import {
  getDolci,
  createDolce,
  deleteDolce,
  updateDolce,
} from "../services/api";
import DolceForm from "../components/DolceForm";
import DolciList from "../components/DolciList";
import NavigationBar from "../components/NavigationBar";
import DuplicateWarning from "../components/DuplicateWarning";
import { Alert, Button } from "react-bootstrap";
import { useAuth } from "../context/AuthContext"; // importa useAuth

const oggi = new Date().toISOString().split("T")[0];

export default function Backoffice() {
  const [dolci, setDolci] = useState<Dolce[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<Dolce, "id">>({
    nome: "",
    prezzo: 0,
    data: oggi,
    quantita: 0,
    ingredienti: [],
  });
  const [error, setError] = useState<string | null>(null);

  const { logout } = useAuth(); // prendi logout dal context
  const navigate = useNavigate(); // per redirect dopo logout

  useEffect(() => {
    getDolci().then(setDolci);
  }, []);

  const isDuplicate = useMemo(() => {
    return dolci.some(
      (d) =>
        d.nome.trim().toLowerCase() === form.nome.trim().toLowerCase() &&
        d.id !== editingId
    );
  }, [form.nome, dolci, editingId]);

  const handleSubmit = async () => {
    if (form.quantita <= 0) {
      setError("Quantità non valida.");
      return;
    }
    if (!form.nome.trim()) {
      setError("Il nome del dolce è obbligatorio.");
      return;
    }
    if (form.prezzo <= 0) {
      setError("Il prezzo deve essere maggiore di zero.");
      return;
    }
    if (isDuplicate) {
      setError("Questo dolce è già presente.");
      return;
    }

    setError(null);

    const dolceToSave: Dolce = {
      ...form,
      id: editingId || uuidv4(),
    };

    if (editingId) {
      await updateDolce(editingId, dolceToSave);
      setDolci((list) =>
        list.map((d) => (d.id === editingId ? dolceToSave : d))
      );
    } else {
      await createDolce(dolceToSave);
      setDolci((list) => [...list, dolceToSave]);
    }

    setForm({ nome: "", prezzo: 0, data: oggi, quantita: 0, ingredienti: [] });
    setEditingId(null);
  };

  const handleDelete = async (id: string) => {
    await deleteDolce(id);
    setDolci((list) => list.filter((d) => d.id !== id));
  };

  const handleEdit = (dolce: Dolce) => {
    setEditingId(dolce.id);
    setForm({
      nome: dolce.nome,
      prezzo: dolce.prezzo,
      data: dolce.data,
      quantita: dolce.quantita,
      ingredienti: dolce.ingredienti,
    });
    setError(null);
  };

  // Funzione logout e redirect
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <NavigationBar>
      <title>Backoffice Pasticceria</title>
      <main
        style={{
          background: "linear-gradient(to bottom right, #fff3e0, #ffe6d6)",
          minHeight: "100vh",
          paddingTop: "4rem",
          paddingBottom: "4rem",
        }}
      >
        <div className="container">
          {/* Header con titolo e logout */}
          <header className="d-flex justify-content-between align-items-center mb-5">
            <h1 className="display-4 fw-bold" style={{ color: "#6f4e37" }}>
              Gestione Dolci
            </h1>
            <Button variant="outline-danger" onClick={handleLogout}>
              Logout
            </Button>
          </header>

          <div className="row g-5">
            <section className="col-12 col-md-5">
              <div
                className="card shadow-lg rounded-5 p-4 h-100"
                style={{
                  backgroundColor: "#ffe0d6",
                  borderLeft: "8px solid #f88379",
                }}
              >
                <h5 className="fw-bold mb-4" style={{ color: "#d65a4a" }}>
                  {editingId ? "Modifica Dolce" : "Nuovo Dolce"}
                </h5>

                <DolceForm
                  form={form}
                  editing={!!editingId}
                  onChange={setForm}
                  onSubmit={handleSubmit}
                />
                <DuplicateWarning show={isDuplicate} />
                {error && (
                  <Alert variant="danger" className="mt-3">
                    {error}
                  </Alert>
                )}
              </div>
            </section>

            <section className="col-12 col-md-7">
              <div
                className="card shadow-lg rounded-5 p-4 h-100"
                style={{
                  backgroundColor: "#e2f7ef",
                  overflowY: "auto",
                  maxHeight: "75vh",
                }}
              >
                <h5 className="fw-bold mb-4" style={{ color: "#4caf50" }}>
                  Lista Dolci
                </h5>
                {dolci.length > 0 ? (
                  <DolciList
                    dolci={dolci}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ) : (
                  <p
                    className="text-center fst-italic"
                    style={{ color: "#6f4e37" }}
                  >
                    Nessun dolce disponibile.
                  </p>
                )}
              </div>
            </section>
          </div>
        </div>
      </main>
    </NavigationBar>
  );
}
