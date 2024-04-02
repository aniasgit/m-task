export const convertQueryStringToObject = (queryString: string) => {
  const newString = queryString
    .replace("?", "")
    .replaceAll("=", '":"')
    .replaceAll("&", '","');
  const object = JSON.parse(`{"${newString}"}`);
  return object;
};
