import styles from "../styles/Login.module.css";
import { useSession, signIn, signOut } from "next-auth/react";
import standardStyles from "../styles/Standard.module.css";
import { useState } from "react";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Register() {
  const { data: session } = useSession();
  const [username, setUsername] = useState("");

  const registerUser = () => {
    console.log("USER", username);
  };

  console.log("SESSION", session);
  return (
    <div className={styles.container}>
      Registration
      <div className={styles.main}>
        <input
          className={standardStyles.textInput}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button
          onClick={() => registerUser()}
          className={standardStyles.btnSmall}
        >
          Register
        </button>
      </div>
    </div>
  );
}
