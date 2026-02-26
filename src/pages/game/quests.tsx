import { useSession } from "../../contexts/authContext";
import {
  Button,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import userContext from "../../util/userContext";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { Quest } from "../../types/quest";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const PlayerQuests = () => {
  const { data: session } = useSession();
  const navigate = useNavigate();
  const { user } = useContext(userContext);

  const [availableQuests, setavailableQuests] = useState<Quest[]>();

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
    <div className="flex flex-col justify-center items-center h-screen">
      {user.location && user.location.type === "city" ? (
        <>
          <Typography style={{ textAlign: "center" }}>
            Get available quests in <b>{user.location.name}</b>
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
      {availableQuests && (
        <Grid spacing={1} container alignItems="center" flexDirection="column">
          {availableQuests.map((quest, idx) => (
            <Grid item key={quest._id}>
              {quest.title}
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default PlayerQuests;
