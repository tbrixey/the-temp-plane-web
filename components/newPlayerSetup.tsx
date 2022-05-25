import { FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";
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
        <Grid container flexDirection={"column"}>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">
              Class
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={selectedClass}
              onChange={(event) => setSelectedClass(event.target.value)}
              label="Class"
            >
              {classes.map((item, idx: number) => (
                <MenuItem key={item.name + idx} value={item.name}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">Race</InputLabel>
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
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
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
        </Grid>
      )}
    </>
  );
};
