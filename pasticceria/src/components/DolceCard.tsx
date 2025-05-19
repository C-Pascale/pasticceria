import type { Dolce } from "../types";
import { getPrezzoAttuale } from "../services/api";

interface Props {
  dolce: Dolce;
}

//Stampa del Dolce
export default function DolceCard({ dolce }: Props) {
  const prezzo = getPrezzoAttuale(dolce);
  if (prezzo === null || dolce.quantita <= 0) return null;

  const haSconto = prezzo < dolce.prezzo;
  const scontoPercentuale = haSconto
    ? Math.round(100 - (prezzo / dolce.prezzo) * 100)
    : 0;

  return (
    <div className="col-sm-6 col-md-4">
      {/*Vetrina dei dolci disponibili*/}
      <div
        className="card h-100 border-0 shadow rounded-4 bg-light position-relative overflow-hidden"
        style={{
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget;
          el.style.transform = "scale(1.03)";
          el.style.boxShadow = "0 12px 24px rgba(0,0,0,0.15)";
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget;
          el.style.transform = "scale(1)";
          el.style.boxShadow = "0 6px 12px rgba(0,0,0,0.08)";
        }}
      >
        {/*Istanza di ogni sconto*/}
        <div className="card-body d-flex flex-column justify-content-between p-4">
          <div>
            <h5 className="card-title fw-bold" style={{ color: "#6d4c41" }}>
              {dolce.nome}
            </h5>

            {/*Prezzo dolce*/}
            <div className="mb-3">
              <span className="fs-5 fw-bold me-2" style={{ color: "#388e3c" }}>
                €{prezzo.toFixed(2)}
              </span>

              {/*Sconto*/}
              {haSconto ? (
                <div>
                  <span className="text-muted text-decoration-line-through me-2">
                    €{dolce.prezzo.toFixed(2)}
                  </span>
                  <span className="badge bg-danger rounded-pill">
                    -{scontoPercentuale}%
                  </span>
                </div>
              ) : (
                <span className="badge bg-success rounded-pill">Fresco</span>
              )}
            </div>

            {/*Dettagli dolce*/}
            <p className="card-text text-muted small mb-3">
              <strong>Ingredienti:</strong> {dolce.ingredienti.join(", ")}{" "}
              <br />
              <strong>Disponibilità:</strong>{" "}
              <span className={dolce.quantita <= 3 ? "text-danger" : ""}>
                {dolce.quantita}
              </span>
            </p>
          </div>

          {/*Data*/}
          <div className="text-end">
            <small className="text-muted fst-italic">
              Data: {new Date(dolce.data).toLocaleDateString()}
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}
