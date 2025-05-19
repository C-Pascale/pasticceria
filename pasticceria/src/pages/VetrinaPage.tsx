import { useEffect, useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import type { Dolce } from "../types";
import { getDolci } from "../services/api";
import DolceCard from "../components/DolceCard";
import NavigationBar from "../components/NavigationBar";
import CarouselHome from "../components/Carousel";

export default function Vetrina() {
  const [dolci, setDolci] = useState<Dolce[]>([]);
  const location = useLocation();

  // 1. Estrai il parametro q dalla query string
  const query = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return params.get("q")?.toLowerCase().trim() || "";
  }, [location.search]);

  useEffect(() => {
    getDolci().then(setDolci);
  }, []);

  // 2. Filtra i dolci in base a `query`
  const filteredDolci = useMemo(() => {
    if (!query) return dolci;
    return dolci.filter((d) => d.nome.toLowerCase().includes(query));
  }, [dolci, query]);

  return (
    <NavigationBar>
      <title>Vetrina Pasticceria</title>

      <div
        className="min-vh-100 py-5"
        style={{
          background: "linear-gradient(to bottom, #fff3e0, #ffe0b2)",
          fontFamily: "'Inter', sans-serif",
        }}
      >
        {/* Mostra il carousel SOLO se query è vuoto */}
        {!query && <CarouselHome />}

        {/*Titolo Pagina*/}
        <div className="container py-5">
          <div className="text-center mb-5">
            <h1
              className="display-4 fw-bold"
              style={{
                color: "#bf360c",
                fontFamily: "'Playfair Display', serif",
              }}
            >
              Le Nostre Specialità Dolciarie
            </h1>
            <p
              className="fs-5 text-muted"
              style={{ maxWidth: "600px", margin: "0 auto" }}
            >
              Ogni dolce è preparato con cura artigianale e ingredienti
              selezionati. Lasciati tentare dalla nostra selezione giornaliera.
            </p>
          </div>

          {/*Contenitore Vetrina*/}
          <div
            className="row justify-content-center g-4  rounded-5 p-3"
            style={{ background: "#ffcc80" }}
          >
            {/*Lista dolci per vetrina*/}
            {filteredDolci.length === 0 ? (
              <p className="text-center text-secondary">
                {query
                  ? `Nessun dolce corrisponde a “${query}”.`
                  : "Al momento non ci sono dolci disponibili."}
              </p>
            ) : (
              filteredDolci.map((dolce) => (
                <DolceCard key={dolce.id} dolce={dolce} />
              ))
            )}
          </div>
        </div>
      </div>
    </NavigationBar>
  );
}
