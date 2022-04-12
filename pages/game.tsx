import styles from "../styles/Game.module.css";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Game() {
  const { data: session } = useSession();
  console.log("SESSION", session);
  if (!session) {
    return (
      <div className={styles.container}>
        Not signed in <br />
        <button onClick={() => signIn()}>Sign in</button>
      </div>
    );
  }
  return (
    <div className={styles.container}>
      Signed in as {session?.user?.name} <br />
      <button onClick={() => signOut()}>Sign out</button>
    </div>
  );
}
