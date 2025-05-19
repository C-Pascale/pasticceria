import { useEffect, useState } from "react";
import type { Dolce } from "../types";

//Gestione del Form per l'inserimento di un nuovo dolce

type Props = {
  form: Omit<Dolce, "id">;
  editing: boolean;
  onChange: (form: Omit<Dolce, "id">) => void;
  onSubmit: () => void;
};

export default function DolceForm({
  form,
  editing,
  onChange,
  onSubmit,
}: Props) {
  const [localPrice, setLocalPrice] = useState(
    form.prezzo.toString().replace(".", ",")
  );

  useEffect(() => {
    setLocalPrice(form.prezzo.toString().replace(".", ","));
  }, [form.prezzo]);

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalPrice(value);

    if (/^[0-9]+([,][0-9]{0,2})?$/.test(value)) {
      const numericValue = parseFloat(value.replace(",", "."));
      onChange({
        ...form,
        prezzo: numericValue,
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange({
      ...form,
      [name]: name === "quantita" ? Number(value) : value,
    });
  };

  const handleIngredientiChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    onChange({
      ...form,
      ingredienti: e.target.value.split(",").map((i) => i.trim()),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    //Form Inserimento Dolce

    <form onSubmit={handleSubmit} className="mb-4">
      {/*Nome Dolce*/}
      <div className="mb-3">
        <label className="form-label">Nome</label>
        <input
          type="text"
          name="nome"
          value={form.nome}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>

      {/*Prezzo Dolce*/}
      <div className="mb-3">
        <label className="form-label">Prezzo (€)</label>
        <input
          type="text"
          name="prezzo"
          value={localPrice}
          onChange={handlePriceChange}
          className="form-control"
          required
          inputMode="decimal"
          pattern="[0-9]+([,][0-9]{0,2})?"
          title="Inserisci un valore numerico con al massimo 2 decimali (es. 12,50)"
        />
        <small className="text-muted">
          Usa la virgola come separatore decimale
        </small>
      </div>

      {/*Data Dolce*/}
      <div className="mb-3">
        <label className="form-label">Data di Vendita</label>
        <input
          type="date"
          name="data"
          value={form.data}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>

      {/*Quantità Dolce*/}
      <div className="mb-3">
        <label className="form-label">Quantità</label>
        <input
          type="number"
          name="quantita"
          value={form.quantita}
          onChange={handleChange}
          className="form-control"
          required
          min="0"
        />
      </div>

      {/*Ingredienti Dolce*/}
      <div className="mb-3">
        <label className="form-label">Ingredienti</label>
        <textarea
          name="ingredienti"
          value={form.ingredienti.join(", ")}
          onChange={handleIngredientiChange}
          className="form-control"
        />
        <small className="text-muted">
          Usa la virgola per separare gli ingredienti
        </small>
      </div>

      {/*Pulsante Inserimento Dolce*/}
      <button type="submit" className="btn btn-primary">
        {editing ? "Salva Modifiche" : "Aggiungi Dolce"}
      </button>
    </form>
  );
}
