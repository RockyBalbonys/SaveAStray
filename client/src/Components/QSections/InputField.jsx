import { FormHelperText, Input } from "@mui/material";

export default function InputField({
  label,
  sublabel,
  id,
  width,
  value,
  onChange,
  isAnswer,
}) {
  return (
    <div
      className={`input-container sm:flex-col sm:items-start lg:flex lg:flex-row lg:justify-start`}
    >
      <label htmlFor={id} className="lg:w-1/2 lg:mr-5">
        <span className="font-bold">{label}</span>
        {sublabel && <br />}
        {sublabel}
      </label>
      {isAnswer ? (
        <div className="lg:w-full border-b-[1px] border-gray-800 font-bold">
          <p>{value}</p>
        </div>
      ) : (
        <Input
          className="lg:w-1/2"
          value={value}
          onChange={(e) => onChange(id, e.target.value)}
          id={id}
          fullWidth
        />
      )}

      {!isAnswer && (
        <FormHelperText sx={{ color: "red", ml: ".1rem" }}>
          Required*
        </FormHelperText>
      )}
    </div>
  );
}
