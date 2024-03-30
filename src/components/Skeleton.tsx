import { Skeleton as MuiSkeleton } from "@mui/material";

export const Skeleton = () => {
  return (
    <MuiSkeleton
      variant="text"
      sx={{ displa: "flex", fontSize: "1rem" }}
      animation="wave"
    />
  );
};
