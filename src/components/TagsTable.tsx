import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { SortButton, TablePagination } from ".";
import { dataType } from "../types";

interface TagsTableInterface {
  data: dataType;
  isError: boolean;
  onPageChange: (page: number) => void;
  onSortChange: (sortBy: string, order: "asc" | "desc") => void;
}

export const TagsTable = ({
  data,
  isError,
  onPageChange,
  onSortChange,
}: TagsTableInterface) => {
  const { items: rows, total, pageSize, page, order, sort } = data;

  // const rows = items;
  const count = Math.ceil(total / pageSize);

  return (
    <TableContainer
      component={Paper}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "1rem",
      }}>
      <Table sx={{ width: { xs: 320, md: 460 } }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
              <SortButton
                onClick={onSortChange}
                sortBy="name"
                order={sort === "name" ? order : undefined}
                disabled={isError}>
                {"Tag's name"}
              </SortButton>
            </TableCell>
            <TableCell align="right" sx={{ paddingRight: 0 }}>
              <SortButton
                onClick={onSortChange}
                sortBy="popular"
                order={sort === "popular" ? order : undefined}
                disabled={isError}>
                Number of posts
              </SortButton>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
              }}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.count}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        count={count}
        page={page}
        onChange={onPageChange}
        disabled={isError}
      />
    </TableContainer>
  );
};
