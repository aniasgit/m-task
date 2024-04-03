import { useEffect, useState, useCallback } from "react";
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
  const [params, setParams] = useState({ ...initParams });
  const { page, pageSize, order, sort } = params;

  const navigate = useNavigate();

  const { search } = useLocation();

  const fetchData = async () => {
    const response = await fetch(
      `https://api.stackexchange.com/2.3/tags?page=${page}&pagesize=${pageSize}&order=${order}&sort=${sort}&site=stackoverflow&filter=!nNPvSNVZJS`
    );

    const data = await response.json();

    if (!response.ok) {
      console.log(data);
      throw new Error(data.error_message);
    }

    return data;
  };

  const { status, data, error } = useQuery({
    queryKey: ["tags", pageSize, page, order, sort],
    queryFn: async () => await fetchData(),
    retryDelay: 1000,
    retry: 2,
  });

  const handlePageSizeChange = (size: number) => {
    navigate(`/?page=${page}&pageSize=${size}&order=${order}&sort=${sort}`);
  };

  const handlePageSizeInputValidate = useCallback((hasError: boolean) => {
    setIsValidationError(hasError);
  }, []);

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

  useEffect(() => {
    if (search === "") {
      setParams({ ...initParams });
    } else {
      const urlParams = convertQueryStringToObject(search);
      console.log("urlParams");
      console.log(urlParams);
      setParams({
        page: +urlParams.page || initParams.page,
        pageSize: +urlParams.pageSize || initParams.pageSize,
        sort: urlParams.sort || initParams.sort,
        order: (urlParams.order as "asc" | "desc") || initParams.order,
      });
    }
  }, [search]);

  // console.log("search: " + search);
  console.log("params:");
  console.log(params);
  // console.log("status: " + status);
  console.log("data:");
  console.log(data);
  // console.log("error: " + error?.message);
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
