import { useState, useEffect, useCallback } from "react";
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
  const validate = useCallback((pageSize: number) => {
    if (!Number.isInteger(pageSize)) {
      return "Please enter an integer.";
    } else if (pageSize <= 0) {
      return "Please enter an integer greater than zero.";
    }

    return "";
  }, []);

  const [error, setError] = useState((size && validate(size)) || "");
  const [value, setValue] = useState(size?.toString() || "");

  const isError = error !== "";

  const handleChange = (enteredValue: string) => {
    setValue(enteredValue);
    const error = validate(+enteredValue);

    if (error === "") {
      onChange(+enteredValue);
      onValidation(false);
      setError("");
    } else {
      setError(error);
      onValidation(true);
    }
  };

  const handleBlur = () => {
    onValidation(isError);
  };

  useEffect(() => {
    if (isError) {
      onValidation(true);
    }
  }, [isError, onValidation]);

  console.log("render pagesizeinput");
  console.log(size);
  console.log("error: " + error);
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
      margin="normal"
      sx={{
        width: 160,
        height: 80,
        input: { backgroundColor: "white" },
        "#page-size-helper-text": {
          backgroundColor: "transparent",
          mx: 0,
          width: "max-content",
        },
      }}
    />
  );
};
