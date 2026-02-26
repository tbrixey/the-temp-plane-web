const isDev = import.meta.env.DEV;

export const config = {
  callbackUrl: isDev
    ? "http://localhost:5173/game" // Dev server default port
    : "https://game.thetemporaryplane.com/game", // Production URL - adjust as needed
  apiUrl: isDev
    ? "http://localhost:8080/gameapi/"
    : "https://api.thetemporaryplane.com/gameapi/", // Production API URL - adjust as needed
};
