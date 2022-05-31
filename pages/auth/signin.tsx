import { Button, Stack, TextField } from "@mui/material";
import { getProviders, signIn } from "next-auth/react";
import { useState } from "react";
import styles from "../../styles/Login.module.css";
import standardStyles from "../../styles/Standard.module.css";

export default function SignIn({ providers }: any) {
  const [apiKey, setApiKey] = useState(
    "vxuwkg4g0biowubqsz32cqrm4bs32sg8u4onplx1avqh0owhwviqxo1ar91az8x38uk8njaj3q7ztiyaedm2xu4vtu20nrt8grdbhea4q"
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
