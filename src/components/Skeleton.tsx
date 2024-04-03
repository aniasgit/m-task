import { Skeleton as MuiSkeleton } from "@mui/material";

export const Skeleton = () => {
  return (
    <MuiSkeleton
      variant="text"
      sx={{ fontSize: "0.875rem" }}
      animation="wave"
    />
  );
};
