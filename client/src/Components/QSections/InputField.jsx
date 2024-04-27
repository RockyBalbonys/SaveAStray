import { FormHelperText, Input } from "@mui/material";

export default function InputField({
  label,
  sublabel,
  id,
  width,
  value,
  onChange,
}) {
  return (
    <div className={`input-container sm:flex-col sm:items-start lg:flex-row`}>
      <label htmlFor={id} className="lg:w-full lg:mr-5">
        <span className="font-bold">{label}</span>
        {sublabel && <br />}
        {sublabel}
      </label>
      <Input
        className="lg:w-full"
        value={value}
        onChange={(e) => onChange(id, e.target.value)}
        id={id}
        fullWidth
      />
      <FormHelperText sx={{ color: "red", ml: ".1rem" }}>
        Required*
      </FormHelperText>
    </div>
  );
}
