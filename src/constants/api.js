export const API_BASE_URL = "http://localhost:8000";

export function buildURL(route, data) {
   let url =
      route[0] === "/" ? `${API_BASE_URL}${route}` : `${API_BASE_URL}/${route}`;
   let params = [];

   for (let k in data) {
      if (data.hasOwnProperty(k)) {
         data.push(`${k}=${encodeURIComponent(data[k])}`);
      }
   }

   params.forEach((param, i) => {
      if (i === 0) {
         url += `?${param}`;
      } else {
         url += `&${param}`;
      }
   });

   return url;
}
