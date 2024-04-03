import { useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { paramsType } from "../types";
import { convertQueryStringToObject } from "../utils";
import { PageSizeInput, TagsTable } from ".";

const initParams: paramsType = {
  page: 1,
  pageSize: 10,
  order: "desc",
  sort: "popular",
};

export const TagsBrowser = () => {
  const [isValidationError, setIsValidationError] = useState(false);

  const navigate = useNavigate();

  const { search } = useLocation();

  const urlParams = convertQueryStringToObject(search);
  const params: paramsType = {
    page: +urlParams.page || initParams.page,
    pageSize: +urlParams.pageSize || initParams.pageSize,
    sort: urlParams.sort || initParams.sort,
    order: (urlParams.order as "asc" | "desc") || initParams.order,
  };

  const { page, pageSize, order, sort } = params;

  const fetchData = async () => {
    const response = await fetch(
      `https://api.stackexchange.com/2.3/tags?page=${page}&pagesize=${pageSize}&order=${order}&sort=${sort}&site=stackoverflow&filter=!nNPvSNVZJS`
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error_message);
    }

    return data;
  };

  const { status, data, error } = useQuery({
    queryKey: ["tags", pageSize, page, order, sort],
    queryFn: fetchData,
    retryDelay: 1000,
    retry: 2,
  });

  const handlePageSizeInputValidate = useCallback((hasError: boolean) => {
    setIsValidationError(hasError);
  }, []);

  const handlePageSizeChange = (size: number) => {
    navigate(`/?page=1&pageSize=${size}&order=${order}&sort=${sort}`);
  };

  const handlePageChange = (newPage: number) => {
    navigate(
      `/?page=${newPage}&pageSize=${pageSize}&order=${order}&sort=${sort}`
    );
  };

  const handleSortChange = (sortBy: string, changedOrder: "asc" | "desc") => {
    navigate(
      `/?page=1&pageSize=${pageSize}&order=${changedOrder}&sort=${sortBy}`
    );
  };

  return (
    <main>
      <PageSizeInput
        size={params.pageSize}
        onChange={handlePageSizeChange}
        onValidation={handlePageSizeInputValidate}
      />
      <TagsTable
        data={data && { items: data.items, total: data.total }}
        params={params}
        status={status}
        isValidationError={isValidationError}
        onPageChange={handlePageChange}
        onSortChange={handleSortChange}
        error={error}
      />
    </main>
  );
};
