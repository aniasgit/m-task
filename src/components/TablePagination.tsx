import { Pagination } from "@mui/material";

interface TablePaginationInterface {
  count: number;
  page: number;
  disabled?: boolean;
  onChange: (page: number) => void;
}

export const TablePagination = ({
  count,
  page,
  disabled = false,
  onChange,
}: TablePaginationInterface) => {
  return (
    <Pagination
      count={count}
      page={page}
      variant="outlined"
      shape="rounded"
      color="primary"
      disabled={disabled}
      onChange={(_event, page) => onChange(page)}
      sx={{ justifyContent: "center" }}
    />
  );
};
