import { getProviders, signIn } from "next-auth/react";
import { useState } from "react";
import styles from "../../styles/Login.module.css";
import standardStyles from "../../styles/Standard.module.css";

export default function SignIn({ providers }: any) {
  const [apiKey, setApiKey] = useState("");

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <input
          className={standardStyles.textInput}
          onChange={(e) => setApiKey(e.target.value)}
        />
        <button
          onClick={() => signIn("credentials", { apiKey })}
          className={standardStyles.btn}
        >
          Sign in with API Key
        </button>
      </div>
      {Object.values(providers).map((provider: any) => (
        <div key={provider.name}>
          {provider.name !== "API Key" && (
            <div className={styles.main}>
              <button
                onClick={() => signIn(provider.id)}
                className={standardStyles.btn}
              >
                Sign in with {provider.name}
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context: any) {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
