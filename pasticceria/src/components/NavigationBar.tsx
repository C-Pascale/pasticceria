import type { ReactNode } from "react";
import {
  Navbar,
  Nav,
  Container,
  Button,
  Form,
  InputGroup,
} from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function NavigationBar({ children }: { children: ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const isBackoffice = location.pathname.startsWith("/backoffice");
  const isVetrina = location.pathname === "/";

  // Sincronizza searchTerm con la query string
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get("q") || "";
    setSearchTerm(q);
  }, [location.search]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchTerm(val);
    navigate(`/?q=${encodeURIComponent(val)}`, { replace: true });
  };

  return (
    <div className="mt-4">
      {/*Barra Navigazionale*/}
      <Navbar
        expand="lg"
        fixed="top"
        className="shadow-sm"
        style={{
          background: "rgba(255, 248, 240, 0.85)",
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
          borderBottom: "1px solid rgba(0,0,0,0.05)",
        }}
      >
        <Container>
          <Navbar.Brand
            onClick={() => navigate("/")}
            style={{
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "1.5rem",
              color: "#b85c38",
              fontFamily: "'Playfair Display', serif",
            }}
          >
            🧁 Pasticceria
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {/*Barra di Ricerca*/}
            {isVetrina && (
              <Form
                className="justify-content-center mx-auto"
                onSubmit={(e) => e.preventDefault()}
              >
                <InputGroup>
                  <Form.Control
                    type="search"
                    placeholder="🔍Cerca dolci..."
                    value={searchTerm}
                    onChange={handleChange}
                    style={{ minWidth: "300px" }}
                  />
                </InputGroup>
              </Form>
            )}

            {/*Pulsante Home*/}
            <Nav className="ms-auto align-items-center">
              <Nav.Link
                onClick={() => navigate("/")}
                className="mx-2 nav-link-custom"
              >
                Home
              </Nav.Link>

              {/*Informazioni*/}
              <Nav.Link
                href="https://github.com/C-Pascale"
                className="mx-2 nav-link-custom"
              >
                Chi siamo
              </Nav.Link>

              {/*Pulsante Home*/}

              <Nav.Link className="mx-2 nav-link-custom">Servizi</Nav.Link>

              {/*Pulsante Contatti*/}
              <Nav.Link
                href="https://www.linkedin.com/in/carmine-pascale/"
                className="mx-2 nav-link-custom"
              >
                Contatti
              </Nav.Link>

              {/*Pulsante Backoffice o di ritorno alla Vetrina*/}
              {!isBackoffice ? (
                isVetrina ? (
                  <Button
                    variant="primary"
                    className="ms-3 shadow-sm"
                    style={{
                      backgroundColor: "#b85c38",
                      borderColor: "#b85c38",
                    }}
                    onClick={() => navigate("/backoffice")}
                  >
                    Vai al Backoffice
                  </Button>
                ) : (
                  <Button
                    variant="outline-secondary"
                    className="ms-3"
                    onClick={() => navigate("/")}
                  >
                    Torna alla Vetrina
                  </Button>
                )
              ) : (
                <Button
                  variant="outline-danger"
                  className="ms-3"
                  onClick={() => navigate("/")}
                >
                  Torna alla Vetrina
                </Button>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {children}
    </div>
  );
}
