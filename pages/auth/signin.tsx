import { Button, Stack, TextField } from "@mui/material";
import { getProviders, signIn } from "next-auth/react";
import { useState } from "react";
import styles from "../../styles/Login.module.css";
import standardStyles from "../../styles/Standard.module.css";

export default function SignIn({ providers }: any) {
  const [apiKey, setApiKey] = useState(
    "3z28pbubc4zf3h3sbf552lath4cr98xcs4668rakrn0wcdu9i6taiebb81hen2a36cxsvn4l3flji4l05prrraiqg5b5n6fcm9gybp96u6umd"
  );

  return (
    <div className={styles.container}>
      <Stack spacing={2} style={{ width: 300 }}>
        <TextField
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          variant="standard"
          multiline
        />
        <Button
          onClick={() =>
            signIn("credentials", {
              apiKey,
              callbackUrl: `${window.location.origin}/game`,
            })
          }
          variant="contained"
        >
          Sign in with API Key
        </Button>
      </Stack>
      {/* {Object.values(providers).map((provider: any) => (
        <div key={provider.name}>
          {provider.name !== "API Key" && (
            <div className={styles.main}>
              <Button onClick={() => signIn(provider.id)} variant="contained">
                Sign in with {provider.name}
              </Button>
            </div>
          )}
        </div>
      ))} */}
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
