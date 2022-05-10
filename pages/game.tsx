import styles from "../styles/Game.module.css";
import { useSession, signIn, signOut } from "next-auth/react";
import standardStyles from "../styles/Standard.module.css";
import Link from "next/link";

export default function Game() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className={styles.container}>
        Sign in or register to get started! <br />
        <button className={standardStyles.btn} onClick={() => signIn()}>
          Sign in
        </button>
        <Link href="/register" passHref={true}>
          <button className={standardStyles.btn}>Register</button>
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div>
        Signed in as{" "}
        <span style={{ fontWeight: "bold", textDecoration: "underline" }}>
          {session.user.playerName}
        </span>
        <br />
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
      <button className={standardStyles.btn} onClick={() => signOut()}>
        Sign out
      </button>
    </div>
  );
}
