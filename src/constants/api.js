export const API_BASE_URL = "http://localhost:5000";

export function buildURL(route, data) {
   let url =
      route[0] === "/" ? `${API_BASE_URL}${route}` : `${API_BASE_URL}/${route}`;
   return url;
}
