import { useState, useEffect, useRef } from "react";
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
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>();

  const validate = (pageSize: number) => {
    if (!Number.isInteger(pageSize)) {
      return "Please enter an integer.";
    } else if (pageSize <= 0) {
      return "Please enter an integer greater than zero";
    } else if (pageSize > 100) {
      return "Maximum page size is 100.";
    }

    return "";
  };

  const [error, setError] = useState((size && validate(size)) || "");
  const [value, setValue] = useState(size?.toString() || "");

  const isError = error !== "";

  const handleChange = (enteredValue: string) => {
    clearTimeout(timer.current);
    setValue(enteredValue);
    timer.current = setTimeout(() => {
      const error = validate(+enteredValue);

      if (error === "") {
        onChange(+enteredValue);
        onValidation(false);
        setError("");
      } else {
        setError(error);
        onValidation(true);
      }
    }, 300);
  };

  const handleBlur = (enteredValue: string) => {
    if (enteredValue === "") {
      setError("Please enter an integer greater than zero");
      onValidation(true);
    } else {
      onValidation(isError);
    }
  };

  useEffect(() => {
    if (isError) {
      onValidation(true);
    }
  }, [isError, onValidation]);

  useEffect(() => {
    setValue(size?.toString() || "");
    console.log("ustawiono input");
  }, [size]);

  return (
    <TextField
      id="page-size"
      label="Tags per page"
      type="number"
      value={value}
      onChange={(event) => handleChange(event.target.value)}
      onBlur={(event) => handleBlur(event.target.value)}
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
