import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Alert,
} from "@mui/material";
import { SortButton, TablePagination, Skeleton } from ".";
import { dataType, itemType, paramsType } from "../types";
import { useEffect, useState } from "react";

interface TagsTableInterface {
  data?: dataType;
  params: paramsType;
  status: "pending" | "error" | "success";
  isValidationError: boolean;
  error: Error | null;
  onPageChange: (page: number) => void;
  onSortChange: (sortBy: string, order: "asc" | "desc") => void;
}

export const TagsTable = ({
  data,
  params,
  status,
  isValidationError,
  error,
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
      }}>
      <Table sx={{ width: { xs: 280, sm: 460 } }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: "50%", padding: 0, pb: "0.5rem" }}>
              <SortButton
                onClick={onSortChange}
                sortBy="name"
                order={sort === "name" ? order : undefined}
                disabled={isValidationError}>
                Tag's name
              </SortButton>
            </TableCell>
            <TableCell
              align="right"
              sx={{ width: "50%", padding: 0, pb: "0.5rem" }}>
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
          {status === "error" && (
            <TableRow
              sx={{
                padding: "1rem",
                "&:last-child td, &:last-child th": { border: 0 },
              }}>
              <TableCell colSpan={2}>
                <Alert severity="error">{error && error.message}</Alert>
              </TableCell>
            </TableRow>
          )}
          {status === "pending" &&
            createSkeleton().map((skeleton, index) => (
              <TableRow
                key={index}
                sx={{
                  "&:last-child td": { border: 0 },
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
                  fontSize: "0.875rem",
                  "&:last-child td": { border: 0 },
                }}>
                <TableCell>{item.name}</TableCell>
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
