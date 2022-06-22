import styles from "../../styles/Game.module.css";
import { useSession } from "next-auth/react";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { GetServerSideProps } from "next";
import axios from "axios";
import { Location } from "../../types/location";
import { useContext, useEffect, useState } from "react";
import userContext from "../../util/userContext";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

interface GameStaticProps {
  cities: Location[];
}

export const getStaticProps: GetServerSideProps<GameStaticProps> = async () => {
  const { data: cityRes } = await axios.get(BASE_URL + "cities");

  return {
    props: {
      cities: cityRes.data,
    },
  };
};

const PlayerSkilling = ({ cities }: { cities: Location[] }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const { user, setUser } = useContext(userContext);

  const [availableQuests, setavailableQuests] = useState();

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (!session) {
      router.push("/game");
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
        console.warn("Error getting travel time", error.response);
        if (error.response.data.data.message) {
          enqueueSnackbar(
            error.response.data.data.message + " try refreshing."
          );
        } else {
          enqueueSnackbar("Error getting travel time, try again later.");
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
