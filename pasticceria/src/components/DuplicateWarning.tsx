// src/components/DuplicateWarning.tsx
import { Alert } from "react-bootstrap";

//Controllo Dolce già inserito

type Props = {
  show: boolean;
};

export default function DuplicateWarning({ show }: Props) {
  if (!show) return null;

  return (
    <Alert variant="warning" className="mt-3">
      ⚠️ Questo dolce è già presente nella lista.
    </Alert>
  );
}
