import { Button } from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import { ReactNode } from "react";

interface SortButtonInterface {
  children: ReactNode;
  onClick: (sortBy: string, order: "asc" | "desc") => void;
  order?: "asc" | "desc";
  sortBy: string;
  disabled?: boolean;
}

export const SortButton = ({
  children,
  onClick,
  order,
  sortBy,
  disabled = false,
}: SortButtonInterface) => {
  const handleOrderChange = () => {
    switch (order) {
      case "desc":
        onClick(sortBy, "asc");
        break;
      case "asc":
        onClick(sortBy, "desc");
        break;
      default:
        onClick(sortBy, "asc");
    }
  };

  return (
    <Button
      onClick={handleOrderChange}
      disabled={disabled}
      sx={{
        gap: "0.5rem",
        "&:hover": { svg: { opacity: "1" } },
      }}>
      <p>{children}</p>
      {order === undefined && <SwapVertIcon sx={{ opacity: "0.7" }} />}
      {order === "desc" && <ArrowDownwardIcon />}
      {order === "asc" && <ArrowUpwardIcon />}
    </Button>
  );
};
