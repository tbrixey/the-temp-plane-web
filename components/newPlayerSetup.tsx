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
import { useSession } from "next-auth/react";
import { useState } from "react";
import {
  useGetClasses,
  useGetRaces,
  useGetStartingCities,
} from "../util/useGetStarting";

export const NewPlayerSetup = () => {
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedRace, setSelectedRace] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const { data: session } = useSession();
  const { cities } = useGetStartingCities();
  const { classes } = useGetClasses();
  const { races } = useGetRaces();

  return (
    <>
      {classes && cities && races && (
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
                  <b>Speed: </b> {find(classes, { name: selectedClass })?.speed}{" "}
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
          <Button variant="contained" sx={{ mt: 1 }}>
            Save
          </Button>
        </Grid>
      )}
    </>
  );
};
