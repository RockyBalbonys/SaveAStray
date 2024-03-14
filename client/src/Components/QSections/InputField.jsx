import { Input } from "@mui/material";

export default function InputField({ label, sublabel, id, width }) {
  return (
    <div className={`input-container ${width}`}>
      <label htmlFor={id}>
        <span className="font-bold">{label}</span>
        {sublabel && <br />}
        {sublabel}
      </label>
      <Input id={id} fullWidth />
    </div>
  );
}
