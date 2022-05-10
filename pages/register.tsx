import styles from "../styles/Login.module.css";
import { useSession, signIn } from "next-auth/react";
import standardStyles from "../styles/Standard.module.css";
import { useState } from "react";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Register() {
  const [username, setUsername] = useState("");
  const [apiKey, setApiKey] = useState();

  const registerUser = async () => {
    await axios.post(BASE_URL + `register/${username}`).then((res) => {
      console.log(res);
      console.log("RES", res);
      setApiKey(res.data.data.apiKey);
    });
  };

  const actualSignIn = () => {
    signIn("credentials", {
      apiKey,
      callbackUrl: `${window.location.origin}/game`,
    });
  };

  return (
    <div className={styles.container}>
      Register your player name:
      <div className={styles.main}>
        <input
          className={standardStyles.textInput}
          onChange={(e) => setUsername(e.target.value)}
          maxLength={36}
          disabled={Boolean(apiKey)}
        />
        <span style={{ textAlign: "right", fontSize: 12 }}>
          {username.length} / 36
        </span>
      </div>
      {apiKey ? (
        <div style={{ textAlign: "center" }}>
          <div>
            Login Key: <span style={{ fontWeight: "bold" }}>{apiKey}</span>
          </div>
          <div>
            Make sure to save this somewhere! If you do not remember this your
            character will be forever lost in the plane.
          </div>
          <button onClick={actualSignIn} className={standardStyles.btnSmall}>
            Sign me in
          </button>
        </div>
      ) : (
        <button onClick={registerUser} className={standardStyles.btnSmall}>
          Register
        </button>
      )}
    </div>
  );
}