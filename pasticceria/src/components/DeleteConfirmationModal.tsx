import { Modal, Button } from "react-bootstrap";
import type { Dolce } from "../types";

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
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Conferma Eliminazione</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Sei sicuro di voler eliminare il dolce{" "}
        <strong>{dolce?.nome ?? ""}</strong>?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Annulla
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          Elimina
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
