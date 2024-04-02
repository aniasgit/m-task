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
  const [debouncedValue, setDebouncedValue] = useState(value);

  const isError = error !== "";

  const handleChange = (enteredValue: string) => {
    setValue(enteredValue);
  };

  const handleBlur = () => {
    onValidation(isError);
  };

  useEffect(() => {
    if (isError) {
      onValidation(true);
    }
  }, [isError, onValidation]);

  useEffect(() => {
    setValue(size?.toString() || "");
  }, [size]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [value]);

  useEffect(() => {
    const error = validate(+debouncedValue);

    if (error === "") {
      onChange(+debouncedValue);
      onValidation(false);
      setError("");
    } else {
      setError(error);
      onValidation(true);
    }
  }, [debouncedValue, onChange, onValidation, validate]);

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
