import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { paramsType } from "../types";
import { PageSizeInput, TagsTable } from ".";

const initParamsState: paramsType = {
  page: 1,
  pageSize: 10,
  order: "desc",
  sort: "popular",
};

export const TagsBrowser = () => {
  const [isValidationError, setIsValidationError] = useState(false);
  const [params, setParams] = useState({ ...initParamsState });
  const { page, pageSize, order, sort } = params;

  const fetchData = () =>
    fetch(
      `https://api.stackexchange.com/2.3/tags?page=${page}&pagesize=${pageSize}&order=${order}&sort=${sort}&site=stackoverflow&filter=!nNPvSNVZJS`
    ).then((res) => res.json());

  const { status, data, error } = useQuery({
    queryKey: ["tags", pageSize, page, order, sort],
    queryFn: async () => fetchData(),
  });

  console.log(data);

  const handlePageSizeChange = (size: number) => {
    setParams((prevParams) => {
      return { ...prevParams, pageSize: size };
    });
  };

  const handlePageChange = (page: number) => {
    setParams((prevParams) => {
      return {
        ...prevParams,
        page: page,
      };
    });
  };

  const handleSortChange = (sortBy: string, order: "asc" | "desc") => {
    setParams((prevParams) => {
      return {
        ...prevParams,
        sort: sortBy,
        order: order,
        page: 1,
      };
    });
  };

  return (
    <main>
      <PageSizeInput
        size={params.pageSize}
        onChange={handlePageSizeChange}
        onValidation={(hasError: boolean) => setIsValidationError(hasError)}
      />
      <TagsTable
        data={data && { items: data.items, total: data.total }}
        params={params}
        status={status}
        isValidationError={isValidationError}
        onPageChange={handlePageChange}
        onSortChange={handleSortChange}
      />
    </main>
  );
};
