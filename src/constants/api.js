// for local testing
export const API_BASE_URL = "http://localhost:5000";

// for device testing (must be running ngrok)
// export const API_BASE_URL = "http://e9834e8d.ngrok.io";

export function buildURL(route, data) {
   let url =
      route[0] === "/" ? `${API_BASE_URL}${route}` : `${API_BASE_URL}/${route}`;
   return url;
}
