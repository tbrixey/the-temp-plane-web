import styles from "../../styles/Game.module.css";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import {
  Button,
  CircularProgress,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { NewPlayerSetup } from "../../components/newPlayerSetup";
import { GetServerSideProps } from "next";
import axios from "axios";
import { Location } from "../../types/location";
import { Races } from "../../types/races";
import { Classes } from "../../types/classes";
import { useContext, useEffect } from "react";
import userContext from "../../util/userContext";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

interface GameStaticProps {
  cities: Location[];
  races: Races[];
  classes: Classes[];
}

export const getStaticProps: GetServerSideProps<GameStaticProps> = async () => {
  const { data: cityRes } = await axios.get(BASE_URL + "cities");
  const { data: classRes } = await axios.get(BASE_URL + "class");
  const { data: raceRes } = await axios.get(BASE_URL + "race");

  return {
    props: {
      cities: cityRes.data,
      classes: classRes.data,
      races: raceRes.data,
    },
  };
};

const Game = ({ cities, classes, races }: GameStaticProps) => {
  const { data: session } = useSession();
  const { user, setUser } = useContext(userContext);

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
      <div className={styles.container}>
        <Stack spacing={2}>
          <Typography>Sign in or register to get started!</Typography>
          <Button onClick={() => signIn()} variant="contained">
            Sign in
          </Button>
          <Link href="/register" passHref={true}>
            <Button variant="contained">Register</Button>
          </Link>
        </Stack>
      </div>
    );
  }

  if (!user) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div style={{ textAlign: "center" }}>
        Signed in as{" "}
        <Typography>
          <b style={{ textDecoration: "underline" }}>{user.playerName}</b>{" "}
          level: {user.level}
        </Typography>
        {user.quests.length > 0 && user.quests[0].type === "intro" ? (
          <NewPlayerSetup cities={cities} races={races} classes={classes} />
        ) : (
          <>
            <Typography variant="h6">Welcome back!</Typography>
            <div>What would you like to do?</div>
            <Grid container flexDirection="column" spacing={1}>
              <Grid item>
                <Link href="/game/travel" passHref={true}>
                  <Button variant="contained">Travel</Button>
                </Link>
              </Grid>
              <Grid item>
                <Button variant="contained" disabled>
                  Quests
                </Button>
              </Grid>
              <Grid item>
                <Button variant="contained" disabled>
                  Skills
                </Button>
              </Grid>
            </Grid>
          </>
        )}
      </div>
      {/* <Button variant="contained" onClick={() => signOut()}>
        Sign out
      </Button> */}
    </div>
  );
};

export default Game;
