import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { find } from "lodash";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Classes } from "../types/classes";
import { Location } from "../types/location";
import { Races } from "../types/races";
import { useSession } from "../contexts/authContext";
import { gameApi, setGameApiAuth } from "../util/gameApiClient";

interface NewPlayerSetupProps {
  cities: Location[];
  races: Races[];
  classes: Classes[];
}

export const NewPlayerSetup = ({
  cities,
  races,
  classes,
}: NewPlayerSetupProps) => {
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedRace, setSelectedRace] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [submit, setSubmit] = useState({ current: "no" });
  const { data: session } = useSession();

  const submitPlayerRegistration = async () => {
    if (session) {
      setSubmit({ current: "progress" });
      setGameApiAuth(session.user.data.apiKey);

      await gameApi.post(`class/${selectedClass}`);
      await gameApi.post(`race/${selectedRace}`);
      await gameApi.post(`city/${selectedLocation}`);
      setSubmit({ current: "done" });
    }
  };

  return (
    <>
      {classes && cities && races && submit.current !== "done" && (
        <div>
          Complete your character: pick a class, race, and starting city.
          <Grid
            container
            flexDirection={"column"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Grid item sx={{ maxWidth: 350 }}>
              <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
                <InputLabel id="demo-simple-select-standard-label">
                  Class
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={selectedClass}
                  onChange={(event) => setSelectedClass(event.target.value)}
                  label="Class"
                  fullWidth
                >
                  {classes.map((item, idx: number) => (
                    <MenuItem key={item.name + idx} value={item.name}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {!selectedClass && <br />}
              {selectedClass && (
                <>
                  <Typography>
                    {find(classes, { name: selectedClass })?.description}
                  </Typography>
                  <Typography>
                    <b>Speed: </b>{" "}
                    {find(classes, { name: selectedClass })?.speed}{" "}
                    <b>Weight: </b>{" "}
                    {find(classes, { name: selectedClass })?.weight}
                  </Typography>
                  <Typography>
                    <b>Bonus stats:</b>{" "}
                    {find(classes, { name: selectedClass })?.bonus}
                  </Typography>
                </>
              )}
            </Grid>
            <Grid item sx={{ maxWidth: 350 }}>
              <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
                <InputLabel id="demo-simple-select-standard-label">
                  Race
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={selectedRace}
                  onChange={(event) => setSelectedRace(event.target.value)}
                  label="Race"
                >
                  {races.map((item, idx: number) => (
                    <MenuItem key={item.name + idx} value={item.name}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {!selectedRace && <br />}
              {selectedRace && (
                <Typography>
                  {find(races, { name: selectedRace })?.description}
                </Typography>
              )}
            </Grid>
            <Grid item>
              <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
                <InputLabel id="demo-simple-select-standard-label">
                  Starting Location
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={selectedLocation}
                  onChange={(event) => setSelectedLocation(event.target.value)}
                  label="Starting Location"
                >
                  {cities.map((item, idx: number) => (
                    <MenuItem key={item.name + idx} value={item._id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {!selectedLocation && <br />}
              {selectedLocation && (
                <Typography>
                  <b>Population:</b>{" "}
                  {find(cities, { _id: selectedLocation })?.population}
                </Typography>
              )}
            </Grid>
            <Button
              variant="contained"
              sx={{ mt: 1 }}
              onClick={() => submitPlayerRegistration()}
              disabled={
                submit.current === "progress" || submit.current === "done"
              }
            >
              Save
            </Button>
          </Grid>
        </div>
      )}
      {submit.current === "done" && (
        <Link to="/game">
          <Button variant="contained">Reload</Button>
        </Link>
      )}
    </>
  );
};
