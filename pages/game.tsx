import styles from "../styles/Game.module.css";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { Button, Stack, Typography } from "@mui/material";
import { NewPlayerSetup } from "../components/newPlayerSetup";

export default function Game() {
  const { data: session } = useSession();

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
      <div style={{ textAlign: "center" }}>
        Signed in as{" "}
        <Typography style={{ fontWeight: "bold", textDecoration: "underline" }}>
          {session.user.data.playerName}
        </Typography>
        {session.user.data.quests[0].type === "intro" ? (
          <div>
            Tasks to complete character
            <div>
              <span>{session.user.data.quests[0].tasks?.join(", ")}</span>
            </div>
            <NewPlayerSetup />
          </div>
        ) : (
          <div>Welcome back!</div>
        )}
      </div>
      {/* <Button variant="contained" onClick={() => signOut()}>
        Sign out
      </Button> */}
    </div>
  );
}
