import type { Dolce } from "../types";
import { Table, Button } from "react-bootstrap";
import { useState, useMemo } from "react";

type Props = {
  dolci: Dolce[];
  onEdit: (dolce: Dolce) => void;
  onDelete: (id: string) => void;
};

export default function DolciList({ dolci, onEdit, onDelete }: Props) {
  const [sortAsc, setSortAsc] = useState(true);

  //Memorizza la lista in ordine alfabetico e la inverte
  const sortedDolci = useMemo(() => {
    const copy = [...dolci];
    copy.sort((a, b) => {
      const nameA = a.nome.toLowerCase();
      const nameB = b.nome.toLowerCase();
      if (nameA < nameB) return sortAsc ? -1 : 1;
      if (nameA > nameB) return sortAsc ? 1 : -1;
      return 0;
    });
    return copy;
  }, [dolci, sortAsc]);

  return (
    <div>
      {/*Container lista dolci*/}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0" style={{ color: "#388e3c", fontWeight: 600 }}>
          Dolci Disponibili
        </h5>
        <Button
          size="sm"
          variant="outline-secondary"
          onClick={() => setSortAsc(!sortAsc)}
          style={{ transition: "transform 0.2s ease" }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = "scale(1.05)")
          }
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          Ordina: {sortAsc ? "A → Z" : "Z → A"}
        </Button>
      </div>

      {/*Lista Dolci*/}
      <Table
        responsive
        hover
        className="shadow-sm rounded-4"
        style={{
          backgroundColor: "#ffffff",
          border: "2px solid #4caf50",
        }}
      >
        <thead style={{ backgroundColor: "#e2f7ef" }}>
          <tr>
            <th>Nome</th>
            <th>Prezzo</th>
            <th>Quantità</th>
            <th>Data Vendita</th>
            <th className="text-end">Azioni</th>
          </tr>
        </thead>
        <tbody>
          {sortedDolci.map((d) => (
            <tr key={d.id} style={{ transition: "background 0.2s ease" }}>
              <td style={{ color: "#6d4c41", fontWeight: 500 }}>{d.nome}</td>
              <td style={{ color: "#388e3c", fontWeight: 600 }}>
                €{d.prezzo.toFixed(2)}
              </td>

              <td>{d.quantita}</td>
              <td className="text-muted fst-italic">
                {new Date(d.data).toLocaleDateString()}
              </td>
              <td className="text-end">
                <Button
                  size="sm"
                  variant="outline-primary"
                  className="me-2"
                  style={{ transition: "transform 0.2s ease" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.05)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                  onClick={() => onEdit(d)}
                >
                  Modifica
                </Button>
                <Button
                  size="sm"
                  variant="outline-danger"
                  style={{ transition: "transform 0.2s ease" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.05)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                  onClick={() => onDelete(d.id)}
                >
                  Elimina
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
