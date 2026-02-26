import { Button, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import { config } from "../../config";

const callbackUrl = config.callbackUrl;

export default function SignIn() {
  const [apiKey, setApiKey] = useState("");
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      await signIn(apiKey, callbackUrl || "/game");
    } catch (e) {
      console.error("Sign in failed", e);
    }
  };

  return (
    <div className="p-0 flex flex-col justify-center items-center h-screen">
      <Stack spacing={2} style={{ width: 300 }}>
        <TextField
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          variant="standard"
          multiline
        />
        <Button onClick={handleSignIn} variant="contained">
          Sign in with API Key
        </Button>
      </Stack>
    </div>
  );
}
