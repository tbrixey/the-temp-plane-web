import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { SnackbarProvider } from "notistack";
import { useState } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "./contexts/authContext";
import userContext from "./util/userContext";
import Home from "./pages/index";
import SignIn from "./pages/auth/signin";
import Register from "./pages/register";
import Game from "./pages/game/index";
import PlayerTravel from "./pages/game/travel";
import PlayerQuests from "./pages/game/quests";
import PlayerSkilling from "./pages/game/skilling";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#b49461",
      contrastText: "#fff",
    },
  },
});

function AppInner() {
  const [user, setUser] = useState();
  const navigate = useNavigate();

  return (
    <AuthProvider navigate={navigate}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <userContext.Provider value={{ user, setUser }}>
          <SnackbarProvider maxSnack={3}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/auth/signin" element={<SignIn />} />
              <Route path="/register" element={<Register />} />
              <Route path="/game" element={<Game />} />
              <Route path="/game/travel" element={<PlayerTravel />} />
              <Route path="/game/quests" element={<PlayerQuests />} />
              <Route path="/game/skilling" element={<PlayerSkilling />} />
            </Routes>
          </SnackbarProvider>
        </userContext.Provider>
      </ThemeProvider>
    </AuthProvider>
  );
}

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <AppInner />
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
