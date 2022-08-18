import md5 from "blueimp-md5";

export function getQueryHash(timeStamp, puclicKey, privateKey) {
  const hash = md5(timeStamp + privateKey + puclicKey);
  return hash;
}

export function createQueryParamsStr(queryParamsObj) {
  const queryParamsRecords = Object.entries(queryParamsObj)
    .filter(([key, value]) => {
      if (key !== "" && value !== "") {
        if (Array.isArray(value) && value.length === 0) {
          return false;
        }
        return true;
      }
    })
    .map(([key, value]) => {
      return [key, `${value}`];
    });
  const queryParamsStr = new URLSearchParams(queryParamsRecords).toString();
  return queryParamsStr ? `?${queryParamsStr}` : "";
}
