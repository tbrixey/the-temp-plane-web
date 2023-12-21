import { Button, Stack, TextField } from "@mui/material";
import { getProviders, signIn } from "next-auth/react";
import { useState } from "react";
import styles from "../../styles/Login.module.css";

const callbackUrl = process.env.NEXT_PUBLIC_CALLBACK_URL;

export default function SignIn({ providers }: any) {
  const [apiKey, setApiKey] = useState("");

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
              callbackUrl,
            })
          }
          variant="contained"
        >
          Sign in with API Key
        </Button>
      </Stack>
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
