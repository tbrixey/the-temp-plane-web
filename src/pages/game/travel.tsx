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
import { Location } from "../../types/location";
import { useContext, useEffect, useState } from "react";
import userContext from "../../util/userContext";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useGetStartingCities } from "../../util/useGetStarting";
import { gameApi } from "../../util/gameApiClient";

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
    await gameApi
      .get(`travel/${selectedLocation}`)
      .then((res) => {
        setTravelTime({ message: res.data.message, loading: false });
      })
      .catch((error) => {
        const msg =
          error.response?.data?.message ??
          "Error getting travel time, try again later.";
        enqueueSnackbar(msg);
        setTravelTime({ message: "", loading: false });
      });
  };

  const startTraveling = async () => {
    setTraveling({ loading: true });
    await gameApi
      .post(`travel/${selectedLocation}`)
      .then((res) => {
        setTravelTime({ message: res.data.message, loading: true });
        enqueueSnackbar(`Traveling! ${res.data.message}`);
      })
      .catch((error) => {
        const msg =
          error.response?.data?.message ??
          "Error starting travel, try again later.";
        enqueueSnackbar(msg);
        setTraveling({ loading: false });
      });
  };

  if (isLoading || !cities) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  if (!user) {
    return <div>error can not find user. Please go back to /game</div>;
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen">
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
            <InputLabel id="travel-location-label">Cities</InputLabel>
            <Select
              labelId="travel-location-label"
              id="travel-location-select"
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
          disabled={!selectedLocation || travelTime.loading}
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
              disabled={traveling.loading}
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
