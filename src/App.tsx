import { useState, useEffect } from "react";
import { TagsTable, PageSizeInput, Header } from "./components";
import { dataType } from "./types";
import { DUMMY_DATA } from "./data";
import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const initDataState: dataType = {
  items: [],
  total: 0,
  page: 1,
  pageSize: 10,
  order: "desc",
  sort: "popular",
};

function App() {
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState({ ...initDataState });

  const { page, pageSize, sort, order } = data;

  const handlePageSizeChange = (size: number) => {
    setData((prevData) => {
      return { ...prevData, pageSize: size };
    });
  };

  const handlePageChange = (page: number) => {
    setData((prevData) => {
      return {
        ...prevData,
        page: page,
      };
    });
  };

  const handleSortChange = (sortBy: string, order: "asc" | "desc") => {
    setData((prevData) => {
      return {
        ...prevData,
        sort: sortBy,
        order: order,
        page: 1,
      };
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      // const response = await fetch(
      //   `https://api.stackexchange.com/2.3/tags?page=${page}&pagesize=${pageSize}&order=${order}&sort=${sort}&site=stackoverflow&filter=!nNPvSNVZJS`
      // );
      // const fetchedData = await response.json();
      // console.log(fetchedData);
      // setData((prevData) => {
      //   return {
      //     ...prevData,
      //     items: fetchedData.items,
      //     total: fetchedData.total,
      //   };
      // });
      setData((prevData) => {
        return {
          ...prevData,
          items: DUMMY_DATA.items,
          total: DUMMY_DATA.total,
        };
      });
    };

    fetchData();
  }, [order, page, pageSize, sort]);

  console.log(data);
  console.log(isError);

  return (
    <>
      <Header />
      <main>
        <PageSizeInput
          size={pageSize}
          onChange={handlePageSizeChange}
          onValidation={(hasError: boolean) => setIsError(hasError)}
        />
        <TagsTable
          data={data}
          isError={isError}
          onPageChange={handlePageChange}
          onSortChange={handleSortChange}
        />
      </main>
    </>
  );
}

export default App;
