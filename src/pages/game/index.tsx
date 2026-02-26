import { useSession, useAuth } from "../../contexts/authContext";
import { Link } from "react-router-dom";
import {
  Button,
  CircularProgress,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { NewPlayerSetup } from "../../components/newPlayerSetup";
import axios from "axios";
import { useContext, useEffect } from "react";
import userContext from "../../util/userContext";
import {
  useGetStartingCities,
  useGetClasses,
  useGetRaces,
} from "../../util/useGetStarting";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const Game = () => {
  const { data: session } = useSession();
  const { signIn, signOut } = useAuth();
  const { user, setUser } = useContext(userContext);

  const { cities } = useGetStartingCities();
  const { classes } = useGetClasses();
  const { races } = useGetRaces();

  useEffect(() => {
    async function fetchData() {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + session?.user.data.apiKey;
      const res = await axios.post(
        BASE_URL + "authorizePlayer",
        { apiKey: session?.user.data.apiKey },
        {
          headers: {
            accept: "*/*",
            "Content-Type": "application/json",
          },
        }
      );
      const user = res.data.data;
      setUser(user);
    }
    if (session) {
      fetchData();
    }
  }, [session, setUser]);

  if (!session) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <Stack spacing={2}>
          <Typography>Sign in or register to get started!</Typography>
          <Link to="/auth/signin">
            <Button variant="contained">Sign in</Button>
          </Link>
          <Link to="/register">
            <Button variant="contained">Register</Button>
          </Link>
        </Stack>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div style={{ textAlign: "center" }}>
        Signed in as{" "}
        <Typography>
          <b style={{ textDecoration: "underline" }}>{user.playerName}</b>{" "}
          level: {user.level}
        </Typography>
        {user.quests.length > 0 && user.quests[0].type === "intro" ? (
          <NewPlayerSetup
            cities={cities ?? []}
            races={races ?? []}
            classes={classes ?? []}
          />
        ) : (
          <>
            <Typography variant="h6">Welcome back!</Typography>
            <div>What would you like to do?</div>
            <Grid container flexDirection="column" spacing={1}>
              <Grid item>
                <Link to="/game/travel">
                  <Button variant="contained">Travel</Button>
                </Link>
              </Grid>
              <Grid item>
                <Link to="/game/quests">
                  <Button variant="contained">Quests</Button>
                </Link>
              </Grid>
              <Grid item>
                <Link to="/game/skilling">
                  <Button variant="contained" disabled>
                    Skilling
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </>
        )}
      </div>
      <Button variant="contained" onClick={() => signOut()} sx={{ mt: 4 }}>
        Sign out
      </Button>
    </div>
  );
};

export default Game;
