import styles from "../../styles/Game.module.css";
import { useSession } from "../../contexts/authContext";
import {
  Button,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import userContext from "../../util/userContext";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const PlayerSkilling = () => {
  const { data: session } = useSession();
  const navigate = useNavigate();
  const { user } = useContext(userContext);

  const [availableQuests, setavailableQuests] = useState();

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (!session) {
      navigate("/game");
    }
  });

  const getCityQuests = async () => {
    await axios
      .get(BASE_URL + `quests`)
      .then((res) => {
        if (res.data.message) {
          return enqueueSnackbar(res.data.message);
        }
        setavailableQuests(res.data.data);
      })
      .catch((error: any) => {
        console.warn("Error getting quests", error.response);
        if (error.response.data.data.message) {
          enqueueSnackbar(
            error.response.data.data.message + " try refreshing."
          );
        } else {
          enqueueSnackbar("Error getting quests, try again later.");
        }
      });
  };

  if (!user) {
    return <div>error can not find user. Please go back to /game</div>;
  }

  console.log("QUESTS", availableQuests);

  return (
    <div className={styles.container}>
      {user.location.type === "city" ? (
        <>
          <Typography style={{ textAlign: "center" }}>
            Get available quests in {user.location.name}
          </Typography>
          <Button onClick={getCityQuests} variant="contained">
            Get Quests
          </Button>
        </>
      ) : (
        <Typography style={{ textAlign: "center" }}>
          Travel to a city to get available quests
        </Typography>
      )}
    </div>
  );
};

export default PlayerSkilling;
