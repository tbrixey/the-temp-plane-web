import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { SnackbarProvider } from "notistack";
import { useState } from "react";
import userContext from "../util/userContext";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#b49461",
      contrastText: "#fff",
    },
  },
});

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const [user, setUser] = useState();
  return (
    <SessionProvider session={session}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <userContext.Provider value={{ user, setUser }}>
          <SnackbarProvider maxSnack={3}>
            <Component {...pageProps} />
          </SnackbarProvider>
        </userContext.Provider>
      </ThemeProvider>
    </SessionProvider>
  );
}

export default MyApp;
