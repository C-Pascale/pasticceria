import { Modal, Button } from "react-bootstrap";
import type { Dolce } from "../types";
import { ExclamationTriangleFill } from "react-bootstrap-icons";

type Props = {
  show: boolean;
  dolce: Dolce | null;
  onClose: () => void;
  onConfirm: () => void;
};

export default function DeleteConfirmationModal({
  show,
  dolce,
  onClose,
  onConfirm,
}: Props) {
  return (
    <Modal
      show={show}
      onHide={onClose}
      centered
      animation
      contentClassName="border-0 shadow-lg rounded-4"
    >
      <Modal.Header className="border-0 pb-0">
        <div className="d-flex align-items-center gap-3">
          <ExclamationTriangleFill color="#d65a4a" size={28} />
          <Modal.Title className="fw-bold" style={{ color: "#d65a4a" }}>
            Conferma Eliminazione
          </Modal.Title>
        </div>
        <button
          type="button"
          className="btn-close"
          aria-label="Close"
          onClick={onClose}
        />
      </Modal.Header>

      <Modal.Body
        className="text-center px-5 py-4"
        style={{
          background: "linear-gradient(135deg, #fff3e0 0%, #ffe6d6 100%)",
          borderRadius: "0 0 1rem 1rem",
          fontSize: "1.15rem",
          color: "#6f4e37",
          fontWeight: 500,
        }}
      >
        Sei sicuro di voler eliminare{" "}
        <strong style={{ color: "#d65a4a" }}>{dolce?.nome}</strong>?
      </Modal.Body>

      <Modal.Footer className="border-0 justify-content-center gap-3 pt-3">
        <Button
          variant="outline-secondary"
          onClick={onClose}
          style={{ borderRadius: "1.5rem", minWidth: "120px" }}
        >
          Annulla
        </Button>
        <Button
          variant="danger"
          onClick={onConfirm}
          style={{ borderRadius: "1.5rem", minWidth: "120px" }}
        >
          Elimina
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
