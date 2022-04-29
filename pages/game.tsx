import styles from "../styles/Game.module.css";
import { useSession, signIn, signOut } from "next-auth/react";
import standardStyles from "../styles/Standard.module.css";
import Link from "next/link";

export default function Game() {
  const { data: session } = useSession();
  console.log("SESSION", session);
  if (!session) {
    return (
      <div className={styles.container}>
        Sign in or register to get started! <br />
        <button className={standardStyles.btn} onClick={() => signIn()}>
          Sign in
        </button>
        <Link href="/register" passHref={true}>
          <div className={standardStyles.btn}>Register</div>
        </Link>
      </div>
    );
  }
  return (
    <div className={styles.container}>
      Signed in as {session?.user?.name} <br />
      <button className={standardStyles.btn} onClick={() => signOut()}>
        Sign out
      </button>
    </div>
  );
}
