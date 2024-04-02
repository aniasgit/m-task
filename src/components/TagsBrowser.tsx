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

  const fetchData = () =>
    fetch(
      `https://api.stackexchange.com/2.3/tags?page=${page}&pagesize=${pageSize}&order=${order}&sort=${sort}&site=stackoverflow&filter=!nNPvSNVZJS`
    ).then((res) => res.json());

  const { status, data, error } = useQuery({
    queryKey: ["tags", pageSize, page, order, sort],
    queryFn: async () => fetchData(),
  });

  const handlePageSizeChange = useCallback(
    (size: number) => {
      navigate(`/?page=${page}&pageSize=${size}&order=${order}&sort=${sort}`);
    },
    [page, order, sort, navigate]
  );

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
      if (
        urlParams.page !== "" &&
        urlParams.pageSize !== "" &&
        urlParams.sort !== "" &&
        urlParams.order !== ""
      ) {
        setParams({
          page: +urlParams.page,
          pageSize: +urlParams.pageSize,
          sort: urlParams.sort,
          order: urlParams.order as "asc" | "desc",
        });
      } else setParams({ ...initParams });
    }
  }, [search]);

  console.log("search: " + search);
  console.log("params:");
  console.log(params);
  console.log("status: " + status);
  console.log("data:");
  console.log(data);
  return (
    <main>
      <PageSizeInput
        size={params.pageSize}
        onChange={handlePageSizeChange}
        onValidation={useCallback(
          (hasError: boolean) => setIsValidationError(hasError),
          []
        )}
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
