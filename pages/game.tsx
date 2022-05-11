import styles from "../styles/Game.module.css";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import {
  useGetClasses,
  useGetRaces,
  useGetStartingCities,
} from "../util/useGetStarting";
import { Button, Grid, Stack, Typography } from "@mui/material";

export default function Game() {
  const { data: session } = useSession();
  const { cities } = useGetStartingCities();
  const { classes } = useGetClasses();
  const { races } = useGetRaces();

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

  return (
    <div className={styles.container}>
      <div>
        Signed in as{" "}
        <Typography style={{ fontWeight: "bold", textDecoration: "underline" }}>
          {session.user.playerName}
        </Typography>
        {session.user.quests[0].type === "intro" ? (
          <div>
            Tasks to complete character
            <ul>
              {session.user.quests[0].tasks?.map((task, idx) => (
                <li key={idx}>{task}</li>
              ))}
            </ul>
          </div>
        ) : (
          <div>Welcome back!</div>
        )}
      </div>
      <Button variant="contained" onClick={() => signOut()}>
        Sign out
      </Button>
    </div>
  );
}
