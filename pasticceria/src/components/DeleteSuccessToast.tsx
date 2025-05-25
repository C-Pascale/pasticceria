import { Toast, ToastContainer } from "react-bootstrap";
import { TrashFill } from "react-bootstrap-icons";

type Props = {
  show: boolean;
  dolceNome: string;
  onClose: () => void;
};

export function DeleteSuccessToast({ show, dolceNome, onClose }: Props) {
  return (
    <ToastContainer
      position="bottom-end"
      className="p-3"
      style={{ zIndex: 1080 }}
    >
      <Toast
        onClose={onClose}
        show={show}
        delay={3500}
        autohide
        className="shadow-lg rounded-4 border-0"
        style={{
          minWidth: "300px",
          background: "linear-gradient(135deg, #e53935, #d32f2f)",
          color: "white",
          boxShadow: "0 8px 20px rgba(211, 47, 47, 0.4)",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          transition: "opacity 0.4s ease, transform 0.4s ease",
          opacity: show ? 1 : 0,
          transform: show ? "translateY(0)" : "translateY(20px)",
          pointerEvents: show ? "auto" : "none",
        }}
      >
        <Toast.Header
          closeButton={false}
          className="d-flex align-items-center"
          style={{
            background: "transparent",
            borderBottom: "none",
            paddingBottom: 8,
          }}
        >
          <TrashFill size={22} className="me-2" />
          <strong style={{ fontWeight: 700, fontSize: "1.1rem", flexGrow: 1 }}>
            Eliminazione riuscita
          </strong>
          <button
            aria-label="Close"
            onClick={onClose}
            style={{
              background: "transparent",
              border: "none",
              color: "white",
              fontSize: 20,
              cursor: "pointer",
              lineHeight: 1,
            }}
          >
            ×
          </button>
        </Toast.Header>
        <Toast.Body
          style={{ fontWeight: 500, fontSize: "1rem", paddingTop: 0 }}
        >
          {dolceNome}
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
}
