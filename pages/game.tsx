import styles from "../styles/Game.module.css";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { Button, CircularProgress, Stack, Typography } from "@mui/material";
import { NewPlayerSetup } from "../components/newPlayerSetup";
import { GetServerSideProps, InferGetStaticPropsType } from "next";
import axios from "axios";
import { Location } from "../types/location";
import { Races } from "../types/races";
import { Classes } from "../types/classes";
import { useEffect, useState } from "react";
import { User } from "../types/user";

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

const Game = ({
  cities,
  classes,
  races,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { data: session } = useSession();
  const [user, setUser] = useState<User>();

  useEffect(() => {
    async function fetchData() {
      const res = await axios.post(
        BASE_URL + "authorizePlayer",
        { apiKey: session?.user.data.apiKey },
        {
          headers: {
            accept: "*/*",
            "Content-Type": "application/json",
            Authorization: "Bearer " + session?.user.data.apiKey,
          },
        }
      );
      const user = res.data.data;
      setUser(user);
    }
    if (session) {
      fetchData();
    }
  }, [session]);

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
    return <CircularProgress />;
  }

  return (
    <div className={styles.container}>
      <div style={{ textAlign: "center" }}>
        Signed in as{" "}
        <Typography style={{ fontWeight: "bold", textDecoration: "underline" }}>
          {user.playerName}
        </Typography>
        {user.quests.length > 0 && user.quests[0].type === "intro" ? (
          <NewPlayerSetup cities={cities} races={races} classes={classes} />
        ) : (
          <div>Welcome back!</div>
        )}
      </div>
      {/* <Button variant="contained" onClick={() => signOut()}>
        Sign out
      </Button> */}
    </div>
  );
};

export default Game;
