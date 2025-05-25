import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { useAuth } from "../context/AuthContext";
import DeleteConfirmModal from "../components/DeleteConfirmationModal";
import { EditSuccessToast } from "../components/EditSuccessToast";
import { DeleteSuccessToast } from "../components/DeleteSuccessToast";
import { CreateSuccessToast } from "../components/CreatSuccessToast";

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

  const { logout } = useAuth();
  const navigate = useNavigate();
  const [dolceDaRimuovere, setDolceDaRimuovere] = useState<Dolce | null>(null);
  const [showConferma, setShowConferma] = useState(false);

  // Nuovi stati per toast
  const [showEditToast, setShowEditToast] = useState(false);
  const [showDeleteToast, setShowDeleteToast] = useState(false);
  const [showCreateToast, setShowCreateToast] = useState(false);
  const [toastDolceName, setToastDolceName] = useState("");

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
    if (isNaN(form.prezzo) || form.prezzo <= 0) {
      setError("Il prezzo deve essere un numero maggiore di zero.");
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
      setToastDolceName(dolceToSave.nome);
      setShowEditToast(true);
    } else {
      await createDolce(dolceToSave);
      setDolci((list) => [...list, dolceToSave]);
      setToastDolceName(dolceToSave.nome);
      setShowCreateToast(true);
    }

    setForm({ nome: "", prezzo: 0, data: oggi, quantita: 0, ingredienti: [] });
    setEditingId(null);
  };

  const handleRequestDelete = (id: string) => {
    const dolce = dolci.find((d) => d.id === id);
    if (dolce) {
      setDolceDaRimuovere(dolce);
      setShowConferma(true);
    }
  };

  const handleDelete = async () => {
    if (dolceDaRimuovere) {
      await deleteDolce(dolceDaRimuovere.id);
      setDolci((list) => list.filter((d) => d.id !== dolceDaRimuovere.id));
      setToastDolceName(dolceDaRimuovere.nome);
      setShowDeleteToast(true);
      setShowConferma(false);
      setDolceDaRimuovere(null);
    }
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
                    onDelete={handleRequestDelete}
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

      <DeleteConfirmModal
        show={showConferma}
        dolce={dolceDaRimuovere}
        onClose={() => setShowConferma(false)}
        onConfirm={handleDelete}
      />

      <>
        <EditSuccessToast
          show={showEditToast}
          onClose={() => setShowEditToast(false)}
          dolceNome={toastDolceName}
        />
        <DeleteSuccessToast
          show={showDeleteToast}
          onClose={() => setShowDeleteToast(false)}
          dolceNome={toastDolceName}
        />
        <CreateSuccessToast
          show={showCreateToast}
          onClose={() => setShowCreateToast(false)}
          dolceNome={toastDolceName}
        />
      </>
    </NavigationBar>
  );
}
