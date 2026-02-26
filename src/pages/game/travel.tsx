import styles from "../../styles/Game.module.css";
import { useSession } from "../../contexts/authContext";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { Location } from "../../types/location";
import { useContext, useEffect, useState } from "react";
import userContext from "../../util/userContext";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useGetStartingCities } from "../../util/useGetStarting";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const PlayerTravel = () => {
  const { data: session } = useSession();
  const navigate = useNavigate();
  const { user } = useContext(userContext);

  const { cities, isLoading } = useGetStartingCities();

  const [selectedLocation, setSelectedLocation] = useState("");
  const [searchByText, setSearchByText] = useState(false);
  const [travelTime, setTravelTime] = useState({ message: "", loading: false });
  const [traveling, setTraveling] = useState({ loading: false });

  const { enqueueSnackbar } = useSnackbar();
  const locationsToTravelTo =
    cities && cities.filter((c: Location) => c._id !== user?.location._id);

  useEffect(() => {
    if (!session) {
      navigate("/game");
    }
  });

  const getTravelTime = async () => {
    setTravelTime({ message: "", loading: true });
    await axios
      .get(BASE_URL + `travel/${selectedLocation}`)
      .then((res) => {
        if (res.data.message) {
          return enqueueSnackbar(res.data.message);
        }
        setTravelTime({ message: res.data.data.message, loading: false });
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

  const startTraveling = async () => {
    setTraveling({ loading: true });
    await axios
      .post(BASE_URL + `travel/${selectedLocation}`)
      .then((res) => {
        setTravelTime({ message: res.data.data.message, loading: true });
      })
      .catch((error) => {
        console.warn("Error starting travel time");
        enqueueSnackbar("Error starting travel time, try again later.");
      });
  };

  if (isLoading || !cities) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  if (!user) {
    return <div>error can not find user. Please go back to /game</div>;
  }

  return (
    <div className={styles.container}>
      <FormControlLabel
        control={
          <Switch
            checked={searchByText}
            onChange={(e) => setSearchByText(e.target.checked)}
          />
        }
        label="Search By Text"
      />
      {searchByText ? (
        <>
          <Typography>Type in location name to travel to</Typography>
          <TextField
            name="selectedLocation"
            variant="standard"
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            placeholder="Drandor"
          />
        </>
      ) : (
        <>
          <Typography style={{ textAlign: "center" }}>
            Cities you can travel to:
          </Typography>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
            <InputLabel id="demo-simple-select-standard-label">
              Cities
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={selectedLocation}
              onChange={(event) => setSelectedLocation(event.target.value)}
              label="Cities"
            >
              {locationsToTravelTo.map((item, idx: number) => (
                <MenuItem key={item.name + idx} value={item.name}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </>
      )}
      <Box m={1}>
        <Button
          onClick={getTravelTime}
          variant="contained"
          disabled={Boolean(travelTime.loading)}
        >
          Get Travel Time
        </Button>
      </Box>
      {travelTime.message && (
        <>
          <Typography>{travelTime.message}</Typography>
          <Box sx={{ mt: 1, textAlign: "center" }}>
            <Button
              variant="contained"
              onClick={startTraveling}
              disabled={Boolean(traveling.loading)}
            >
              Travel
            </Button>
          </Box>
        </>
      )}
    </div>
  );
};

export default PlayerTravel;
