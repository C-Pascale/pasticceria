import { useRef, useState } from "react";

//Campo password per i form

type Props = {
  label: string;
  value: string;
  onChange: (val: string) => void;
  labelColor?: string;
};

export default function PasswordInput({ label, value, onChange }: Props) {
  const [show, setShow] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="mb-3">
      <label className="form-label">{label}</label>
      <div className="input-group">
        <input
          ref={inputRef}
          type={show ? "text" : "password"}
          className="form-control"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required
        />

        {/*Pulsante MostraPassword*/}
        <button
          type="button"
          className="btn border bg-white"
          onClick={() => {
            setShow((prev) => !prev);
            setTimeout(() => inputRef.current?.focus(), 0);
          }}
        >
          <img
            src={show ? "open-eye-30.png" : "closed-eye-30.png"}
            alt="toggle password"
            style={{ width: "20px", height: "20px" }}
          />
        </button>
      </div>
    </div>
  );
}
