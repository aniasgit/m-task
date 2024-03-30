import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { SortButton, TablePagination, Skeleton } from ".";
import { dataType, itemType, paramsType } from "../types";
import { useEffect, useState } from "react";

interface TagsTableInterface {
  data?: dataType;
  params: paramsType;
  status: "pending" | "error" | "success";
  isValidationError: boolean;
  onPageChange: (page: number) => void;
  onSortChange: (sortBy: string, order: "asc" | "desc") => void;
}

export const TagsTable = ({
  data,
  params,
  status,
  isValidationError,
  onPageChange,
  onSortChange,
}: TagsTableInterface) => {
  const { pageSize, sort, order, page } = params;
  const [count, setCount] = useState(0);

  const createSkeleton = () => {
    const skeletonArr = [];
    for (let i = 0; i < pageSize; i++) {
      skeletonArr.push(<Skeleton />);
    }
    return skeletonArr;
  };

  // if (isSuccess) {
  //   setTagsData({ items: data.items, total: data.total as number });
  // }

  // const { items: rows, total } = data;
  // // const rows = items;
  // const count = Math.ceil(total / pageSize);
  useEffect(() => {
    if (data) {
      setCount(Math.ceil(data.total / pageSize));
    }
  }, [data, pageSize]);

  return (
    <TableContainer
      component={Paper}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: { xs: "1rem 0.25rem", sm: "1rem" },
        // my: "2rem",
      }}>
      <Table sx={{ width: { xs: 280, sm: 460 } }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
              <SortButton
                onClick={onSortChange}
                sortBy="name"
                order={sort === "name" ? order : undefined}
                disabled={isValidationError}>
                {"Tag's name"}
              </SortButton>
            </TableCell>
            <TableCell align="right" sx={{ paddingRight: 0 }}>
              <SortButton
                onClick={onSortChange}
                sortBy="popular"
                order={sort === "popular" ? order : undefined}
                disabled={isValidationError}>
                Number of posts
              </SortButton>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {status === "pending" &&
            createSkeleton().map((skeleton, index) => (
              <TableRow
                key={index}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}>
                <TableCell>{skeleton}</TableCell>
                <TableCell>{skeleton}</TableCell>
              </TableRow>
            ))}
          {data &&
            data.items.map((item: itemType) => (
              <TableRow
                key={item.name}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}>
                <TableCell component="th" scope="row">
                  {item.name}
                </TableCell>
                <TableCell align="right">{item.count}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <TablePagination
        count={count}
        page={page}
        onChange={onPageChange}
        disabled={isValidationError}
      />
    </TableContainer>
  );
};
