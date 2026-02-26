import { useState } from "react";
import axios from "axios";
import { Button, TextField, Typography } from "@mui/material";
import copy from "copy-to-clipboard";
import { useSnackbar } from "notistack";
import { useAuth } from "../contexts/authContext";
import { config } from "../config";

const BASE_URL = config.apiUrl;
const callbackUrl = config.callbackUrl;

export default function Register() {
  const [username, setUsername] = useState("");
  const [apiKey, setApiKey] = useState<string | undefined>();
  const { enqueueSnackbar } = useSnackbar();
  const { signIn } = useAuth();

  const registerUser = async () => {
    await axios.post(BASE_URL + `register/${username}`).then((res) => {
      console.log(res);
      console.log("RES", res);
      setApiKey(res.data.data.apiKey);
    });
  };

  const actualSignIn = async () => {
    if (apiKey) {
      try {
        await signIn(apiKey, callbackUrl || "/game");
      } catch (e) {
        console.error("Sign in failed", e);
      }
    }
  };

  const copyKey = () => {
    if (apiKey) {
      copy(apiKey);
      enqueueSnackbar("Copied to clipboard");
    }
  };

  return (
    <div className="p-0 flex flex-col justify-center items-center h-screen">
      Register your player name:
      <div className="flex flex-col">
        <TextField
          onChange={(e) => setUsername(e.target.value)}
          inputProps={{
            maxLength: 36,
          }}
          variant="standard"
          disabled={Boolean(apiKey)}
        />
        <span style={{ textAlign: "right", fontSize: 12 }}>
          {username.length} / 36
        </span>
      </div>
      {apiKey ? (
        <div style={{ textAlign: "center", maxWidth: 350 }}>
          <Typography sx={{ wordWrap: "break-word", mb: 1 }}>
            Login Key: <b>{apiKey}</b>
          </Typography>
          <Button variant="contained" onClick={copyKey} sx={{ m: 1 }}>
            Copy
          </Button>
          <div>
            Make sure to save this somewhere! If you do not remember this your
            character will be forever lost in the plane.
          </div>
          <Button onClick={actualSignIn} variant="contained" sx={{ m: 1 }}>
            Sign me in
          </Button>
        </div>
      ) : (
        <Button onClick={registerUser} variant="contained">
          Register
        </Button>
      )}
    </div>
  );
}
