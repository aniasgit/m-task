import { useState } from "react";
import { TextField } from "@mui/material";

interface PageSizeInputInterface {
  size?: number;
  onChange: (size: number) => void;
  onValidation: (hasError: boolean) => void;
}

export const PageSizeInput = ({
  size,
  onChange,
  onValidation,
}: PageSizeInputInterface) => {
  const [error, setError] = useState("");
  const [value, setValue] = useState(size?.toString() || "");

  const isError = error !== "";

  const handleChange = (enteredValue: string) => {
    setValue(enteredValue);

    if (!Number.isInteger(+enteredValue)) {
      setError("Please enter an integer.");
      onValidation(true);
    } else if (+enteredValue <= 0) {
      setError("Please enter a number greater than zero.");
      onValidation(true);
    } else {
      onChange(+enteredValue);
      onValidation(false);
      setError("");
    }
  };

  const handleBlur = () => {
    onValidation(isError);
  };

  return (
    <TextField
      id="page-size"
      label="Tags per page"
      type="number"
      value={value}
      onChange={(event) => handleChange(event.target.value)}
      onBlur={handleBlur}
      error={isError}
      helperText={error}
      sx={{
        width: 160,
        input: { backgroundColor: "white" },
        p: { backgroundColor: "transparent" },
      }}
    />
  );
};
