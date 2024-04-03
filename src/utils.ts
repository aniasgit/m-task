export const convertQueryStringToObject = (queryString: string) => {
  if (queryString === "") {
    return {};
  }
  const newString = queryString
    .replace("?", "")
    .replaceAll("=", '":"')
    .replaceAll("&", '","');
  const object = JSON.parse(`{"${newString}"}`);
  return object;
};
