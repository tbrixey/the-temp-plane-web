const isDev = import.meta.env.DEV;

export const config = {
  callbackUrl: isDev
    ? "http://localhost:3000/game" // Dev server default port
    : "https://ttp.trevorbrixey.com/game", // Production URL - adjust as needed
  apiUrl: isDev
    ? "http://localhost:8080/gameapi/"
    : "https://temporary-plane-f98iv.ondigitalocean.app/gameapi/", // Production API URL - adjust as needed
};
